import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Titlurile și descrierile paginilor, preluate de pe site-ul WordPress
 * înlocuit.
 *
 * Textele astea au stat ani în Google și au adus poziționarea de acum, deci
 * se păstrează cuvânt cu cuvânt la mutarea pe site-ul nou. Sunt și mai bine
 * dimensionate decât ce genera codul: toate stau sub 160 de caractere, pe
 * când descrierile de specialitate se construiau din primul paragraf al
 * paginii și ajungeau până la 357.
 *
 * Trei lucruri NU s-au copiat identic, fiecare marcat la locul lui:
 * o descriere care era copiată de la alt medic, un titlu cu „Psihatrie”
 * scris greșit, și paginile apărute după site-ul vechi (cardiologie,
 * endocrinologie, lista de specialități), care n-aveau ce moșteni.
 *
 * Paginile care nu apar aici — lista de echipă, termenii, politicile, medicii
 * angajați între timp — își păstrează metadatele generate din cod, care erau
 * deja bine dimensionate.
 */
export type PageMeta = {
  readonly title: string;
  readonly description: string;
};

export const pageMeta: Record<string, PageMeta> = {
  "/": {
    title: "Clinică Medicală - Anova Medical Iași",
    description:
      "Descoperiți îngrijirea medicală de calitate la Clinica Medicală Anova. Echipă dedicată, soluții inovatoare pentru sănătatea dumneavoastră.",
  },
  "/contact": {
    title: "Contact - Anova Medical Clinic: Îngrijire Profesională",
    description:
      "Contactați Anova Medical Clinic pentru programări și informații medicale. Găsiți detalii de contact, adresa și orarul nostru.",
  },
  "/despre-noi": {
    title: "Despre Noi | Anova Medical Clinic",
    description:
      "Anova Medical: Echipă dedicată și soluții avansate binele pacienților. Descoperă mai multe pe pagina 'Despre Noi'.",
  },
  "/echipa": {
    title: "Echipa · Anova Medical Clinic",
    description:
      "Echipa Anova Medical Clinic: medici psihiatri, psihologi, neurologi, cardiologi și endocrinologi dedicați sănătății tale, în Iași.",
  },
  "/echipa/alexandru-ungureanu": {
    title: "Alexandru Ungureanu - Psiholog | Anova Medical Clinic",
    description:
      "Alexandru Ungureanu, psiholog la Anova Medical Clinic, oferă consiliere și terapie de calitate pentru echilibrul tău emoțional.",
  },
  "/echipa/ana-caterina-cristofor": {
    title: "Dr. Ana-Caterina Cristofor - Psihiatrie | Anova Medical",
    description:
      "Tratament psihiatric de înaltă calitate cu Dr. Ana-Caterina Cristofor la Anova Medical. Suport dedicat pentru sănătatea ta mentală.",
  },
  // Corectat: pe site-ul vechi descrierea era copiată de la Ana-Caterina Cristofor.
  "/echipa/andra-morasan": {
    title: "Dr. Andra Morășan - Psihiatrie | Anova Medical",
    description:
      "Dr. Andra Morășan, medic primar psihiatru la Anova Medical Clinic din Iași. Parcurs terapeutic blând și personalizat pentru sănătatea ta mintală.",
  },
  "/echipa/andreea-albu": {
    title: "Dr. Neurolog Andreea Albu | Anova Medical Clinic",
    description:
      "Descoperă expertiza Dr. Andreea Albu în neurologie. Consultă un specialist dedicat sănătății tale cerebrale. Programări rapide și eficiente!",
  },
  "/echipa/aura-cosofret": {
    title: "Dr. Aura Coșofreț - Psihiatrie | Anova Medical Clinic",
    description:
      "Descoperă serviciile de psihiatrie oferite de Dr. Aura Coșofreț la Anova Medical Clinic. Află mai multe despre expertiza și abordarea sa în tratament.",
  },
  "/echipa/dan-chirila": {
    title: "Dr. Dan Chirila - Psihiatrie | Anova Medical Clinic",
    description:
      "Dr. Dan Chirilă, medic psihiatru la Anova Medical Clinic, oferă terapie și consiliere specializată pentru diverse afecțiuni psihice.",
  },
  "/echipa/elena-pcela": {
    title: "Dr. Elena Pcela - Psihiatrie | Anova Medical Clinic",
    description:
      "Dr. Elena Pcela, medic psihiatru la Anova Medical Clinic, este aici pentru a oferi suport și tratament specializat pentru tulburările psihice.",
  },
  "/echipa/georgean-rozinbaum": {
    title: "Dr. Georgean Rozinbaum - Anova Medical Clinic",
    description:
      "Descoperă expertiza lui Dr. Georgean Rozinbaum în psihiatrie pediatrică la Anova Medical Clinic, pentru îngrijire specializată pentru copii.",
  },
  // Corectat: pe site-ul vechi scria „Psihatrie”.
  "/echipa/irina-dobrin": {
    title: "Dr. Irina Dobrin - Psihiatrie | Anova Medical Clinic",
    description:
      "La Anova Medical Clinic, Dr. Irina Dobrin aduce expertiză și pasiune în psihiatrie, oferind soluții personalizate și adaptat nevoilor fiecărei persoane.",
  },
  "/echipa/matei-palimariciuc": {
    title: "Dr. Matei Palimariciuc - Psihiatrie | Anova Medical Clinic",
    description:
      "Descoperă terapia psihiatrică eficientă la Anova Medical Clinic, alături de Dr. Matei Palimariciuc, pentru a-ți recăpăta echilibrul mental și emoțional.",
  },
  "/echipa/mihaela-ungureanu": {
    title: "Mihaela Ungureanu - Psiholog | Anova Medical Clinic",
    description:
      "Ai nevoie de un spațiu sigur pentru a discuta despre problemele tale? Programează o ședință cu Mihaela Ungureanu, psiholog la Anova Medical Clinic.",
  },
  "/echipa/paula-stanciulescu": {
    title: "Paula Stănciulescu - Psiholog | Anova Medical Clinic",
    description:
      "Găsește suport emoțional și consiliere eficientă într-un mediu sigur și confidențial cu Paula Stănciulescu, psiholog la Anova Medical Clinic.",
  },
  "/echipa/ramona-costiug": {
    title: "Ramona Coștiug - Psiholog | Anova Medical Clinic",
    description:
      "Ramona Coștiug, psiholog clinician la Anova Medical Clinic, se remarcă prin empatie, profesionalism și o pasiune autentică pentru sănătatea mintală.",
  },
  "/echipa/silvia-tudosa": {
    title: "Dr. Silvia Tudosă - Psihiatrie | Anova Medical Clinic",
    description:
      "Beneficiază de expertiza în psihiatrie a medicului Silvia Tudosa. Oferim îngrijire medicală dedicată sănătății tale.",
  },
  "/echipa/thomas-gabriel-schreiner": {
    title: "Dr. Thomas Gabriel Schreiner - Neurologie | Anova Medical Clinic",
    description:
      "Dr. Thomas Gabriel Schreiner, neurolog la Anova Medical Clinic, oferă îngrijire de top pentru diverse afecțiuni neurologice.",
  },
  "/echipa/tudor-florea": {
    title: "Dr. Tudor Florea - Psihiatrie | Anova Medical Clinic",
    description:
      "Explorează expertiza în psihiatrie a lui Tudor Florea la Anova Medical, Iași. Programează o consultație acum!",
  },
  "/politica-de-confidentialitate": {
    title: "Politica de confidențialitate - Anova Medical",
    description:
      "Politica de confidențialitate a Anova Medical Clinic (AMEDICALCLINIC SRL), conform Regulamentului (UE) 2016/679 (GDPR) și legislației din România.",
  },
  "/politica-de-cookie-uri": {
    title: "Politica de cookie-uri - Anova Medical",
    description:
      "Politica de cookie-uri a Anova Medical Clinic: ce sunt cookie-urile, ce tipuri folosim și cum le poți gestiona.",
  },
  "/specialitati": {
    title: "Specialități · Anova Medical Clinic",
    description:
      "Specialitățile Anova Medical Clinic din Iași: psihiatrie, psihiatrie pediatrică, psihologie, neurologie, cardiologie și endocrinologie.",
  },
  "/specialitati/cardiologie": {
    title: "Cardiologie Iași | Anova Medical Clinic",
    description:
      "Cardiologie Iași la Anova Medical Clinic: consultații pentru sănătatea inimii și a sistemului cardiovascular. Programează o consultație.",
  },
  "/specialitati/endocrinologie": {
    title: "Endocrinologie Iași | Anova Medical Clinic",
    description:
      "Endocrinologie Iași la Anova Medical Clinic: echilibru hormonal, metabolism și tiroidă, evaluate cu atenție. Programează o consultație.",
  },
  "/specialitati/neurologie": {
    title: "Neurologie Iași - Anova Medical Clinic",
    description:
      "Neurologie Iași la Anova Medical: servicii esențiale și îngrijire pentru sănătatea ta neurologică. Află mai multe și programează-te acum!",
  },
  "/specialitati/psihiatrie": {
    title: "Clinică Psihiatrie Iași | Tratamente Personalizate - Anova Medical",
    description:
      "Cabinet psihiatrie Iași cu servicii de calitate oferite de medici psihiatri specializați. Programează-te acum! Decontare cu bilet de trimitere CAS.",
  },
  "/specialitati/psihiatrie-pediatrica": {
    title: "Psihiatrie Pediatrică Iași | Anova Medical Clinic",
    description:
      "Expertiză psihiatrică pediatrică Iași: Soluții adaptate nevoilor individuale ale copiilor. Descoperă serviciile noastre de psihiatrie pediatrică.",
  },
  "/specialitati/psihologie": {
    title: "Psihologie Iași | Anova Medical Clinic",
    description:
      "Psihologie Iași la Anova Medical. Evaluări precise și tratamente personalizate pentru starea ta de bine. Programează-te acum!",
  },
  "/termeni-si-conditii": {
    title: "Termeni și condiții · Anova Medical Clinic",
    description:
      "Termenii și condițiile de utilizare a website-ului Anova Medical Clinic (AMEDICALCLINIC SRL).",
  },
};

