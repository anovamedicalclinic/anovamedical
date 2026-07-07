import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Reveal } from "@/components/reveal";

/**
 * Secțiune cu spațiere verticală generoasă (premium = aer).
 * `bleed` dezactivează Container-ul pentru secțiuni full-width (ex: benzi CTA).
 */
export function Section({
  id,
  className,
  containerClassName,
  bleed = false,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  bleed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-20 md:py-28 lg:py-32", className)}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
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
