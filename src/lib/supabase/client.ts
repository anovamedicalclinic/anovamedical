import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

/**
 * Client Supabase pentru componente de browser ('use client').
 * Folosește cheia anon publică - accesul este guvernat de Row Level Security.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
