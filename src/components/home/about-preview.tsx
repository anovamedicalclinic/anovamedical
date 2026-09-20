import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import type { ContentReader } from "@/lib/content/get";

/**
 * Textele vin prin `content`, cititorul încărcat în pagină. Marcajul și clasele
 * rămân în cod: din panou se schimbă doar conținutul câmpurilor.
 *
 * Secțiunea nu mai are imagine, așa că textul e centrat pe o coloană îngustă,
 * iar cele două paragrafe stau alăturat de la `md` în sus, ca să nu rezulte un
 * bloc lung și îngust. Accentele decorative rămân, ca secțiunea să nu pară
 * goală fără poză.
 */
export function AboutPreview({ content }: { content: ContentReader }) {
  return (
    <Section id="despre" blend className="overflow-hidden bg-card">
      {/* accente decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 -z-10 size-56 rounded-full bg-sage/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -left-10 -z-10 size-56 rounded-full bg-sand/20 blur-3xl"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <Reveal>
          <span className="text-sm font-medium uppercase tracking-[0.18em] text-sage-strong">
            {content("home.about.eyebrow")}
          </span>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="text-balance text-3xl text-foreground sm:text-4xl md:text-[2.75rem]">
            {content("home.about.title")}
          </h2>
        </Reveal>

        <Reveal delay={0.12} className="w-full">
          <div className="mt-2 grid gap-6 text-left text-pretty text-muted-foreground md:grid-cols-2 md:gap-10">
            <p>{content("home.about.paragraph_1")}</p>
            <p>{content("home.about.paragraph_2")}</p>
          </div>
        </Reveal>

        <Reveal
          delay={0.18}
          className="mt-2 flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            asChild
            size="lg"
            className="group/cta h-12 rounded-full px-6 text-base transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover"
          >
            <Link href="/contact">
              {content("home.about.cta_primary")}
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
              {content("home.about.cta_secondary")}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
