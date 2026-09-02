"use client";

import { useState } from "react";
import { locations, type Location } from "@/lib/site";
import { cn } from "@/lib/utils";

const mapSrc = (query: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;

/**
 * Harta sediilor, cu un comutator deasupra.
 *
 * Trei `iframe`-uri suprapuse ar fi însemnat trei încărcări de Google Maps pe
 * pagină; aici rămâne unul singur, căruia i se schimbă adresa. Sediul ales se
 * ține în state, deci componenta e client — dar e singura bucată de pe pagină
 * care are nevoie de asta.
 */
export function LocationsMap({ className }: { className?: string }) {
  const [active, setActive] = useState<Location>(locations[0]);

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2" role="tablist">
        {locations.map((loc) => {
          const selected = loc.id === active.id;
          return (
            <button
              key={loc.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(loc)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                selected
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/20 hover:text-primary",
              )}
            >
              {loc.short}
            </button>
          );
        })}
      </div>

      <div className="mt-3 overflow-hidden rounded-3xl border border-border">
        <iframe
          key={active.id}
          src={mapSrc(active.mapQuery)}
          title={`Harta – ${active.name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-64 w-full sm:h-72 lg:h-80"
        />
      </div>
    </div>
  );
}
