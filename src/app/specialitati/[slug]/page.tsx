import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { DoctorCard } from "@/components/doctor-card";
import { CtaBand } from "@/components/cta-band";
import { SpecialtyIcon } from "@/lib/icons";
import {
  getDoctorsBySpecialtySlug,
  getSpecialties,
  getSpecialtyBySlug,
} from "@/lib/data";
import { specialtyImage } from "@/lib/specialty-images";
import { specialtyContent, type SpecialtyBlock } from "@/lib/specialty-content";
import { ConditionPills } from "@/components/specialty/condition-pills";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const specialties = await getSpecialties();
  return specialties.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const specialty = await getSpecialtyBySlug(slug);
  if (!specialty) return { title: "Specialitate negăsită" };
  const description =
    specialtyContent[slug]?.intro[0] ?? specialty.summary ?? undefined;
  return {
    title: specialty.name,
    description,
    alternates: { canonical: `/specialitati/${slug}` },
    openGraph: {
      type: "article",
      title: `${specialty.name} · Anova Medical Clinic`,
      description,
      url: `/specialitati/${slug}`,
    },
  };
}

function BlockContent({
  block,
  onCard,
}: {
  block: SpecialtyBlock;
  onCard: boolean;
}) {
  const itemBg = onCard ? "bg-background" : "bg-card";
  const glow =
    "pointer-events-none absolute -right-10 -top-10 size-24 rounded-full bg-sage/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100";

  if (block.layout === "pills") {
    return <ConditionPills items={block.items} onCard={onCard} />;
  }

  if (block.layout === "cards") {
    return (
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {block.items.map((item, i) => (
          <Reveal key={item} delay={i * 0.04}>
            <div
              className={cn(
                "group relative flex h-full items-start gap-3.5 overflow-hidden rounded-2xl border border-border p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-foreground/5 sm:gap-4 sm:rounded-3xl sm:p-6",
                itemBg,
              )}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute right-3 top-1 font-heading text-5xl leading-none text-primary/[0.06] transition-colors duration-300 group-hover:text-primary/10 sm:text-6xl"
              >
                {i + 1}
              </span>
              <span className="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-secondary font-heading text-base text-primary shadow-sm shadow-foreground/5 transition-all duration-300 group-hover:from-primary group-hover:to-[#2a6a63] group-hover:text-primary-foreground group-hover:shadow-primary/25 sm:size-11 sm:rounded-2xl sm:text-lg">
                {i + 1}
              </span>
              <span className="relative pt-1 text-sm font-medium leading-relaxed text-foreground sm:pt-1.5">
                {item}
              </span>
              <span aria-hidden className={glow} />
            </div>
          </Reveal>
        ))}
      </div>
    );
  }

  // checklist
  return (
    <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3.5">
      {block.items.map((item, i) => (
        <Reveal key={item} delay={i * 0.04}>
          <div
            className={cn(
              "group relative flex items-start gap-3 overflow-hidden rounded-2xl border border-border p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-lg hover:shadow-foreground/5 sm:gap-4 sm:p-4",
              itemBg,
            )}
          >
            <span className="relative flex size-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[#2a6a63] text-primary-foreground shadow-sm shadow-primary/20 transition-transform duration-300 group-hover:scale-110 sm:mt-0.5 sm:size-8 sm:rounded-xl">
              <Check className="size-3.5 sm:size-4" strokeWidth={2.5} />
            </span>
            <span className="relative pt-0.5 text-sm leading-relaxed text-foreground/90 sm:pt-1">
              {item}
            </span>
            <span aria-hidden className={glow} />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default async function SpecialtyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const specialty = await getSpecialtyBySlug(slug);
  if (!specialty) notFound();

  const content = specialtyContent[slug];
  const intro = content?.intro ?? (specialty.description ? [specialty.summary ?? ""] : []);
  const tagline = content?.tagline ?? specialty.tagline ?? "";
  const image = specialtyImage(slug);
  const doctors = await getDoctorsBySpecialtySlug(slug);

  const doctorsOnCard = (content?.blocks.length ?? 0) % 2 === 0;

  return (
    <main className="flex-1 overflow-x-hidden">
      <JsonLd
        data={breadcrumbLd([
          { name: "Acasă", path: "/" },
          { name: "Specialități", path: "/specialitati" },
          { name: specialty.name, path: `/specialitati/${slug}` },
        ])}
      />
      {/* Hero */}
      <section className="relative overflow-hidden pb-14 pt-28 md:pb-20 md:pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 -z-10 size-80 rounded-full bg-sage/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-[-8rem] -z-10 size-80 rounded-full bg-sand/15 blur-3xl"
        />
        <Container>
          <Reveal>
            <Breadcrumb
              items={[
                { label: "Specialități", href: "/specialitati" },
                { label: specialty.name },
              ]}
            />
          </Reveal>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-5">
              <Reveal className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-primary">
                  <SpecialtyIcon
                    icon={specialty.icon}
                    className="size-6"
                    strokeWidth={1.75}
                  />
                </span>
                <span className="text-sm font-medium uppercase tracking-[0.18em] text-sage-strong">
                  Specialitate
                </span>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="text-balance text-4xl text-foreground sm:text-5xl">
                  {specialty.name}
                </h1>
              </Reveal>

              {tagline && (
                <Reveal delay={0.1}>
                  <p className="text-pretty text-lg font-medium text-primary">
                    {tagline}
                  </p>
                </Reveal>
              )}

              {intro.length > 0 && (
                <Reveal
                  delay={0.14}
                  className="prose-readable space-y-3 text-pretty text-muted-foreground"
                >
                  {intro.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </Reveal>
              )}

              <Reveal delay={0.2} className="flex flex-wrap gap-3 pt-1">
                <Button asChild size="lg" className="hover:bg-primary-hover">
                  <Link href="/contact">Programează-te</Link>
                </Button>
                {doctors.length > 0 && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                  >
                    <a href="#echipa">Vezi specialiștii</a>
                  </Button>
                )}
              </Reveal>
            </div>

            {image && (
              <Reveal scale={1.05} duration={0.9} className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border shadow-xl shadow-foreground/5">
                  <Image
                    src={image}
                    alt={specialty.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </Reveal>
            )}
          </div>
        </Container>
      </section>

      {/* Blocuri de conținut */}
      {content?.blocks.map((block, i) => {
        const onCard = i % 2 === 1;
        const Icon = block.icon;
        return (
          <Section
            key={block.title}
            className={cn("py-14 sm:py-20 md:py-28 lg:py-32", onCard && "bg-card")}
          >
            <Reveal className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary sm:size-11 sm:rounded-2xl">
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
              <h2 className="text-balance text-xl text-foreground sm:text-3xl">
                {block.title}
              </h2>
            </Reveal>
            {block.intro && (
              <Reveal delay={0.06}>
                <p className="prose-readable mt-3 text-pretty text-muted-foreground sm:mt-4">
                  {block.intro}
                </p>
              </Reveal>
            )}
            <div className="mt-6 sm:mt-8">
              <BlockContent block={block} onCard={onCard} />
            </div>
          </Section>
        );
      })}

      {/* Specialiștii */}
      {doctors.length > 0 && (
        <Section id="echipa" className={doctorsOnCard ? "bg-card" : ""}>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal className="max-w-xl space-y-3">
              <span className="text-sm font-medium uppercase tracking-[0.18em] text-sage-strong">
                Echipa
              </span>
              <h2 className="text-balance text-3xl text-foreground sm:text-4xl">
                Specialiștii noștri în {specialty.name.toLowerCase()}
              </h2>
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
            {doctors.map((doctor, i) => (
              <Reveal key={doctor.id} delay={(i % 4) * 0.05}>
                <DoctorCard doctor={doctor} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </main>
  );
}
