"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authorize } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { logAudit } from "@/lib/audit";

/**
 * Acțiunile din ecranul „Cereri de programare”.
 *
 * Scrierea se face cu sesiunea utilizatorului, nu cu service role: RLS rămâne
 * astfel a doua barieră după `authorize`. Recepția are acces aici, dar nu la
 * conținut.
 */

export type ActionResult = { ok: true } | { ok: false; error: string };

const statusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "contacted", "scheduled", "cancelled"]),
});

export async function updateAppointmentStatus(
  input: z.input<typeof statusSchema>,
): Promise<ActionResult> {
  const auth = await authorize("appointments");
  if (!auth.ok) return auth;

  const parsed = statusSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Date invalide." };

  const { id, status } = parsed.data;

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("appointment_requests")
      .update({
        status,
        // Cine a atins ultima dată cererea și când - util când lucrează mai
        // multe persoane la recepție.
        handled_by: auth.user.id,
        handled_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) throw error;

    await logAudit({
      actorId: auth.user.id,
      actorEmail: auth.user.email,
      action: "update",
      entity: "appointment",
      entityId: id,
      details: { status },
    });

    revalidatePath("/admin/cereri");
    revalidatePath("/admin");
    return { ok: true };
  } catch (err) {
    console.error("[admin] status update:", err);
    return { ok: false, error: "Nu am putut salva starea." };
  }
}

const notesSchema = z.object({
  id: z.string().uuid(),
  notes: z.string().max(2000),
});

export async function updateAppointmentNotes(
  input: z.input<typeof notesSchema>,
): Promise<ActionResult> {
  const auth = await authorize("appointments");
  if (!auth.ok) return auth;

  const parsed = notesSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Notița e prea lungă (maxim 2000 de caractere)." };
  }

  const { id, notes } = parsed.data;

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("appointment_requests")
      .update({ notes: notes.trim() || null })
      .eq("id", id);

    if (error) throw error;

    await logAudit({
      actorId: auth.user.id,
      actorEmail: auth.user.email,
      action: "update",
      entity: "appointment_notes",
      entityId: id,
    });

    revalidatePath("/admin/cereri");
    return { ok: true };
  } catch (err) {
    console.error("[admin] notes update:", err);
    return { ok: false, error: "Nu am putut salva notița." };
  }
}
