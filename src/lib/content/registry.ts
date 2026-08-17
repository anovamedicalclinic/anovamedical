/**
 * Registrul textelor editabile din panoul de administrare.
 *
 * Acesta este contractul dintre site și panou. STRUCTURA (ce câmpuri există, ce
 * lungime au, unde apar) trăiește aici, în cod; baza de date păstrează doar
 * valorile schimbate. Consecințele sunt exact cele cerute:
 *
 *   - layout-ul și tipografia nu pot fi stricate din panou, pentru că din admin
 *     se schimbă doar conținutul unui câmp, niciodată marcajul sau clasele;
 *   - `max` este calibrat pe spațiul real din design, deci un text prea lung e
 *     respins la salvare, nu descoperit ulterior pe site;
 *   - dacă `site_content` e gol (sau baza de date pică), site-ul afișează
 *     `default`, adică exact textul de dinainte de panou.
 *
 * Când adaugi un câmp nou: declară-l aici cu valoarea curentă din componentă ca
 * `default`, apoi înlocuiește textul din componentă cu `content("cheia")`.
 */

export type FieldKind = "text" | "multiline" | "url" | "email" | "tel";

export type ContentField = {
  /** Cheia din `site_content`, ex. `home.hero.title`. */
  key: string;
  label: string;
  kind: FieldKind;
  /** Lungimea maximă, aleasă după spațiul disponibil în design. */
  max: number;
  /** Textul afișat când nu există suprascriere în baza de date. */
  default: string;
  /** Explicație scurtă arătată sub câmp, în panou. */
  help?: string;
};

export type ContentSection = {
  id: string;
  title: string;
  description: string;
  /** Unde se vede secțiunea, pentru gruparea din panou. */
  page: string;
  /** Ancoră pentru butonul „Vezi pe site”. */
  preview: string;
  fields: ContentField[];
};

