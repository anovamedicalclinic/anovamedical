import { unstable_cache } from "next/cache";
import { createPublicClient, isSupabaseConfigured } from "@/lib/supabase/public";
import { contentDefaults } from "./registry";

/**
 * Citirea textelor editabile.
 *
 * `site_content` conține doar suprascrierile; restul vine din `contentDefaults`.
 * Rezultatul e memorat sub eticheta `content`, invalidată din panou la salvare
 * (vezi `src/lib/actions/content.ts`). Dacă baza de date nu răspunde, ne
 * întoarcem la valorile implicite - site-ul rămâne identic cu varianta din cod,
 * niciodată gol.
 */

export const CONTENT_TAG = "content";

const loadOverrides = unstable_cache(
  async (): Promise<Record<string, string>> => {
    if (!isSupabaseConfigured()) return {};

    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase
        .from("site_content")
        .select("key, value");

      if (error) throw error;

      const overrides: Record<string, string> = {};
      for (const row of data ?? []) {
        // Un rând gol înseamnă „revino la valoarea implicită”.
        if (row.value !== null && row.value !== "") overrides[row.key] = row.value;
      }
      return overrides;
    } catch (err) {
      console.warn("[content] folosesc valorile implicite:", err);
      return {};
    }
  },
  ["site-content"],
  { tags: [CONTENT_TAG], revalidate: 3600 },
);

export type ContentReader = (key: string) => string;

/**
 * Încarcă textele o singură dată și întoarce un cititor sincron.
 *
 * Se apelează dintr-o componentă de server, iar rezultatul se pasează în jos ca
 * prop, astfel încât componentele client (ex. hero-ul) să nu aibă nevoie de
 * acces la bază.
 */
export async function getContent(): Promise<ContentReader> {
  const overrides = await loadOverrides();

  return (key: string) => {
    const value = overrides[key] ?? contentDefaults[key];
    if (value === undefined) {
      // Cheie inexistentă în registru: greșeală de programare, nu de conținut.
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[content] cheie necunoscută: ${key}`);
      }
      return "";
    }
    return value;
  };
}

/** Varianta brută, pentru panou: ce e suprascris și ce nu. */
export async function getContentOverrides(): Promise<Record<string, string>> {
  return loadOverrides();
}

/** Înlocuiește substituenții simpli de forma {nume}. */
export function fill(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in values ? String(values[name]) : match,
  );
}
