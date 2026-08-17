"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authorize } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { logAudit } from "@/lib/audit";
import { refreshTag } from "@/lib/revalidate";
import { deletePortrait, uploadPortrait } from "@/lib/images";
import { STAFF_TAG } from "@/lib/data";

/**
 * Echipa de suport: conducere, asistente medicale, recepție.
 *
 * Spre deosebire de medici, aceștia nu au pagină proprie, bio sau specialități -
 * doar nume, rol și fotografie. Apar exclusiv pe /echipa.
 */

export type StaffState = {
  ok?: boolean;
  message?: string;
  error?: string;
};

const staffSchema = z.object({
  name: z.string().trim().min(2, "Numele e prea scurt.").max(120),
  role: z.string().trim().min(2, "Completează rolul.").max(120),
  isPublished: z.boolean(),
});

function readForm(formData: FormData) {
  return {
    name: formData.get("name"),
    role: formData.get("role"),
    isPublished: formData.get("isPublished") === "on",
  };
}

function refresh() {
  refreshTag(STAFF_TAG);
  revalidatePath("/admin/echipa-suport");
}

export async function createStaff(
  _state: StaffState,
  formData: FormData,
): Promise<StaffState> {
  const auth = await authorize("staff");
  if (!auth.ok) return { error: auth.error };

  const parsed = staffSchema.safeParse(readForm(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Date invalide." };
  }

  const s = parsed.data;

  try {
    const supabase = await createClient();

    const { data: last } = await supabase
      .from("staff")
      .select("order_index")
      .order("order_index", { ascending: false })
      .limit(1)
      .maybeSingle();

    let photoUrl: string | null = null;
    const photo = formData.get("photo");
    if (photo instanceof File && photo.size > 0) {
      const upload = await uploadPortrait(photo, s.name, Date.now());
      if (!upload.ok) return { error: upload.error };
      photoUrl = upload.url;
    }

    const { data: created, error } = await supabase
      .from("staff")
      .insert({
        name: s.name,
        role: s.role,
        photo_url: photoUrl,
        is_published: s.isPublished,
        order_index: (last?.order_index ?? -1) + 1,
      })
      .select("id")
      .single();

    if (error) throw error;

    await logAudit({
      actorId: auth.user.id,
      actorEmail: auth.user.email,
      action: "create",
      entity: "staff",
      entityId: created.id,
      details: { name: s.name },
    });

    refresh();
    return { ok: true, message: `${s.name} a fost adăugat.` };
  } catch (err) {
    console.error("[staff] creare:", err);
    return { error: "Nu am putut adăuga membrul." };
  }
}

const updateSchema = staffSchema.extend({ id: z.string().uuid() });

export async function updateStaff(
  _state: StaffState,
  formData: FormData,
): Promise<StaffState> {
  const auth = await authorize("staff");
  if (!auth.ok) return { error: auth.error };

  const parsed = updateSchema.safeParse({
    ...readForm(formData),
    id: formData.get("id"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Date invalide." };
  }

  const s = parsed.data;

  try {
    const supabase = await createClient();

    const { data: existing } = await supabase
      .from("staff")
      .select("photo_url")
      .eq("id", s.id)
      .maybeSingle();

    if (!existing) return { error: "Membrul nu mai există." };

    let photoUrl = existing.photo_url;
    const photo = formData.get("photo");
    if (photo instanceof File && photo.size > 0) {
      const upload = await uploadPortrait(photo, s.name, Date.now());
      if (!upload.ok) return { error: upload.error };
      photoUrl = upload.url;
      await deletePortrait(existing.photo_url);
    }

    const { error } = await supabase
      .from("staff")
      .update({
        name: s.name,
        role: s.role,
        photo_url: photoUrl,
        is_published: s.isPublished,
      })
      .eq("id", s.id);

    if (error) throw error;

    await logAudit({
      actorId: auth.user.id,
      actorEmail: auth.user.email,
      action: "update",
      entity: "staff",
      entityId: s.id,
    });

    refresh();
    return { ok: true, message: "Modificările sunt live pe site." };
  } catch (err) {
    console.error("[staff] actualizare:", err);
    return { error: "Nu am putut salva membrul." };
  }
}

export async function deleteStaff(id: string): Promise<StaffState> {
  const auth = await authorize("staff");
  if (!auth.ok) return { error: auth.error };

  if (!z.string().uuid().safeParse(id).success) {
    return { error: "Date invalide." };
  }

  try {
    const supabase = await createClient();

    const { data: existing } = await supabase
      .from("staff")
      .select("photo_url, name")
      .eq("id", id)
      .maybeSingle();

    const { error } = await supabase.from("staff").delete().eq("id", id);
    if (error) throw error;

    await deletePortrait(existing?.photo_url ?? null);

    await logAudit({
      actorId: auth.user.id,
      actorEmail: auth.user.email,
      action: "delete",
      entity: "staff",
      entityId: id,
      details: { name: existing?.name },
    });

    refresh();
    return { ok: true, message: "Membrul a fost șters." };
  } catch (err) {
    console.error("[staff] ștergere:", err);
    return { error: "Nu am putut șterge membrul." };
  }
}

export async function moveStaff(
  id: string,
  direction: "up" | "down",
): Promise<StaffState> {
  const auth = await authorize("staff");
  if (!auth.ok) return { error: auth.error };

  try {
    const supabase = await createClient();
    const { data: all, error } = await supabase
      .from("staff")
      .select("id, order_index")
      .order("order_index", { ascending: true });

    if (error) throw error;

    const list = all ?? [];
    const index = list.findIndex((m) => m.id === id);
    if (index === -1) return { error: "Membrul nu mai există." };

    const swapWith = direction === "up" ? index - 1 : index + 1;
    if (swapWith < 0 || swapWith >= list.length) return { ok: true };

    const current = list[index];
    const other = list[swapWith];

    const { error: e1 } = await supabase
      .from("staff")
      .update({ order_index: other.order_index })
      .eq("id", current.id);
    if (e1) throw e1;

    const { error: e2 } = await supabase
      .from("staff")
      .update({ order_index: current.order_index })
      .eq("id", other.id);
    if (e2) throw e2;

    refresh();
    return { ok: true };
  } catch (err) {
    console.error("[staff] reordonare:", err);
    return { error: "Nu am putut schimba ordinea." };
  }
}
