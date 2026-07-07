export type Testimonial = {
  name: string;
  rating: number;
  text: string;
};

/** Sumar Google pentru badge-ul de încredere. */
export const googleReviews = {
  rating: 4.8,
  countLabel: "+70 de recenzii",
  profileUrl: "https://share.google/EEvIIfLGm9dJ44vRb",
};

/** Recenzii verificate Google (preluate din profilul clinicii). */
export const testimonials: Testimonial[] = [
  {
    name: "Ioana Pavel",
    rating: 5,
    text: "Cea mai bună clinică, cu cei mai bine pregătiți medici! Recomand cu drag! 🤗😊",
  },
  {
    name: "Georgiana Ignat",
    rating: 5,
    text: "Sunt foarte mulțumită de serviciile oferite de Clinica Anova. Toată lumea a fost drăguță cu mine, m-a ascultat și mi-a oferit suport când am avut cel mai mult nevoie. Voi rămâne datoare toată viața pentru cât m-au ajutat, de la fetele de la recepție până la domnul psiholog Alexandru Ungureanu și doamna psihiatru Andra Morășan. Recomand cu toată inima!",
  },
  {
    name: "Oana C.",
    rating: 5,
    text: "O recomand cu încredere ca medic diabetolog pe dr. Ungureanu Adelina, este o persoană dedicată și foarte atentă cu pacienții. Am apreciat răbdarea și modul clar în care explică.",
  },
  {
    name: "Laura Ioana Bucovanu",
    rating: 5,
    text: "Recomand cu mare drag! Dna dr. Marceza este o profesionistă în domeniu! 🤗",
  },
  {
    name: "Marcel Vasilache",
    rating: 5,
    text: "Recomand cu toată încrederea Clinica Anova. Mulțumesc din suflet doamnei dr. Cristofor, datorită devotamentului și profesionalismului său mama încă ne mai recunoaște și încă mai putem vorbi cu ea. De asemenea, recomand și îi mulțumesc doamnei dr. Mihaela Ungureanu.",
  },
  {
    name: "Pina Movileanu",
    rating: 5,
    text: "Personal amabil, receptiv la nevoile pacienților, atmosferă plăcută. Doamna doctor Irina Dobrin este un medic profesionist, empatic, răspunde cu răbdare tuturor întrebărilor.",
  },
  {
    name: "Pascal Maricica",
    rating: 5,
    text: "Cele mai drăguțe doamne doctor. Foarte empatice, sociabile și mereu disponibile pentru pacient. Recomand cu toată încrederea.",
  },
  {
    name: "Georgiana Ungureanu",
    rating: 5,
    text: "Cei mai buni medici! Foarte empatici, săritori și mereu atenți cu pacientul. În special dna dr. Georgiana Coștiug și dna psihiatru Silvia Tudosă.",
  },
];
