import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { SpecialtyIcon } from "@/lib/icons";
import { getDoctorsBySpecialtySlug, getSpecialties } from "@/lib/data";
import { specialtyImage } from "@/lib/specialty-images";

export const metadata: Metadata = {
  title: "Specialități",
  description:
    "Specialitățile Anova Medical Clinic din Iași: psihiatrie, psihiatrie pediatrică, psihologie, neurologie, cardiologie și endocrinologie. Îngrijire completă, sub același acoperiș.",
};

export default async function SpecialitatiPage() {
  const specialties = await getSpecialties();
  const cards = await Promise.all(
    specialties.map(async (specialty) => ({
      specialty,
      image: specialtyImage(specialty.slug),
      doctorCount: (await getDoctorsBySpecialtySlug(specialty.slug)).length,
    })),
  );

  return (
    <main className="flex-1 overflow-x-hidden">
      <PageHeader
        breadcrumb={[{ label: "Specialități" }]}
        eyebrow="Specialități"
        title="Îngrijire completă, sub același acoperiș"
        description="De la sănătate mintală la neurologie, cardiologie și endocrinologie, echipa noastră acoperă o gamă largă de nevoi, cu aceeași grijă și atenție la fiecare pas."
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ specialty, image, doctorCount }, i) => (
            <Reveal key={specialty.id} delay={(i % 3) * 0.05}>
              <Link
                href={`/specialitati/${specialty.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-foreground/5"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                  {image ? (
                    <Image
                      src={image}
                      alt={specialty.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-secondary via-accent to-sand/25">
                      <SpecialtyIcon
                        icon={specialty.icon}
                        className="size-16 text-primary/20"
                        strokeWidth={1}
                      />
                    </div>
                  )}
                  <span className="absolute left-4 top-4 flex size-11 items-center justify-center rounded-2xl bg-card/90 text-primary shadow-sm shadow-foreground/5 backdrop-blur-sm">
                    <SpecialtyIcon
                      icon={specialty.icon}
                      className="size-5"
                      strokeWidth={1.75}
                    />
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-2 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-xl text-foreground">{specialty.name}</h2>
                    {doctorCount > 0 && (
                      <span className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                        <Users className="size-3.5" />
                        {doctorCount}
                      </span>
                    )}
                  </div>
                  {specialty.tagline && (
                    <p className="text-sm font-medium text-sage">
                      {specialty.tagline}
                    </p>
                  )}
                  {specialty.summary && (
                    <p className="text-pretty text-sm text-muted-foreground">
                      {specialty.summary}
                    </p>
                  )}
                  <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-medium text-primary">
                    Află mai mult
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}
