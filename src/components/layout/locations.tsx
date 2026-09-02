import { MapPin, Phone } from "lucide-react";
import { locations } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Lista celor trei sedii, în două densități.
 *
 * `compact` e pentru coloane înguste (footer, bara laterală a unui medic): un
 * pin, apoi numele sediului, adresa și telefonul, unul sub altul.
 *
 * `full` e pentru paginile de contact și despre noi: fiecare sediu într-o
 * cartelă, cu numărul lui de telefon ca legătură apelabilă.
 *
 * Ambele variante afișează telefonul lângă fiecare sediu, pentru că nu toate
 * au același număr — Tătărușiul are altul decât cele două din Iași.
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
    <div className={cn("space-y-3", className)}>
      {locations.map((loc) => (
        <div
          key={loc.id}
          className="rounded-2xl border border-border bg-background p-4"
        >
          <p className="text-sm font-medium text-foreground">{loc.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{loc.address}</p>
          {"detail" in loc && loc.detail && (
            <p className="text-sm text-muted-foreground">{loc.detail}</p>
          )}
          <a
            href={loc.phoneHref}
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
          >
            <Phone className="size-3.5" />
            {loc.phone}
          </a>
        </div>
      ))}
    </div>
  );
}
