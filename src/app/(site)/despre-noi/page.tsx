import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  HeartHandshake,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeading } from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DoctorCard } from "@/components/doctor-card";
import { CtaBand } from "@/components/cta-band";
import { WhatsAppIcon } from "@/components/brand/social-icons";
import { Locations } from "@/components/layout/locations";
import { LocationsMap } from "@/components/layout/locations-map";
import { getDoctors } from "@/lib/data";
import { contact, locations } from "@/lib/site";

export const metadata: Metadata = {
  title: "Povestea noastră",
  description:
    "Povestea ANOVA Medical Clinic din Iași: abordarea noastră, viziunea, misiunea și valorile care ne ghidează, și echipa care are grijă de sănătatea ta mintală și neurologică.",
  alternates: { canonical: "/despre-noi" },
};

const values = [
  {
    icon: Sparkles,
    title: "Viziunea noastră",
    description:
      "Transcendem granițele, căutând să definim calea către o lume în care sănătatea mintală primește atenția și sprijinul pe care le merită. Ne dorim să fim reper în tratarea afecțiunilor psihice, aducând în prim-plan inovație și cercetare, oferind soluții personalizate și eficiente. Cu fiecare pas, ne străduim să modelăm un viitor în care toate persoanele să aibă acces la cele mai bune servicii de sănătate mintală.",
  },
  {
    icon: HeartHandshake,
    title: "Misiunea noastră",
    description:
      "O chemare, un angajament și o promisiune de a îmbunătăți viața celor care se confruntă cu tulburări psihice. Prin servicii medicale de înaltă calitate și un mediu plin de pasiune pentru ceea ce facem, oferim pacienților noștri șansa unei recuperări complete și a unei vieți mai bune. Încurajăm pacienții și familiile lor să fie parte activă în procesul terapeutic, construind împreună punți către o sănătate mintală durabilă.",
  },
  {
    icon: ShieldCheck,
    title: "Valorile noastre",
    description:
      "La Anova, credem în respectul profund față de fiecare individ, apreciem diversitatea și recunoaștem că respectul este baza încrederii. Suntem o echipă, unde fiecare membru contribuie la succes și unde parteneriatul cu pacienții noștri este esențial. Profesionalismul nostru este ancorat în etică, standarde științifice și dezvoltare continuă, pentru a oferi mereu cele mai bune soluții pentru pacienții noștri.",
  },
];

const faqs = [
  {
    q: "Consultațiile sunt decontate de CAS?",
    a: "Da. Oferim consultații gratuite pacienților asigurați care prezintă bilet de trimitere de la medicul de familie sau de la un medic specialist.",
  },
  {
    q: "Cum mă pot programa?",
    a: "Completează formularul de pe site, sună-ne sau scrie-ne pe WhatsApp. Programarea se confirmă telefonic, ca să verificăm împreună disponibilitatea.",
  },
  {
    q: "Care este programul clinicii?",
    a: "Suntem deschiși de luni până vineri, între 09:00 și 20:00. Sâmbăta și duminica suntem închiși.",
  },
  {
    q: "Datele mele sunt confidențiale?",
    a: "Absolut. Confidențialitatea și intimitatea pacienților sunt fundamentale pentru noi, la fiecare pas al colaborării.",
  },
  {
    q: "Unde vă găsesc?",
    a: `Avem trei sedii: ${locations.map((l) => l.address).join("; ")}. Telefonul fiecăruia e trecut la Contact.`,
  },
];

