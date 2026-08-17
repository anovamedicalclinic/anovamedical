"use client";

import { useActionState, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ImageUp,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormMessage, SubmitButton } from "@/components/admin/ui";
import {
  createDoctor,
  deleteDoctor,
  moveDoctor,
  updateDoctor,
  type DoctorState,
} from "@/lib/actions/doctors";
import { cn } from "@/lib/utils";

export type DoctorRow = {
  id: string;
  slug: string;
  name: string;
  title: string | null;
  credentials: string | null;
  shortBio: string | null;
  fullBio: string | null;
  photoUrl: string | null;
  /** Fotografia efectiv afișată pe site (poate veni din maparea locală). */
  displayPhoto: string;
  isFounder: boolean;
  specialtyIds: string[];
};

export type SpecialtyOption = { id: string; name: string };

const SHORT_BIO_MAX = 400;

/** Transformă un nume în slug, ca la salvare adresa să fie previzibilă. */
function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[ăâ]/g, "a")
    .replace(/[îí]/g, "i")
    .replace(/[șş]/g, "s")
    .replace(/[țţ]/g, "t")
    .normalize("NFD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function PhotoPicker({
  currentUrl,
  name,
}: {
  currentUrl: string | null;
  name: string;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="flex items-start gap-4">
      <div className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-xl border border-border bg-secondary">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element -- previzualizare locală (blob:), nu trece prin optimizator
          <img
            src={preview}
            alt=""
            className="size-full object-cover object-top"
          />
        ) : (
          <Image
            src={currentUrl || "/medici/Placeholder.webp"}
            alt={`Portret ${name}`}
            fill
            sizes="96px"
            className="object-cover object-top"
          />
        )}
      </div>

      <div className="min-w-0 flex-1 space-y-2">
        <Label htmlFor={`photo-${name}`} className="flex items-center gap-1.5">
          <ImageUp className="size-4" />
          Fotografie
        </Label>
        <Input
          id={`photo-${name}`}
          name="photo"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setPreview(file ? URL.createObjectURL(file) : null);
          }}
          className="cursor-pointer file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-secondary file:px-3 file:py-1 file:text-xs"
        />
        <p className="text-xs text-muted-foreground">
          Orice format (JPG, PNG, WebP), maximum 8 MB. Poza e decupată automat la
          formatul de portret folosit pe site, centrat pe față.
        </p>
      </div>
    </div>
  );
}

function DoctorFields({
  doctor,
  specialties,
}: {
  doctor?: DoctorRow;
  specialties: SpecialtyOption[];
}) {
  const [name, setName] = useState(doctor?.name ?? "");
  const [slug, setSlug] = useState(doctor?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(doctor));
  const [shortBio, setShortBio] = useState(doctor?.shortBio ?? "");

  const selected = new Set(doctor?.specialtyIds ?? []);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`name-${doctor?.id ?? "nou"}`}>Nume</Label>
          <Input
            id={`name-${doctor?.id ?? "nou"}`}
            name="name"
            required
            maxLength={120}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!slugTouched) setSlug(toSlug(e.target.value));
            }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`slug-${doctor?.id ?? "nou"}`}>Adresă pe site</Label>
          <Input
            id={`slug-${doctor?.id ?? "nou"}`}
            name="slug"
            required
            maxLength={80}
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(toSlug(e.target.value));
            }}
          />
          <p className="truncate text-xs text-muted-foreground">
            /echipa/{slug || "…"}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`title-${doctor?.id ?? "nou"}`}>Titlu</Label>
          <Input
            id={`title-${doctor?.id ?? "nou"}`}
            name="title"
            maxLength={120}
            defaultValue={doctor?.title ?? ""}
            placeholder="Medic specialist psihiatru"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`credentials-${doctor?.id ?? "nou"}`}>
            Grad profesional
          </Label>
          <Input
            id={`credentials-${doctor?.id ?? "nou"}`}
            name="credentials"
            maxLength={120}
            defaultValue={doctor?.credentials ?? ""}
            placeholder="Dr., medic primar"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor={`shortBio-${doctor?.id ?? "nou"}`}>
            Descriere scurtă (pe card)
          </Label>
          <span
            className={cn(
              "text-xs tabular-nums",
              shortBio.length > SHORT_BIO_MAX
                ? "font-medium text-destructive"
                : "text-muted-foreground",
            )}
          >
            {shortBio.length}/{SHORT_BIO_MAX}
          </span>
        </div>
        <Textarea
          id={`shortBio-${doctor?.id ?? "nou"}`}
          name="shortBio"
          rows={2}
          maxLength={SHORT_BIO_MAX}
          value={shortBio}
          onChange={(e) => setShortBio(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`fullBio-${doctor?.id ?? "nou"}`}>
          Descriere completă (pagina medicului)
        </Label>
        <Textarea
          id={`fullBio-${doctor?.id ?? "nou"}`}
          name="fullBio"
          rows={5}
          maxLength={4000}
          defaultValue={doctor?.fullBio ?? ""}
        />
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-foreground">
          Specialități
        </legend>
        <div className="flex flex-wrap gap-2">
          {specialties.map((s) => (
            <label
              key={s.id}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-primary"
            >
              <input
                type="checkbox"
                name="specialtyIds"
                value={s.id}
                defaultChecked={selected.has(s.id)}
                className="size-3.5 accent-[var(--primary)]"
              />
              {s.name}
            </label>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Un medic fără specialitate nu apare în caruselul de pe prima pagină.
        </p>
      </fieldset>

      <label className="flex items-center gap-2 text-sm">
        <input
          name="isFounder"
          type="checkbox"
          defaultChecked={doctor?.isFounder ?? false}
          className="size-4 accent-[var(--primary)]"
        />
        Membru fondator
      </label>

      <PhotoPicker
        currentUrl={doctor?.displayPhoto ?? null}
        name={doctor?.id ?? "nou"}
      />
    </>
  );
}

export function CreateDoctorForm({
  specialties,
}: {
  specialties: SpecialtyOption[];
}) {
  const [state, action] = useActionState<DoctorState, FormData>(
    createDoctor,
    {},
  );
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className="rounded-full"
      >
        <Plus className="size-4" />
        Adaugă un medic
      </Button>
    );
  }

  return (
    <form
      action={action}
      className="space-y-5 rounded-2xl border border-border bg-card p-5"
    >
      <h3 className="text-base text-foreground">Medic nou</h3>

      <DoctorFields specialties={specialties} />

      <FormMessage ok={state.ok} message={state.message} error={state.error} />

      <div className="flex gap-2">
        <SubmitButton pendingLabel="Se adaugă…">Adaugă</SubmitButton>
        <Button
          type="button"
          variant="ghost"
          onClick={() => setOpen(false)}
          className="rounded-full"
        >
          Renunță
        </Button>
      </div>
    </form>
  );
}

