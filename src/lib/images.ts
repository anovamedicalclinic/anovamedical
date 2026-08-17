import "server-only";

import sharp from "sharp";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Procesarea și încărcarea fotografiilor din panou.
 *
 * Fiecare imagine încărcată e normalizată la EXACT același format ca setul
 * livrat de client: portret 1200x1500 (4:5), WebP la calitate 85. Asta e ce
 * împiedică o poză de pe telefon, în format peisaj, să strice grila de carduri -
 * cardul primește mereu proporția pe care o așteaptă.
 *
 * Decupajul folosește strategia `attention` din sharp, care alege zona cu cel
 * mai mare contrast și saturație; pe portrete nimerește fața. E o alegere mai
 * bună decât decupajul din centru, unde subiectul stă adesea lateral.
 *
 * Reîncodarea are și un efect de siguranță: rezultatul e o imagine nouă,
 * construită din pixeli, deci metadatele EXIF (inclusiv coordonatele GPS ale
 * telefonului) și orice conținut strecurat într-un fișier care doar pretinde că
 * e imagine dispar.
 */

const WIDTH = 1200;
const HEIGHT = 1500;
const QUALITY = 85;
const MAX_BYTES = 8 * 1024 * 1024;
const BUCKET = "medici";

const ACCEPTED = new Set(["image/jpeg", "image/png", "image/webp"]);

export type UploadResult =
  | { ok: true; url: string }
  | { ok: false; error: string };

/** Nume de fișier previzibil, fără diacritice și fără spații. */
function slugify(value: string): string {
  return value
    .toLowerCase()
    // Diacriticele românești au corespondent direct; restul (și spațiile, și
    // semnele de punctuație) cad la filtrul alfanumeric de mai jos.
    .replace(/[ăâ]/g, "a")
    .replace(/[îí]/g, "i")
    .replace(/[șş]/g, "s")
    .replace(/[țţ]/g, "t")
    .normalize("NFD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/**
 * Validează, redimensionează și încarcă o fotografie.
 *
 * `stamp` intră în numele fișierului ca să spargă cache-ul CDN: dacă am
 * suprascrie mereu aceeași cale, o poză înlocuită ar continua să apară veche
 * până la expirarea cache-ului.
 */
export async function uploadPortrait(
  file: File,
  baseName: string,
  stamp: number,
): Promise<UploadResult> {
  if (file.size === 0) return { ok: false, error: "Fișierul e gol." };

  if (file.size > MAX_BYTES) {
    return { ok: false, error: "Fotografia depășește 8 MB." };
  }

  if (!ACCEPTED.has(file.type)) {
    return {
      ok: false,
      error: "Format acceptat: JPG, PNG sau WebP.",
    };
  }

  try {
    const input = Buffer.from(await file.arrayBuffer());

    // Verificăm că e într-adevăr o imagine, nu doar un `Content-Type` potrivit.
    const meta = await sharp(input).metadata();
    if (!meta.width || !meta.height) {
      return { ok: false, error: "Fișierul nu este o imagine validă." };
    }

    const output = await sharp(input)
      .rotate() // aplică orientarea EXIF înainte de a o pierde la reîncodare
      .resize(WIDTH, HEIGHT, {
        fit: "cover",
        position: sharp.strategy.attention,
      })
      .webp({ quality: QUALITY, effort: 6 })
      .toBuffer();

    const path = `${slugify(baseName) || "portret"}-${stamp}.webp`;

    // Încărcarea cere service role: politica de storage permite scrierea doar
    // rolurilor admin/editor, iar apelantul a fost deja verificat în acțiune.
    const supabase = createAdminClient();
    const { error } = await supabase.storage.from(BUCKET).upload(path, output, {
      contentType: "image/webp",
      cacheControl: "31536000",
      upsert: true,
    });

    if (error) throw error;

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return { ok: true, url: data.publicUrl };
  } catch (err) {
    console.error("[images] încărcare eșuată:", err);
    return { ok: false, error: "Nu am putut procesa fotografia." };
  }
}

/**
 * Șterge o fotografie din storage, dacă URL-ul chiar aparține bucket-ului
 * nostru. Fotografiile vechi, servite din `public/medici`, nu au ce căuta aici.
 */
export async function deletePortrait(url: string | null): Promise<void> {
  if (!url) return;

  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return;

  const path = url.slice(index + marker.length);
  if (!path || path.includes("..")) return;

  try {
    const supabase = createAdminClient();
    await supabase.storage.from(BUCKET).remove([path]);
  } catch (err) {
    // O poză rămasă în storage e inofensivă; nu blocăm acțiunea pentru asta.
    console.warn("[images] nu am putut șterge fotografia:", err);
  }
}
