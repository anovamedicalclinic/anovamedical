"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authorize } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { logAudit } from "@/lib/audit";
import { refreshTag } from "@/lib/revalidate";
import { deletePortrait, uploadPortrait } from "@/lib/images";
import { DOCTORS_TAG } from "@/lib/data";

/**
 * Medicii: adăugare, editare, ștergere, reordonare și fotografie.
 *
 * Fotografia încărcată aici ajunge în `photo_url`, care are întâietate în
 * `doctorPhoto()` față de maparea locală din `doctor-photos.ts`. Medicii vechi
 * rămân astfel pe fișierele din `public/medici` până când cineva le încarcă o
 * poză nouă din panou - nu e nevoie de nicio migrare.
 */

export type DoctorState = {
  ok?: boolean;
  message?: string;
  error?: string;
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const doctorSchema = z.object({
  name: z.string().trim().min(2, "Numele e prea scurt.").max(120),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2)
    .max(80)
    .regex(slugPattern, "Adresa poate conține doar litere mici, cifre și cratime."),
  title: z.string().trim().max(120).optional().or(z.literal("")),
  credentials: z.string().trim().max(120).optional().or(z.literal("")),
  shortBio: z.string().trim().max(400, "Descrierea scurtă depășește 400 de caractere.").optional().or(z.literal("")),
  fullBio: z.string().trim().max(4000).optional().or(z.literal("")),
  isFounder: z.boolean(),
  specialtyIds: z.array(z.string().uuid()).max(6),
});

function readForm(formData: FormData) {
  return {
    name: formData.get("name"),
    slug: formData.get("slug"),
    title: formData.get("title") ?? "",
    credentials: formData.get("credentials") ?? "",
    shortBio: formData.get("shortBio") ?? "",
    fullBio: formData.get("fullBio") ?? "",
    isFounder: formData.get("isFounder") === "on",
    specialtyIds: formData.getAll("specialtyIds").map(String).filter(Boolean),
  };
}

function refresh() {
  refreshTag(DOCTORS_TAG);
  revalidatePath("/admin/medici");
}

/** Rescrie legăturile medic <-> specialitate. */
async function setSpecialties(
  supabase: Awaited<ReturnType<typeof createClient>>,
  doctorId: string,
  specialtyIds: string[],
): Promise<void> {
  const { error: delError } = await supabase
    .from("doctor_specialties")
    .delete()
    .eq("doctor_id", doctorId);
  if (delError) throw delError;

  if (specialtyIds.length === 0) return;

  const { error } = await supabase.from("doctor_specialties").insert(
    specialtyIds.map((specialty_id) => ({ doctor_id: doctorId, specialty_id })),
  );
  if (error) throw error;
}

export async function createDoctor(
  _state: DoctorState,
  formData: FormData,
): Promise<DoctorState> {
  const auth = await authorize("doctors");
  if (!auth.ok) return { error: auth.error };

  const parsed = doctorSchema.safeParse(readForm(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Date invalide." };
  }

  const d = parsed.data;

  try {
    const supabase = await createClient();

    const { data: last } = await supabase
      .from("doctors")
      .select("order_index")
      .order("order_index", { ascending: false })
      .limit(1)
      .maybeSingle();

    const photo = formData.get("photo");
    let photoUrl: string | null = null;
    if (photo instanceof File && photo.size > 0) {
      const upload = await uploadPortrait(photo, d.slug, Date.now());
      if (!upload.ok) return { error: upload.error };
      photoUrl = upload.url;
    }

    const { data: created, error } = await supabase
      .from("doctors")
      .insert({
        slug: d.slug,
        name: d.name,
        title: d.title || null,
        credentials: d.credentials || null,
        short_bio: d.shortBio || null,
        full_bio: d.fullBio || null,
        photo_url: photoUrl,
        is_founder: d.isFounder,
        order_index: (last?.order_index ?? 0) + 1,
      })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") {
        return { error: "Există deja un medic cu această adresă (slug)." };
      }
      throw error;
    }

    await setSpecialties(supabase, created.id, d.specialtyIds);

    await logAudit({
      actorId: auth.user.id,
      actorEmail: auth.user.email,
      action: "create",
      entity: "doctor",
      entityId: created.id,
      details: { slug: d.slug, name: d.name },
    });

    refresh();
    return { ok: true, message: `${d.name} a fost adăugat.` };
  } catch (err) {
    console.error("[doctors] creare:", err);
    return { error: "Nu am putut adăuga medicul." };
  }
}

