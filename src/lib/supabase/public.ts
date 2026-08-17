import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Client pentru CITIREA conținutului public (medici, specialități, texte,
 * recenzii, echipa de suport).
 *
 * Diferența față de `server.ts`: acesta NU citește cookie-uri. Este esențial -
 * `cookies()` este un API de request, iar orice funcție care îl folosește nu
 * poate fi împachetată în `unstable_cache`, deci pagina ar deveni dinamică la
 * fiecare cerere. Fără cookie-uri, citirile pot fi memorate și invalidate pe
 * etichete când se salvează ceva din panou.
 *
 * Folosește cheia anon, deci accesul rămâne guvernat de Row Level Security:
 * vede exact ce vede un vizitator.
 */
export function createPublicClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

/** True dacă avem variabilele necesare pentru a vorbi cu Supabase. */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
