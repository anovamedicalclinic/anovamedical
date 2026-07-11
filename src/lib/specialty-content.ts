import {
  Activity,
  Baby,
  Brain,
  ClipboardList,
  HeartHandshake,
  HeartPulse,
  Droplets,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";

export type SpecialtyBlock = {
  title: string;
  intro?: string;
  icon: LucideIcon;
  layout: "checklist" | "pills" | "cards";
  items: string[];
};

export type SpecialtyContent = {
  tagline: string;
  intro: string[];
  blocks: SpecialtyBlock[];
};

export const specialtyContent: Record<string, SpecialtyContent> = {
  psihiatrie: {
    tagline: "O abordare holistică pentru sănătatea mintală",
    intro: [
      "Psihiatria de la Anova pornește de la un principiu simplu: în spatele fiecărui simptom există un om, cu povestea și ritmul lui. De aceea evaluăm cu atenție și construim un plan de tratament croit pe nevoile tale.",
      "Echipa noastră de medici psihiatri tratează o gamă largă de afecțiuni, de la anxietate și depresie până la tulburări de somn, tulburare bipolară sau schizofrenie, atât în ambulatoriu, cât și în urmărirea pe termen lung.",
      "Într-un cadru discret și empatic, identificăm împreună sursele disconfortului și găsim, pas cu pas, modalități concrete de a-l gestiona.",
    ],
    blocks: [
      {
        title: "Semne că un consult ar ajuta",
        intro:
          "Dacă recunoști câteva dintre aceste semne, o evaluare te poate ajuta să înțelegi mai bine ce se întâmplă.",
        icon: ClipboardList,
        layout: "checklist",
        items: [
          "Somn perturbat, insomnie sau nevoie crescută de odihnă",
          "Modificări ale apetitului sau ale greutății",
          "Dificultăți de concentrare, memorie sau decizie",
          "Nevoia de a te izola de cei din jur",
          "Iritabilitate, sensibilitate sau plâns ușor",
          "Fluctuații ale dispoziției sau comportamente neobișnuite",
          "Apatie și lipsă de interes pentru lucrurile care îți plăceau",
          "Oboseală constantă sau, dimpotrivă, energie excesivă",
          "Agitație sau lentoare în gânduri și acțiuni",
          "Scădere în funcționarea socială și profesională",
        ],
      },
      {
        title: "Afecțiuni pe care le tratăm",
        icon: Brain,
        layout: "pills",
        items: [
          "Anxietate",
          "Depresie",
          "Demență",
          "Tulburări de somn",
          "Tulburare bipolară",
          "Tulburări de alimentație",
          "Dependențe",
          "Stres posttraumatic (PTSD)",
          "Tulburări de personalitate",
          "Schizofrenie",
        ],
      },
      {
        title: "Obiceiuri care îți protejează mintea",
        icon: Sparkles,
        layout: "cards",
        items: [
          "Mindfulness și tehnici de relaxare",
          "Mișcare fizică regulată",
          "Nutriție echilibrată",
          "Un program de somn constant",
          "Gestionarea sănătoasă a stresului",
          "Relații și sprijin social",
          "Limitarea alcoolului și a substanțelor",
          "Recunoașterea și exprimarea emoțiilor",
          "Timp pentru activități care îți fac bine",
        ],
      },
    ],
  },

  "psihiatrie-pediatrica": {
    tagline: "Sprijin blând pentru copii și adolescenți",
    intro: [
      "Pentru cei mici, sănătatea mintală cere un limbaj aparte și multă răbdare. Oferim evaluări și tratamente adaptate fiecărei vârste, într-un mediu în care copilul se simte în siguranță.",
      "De la anxietate și tulburări de comportament până la dificultăți de alimentație sau de adaptare, sprijinim copiii și adolescenții să-și înțeleagă emoțiile și să găsească echilibrul.",
      "Lucrăm mereu împreună cu familia. Într-un mod cald și interactiv, ne asigurăm că fiecare pas este făcut cu grijă și cu respect pentru ritmul copilului.",
    ],
    blocks: [
      {
        title: "Ce include îngrijirea",
        intro:
          "Echipa terapeutică, formată din medic psihiatru și psiholog, te însoțește la fiecare etapă.",
        icon: HeartHandshake,
        layout: "checklist",
        items: [
          "Evaluare clinică atentă",
          "Diagnostic clar, explicat pe înțelesul familiei",
          "Tratament medicamentos, atunci când este necesar",
          "Psihoterapie adaptată vârstei",
          "Monitorizare și ajustare continuă",
          "Consilierea și sprijinul părinților",
          "Prevenție și psihoeducație",
        ],
      },
      {
        title: "Frecvent întâlnite la copii",
        icon: Baby,
        layout: "pills",
        items: [
          "ADHD",
          "Tulburări de anxietate",
          "Tulburare de spectru autist",
          "Depresie",
          "Tulburări de alimentație",
          "Ticuri",
          "Tulburări de somn",
          "Tulburări de comportament",
          "Anxietate de separare",
          "Dificultăți de limbaj",
        ],
      },
      {
        title: "Frecvent întâlnite la adolescenți",
        icon: Users,
        layout: "pills",
        items: [
          "ADHD",
          "Tulburări de anxietate",
          "Depresie",
          "Tulburare de spectru autist",
          "Tulburări de alimentație",
          "Tulburări de dispoziție",
          "Consum de substanțe",
          "Tulburări de comportament",
          "Anxietate socială",
          "Tulburare bipolară",
        ],
      },
    ],
  },

  psihologie: {
    tagline: "Un spațiu sigur pentru a-ți explora gândurile",
    intro: [
      "Psihologii și psihoterapeuții noștri te însoțesc pe un drum pe care nu trebuie să îl parcurgi singur. Fie că e vorba de anxietate, depresie, stres, traume sau relații, găsim împreună soluții pentru o minte mai liniștită.",
      "Folosim abordări personalizate, printre care terapia cognitiv-comportamentală și terapia dialectic-comportamentală, pentru a-ți dezvolta abilități de coping și a-ți întări stima de sine.",
      "Într-un cadru confidențial și lipsit de judecată, îți explorezi gândurile și emoțiile în siguranță, spre creștere personală și echilibru emoțional.",
    ],
    blocks: [
      {
        title: "Tehnici pe care le folosim",
        icon: Sparkles,
        layout: "cards",
        items: [
          "Gestionarea stresului",
          "Comunicare eficientă",
          "Organizarea timpului",
          "Întărirea stimei de sine",
          "Reformularea gândurilor negative",
          "Rezolvarea problemelor",
          "Managementul emoțiilor",
          "Creșterea rezilienței",
          "Stabilirea obiectivelor",
        ],
      },
      {
        title: "Cu ce vin oamenii la psiholog",
        icon: MessagesSquare,
        layout: "pills",
        items: [
          "Anxietate",
          "Depresie",
          "Stres",
          "Traume",
          "Tulburări de alimentație",
          "Probleme de relație",
          "Dependențe",
          "Gestionarea furiei",
          "Pierdere și doliu",
        ],
      },
      {
        title: "Cum te putem ajuta",
        icon: HeartHandshake,
        layout: "checklist",
        items: [
          "Evaluare și diagnostic psihologic",
          "Terapie și consiliere individuală",
          "Dezvoltarea abilităților de gestionare",
          "Consiliere pentru relații și cuplu",
          "Consiliere de dezvoltare personală",
          "Sprijin în comportamente dependente",
          "Asistență în situații de criză",
          "Psihoeducație și conștientizare",
        ],
      },
    ],
  },

  neurologie: {
    tagline: "De la migrene la afecțiuni neurodegenerative",
    intro: [
      "Neurologia se ocupă de sănătatea creierului și a sistemului nervos, cu impact direct asupra calității vieții. Medicii noștri neurologi oferă evaluări și tratamente pentru o gamă largă de afecțiuni.",
      "De la migrene și dureri de cap până la afecțiuni neurodegenerative sau ale sistemului nervos periferic, folosim metode moderne de diagnostic pentru soluții personalizate.",
      "Într-un mediu profesionist și primitor, îți explicăm clar fiecare pas și adaptăm planul de tratament în funcție de evoluția ta.",
    ],
    blocks: [
      {
        title: "Afecțiuni pe care le evaluăm",
        icon: Activity,
        layout: "pills",
        items: [
          "Migrenă",
          "Epilepsie",
          "Accident vascular cerebral",
          "Boala Parkinson",
          "Scleroză multiplă",
          "Miastenia gravis",
          "Neuropatie periferică",
          "Demență",
          "Boala Charcot-Marie-Tooth",
          "Tulburări de mișcare",
        ],
      },
      {
        title: "Cum lucrăm",
        icon: Stethoscope,
        layout: "checklist",
        items: [
          "Diagnostic corect, bazat pe investigații actuale",
          "Explicații clare la fiecare pas",
          "Interpretarea rezultatelor imagistice",
          "Plan de tratament adaptat evoluției tale",
          "Colaborare cu specialiștii în sănătate mintală",
        ],
      },
    ],
  },

  cardiologie: {
    tagline: "Sănătatea inimii, cu grijă și prevenție",
    intro: [
      "Inima lucrează pentru tine în fiecare clipă, iar starea ei se reflectă în tot organismul. Consultația de cardiologie pornește de la o evaluare atentă a riscului cardiovascular și de la povestea ta.",
      "Urmărim tensiunea, ritmul cardiac și factorii de risc, iar apoi construim împreună un plan potrivit, fie că este vorba de prevenție, de monitorizare sau de tratarea unei afecțiuni deja diagnosticate.",
      "Îți explicăm clar ce înseamnă fiecare rezultat și ce pași concreți poți face pentru o inimă sănătoasă pe termen lung.",
    ],
    blocks: [
      {
        title: "Afecțiuni pe care le evaluăm",
        icon: HeartPulse,
        layout: "pills",
        items: [
          "Hipertensiune arterială",
          "Aritmii",
          "Boală coronariană",
          "Insuficiență cardiacă",
          "Palpitații",
          "Colesterol crescut",
          "Risc cardiovascular",
          "Afecțiuni ale valvelor",
          "Boli ale aortei",
        ],
      },
      {
        title: "Cum lucrăm",
        intro:
          "De la prima evaluare până la monitorizarea pe termen lung, ești însoțit la fiecare pas.",
        icon: Stethoscope,
        layout: "checklist",
        items: [
          "Evaluarea completă a riscului cardiovascular",
          "Interpretarea investigațiilor (EKG, analize, imagistică)",
          "Diagnostic clar, explicat pe înțelesul tău",
          "Plan de tratament adaptat fiecărui pacient",
          "Monitorizare și ajustare pe parcurs",
        ],
      },
      {
        title: "Obiceiuri pentru o inimă sănătoasă",
        icon: ShieldCheck,
        layout: "cards",
        items: [
          "Mișcare fizică regulată",
          "Alimentație echilibrată, redusă în sare",
          "Controlul tensiunii arteriale",
          "Renunțarea la fumat",
          "Gestionarea stresului",
          "Un somn de calitate",
          "Menținerea unei greutăți sănătoase",
          "Controale periodice",
        ],
      },
    ],
  },

  endocrinologie: {
    tagline: "Echilibrul hormonal, cheia stării de bine",
    intro: [
      "Sistemul endocrin coordonează, prin hormoni, procese esențiale din corp: metabolismul, energia, somnul și chiar dispoziția. Când acest echilibru se strică, efectele se simt în întregul organism.",
      "În cadrul consultațiilor de endocrinologie evaluăm funcția glandelor și identificăm cauzele dezechilibrelor, de la tiroidă la metabolism, cu o atenție deosebită pentru fiecare simptom.",
      "Îți oferim un diagnostic atent și un plan de tratament personalizat, cu monitorizare și ajustare pe parcurs, ca să îți recapeți echilibrul și starea de bine.",
    ],
    blocks: [
      {
        title: "Afecțiuni pe care le tratăm",
        icon: Droplets,
        layout: "pills",
        items: [
          "Afecțiuni ale tiroidei",
          "Diabet zaharat",
          "Dezechilibre hormonale",
          "Obezitate și sindrom metabolic",
          "Osteoporoză",
          "Afecțiuni ale glandelor suprarenale",
          "Tulburări de creștere",
          "Afecțiuni ale hipofizei",
          "Sindromul ovarelor polichistice",
        ],
      },
      {
        title: "Semne care indică nevoia unui consult",
        intro:
          "Dacă recunoști câteva dintre aceste semne, o evaluare hormonală te poate ajuta.",
        icon: ClipboardList,
        layout: "checklist",
        items: [
          "Oboseală persistentă, fără o cauză clară",
          "Modificări de greutate greu de explicat",
          "Schimbări ale ritmului cardiac",
          "Sensibilitate la frig sau la căldură",
          "Modificări ale pielii sau ale părului",
          "Tulburări de somn sau de dispoziție",
          "Sete accentuată și urinare frecventă",
        ],
      },
    ],
  },
};
