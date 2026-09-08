import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { locations, type Location } from "@/lib/site";
import { cn } from "@/lib/utils";

const mapsHref = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

/**
 * Numele scurt („Șos. Nicolina”), nu cel complet: „Anova Medical Clinic –”
 * repetat de trei ori nu spune nimic în plus și împinge adresa pe două rânduri
 * în coloanele înguste.
 */
function LocationBody({ loc }: { loc: Location }) {
  return (
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
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
        <a
          href={loc.phoneHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
        >
          <Phone className="size-3.5" />
          {loc.phone}
        </a>
        <a
          href={mapsHref(loc.mapQuery)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          Vezi pe hartă
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </div>
  );
}

/**
 * Un sediu ca fișă de sine stătătoare, pentru grilele care stau direct pe
 * fundalul paginii (ex. sediile lângă program, pe „Povestea noastră”). NU se pune
 * într-o cartelă: două chenare unul în altul arată înghesuit.
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
        "group relative flex h-full gap-3 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-secondary/50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-foreground/5",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 size-20 rounded-full bg-sage/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <span className="relative flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-primary transition-transform duration-300 group-hover:scale-105">
        <MapPin className="size-4" strokeWidth={1.75} />
      </span>
      <LocationBody loc={loc} />
    </div>
  );
}

/**
 * Lista sediilor, în trei densități.
 *
 * `list` — rânduri despărțite de o linie subțire. Asta se folosește în
 * interiorul unei cartele (contact, prima pagină): fără chenar propriu, ca să
 * nu iasă chenar în chenar.
 *
 * `cards` — fișe separate, pentru grile care stau direct pe pagină.
 *
 * `compact` — doar text, pentru coloane înguste: subsol, bara laterală a unui
 * medic.
 */
export function Locations({
  variant = "list",
  className,
}: {
  variant?: "list" | "cards" | "compact";
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

  if (variant === "cards") {
    return (
      <div className={cn("grid gap-4", className)}>
        {locations.map((loc) => (
          <LocationCard key={loc.id} loc={loc} />
        ))}
      </div>
    );
  }

  return (
    <ul className={cn("divide-y divide-border", className)}>
      {locations.map((loc) => (
        <li
          key={loc.id}
          className="flex gap-3 py-4 first:pt-0 last:pb-0"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
            <MapPin className="size-4" strokeWidth={1.75} />
          </span>
          <LocationBody loc={loc} />
        </li>
      ))}
    </ul>
  );
}
