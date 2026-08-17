import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Client cu service role - OCOLEȘTE complet Row Level Security.
 *
 * `server-only` face build-ul să eșueze dacă acest fișier ajunge vreodată
 * într-un bundle de client, ca să nu existe nicio cale prin care cheia să
 * ajungă în browser.
 *
 * Se folosește DOAR pentru operațiuni care nu pot trece prin RLS:
 *   - citirea/scrierea în `app_settings` (secrete SMTP, tabel fără policy);
 *   - crearea și ștergerea utilizatorilor din Supabase Auth;
 *   - scrierea în `audit_log`;
 *   - trimiterea notificărilor pentru cereri venite de la vizitatori anonimi.
 *
 * Orice apel trebuie precedat de o verificare de rol (vezi `src/lib/auth/dal.ts`).
 * Pentru restul citirilor și scrierilor, folosește clientul cu sesiunea
 * utilizatorului, ca RLS să rămână plasa de siguranță.
 */
export function createAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY lipsește. Panoul de administrare nu poate funcționa fără ea.",
    );
  }

  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    key,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

/** True dacă cheia de service role este configurată. */
export function isAdminConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}
