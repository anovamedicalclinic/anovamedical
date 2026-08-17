import { unstable_cache } from "next/cache";
import { createPublicClient, isSupabaseConfigured } from "@/lib/supabase/public";
import type {
  Doctor,
  Specialty,
  StaffMember,
  Testimonial,
} from "@/lib/supabase/types";
import { fallbackDoctors, fallbackSpecialties } from "@/lib/fallback-data";
import { staff as fallbackStaff } from "@/lib/staff";
import { testimonials as fallbackTestimonials } from "@/lib/testimonials";

/**
 * Strat de acces la date (read-only, conținut public).
 *
 * Trei reguli, în ordinea importanței:
 *
 *  1. Se folosește clientul FĂRĂ cookie-uri (`createPublicClient`). Clientul din
 *     `server.ts` citește cookie-uri, iar `cookies()` e un API de request: orice
 *     pagină care îl atinge devine dinamică și nu mai poate fi memorată. Cu
 *     citiri fără cookie-uri, paginile rămân statice și se reîmprospătează pe
 *     etichete.
 *
 *  2. Fiecare citire e împachetată în `unstable_cache` cu o etichetă. Când se
 *     salvează ceva din panou, Server Action-ul cheamă `updateTag` pe eticheta
 *     potrivită și pagina se regenerează. Fără etichete, o modificare din admin
 *     nu s-ar vedea până la următorul build.
 *
 *  3. Orice eroare cade pe datele din cod (`fallback-data.ts`, `staff.ts`,
 *     `testimonials.ts`). Dacă baza de date e indisponibilă, site-ul arată ca
 *     înainte de panou, nu o pagină goală.
 */

export const DOCTORS_TAG = "doctors";
export const SPECIALTIES_TAG = "specialties";
export const TESTIMONIALS_TAG = "testimonials";
export const STAFF_TAG = "staff";

/** O oră: eticheta face reîmprospătarea, durata e doar plasă de siguranță. */
const REVALIDATE = 3600;

// ---------------------------------------------------------------- specialități

const loadSpecialties = unstable_cache(
  async (): Promise<Specialty[]> => {
    if (!isSupabaseConfigured()) return fallbackSpecialties;
    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase
        .from("specialties")
        .select("*")
        .order("order_index", { ascending: true });
      if (error) throw error;
      return data?.length ? data : fallbackSpecialties;
    } catch (err) {
      console.warn("[data] specialties fallback:", err);
      return fallbackSpecialties;
    }
  },
  ["specialties"],
  { tags: [SPECIALTIES_TAG], revalidate: REVALIDATE },
);

export async function getSpecialties(): Promise<Specialty[]> {
  return loadSpecialties();
}

export async function getSpecialtyBySlug(
  slug: string,
): Promise<Specialty | null> {
  const all = await loadSpecialties();
  return all.find((s) => s.slug === slug) ?? null;
}

// --------------------------------------------------------------------- medici

const loadDoctors = unstable_cache(
  async (): Promise<Doctor[]> => {
    if (!isSupabaseConfigured()) return fallbackDoctors;
    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .order("order_index", { ascending: true });
      if (error) throw error;
      return data?.length ? data : fallbackDoctors;
    } catch (err) {
      console.warn("[data] doctors fallback:", err);
      return fallbackDoctors;
    }
  },
  ["doctors"],
  { tags: [DOCTORS_TAG], revalidate: REVALIDATE },
);

export async function getDoctors(): Promise<Doctor[]> {
  return loadDoctors();
}

export async function getFounders(limit = 4): Promise<Doctor[]> {
  const all = await loadDoctors();
  return all.filter((d) => d.is_founder).slice(0, limit);
}

export async function getDoctorBySlug(slug: string): Promise<Doctor | null> {
  const all = await loadDoctors();
  return all.find((d) => d.slug === slug) ?? null;
}

// ------------------------------------------------- relația medic <-> specialitate

/**
 * Toate legăturile medic -> specialitate, într-o singură interogare.
 *
 * Înainte, `getSpecialtiesForDoctor` interoga baza pentru fiecare medic în
 * parte: pagina /echipa cu 24 de medici făcea 24 de interogări, iar prima
 * pagină încă 24. Aici se încarcă o dată harta completă, iar restul se rezolvă
 * din memorie.
 */
