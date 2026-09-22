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

/**
 * Titlul de deasupra unui grup de colegi cu același rol: rolul e la singular
 * pe card, titlul la plural. Un rol care nu e în hartă se afișează ca atare,
 * deci unul adăugat din panou nu rămâne fără titlu.
 */
const ROLE_GROUP_LABELS: Record<string, string> = {
  // Titlul grupului numește nivelul, nu funcția: rolul exact scrie oricum pe
  // card, iar „Director” de două ori la rând ar fi doar un ecou.
  Director: "Conducere",
  "Director medical": "Conducere",
  Manager: "Conducere",
  "Asistent medical": "Asistenți medicali",
  "Asistent medical principal": "Asistenți medicali",
  Recepționer: "Recepție",
};

/** Titlul grupului pentru o listă de colegi; generic dacă rolurile diferă. */
export function staffGroupLabel(
  members: readonly { role: string }[],
  fallback: string,
): string {
  const roles = [...new Set(members.map((m) => m.role))];
  if (roles.length !== 1) return fallback;
  return ROLE_GROUP_LABELS[roles[0]] ?? roles[0];
}
