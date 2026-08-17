"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { logAudit } from "@/lib/audit";

/**
 * Autentificarea în panou.
 *
 * Limitarea numărului de încercări este asigurată de Supabase Auth (are throttle
 * pe IP și pe adresă de email), deci nu o dublăm aici. Mesajele de eroare sunt
 * intenționat vagi: nu confirmăm dacă o adresă există în sistem.
 */

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email()),
  password: z.string().min(1),
  redirectTo: z.string().optional(),
});

export type LoginState = { error?: string } | undefined;

/** Doar căi interne, ca `?redirect=` să nu poată trimite pe alt domeniu. */
function safeRedirect(target: string | undefined): string {
  if (!target) return "/admin";
  if (!target.startsWith("/admin")) return "/admin";
  if (target.startsWith("//")) return "/admin";
  return target;
}

export async function signIn(
  _state: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: formData.get("redirectTo") ?? undefined,
  });

  if (!parsed.success) {
    return { error: "Completează adresa de email și parola." };
  }

  const { email, password, redirectTo } = parsed.data;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { error: "Email sau parolă greșite." };
  }

  // Contul există în Auth, dar accesul îl dă profilul. Un cont dezactivat (sau
  // fără profil) este deconectat imediat, ca sesiunea să nu rămână deschisă.
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, is_active")
    .eq("id", data.user.id)
    .maybeSingle();

  if (!profile || !profile.is_active) {
    await supabase.auth.signOut();
    return {
      error: "Contul nu are acces la panou. Cere unui administrator să îl activeze.",
    };
  }

  await logAudit({
    actorId: data.user.id,
    actorEmail: email,
    action: "login",
    entity: "auth",
  });

  redirect(safeRedirect(redirectTo));
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await supabase.auth.signOut();

  if (user) {
    await logAudit({
      actorId: user.id,
      actorEmail: user.email ?? null,
      action: "logout",
      entity: "auth",
    });
  }

  revalidatePath("/admin", "layout");
  redirect("/admin/login");
}
