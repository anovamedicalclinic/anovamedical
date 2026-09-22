/**
 * Echipa de suport: conducere, asistenți medicali și recepție.
 *
 * Spre deosebire de medici, aceștia nu au pagină individuală, bio sau
 * specialități, deci nu stau în Supabase — doar nume, rol și fotografie.
 * Fotografiile respectă același format ca la medici (1200x1500, raport 4:5),
 * dar se fac la recepție, nu în cabinet: cabinetul e pentru cine are „Dr.” sau
 * „Psiholog” în titulatură (vezi `doctor-photos.ts`).
 *
 * Rolurile se scriu cu denumirea oficială din Clasificarea Ocupațiilor din
 * România („Asistent medical”), invariabilă după gen.
 */
export type StaffMember = {
  name: string;
  role: string;
  photo: string;
};

export const staff: StaffMember[] = [
  {
    name: "Cristian Hogaș",
    role: "Director",
    photo: "/medici/DirectorHogasCristian.webp",
  },
  {
    name: "Ema Urzică",
    role: "Asistent medical",
    photo: "/medici/EmaUrzica.webp",
  },
  {
    name: "Marina Atodiresei",
    role: "Asistent medical",
    photo: "/medici/MarinaAtodiresei.webp",
  },
  {
    name: "Damaris Smântână",
    role: "Asistent medical",
    photo: "/medici/SmantanaDamaris.webp",
  },
  {
    name: "Tatiana Barbieru",
    role: "Asistent medical",
    photo: "/medici/BarbieruTatiana.webp",
  },
];

/** Cuvintele care fac dintr-un rol o poziție de conducere. */
const LEADERSHIP_WORDS = ["director", "manager", "administrator", "coordonator"];

/**
 * Rolurile de conducere se afișează separat, pe un rând centrat deasupra
 * restului echipei de suport: directorul nu stă în aceeași grilă cu asistenții
 * medicali. Testul e pe cuvinte întregi, ca „Director medical” să intre, dar
 * un rol care doar conține silabele să nu.
 */
export function isLeadershipRole(role: string): boolean {
  const words = role.toLowerCase().split(/[^a-zăâîșț]+/);
  return LEADERSHIP_WORDS.some((word) => words.includes(word));
}
