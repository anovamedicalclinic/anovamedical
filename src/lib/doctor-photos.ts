/**
 * Fotografiile medicilor.
 *
 * Regula de decor, dată de client: cine are „Dr.” sau „Psiholog” în titulatură
 * se fotografiază în cabinet, la birou. Restul echipei — director, asistente —
 * se fotografiază la recepție (vezi `staff.ts`). Împărțirea coincide cu cea
 * dintre tabelul `doctors` și `staff`, deci nu e nevoie de un câmp în plus.
 *
 * Fișierele stau în `public/medici/` (portret 1200x1500, raport 4:5) și sunt
 * mapate pe slug-ul medicului. Medicii care încă nu au fotografie proprie
 * folosesc `Placeholder.webp`. Conversia PNG -> WebP se face cu
 * `node scripts/optimize-photos.mjs`, iar decuparea surselor landscape la 4:5
 * cu `node scripts/crop-portraits.mjs`.
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
  "ana-caterina-cristofor": "/medici/CristoforAnaCaterina.webp",
  "andra-morasan": "/medici/MorsanAndra.webp",
  "andreea-albu": "/medici/AlbuAndreea.webp",
  "aura-cosofret": "/medici/CosofretAura.webp",
  "banu-adelina": "/medici/BanuAdelina.webp",
  "cartas-nicoleta": "/medici/CartasNicoleta.webp",
  "dan-chirila": "/medici/ChirilaDan.webp",
  "dorneanu-andra": "/medici/DorneanuAndra.webp",
  "elena-pcela": "/medici/PcelaElena.webp",
  "georgean-rozinbaum": "/medici/RozinbaumGeorgean.webp",
  "gilea-andra": "/medici/GileaAndra.webp",
  "gusa-lucia": "/medici/GusaLucia.webp",
  "irina-dobrin": "/medici/IrinaDobrin.webp",
  "matei-palimariciuc": "/medici/PalimariciucMatei.webp",
  "mihaela-ungureanu": "/medici/UngureanuMihaela.webp",
  "mihulca-ioana": "/medici/MihulcaIoana.webp",
  "paula-stanciulescu": "/medici/StanciulescuPaula.webp",
  "ramona-costiug": "/medici/CostiugRamona.webp",
  "silvia-tudosa": "/medici/TudosaSilvia.webp",
  "thomas-gabriel-schreiner": "/medici/SchreinerThomasGabriel.webp",
  "tudor-florea": "/medici/FloreaTudor.webp",
  "vlasceanu-marceza": "/medici/VlasceanuMarceza.webp",
};

/** Fotografia unui medic, cu fallback pe Placeholder. */
export function doctorPhoto(doctor: {
  slug: string;
  photo_url: string | null;
}): string {
  return doctor.photo_url || PHOTOS[doctor.slug] || PLACEHOLDER;
}
