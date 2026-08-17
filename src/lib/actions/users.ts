"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authorize } from "@/lib/auth/dal";
import { createAdminClient } from "@/lib/supabase/admin";
import { logAudit } from "@/lib/audit";

/**
 * Gestionarea utilizatorilor panoului.
 *
 * Crearea și ștergerea conturilor cer service role (API-ul de administrare al
 * Supabase Auth), de aceea toate acțiunile de aici verifică întâi rolul de
 * administrator - RLS nu poate apăra ce se face cu service role.
 *
 * Două reguli îl protejează pe ultimul administrator: nimeni nu își poate
 * schimba sau dezactiva propriul cont, și nu se poate coborî rolul ultimului
 * administrator activ. Fără ele, o singură apăsare greșită ar putea lăsa
 * clinica fără acces la panou.
 */

export type UserActionState = {
  ok?: boolean;
  message?: string;
  error?: string;
};

const roleEnum = z.enum(["admin", "editor", "reception"]);

const createSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email("Adresa nu e validă.")),
  fullName: z.string().trim().min(2, "Numele e prea scurt.").max(120),
  role: roleEnum,
  password: z
    .string()
    .min(10, "Parola trebuie să aibă cel puțin 10 caractere.")
    .max(72),
});

/** Câți administratori activi există, în afară de cel dat. */
async function otherActiveAdmins(exceptId: string): Promise<number> {
  const supabase = createAdminClient();
  const { count } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("role", "admin")
    .eq("is_active", true)
    .neq("id", exceptId);
  return count ?? 0;
}

export async function createUser(
  _state: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  const auth = await authorize("users");
  if (!auth.ok) return { error: auth.error };

  const parsed = createSchema.safeParse({
    email: formData.get("email"),
    fullName: formData.get("fullName"),
    role: formData.get("role"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Date invalide." };
  }

  const { email, fullName, role, password } = parsed.data;
  const supabase = createAdminClient();

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      // Contul e creat de un administrator, deci adresa e considerată
      // confirmată; altfel utilizatorul n-ar putea intra până la click pe email.
      email_confirm: true,
    });

    if (error || !data.user) {
      const duplicate = error?.message?.toLowerCase().includes("already");
      return {
        error: duplicate
          ? "Există deja un cont cu această adresă."
          : "Nu am putut crea contul.",
      };
    }

    // Trigger-ul din 0002 a creat deja un profil inactiv; îl ridicăm la rolul
    // ales. `upsert` acoperă și cazul în care trigger-ul lipsește.
    const { error: profileError } = await supabase.from("profiles").upsert(
      {
        id: data.user.id,
        email,
        full_name: fullName,
        role,
        is_active: true,
      },
      { onConflict: "id" },
    );

    if (profileError) {
      // Contul de autentificare ar rămâne orfan, fără drepturi. Îl ștergem, ca
      // să nu blocheze adresa la o încercare ulterioară.
      await supabase.auth.admin.deleteUser(data.user.id);
      throw profileError;
    }

    await logAudit({
      actorId: auth.user.id,
      actorEmail: auth.user.email,
      action: "create",
      entity: "user",
      entityId: data.user.id,
      details: { email, role },
    });

    revalidatePath("/admin/utilizatori");
    return { ok: true, message: `Contul pentru ${email} a fost creat.` };
  } catch (err) {
    console.error("[users] creare:", err);
    return { error: "Nu am putut crea contul." };
  }
}

const updateSchema = z.object({
  id: z.string().uuid(),
  role: roleEnum,
  isActive: z.boolean(),
});

export async function updateUser(
  input: z.input<typeof updateSchema>,
): Promise<UserActionState> {
  const auth = await authorize("users");
  if (!auth.ok) return { error: auth.error };

  const parsed = updateSchema.safeParse(input);
  if (!parsed.success) return { error: "Date invalide." };

  const { id, role, isActive } = parsed.data;

  if (id === auth.user.id) {
    return {
      error: "Nu îți poți modifica propriul cont. Cere altui administrator.",
    };
  }

  try {
    const supabase = createAdminClient();

    // Dacă ținta e administrator și pierde rolul sau e dezactivată, verificăm
    // să nu rămână clinica fără niciun administrator activ.
    const { data: target } = await supabase
      .from("profiles")
      .select("role, is_active, email")
      .eq("id", id)
      .maybeSingle();

    if (!target) return { error: "Contul nu mai există." };

    const losesAdmin =
      target.role === "admin" && target.is_active && (role !== "admin" || !isActive);

    if (losesAdmin && (await otherActiveAdmins(id)) === 0) {
      return {
        error: "Nu poți lăsa panoul fără niciun administrator activ.",
      };
    }

    const { error } = await supabase
      .from("profiles")
      .update({ role, is_active: isActive })
      .eq("id", id);

    if (error) throw error;

    await logAudit({
      actorId: auth.user.id,
      actorEmail: auth.user.email,
      action: "update",
      entity: "user",
      entityId: id,
      details: { role, is_active: isActive, email: target.email },
    });

    revalidatePath("/admin/utilizatori");
    return { ok: true, message: "Contul a fost actualizat." };
  } catch (err) {
    console.error("[users] actualizare:", err);
    return { error: "Nu am putut actualiza contul." };
  }
}

export async function deleteUser(id: string): Promise<UserActionState> {
  const auth = await authorize("users");
  if (!auth.ok) return { error: auth.error };

  if (!z.string().uuid().safeParse(id).success) {
    return { error: "Date invalide." };
  }

  if (id === auth.user.id) {
    return { error: "Nu îți poți șterge propriul cont." };
  }

  try {
    const supabase = createAdminClient();

    const { data: target } = await supabase
      .from("profiles")
      .select("role, is_active, email")
      .eq("id", id)
      .maybeSingle();

    if (!target) return { error: "Contul nu mai există." };

    if (
      target.role === "admin" &&
      target.is_active &&
      (await otherActiveAdmins(id)) === 0
    ) {
      return { error: "Nu poți șterge ultimul administrator activ." };
    }

    // `profiles.id` are `on delete cascade` către auth.users, deci ștergerea
    // contului de autentificare curăță și profilul.
    const { error } = await supabase.auth.admin.deleteUser(id);
    if (error) throw error;

    await logAudit({
      actorId: auth.user.id,
      actorEmail: auth.user.email,
      action: "delete",
      entity: "user",
      entityId: id,
      details: { email: target.email },
    });

    revalidatePath("/admin/utilizatori");
    return { ok: true, message: "Contul a fost șters." };
  } catch (err) {
    console.error("[users] ștergere:", err);
    return { error: "Nu am putut șterge contul." };
  }
}