const loadDoctorSpecialtyMap = unstable_cache(
  async (): Promise<Record<string, string[]>> => {
    const fromFallback = () =>
      Object.fromEntries(
        fallbackDoctors.map((d) => [
          d.id,
          fallbackSpecialties
            .filter((s) => d.specialtySlugs.includes(s.slug))
            .map((s) => s.id),
        ]),
      );

    if (!isSupabaseConfigured()) return fromFallback();

    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase
        .from("doctor_specialties")
        .select("doctor_id, specialty_id");
      if (error) throw error;
      if (!data?.length) return fromFallback();

      const map: Record<string, string[]> = {};
      for (const row of data) {
        (map[row.doctor_id] ??= []).push(row.specialty_id);
      }
      return map;
    } catch (err) {
      console.warn("[data] doctor_specialties fallback:", err);
      return fromFallback();
    }
  },
  ["doctor-specialties"],
  { tags: [DOCTORS_TAG, SPECIALTIES_TAG], revalidate: REVALIDATE },
);

/** Specialitățile unui medic, ordonate ca pe site. */
export async function getSpecialtiesForDoctor(
  doctorId: string,
): Promise<Specialty[]> {
  const [map, specialties] = await Promise.all([
    loadDoctorSpecialtyMap(),
    loadSpecialties(),
  ]);
  const ids = new Set(map[doctorId] ?? []);
  return specialties
    .filter((s) => ids.has(s.id))
    .sort((a, b) => a.order_index - b.order_index);
}

/** Harta completă, pentru pagini care au nevoie de toți medicii deodată. */
export async function getSpecialtiesByDoctor(): Promise<
  Map<string, Specialty[]>
> {
  const [map, specialties] = await Promise.all([
    loadDoctorSpecialtyMap(),
    loadSpecialties(),
  ]);
  const byId = new Map(specialties.map((s) => [s.id, s]));
  const result = new Map<string, Specialty[]>();
  for (const [doctorId, specialtyIds] of Object.entries(map)) {
    result.set(
      doctorId,
      specialtyIds
        .map((id) => byId.get(id))
        .filter((s): s is Specialty => Boolean(s))
        .sort((a, b) => a.order_index - b.order_index),
    );
  }
  return result;
}

/** Medicii care practică o anumită specialitate. */
export async function getDoctorsBySpecialtySlug(
  slug: string,
): Promise<Doctor[]> {
  const [specialties, doctors, map] = await Promise.all([
    loadSpecialties(),
    loadDoctors(),
    loadDoctorSpecialtyMap(),
  ]);
  const specialty = specialties.find((s) => s.slug === slug);
  if (!specialty) return [];

  return doctors
    .filter((d) => (map[d.id] ?? []).includes(specialty.id))
    .sort((a, b) => a.order_index - b.order_index);
}

// ------------------------------------------------------------------- recenzii

const loadTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> => {
    const fromFallback = (): Testimonial[] =>
      fallbackTestimonials.map((t, i) => ({
        id: `fallback-${i}`,
        author: t.name,
        rating: t.rating,
        text: t.text,
        is_published: true,
        order_index: i,
        created_at: "1970-01-01T00:00:00.000Z",
        updated_at: "1970-01-01T00:00:00.000Z",
      }));

    if (!isSupabaseConfigured()) return fromFallback();

    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_published", true)
        .order("order_index", { ascending: true });
      if (error) throw error;
      return data?.length ? data : fromFallback();
    } catch (err) {
      console.warn("[data] testimonials fallback:", err);
      return fromFallback();
    }
  },
  ["testimonials"],
  { tags: [TESTIMONIALS_TAG], revalidate: REVALIDATE },
);

export async function getTestimonials(): Promise<Testimonial[]> {
  return loadTestimonials();
}

// ------------------------------------------------------------ echipa de suport

const loadStaff = unstable_cache(
  async (): Promise<StaffMember[]> => {
    const fromFallback = (): StaffMember[] =>
      fallbackStaff.map((m, i) => ({
        id: `fallback-${i}`,
        name: m.name,
        role: m.role,
        photo_url: m.photo,
        is_published: true,
        order_index: i,
        created_at: "1970-01-01T00:00:00.000Z",
        updated_at: "1970-01-01T00:00:00.000Z",
      }));

    if (!isSupabaseConfigured()) return fromFallback();

    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase
        .from("staff")
        .select("*")
        .eq("is_published", true)
        .order("order_index", { ascending: true });
      if (error) throw error;
      return data?.length ? data : fromFallback();
    } catch (err) {
      console.warn("[data] staff fallback:", err);
      return fromFallback();
    }
  },
  ["staff"],
  { tags: [STAFF_TAG], revalidate: REVALIDATE },
);

export async function getStaff(): Promise<StaffMember[]> {
  return loadStaff();
}
