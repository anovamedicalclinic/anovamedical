import type { Doctor, Specialty } from "@/lib/supabase/types";

/**
 * Date de rezervă, identice cu supabase/seed.sql.
 *
 * Sursa principală de adevăr rămâne Supabase. Acest fallback este folosit de
 * stratul de date (src/lib/data.ts) DOAR când variabilele de mediu Supabase nu
 * sunt configurate sau când un query eșuează - astfel site-ul se construiește și
 * randează corect înainte de conectarea bazei, apoi comută automat pe DB.
 *
 * Rosterul reflectă lista finală de colaboratori furnizată de client.
 */

const now = "1970-01-01T00:00:00.000Z";

export const fallbackSpecialties: Specialty[] = [
  {
    id: "psihiatrie",
    slug: "psihiatrie",
    name: "Psihiatrie",
    tagline: "O abordare holistică pentru sănătatea mintală.",
    summary:
      "Evaluări și tratamente personalizate pentru anxietate, depresie, tulburări de somn și alte afecțiuni psihiatrice.",
    description: `Echipa noastră de medici psihiatri îți oferă un cadru confidențial și empatic, în care fiecare poveste este ascultată cu atenție. Pornim de la o evaluare atentă a nevoilor tale și construim împreună un plan de tratament personalizat, adaptat ritmului și obiectivelor tale.

Credem într-o îngrijire care privește persoana în întregul ei, nu doar simptomele. De aceea îmbinăm evaluarea clinică riguroasă cu blândețea și răbdarea necesare pentru a-ți recâștiga echilibrul.

## Semne care indică nevoia unui consult
- Probleme de somn (insomnie sau somn excesiv)
- Modificări de apetit sau greutate
- Dificultăți de concentrare sau de memorie
- Tendința de a te izola de cei din jur
- Iritabilitate sau fluctuații frecvente de dispoziție
- Apatie, lipsă de interes pentru activitățile obișnuite
- Oboseală persistentă sau, dimpotrivă, energie excesivă
- Declin în funcționarea socială sau profesională

## Afecțiuni frecvente
- Anxietate
- Depresie
- Demență
- Tulburări de somn
- Tulburare afectivă bipolară
- Tulburări de alimentație
- Dependențe
- Tulburare de stres post-traumatic (TSPT)
- Tulburări de personalitate
- Schizofrenie

## Strategii de prevenție
- Practicarea mindfulness-ului și a tehnicilor de relaxare
- Exercițiu fizic regulat
- Nutriție echilibrată
- Un program de somn regulat
- Gestionarea sănătoasă a stresului
- Cultivarea relațiilor sănătoase și a sprijinului social
- Recunoașterea și exprimarea emoțiilor`,
    icon: "brain",
    order_index: 1,
    created_at: now,
  },
  {
    id: "psihiatrie-pediatrica",
    slug: "psihiatrie-pediatrica",
    name: "Psihiatrie Pediatrică",
    tagline: "Sprijin pentru sănătatea mintală a copiilor și adolescenților.",
    summary:
      "Susținem dezvoltarea armonioasă a celor mici printr-o îngrijire blândă și specializată.",
    description: `Sănătatea mintală a copiilor și adolescenților cere o atenție specială și un limbaj pe înțelesul lor. Medicii noștri specializați în psihiatrie pediatrică creează un mediu cald și sigur, în care cei mici se simt înțeleși, iar părinții găsesc sprijin și îndrumare.

Lucrăm îndeaproape cu familia pentru a susține dezvoltarea armonioasă a copilului, abordând cu delicatețe provocările emoționale, de comportament sau de adaptare specifice fiecărei vârste.`,
    icon: "baby",
    order_index: 2,
    created_at: now,
  },
  {
    id: "psihologie",
    slug: "psihologie",
    name: "Psihologie",
    tagline: "Un spațiu sigur pentru a-ți explora gândurile.",
    summary:
      "Într-un mediu confidențial și empatic, psihologii noștri te ajută să înțelegi și să gestionezi emoțiile.",
    description: `Psihoterapia este un drum pe care nu trebuie să îl parcurgi singur. Într-un spațiu confidențial și lipsit de judecată, psihologii noștri te însoțesc în explorarea gândurilor și emoțiilor, ajutându-te să găsești resurse și strategii potrivite pentru tine.

Fie că treci printr-o perioadă dificilă, fie că îți dorești o mai bună cunoaștere de sine, te sprijinim să îți recâștigi echilibrul și să construiești relații mai sănătoase cu tine și cu cei din jur.`,
    icon: "messages-square",
    order_index: 3,
    created_at: now,
  },
  {
    id: "neurologie",
    slug: "neurologie",
    name: "Neurologie",
    tagline: "De la migrene la afecțiuni neurodegenerative.",
    summary:
      "Diagnostic și tratament pentru o gamă largă de afecțiuni neurologice.",
    description: `Sistemul nervos influențează profund calitatea vieții noastre. În cadrul consultațiilor de neurologie, evaluăm și tratăm o gamă largă de afecțiuni, de la migrene și tulburări de somn până la afecțiuni neurodegenerative.

Punem accent pe un diagnostic corect și pe un plan de tratament adaptat fiecărui pacient, cu explicații clare la fiecare pas, astfel încât să înțelegi ce se întâmplă și ce urmează.`,
    icon: "activity",
    order_index: 4,
    created_at: now,
  },
  {
    id: "cardiologie",
    slug: "cardiologie",
    name: "Cardiologie",
    tagline: "Sănătatea inimii, cu grijă și prevenție.",
    summary:
      "Diagnostic, tratament și prevenție pentru afecțiunile inimii și ale sistemului cardiovascular.",
    description: `Inima lucrează pentru tine în fiecare clipă, iar sănătatea ei se reflectă în întregul organism. În cadrul consultațiilor de cardiologie evaluăm riscul cardiovascular, urmărim tensiunea și ritmul cardiac și construim un plan de îngrijire potrivit fiecărui pacient.

Punem accent pe prevenție și pe explicații clare, astfel încât să înțelegi ce înseamnă rezultatele investigațiilor și ce pași poți face pentru o inimă sănătoasă pe termen lung.`,
    icon: "heart-pulse",
    order_index: 5,
    created_at: now,
  },
  {
    id: "endocrinologie",
    slug: "endocrinologie",
    name: "Endocrinologie",
    tagline: "Echilibrul hormonal, cheia stării de bine.",
    summary:
      "Evaluarea și tratamentul afecțiunilor glandelor endocrine, de la tiroidă la metabolism.",
    description: `Sistemul endocrin coordonează, prin hormoni, procese esențiale din corp, de la metabolism și energie până la somn și dispoziție. În cadrul consultațiilor de endocrinologie evaluăm funcția glandelor și identificăm cauzele dezechilibrelor hormonale.

Fie că e vorba de tiroidă, de metabolism sau de alte afecțiuni endocrine, îți oferim un diagnostic atent și un plan de tratament personalizat, cu monitorizare pe parcurs.`,
    icon: "droplets",
    order_index: 6,
    created_at: now,
  },
];

