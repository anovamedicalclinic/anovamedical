import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { doctorPhoto } from "@/lib/doctor-photos";
import type { Doctor } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

/**
 * Card de medic. Dacă `photo_url` lipsește, afișează un placeholder elegant
 * cu inițialele pe fundal cremă.
 * TODO: înlocuiește cu fotografiile reale furnizate de client.
 */
export function DoctorCard({
  doctor,
}: {
  doctor: Pick<
    Doctor,
    "slug" | "name" | "title" | "credentials" | "short_bio" | "photo_url"
  >;
}) {
  return (
    <Link
      href={`/echipa/${doctor.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-colors duration-300 hover:border-primary/30"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <Image
          src={doctorPhoto(doctor)}
          alt={`Portret ${doctor.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4 sm:gap-1.5 sm:p-6">
        {doctor.credentials && (
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-sage sm:text-xs sm:tracking-[0.14em]">
            {doctor.credentials}
          </span>
        )}
        <h3 className="flex items-start justify-between gap-1.5 text-base leading-tight text-foreground sm:text-lg">
          {doctor.name}
          <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:mt-1" />
        </h3>
        {doctor.title && (
          <p className="text-xs text-muted-foreground sm:text-sm">
            {doctor.title}
          </p>
        )}
      </div>
    </Link>
  );
}

export function DoctorPlaceholder({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-accent",
        className,
      )}
    >
      <span className="font-heading text-5xl font-medium text-primary/40">
        {initials(name)}
      </span>
    </div>
  );
}
