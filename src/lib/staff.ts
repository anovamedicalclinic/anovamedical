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

/**
 * Titlul grupului sub care apare un rol pe /echipa. Rolul e la singular (așa
 * cum e scris pe card), titlul de grup la plural. Ce nu e în hartă se afișează
 * ca atare, deci un rol nou adăugat din panou nu rămâne fără secțiune.
 */
const ROLE_GROUP_LABELS: Record<string, string> = {
  Director: "Conducere",
  "Director medical": "Conducere",
  Manager: "Conducere",
  "Asistent medical": "Asistenți medicali",
  "Asistent medical principal": "Asistenți medicali",
  Recepționer: "Recepție",
};

/**
 * Rolurile de conducere urcă primele, oricare ar fi ordinea din panou:
 * directorul nu stă în același rând cu asistenții medicali.
 */
const LEADERSHIP_ROLE = /\b(director|manager|administrator|coordonator)\b/i;

export function isLeadershipRole(role: string): boolean {
  return LEADERSHIP_ROLE.test(role);
}

export function staffRoleGroupLabel(role: string): string {
  return ROLE_GROUP_LABELS[role] ?? role;
}

/**
 * Grupează echipa de suport pe roluri, cu conducerea prima.
 *
 * Ordinea din panou (`order_index`) se păstrează atât între grupuri — un grup
 * apare acolo unde apare primul său membru — cât și în interiorul lor.
 */
export function groupStaffByRole<T extends { role: string }>(
  members: readonly T[],
): { label: string; members: T[] }[] {
  const groups: { label: string; leadership: boolean; members: T[] }[] = [];

  for (const member of members) {
    const label = staffRoleGroupLabel(member.role);
    const existing = groups.find((g) => g.label === label);
    if (existing) {
      existing.members.push(member);
    } else {
      groups.push({
        label,
        leadership: isLeadershipRole(member.role),
        members: [member],
      });
    }
  }

  return groups
    .sort((a, b) => Number(b.leadership) - Number(a.leadership))
    .map(({ label, members }) => ({ label, members }));
}
