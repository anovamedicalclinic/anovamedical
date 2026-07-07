import { createClient } from "@/lib/supabase/server";
import type { Doctor, Specialty } from "@/lib/supabase/types";
import { fallbackDoctors, fallbackSpecialties } from "@/lib/fallback-data";

/**
 * Strat de acces la date (read-only, conținut public).
 *
 * Sursa principală e Supabase (cheie anon + policy-uri SELECT publice). Dacă
 * variabilele de mediu lipsesc sau un query eșuează, se folosesc datele de
 * rezervă din `fallback-data.ts`, astfel încât site-ul să funcționeze și înainte
 * de conectarea bazei. La conectare, comutarea pe DB e automată.
 */

function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export async function getSpecialties(): Promise<Specialty[]> {
  if (!isSupabaseConfigured()) return fallbackSpecialties;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("specialties")
      .select("*")
      .order("order_index", { ascending: true });
    if (error) throw error;
    return data?.length ? data : fallbackSpecialties;
  } catch (err) {
    console.warn("[data] getSpecialties fallback:", err);
    return fallbackSpecialties;
  }
}

export async function getSpecialtyBySlug(
  slug: string,
): Promise<Specialty | null> {
  if (!isSupabaseConfigured()) {
    return fallbackSpecialties.find((s) => s.slug === slug) ?? null;
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("specialties")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return data ?? fallbackSpecialties.find((s) => s.slug === slug) ?? null;
  } catch (err) {
    console.warn("[data] getSpecialtyBySlug fallback:", err);
    return fallbackSpecialties.find((s) => s.slug === slug) ?? null;
  }
}

export async function getDoctors(): Promise<Doctor[]> {
  if (!isSupabaseConfigured()) return fallbackDoctors;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .order("order_index", { ascending: true });
    if (error) throw error;
    return data?.length ? data : fallbackDoctors;
  } catch (err) {
    console.warn("[data] getDoctors fallback:", err);
    return fallbackDoctors;
  }
}

export async function getFounders(limit = 4): Promise<Doctor[]> {
  if (!isSupabaseConfigured()) {
    return fallbackDoctors.filter((d) => d.is_founder).slice(0, limit);
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .eq("is_founder", true)
      .order("order_index", { ascending: true })
      .limit(limit);
    if (error) throw error;
    return data?.length
      ? data
      : fallbackDoctors.filter((d) => d.is_founder).slice(0, limit);
  } catch (err) {
    console.warn("[data] getFounders fallback:", err);
    return fallbackDoctors.filter((d) => d.is_founder).slice(0, limit);
  }
}

export async function getDoctorBySlug(slug: string): Promise<Doctor | null> {
  if (!isSupabaseConfigured()) {
    return fallbackDoctors.find((d) => d.slug === slug) ?? null;
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return data ?? fallbackDoctors.find((d) => d.slug === slug) ?? null;
  } catch (err) {
    console.warn("[data] getDoctorBySlug fallback:", err);
    return fallbackDoctors.find((d) => d.slug === slug) ?? null;
  }
}

/** Specialitățile unui medic (pentru badge-uri pe pagina individuală). */
export async function getSpecialtiesForDoctor(
  doctorId: string,
): Promise<Specialty[]> {
  const fallback = () => {
    const doc = fallbackDoctors.find((d) => d.id === doctorId);
    if (!doc) return [];
    return fallbackSpecialties
      .filter((s) => doc.specialtySlugs.includes(s.slug))
      .sort((a, b) => a.order_index - b.order_index);
  };

  if (!isSupabaseConfigured()) return fallback();
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("doctor_specialties")
      .select("specialties(*)")
      .eq("doctor_id", doctorId)
      .returns<{ specialties: Specialty | null }[]>();
    if (error) throw error;
    const result = (data ?? [])
      .map((row) => row.specialties)
      .filter((s): s is Specialty => Boolean(s))
      .sort((a, b) => a.order_index - b.order_index);
    return result.length ? result : fallback();
  } catch (err) {
    console.warn("[data] getSpecialtiesForDoctor fallback:", err);
    return fallback();
  }
}

/** Medicii care practică o anumită specialitate (după slug). */
export async function getDoctorsBySpecialtySlug(
  slug: string,
): Promise<Doctor[]> {
  const fallback = () =>
    fallbackDoctors
      .filter((d) => d.specialtySlugs.includes(slug))
      .sort((a, b) => a.order_index - b.order_index);

  if (!isSupabaseConfigured()) return fallback();
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("doctor_specialties")
      .select("doctors(*), specialties!inner(slug)")
      .eq("specialties.slug", slug)
      .returns<{ doctors: Doctor | null }[]>();
    if (error) throw error;
    const result = (data ?? [])
      .map((row) => row.doctors)
      .filter((d): d is Doctor => Boolean(d))
      .sort((a, b) => a.order_index - b.order_index);
    return result.length ? result : fallback();
  } catch (err) {
    console.warn("[data] getDoctorsBySpecialtySlug fallback:", err);
    return fallback();
  }
}
