import "server-only";

import { headers } from "next/headers";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";

/**
 * Limitare de rată pentru formularul public de programare.
 *
 * Este singura suprafață pe care o poate atinge oricine, fără cont. Honeypot-ul
 * oprește boții naivi, dar nu și pe cineva care trimite formularul în buclă:
 * fără limită, tabelul de cereri poate fi inundat, iar dacă SMTP-ul e pornit,
 * fiecare trimitere devine un email către clinică.
 *
 * Numărătoarea se face în baza de date, nu în memorie, pentru că pe Vercel
 * fiecare cerere poate ajunge la altă instanță - un contor din memorie ar fi
 * resetat constant și n-ar limita nimic.
 *
 * Politica: cel mult `MAX_PER_WINDOW` cereri dintr-un IP într-o oră. Pragul e
 * ales deliberat permisiv: o familie sau o clinică partener pot împărți același
 * IP, iar un pacient real nu trebuie blocat niciodată.
 */

const WINDOW_MINUTES = 60;
const MAX_PER_WINDOW = 5;

/** IP-ul real al vizitatorului, din antetele puse de platformă. */
async function clientIp(): Promise<string | null> {
  const h = await headers();
  // Pe Vercel, `x-forwarded-for` are forma "client, proxy1, proxy2".
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || null;
  return h.get("x-real-ip");
}

export type RateLimitResult = { allowed: true } | { allowed: false; error: string };

export async function checkAppointmentRateLimit(): Promise<RateLimitResult> {
  // Fără service role nu putem citi cererile (nu există SELECT public, corect).
  // Preferăm să lăsăm cererea să treacă decât să blocăm un pacient real.
  if (!isAdminConfigured()) return { allowed: true };

  const ip = await clientIp();
  if (!ip) return { allowed: true };

  try {
    const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();
    const supabase = createAdminClient();

    const { count, error } = await supabase
      .from("appointment_requests")
      .select("*", { count: "exact", head: true })
      .eq("client_ip", ip)
      .gte("created_at", since);

    if (error) throw error;

    if ((count ?? 0) >= MAX_PER_WINDOW) {
      return {
        allowed: false,
        error:
          "Ai trimis deja mai multe cereri. Te rugăm să ne suni direct, te ajutăm imediat.",
      };
    }

    return { allowed: true };
  } catch (err) {
    // O eroare de infrastructură nu are voie să blocheze o programare.
    console.error("[rate-limit] verificare eșuată, las cererea să treacă:", err);
    return { allowed: true };
  }
}

/** IP-ul de stocat pe cerere, pentru numărătoarea de mai sus. */
export async function ipForStorage(): Promise<string | null> {
  return clientIp();
}
