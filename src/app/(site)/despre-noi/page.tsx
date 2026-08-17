import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  GraduationCap,
  HeartHandshake,
  MapPin,
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
import { getDoctors } from "@/lib/data";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Despre noi",
  description:
    "Povestea ANOVA Medical Clinic din Iași: numele, echipa multidisciplinară, valorile care ne ghidează și grija pentru sănătatea ta mintală și neurologică.",
  alternates: { canonical: "/despre-noi" },
};

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  "Șoseaua Nicolina 14, Iași",
)}&z=15&output=embed`;

const values = [
  {
    icon: HeartHandshake,
    title: "Empatie",
    description:
      "Ascultăm cu răbdare și fără judecată. Fiecare poveste contează și merită să fie înțeleasă.",
  },
  {
    icon: GraduationCap,
    title: "Profesionalism",
    description:
      "Echipă universitară experimentată, cu standarde clinice riguroase și formare continuă.",
  },
  {
    icon: Sparkles,
    title: "Abordare nuanțată",
    description:
      "Privim fiecare persoană în complexitatea ei și construim planuri de tratament personalizate.",
  },
  {
    icon: ShieldCheck,
    title: "Confidențialitate",
    description:
      "Un spațiu discret și sigur, în care intimitatea și datele tale sunt protejate.",
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
    a: `Ne găsești pe ${contact.address}, într-un spațiu cald și primitor.`,
  },
];

export default async function DespreNoiPage() {
  const doctors = await getDoctors();
  const teamPreview = doctors.slice(0, 4);

  return (
    <main className="flex-1 overflow-x-hidden">
      <PageHeader
        breadcrumb={[{ label: "Despre noi" }]}
        eyebrow="Despre noi"
        title="Îngrijire cu suflet, pentru echilibrul tău"
        description="Află povestea din spatele numelui ANOVA, valorile care ne ghidează și echipa care te însoțește la fiecare pas."
      />

      {/* Povestea */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <Reveal>
              <span className="text-sm font-medium uppercase tracking-[0.18em] text-sage-strong">
                Povestea noastră
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
                ANOVA Medical Clinic s-a născut din dorința de a crea un loc
                sigur pentru cei care caută echilibru în mijlocul provocărilor de
                sănătate mintală. Un spațiu în care oamenii se simt ascultați,
                înțeleși și sprijiniți.
              </p>
              <p>
                Numele ANOVA vine de la <em>Analiză a Variabilității și Abordare
                Nuanțată</em>, angajamentul nostru de a privi fiecare poveste cu o
                perspectivă amplă și comprehensivă.
              </p>
              <p>
                La deschidere, o echipă multidisciplinară de medici, psihologi,
                terapeuți și asistenți medicali a pus bazele unei misiuni comune:
                să ajute oamenii să-și recâștige echilibrul. În timp, ascultând
                nevoile pacienților, clinica și-a extins serviciile cu noi
                specialități medicale, pentru o îngrijire cât mai completă.
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
      <Section className="bg-card">
        <SectionHeading
          eyebrow="Valorile noastre"
          title="Principiile care ne ghidează"
          description="Tot ce facem pornește de la câteva convingeri simple despre cum ar trebui să arate îngrijirea sănătății mintale."
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
            <Reveal className="overflow-hidden rounded-3xl border border-border">
              <iframe
                src={MAP_SRC}
                title="Harta locației Anova Medical Clinic"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full sm:h-72"
              />
            </Reveal>

            <Reveal delay={0.08} className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5">
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                  <Clock className="size-5" strokeWidth={1.75} />
                </span>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Program
                </p>
                <div className="space-y-0.5 text-sm text-foreground">
                  {contact.schedule.map((row) => (
                    <p key={row.days}>
                      {row.days}: {row.hours}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5">
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                  <MapPin className="size-5" strokeWidth={1.75} />
                </span>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Adresă
                </p>
                <p className="text-sm text-foreground">{contact.address}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  <Button
                    asChild
                    size="sm"
                    className="rounded-full hover:bg-primary-hover"
                  >
                    <a href={contact.phoneHref}>
                      <Phone className="size-4" />
                      Sună
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="rounded-full hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                  >
                    <a
                      href={contact.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon className="size-4" />
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
      </Section>

      {/* Echipa preview */}
      <Section className="bg-card">
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
