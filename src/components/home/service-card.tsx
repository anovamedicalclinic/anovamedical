import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SpecialtyIcon } from "@/lib/icons";
import { Reveal } from "@/components/reveal";
import { doctorPhoto } from "@/lib/doctor-photos";
import { cn } from "@/lib/utils";
import type { Doctor, Specialty } from "@/lib/supabase/types";

export function ServiceCard({
  specialty,
  highlights,
  doctors,
  imageSrc,
  reverse = false,
}: {
  specialty: Specialty;
  highlights: string[];
  doctors: Doctor[];
  imageSrc?: string | null;
  reverse?: boolean;
}) {
  return (
    <article className="group grid overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-foreground/5 lg:grid-cols-2">
      {/* Conținut - intră dinspre partea sa exterioară */}
      <Reveal
        x={reverse ? 28 : -28}
        className={cn(
          "flex flex-col gap-6 p-7 sm:p-9 lg:p-10",
          reverse ? "lg:order-2" : "lg:order-1",
        )}
      >
        <div className="flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary transition-transform duration-300 group-hover:scale-105">
            <SpecialtyIcon
              icon={specialty.icon}
              className="size-6"
              strokeWidth={1.75}
            />
          </span>
          <div>
            <h3 className="text-xl text-foreground">{specialty.name}</h3>
            {specialty.tagline && (
              <p className="text-sm text-muted-foreground">
                {specialty.tagline}
              </p>
            )}
          </div>
        </div>

        <ul className="space-y-2.5">
          {highlights.map((h, i) => (
            <Reveal
              key={h}
              as="li"
              delay={0.15 + i * 0.07}
              y={10}
              className="flex items-start gap-3 text-sm text-muted-foreground"
            >
              <Check
                className="mt-0.5 size-4 shrink-0 text-sage"
                strokeWidth={2.5}
              />
              <span>{h}</span>
            </Reveal>
          ))}
        </ul>

        {doctors.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-border pt-5">
            {doctors.slice(0, 4).map((d) => (
              <Link
                key={d.id}
                href={`/echipa/${d.slug}`}
                className="group/doc flex items-center gap-3"
              >
                <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary">
                  <Image
                    src={doctorPhoto(d)}
                    alt={d.name}
                    fill
                    sizes="36px"
                    className="object-cover object-top"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-foreground transition-colors group-hover/doc:text-primary">
                    {d.name}
                  </span>
                  {d.title && (
                    <span className="block truncate text-xs text-muted-foreground">
                      {d.title}
                    </span>
                  )}
                </span>
              </Link>
            ))}
          </div>
        )}

        <Link
          href={`/specialitati/${specialty.slug}`}
          className="group/link mt-auto inline-flex items-center gap-2 pt-1 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
        >
          Vezi detalii
          <ArrowRight className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" />
        </Link>
      </Reveal>

      {/* Panou vizual - imaginea reală dacă există, altfel panou branded.
          Intră dinspre partea opusă conținutului, cu micro-zoom. */}
      <Reveal
        scale={1.05}
        x={reverse ? -28 : 28}
        delay={0.08}
        className={cn(
          "relative order-first min-h-56 overflow-hidden lg:min-h-0",
          reverse ? "lg:order-1" : "lg:order-2",
          !imageSrc && "bg-gradient-to-br from-secondary via-accent to-sand/25",
        )}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={`Serviciu de ${specialty.name.toLowerCase()} la Anova Medical Clinic`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <>
            <div
              aria-hidden
              className="absolute -right-6 -top-8 size-48 rounded-full bg-sage/20 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute inset-0 flex items-center justify-center"
            >
              <SpecialtyIcon
                icon={specialty.icon}
                className="size-28 text-primary/20 transition-transform duration-500 group-hover:scale-105"
                strokeWidth={1}
              />
            </div>
          </>
        )}
      </Reveal>
    </article>
  );
}
