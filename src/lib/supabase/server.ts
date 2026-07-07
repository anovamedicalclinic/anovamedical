import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";

/**
 * Client Supabase pentru Server Components, Route Handlers și Server Actions.
 * Folosește cheia anon - accesul este guvernat de Row Level Security.
 * Citirea datelor private (appointment_requests) NU se face prin acest client.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // `setAll` apelat dintr-un Server Component - poate fi ignorat
            // dacă există un middleware care reîmprospătează sesiunile.
          }
        },
      },
    },
  );
}
