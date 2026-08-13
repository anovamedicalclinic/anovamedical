/**
 * Echipa de suport: conducere, asistente medicale și recepție.
 *
 * Spre deosebire de medici, aceștia nu au pagină individuală, bio sau
 * specialități, deci nu stau în Supabase — doar nume, rol și fotografie.
 * Fotografiile respectă același format ca la medici (1200x1500, raport 4:5).
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
    role: "Asistentă medicală",
    photo: "/medici/EmaUrzica.webp",
  },
  {
    name: "Marina Atodiresei",
    role: "Asistentă medicală",
    photo: "/medici/MarinaAtodiresei.webp",
  },
  {
    name: "Damaris Smântână",
    role: "Asistentă medicală",
    photo: "/medici/SmantanaDamaris.webp",
  },
  {
    name: "Tatiana Barbieru",
    role: "Asistentă medicală",
    photo: "/medici/BarbieruTatiana.webp",
  },
];
