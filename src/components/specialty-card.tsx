import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SpecialtyIcon } from "@/lib/icons";
import type { Specialty } from "@/lib/supabase/types";

/** Card de specialitate - iconiță, nume, summary, link spre pagina dedicată. */
export function SpecialtyCard({
  specialty,
}: {
  specialty: Pick<Specialty, "slug" | "name" | "summary" | "icon">;
}) {
  return (
    <Link
      href={`/specialitati/${specialty.slug}`}
      className="group flex h-full flex-col gap-5 rounded-3xl border border-border bg-card p-8 transition-colors duration-300 hover:border-primary/30 hover:bg-secondary"
    >
      <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <SpecialtyIcon icon={specialty.icon} className="size-6" strokeWidth={1.75} />
      </span>
      <div className="space-y-2">
        <h3 className="text-xl text-foreground">{specialty.name}</h3>
        <p className="text-pretty text-muted-foreground">{specialty.summary}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary">
        Află mai mult
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
