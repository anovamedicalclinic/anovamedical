import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import { legal } from "@/lib/site";

/**
 * Layout pentru paginile legale: antet + conținut cu tipografie de proză.
 * Conținutul se scrie ca JSX (section > h2 + p + ul), stilizat prin variantele
 * arbitrare de mai jos.
 */
export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 overflow-x-hidden">
      <PageHeader
        breadcrumb={[{ label: title }]}
        eyebrow="Legal"
        title={title}
        description={intro}
      />

      <Section>
        <Reveal>
          <p className="text-sm text-muted-foreground">
            Ultima actualizare: {legal.updatedAt}
          </p>
        </Reveal>

        <Reveal
          delay={0.06}
          className="mt-8 max-w-3xl space-y-8 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-foreground [&_li]:text-muted-foreground [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_p]:text-pretty [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_section]:space-y-3 [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5"
        >
          {children}
        </Reveal>
      </Section>
    </main>
  );
}
