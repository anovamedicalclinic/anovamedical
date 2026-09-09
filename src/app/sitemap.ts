import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getDoctors, getSpecialties } from "@/lib/data";

/**
 * Sitemap-ul site-ului public.
 *
 * `lastModified` lipsește de pe paginile statice, și asta e intenționat.
 * Înainte purta `new Date()`, adică sitemap-ul susținea la fiecare generare că
 * absolut toate paginile s-au modificat chiar atunci. Google verifică
 * afirmația, o găsește falsă și învață să ignore complet câmpul — inclusiv
 * atunci când chiar s-ar schimba ceva. Un sitemap fără `lastmod` e perfect
 * valid; unul care minte e mai rău decât niciunul.
 *
 * Paginile de medic și de specialitate îl păstrează, cu `created_at` din baza
 * de date: e o dată reală și stabilă, care nu se mișcă la fiecare deploy.
 * Tabelele nu au încă `updated_at`; când vor avea, aici se schimbă un cuvânt.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/despre-noi`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/echipa`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/specialitati`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/politica-de-confidentialitate`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/politica-de-cookie-uri`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/termeni-si-conditii`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const [specialties, doctors] = await Promise.all([
    getSpecialties(),
    getDoctors(),
  ]);

  const specialtyEntries: MetadataRoute.Sitemap = specialties.map((s) => ({
    url: `${base}/specialitati/${s.slug}`,
    lastModified: s.created_at ? new Date(s.created_at) : undefined,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const doctorEntries: MetadataRoute.Sitemap = doctors.map((d) => ({
    url: `${base}/echipa/${d.slug}`,
    lastModified: d.created_at ? new Date(d.created_at) : undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...specialtyEntries, ...doctorEntries];
}
