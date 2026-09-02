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
    tagline: "Îngrijire specializată pentru sănătatea mintală",
    intro: [
      "La ANOVA Medical, serviciile de psihiatrie sunt construite în jurul unei evaluări complete, a unui diagnostic riguros și a unei abordări terapeutice adaptate nevoilor fiecărui pacient.",
      "Echipa noastră de medici psihiatri oferă servicii de evaluare, diagnostic, tratament și monitorizare pentru o gamă largă de afecțiuni psihice, printre care tulburările de anxietate, tulburările depresive, tulburările de somn, tulburarea bipolară, tulburările psihotice și alte dificultăți care pot afecta semnificativ funcționarea și calitatea vieții.",
      "Pornind de la particularitățile fiecărei persoane, medicul psihiatru stabilește o strategie terapeutică individualizată, care poate include tratament medicamentos, recomandări de psihoterapie și colaborare cu alți specialiști, atunci când situația o impune.",
      "În cadrul ANOVA Medical, punem accent pe o relație medicală bazată pe profesionalism, confidențialitate și respect. Ne propunem să oferim pacienților nu doar acces la expertiză medicală, ci și un parcurs de îngrijire clar, coerent și adaptat nevoilor lor.",
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
    tagline: "Evaluare și îngrijire specializată pentru copii și adolescenți",
    intro: [
      "Sănătatea mintală a copiilor și adolescenților are particularități specifice fiecărei etape de dezvoltare. La ANOVA Medical, evaluarea psihiatrică pediatrică urmărește înțelegerea complexă a dificultăților întâmpinate de copil sau adolescent, ținând cont de dezvoltarea sa emoțională, cognitivă și comportamentală, precum și de contextul familial și școlar.",
      "Oferim servicii de evaluare, diagnostic, tratament și monitorizare pentru o gamă variată de dificultăți și tulburări psihice, precum tulburările de anxietate, tulburările depresive, tulburările de comportament, dificultățile de adaptare, tulburările de somn, tulburările de alimentație și alte probleme care pot afecta dezvoltarea și funcționarea copilului sau adolescentului.",
      "Fiecare evaluare este realizată individualizat, într-un cadru adaptat vârstei și nivelului de dezvoltare al copilului. Atunci când este necesar, intervenția poate include tratament medicamentos, recomandări de intervenție psihologică sau psihoterapeutică și colaborarea cu alți specialiști.",
      "Familia are un rol esențial în procesul de evaluare și intervenție. De aceea, încurajăm comunicarea deschisă cu părinții și oferim acestora informațiile și recomandările necesare pentru a putea susține copilul pe parcursul procesului terapeutic.",
      "La ANOVA Medical, urmărim să oferim copiilor și adolescenților un parcurs medical profesionist, sigur și adaptat nevoilor lor, iar familiilor acestora claritate, sprijin și continuitate în îngrijire.",
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
    tagline: "Sprijin specializat pentru echilibrul tău emoțional",
    intro: [
      "Sănătatea psihologică influențează modul în care gândim, simțim, ne raportăm la ceilalți și facem față provocărilor de zi cu zi. La ANOVA Medical, serviciile de psihologie sunt orientate spre înțelegerea nevoilor fiecărei persoane și identificarea unor soluții adaptate dificultăților cu care aceasta se confruntă.",
      "Echipa noastră de psihologi oferă servicii de evaluare și consiliere psihologică, precum și intervenții destinate persoanelor care se confruntă cu anxietate, simptomatologie depresivă, stres, dificultăți de adaptare, probleme relaționale sau alte provocări care pot afecta echilibrul emoțional și calitatea vieții.",
      "Intervențiile sunt adaptate particularităților și obiectivelor fiecărei persoane, utilizând metode și tehnici validate științific. În funcție de nevoile identificate, procesul poate integra principii și intervenții specifice terapiei cognitiv-comportamentale, terapiei dialectic-comportamentale și altor abordări psihologice.",
      "Într-un cadru profesionist, confidențial și bazat pe respect, procesul psihologic oferă un spațiu în care poți înțelege mai bine propriile gânduri, emoții și comportamente, dezvoltând treptat resurse și strategii care să susțină o funcționare mai echilibrată și o calitate mai bună a vieții.",
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
    tagline: "Evaluare și tratament pentru afecțiunile sistemului nervos",
    intro: [
      "Sistemul nervos coordonează funcțiile esențiale ale organismului și are un rol important în menținerea autonomiei și a calității vieții. La ANOVA Medical, serviciile de neurologie sunt orientate spre evaluarea atentă a simptomelor, stabilirea diagnosticului și identificarea celor mai potrivite opțiuni de tratament și monitorizare.",
      "Medicii noștri neurologi oferă evaluare și îngrijire pentru o gamă variată de afecțiuni neurologice, de la migrene și cefalee, amețeli și tulburări de echilibru, până la neuropatii, tulburări de memorie și alte afecțiuni ale sistemului nervos central și periferic.",
      "Evaluarea neurologică este adaptată simptomelor și particularităților fiecărui pacient și poate include investigații și examinări specifice, în funcție de indicația medicală. Pe baza rezultatelor, medicul neurolog stabilește un plan individualizat de tratament și monitorizare.",
      "La ANOVA Medical, punem accent pe un diagnostic riguros, comunicare clară și continuitatea îngrijirii. Fiecare etapă a evaluării și a tratamentului este explicată pacientului, astfel încât deciziile medicale să fie înțelese și adaptate evoluției stării de sănătate.",
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
    tagline: "Îngrijire specializată pentru sănătatea inimii",
    intro: [
      "Sănătatea cardiovasculară reprezintă o componentă esențială a stării generale de sănătate. La ANOVA Medical, consultația cardiologică pornește de la o evaluare atentă a simptomelor, antecedentelor personale și familiale, precum și a principalilor factori de risc cardiovascular.",
      "Serviciile de cardiologie sunt orientate atât spre prevenirea și identificarea timpurie a afecțiunilor cardiovasculare, cât și spre evaluarea, monitorizarea și managementul afecțiunilor deja diagnosticate. În funcție de nevoile fiecărui pacient, medicul cardiolog stabilește un plan de investigații și monitorizare adaptat particularităților individuale.",
      "Evaluarea poate include analiza tensiunii arteriale, a ritmului cardiac și a celorlalți factori care pot influența sănătatea cardiovasculară, cu scopul de a identifica din timp eventualele riscuri și de a stabili cele mai potrivite măsuri de prevenție sau tratament.",
      "La ANOVA Medical, punem accent pe comunicarea clară și pe înțelegerea fiecărei etape a procesului medical. Ne dorim ca fiecare pacient să înțeleagă rezultatele evaluării, recomandările primite și pașii necesari pentru menținerea și monitorizarea sănătății cardiovasculare pe termen lung.",
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
    tagline: "Evaluarea și tratamentul afecțiunilor hormonale și metabolice",
    intro: [
      "Sistemul endocrin are un rol esențial în reglarea metabolismului, creșterii și dezvoltării, nivelului de energie și a numeroase alte funcții ale organismului. Modificările funcției hormonale pot avea manifestări variate și pot influența semnificativ starea generală de sănătate.",
      "La ANOVA Medical, serviciile de endocrinologie sunt orientate spre evaluarea complexă a simptomelor, identificarea cauzelor și stabilirea unui diagnostic cât mai precis. Medicii noștri endocrinologi oferă evaluare și îngrijire pentru o gamă largă de afecțiuni endocrine și metabolice, inclusiv tulburări ale tiroidei, afecțiuni ale metabolismului și alte dezechilibre hormonale.",
      "În funcție de simptomatologie și de particularitățile fiecărui pacient, evaluarea poate include consultul clinic, interpretarea analizelor hormonale și metabolice și, atunci când este indicat, investigații suplimentare pentru stabilirea diagnosticului.",
      "Pe baza rezultatelor, medicul endocrinolog stabilește un plan individualizat de tratament și monitorizare, adaptat evoluției fiecărui caz.",
      "La ANOVA Medical, punem accent pe un diagnostic riguros, comunicare clară și continuitatea îngrijirii, astfel încât fiecare pacient să beneficieze de o abordare medicală profesionistă și adaptată nevoilor sale.",
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
