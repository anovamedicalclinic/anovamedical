"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authorize } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { logAudit } from "@/lib/audit";
import { refreshTag } from "@/lib/revalidate";
import { TESTIMONIALS_TAG } from "@/lib/data";

/**
 * Recenziile de pe prima pagină.
 *
 * După fiecare modificare se invalidează eticheta `testimonials`, ceea ce face
 * ca pagina statică să se regenereze cu textul nou. Fără asta, modificarea ar
 * sta în baza de date fără să apară pe site până la următorul build.
 *
 * Limitele (autor 2-120, text 10-1200, notă 1-5) sunt aceleași și în constrângeri
 * de tabel, în 0002_admin.sql: interfața le explică, baza le impune.
 */

export type TestimonialState = {
  ok?: boolean;
  message?: string;
  error?: string;
};

const testimonialSchema = z.object({
  author: z
    .string()
    .trim()
    .min(2, "Numele e prea scurt.")
    .max(120, "Numele e prea lung."),
  rating: z.coerce.number().int().min(1).max(5),
  text: z
    .string()
    .trim()
    .min(10, "Recenzia e prea scurtă.")
    .max(1200, "Recenzia depășește 1200 de caractere."),
  isPublished: z.boolean(),
});

function readForm(formData: FormData) {
  return {
    author: formData.get("author"),
    rating: formData.get("rating"),
    text: formData.get("text"),
    isPublished: formData.get("isPublished") === "on",
  };
}

function refresh() {
  refreshTag(TESTIMONIALS_TAG);
  revalidatePath("/admin/recenzii");
}

export async function createTestimonial(
  _state: TestimonialState,
  formData: FormData,
): Promise<TestimonialState> {
  const auth = await authorize("testimonials");
  if (!auth.ok) return { error: auth.error };

  const parsed = testimonialSchema.safeParse(readForm(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Date invalide." };
  }

  try {
    const supabase = await createClient();

    // Recenzia nouă se așază la final.
    const { data: last } = await supabase
      .from("testimonials")
      .select("order_index")
      .order("order_index", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { data: created, error } = await supabase
      .from("testimonials")
      .insert({
        author: parsed.data.author,
        rating: parsed.data.rating,
        text: parsed.data.text,
        is_published: parsed.data.isPublished,
        order_index: (last?.order_index ?? -1) + 1,
      })
      .select("id")
      .single();

    if (error) throw error;

    await logAudit({
      actorId: auth.user.id,
      actorEmail: auth.user.email,
      action: "create",
      entity: "testimonial",
      entityId: created.id,
      details: { author: parsed.data.author },
    });

    refresh();
    return { ok: true, message: "Recenzia a fost adăugată." };
  } catch (err) {
    console.error("[testimonials] creare:", err);
    return { error: "Nu am putut adăuga recenzia." };
  }
}

const updateSchema = testimonialSchema.extend({ id: z.string().uuid() });

export async function updateTestimonial(
  _state: TestimonialState,
  formData: FormData,
): Promise<TestimonialState> {
  const auth = await authorize("testimonials");
  if (!auth.ok) return { error: auth.error };

  const parsed = updateSchema.safeParse({
    ...readForm(formData),
    id: formData.get("id"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Date invalide." };
  }

  const { id, author, rating, text, isPublished } = parsed.data;

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("testimonials")
      .update({ author, rating, text, is_published: isPublished })
      .eq("id", id);

    if (error) throw error;

    await logAudit({
      actorId: auth.user.id,
      actorEmail: auth.user.email,
      action: "update",
      entity: "testimonial",
      entityId: id,
    });

    refresh();
    return { ok: true, message: "Recenzia a fost salvată." };
  } catch (err) {
    console.error("[testimonials] actualizare:", err);
    return { error: "Nu am putut salva recenzia." };
  }
}

export async function deleteTestimonial(
  id: string,
): Promise<TestimonialState> {
  const auth = await authorize("testimonials");
  if (!auth.ok) return { error: auth.error };

  if (!z.string().uuid().safeParse(id).success) {
    return { error: "Date invalide." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) throw error;

    await logAudit({
      actorId: auth.user.id,
      actorEmail: auth.user.email,
      action: "delete",
      entity: "testimonial",
      entityId: id,
    });

    refresh();
    return { ok: true, message: "Recenzia a fost ștearsă." };
  } catch (err) {
    console.error("[testimonials] ștergere:", err);
    return { error: "Nu am putut șterge recenzia." };
  }
}

/**
 * Mută o recenzie cu o poziție în sus sau în jos, schimbând `order_index` cu
 * vecina. Interschimbarea păstrează indicii compacți, spre deosebire de o
 * renumerotare completă la fiecare mutare.
 */
export async function moveTestimonial(
  id: string,
  direction: "up" | "down",
): Promise<TestimonialState> {
  const auth = await authorize("testimonials");
  if (!auth.ok) return { error: auth.error };

  try {
    const supabase = await createClient();
    const { data: all, error } = await supabase
      .from("testimonials")
      .select("id, order_index")
      .order("order_index", { ascending: true });

    if (error) throw error;

    const list = all ?? [];
    const index = list.findIndex((t) => t.id === id);
    if (index === -1) return { error: "Recenzia nu mai există." };

    const swapWith = direction === "up" ? index - 1 : index + 1;
    if (swapWith < 0 || swapWith >= list.length) return { ok: true };

    const current = list[index];
    const other = list[swapWith];

    const { error: e1 } = await supabase
      .from("testimonials")
      .update({ order_index: other.order_index })
      .eq("id", current.id);
    if (e1) throw e1;

    const { error: e2 } = await supabase
      .from("testimonials")
      .update({ order_index: current.order_index })
      .eq("id", other.id);
    if (e2) throw e2;

    refresh();
    return { ok: true };
  } catch (err) {
    console.error("[testimonials] reordonare:", err);
    return { error: "Nu am putut schimba ordinea." };
  }
}
