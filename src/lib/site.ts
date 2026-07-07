/**
 * Configurație globală a site-ului Anova Medical Clinic.
 * Sursă unică pentru date de contact, navigație și social.
 */

export const siteConfig = {
  name: "Anova Medical Clinic",
  shortName: "Anova",
  tagline: "Învingem obstacolele, restabilim echilibrul.",
  description:
    "Clinică dedicată sănătății mintale și neurologice, în Iași.",
  url: "https://anovamedical.ro",
  city: "Iași",
} as const;

export const contact = {
  phone: "0774 037 531",
  phoneHref: "tel:+40774037531",
  whatsappHref: "https://wa.me/40774037531",
  // TODO: confirmă adresa de email reală cu clientul
  email: "contact@anovamedical.ro",
  emailHref: "mailto:contact@anovamedical.ro",
  address: "Șos. Nicolina, Nr. 14, Iași",
  schedule: [
    { days: "Luni – Vineri", hours: "09:00 – 20:00" },
    { days: "Sâmbătă – Duminică", hours: "Închis" },
  ],
  note: "Oferim consultații gratuite pacienților asigurați care prezintă bilet de trimitere de la medicul de familie sau specialist.",
} as const;

export const social = {
  facebook: "https://www.facebook.com/anova.medical.clinic",
  instagram: "https://www.instagram.com/anova.medical.clinic",
} as const;

/** Datele societății care operează clinica (pentru pagini legale și footer). */
export const legal = {
  company: "AMEDICALCLINIC SRL",
  cif: "48013838",
  regCom: "J2023001302221",
  registeredOffice:
    "Strada Viorelelor, Nr. 5D, Et. Parter, Ap. 1, Iași, Județ Iași",
  workPoint: "Șos. Nicolina, Nr. 14, Iași",
  updatedAt: "1 iulie 2026",
} as const;

/** Autorul site-ului (footer). */
export const author = {
  name: "Inovex.ro",
  url: "https://inovex.ro",
} as const;

/**
 * Specialitățile pentru navigație (dropdown). Conținutul de pagină vine din
 * Supabase; lista de mai jos este doar pentru meniu și fallback static.
 */
export const navSpecialties = [
  { slug: "psihiatrie", name: "Psihiatrie", icon: "brain" },
  { slug: "psihiatrie-pediatrica", name: "Psihiatrie Pediatrică", icon: "baby" },
  { slug: "psihologie", name: "Psihologie", icon: "messages-square" },
  { slug: "neurologie", name: "Neurologie", icon: "activity" },
  { slug: "cardiologie", name: "Cardiologie", icon: "heart-pulse" },
  { slug: "endocrinologie", name: "Endocrinologie", icon: "droplets" },
] as const;

export const mainNav = [
  { label: "Acasă", href: "/" },
  { label: "Despre noi", href: "/despre-noi" },
  { label: "Specialități", href: "/specialitati", children: navSpecialties },
  { label: "Echipa", href: "/echipa" },
  { label: "Contact", href: "/contact" },
] as const;
