import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/reveal";

export function AboutPreview() {
  return (
    <Section id="despre" className="overflow-hidden bg-card">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        {/* Text */}
        <div className="flex flex-col gap-6">
          <Reveal>
            <span className="text-sm font-medium uppercase tracking-[0.18em] text-sage">
              Despre Anova Medical Clinic
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="text-balance text-3xl text-foreground sm:text-4xl">
              Îngrijire construită în jurul fiecărei povești.
            </h2>
          </Reveal>

          <Reveal
            delay={0.12}
            className="prose-readable space-y-4 text-pretty text-muted-foreground"
          >
            <p>
              ANOVA Medical Clinic s-a născut din dorința de a crea un loc sigur
              pentru oamenii care traversează o perioadă dificilă. Numele vine de
              la <em>Analiză a Variabilității și Abordare Nuanțată</em>, felul
              nostru de a privi fiecare persoană în complexitatea ei, nu ca pe un
              simplu diagnostic.
            </p>
            <p>
              Suntem o echipă multidisciplinară de medici, psihologi și
              terapeuți, alături de tine cu răbdare și profesionalism, ca să îți
              regăsești echilibrul.
            </p>
          </Reveal>

          <Reveal delay={0.18} className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="group/cta h-12 rounded-full px-6 text-base transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover"
            >
              <Link href="/contact">
                Programează-te
                <ArrowRight className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="ghost"
              className="group/link h-12 rounded-full px-5 text-base hover:bg-primary/5 hover:text-primary"
            >
              <Link href="/despre-noi">
                Vezi povestea completă
                <ArrowRight className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
              </Link>
            </Button>
          </Reveal>
        </div>

        {/* Imagine */}
        <div className="relative">
          {/* accente decorative */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-6 -top-6 -z-10 size-40 rounded-full bg-sage/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-8 -left-6 -z-10 size-40 rounded-full bg-sand/20 blur-3xl"
          />

          <Reveal scale={1.06} duration={0.9} className="group relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border shadow-xl shadow-foreground/5">
              <Image
                src="/poza-about.jpg"
                alt="Echipa Anova Medical Clinic"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