const updateSchema = doctorSchema.extend({ id: z.string().uuid() });

export async function updateDoctor(
  _state: DoctorState,
  formData: FormData,
): Promise<DoctorState> {
  const auth = await authorize("doctors");
  if (!auth.ok) return { error: auth.error };

  const parsed = updateSchema.safeParse({
    ...readForm(formData),
    id: formData.get("id"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Date invalide." };
  }

  const d = parsed.data;

  try {
    const supabase = await createClient();

    const { data: existing } = await supabase
      .from("doctors")
      .select("photo_url, slug")
      .eq("id", d.id)
      .maybeSingle();

    if (!existing) return { error: "Medicul nu mai există." };

    let photoUrl = existing.photo_url;
    const photo = formData.get("photo");
    if (photo instanceof File && photo.size > 0) {
      const upload = await uploadPortrait(photo, d.slug, Date.now());
      if (!upload.ok) return { error: upload.error };
      photoUrl = upload.url;
      // Ștergem poza veche abia după ce cea nouă e sus, ca o eroare de încărcare
      // să nu lase medicul fără fotografie.
      await deletePortrait(existing.photo_url);
    }

    const { error } = await supabase
      .from("doctors")
      .update({
        slug: d.slug,
        name: d.name,
        title: d.title || null,
        credentials: d.credentials || null,
        short_bio: d.shortBio || null,
        full_bio: d.fullBio || null,
        photo_url: photoUrl,
        is_founder: d.isFounder,
      })
      .eq("id", d.id);

    if (error) {
      if (error.code === "23505") {
        return { error: "Există deja un medic cu această adresă (slug)." };
      }
      throw error;
    }

    await setSpecialties(supabase, d.id, d.specialtyIds);

    await logAudit({
      actorId: auth.user.id,
      actorEmail: auth.user.email,
      action: "update",
      entity: "doctor",
      entityId: d.id,
      details: { slug: d.slug },
    });

    refresh();
    revalidatePath(`/echipa/${d.slug}`);
    return { ok: true, message: "Modificările sunt live pe site." };
  } catch (err) {
    console.error("[doctors] actualizare:", err);
    return { error: "Nu am putut salva medicul." };
  }
}

export async function deleteDoctor(id: string): Promise<DoctorState> {
  const auth = await authorize("doctors");
  if (!auth.ok) return { error: auth.error };

  if (!z.string().uuid().safeParse(id).success) {
    return { error: "Date invalide." };
  }

  try {
    const supabase = await createClient();

    const { data: existing } = await supabase
      .from("doctors")
      .select("photo_url, name")
      .eq("id", id)
      .maybeSingle();

    // `doctor_specialties` are `on delete cascade`, deci se curăță singur.
    const { error } = await supabase.from("doctors").delete().eq("id", id);
    if (error) throw error;

    await deletePortrait(existing?.photo_url ?? null);

    await logAudit({
      actorId: auth.user.id,
      actorEmail: auth.user.email,
      action: "delete",
      entity: "doctor",
      entityId: id,
      details: { name: existing?.name },
    });

    refresh();
    return { ok: true, message: "Medicul a fost șters." };
  } catch (err) {
    console.error("[doctors] ștergere:", err);
    return { error: "Nu am putut șterge medicul." };
  }
}

/** Schimbă ordinea în care apar medicii pe site. */
export async function moveDoctor(
  id: string,
  direction: "up" | "down",
): Promise<DoctorState> {
  const auth = await authorize("doctors");
  if (!auth.ok) return { error: auth.error };

  try {
    const supabase = await createClient();
    const { data: all, error } = await supabase
      .from("doctors")
      .select("id, order_index")
      .order("order_index", { ascending: true });

    if (error) throw error;

    const list = all ?? [];
    const index = list.findIndex((d) => d.id === id);
    if (index === -1) return { error: "Medicul nu mai există." };

    const swapWith = direction === "up" ? index - 1 : index + 1;
    if (swapWith < 0 || swapWith >= list.length) return { ok: true };

    const current = list[index];
    const other = list[swapWith];

    const { error: e1 } = await supabase
      .from("doctors")
      .update({ order_index: other.order_index })
      .eq("id", current.id);
    if (e1) throw e1;

    const { error: e2 } = await supabase
      .from("doctors")
      .update({ order_index: current.order_index })
      .eq("id", other.id);
    if (e2) throw e2;

    refresh();
    return { ok: true };
  } catch (err) {
    console.error("[doctors] reordonare:", err);
    return { error: "Nu am putut schimba ordinea." };
  }
}
