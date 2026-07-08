/**
 * Fotografiile medicilor.
 *
 * Momentan niciun medic nu are fotografie proprie: toți folosesc imaginea
 * Placeholder. Când vor fi disponibile pozele reale, se pot mapa aici pe slug
 * (sau prin `photo_url` din Supabase) și se poate reactiva logica de mai jos.
 */
const PLACEHOLDER = "/medici/Placeholder.png";

/**
 * Fotografia unui medic. În prezent niciun medic nu are `photo_url`, deci toți
 * folosesc Placeholder. Când se vor adăuga poze reale (în Supabase), acestea
 * vor fi afișate automat.
 */
export function doctorPhoto(doctor: {
  slug: string;
  photo_url: string | null;
}): string {
  return doctor.photo_url || PLACEHOLDER;
}
