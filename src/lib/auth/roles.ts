import type { UserRole } from "@/lib/supabase/types";

/**
 * Definiția rolurilor - partea care poate fi folosită și în client.
 *
 * Separată de `dal.ts` pentru că acela e `server-only` (citește cookie-uri și
 * vorbește cu baza de date). Fără separare, un formular din panou care voia doar
 * eticheta „Administrator” ar fi tras tot stratul de autentificare în bundle-ul
 * de browser, iar build-ul ar fi picat - corect, de altfel.
 *
 * Aici nu se ia nicio decizie de securitate: sunt doar date. Verificarea reală
 * se face pe server, în `dal.ts`, și încă o dată în politicile RLS.
 */

/** Ce rol are voie la ce secțiune. Oglindit în RLS, în 0002_admin.sql. */
export const permissions = {
  content: ["admin", "editor"],
  doctors: ["admin", "editor"],
  testimonials: ["admin", "editor"],
  staff: ["admin", "editor"],
  appointments: ["admin", "editor", "reception"],
  settings: ["admin"],
  users: ["admin"],
} as const satisfies Record<string, readonly UserRole[]>;

export type Area = keyof typeof permissions;

/** True dacă rolul dat are acces la secțiune. */
export function roleCan(role: UserRole, area: Area): boolean {
  return (permissions[area] as readonly UserRole[]).includes(role);
}

export const roleLabels: Record<UserRole, string> = {
  admin: "Administrator",
  editor: "Editor",
  reception: "Recepție",
};

export const roleDescriptions: Record<UserRole, string> = {
  admin: "Acces complet, inclusiv utilizatori și setări de email.",
  editor: "Conținut (texte, medici, recenzii) și cereri de programare.",
  reception: "Doar cererile de programare.",
};
