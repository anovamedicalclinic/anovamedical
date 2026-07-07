/**
 * Constructori pentru date structurate (JSON-LD), folosiți în paginile relevante.
 * Sursa de adevăr pentru date rămâne `src/lib/site.ts`.
 */
import { siteConfig, contact, social, navSpecialties } from "@/lib/site";
import type { Doctor, Specialty } from "@/lib/supabase/types";

const CLINIC_ID = `${siteConfig.url}/#clinic`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

/** MedicalClinic - entitatea principală a clinicii (site-wide). */
export function clinicLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": CLINIC_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    telephone: contact.phoneHref.replace("tel:", ""),
    email: contact.email,
    image: `${siteConfig.url}/logo-color.png`,
    logo: `${siteConfig.url}/logo-color.png`,
    priceRange: "$$",
    currenciesAccepted: "RON",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Șoseaua Nicolina, Nr. 14",
      addressLocality: "Iași",
      addressRegion: "Iași",
      addressCountry: "RO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.135,
      longitude: 27.572,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    medicalSpecialty: [
      "Psychiatric",
      "Psychiatric",
      "Neurologic",
      "Cardiovascular",
      "Endocrine",
    ],
    availableService: navSpecialties.map((s) => ({
      "@type": "MedicalProcedure",
      name: s.name,
      url: `${siteConfig.url}/specialitati/${s.slug}`,
    })),
    sameAs: [social.facebook, social.instagram],
  };
}

/** WebSite - pentru rich results / sitelinks. */
export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: "ro-RO",
    publisher: { "@id": CLINIC_ID },
  };
}

/** Physician - pentru pagina individuală a unui medic. */
export function physicianLd({
  doctor,
  specialties,
  image,
}: {
  doctor: Pick<Doctor, "slug" | "name" | "title" | "short_bio">;
  specialties: Pick<Specialty, "name">[];
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    url: `${siteConfig.url}/echipa/${doctor.slug}`,
    image: image.startsWith("http") ? image : `${siteConfig.url}${image}`,
    jobTitle: doctor.title ?? undefined,
    description: doctor.short_bio ?? undefined,
    medicalSpecialty: specialties.map((s) => s.name),
    worksFor: { "@id": CLINIC_ID },
    memberOf: { "@id": CLINIC_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Șoseaua Nicolina, Nr. 14",
      addressLocality: "Iași",
      addressCountry: "RO",
    },
  };
}

/** BreadcrumbList - pentru firimiturile de navigare. */
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
