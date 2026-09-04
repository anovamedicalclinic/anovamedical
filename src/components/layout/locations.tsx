import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { locations, type Location } from "@/lib/site";
import { cn } from "@/lib/utils";

const mapsHref = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

/**
 * Un sediu, ca fișă de sine stătătoare.
 *
 * Titlul e numele scurt, nu cel complet: pe trei fișe una sub alta, „Anova
 * Medical Clinic –” s-ar repeta de trei ori și ar împinge adresa pe două
 * rânduri în coloanele înguste. Telefonul stă pe fiecare fișă pentru că nu e
 * același peste tot — Tătărușiul are alt număr.
 */
export function LocationCard({
  loc,
  className,
}: {
  loc: Location;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-secondary/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-foreground/5",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 size-20 rounded-full bg-sage/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-primary transition-transform duration-300 group-hover:scale-105">
          <MapPin className="size-4" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium leading-snug text-foreground">
            {loc.short}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {loc.address}
          </p>
          {"detail" in loc && loc.detail && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {loc.detail}
            </p>
          )}
        </div>
      </div>

      <div className="relative mt-3 flex flex-wrap items-center gap-2 pt-3">
        <a
          href={loc.phoneHref}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:border-primary/30 hover:bg-primary/5"
        >
          <Phone className="size-3.5" />
          {loc.phone}
        </a>
        <a
          href={mapsHref(loc.mapQuery)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Vezi pe hartă
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </div>
  );
}

/**
 * Lista celor trei sedii, în două densități.
 *
 * `full` pune fișele una sub alta (pagina de contact, prima pagină).
 * `compact` e pentru coloane înguste — subsol, bara laterală a unui medic —
 * unde nu încape o fișă, doar text.
 *
 * Pentru un grid propriu (ex. sedii lângă program) se folosește direct
 * `LocationCard`, ca părintele să decidă coloanele.
 */
export function Locations({
  variant = "full",
  className,
}: {
  variant?: "full" | "compact";
  className?: string;
}) {
  if (variant === "compact") {
    return (
      <ul className={cn("space-y-3", className)}>
        {locations.map((loc) => (
          <li key={loc.id} className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-sage-strong" />
            <span className="min-w-0">
              <span className="block font-medium text-foreground">
                {loc.short}
              </span>
              <span className="block">{loc.address}</span>
              {"detail" in loc && loc.detail && (
                <span className="block">{loc.detail}</span>
              )}
              <a
                href={loc.phoneHref}
                className="mt-0.5 inline-block transition-colors hover:text-primary"
              >
                {loc.phone}
              </a>
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={cn("grid gap-3", className)}>
      {locations.map((loc) => (
        <LocationCard key={loc.id} loc={loc} />
      ))}
    </div>
  );
}
