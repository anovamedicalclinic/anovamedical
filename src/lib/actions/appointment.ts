"use server";

import { createClient } from "@/lib/supabase/server";
import {
  appointmentSchema,
  type AppointmentInput,
  type AppointmentResult,
} from "@/lib/appointment-schema";

function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/**
 * Server Action pentru cererile de programare.
 * Inserează în `appointment_requests` (policy INSERT public). Confirmarea reală
 * se face telefonic. Statusul rămâne 'new' până la contactul cu pacientul.
 */
export async function submitAppointment(
  input: AppointmentInput,
): Promise<AppointmentResult> {
  const parsed = appointmentSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Datele introduse nu sunt valide." };
  }

  const data = parsed.data;

  // Honeypot completat = bot. Răspundem cu succes fără a stoca nimic.
  if (data.company && data.company.length > 0) {
    return { ok: true };
  }

  // Fără Supabase configurat (ex: demo local) - nu stocăm, dar nu blocăm UX-ul.
  if (!isSupabaseConfigured()) {
    console.warn(
      "[appointment] Supabase neconfigurat - cererea nu a fost stocată (demo).",
    );
    return { ok: true };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("appointment_requests").insert({
      full_name: data.fullName,
      phone: data.phone,
      email: data.email ? data.email : null,
      specialty_id: data.specialtyId ? data.specialtyId : null,
      preferred_date: data.preferredDate ? data.preferredDate : null,
      message: data.message ? data.message : null,
    });

    if (error) {
      console.error("[appointment] insert error:", error);
      return {
        ok: false,
        error: "A apărut o eroare. Te rugăm să ne suni direct.",
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("[appointment] unexpected error:", err);
    return {
      ok: false,
      error: "A apărut o eroare. Te rugăm să ne suni direct.",
    };
  }
}
