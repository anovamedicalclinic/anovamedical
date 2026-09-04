import { Container } from "@/components/layout/container";
import { Breadcrumb, type Crumb } from "@/components/layout/breadcrumb";
import { Reveal } from "@/components/reveal";

/**
 * Antet pentru paginile interioare: breadcrumb premium, eyebrow opțional,
 * titlu serif și descriere, pe un fundal cu accente decorative subtile.
 * Include padding-top ca să degajeze headerul fix.
 */
export function PageHeader({
  breadcrumb,
  eyebrow,
  title,
  description,
}: {
  breadcrumb: Crumb[];
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  // Textele vin din panou, unde descrierea se scrie ca text simplu. Un rând
  // gol între paragrafe e singura marcare pe care o are la dispoziție
  // redactorul, așa că aici o traducem în <p>-uri separate.
  const paragraphs = (description ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="relative overflow-hidden bg-card pb-14 pt-28 md:pb-16 md:pt-32">
      {/*
        În locul liniei de sub antet, o bandă care topește fundalul acestuia în
        cel al paginii. Linia tăia pagina în două; degradeul o leagă.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-20 -z-0 size-72 rounded-full bg-sage/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-[-6rem] -z-0 size-72 rounded-full bg-sand/15 blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <Breadcrumb items={breadcrumb} />
        </Reveal>

        {eyebrow && (
          <Reveal delay={0.06} className="mt-8">
            <span className="text-sm font-medium uppercase tracking-[0.18em] text-sage-strong">
              {eyebrow}
            </span>
          </Reveal>
        )}

        <Reveal delay={0.1} className={eyebrow ? "mt-3" : "mt-8"}>
          <h1 className="max-w-3xl text-balance text-4xl text-foreground sm:text-5xl md:text-6xl">
            {title}
          </h1>
        </Reveal>

        {paragraphs.length > 0 && (
          <Reveal delay={0.16} className="mt-5 space-y-4">
            {paragraphs.map((text) => (
              <p
                key={text}
                className="prose-readable text-pretty text-lg text-muted-foreground"
              >
                {text}
              </p>
            ))}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