export const contentSections: ContentSection[] = [
  // ---------------------------------------------------------------- Prima pagină
  {
    id: "home.hero",
    title: "Hero",
    description:
      "Primul ecran, peste videoclipul de prezentare. Titlul e cel mai vizibil text din site.",
    page: "Prima pagină",
    preview: "/",
    fields: [
      {
        key: "home.hero.title",
        label: "Titlu",
        kind: "text",
        max: 70,
        default: "Regăsește-ți echilibrul, pas cu pas.",
        help: "Peste ~70 de caractere titlul trece pe patru rânduri pe mobil.",
      },
      {
        key: "home.hero.subtitle",
        label: "Subtitlu",
        kind: "multiline",
        max: 260,
        default:
          "Clinică de sănătate mintală și neurologică în {oras}. Un spațiu discret și sigur, unde fiecare poveste este ascultată cu răbdare, iar îngrijirea e croită pe măsura ta.",
        help: "{oras} este înlocuit automat cu orașul din setările clinicii.",
      },
      {
        key: "home.hero.cta",
        label: "Buton",
        kind: "text",
        max: 24,
        default: "Programează-te",
      },
    ],
  },
  {
    id: "home.about",
    title: "Despre (previzualizare)",
    description: "Secțiunea cu poza echipei, imediat sub hero.",
    page: "Prima pagină",
    preview: "/#despre",
    fields: [
      {
        key: "home.about.eyebrow",
        label: "Supratitlu",
        kind: "text",
        max: 40,
        default: "Despre Anova Medical Clinic",
      },
      {
        key: "home.about.title",
        label: "Titlu",
        kind: "text",
        max: 70,
        default: "Îngrijire construită în jurul fiecărei povești.",
      },
      {
        key: "home.about.paragraph_1",
        label: "Paragraful 1",
        kind: "multiline",
        max: 500,
        default:
          "ANOVA Medical Clinic s-a născut din dorința de a crea un loc sigur pentru oamenii care traversează o perioadă dificilă. Numele vine de la Analiză a Variabilității și Abordare Nuanțată, felul nostru de a privi fiecare persoană în complexitatea ei, nu ca pe un simplu diagnostic.",
      },
      {
        key: "home.about.paragraph_2",
        label: "Paragraful 2",
        kind: "multiline",
        max: 500,
        default:
          "Suntem o echipă multidisciplinară de medici, psihologi și terapeuți, alături de tine cu răbdare și profesionalism, ca să îți regăsești echilibrul.",
      },
      {
        key: "home.about.cta_primary",
        label: "Buton principal",
        kind: "text",
        max: 24,
        default: "Programează-te",
      },
      {
        key: "home.about.cta_secondary",
        label: "Buton secundar",
        kind: "text",
        max: 28,
        default: "Vezi povestea completă",
      },
    ],
  },
  {
    id: "home.specialties",
    title: "Specialități",
    description: "Titlul secțiunii cu cele șase specialități.",
    page: "Prima pagină",
    preview: "/#specialitati",
    fields: [
      {
        key: "home.specialties.eyebrow",
        label: "Supratitlu",
        kind: "text",
        max: 40,
        default: "Specialități",
      },
      {
        key: "home.specialties.title",
        label: "Titlu",
        kind: "text",
        max: 70,
        default: "Îngrijire completă, sub același acoperiș",
      },
      {
        key: "home.specialties.description",
        label: "Descriere",
        kind: "multiline",
        max: 260,
        default:
          "De la sănătate mintală la neurologie, cardiologie și endocrinologie, echipa noastră acoperă o gamă largă de nevoi, cu aceeași grijă și atenție.",
      },
    ],
  },
  {
    id: "home.team",
    title: "Echipa",
    description:
      "Titlul caruselului de pe prima pagină. Medicii se editează separat, în secțiunea Medici.",
    page: "Prima pagină",
    preview: "/#echipa",
    fields: [
      {
        key: "home.team.eyebrow",
        label: "Supratitlu",
        kind: "text",
        max: 40,
        default: "Echipa",
      },
      {
        key: "home.team.title",
        label: "Titlu",
        kind: "text",
        max: 70,
        default: "Specialiști dedicați, alături de tine",
      },
      {
        key: "home.team.description",
        label: "Descriere",
        kind: "multiline",
        max: 260,
        default:
          "O echipă multidisciplinară de medici, psihologi și terapeuți. Apasă pe un card pentru a afla mai multe.",
      },
      {
        key: "home.team.cta",
        label: "Buton",
        kind: "text",
        max: 28,
        default: "Vezi echipa completă",
      },
    ],
  },
  {
    id: "home.testimonials",
    title: "Recenzii",
    description:
      "Titlul secțiunii de recenzii. Recenziile în sine se editează în secțiunea Recenzii.",
    page: "Prima pagină",
    preview: "/#recenzii",
    fields: [
      {
        key: "home.testimonials.eyebrow",
        label: "Supratitlu",
        kind: "text",
        max: 40,
        default: "Recenzii",
      },
      {
        key: "home.testimonials.title",
        label: "Titlu",
        kind: "text",
        max: 70,
        default: "Ce spun pacienții noștri",
      },
      {
        key: "home.testimonials.cta",
        label: "Buton",
        kind: "text",
        max: 28,
        default: "Vezi toate recenziile",
      },
    ],
  },
  {
    id: "home.visit",
    title: "Vizitează-ne",
    description: "Secțiunea cu harta și formularul de programare.",
    page: "Prima pagină",
    preview: "/#contact",
    fields: [
      {
        key: "home.visit.eyebrow",
        label: "Supratitlu",
        kind: "text",
        max: 40,
        default: "Vizitează-ne",
      },
      {
        key: "home.visit.title",
        label: "Titlu",
        kind: "text",
        max: 70,
        default: "Suntem aproape de tine, în inima Iașului",
      },
      {
        key: "home.visit.description",
        label: "Descriere",
        kind: "multiline",
        max: 260,
        default:
          "Programează o consultație completând formularul de mai jos sau sună-ne direct. Te așteptăm într-un spațiu cald și primitor.",
      },
      {
        key: "home.visit.form_title",
        label: "Titlul formularului",
        kind: "text",
        max: 40,
        default: "Programează o consultație",
      },
      {
        key: "home.visit.form_note",
        label: "Nota de sub titlu",
        kind: "text",
        max: 120,
        default: "Completează câmpurile, iar noi te sunăm pentru confirmare.",
      },
    ],
  },
  {
    id: "home.cta",
    title: "Bandă de îndemn",
    description:
      "Banda petrol de la finalul paginilor. Apare pe prima pagină, Echipa și Specialități.",
    page: "Toate paginile",
    preview: "/",
    fields: [
      {
        key: "home.cta.title",
        label: "Titlu",
        kind: "text",
        max: 60,
        default: "Pregătit să faci primul pas?",
      },
      {
        key: "home.cta.description",
        label: "Descriere",
        kind: "multiline",
        max: 200,
        default:
          "Programează o consultație. Echipa noastră îți răspunde cu căldură și fără grabă.",
      },
    ],
  },

  // -------------------------------------------------------- Antetele paginilor
  {
    id: "echipa.header",
    title: "Antetul paginii Echipa",
    description: "Titlul și descrierea din capul paginii /echipa.",
    page: "Echipa",
    preview: "/echipa",
    fields: [
      {
        key: "echipa.header.eyebrow",
        label: "Supratitlu",
        kind: "text",
        max: 40,
        default: "Echipa",
      },
      {
        key: "echipa.header.title",
        label: "Titlu",
        kind: "text",
        max: 70,
        default: "Oamenii din spatele îngrijirii tale",
      },
      {
        key: "echipa.header.description",
        label: "Descriere",
        kind: "multiline",
        max: 320,
        default:
          "O echipă multidisciplinară de medici psihiatri, psihologi, neurologi, cardiologi și endocrinologi. Apasă pe un card pentru a afla mai multe despre fiecare specialist.",
      },
      {
        key: "echipa.support.eyebrow",
        label: "Supratitlu echipă de suport",
        kind: "text",
        max: 40,
        default: "Echipa de suport",
      },
      {
        key: "echipa.support.title",
        label: "Titlu echipă de suport",
        kind: "text",
        max: 70,
        default: "Oamenii care te întâmpină",
      },
      {
        key: "echipa.support.description",
        label: "Descriere echipă de suport",
        kind: "multiline",
        max: 320,
        default:
          "Conducerea clinicii și asistentele medicale care se ocupă de programări, de pregătirea consultațiilor și de confortul tău la fiecare vizită.",
      },
    ],
  },

  // ------------------------------------------------------- Datele de contact
  {
    id: "site.contact",
    title: "Date de contact",
    description:
      "Apar în antet, subsol, pagina de contact și pe butoanele flotante. O greșeală aici se vede peste tot.",
    page: "Tot site-ul",
    preview: "/contact",
    fields: [
      {
        key: "site.contact.phone",
        label: "Telefon (afișat)",
        kind: "tel",
        max: 24,
        default: "0774 037 531",
        help: "Formatul afișat vizitatorului. Linkul de apel se construiește automat.",
      },
      {
        key: "site.contact.phone_href",
        label: "Telefon (link)",
        kind: "text",
        max: 24,
        default: "tel:+40774037531",
        help: "Formatul internațional, fără spații.",
      },
      {
        key: "site.contact.whatsapp",
        label: "Link WhatsApp",
        kind: "url",
        max: 120,
        default: "https://wa.me/40774037531",
      },
      {
        key: "site.contact.email",
        label: "Email",
        kind: "email",
        max: 120,
        default: "contact@anovamedical.ro",
      },
      {
        key: "site.contact.address",
        label: "Adresă",
        kind: "text",
        max: 120,
        default: "Șos. Nicolina, Nr. 14, Iași",
      },
      {
        key: "site.contact.note",
        label: "Notă despre consultații",
        kind: "multiline",
        max: 320,
        default:
          "Oferim consultații gratuite pacienților asigurați care prezintă bilet de trimitere de la medicul de familie sau specialist.",
      },
    ],
  },
  {
    id: "site.social",
    title: "Rețele sociale și recenzii Google",
    description:
      "Linkurile din subsol și badge-ul de încredere din secțiunea de recenzii.",
    page: "Tot site-ul",
    preview: "/#recenzii",
    fields: [
      {
        key: "site.social.facebook",
        label: "Facebook",
        kind: "url",
        max: 160,
        default: "https://www.facebook.com/anova.medical.clinic",
      },
      {
        key: "site.social.instagram",
        label: "Instagram",
        kind: "url",
        max: 160,
        default: "https://www.instagram.com/anova.medical.clinic",
      },
      {
        key: "site.google.rating",
        label: "Nota Google",
        kind: "text",
        max: 4,
        default: "4.8",
        help: "Un număr între 1 și 5, cu punct ca separator zecimal.",
      },
      {
        key: "site.google.count_label",
        label: "Număr de recenzii",
        kind: "text",
        max: 32,
        default: "+70 de recenzii",
      },
      {
        key: "site.google.profile_url",
        label: "Link profil Google",
        kind: "url",
        max: 200,
        default: "https://share.google/EEvIIfLGm9dJ44vRb",
      },
    ],
  },
];

/** Toate câmpurile, indexate după cheie. */
export const contentFields: Map<string, ContentField> = new Map(
  contentSections.flatMap((s) => s.fields.map((f) => [f.key, f] as const)),
);

/** Valorile implicite, folosite când baza de date nu are o suprascriere. */
export const contentDefaults: Record<string, string> = Object.fromEntries(
  contentSections.flatMap((s) => s.fields.map((f) => [f.key, f.default])),
);

export type ContentKey = string;

/** Secțiunile grupate pe pagină, pentru navigația din panou. */
export function sectionsByPage(): Map<string, ContentSection[]> {
  const grouped = new Map<string, ContentSection[]>();
  for (const section of contentSections) {
    const list = grouped.get(section.page) ?? [];
    list.push(section);
    grouped.set(section.page, list);
  }
  return grouped;
}
