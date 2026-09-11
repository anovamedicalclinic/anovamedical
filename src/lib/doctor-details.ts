/**
 * Timeline-urile paginilor individuale de medic (Educație, Experiență, În
 * prezent). Date furnizate de client, pe slug; medicii fără intrare aici nu au
 * timeline.
 *
 * Descrierea NU mai stă aici: e `full_bio` din baza de date, editabilă din
 * panou. Când stătea în cod, avea întâietate și editările din panou nu apăreau.
 */
export type TimelineItem = { period?: string; text: string };

export type DoctorDetails = {
  education?: TimelineItem[];
  experience?: TimelineItem[];
  current?: TimelineItem[];
};

export const doctorDetails: Record<string, DoctorDetails> = {
  "ana-caterina-cristofor": {
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
    education: [
      { period: "2012 – 2018", text: "Absolventă a Facultății de Medicină – Universitatea „Ovidius”, Constanța" },
      { period: "2019 – 2024", text: "Medic rezident Neurologie – Spitalul Clinic de Urgență „Prof. Dr. N. Oblu”, Iași" },
    ],
    current: [
      { period: "2024 – prezent", text: "Medic specialist Neurologie – ANOVA Medical Clinic, Iași" },
    ],
  },

  "thomas-gabriel-schreiner": {
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
  },

};
