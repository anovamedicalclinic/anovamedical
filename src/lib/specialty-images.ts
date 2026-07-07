import fs from "node:fs";
import path from "node:path";

/** Mapare slug specialitate la imaginea din /public/servicii. */
const SERVICE_IMAGES: Record<string, string> = {
  psihiatrie: "/servicii/Psihiatrie.png",
  "psihiatrie-pediatrica": "/servicii/PsihiatriePedriatica.png",
  psihologie: "/servicii/Psihologie.png",
  neurologie: "/servicii/Neurologie.png",
  cardiologie: "/servicii/Cardiologie.png",
  endocrinologie: "/servicii/Endocrionologie.png",
};

/** Returnează calea imaginii specialității dacă fișierul există în /public. */
export function specialtyImage(slug: string): string | null {
  const rel = SERVICE_IMAGES[slug];
  if (rel && fs.existsSync(path.join(process.cwd(), "public", rel))) {
    return rel;
  }
  return null;
}
