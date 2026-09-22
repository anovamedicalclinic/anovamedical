import fs from "node:fs";
import path from "node:path";

/**
 * Mapare slug specialitate la imaginea din /public/servicii.
 *
 * Sursele erau PNG-uri de ~1,6 MB fiecare - format fără pierderi, potrivit
 * pentru grafică, nu pentru fotografii. Convertite în WebP au ajuns la ~55 KB,
 * cu 97% mai puțin, fără diferență vizibilă. Contează chiar dacă Next.js
 * reoptimizează la servire: sursa mare încetinea build-ul și primul acces la
 * fiecare imagine, când optimizatorul trebuia să o decodeze.
 */
const SERVICE_IMAGES: Record<string, string> = {
  psihiatrie: "/servicii/Psihiatrie.webp",
  "psihiatrie-pediatrica": "/servicii/PsihiatriePedriatica.webp",
  psihologie: "/servicii/Psihologie.webp",
  neurologie: "/servicii/Neurologie.webp",
  cardiologie: "/servicii/Cardiologie.webp",
  endocrinologie: "/servicii/Endocrionologie.webp",
};

/** Returnează calea imaginii specialității dacă fișierul există în /public. */
export function specialtyImage(slug: string): string | null {
  const rel = SERVICE_IMAGES[slug];
  if (rel && fs.existsSync(path.join(process.cwd(), "public", rel))) {
    return rel;
  }
  return null;
}

/**
 * Punctul de interes al fiecărei imagini, ca `object-position`.
 *
 * Fotografiile din setul nou au subiectul spre dreapta, cu partea stângă
 * ocupată de ilustrația decorativă. Pe cardurile de pe prima pagină, panoul cu
 * imaginea e aproape pătrat, iar o decupare centrată taie exact capul
 * persoanei. Valorile de mai jos mută decupajul spre subiect.
 */
const IMAGE_FOCUS: Record<string, string> = {
  psihiatrie: "84% 50%",
  "psihiatrie-pediatrica": "62% 50%",
  neurologie: "72% 50%",
  cardiologie: "72% 50%",
  endocrinologie: "62% 50%",
  psihologie: "45% 50%",
};

/** `object-position` pentru imaginea specialității; centrat, dacă nu e definit. */
export function specialtyImageFocus(slug: string): string {
  return IMAGE_FOCUS[slug] ?? "50% 50%";
}