export default async function DespreNoiPage() {
  const doctors = await getDoctors();
  const teamPreview = doctors.slice(0, 4);

  return (
    <main className="flex-1 overflow-x-hidden">
      <PageHeader
        breadcrumb={[{ label: "Povestea noastră" }]}
        eyebrow="Povestea noastră"
        title="Îngrijire cu suflet, pentru echilibrul tău"
        description="Povestea ANOVA, viziunea și valorile care ne ghidează și echipa care te însoțește la fiecare pas."
      />

      {/* Povestea */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <Reveal>
              <span className="text-sm font-medium uppercase tracking-[0.18em] text-sage-strong">
                Începutul
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-balance text-3xl text-foreground sm:text-4xl">
                Un început gândit în jurul oamenilor
              </h2>
            </Reveal>
            <Reveal
              delay={0.12}
              className="prose-readable space-y-4 text-pretty text-muted-foreground"
            >
              <p>
                Clinica a fost concepută ca un loc de siguranță, unde pacienții
                să se simtă acceptați și înțeleși. Sala de așteptare a fost
                amenajată pentru a crea o atmosferă liniștită și relaxantă, cu un
                decor reconfortant. Fiecare detaliu a fost gândit pentru a
                elimina stigmatul asociat cu „mersul la psihiatru sau psiholog”
                și pentru a promova o abordare pozitivă a sănătății mintale.
              </p>

              <h3 className="pt-2 font-heading text-xl text-foreground">
                Abordarea noastră
              </h3>
              <p>
                Încă de la început, ANOVA Medical Clinic a pus un accent deosebit
                pe personalizarea tratamentelor. Fiecare pacient a fost evaluat
                individual, iar planurile de tratament au fost adaptate nevoilor
                lor. Psihiatrii și terapeuții au lucrat împreună cu pacienții,
                construind o relație de încredere și colaborare pentru a găsi
                cele mai eficiente modalități de a-și redobândi echilibrul.
              </p>
              <p>
                Pe măsură ce timpul a trecut, ANOVA Medical Clinic a devenit un
                punct de referință în comunitate, oferind nu doar tratamente, ci
                și programe de educație și prevenție. Clinica a organizat
                ateliere pentru a informa oamenii despre sănătatea mintală și a
                încurajat discuții deschise despre această temă.
              </p>
              <p>
                Astfel, ANOVA Medical Clinic continuă povestea, rămânând un far
                de speranță și un simbol al îngrijirii psihiatrice de înaltă
                calitate.
              </p>
            </Reveal>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-6 -z-10 size-40 rounded-full bg-sage/20 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-8 -left-6 -z-10 size-40 rounded-full bg-sand/20 blur-3xl"
            />
            <Reveal scale={1.05} duration={0.9}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border shadow-xl shadow-foreground/5">
                <Image
                  src="/poza-about.jpg"
                  alt="Echipa Anova Medical Clinic"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Valori */}
      <Section blend className="bg-card">
        <SectionHeading
          eyebrow="Despre ANOVA"
          title="Alături de fiecare poveste care trece pragul"
          align="center"
        />
        <Reveal
          delay={0.06}
          className="prose-readable mx-auto mt-5 space-y-4 text-pretty text-center text-lg text-muted-foreground"
        >
          <p>
            La Anova, ne dedicăm cu pasiune și devotament fiecărei povești care
            trece pragul ușilor noastre. Suntem nu doar un centru medical, ci o
            comunitate de profesioniști în sănătate mintală, transformând
            fiecare zi într-o oportunitate de a aduce lumină și speranță în
            viața pacienților noștri.
          </p>
          <p>
            Suntem gata să fim alături de tine în călătoria către sănătatea
            mintală și psihică. Fiecare zi este o oportunitate de a transforma
            vieți și de a contribui la un viitor mai luminos pentru toți.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <Card className="h-full rounded-3xl border-border bg-background shadow-none transition-colors duration-300 hover:border-primary/20">
                <CardHeader>
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-primary">
                    <v.icon className="size-6" strokeWidth={1.75} />
                  </span>
                  <CardTitle className="pt-3 text-lg">{v.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-pretty leading-relaxed">
                    {v.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Bine de știut */}
      <Section>
        <SectionHeading
          eyebrow="Bine de știut"
          title="Tot ce trebuie să știi înainte de vizită"
          description="Program, locație și răspunsuri la cele mai frecvente întrebări. Pentru orice altceva, suntem la un telefon distanță."
          align="center"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
          {/* Info + hartă */}
          <div className="space-y-5">
            <Reveal>
              <LocationsMap />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-gradient-to-br from-card to-secondary/50 p-5">
                <div className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                    <Clock className="size-4" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-sm font-medium leading-snug text-foreground">
                      Program
                    </p>
                    <div className="mt-1 space-y-0.5 text-sm leading-relaxed text-muted-foreground">
                      {contact.schedule.map((row) => (
                        <p key={row.days}>
                          {row.days}: {row.hours}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 pt-3">
                  <Button
                    asChild
                    size="sm"
                    className="h-8 rounded-full px-3 text-xs hover:bg-primary-hover"
                  >
                    <a href={contact.phoneHref}>
                      <Phone className="size-3.5" />
                      Sună
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="h-8 rounded-full px-3 text-xs hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                  >
                    <a
                      href={contact.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon className="size-3.5" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* FAQ */}
          <Reveal delay={0.12}>
            <Accordion
              type="single"
              collapsible
              className="w-full rounded-3xl border border-border bg-card px-5 sm:px-6"
            >
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="last:border-b-0"
                >
                  <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-pretty text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>

        {/*
          Sediile pe toată lățimea, sub cele două coloane. Într-o jumătate de
          coloană, adresa din Tătăruși se rupea în cinci rânduri.
        */}
        <div className="mt-14 sm:mt-16">
          <Reveal>
            <span className="text-sm font-medium uppercase tracking-[0.18em] text-sage-strong">
              Sedii
            </span>
            <h3 className="mt-2 text-balance text-2xl text-foreground sm:text-3xl">
              Ne găsești în trei locuri
            </h3>
          </Reveal>
          <Reveal delay={0.06}>
            <Locations variant="cards" className="mt-8 md:grid-cols-3" />
          </Reveal>
        </div>
      </Section>

      {/* Echipa preview */}
      <Section blend className="bg-card">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-xl space-y-4">
            <span className="text-sm font-medium uppercase tracking-[0.18em] text-sage-strong">
              Echipa
            </span>
            <h2 className="text-balance text-3xl text-foreground sm:text-4xl">
              Oamenii care fac diferența
            </h2>
            <p className="text-pretty text-muted-foreground">
              O echipă multidisciplinară de medici, psihologi și neurologi,
              alături de tine cu profesionalism și căldură.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/echipa">
                Vezi echipa completă
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-4">
          {teamPreview.map((doctor, i) => (
            <Reveal key={doctor.id} delay={i * 0.05}>
              <DoctorCard doctor={doctor} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}
