"use server";

import { after } from "next/server";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";
import { createPublicClient, isSupabaseConfigured } from "@/lib/supabase/public";
import { sendAppointmentNotification } from "@/lib/email";
import {
  appointmentSchema,
  type AppointmentInput,
  type AppointmentResult,
} from "@/lib/appointment-schema";

/**
 * Server Action pentru cererile de programare.
 *
 * Inserează în `appointment_requests` (policy INSERT public) și trimite
 * notificarea pe email. Confirmarea reală se face telefonic, deci statusul
 * rămâne 'new' până la contactul cu pacientul.
 *
 * Emailul se trimite în `after()`, adică după ce răspunsul a plecat spre
 * vizitator. Un SMTP lent nu are de ce să țină formularul în „se trimite”, iar
 * un SMTP căzut nu are de ce să transforme o cerere salvată corect într-un mesaj
 * de eroare. Dacă trimiterea eșuează, motivul se scrie pe rândul cererii, ca
 * panoul să poată arăta „nu a plecat pe mail”.
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
    const supabase = createPublicClient();
    const { data: inserted, error } = await supabase
      .from("appointment_requests")
      .insert({
        full_name: data.fullName,
        phone: data.phone,
        email: data.email ? data.email : null,
        specialty_id: data.specialtyId ? data.specialtyId : null,
        preferred_date: data.preferredDate ? data.preferredDate : null,
        message: data.message ? data.message : null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[appointment] insert error:", error);
      return {
        ok: false,
        error: "A apărut o eroare. Te rugăm să ne suni direct.",
      };
    }

    after(async () => {
      await notify(inserted.id, data);
    });

    return { ok: true };
  } catch (err) {
    console.error("[appointment] unexpected error:", err);
    return {
      ok: false,
      error: "A apărut o eroare. Te rugăm să ne suni direct.",
    };
  }
}

/** Trimite notificarea și notează rezultatul pe cerere. */
async function notify(
  requestId: string,
  data: AppointmentInput,
): Promise<void> {
  try {
    // Numele specialității se citește pentru email; policy-ul de SELECT e public.
    let specialtyName: string | null = null;
    if (data.specialtyId) {
      const supabase = createPublicClient();
      const { data: specialty } = await supabase
        .from("specialties")
        .select("name")
        .eq("id", data.specialtyId)
        .maybeSingle();
      specialtyName = specialty?.name ?? null;
    }

    const result = await sendAppointmentNotification({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email || null,
      specialtyName,
      preferredDate: data.preferredDate || null,
      message: data.message || null,
    });

    // `skipped` înseamnă că nu s-a încercat nimic (SMTP neconfigurat sau
    // notificări oprite). Nu e o eroare de trimitere, deci lăsăm starea goală ca
    // panoul să nu raporteze un eșec inexistent.
    if (result.ok === false && result.skipped) {
      console.warn("[appointment] notificare sărită:", result.error);
      return;
    }

    if (!result.ok) {
      console.error("[appointment] email eșuat:", result.error);
    }

    // Marcăm rezultatul pe rând. Necesită service role: vizitatorul e anonim și
    // nu are drept de UPDATE pe tabel.
    if (isAdminConfigured()) {
      const admin = createAdminClient();
      await admin
        .from("appointment_requests")
        .update({
          email_status: result.ok ? "sent" : "failed",
          email_error: result.ok ? null : result.error.slice(0, 500),
        })
        .eq("id", requestId);
    }
  } catch (err) {
    console.error("[appointment] notificare eșuată:", err);
  }
}
