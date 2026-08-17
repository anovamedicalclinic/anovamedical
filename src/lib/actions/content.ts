"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authorize } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { logAudit } from "@/lib/audit";
import { refreshTag } from "@/lib/revalidate";
import { CONTENT_TAG } from "@/lib/content/get";
import { contentFields, contentSections } from "@/lib/content/registry";

/**
 * Salvarea textelor editabile.
 *
 * Nucleul protecției cerute („să nu se strice design-ul”) e aici: se acceptă
 * exclusiv chei care există în registru, iar fiecare valoare e verificată față
 * de `max`-ul declarat pentru câmpul respectiv. O cheie inventată sau un text
 * peste limită sunt respinse înainte să atingă baza de date, deci nu există cale
 * prin care panoul să scrie ceva ce layout-ul nu poate afișa.
 *
 * O valoare golită înseamnă „revino la textul implicit din cod”: ștergem rândul
 * în loc să salvăm un șir gol, altfel secțiunea ar rămâne fără text pe site.
 */

export type ContentState = {
  ok?: boolean;
  message?: string;
  error?: string;
  /** Cheile care au picat validarea, pentru a le marca în formular. */
  invalid?: string[];
};

export async function saveContentSection(
  _state: ContentState,
  formData: FormData,
): Promise<ContentState> {
  const auth = await authorize("content");
  if (!auth.ok) return { error: auth.error };

  const sectionId = String(formData.get("sectionId") ?? "");
  const section = contentSections.find((s) => s.id === sectionId);
  if (!section) return { error: "Secțiune necunoscută." };

  const updates: { key: string; value: string }[] = [];
  const removals: string[] = [];
  const invalid: string[] = [];

  for (const field of section.fields) {
    const raw = formData.get(field.key);
    if (raw === null) continue;

    const value = String(raw).trim();

    if (value.length === 0) {
      removals.push(field.key);
      continue;
    }

    if (value.length > field.max) {
      invalid.push(field.key);
      continue;
    }

    // Linkurile trebuie să rămână linkuri: un `javascript:` strecurat aici ar
    // ajunge într-un href de pe site.
    if (field.kind === "url" && !/^https?:\/\//i.test(value)) {
      invalid.push(field.key);
      continue;
    }
    if (field.kind === "email" && !z.string().email().safeParse(value).success) {
      invalid.push(field.key);
      continue;
    }

    // Ultima verificare: cheia chiar există în registru.
    if (!contentFields.has(field.key)) continue;

    updates.push({ key: field.key, value });
  }

  if (invalid.length > 0) {
    return {
      error:
        "Unele câmpuri depășesc limita sau nu au formatul cerut. Sunt marcate mai jos.",
      invalid,
    };
  }

  try {
    const supabase = await createClient();

    if (updates.length > 0) {
      const { error } = await supabase.from("site_content").upsert(
        updates.map((u) => ({
          key: u.key,
          value: u.value,
          updated_by: auth.user.id,
          updated_at: new Date().toISOString(),
        })),
        { onConflict: "key" },
      );
      if (error) throw error;
    }

    if (removals.length > 0) {
      const { error } = await supabase
        .from("site_content")
        .delete()
        .in("key", removals);
      if (error) throw error;
    }

    await logAudit({
      actorId: auth.user.id,
      actorEmail: auth.user.email,
      action: "update",
      entity: "content",
      entityId: sectionId,
      details: { changed: updates.length, reset: removals.length },
    });

    // Reîmprospătează paginile publice care folosesc textele.
    refreshTag(CONTENT_TAG);
    revalidatePath("/admin/texte");

    return {
      ok: true,
      message:
        removals.length > 0 && updates.length === 0
          ? "Textele au revenit la valorile implicite."
          : "Modificările sunt live pe site.",
    };
  } catch (err) {
    console.error("[content] salvare:", err);
    return { error: "Nu am putut salva textele." };
  }
}
