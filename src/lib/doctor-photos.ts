/**
 * Fotografiile medicilor.
 *
 * Fișierele stau în `public/medici/` (portret 1200x1500, raport 4:5) și sunt
 * mapate pe slug-ul medicului. Medicii care încă nu au fotografie proprie
 * folosesc `Placeholder.webp`. Conversia PNG -> WebP se face cu
 * `node scripts/optimize-photos.mjs`.
 *
 * Ordinea de prioritate: `photo_url` din Supabase (dacă e completat) > maparea
 * locală de mai jos > placeholder. Astfel, când clientul încarcă poze în
 * Supabase, acestea au întâietate fără modificări de cod.
 */
const PLACEHOLDER = "/medici/Placeholder.webp";

/** slug medic -> fișier din `public/medici/`. */
const PHOTOS: Record<string, string> = {
  "aionesei-catalin": "/medici/AioneseiCatalin.webp",
  "alexandru-ungureanu": "/medici/UngureanuAlexandru.webp",
  "andra-morasan": "/medici/MorsanAndra.webp",
  "andreea-albu": "/medici/AlbuAndreea.webp",
  "aura-cosofret": "/medici/CosofretAura.webp",
  "cartas-nicoleta": "/medici/CartasNicoleta.webp",
  "dan-chirila": "/medici/ChirilaDan.webp",
  "dorneanu-andra": "/medici/DorneanuAndra.webp",
  "elena-pcela": "/medici/PcelaElena.webp",
  "gilea-andra": "/medici/GileaAndra.webp",
  "gusa-lucia": "/medici/GusaLucia.webp",
  "irina-dobrin": "/medici/IrinaDobrin.webp",
  "matei-palimariciuc": "/medici/PalimariciucMatei.webp",
  "mihaela-ungureanu": "/medici/UngureanuMihaela.webp",
  "mihulca-ioana": "/medici/MihulcaIoana.webp",
  "ramona-costiug": "/medici/CostiugRamona.webp",
  "silvia-tudosa": "/medici/TudosaSilvia.webp",
  "vlasceanu-marceza": "/medici/VlasceanuMarceza.webp",
  // Fără fotografie deocamdată (folosesc Placeholder):
  // ana-caterina-cristofor, banu-adelina, georgean-rozinbaum,
  // paula-stanciulescu, thomas-gabriel-schreiner, tudor-florea
};

/** Fotografia unui medic, cu fallback pe Placeholder. */
export function doctorPhoto(doctor: {
  slug: string;
  photo_url: string | null;
}): string {
  return doctor.photo_url || PHOTOS[doctor.slug] || PLACEHOLDER;
}
