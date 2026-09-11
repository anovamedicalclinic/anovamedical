/**
 * Unde ajunge utilizatorul după autentificare. Doar căi interne din panou, ca
 * `?redirect=` să nu poată trimite pe alt domeniu.
 *
 * Stă separat de `actions/auth.ts` pentru că un fișier `"use server"` poate
 * exporta doar acțiuni, iar pagina de login are nevoie de aceeași regulă.
 */
export function safeRedirect(target: string | undefined): string {
  if (!target) return "/admin";
  if (!target.startsWith("/admin")) return "/admin";
  if (target.startsWith("//")) return "/admin";
  return target;
}
