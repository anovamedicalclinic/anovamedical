import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Reveal } from "@/components/reveal";

/**
 * Secțiune cu spațiere verticală generoasă (premium = aer).
 * `bleed` dezactivează Container-ul pentru secțiuni full-width (ex: benzi CTA).
 *
 * `blend` e pentru secțiunile care au alt fundal decât pagina. Fără el, între
 * două secțiuni se vede o dungă orizontală netă, ca o tăietură. Cele două
 * benzi de mai jos topesc fundalul secțiunii în cel al paginii, sus și jos,
 * așa că trecerea se face treptat și nu mai există o margine de observat.
 */
export function Section({
  id,
  className,
  containerClassName,
  bleed = false,
  blend = false,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  bleed?: boolean;
  blend?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("relative py-20 md:py-28 lg:py-32", className)}
    >
      {blend && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent"
          />
        </>
      )}
      {bleed ? (
        children
      ) : (
        <Container className={cn("relative", containerClassName)}>
          {children}
        </Container>
      )}
    </section>
  );
}

/** Antet de secțiune: eyebrow discret + titlu serif + descriere opțională. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-sm font-medium uppercase tracking-[0.18em] text-sage-strong">
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-3xl text-foreground sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-pretty text-lg text-muted-foreground",
            align === "center" ? "max-w-2xl" : "max-w-2xl",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
