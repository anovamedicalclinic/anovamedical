import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/reveal";
import { contact } from "@/lib/site";
import { getContent } from "@/lib/content/get";
import { cn } from "@/lib/utils";

/**
 * Bandă de îndemn la programare, pe fundal primary (petrol).
 * Folosită la finalul paginilor pentru un CTA consistent.
 *
 * Valorile implicite sunt aceleași cu cele din registrul de conținut. Rămân aici
 * pentru paginile care randează banda fără să încarce conținutul (ex. paginile
 * legale), ca să nu apară niciodată goală.
 */
export async function CtaBand({
  title,
  description,
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  const content = await getContent();
  const resolvedTitle = title ?? content("home.cta.title");
  const resolvedDescription = description ?? content("home.cta.description");

  return (
    <section className={cn("py-20 md:py-24", className)}>
      <Container>
        <Reveal className="overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground sm:px-8 sm:py-14 md:px-16 md:py-20">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-balance text-3xl text-primary-foreground sm:text-4xl">
                {resolvedTitle}
              </h2>
              <p className="text-pretty text-base text-primary-foreground/80 sm:text-lg">
                {resolvedDescription}
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row md:flex-col lg:flex-row">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-full bg-background text-foreground hover:bg-background/90 sm:w-auto"
              >
                <Link href="/contact">Programează-te</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
              >
                <a href={contact.phoneHref}>
                  <Phone className="size-4" />
                  {contact.phone}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
