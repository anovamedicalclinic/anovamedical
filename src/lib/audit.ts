import "server-only";

import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";
import type { Json } from "@/lib/supabase/types";

/**
 * Jurnalul de audit.
 *
 * Scrie cu service role pentru două motive: `audit_log` nu are policy de INSERT
 * (deci nimeni nu își poate falsifica propriile urme), iar unele evenimente
 * (cereri de programare venite de la vizitatori anonimi) nu au sesiune.
 *
 * Jurnalizarea nu are voie să strice acțiunea care a reușit deja: orice eroare
 * de aici e doar înregistrată în consolă.
 */
export async function logAudit(entry: {
  actorId?: string | null;
  actorEmail?: string | null;
  action: string;
  entity: string;
  entityId?: string | null;
  details?: Json;
}): Promise<void> {
  if (!isAdminConfigured()) return;

  try {
    const supabase = createAdminClient();
    await supabase.from("audit_log").insert({
      actor_id: entry.actorId ?? null,
      actor_email: entry.actorEmail ?? null,
      action: entry.action,
      entity: entry.entity,
      entity_id: entry.entityId ?? null,
      details: entry.details ?? null,
    });
  } catch (err) {
    console.error("[audit] nu am putut scrie în jurnal:", err);
  }
}
