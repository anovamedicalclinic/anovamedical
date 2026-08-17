"use client";

import { useState, useTransition } from "react";
import {
  AlertTriangle,
  CalendarDays,
  Check,
  Mail,
  MessageSquare,
  Phone,
  Stethoscope,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  updateAppointmentNotes,
  updateAppointmentStatus,
} from "@/lib/actions/appointments-admin";
import { cn } from "@/lib/utils";
import type { AppointmentStatus } from "@/lib/supabase/types";

export type RequestView = {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  specialtyName: string | null;
  preferredDate: string | null;
  message: string | null;
  notes: string | null;
  status: AppointmentStatus;
  createdAt: string;
  emailStatus: "sent" | "failed" | null;
  emailError: string | null;
};

const statusStyles: Record<AppointmentStatus, string> = {
  new: "bg-primary/10 text-primary",
  contacted: "bg-amber-500/15 text-amber-700",
  scheduled: "bg-emerald-600/15 text-emerald-700",
  cancelled: "bg-muted text-muted-foreground",
};

const statusLabels: Record<AppointmentStatus, string> = {
  new: "Nouă",
  contacted: "Contactat",
  scheduled: "Programat",
  cancelled: "Anulată",
};

const nextStatuses: AppointmentStatus[] = [
  "new",
  "contacted",
  "scheduled",
  "cancelled",
];

export function RequestCard({ request }: { request: RequestView }) {
  const [status, setStatus] = useState(request.status);
  const [notes, setNotes] = useState(request.notes ?? "");
  const [savedNotes, setSavedNotes] = useState(request.notes ?? "");
  const [pending, startTransition] = useTransition();

  const changeStatus = (next: AppointmentStatus) => {
    if (next === status) return;
    const previous = status;
    setStatus(next); // optimist, ca lista să răspundă imediat
    startTransition(async () => {
      const result = await updateAppointmentStatus({ id: request.id, status: next });
      if (!result.ok) {
        setStatus(previous);
        toast.error(result.error);
      }
    });
  };

  const saveNotes = () => {
    startTransition(async () => {
      const result = await updateAppointmentNotes({ id: request.id, notes });
      if (result.ok) {
        setSavedNotes(notes);
        toast.success("Notiță salvată.");
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <article className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-medium text-foreground">
            {request.fullName}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {new Date(request.createdAt).toLocaleString("ro-RO", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>

        <span
          className={cn(
            "shrink-0 rounded-full px-3 py-1 text-xs font-medium",
            statusStyles[status],
          )}
        >
          {statusLabels[status]}
        </span>
      </div>

      <dl className="mt-4 grid gap-2.5 text-sm sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <Phone className="size-4 shrink-0 text-muted-foreground" />
          <a href={`tel:${request.phone}`} className="text-foreground hover:text-primary">
            {request.phone}
          </a>
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <Mail className="size-4 shrink-0 text-muted-foreground" />
          {request.email ? (
            <a
              href={`mailto:${request.email}`}
              className="truncate text-foreground hover:text-primary"
            >
              {request.email}
            </a>
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Stethoscope className="size-4 shrink-0 text-muted-foreground" />
          <span className="text-foreground">{request.specialtyName ?? "—"}</span>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
          <span className="text-foreground">
            {request.preferredDate
              ? new Date(request.preferredDate).toLocaleDateString("ro-RO", {
                  dateStyle: "long",
                })
              : "—"}
          </span>
        </div>
      </dl>

      {request.message && (
        <div className="mt-4 flex gap-2 rounded-xl bg-secondary/60 p-3 text-sm">
          <MessageSquare className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <p className="whitespace-pre-wrap text-foreground">{request.message}</p>
        </div>
      )}

      {request.emailStatus === "failed" && (
        <p className="mt-4 flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-800">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <span>
            Notificarea pe email nu a plecat
            {request.emailError ? `: ${request.emailError}` : "."} Cererea este
            salvată; verifică setările de email.
          </span>
        </p>
      )}

      {/* Stare */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {nextStatuses.map((s) => (
          <Button
            key={s}
            type="button"
            size="sm"
            variant={s === status ? "default" : "outline"}
            disabled={pending}
            onClick={() => changeStatus(s)}
            className="rounded-full text-xs"
          >
            {s === status && <Check className="size-3.5" />}
            {statusLabels[s]}
          </Button>
        ))}
      </div>

      {/* Notiță internă */}
      <div className="mt-4 space-y-2">
        <label
          htmlFor={`notes-${request.id}`}
          className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground"
        >
          Notiță internă
        </label>
        <Textarea
          id={`notes-${request.id}`}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          maxLength={2000}
          placeholder="Ex: sunat, revin joi dimineață."
        />
        {notes !== savedNotes && (
          <Button
            type="button"
            size="sm"
            onClick={saveNotes}
            disabled={pending}
            className="rounded-full"
          >
            {pending ? "Se salvează…" : "Salvează notița"}
          </Button>
        )}
      </div>
    </article>
  );
}
