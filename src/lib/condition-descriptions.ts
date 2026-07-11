/**
 * Descrieri scurte, prietenoase pentru afecțiunile afișate ca „pilule” pe
 * paginile de specialitate. Cheia este exact textul afecțiunii din
 * `specialty-content.ts`. Afecțiunile care apar la mai multe specialități
 * (ex. „Depresie”, „Anxietate”) folosesc aceeași descriere.
 *
 * NOTĂ: conținut informativ, cu rol de orientare — nu înlocuiește un consult.
 * A se revizui de către echipa medicală înainte de publicare.
 */
export const conditionDescriptions: Record<string, string> = {
  // Psihiatrie
  Anxietate:
    "Stare persistentă de neliniște, teamă sau îngrijorare excesivă, adesea însoțită de tensiune, palpitații sau dificultăți de concentrare. Cu evaluare și tratament potrivit, simptomele pot fi ținute sub control.",
  Depresie:
    "Mai mult decât o tristețe trecătoare: o stare de apatie, lipsă de energie și pierdere a interesului care durează săptămâni întregi. Răspunde bine la tratament și psihoterapie.",
  Demență:
    "Declin progresiv al memoriei, gândirii și capacității de a face față activităților zilnice. Diagnosticul timpuriu ajută la încetinirea evoluției și la planificarea îngrijirii.",
  "Tulburări de somn":
    "Insomnie, somn neodihnitor sau ritm somn-veghe perturbat, care afectează energia și dispoziția. Identificăm cauza și refacem, pas cu pas, un somn sănătos.",
  "Tulburare bipolară":
    "Alternanță între episoade de energie și euforie (manie) și episoade de depresie. Tratamentul stabilizează dispoziția și previne recăderile.",
  "Tulburări de alimentație":
    "Relație dezechilibrată cu mâncarea și cu propriul corp (anorexie, bulimie, mâncat compulsiv). Abordarea combină sprijin medical și psihologic.",
  Dependențe:
    "Nevoia greu de controlat de a consuma o substanță sau de a repeta un comportament, în ciuda consecințelor. Oferim sprijin fără judecată pentru recuperare.",
  "Stres posttraumatic (PTSD)":
    "Reacții intense care apar după un eveniment traumatic: retrăiri, coșmaruri, hipervigilență și evitare. Terapia ajută la procesarea traumei și revenirea la echilibru.",
  "Tulburări de personalitate":
    "Tipare rigide de gândire, emoție și relaționare care creează dificultăți în viața de zi cu zi. Psihoterapia sprijină relații mai sănătoase și stabilitate emoțională.",
  Schizofrenie:
    "Afecțiune care poate modifica percepția realității, gândirea și emoțiile. Cu tratament de durată, mulți pacienți își recapătă o viață funcțională.",

  // Psihiatrie pediatrică
  ADHD:
    "Dificultăți de atenție, impulsivitate și/sau hiperactivitate care afectează școala și relațiile. Cu sprijin potrivit, copilul își poate valorifica potențialul.",
  "Tulburări de anxietate":
    "Frici și îngrijorări intense, disproporționate față de situație, care pot include neliniște, evitare sau simptome fizice. Răspund bine la terapie adaptată vârstei.",
  "Tulburare de spectru autist":
    "Un mod diferit de a percepe lumea, de a comunica și de a interacționa. Intervenția timpurie sprijină dezvoltarea abilităților și autonomia.",
  Ticuri:
    "Mișcări sau sunete involuntare, repetate, care apar frecvent în copilărie. Multe sunt trecătoare; evaluăm când este nevoie de sprijin.",
  "Tulburări de comportament":
    "Comportamente opoziționale, agresive sau greu de gestionat, dincolo de limitele vârstei. Lucrăm cu copilul și familia pentru schimbări durabile.",
  "Anxietate de separare":
    "Teamă intensă de a fi departe de părinți sau de casă, cu suferință la despărțire. Frecventă la copii și tratabilă cu răbdare și sprijin.",
  "Dificultăți de limbaj":
    "Întârzieri sau dificultăți în înțelegerea ori exprimarea limbajului. Evaluarea timpurie deschide calea către o intervenție eficientă.",
  "Tulburări de dispoziție":
    "Fluctuații ale stării emoționale — tristețe, iritabilitate sau instabilitate — care afectează viața de zi cu zi a adolescentului.",
  "Consum de substanțe":
    "Experimentarea sau consumul de alcool, tutun ori droguri la vârsta adolescenței. Oferim evaluare și sprijin fără judecată.",
  "Anxietate socială":
    "Teamă intensă de a fi judecat sau evaluat în situații sociale, care poate duce la evitare. Terapia ajută la recâștigarea încrederii.",

  // Psihologie
  Stres:
    "Tensiune fizică și emoțională apărută în fața presiunilor zilnice. Când devine copleșitor, învățăm împreună tehnici de gestionare.",
  Traume:
    "Urme lăsate de experiențe dureroase sau copleșitoare, care pot afecta prezentul. Procesarea lor în siguranță aduce ușurare și vindecare.",
  "Probleme de relație":
    "Conflicte, distanțare sau dificultăți de comunicare în cuplu ori familie. Consilierea ajută la reconstruirea legăturii și a înțelegerii.",
  "Gestionarea furiei":
    "Dificultăți în a controla furia, cu efecte asupra relațiilor și a stării de bine. Deprinderi practice ajută la reacții mai calme.",
  "Pierdere și doliu":
    "Procesul firesc, dar dureros, de a trece prin pierderea cuiva drag. Oferim sprijin pentru a-ți găsi ritmul vindecării.",

  // Neurologie
  Migrenă:
    "Dureri de cap intense, adesea pulsatile, uneori însoțite de greață și sensibilitate la lumină. Tratamentul reduce frecvența și intensitatea crizelor.",
  Epilepsie:
    "Afecțiune caracterizată prin crize recurente, cauzate de activitate electrică anormală în creier. Cu tratament, majoritatea crizelor pot fi controlate.",
  "Accident vascular cerebral":
    "Întreruperea bruscă a fluxului de sânge către creier — o urgență medicală. Recunoașterea rapidă și recuperarea sunt esențiale.",
  "Boala Parkinson":
    "Afecțiune neurodegenerativă care afectează mișcarea (tremor, rigiditate, lentoare). Tratamentul ameliorează simptomele și calitatea vieții.",
  "Scleroză multiplă":
    "Boală în care sistemul imunitar afectează învelișul nervilor, cu simptome variate. Tratamentul modern încetinește evoluția.",
  "Miastenia gravis":
    "Slăbiciune musculară care se accentuează la efort, prin afectarea comunicării dintre nerv și mușchi. Simptomele pot fi ținute sub control.",
  "Neuropatie periferică":
    "Afectarea nervilor periferici, resimțită ca amorțeli, furnicături sau durere, mai ales la mâini și picioare. Identificăm cauza și ameliorăm simptomele.",
  "Boala Charcot-Marie-Tooth":
    "Afecțiune neurologică ereditară care afectează nervii periferici, cu slăbiciune musculară treptată. Oferim urmărire și sprijin adaptat.",
  "Tulburări de mișcare":
    "Mișcări involuntare sau dificultăți de coordonare (tremor, ticuri, distonie). Evaluarea precizează cauza și opțiunile de tratament.",

  // Cardiologie
  "Hipertensiune arterială":
    "Tensiune arterială crescută constant, care solicită inima și vasele de sânge. Controlată la timp, previne complicații serioase.",
  Aritmii:
    "Bătăi neregulate ale inimii — prea rapide, prea lente sau haotice. Evaluarea stabilește riscul și tratamentul potrivit.",
  "Boală coronariană":
    "Îngustarea arterelor care hrănesc inima, cu risc de angină sau infarct. Prevenția și tratamentul protejează inima.",
  "Insuficiență cardiacă":
    "Inima nu mai pompează suficient sânge pentru nevoile corpului, cu oboseală și lipsă de aer. Tratamentul ameliorează simptomele și evoluția.",
  Palpitații:
    "Senzația că inima bate puternic, rapid sau neregulat. Evaluăm dacă sunt benigne sau necesită investigații suplimentare.",
  "Colesterol crescut":
    "Nivel ridicat de colesterol care favorizează depunerile pe artere. Se gestionează prin stil de viață și, la nevoie, tratament.",
  "Risc cardiovascular":
    "Evaluarea globală a șanselor de a dezvolta boli de inimă, pentru a acționa preventiv, din timp.",
  "Afecțiuni ale valvelor":
    "Valvele inimii nu se deschid sau nu se închid corect, afectând circulația. Monitorizarea ghidează momentul potrivit al tratamentului.",
  "Boli ale aortei":
    "Afecțiuni ale celei mai mari artere a corpului (dilatare, anevrism). Supravegherea atentă previne complicațiile.",

  // Endocrinologie
  "Afecțiuni ale tiroidei":
    "Tiroida produce prea puțini sau prea mulți hormoni (hipo- sau hipertiroidie), afectând energia, greutatea și dispoziția. Se echilibrează cu tratament.",
  "Diabet zaharat":
    "Nivel crescut al glicemiei, prin lipsa sau ineficiența insulinei. Controlul atent previne complicațiile pe termen lung.",
  "Dezechilibre hormonale":
    "Perturbări ale hormonilor care pot afecta somnul, greutatea, energia sau dispoziția. Identificăm cauza și refacem echilibrul.",
  "Obezitate și sindrom metabolic":
    "Exces de greutate asociat cu tensiune, glicemie și colesterol crescute, care cresc riscul cardiovascular. Abordare personalizată, pas cu pas.",
  Osteoporoză:
    "Slăbirea oaselor, care devin fragile și predispuse la fracturi. Diagnosticul timpuriu și tratamentul le păstrează rezistente.",
  "Afecțiuni ale glandelor suprarenale":
    "Dereglări ale hormonilor produși de glandele suprarenale, cu efecte asupra tensiunii, energiei și metabolismului.",
  "Tulburări de creștere":
    "Ritm de creștere prea lent sau prea rapid la copii, legat de dezechilibre hormonale. Evaluarea din timp face diferența.",
  "Afecțiuni ale hipofizei":
    "Glanda hipofiză coordonează multe alte glande; dereglările ei pot afecta întregul echilibru hormonal.",
  "Sindromul ovarelor polichistice":
    "Dezechilibru hormonal frecvent la femei, cu cicluri neregulate și efecte metabolice. Se gestionează eficient printr-un plan personalizat.",
};