type FallbackDoctor = Doctor & { specialtySlugs: string[] };

export const fallbackDoctors: FallbackDoctor[] = [
  {
    id: "matei-palimariciuc",
    slug: "matei-palimariciuc",
    name: "Matei Palimariciuc",
    title: "Medic specialist psihiatru",
    credentials: "Dr., asistent univ.",
    photo_url: null,
    short_bio:
      "Medic specialist psihiatru și asistent universitar, co-fondator Anova Medical Clinic.",
    full_bio:
      "Dr. Matei Palimariciuc este medic specialist psihiatru și asistent universitar la Catedra de Psihiatrie a UMF „Grigore T. Popa” din Iași. Co-fondator al Anova Medical Clinic, îmbină experiența clinică cu activitatea academică, punând accent pe o relație terapeutică bazată pe încredere și pe planuri de tratament adaptate fiecărui pacient.",
    order_index: 1,
    is_founder: true,
    created_at: now,
    specialtySlugs: ["psihiatrie"],
  },
  {
    id: "alexandru-ungureanu",
    slug: "alexandru-ungureanu",
    name: "Alexandru Ungureanu",
    title: "Psiholog clinician",
    credentials: "Psiholog clinician",
    photo_url: null,
    short_bio:
      "Psiholog clinician și co-fondator Anova, dedicat binelui și echilibrului pacienților.",
    full_bio:
      "Alexandru Ungureanu este psiholog clinician și co-fondator al Anova Medical Clinic. Crede într-o abordare empatică și personalizată a psihoterapiei, în care fiecare persoană este însoțită cu răbdare în procesul de cunoaștere de sine și de recâștigare a echilibrului interior.",
    order_index: 2,
    is_founder: true,
    created_at: now,
    specialtySlugs: ["psihologie"],
  },
  {
    id: "ana-caterina-cristofor",
    slug: "ana-caterina-cristofor",
    name: "Ana-Caterina Cristofor",
    title: "Medic primar psihiatru",
    credentials: "Dr., șef de lucrări",
    photo_url: null,
    short_bio:
      "Medic primar psihiatru și șef de lucrări, specializată în tulburări afective, anxietate și demențe.",
    full_bio:
      "Dr. Ana-Caterina Cristofor este medic primar psihiatru și șef de lucrări la UMF „Gr. T. Popa” din Iași, cu peste un deceniu de experiență în tratamentul tulburărilor afective, al anxietății și al demențelor. Abordează fiecare caz cu răbdare și empatie, într-o viziune holistică asupra sănătății mintale.",
    order_index: 3,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["psihiatrie"],
  },
  {
    id: "irina-dobrin",
    slug: "irina-dobrin",
    name: "Irina Dobrin",
    title: "Medic primar psihiatru",
    credentials: "Dr., șef de lucrări",
    photo_url: null,
    short_bio:
      "Medic primar psihiatru și șef de lucrări, care îmbină practica clinică, cercetarea și activitatea academică.",
    full_bio:
      "Dr. Irina Dobrin este medic primar psihiatru și șef de lucrări la Catedra de Psihiatrie a UMF „Gr. T. Popa” din Iași. Îmbină practica clinică, cercetarea și activitatea didactică, fiind autoare a numeroase articole și cărți de specialitate în domeniul sănătății mintale.",
    order_index: 4,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["psihiatrie"],
  },
  {
    id: "tudor-florea",
    slug: "tudor-florea",
    name: "Tudor Florea",
    title: "Medic primar psihiatru",
    credentials: "Dr., medic primar, asistent univ.",
    photo_url: null,
    short_bio:
      "Medic primar psihiatru și asistent universitar, cu formare în Germania și abordare integrativă.",
    full_bio:
      "Dr. Tudor Florea este medic primar psihiatru și asistent universitar, cu formare profesională în Germania sub coordonarea Prof. Pollmächer. Adept al unei abordări integrative și personalizate, oferă consultații în română, engleză, germană și franceză.",
    order_index: 5,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["psihiatrie"],
  },
  {
    id: "cartas-nicoleta",
    slug: "cartas-nicoleta",
    name: "Nicoleta Cartas",
    title: "Medic primar psihiatru",
    credentials: "Dr., medic primar",
    photo_url: null,
    short_bio:
      "Medic primar psihiatru, cu experiență solidă în tratamentul tulburărilor de sănătate mintală.",
    full_bio:
      "Dr. Nicoleta Cartas este medic primar psihiatru, cu o experiență clinică bogată în evaluarea și tratarea afecțiunilor psihiatrice. Îmbină rigoarea diagnosticului cu o abordare caldă, orientată spre echilibrul și recuperarea pacientului.",
    order_index: 6,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["psihiatrie"],
  },
  {
    id: "gilea-andra",
    slug: "gilea-andra",
    name: "Andra Gîlea",
    title: "Medic primar psihiatru",
    credentials: "Dr., medic primar",
    photo_url: null,
    short_bio:
      "Medic primar psihiatru, cu o abordare empatică și centrată pe nevoile pacientului.",
    full_bio:
      "Dr. Andra Gîlea este medic primar psihiatru, cu experiență vastă în îngrijirea sănătății mintale. Construiește împreună cu pacientul un parcurs terapeutic clar și adaptat, într-un cadru discret și lipsit de judecată.",
    order_index: 7,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["psihiatrie"],
  },
  {
    id: "andra-morasan",
    slug: "andra-morasan",
    name: "Andra Morășan",
    title: "Medic primar psihiatru",
    credentials: "Dr., medic primar",
    photo_url: null,
    short_bio:
      "Medic primar psihiatru dedicat unui parcurs terapeutic blând și personalizat.",
    full_bio:
      "Dr. Andra Morășan este medic primar psihiatru, dedicată unui parcurs terapeutic blând și personalizat, în care fiecare pacient se simte ascultat și sprijinit.",
    order_index: 8,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["psihiatrie"],
  },
  {
    id: "aionesei-catalin",
    slug: "aionesei-catalin",
    name: "Cătălin Aionesei",
    title: "Medic specialist psihiatru",
    credentials: "Dr.",
    photo_url: null,
    short_bio:
      "Medic specialist psihiatru, atent la povestea fiecărui pacient și la un plan de tratament potrivit.",
    full_bio:
      "Dr. Cătălin Aionesei este medic specialist psihiatru în echipa Anova Medical Clinic. Abordează fiecare pacient cu răbdare și fără judecată, punând accent pe o relație terapeutică bazată pe încredere și pe un plan de tratament adaptat nevoilor reale ale fiecăruia.",
    order_index: 9,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["psihiatrie"],
  },
  {
    id: "aura-cosofret",
    slug: "aura-cosofret",
    name: "Aura Coșofreț",
    title: "Medic specialist psihiatru",
    credentials: "Dr.",
    photo_url: null,
    short_bio: "Medic psihiatru atentă la complexitatea fiecărei povești.",
    full_bio:
      "Dr. Aura Coșofreț este medic specialist psihiatru, atentă la complexitatea și unicitatea fiecărei povești, pe care o abordează cu empatie și profesionalism, orientată spre recuperare și reintegrare socio-familială.",
    order_index: 10,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["psihiatrie"],
  },
  {
    id: "mihulca-ioana",
    slug: "mihulca-ioana",
    name: "Ioana Mihulcă",
    title: "Medic specialist psihiatru",
    credentials: "Dr.",
    photo_url: null,
    short_bio:
      "Medic specialist psihiatru, orientată spre o îngrijire blândă și personalizată.",
    full_bio:
      "Dr. Ioana Mihulcă este medic specialist psihiatru, atentă la nevoile emoționale ale fiecărui pacient. Abordează fiecare caz cu empatie și profesionalism, sprijinind pacienții să își recapete echilibrul.",
    order_index: 11,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["psihiatrie"],
  },
  {
    id: "silvia-tudosa",
    slug: "silvia-tudosa",
    name: "Silvia Tudosă",
    title: "Medic specialist psihiatru",
    credentials: "Dr.",
    photo_url: null,
    short_bio: "Medic psihiatru cu o abordare empatică și centrată pe pacient.",
    full_bio:
      "Dr. Silvia Tudosă este medic specialist psihiatru, cu o abordare empatică și bazată pe dovezi. Îmbină strategii terapeutice moderne cu un management medicamentos atent, pentru rezultate de durată.",
    order_index: 12,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["psihiatrie"],
  },
  {
    id: "elena-pcela",
    slug: "elena-pcela",
    name: "Elena Pcela",
    title: "Medic specialist psihiatru",
    credentials: "Dr.",
    photo_url: null,
    short_bio:
      "Medic psihiatru atentă la nevoile emoționale ale fiecărui pacient.",
    full_bio:
      "Dr. Elena Pcela este medic specialist psihiatru, cu formare la Chișinău și rezidențiat la Institutul „Socola” din Iași. Abordare integrativă și îngrijire personalizată; oferă consultații și în limba rusă.",
    order_index: 13,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["psihiatrie"],
  },
  {
    id: "vlasceanu-marceza",
    slug: "vlasceanu-marceza",
    name: "Marceza Vlăsceanu",
    title: "Medic specialist psihiatru",
    credentials: "Dr.",
    photo_url: null,
    short_bio:
      "Medic specialist psihiatru, dedicată unei relații terapeutice bazate pe încredere.",
    full_bio:
      "Dr. Marceza Vlăsceanu este medic specialist psihiatru în cadrul Anova Medical Clinic. Pune accent pe ascultare, pe un diagnostic atent și pe un plan de tratament croit pe ritmul fiecărui pacient.",
    order_index: 14,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["psihiatrie"],
  },
  {
    id: "georgean-rozinbaum",
    slug: "georgean-rozinbaum",
    name: "Georgean Rozinbaum",
    title: "Medic primar psihiatrie pediatrică",
    credentials: "Dr., medic primar",
    photo_url: null,
    short_bio:
      "Specialist în psihiatrie pediatrică, cu experiență vastă în îngrijirea copiilor și adolescenților.",
    full_bio:
      "Dr. Georgean Rozinbaum este medic în psihiatrie pediatrică și fondator al „Centrului Vocale” din Vaslui. Are o experiență vastă în îngrijirea copiilor și adolescenților, abordând cu blândețe și profesionalism provocările emoționale și de dezvoltare ale celor mici.",
    order_index: 15,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["psihiatrie-pediatrica"],
  },
  {
    id: "andreea-albu",
    slug: "andreea-albu",
    name: "Andreea Albu",
    title: "Medic specialist neurolog",
    credentials: "Dr.",
    photo_url: null,
    short_bio:
      "Medic neurolog, cu experiență în diagnosticul și tratamentul afecțiunilor neurologice.",
    full_bio:
      "Dr. Andreea Albu este medic specialist neurolog, cu experiență în diagnosticarea și tratarea unei game largi de afecțiuni neurologice, precum și în interpretarea investigațiilor imagistice.",
    order_index: 16,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["neurologie"],
  },
  {
    id: "thomas-gabriel-schreiner",
    slug: "thomas-gabriel-schreiner",
    name: "Thomas Gabriel Schreiner",
    title: "Medic specialist neurolog",
    credentials: "Dr., șef de lucrări, doctor în medicină",
    photo_url: null,
    short_bio:
      "Medic neurolog, doctor în medicină și cadru didactic la Catedra de Neurologie.",
    full_bio:
      "Dr. Thomas Gabriel Schreiner este medic specialist neurolog, doctor în medicină și cadru didactic la Catedra de Neurologie a UMF „Grigore T. Popa” din Iași. Domenii de interes: boli cerebrovasculare, patologii neurodegenerative și tulburări de mișcare.",
    order_index: 17,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["neurologie"],
  },
  {
    id: "gusa-lucia",
    slug: "gusa-lucia",
    name: "Lucia Gușă",
    title: "Medic specialist cardiolog",
    credentials: "Dr.",
    photo_url: null,
    short_bio:
      "Medic specialist cardiolog, atentă la sănătatea inimii și la prevenție.",
    full_bio:
      "Dr. Lucia Gușă este medic specialist cardiolog în echipa Anova Medical Clinic. Se dedică diagnosticului, tratamentului și prevenției afecțiunilor cardiovasculare, cu explicații clare și un plan adaptat fiecărui pacient.",
    order_index: 18,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["cardiologie"],
  },
  {
    id: "dorneanu-andra",
    slug: "dorneanu-andra",
    name: "Andra Dorneanu",
    title: "Medic specialist endocrinolog",
    credentials: "Dr.",
    photo_url: null,
    short_bio:
      "Medic specialist endocrinolog, dedicată echilibrului hormonal și stării generale de bine.",
    full_bio:
      "Dr. Andra Dorneanu este medic specialist endocrinolog în cadrul Anova Medical Clinic. Se ocupă de diagnosticul și tratamentul afecțiunilor glandelor endocrine, corelând echilibrul hormonal cu starea generală de sănătate, într-o abordare atentă și personalizată.",
    order_index: 19,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["endocrinologie"],
  },
  {
    id: "mihaela-ungureanu",
    slug: "mihaela-ungureanu",
    name: "Mihaela Ungureanu",
    title: "Psiholog clinician",
    credentials: "Psiholog clinician",
    photo_url: null,
    short_bio:
      "Psiholog clinician specializat în terapie cognitiv-comportamentală și dialectic-comportamentală.",
    full_bio:
      "Mihaela Ungureanu este psiholog clinician, specializată în terapie cognitiv-comportamentală și dialectic-comportamentală. Abordare holistică, axată pe gestionarea emoțiilor și dezvoltarea abilităților de adaptare.",
    order_index: 20,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["psihologie"],
  },
  {
    id: "ramona-costiug",
    slug: "ramona-costiug",
    name: "Ramona Coștiug",
    title: "Psiholog clinician",
    credentials: "Psiholog clinician",
    photo_url: null,
    short_bio:
      "Psiholog clinician cu formare în psihoterapie integrativă, centrată pe soluții.",
    full_bio:
      "Ramona Coștiug este psiholog clinician cu formare în psihoterapie integrativă. Are experiență în anxietate, depresie, burnout și recuperare cognitivă post-AVC, cu o abordare centrată pe soluții și pe nevoile fiecărei persoane.",
    order_index: 21,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["psihologie"],
  },
  {
    id: "dan-chirila",
    slug: "dan-chirila",
    name: "Dan Chirilă",
    title: "Psiholog clinician",
    credentials: "Psiholog clinician",
    photo_url: null,
    short_bio:
      "Psiholog clinician care creează un spațiu sigur pentru auto-descoperire și transformare.",
    full_bio:
      "Dan Chirilă este psiholog clinician care creează un spațiu sigur și confidențial pentru auto-descoperire. Folosește strategii creative, bazate pe dovezi, pentru provocările emoționale și comportamentale ale fiecărui pacient.",
    order_index: 22,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["psihologie"],
  },
  {
    id: "paula-stanciulescu",
    slug: "paula-stanciulescu",
    name: "Paula Stănciulescu",
    title: "Psiholog clinician",
    credentials: "Psiholog clinician",
    photo_url: null,
    short_bio:
      "Psiholog clinician și psihoterapeut, specializată în terapia copilului și adolescentului.",
    full_bio:
      "Paula Stănciulescu este psiholog clinician și psihoterapeut cu peste un deceniu de experiență, specializată în terapia copilului și adolescentului. Certificată în Terapia Comportamentală Aplicată (ABA) și în terapia limbajului.",
    order_index: 23,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["psihologie"],
  },
  {
    id: "banu-adelina",
    slug: "banu-adelina",
    name: "Adelina Banu",
    title: "Psiholog clinician",
    credentials: "Psiholog clinician",
    photo_url: null,
    short_bio:
      "Psiholog clinician, alături de pacienți în explorarea gândurilor și emoțiilor.",
    full_bio:
      "Adelina Banu este psiholog clinician în echipa Anova Medical Clinic. Într-un cadru confidențial și cald, însoțește pacienții în procesul de cunoaștere de sine, oferind sprijin în gestionarea emoțiilor și în dezvoltarea personală.",
    order_index: 24,
    is_founder: false,
    created_at: now,
    specialtySlugs: ["psihologie"],
  },
];
