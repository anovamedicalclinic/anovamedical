"use client";

import { useActionState, useState, useTransition } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, ImageUp, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage, SubmitButton } from "@/components/admin/ui";
import {
  createStaff,
  deleteStaff,
  moveStaff,
  updateStaff,
  type StaffState,
} from "@/lib/actions/staff";

export type StaffRow = {
  id: string;
  name: string;
  role: string;
  photoUrl: string | null;
  isPublished: boolean;
};

function Fields({ member }: { member?: StaffRow }) {
  const [preview, setPreview] = useState<string | null>(null);
  const key = member?.id ?? "nou";

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`name-${key}`}>Nume</Label>
          <Input
            id={`name-${key}`}
            name="name"
            required
            maxLength={120}
            defaultValue={member?.name ?? ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`role-${key}`}>Rol</Label>
          <Input
            id={`role-${key}`}
            name="role"
            required
            maxLength={120}
            defaultValue={member?.role ?? ""}
            placeholder="Asistentă medicală"
          />
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-xl border border-border bg-secondary">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element -- previzualizare locală (blob:)
            <img
              src={preview}
              alt=""
              className="size-full object-cover object-top"
            />
          ) : (
            <Image
              src={member?.photoUrl || "/medici/Placeholder.webp"}
              alt=""
              fill
              sizes="96px"
              className="object-cover object-top"
            />
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <Label htmlFor={`photo-${key}`} className="flex items-center gap-1.5">
            <ImageUp className="size-4" />
            Fotografie
          </Label>
          <Input
            id={`photo-${key}`}
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
            Decupată automat la formatul de portret folosit pe site.
          </p>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          name="isPublished"
          type="checkbox"
          defaultChecked={member?.isPublished ?? true}
          className="size-4 accent-[var(--primary)]"
        />
        Vizibil pe site
      </label>
    </>
  );
}

export function CreateStaffForm() {
  const [state, action] = useActionState<StaffState, FormData>(createStaff, {});
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
        Adaugă un membru
      </Button>
    );
  }

  return (
    <form
      action={action}
      className="space-y-5 rounded-2xl border border-border bg-card p-5"
    >
      <h3 className="text-base text-foreground">Membru nou</h3>

      <Fields />

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

export function StaffCardEditor({
  member,
  isFirst,
  isLast,
}: {
  member: StaffRow;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [state, action] = useActionState<StaffState, FormData>(updateStaff, {});
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  const move = (direction: "up" | "down") => {
    startTransition(async () => {
      const result = await moveStaff(member.id, direction);
      if (!result.ok) toast.error(result.error ?? "Nu am putut muta membrul.");
    });
  };

  const remove = () => {
    startTransition(async () => {
      const result = await deleteStaff(member.id);
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
            src={member.photoUrl || "/medici/Placeholder.webp"}
            alt=""
            fill
            sizes="48px"
            className="object-cover object-top"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">
            {member.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {member.role}
            {!member.isPublished && " · ascuns"}
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
          <input type="hidden" name="id" value={member.id} />

          <Fields member={member} />

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
