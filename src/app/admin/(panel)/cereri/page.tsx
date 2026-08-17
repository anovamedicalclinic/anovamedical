import type { Metadata } from "next";
import Link from "next/link";
import { Inbox, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { requireRole } from "@/lib/auth/dal";
import {
  countAppointmentsByStatus,
  listAppointments,
  statusLabels,
  statusOrder,
} from "@/lib/admin/appointments";
import type { AppointmentStatus } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";
import { RequestCard, type RequestView } from "./request-card";

export const metadata: Metadata = { title: "Cereri de programare" };

/** Cererile conțin date de pacienți: niciodată prerandate, niciodată în cache. */
export const dynamic = "force-dynamic";

type Filter = AppointmentStatus | "all";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "Toate" },
  ...statusOrder.map((s) => ({ value: s as Filter, label: statusLabels[s] })),
];

export default async function CereriPage({
  searchParams,
}: {
  searchParams: Promise<{ stare?: string; caut?: string }>;
}) {
  await requireRole("appointments");

  const params = await searchParams;
  const status: Filter =
    params.stare && filters.some((f) => f.value === params.stare)
      ? (params.stare as Filter)
      : "all";
  const search = params.caut?.trim() ?? "";

  const [requests, counts] = await Promise.all([
    listAppointments({ status, search }),
    countAppointmentsByStatus(),
  ]);

  const views: RequestView[] = requests.map((r) => ({
    id: r.id,
    fullName: r.full_name,
    phone: r.phone,
    email: r.email,
    specialtyName: r.specialty_name,
    preferredDate: r.preferred_date,
    message: r.message,
    notes: r.notes,
    status: r.status,
    createdAt: r.created_at,
    emailStatus: r.email_status,
    emailError: r.email_error,
  }));

  return (
    <div className="mx-auto max-w-4xl">
      <header>
        <h1 className="text-2xl text-foreground">Cereri de programare</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tot ce vine din formularul de pe site. Aceleași cereri ajung și pe
          email, dacă notificările sunt configurate în Setări.
        </p>
      </header>

      {/* Filtre pe stare, ca linkuri: starea rămâne în URL și poate fi salvată. */}
      <div className="mt-6 flex flex-wrap gap-1.5">
        {filters.map((f) => {
          const active = f.value === status;
          const count = f.value === "all" ? undefined : counts[f.value];
          const query = new URLSearchParams();
          if (f.value !== "all") query.set("stare", f.value);
          if (search) query.set("caut", search);
          const href = query.size ? `/admin/cereri?${query}` : "/admin/cereri";

          return (
            <Link
              key={f.value}
              href={href}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
              {count !== undefined && count > 0 && (
                <span className={active ? "opacity-80" : "text-muted-foreground"}>
                  {count}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Căutare. Formular GET, deci nu are nevoie de JavaScript. */}
      <form method="get" className="mt-4 flex gap-2">
        {status !== "all" && <input type="hidden" name="stare" value={status} />}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="caut"
            defaultValue={search}
            placeholder="Caută după nume, telefon sau email"
            className="pl-9"
          />
        </div>
        <Button type="submit" variant="outline" className="rounded-full">
          Caută
        </Button>
      </form>

      {views.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <Inbox className="mx-auto size-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            {search || status !== "all"
              ? "Nicio cerere care să corespundă filtrului."
              : "Încă nu a venit nicio cerere prin formular."}
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {views.map((view) => (
            <RequestCard key={view.id} request={view} />
          ))}
        </div>
      )}
    </div>
  );
}