export function DoctorCardEditor({
  doctor,
  specialties,
  isFirst,
  isLast,
}: {
  doctor: DoctorRow;
  specialties: SpecialtyOption[];
  isFirst: boolean;
  isLast: boolean;
}) {
  const [state, action] = useActionState<DoctorState, FormData>(
    updateDoctor,
    {},
  );
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  const move = (direction: "up" | "down") => {
    startTransition(async () => {
      const result = await moveDoctor(doctor.id, direction);
      if (!result.ok) toast.error(result.error ?? "Nu am putut muta medicul.");
    });
  };

  const remove = () => {
    startTransition(async () => {
      const result = await deleteDoctor(doctor.id);
      if (result.ok) toast.success(result.message ?? "Șters.");
      else toast.error(result.error ?? "Nu am putut șterge.");
      setConfirming(false);
    });
  };

  return (
    <div className="rounded-2xl border border-border bg-card">
      <div className="flex items-center gap-3 p-4">
        <div className="relative aspect-[4/5] w-12 shrink-0 overflow-hidden rounded-lg bg-secondary">
          <Image
            src={doctor.displayPhoto}
            alt=""
            fill
            sizes="48px"
            className="object-cover object-top"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">
            {doctor.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {doctor.title || "—"}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label="Mută mai sus"
            disabled={isFirst || pending}
            onClick={() => move("up")}
          >
            <ChevronUp className="size-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label="Mută mai jos"
            disabled={isLast || pending}
            onClick={() => move("down")}
          >
            <ChevronDown className="size-4" />
          </Button>
          <Link
            href={`/echipa/${doctor.slug}`}
            target="_blank"
            aria-label={`Vezi pagina lui ${doctor.name}`}
            className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-primary"
          >
            <ExternalLink className="size-4" />
          </Link>
          <Button
            type="button"
            size="sm"
            variant={open ? "secondary" : "outline"}
            onClick={() => setOpen((v) => !v)}
            className="rounded-full"
          >
            {open ? "Închide" : "Editează"}
          </Button>
        </div>
      </div>

      {open && (
        <form action={action} className="space-y-5 border-t border-border p-5">
          <input type="hidden" name="id" value={doctor.id} />

          <DoctorFields doctor={doctor} specialties={specialties} />

          <FormMessage
            ok={state.ok}
            message={state.message}
            error={state.error}
          />

          <div className="flex flex-wrap items-center gap-2">
            <SubmitButton>Salvează</SubmitButton>

            {confirming ? (
              <>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  disabled={pending}
                  onClick={remove}
                  className="rounded-full"
                >
                  Confirmă ștergerea
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setConfirming(false)}
                  className="rounded-full"
                >
                  Renunță
                </Button>
              </>
            ) : (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                disabled={pending}
                onClick={() => setConfirming(true)}
                className="rounded-full text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-4" />
                Șterge
              </Button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
