/**
 * Optimizează fotografiile din `public/medici/`.
 *
 * Convertește fiecare PNG în WebP la aceleași dimensiuni (1200x1500, raport
 * 4:5) și mută originalul în `ORIGINALS_DIR`, în afara repo-ului. Calitatea 85
 * e aleasă intenționat peste minimul vizual: Next.js re-comprimă imaginea la
 * servire (AVIF/WebP), iar o sursă prea agresiv comprimată ar duce la artefacte
 * după a doua trecere.
 *
 * Rulare:  node scripts/optimize-photos.mjs
 * Sursele deja convertite sunt sărite, deci se poate rula din nou după ce se
 * adaugă poze noi.
 */
import { mkdir, readdir, rename, stat } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import sharp from "sharp";

const PHOTOS_DIR = path.join(process.cwd(), "public", "medici");
const ORIGINALS_DIR = path.join(homedir(), "Desktop", "anova-poze-originale");
const QUALITY = 85;

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function main() {
  const files = (await readdir(PHOTOS_DIR)).filter((f) => /\.png$/i.test(f));
  if (files.length === 0) {
    console.log("Nicio imagine PNG de convertit.");
    return;
  }

  await mkdir(ORIGINALS_DIR, { recursive: true });

  let before = 0;
  let after = 0;

  for (const file of files) {
    const source = path.join(PHOTOS_DIR, file);
    const target = source.replace(/\.png$/i, ".webp");

    await sharp(source).webp({ quality: QUALITY, effort: 6 }).toFile(target);

    const sourceSize = (await stat(source)).size;
    const targetSize = (await stat(target)).size;
    before += sourceSize;
    after += targetSize;

    await rename(source, path.join(ORIGINALS_DIR, file));
    console.log(`${file}: ${kb(sourceSize)} -> ${kb(targetSize)}`);
  }

  const saved = Math.round((1 - after / before) * 100);
  console.log(
    `\n${files.length} imagini: ${kb(before)} -> ${kb(after)} (-${saved}%)`,
  );
  console.log(`Originalele PNG: ${ORIGINALS_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
