"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DoctorFlipCard } from "@/components/doctor-flip-card";
import type { Doctor, Specialty } from "@/lib/supabase/types";

type Item = { doctor: Doctor; specialties: Specialty[] };

export function TeamCarousel({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollByCards = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : 320;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map(({ doctor, specialties }) => (
          <div
            key={doctor.id}
            data-card
            className="h-[27rem] w-[270px] shrink-0 snap-start sm:w-[290px]"
          >
            <DoctorFlipCard doctor={doctor} specialties={specialties} />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollByCards(-1)}
        aria-label="Specialiști anteriori"
        className="absolute -left-2 top-[38%] z-20 hidden size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md shadow-foreground/5 transition-colors hover:bg-secondary hover:text-primary sm:flex"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => scrollByCards(1)}
        aria-label="Următorii specialiști"
        className="absolute -right-2 top-[38%] z-20 hidden size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md shadow-foreground/5 transition-colors hover:bg-secondary hover:text-primary sm:flex"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}
