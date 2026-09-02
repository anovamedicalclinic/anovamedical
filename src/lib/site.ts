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
  schedule: [
    { days: "Luni – Vineri", hours: "09:00 – 20:00" },
    { days: "Sâmbătă – Duminică", hours: "Închis" },
  ],
  note: "Oferim consultații gratuite pacienților asigurați care prezintă bilet de trimitere de la medicul de familie sau specialist.",
} as const;

/**
 * Cele trei sedii ale clinicii.
 *
 * Primul e cel principal și e singurul care apare acolo unde nu încap toate:
 * butonul flotant de apel, headerul, entitatea principală din JSON-LD. În
 * rest, lista se afișează întreagă — de aceea nu mai există o singură
 * `contact.address`, ca să nu se poată strecura undeva doar unul dintre sedii.
 *
 * `mapQuery` e ce se trimite la Google Maps; e scris cu numele complet al
 * străzii, nu cu prescurtarea de pe pagină, altfel harta ratează adresa.
 */
export const locations = [
  {
    id: "nicolina",
    name: "Anova Medical Clinic – Șos. Nicolina",
    short: "Șos. Nicolina",
    address: "Șos. Nicolina, Nr. 14, Iași",
    phone: "0774 037 531",
    phoneHref: "tel:+40774037531",
    mapQuery: "Șoseaua Nicolina 14, Iași",
    street: "Șoseaua Nicolina, Nr. 14",
    locality: "Iași",
  },
  {
    id: "stefan-cel-mare",
    name: "Anova Medical Clinic – Bd. Ștefan cel Mare și Sfânt",
    short: "Bd. Ștefan cel Mare",
    address: "Bd. Ștefan cel Mare și Sfânt, Nr. 4, Iași",
    phone: "0774 037 531",
    phoneHref: "tel:+40774037531",
    mapQuery: "Bulevardul Ștefan cel Mare și Sfânt 4, Iași",
    street: "Bd. Ștefan cel Mare și Sfânt, Nr. 4",
    locality: "Iași",
  },
  {
    id: "tatarusi",
    name: "Anova Medical Clinic – Tătăruși",
    short: "Tătăruși",
    address:
      "Str. Alexandru Vasiliu Tătăruși, Nr. 98, sat Tătăruși, com. Tătăruși, jud. Iași",
    detail: "În incinta Centrului Medical Tătăruși, Cabinet 2",
    phone: "0773 816 891",
    phoneHref: "tel:+40773816891",
    mapQuery:
      "Centrul Medical Tătăruși, Strada Alexandru Vasiliu Tătăruși 98, Tătăruși, Iași",
    street: "Str. Alexandru Vasiliu Tătăruși, Nr. 98",
    locality: "Tătăruși",
  },
] as const;

export type Location = (typeof locations)[number];

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
  { slug: "neurologie", name: "Neurologie", icon: "activity" },
  { slug: "cardiologie", name: "Cardiologie", icon: "heart-pulse" },
  { slug: "endocrinologie", name: "Endocrinologie", icon: "droplets" },
  { slug: "psihologie", name: "Psihologie", icon: "messages-square" },
] as const;

export const mainNav = [
  { label: "Acasă", href: "/" },
  { label: "Despre noi", href: "/despre-noi" },
  { label: "Specialități", href: "/specialitati", children: navSpecialties },
  { label: "Echipa", href: "/echipa" },
  { label: "Contact", href: "/contact" },
] as const;
