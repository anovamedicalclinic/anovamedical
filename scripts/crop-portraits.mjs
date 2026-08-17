/**
 * Decupează fotografiile în format landscape la portretul 4:5 folosit pe site.
 *
 * Setul livrat de client (vezi `optimize-photos.mjs`) vine deja la 1200x1500.
 * Cinci colaboratori aveau însă doar fotografia de pe vechiul site WordPress,
 * în format landscape (1877x1436), deci nu putea fi doar convertită: un
 * `object-cover` pe un card 4:5 ar fi tăiat capul. Aici decupăm o fereastră 4:5
 * pe toată înălțimea, centrată pe fața persoanei (`faceX`, în pixeli din
 * sursă), apoi redimensionăm la 1200x1500 și salvăm WebP la aceeași calitate.
 *
 * Sursele nu stau în repo. Sunt recuperabile din istoricul git:
 *   git show ee5a39c^:public/medici/<fișier> > <SOURCES_DIR>/<fișier>
 *
 * Rulare:  node scripts/crop-portraits.mjs [director-surse]
 * Implicit, sursele se caută în `~/Desktop/anova-poze-originale`.
 */
import { readFile, stat } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import sharp from "sharp";

const PHOTOS_DIR = path.join(process.cwd(), "public", "medici");
const SOURCES_DIR =
  process.argv[2] ?? path.join(homedir(), "Desktop", "anova-poze-originale");
const QUALITY = 85;
const TARGET = { width: 1200, height: 1500 };

/** sursă landscape -> fișier final, cu centrul feței pe orizontală. */
const PORTRAITS = [
  { source: "AnaCaterinaCristofor.jpg", target: "CristoforAnaCaterina.webp", faceX: 1252 },
  { source: "TudorFlorea.jpg", target: "FloreaTudor.webp", faceX: 1144 },
  { source: "GeorgeanRozinbaum.jpg", target: "RozinbaumGeorgean.webp", faceX: 1153 },
  { source: "ThomasGabrielScheiner.webp", target: "SchreinerThomasGabriel.webp", faceX: 848 },
  { source: "PaulaStanciulescu.jpg", target: "StanciulescuPaula.webp", faceX: 1272 },
];

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function main() {
  let missing = 0;

  for (const { source, target, faceX } of PORTRAITS) {
    const sourcePath = path.join(SOURCES_DIR, source);
    let buffer;
    try {
      buffer = await readFile(sourcePath);
    } catch {
      console.warn(`- lipsește sursa ${source}, sar peste`);
      missing += 1;
      continue;
    }

    const { width, height } = await sharp(buffer).metadata();
    const cropWidth = Math.round(height * (TARGET.width / TARGET.height));
    // Fereastra rămâne în interiorul imaginii chiar dacă fața e lângă margine.
    const left = Math.max(
      0,
      Math.min(Math.round(faceX - cropWidth / 2), width - cropWidth),
    );

    const targetPath = path.join(PHOTOS_DIR, target);
    await sharp(buffer)
      .extract({ left, top: 0, width: cropWidth, height })
      .resize(TARGET.width, TARGET.height)
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(targetPath);

    const size = (await stat(targetPath)).size;
    console.log(
      `${source} (${width}x${height}) -> ${target} @ left=${left}, ${kb(size)}`,
    );
  }

  const done = PORTRAITS.length - missing;
  console.log(`\n${done}/${PORTRAITS.length} portrete generate în public/medici.`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
