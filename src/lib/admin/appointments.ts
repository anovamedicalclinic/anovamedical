import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { AppointmentRequest, AppointmentStatus } from "@/lib/supabase/types";

/**
 * Citirea cererilor de programare pentru panou.
 *
 * Conțin date de pacienți, deci NU se memorează în cache și NU se citesc cu
 * clientul public. Se folosește clientul cu sesiunea utilizatorului, astfel
 * încât Row Level Security să rămână plasa de siguranță chiar dacă o verificare
 * din cod ar fi omisă: fără profil activ, interogarea întoarce zero rânduri.
 */

export type AppointmentWithSpecialty = AppointmentRequest & {
  specialty_name: string | null;
};

export const statusLabels: Record<AppointmentStatus, string> = {
  new: "Nouă",
  contacted: "Contactat",
  scheduled: "Programat",
  cancelled: "Anulată",
};

/** Ordinea din interfață, nu cea alfabetică. */
export const statusOrder: AppointmentStatus[] = [
  "new",
  "contacted",
  "scheduled",
  "cancelled",
];

export async function listAppointments(options?: {
  status?: AppointmentStatus | "all";
  search?: string;
  limit?: number;
}): Promise<AppointmentWithSpecialty[]> {
  const { status = "all", search, limit = 200 } = options ?? {};

  try {
    const supabase = await createClient();
    let query = supabase
      .from("appointment_requests")
      .select("*, specialties(name)")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (status !== "all") query = query.eq("status", status);

    if (search?.trim()) {
      // `or` cu ilike acoperă nume, telefon și email dintr-un singur câmp de
      // căutare. Virgulele și parantezele din termen sunt eliminate pentru că
      // ar rupe sintaxa filtrului PostgREST.
      const term = search.trim().replace(/[,()*]/g, " ");
      query = query.or(
        `full_name.ilike.%${term}%,phone.ilike.%${term}%,email.ilike.%${term}%`,
      );
    }

    const { data, error } = await query.returns<
      (AppointmentRequest & { specialties: { name: string } | null })[]
    >();

    if (error) throw error;

    return (data ?? []).map(({ specialties, ...row }) => ({
      ...row,
      specialty_name: specialties?.name ?? null,
    }));
  } catch (err) {
    console.error("[admin] nu am putut citi cererile:", err);
    return [];
  }
}

/** Numărul de cereri necontactate, pentru badge-ul din meniu. */
export async function countNewAppointments(): Promise<number> {
  try {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from("appointment_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "new");
    if (error) throw error;
    return count ?? 0;
  } catch {
    return 0;
  }
}

/** Câte cereri sunt în fiecare stare, pentru filtre și pentru panoul de start. */
export async function countAppointmentsByStatus(): Promise<
  Record<AppointmentStatus, number>
> {
  const empty: Record<AppointmentStatus, number> = {
    new: 0,
    contacted: 0,
    scheduled: 0,
    cancelled: 0,
  };

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("appointment_requests")
      .select("status")
      .returns<{ status: AppointmentStatus }[]>();
    if (error) throw error;

    for (const row of data ?? []) empty[row.status] += 1;
    return empty;
  } catch {
    return empty;
  }
}
