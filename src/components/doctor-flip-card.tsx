"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, RotateCcw, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { doctorPhoto } from "@/lib/doctor-photos";
import { doctorCardBio } from "@/lib/doctor-bios";
import { cn } from "@/lib/utils";
import type { Doctor, Specialty } from "@/lib/supabase/types";

export function DoctorFlipCard({
  doctor,
  specialties,
}: {
  doctor: Doctor;
  specialties: Specialty[];
}) {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((v) => !v);

  return (
    <div className="group/card h-full [perspective:1400px]">
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${doctor.name}, vezi detalii`}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        className={cn(
          "relative h-full w-full cursor-pointer rounded-3xl outline-none transition-transform duration-700 [transform-style:preserve-3d] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        {/* FAȚĂ */}
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-border bg-card [backface-visibility:hidden]">
          <div className="relative h-3/5 overflow-hidden bg-secondary">
            <Image
              src={doctorPhoto(doctor)}
              alt={`Portret ${doctor.name}`}
              fill
              sizes="(max-width: 640px) 90vw, 300px"
              className="object-cover object-top transition-transform duration-500 group-hover/card:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col p-3.5 sm:p-5">
            {doctor.credentials && (
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.12em] text-sage sm:text-[0.7rem] sm:tracking-[0.14em]">
                {doctor.credentials}
              </span>
            )}
            <h3 className="mt-1 text-sm leading-tight text-foreground sm:text-lg">
              {doctor.name}
            </h3>
            {doctor.title && (
              <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                {doctor.title}
              </p>
            )}
            <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-xs font-medium text-primary sm:text-sm">
              Despre mine
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/card:translate-x-0.5 sm:size-4" />
            </span>
          </div>
        </div>

        {/* SPATE */}
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-primary/20 bg-primary p-4 text-primary-foreground [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-6">
          <h3 className="text-sm leading-tight sm:text-lg">{doctor.name}</h3>
          {doctor.credentials && (
            <p className="mt-0.5 text-xs text-primary-foreground/70 sm:text-sm">
              {doctor.credentials}
            </p>
          )}

          <div className="mt-3 flex flex-1 flex-col gap-2.5 text-sm sm:mt-4 sm:gap-3">
            {specialties.length > 0 && (
              <div className="space-y-1.5 sm:space-y-2">
                <p className="flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-primary-foreground/60 sm:text-xs sm:tracking-[0.14em]">
                  <Stethoscope className="size-3.5" />
                  Specialitate
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {specialties.map((s) => (
                    <Badge
                      key={s.id}
                      className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/15"
                    >
                      {s.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <p className="line-clamp-4 text-pretty text-xs leading-relaxed text-primary-foreground/85 sm:line-clamp-6 sm:text-sm">
              {doctorCardBio[doctor.slug] ?? doctor.short_bio}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-primary-foreground/15 pt-3 sm:mt-4 sm:pt-4">
            <Link
              href={`/echipa/${doctor.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-foreground hover:text-primary-foreground/80 sm:text-sm"
            >
              Vezi profilul
              <ArrowRight className="size-3.5 sm:size-4" />
            </Link>
            <span className="hidden items-center gap-1.5 text-xs text-primary-foreground/60 sm:inline-flex">
              <RotateCcw className="size-3.5" />
              Înapoi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
