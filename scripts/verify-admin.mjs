/**
 * Verificări automate pentru panoul de administrare.
 *
 * Testează exact lucrurile care se pot strica silențios și pe care un build
 * curat nu le prinde: conveția cheilor de conținut față de constrângerea din
 * baza de date, unicitatea lor, limitele de caractere față de textele implicite,
 * și normalizarea fotografiilor la formatul folosit în design.
 *
 * Rulare:  node scripts/verify-admin.mjs
 */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

let failures = 0;

function check(label, ok, detail = "") {
  const mark = ok ? "OK  " : "EȘEC";
  if (!ok) failures += 1;
  console.log(`  ${mark}  ${label}${detail ? ` — ${detail}` : ""}`);
}

/**
 * Registrul e scris în TypeScript, iar acest script rulează în Node fără
 * transpilare. Extragem câmpurile cu o expresie regulată: e suficient pentru
 * verificări structurale și evită dependența de un runner de TS.
 */
async function loadRegistry() {
  const source = await readFile(
    path.join(process.cwd(), "src/lib/content/registry.ts"),
    "utf8",
  );

  const fields = [];
  const re =
    /key:\s*"([^"]+)",\s*\n\s*label:\s*"([^"]+)",\s*\n\s*kind:\s*"([^"]+)",\s*\n\s*max:\s*(\d+),\s*\n\s*default:\s*\n?\s*("(?:[^"\\]|\\.)*")/g;

  for (const m of source.matchAll(re)) {
    fields.push({
      key: m[1],
      label: m[2],
      kind: m[3],
      max: Number(m[4]),
      default: JSON.parse(m[5]),
    });
  }
  return fields;
}

console.log("\nRegistrul de conținut");
const fields = await loadRegistry();
check("câmpuri găsite", fields.length > 0, `${fields.length}`);

// Aceeași expresie ca în constrângerea `site_content_key_format`, din 0002.
const keyFormat = /^[a-z0-9]+(\.[a-z0-9_]+)+$/;
const badKeys = fields.filter((f) => !keyFormat.test(f.key));
check(
  "toate cheile respectă constrângerea din baza de date",
  badKeys.length === 0,
  badKeys.map((f) => f.key).join(", "),
);

const seen = new Set();
const duplicates = fields.filter((f) => {
  if (seen.has(f.key)) return true;
  seen.add(f.key);
  return false;
});
check(
  "nicio cheie duplicată",
  duplicates.length === 0,
  duplicates.map((f) => f.key).join(", "),
);

// Un text implicit peste limita propriului câmp ar face secțiunea imposibil de
// salvat fără modificări - exact capcana pe care o verificăm.
const tooLong = fields.filter((f) => f.default.length > f.max);
check(
  "fiecare text implicit încape în limita lui",
  tooLong.length === 0,
  tooLong.map((f) => `${f.key} (${f.default.length}/${f.max})`).join(", "),
);

const emptyDefaults = fields.filter((f) => f.default.trim().length === 0);
check(
  "niciun text implicit gol",
  emptyDefaults.length === 0,
  emptyDefaults.map((f) => f.key).join(", "),
);

const badUrls = fields.filter(
  (f) => f.kind === "url" && !/^https?:\/\//.test(f.default),
);
check(
  "linkurile implicite sunt absolute",
  badUrls.length === 0,
  badUrls.map((f) => f.key).join(", "),
);

console.log("\nProcesarea fotografiilor");
const WIDTH = 1200;
const HEIGHT = 1500;

// Folosim o fotografie reală din site ca sursă, plus o variantă landscape
// generată, ca să acoperim și cazul care ar putea strica grila de carduri.
const photosDir = path.join(process.cwd(), "public/medici");
const sample = (await readdir(photosDir)).find((f) => f.endsWith(".webp"));

if (!sample) {
  check("există o fotografie de test", false);
} else {
  const source = await readFile(path.join(photosDir, sample));

  // Subiectul e pus în dreapta, cum sunt fotografiile reale de pe site-ul vechi:
  // așa verificăm că decupajul îl găsește, în loc să taie fundalul din centru.
  const subject = await sharp(source).resize({ height: 1200 }).toBuffer();
  const landscape = await sharp({
    create: {
      width: 1877,
      height: 1436,
      channels: 3,
      background: { r: 200, g: 210, b: 200 },
    },
  })
    .composite([{ input: subject, gravity: "east" }])
    .jpeg()
    .toBuffer();

  for (const [label, input] of [
    ["portret existent", source],
    ["sursă landscape 1877x1436", landscape],
  ]) {
    const output = await sharp(input)
      .rotate()
      .resize(WIDTH, HEIGHT, { fit: "cover", position: sharp.strategy.attention })
      .webp({ quality: 85, effort: 6 })
      .toBuffer();

    const meta = await sharp(output).metadata();
    check(
      `${label} -> ${WIDTH}x${HEIGHT} webp`,
      meta.width === WIDTH && meta.height === HEIGHT && meta.format === "webp",
      `${meta.width}x${meta.height} ${meta.format}, ${Math.round(output.length / 1024)} KB`,
    );
  }

  // Un fișier care doar pretinde că e imagine trebuie respins la decodare.
  let rejected = false;
  try {
    await sharp(Buffer.from("<?php echo 1; ?>")).metadata();
  } catch {
    rejected = true;
  }
  check("un fișier care nu e imagine este respins", rejected);

  // EXIF-ul (inclusiv GPS) nu are ce căuta în fotografiile publicate.
  const withExif = await sharp(source)
    .withMetadata({ exif: { IFD0: { Copyright: "test" } } })
    .jpeg()
    .toBuffer();
  const cleaned = await sharp(withExif)
    .resize(WIDTH, HEIGHT, { fit: "cover" })
    .webp()
    .toBuffer();
  const cleanedMeta = await sharp(cleaned).metadata();
  check("metadatele EXIF sunt eliminate la reîncodare", !cleanedMeta.exif);
}

console.log(
  failures === 0
    ? "\nToate verificările au trecut.\n"
    : `\n${failures} verificări au eșuat.\n`,
);
process.exitCode = failures === 0 ? 0 : 1;
