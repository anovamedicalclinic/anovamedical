"use client";

import { useState } from "react";
import { DoctorFlipCard } from "@/components/doctor-flip-card";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import type { Doctor, Specialty } from "@/lib/supabase/types";

export type TeamCard = { doctor: Doctor; specialties: Specialty[] };

/**
 * Grila de medici de pe /echipa, cu filtre pe specialitate.
 *
 * Ordinea vine gata făcută de pe server (grupată pe specialități, amestecată
 * în interiorul fiecărui grup) și nu se recalculează la filtrare: apăsarea
 * unui buton doar ascunde restul, nu rearanjează ce rămâne.
 *
 * Filtrarea se face în browser, pe lista deja randată, nu printr-o navigare
 * nouă: toți medicii sunt oricum în pagină, deci nu are rost un tur la server
 * pentru a arăta un subset din ei.
 */
export function TeamGrid({
  cards,
  filters,
}: {
  cards: TeamCard[];
  /** Specialitățile care au cel puțin un medic, în ordinea de pe site. */
  filters: { id: string; name: string }[];
}) {
  const [active, setActive] = useState<string | null>(null);

  const visible = active
    ? cards.filter((c) => c.specialties.some((s) => s.id === active))
    : cards;

  const options = [{ id: null, name: "Toți" }, ...filters];

  return (
    <>
      <Reveal className="flex flex-wrap gap-2 sm:gap-2.5">
        {options.map((option) => {
          const selected = option.id === active;
          return (
            <button
              key={option.id ?? "toti"}
              type="button"
              onClick={() => setActive(option.id)}
              aria-pressed={selected}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-primary",
              )}
            >
              {option.name}
            </button>
          );
        })}
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map(({ doctor, specialties }, i) => (
          <Reveal
            key={doctor.id}
            delay={(i % 4) * 0.05}
            className="h-[23rem] sm:h-[27rem]"
          >
            <DoctorFlipCard doctor={doctor} specialties={specialties} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