/**
 * Ia metadatele unei pagini, sau oprește build-ul.
 *
 * Nu e paranoia: prima versiune a acestui fișier omitea cele două pagini de
 * politici, `pageMeta[...]` întorcea `undefined`, iar `{...undefined}` se
 * împrăștie în nimic — așa că paginile s-au construit fericite, cu titlu și
 * descriere goale. TypeScript nu prinde asta cât timp indexarea unui `Record`
 * nu e marcată ca posibil nedefinită. O cheie greșită trebuie să pice
 * zgomotos, la build, nu să ajungă tăcut în Google.
 */
export function requireMeta(path: string): PageMeta {
  const meta = pageMeta[path];
  if (!meta) {
    throw new Error(
      `Lipsesc metadatele pentru „${path}" în src/lib/page-meta.ts.`,
    );
  }
  return meta;
}

/** Imaginea implicită la distribuire (`src/app/opengraph-image.png`). */
const OG_IMPLICIT = "/opengraph-image.png";

/**
 * Construiește metadatele unei pagini dintr-o singură sursă.
 *
 * Există pentru că `openGraph` definit într-o pagină înlocuiește complet
 * moștenirea din layout, inclusiv imaginea luată automat din
 * `opengraph-image.png` — de aceea paginile de medic și de specialitate
 * ajunseseră să se distribuie fără nicio imagine. La fel și `twitter`: dacă
 * pagina nu îl setează, rămâne cel din layoutul rădăcină, așa că fiecare
 * pagină se anunța pe X cu titlul primei pagini.
 */
export function buildMetadata({
  path,
  title,
  description,
  image,
  type = "website",
}: {
  /** Calea canonică, fără domeniu (ex. `/echipa/matei-palimariciuc`). */
  path: string;
  title: string;
  description: string;
  /** Cale absolută către imaginea de distribuire; implicit cea a clinicii. */
  image?: string;
  type?: "website" | "article" | "profile";
}): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
  const images = [image ?? OG_IMPLICIT];

  return {
    // `absolute` ocolește șablonul „%s · Anova Medical Clinic” din layout:
    // titlurile de mai jos își poartă deja numele clinicii.
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { type, title, description, url, images, siteName: siteConfig.name },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
