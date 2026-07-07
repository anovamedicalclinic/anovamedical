/**
 * Detalii complete pentru paginile individuale de medic: descriere + timeline-uri
 * (Educație, Experiență, În prezent). Date furnizate de client, pe slug.
 * Medicii fără intrare aici folosesc `full_bio` ca descriere, fără timeline.
 */
export type TimelineItem = { period?: string; text: string };

export type DoctorDetails = {
  description: string[];
  education?: TimelineItem[];
  experience?: TimelineItem[];
  current?: TimelineItem[];
};

export const doctorDetails: Record<string, DoctorDetails> = {
  "ana-caterina-cristofor": {
    description: [
      "Dr. Ana-Caterina Cristofor este o profesionistă cu o viziune amplă și o pasiune dedicată pentru sănătatea mintală. Cu o carieră solidă, aduce la ANOVA Medical Clinic o combinație unică de cunoștințe, empatie și experiență în domeniul psihiatriei.",
      "Cu peste un deceniu de practică în psihiatrie, s-a specializat în tratamentul tulburărilor afective, anxietății și demențelor. Această expertiză vastă i-a permis să abordeze cu succes o gamă largă de afecțiuni mintale, atât în medii spitalicești, cât și în ambulatoriu.",
      "Ceea ce o distinge cu adevărat este abordarea sa comprehensivă asupra sănătății mintale. Crede în puterea colaborării dintre pacient, medic și psiholog, considerând că sprijinul din partea familiei, prietenilor și societății este esențial în procesul de vindecare.",
      "Cu abilități solide în terapia cognitiv-comportamentală și o viziune holistică, abordează fiecare caz cu răbdare, empatie și devotament, asigurând fiecărui pacient îngrijirea personalizată de care are nevoie.",
    ],
    education: [
      { period: "2006 – 2011", text: "Absolventă a Facultății de Medicină Generală – UMF „Gr. T. Popa”, Iași" },
      { period: "2012 – 2015", text: "Medic rezident Psihiatrie – Institutul de Psihiatrie „Socola”, Iași" },
      { period: "2012 – 2016", text: "Curs de Formare Profesională în Terapie Cognitiv-Comportamentală" },
    ],
    experience: [
      { period: "2016 – 2020", text: "Medic specialist Psihiatrie – Institutul de Psihiatrie „Socola”, Iași" },
      { period: "2012 – 2016", text: "Doctorand în Științe medicale – Catedra de Psihiatrie, UMF „Gr. T. Popa”, Iași" },
      { period: "2017", text: "Doctor în Științe medicale – Catedra de Psihiatrie, UMF „Gr. T. Popa”, Iași" },
    ],
    current: [
      { period: "2020 – prezent", text: "Șef de lucrări – Catedra de Psihiatrie, UMF „Gr. T. Popa”, Iași" },
      { period: "2021 – prezent", text: "Medic primar Psihiatrie – Institutul de Psihiatrie „Socola”, Iași" },
      { period: "2023 – prezent", text: "Medic primar Psihiatrie – ANOVA Medical Clinic, Iași" },
    ],
  },

  "irina-dobrin": {
    description: [
      "Dr. Irina Dobrin este un medic psihiatru cu o carieră impresionantă în domeniul sănătății mintale, aducând o combinație unică de cunoștințe academice, experiență clinică și cercetare.",
      "Educația sa a început la UMF „Gr. T. Popa” din Iași, unde a absolvit Facultatea de Medicină Generală în 2002. De atunci, și-a dedicat viața înțelegerii profunde a tulburărilor psihice și explorării modalităților de a ajuta pacienții să-și recâștige echilibrul mintal.",
      "Cu un portofoliu impresionant de articole publicate în reviste indexate BDI și ISI, precum și cărți în domeniul sănătății mintale, a devenit o voce respectată în comunitatea științifică. În calitate de Șef de lucrări, contribuie continuu la formarea viitoarelor generații de medici.",
    ],
    education: [
      { period: "1996 – 2002", text: "Absolventă a Facultății de Medicină Generală – UMF „Gr. T. Popa”, Iași" },
      { period: "2004 – 2005", text: "Master în Management Sanitar – Facultatea de Bioinginerie Medicală, UMF „Gr. T. Popa”, Iași" },
      { period: "2006 – 2009", text: "Absolventă a Facultății de Psihologie și Asistență Socială – Universitatea „Petre Andrei”, Iași" },
    ],
    experience: [
      { period: "2010 – 2018", text: "Medic specialist Psihiatrie – Institutul de Psihiatrie „Socola”, Iași" },
      { period: "2011 – 2020", text: "Asistent universitar – Catedra de Psihiatrie, UMF „Gr. T. Popa”, Iași" },
      { period: "2011", text: "Doctor în Științe medicale – Catedra de Psihiatrie, UMF „Gr. T. Popa”, Iași" },
    ],
    current: [
      { period: "2018 – prezent", text: "Medic primar Psihiatrie – Institutul de Psihiatrie „Socola”, Iași" },
      { period: "2020 – prezent", text: "Șef de lucrări – Catedra de Psihiatrie, UMF „Gr. T. Popa”, Iași" },
      { period: "2023 – prezent", text: "Medic primar Psihiatrie – ANOVA Medical Clinic, Iași" },
    ],
  },

  "tudor-florea": {
    description: [
      "Dr. Tudor Florea este medic primar psihiatru și asistent universitar în cadrul Catedrei de Psihiatrie a UMF „Grigore T. Popa” din Iași.",
      "Prin formarea profesională în Germania, aprofundând patologii psihiatrice sub coordonarea Prof. Pollmächer, este adeptul unei abordări integrative și personalizate a pacientului psihiatric, în conformitate cu standardele și practica vestică. Oferă consultații în limbile română, engleză, germană și franceză.",
      "Prin cariera universitară fundamentată prin studiile de doctorat, completează practica medicală cu elemente științifice de actualitate, cu multiple participări la congrese și publicații în jurnale medicale internaționale.",
    ],
    education: [
      { period: "2006 – 2012", text: "Absolvent al Facultății de Medicină Generală – UMF „Gr. T. Popa”, Iași" },
    ],
    experience: [
      { period: "2013 – 2014", text: "Medic rezident Psihiatrie – Institutul de Psihiatrie „Socola”, Iași" },
      { period: "2014 – 2017", text: "Medic rezident Psihiatrie și Psihoterapie (adicții, psihiatrie acută, psihoze, depresii, psihosomatică) – coordonator Prof. Dr. med. Thomas Pollmächer, Germania" },
      { period: "2018 – 2022", text: "Medic specialist Psihiatrie – Institutul de Psihiatrie „Socola”, Iași" },
    ],
    current: [
      { period: "2018 – prezent", text: "Doctorand în Științe medicale – Catedra de Psihiatrie, UMF „Gr. T. Popa”, Iași" },
      { period: "2019 – prezent", text: "Asistent universitar – Catedra de Psihiatrie, UMF „Gr. T. Popa”, Iași" },
      { period: "2023 – prezent", text: "Medic primar Psihiatrie – Institutul de Psihiatrie „Socola”, Iași" },
      { period: "2023 – prezent", text: "Medic primar Psihiatrie – ANOVA Medical Clinic, Iași" },
    ],
  },

  "matei-palimariciuc": {
    description: [
      "Dr. Matei Palimariciuc este medic specialist psihiatru, asistent universitar în Catedra de Psihiatrie a UMF „Grigore T. Popa” din Iași și co-fondator al ANOVA Medical Clinic.",
      "Prin cariera universitară fundamentată prin studiile de doctorat, este un susținător al conceptului de Medicină Personalizată, ale cărui principii îi ghidează practica terapeutică. Experiența științifică, cu multiple publicații internaționale și studii doctorale privind Stimularea Electrică Transcraniană, se transpune într-o înțelegere plurivalentă a patologiilor psihiatrice.",
      "În calitate de fondator, a creat un spațiu în care pacientul este poziționat în primul plan în construirea planului terapeutic, într-un colectiv care înțelege că fiecare client este unic, atât prin nevoi, cât și prin abordare terapeutică.",
    ],
    education: [
      { period: "2011 – 2017", text: "Absolvent al Facultății de Medicină Generală – UMF „Gr. T. Popa”, Iași" },
    ],
    experience: [
      { period: "2018 – 2022", text: "Medic rezident Psihiatrie – Institutul de Psihiatrie „Socola”, Iași" },
    ],
    current: [
      { period: "2018 – prezent", text: "Doctorand în Științe medicale – Catedra de Psihiatrie, UMF „Gr. T. Popa”, Iași" },
      { period: "2019 – prezent", text: "Asistent universitar – Catedra de Psihiatrie, UMF „Gr. T. Popa”, Iași" },
      { period: "2023 – prezent", text: "Medic specialist Psihiatrie – Institutul de Psihiatrie „Socola”, Iași" },
      { period: "2023 – prezent", text: "Medic specialist Psihiatrie – ANOVA Medical Clinic, Iași" },
    ],
  },

  "silvia-tudosa": {
    description: [
      "Cu o pasiune profundă pentru înțelegerea și îmbunătățirea sănătății mintale, Dr. Silvia Tudosă aduce la Anova Medical Clinic o abordare empatică și bazată pe dovezi în tratamentul tulburărilor emoționale și mentale.",
      "Absolventă a Facultății de Medicină din Iași, și-a completat formarea de specialitate în psihiatrie la Institutul de Psihiatrie „Socola”, unde a dobândit o experiență vastă în diagnosticarea și tratarea unui spectru larg de afecțiuni psihiatrice. Și-a extins competențele printr-un masterat în Management.",
      "Crede într-o abordare holistică a sănătății mintale, integrând strategii terapeutice inovatoare cu managementul medicamentos atent ajustat, pentru a asigura cele mai bune rezultate pentru pacienți.",
    ],
    education: [
      { period: "2010 – 2016", text: "Absolventă a Facultății de Medicină Generală – UMF „Gr. T. Popa”, Iași" },
      { period: "2018 – 2023", text: "Rezidențiat Psihiatrie" },
      { period: "2018 – 2020", text: "Master – Managementul serviciilor de sănătate în domeniul medico-farmaceutic" },
    ],
    experience: [
      { period: "2018 – 2023", text: "Medic rezident Psihiatrie – Institutul de Psihiatrie „Socola”, Iași" },
    ],
    current: [
      { period: "2024 – prezent", text: "Medic Specialist Psihiatrie – ANOVA Medical Clinic, Iași" },
    ],
  },

  "elena-pcela": {
    description: [
      "Cu o prezență plină de entuziasm și dedicare, Dr. Elena Pcela, medic specialist psihiatru, își împărtășește experiența vastă și cunoștințele adunate în timpul formării academice și profesionale.",
      "Diplomată a Facultății de Medicină „Nicolae Testemițanu” din Chișinău, și-a continuat parcursul de formare la Institutul de Psihiatrie „Socola” din Iași, ca parte a programului de rezidențiat. Vorbind fluent limba rusă, poate comunica eficient și cu pacienții vorbitori de această limbă.",
      "Cu un accent deosebit pe abordarea integrativă, își propune să aducă soluții holistice pentru pacienții săi, dedicându-se oferirii de îngrijiri personalizate, axate pe nevoile individuale ale fiecăruia.",
    ],
    education: [
      { period: "2012 – 2018", text: "Absolventă a Facultății de Medicină „Nicolae Testemițanu”, Chișinău, Moldova" },
    ],
    experience: [
      { period: "2019 – 2023", text: "Medic rezident Psihiatrie – Institutul de Psihiatrie „Socola”, Iași" },
    ],
    current: [
      { period: "2024 – prezent", text: "Medic Specialist Psihiatrie – ANOVA Medical Clinic, Iași" },
    ],
  },

  "aura-cosofret": {
    description: [
      "Dr. Aura Coșofreț, medic specialist psihiatru, se distinge prin dedicarea sa neobosită în oferirea de planuri personalizate fiecărui pacient, având drept scop recuperarea și reintegrarea socio-familială și profesională.",
      "Activitatea sa la Institutul de Psihiatrie „Socola”, precum și consultațiile oferite în cadrul Clinicii Anova, evidențiază angajamentul său pentru o abordare integrativă a sănătății mintale. Cu o viziune empatică și o colaborare strânsă între medic, pacient, psiholog și familie, își propune să îmbunătățească calitatea vieții pacienților.",
    ],
    education: [
      { period: "2010 – 2016", text: "Absolventă a Facultății de Medicină Generală – UMF „Gr. T. Popa”, Iași" },
    ],
    experience: [
      { period: "2017 – 2021", text: "Medic rezident Psihiatrie – Institutul de Psihiatrie „Socola”, Iași" },
    ],
    current: [
      { period: "2022 – prezent", text: "Medic specialist Psihiatrie – Institutul de Psihiatrie „Socola”, Iași" },
      { period: "2024 – prezent", text: "Medic Specialist Psihiatrie – ANOVA Medical Clinic, Iași" },
    ],
  },

  "andreea-albu": {
    description: [
      "În cadrul ANOVA Medical Clinic, dr. Andreea Albu este medic specialist în neurologie, implicată în înțelegerea profundă a sistemului nervos și a afecțiunilor neurologice, în interpretarea rezultatelor imagistice și în stabilirea unui diagnostic.",
      "Compasiunea și capacitatea sa de a oferi sprijin emoțional susțin o comunicare clară și eficientă în explicarea diagnosticului, tratamentului și prognosticului. Își manifestă dorința de a găsi cele mai bune soluții și de a adapta planul terapeutic în funcție de evoluția pacientului.",
      "„Sunt încântată să am în jurul meu colegi profesioniști precum cei din cadrul ANOVA Medical Clinic, unde am găsit respect, colaborare și interesul comun de a îmbunătăți calitatea vieții pacienților.”",
    ],
    education: [
      { period: "2012 – 2018", text: "Absolventă a Facultății de Medicină – Universitatea „Ovidius”, Constanța" },
      { period: "2019 – 2024", text: "Medic rezident Neurologie – Spitalul Clinic de Urgență „Prof. Dr. N. Oblu”, Iași" },
    ],
    current: [
      { period: "2024 – prezent", text: "Medic specialist Neurologie – ANOVA Medical Clinic, Iași" },
    ],
  },

  "thomas-gabriel-schreiner": {
    description: [
      "Dr. Thomas Gabriel Schreiner este medic specialist neurolog, doctor în medicină și asistent universitar în cadrul Catedrei de Neurologie a UMF „Gr. T. Popa” din Iași.",
      "Prin experiența practică acumulată în clinici din Iași, București și străinătate (Germania), dublată de interesul pentru cercetare și activitate didactică, dorește să ofere pacienților cu patologii neurologice o îngrijire profesională și empatică. Domeniile în care excelează sunt bolile cerebrovasculare, patologiile neurodegenerative și tulburările de mișcare.",
      "„Consider esențială colaborarea alături de colegii psihiatri și psihologi în oferirea unei îngrijiri cât mai complete a pacientului cu patologie neurologică.”",
    ],
    education: [
      { period: "2012 – 2018", text: "Absolvent al Facultății de Medicină Generală – UMF „Gr. T. Popa”, Iași (licență și master)" },
      { period: "2019 – 2023", text: "Doctorand în Științe medicale – Catedra de Neurologie, UMF „Carol Davila”, București" },
      { period: "2019 – 2023", text: "Medic rezident Neurologie – Spitalul Clinic de Recuperare, Iași" },
    ],
    current: [
      { period: "2020 – prezent", text: "Asistent universitar – Catedra de Neurologie, UMF „Gr. T. Popa”, Iași" },
      { period: "2024 – prezent", text: "Medic specialist Neurologie – ANOVA Medical Clinic, Iași" },
    ],
  },

  "georgean-rozinbaum": {
    description: [
      "Dr. Georgean Rozinbaum, medic specialist în psihiatrie pediatrică și fondator al „Centrului Vocale” din Vaslui, aduce o expertiză vastă în îngrijirea copiilor și adolescenților.",
      "Cu o pasiune deosebită pentru o dezvoltare sănătoasă, oferă tratamente personalizate și de înaltă calitate pentru afecțiunile din sfera psihiatriei pediatrice. Este un partener de încredere pentru părinți și tutori, asigurându-se că cei mici primesc îngrijirea și sprijinul adecvat într-un mediu sigur și empatic.",
    ],
    education: [
      { text: "Absolvent al Facultății de Medicină Generală – UMF „Gr. T. Popa”, Iași" },
    ],
    experience: [
      { text: "Medic rezident Psihiatrie Pediatrică – Spitalul Clinic de Urgență pentru Copii „Louis Țurcanu”, Timișoara" },
      { text: "Medic specialist Psihiatrie Pediatrică – Spitalul Municipal de Urgență „Elena Beldiman”, Bârlad" },
    ],
    current: [
      { text: "Medic specialist Psihiatrie Pediatrică – Centrul de Sănătate Mintală Copii, Spitalul Județean de Urgență, Vaslui" },
      { text: "„Centrul Vocale”, Vaslui – terapie pentru copii cu tulburări de dezvoltare, din spectrul autist și emoționale" },
      { text: "Medic specialist Psihiatrie Pediatrică – ANOVA Medical Clinic, Iași" },
    ],
  },

  "alexandru-ungureanu": {
    description: [
      "Alexandru Ungureanu, psiholog clinician și co-fondator al ANOVA Medical Clinic, este o prezență autentică în domeniul sănătății mintale. Cu o pasiune incontestabilă pentru binele pacienților săi, a jucat un rol important în dezvoltarea și consolidarea clinicii.",
      "Cu o vastă experiență în practica clinică, se remarcă prin abordarea sa empatică și personalizată. Acordă o atenție deosebită înțelegerii profunde a nevoilor individuale, oferind terapii adaptate fiecărui caz.",
      "Adept dedicat al educației continue, își menține cunoștințele actualizate cu cele mai recente cercetări și abordări terapeutice, participând la conferințe de specialitate.",
    ],
    education: [
      { period: "2017 – 2020", text: "Absolvent al Facultății de Psihologie, Științele Educației și Asistență Socială – Universitatea „Petre Andrei”, Iași" },
      { period: "2020 – 2022", text: "Master: Evaluare Clinică, Consiliere și Psihoterapie de Cuplu și Familie – Universitatea „Alexandru Ioan Cuza”, Iași" },
    ],
    current: [
      { period: "2020 – prezent", text: "Cursuri de formare în Psihoterapie Integrativă – Asociația de Psihoterapie Integrativă și Psihologie Clinică" },
      { period: "2023 – prezent", text: "Psiholog clinician – ANOVA Medical Clinic, Iași" },
    ],
  },

  "mihaela-ungureanu": {
    description: [
      "Mihaela Ungureanu aduce o perspectivă deosebită și competențe solide în domeniul psihologiei clinice, fiind specializată în terapie cognitiv-comportamentală și dialectic-comportamentală.",
      "Cu devotamentul său pentru sănătatea mintală și dezvoltarea personală a pacienților, oferă o abordare holistică în îngrijirea lor, promovând auto-reflecția, gestionarea emoțiilor și dezvoltarea abilităților de adaptare.",
    ],
    education: [
      { period: "2006 – 2009", text: "Absolventă a Facultății de Psihologie și Asistență Socială – Universitatea „Petre Andrei”, Iași" },
      { period: "2009 – 2011", text: "Master – Psihologie Clinică, Universitatea „Petre Andrei”, Iași" },
      { period: "2012 – 2017", text: "Curs de Formare Profesională în Terapie Cognitiv-Comportamentală" },
      { period: "2016 – 2017", text: "Curs de Evaluare și Consiliere a pacienților aflați în ultimul stadiu al vieții – Institutul de Psihiatrie „Socola”, Iași" },
    ],
    experience: [
      { period: "2009 – 2012", text: "Psiholog clinician – Fundația Catharsis, Iași" },
      { period: "2020 – 2023", text: "Psiholog clinician – colaborare cu Resurse Umane Medical Clinic, Iași" },
    ],
    current: [
      { period: "2012 – prezent", text: "Psiholog clinician – Institutul de Psihiatrie „Socola”, Iași" },
      { period: "2020 – prezent", text: "Psiholog clinician – ANOVA Medical Clinic, Iași" },
    ],
  },

  "ramona-costiug": {
    description: [
      "Ramona Coștiug, psiholog clinician în cadrul Anova Medical Clinic, se distinge printr-o combinație de empatie, profesionalism și o pasiune profundă pentru domeniul sănătății mintale.",
      "Având o educație solidă și o formare extinsă în Psihoterapie Integrativă, abordează fiecare caz într-o manieră holistică. Experiența sa cuprinde anxietatea, depresia, burnout-ul și gestionarea emoțiilor, oferind și sprijin în recuperarea cognitivă post-AVC.",
      "Abordarea sa centrată pe soluții este adaptată nevoilor unice ale fiecărei persoane, iar capacitatea de a construi relații de încredere reprezintă un punct de referință în activitatea sa clinică.",
    ],
    education: [
      { period: "2017 – 2020", text: "Absolventă a Facultății de Psihologie, Științele Educației și Asistență Socială – Universitatea „Petre Andrei”, Iași" },
      { period: "2020 – 2022", text: "Master: Evaluare Clinică, Consiliere și Psihoterapie de Cuplu și Familie – Universitatea „Alexandru Ioan Cuza”, Iași" },
    ],
    current: [
      { period: "2020 – prezent", text: "Cursuri de formare în Psihoterapie Integrativă – Asociația de Psihoterapie Integrativă și Psihologie Clinică" },
      { period: "2024 – prezent", text: "Psiholog clinician – ANOVA Medical Clinic, Iași" },
    ],
  },

  "dan-chirila": {
    description: [
      "Dan Chirilă este un psiholog clinician ce creează un spațiu sigur și confidențial pentru clienții săi, facilitând procesul de auto-descoperire și transformare personală.",
      "Adoptă strategii creative și bazate pe evidențe științifice pentru a aborda diferitele provocări emoționale și comportamentale, fiind dedicat înțelegerii profunde a nevoilor individuale și oferind strategii eficiente pentru a le depăși.",
    ],
    education: [
      { period: "2017 – 2020", text: "Absolvent al Facultății de Psihologie și Științe ale Educației – Universitatea „Alexandru Ioan Cuza”, Iași" },
      { period: "2021 – 2023", text: "Master: Psihologie Clinică și Psihoterapie – Universitatea „Alexandru Ioan Cuza”, Iași" },
    ],
    current: [
      { period: "2023 – prezent", text: "Formare de bază – Psihoterapie sistemică de familie și cuplu – Asociația Human Center" },
      { period: "2023 – prezent", text: "Psiholog clinician – ANOVA Medical Clinic, Iași" },
    ],
  },

  "paula-stanciulescu": {
    description: [
      "Paula Stănciulescu, psiholog clinician și psihoterapeut cu peste un deceniu de experiență, aduce expertiză profundă în psihologie clinică și psihoterapie, cu specializare în terapia copilului și adolescentului.",
      "Prin parteneriate cu organizații non-profit, proiecte de consiliere și orientare profesională, dar și experiență independentă, își dedică pasiunea pentru asistența psiho-emoțională a tinerilor.",
      "Certificată ca Registered Behavior Technician în Terapia Comportamentală Aplicată și specializată în terapia limbajului, completează abordarea sa cu psihoterapia Ericksoniană, oferind soluții adaptabile pentru o gamă variată de tulburări.",
    ],
  },

};
