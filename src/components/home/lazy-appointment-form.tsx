"use client";

import dynamic from "next/dynamic";
import type { Specialty } from "@/lib/supabase/types";

/**
 * Încărcare leneșă a formularului de programare (Calendar + react-hook-form +
 * zod + radix). Pe homepage formularul este sub prima vizualizare, așa că îl
 * scoatem din bundle-ul inițial pentru o încărcare mai rapidă; apare imediat ce
 * componenta intră în randare pe client.
 */
const AppointmentForm = dynamic(
  () => import("./appointment-form").then((m) => m.AppointmentForm),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[420px] animate-pulse rounded-2xl bg-secondary/60" />
    ),
  },
);

export function LazyAppointmentForm({
  specialties,
}: {
  specialties: Pick<Specialty, "id" | "name">[];
}) {
  return <AppointmentForm specialties={specialties} />;
}
