import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getDoctors, getSpecialties } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/despre-noi`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/echipa`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/specialitati`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/politica-de-confidentialitate`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/politica-de-cookie-uri`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/termeni-si-conditii`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const [specialties, doctors] = await Promise.all([
    getSpecialties(),
    getDoctors(),
  ]);

  const specialtyEntries: MetadataRoute.Sitemap = specialties.map((s) => ({
    url: `${base}/specialitati/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const doctorEntries: MetadataRoute.Sitemap = doctors.map((d) => ({
    url: `${base}/echipa/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...specialtyEntries, ...doctorEntries];
}
