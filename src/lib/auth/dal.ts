import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { roleCan, type Area } from "@/lib/auth/roles";
import type { Profile } from "@/lib/supabase/types";

/**
 * Stratul de acces la date pentru autentificare (DAL).
 *
 * Regula, luată din ghidul Next.js: verificarea se face cât mai aproape de
 * date, nu în layout. Un layout nu se re-randează la fiecare navigare, deci o
 * verificare pusă acolo poate fi ocolită. De aceea fiecare pagină și fiecare
 * Server Action cheamă `requireRole` pe cont propriu.
 *
 * `proxy.ts` face doar o verificare optimistă (există cookie de sesiune?), ca
 * să redirecteze rapid; adevărul se stabilește aici, cu profilul din baza de
 * date.
 */

// Rolurile în sine stau în `roles.ts`, ca formularele din panou să le poată
// folosi fără a trage stratul de server în bundle-ul de browser.
export type { Area } from "@/lib/auth/roles";
export { permissions, roleCan, roleLabels, roleDescriptions } from "@/lib/auth/roles";

export type SessionUser = {
  id: string;
  email: string;
  profile: Profile;
};

/**
 * Utilizatorul curent, sau null.
 *
 * `cache()` memoizează pe durata unui singur render, deci mai multe apeluri în
 * aceeași pagină nu înseamnă mai multe interogări.
 *
 * Folosește `getUser()`, nu `getSession()`: `getUser()` validează token-ul la
 * serverul Supabase, în timp ce sesiunea din cookie poate fi falsificată.
 */
export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) return null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    // Cont fără profil sau dezactivat: tratat ca neautentificat.
    if (!profile || !profile.is_active) return null;

    return { id: user.id, email: user.email ?? profile.email, profile };
  } catch (err) {
    console.error("[auth] nu am putut citi sesiunea:", err);
    return null;
  }
});

/** Cere un utilizator autentificat și activ; altfel trimite la login. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  return user;
}

/**
 * Cere acces la o secțiune. Lipsa sesiunii duce la login; sesiune validă dar
 * rol insuficient duce la o pagină care explică limitarea, ca utilizatorul să
 * înțeleagă că e o chestiune de drepturi, nu de autentificare.
 *
 * Deliberat NU folosim `forbidden()`: ar cere `experimental.authInterrupts`, iar
 * un site de producție nu are de ce să depindă de un flag experimental pentru
 * ceva ce se rezolvă cu o redirectare.
 */
export async function requireRole(area: Area): Promise<SessionUser> {
  const user = await requireUser();
  if (!roleCan(user.profile.role, area)) {
    redirect(`/admin/acces-interzis?sectiune=${encodeURIComponent(area)}`);
  }
  return user;
}

/**
 * Varianta pentru Server Actions: nu aruncă redirect/forbidden, ci întoarce un
 * rezultat pe care acțiunea îl poate transforma în mesaj de eroare în formular.
 */
export async function authorize(
  area: Area,
): Promise<
  { ok: true; user: SessionUser } | { ok: false; error: string }
> {
  const user = await getSessionUser();
  if (!user) {
    return { ok: false, error: "Sesiunea a expirat. Autentifică-te din nou." };
  }
  if (!roleCan(user.profile.role, area)) {
    return { ok: false, error: "Nu ai drepturi pentru această acțiune." };
  }
  return { ok: true, user };
}
