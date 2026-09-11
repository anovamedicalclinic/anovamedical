"use client";

import { startTransition, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Piese mărunte refolosite în tot panoul: butonul care își arată singur starea
 * de trimitere, banda de mesaj după o acțiune și legătura formular-acțiune.
 */

/**
 * Leagă un formular de o Server Action fără golirea automată din React 19.
 *
 * Cu `<form action={...}>`, React resetează câmpurile necontrolate după ORICE
 * acțiune care nu aruncă - inclusiv după una care întoarce `{ error }`. Un
 * slug duplicat sau o conexiune SMTP respinsă ștergea astfel tot ce se scrisese.
 * Aici formularul e trimis din `onSubmit`, deci câmpurile rămân neatinse, iar
 * `saved` crește la fiecare salvare reușită: folosit ca `key`, reface câmpurile
 * din datele proaspete (și golește formularele de adăugare, ca o a doua apăsare
 * să nu creeze un duplicat).
 */
export function useFormAction<S>(
  action: (state: S, formData: FormData) => Promise<S>,
  initial: S,
) {
  const [{ state, saved }, dispatch, pending] = useActionState(
    async (prev: { state: S; saved: number }, formData: FormData) => {
      const next = await action(prev.state, formData);
      const ok = (next as { ok?: boolean } | undefined)?.ok === true;
      return { state: next, saved: prev.saved + (ok ? 1 : 0) };
    },
    { state: initial, saved: 0 },
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => dispatch(formData));
  };

  return { state, onSubmit, pending, saved };
}

/** Limita pozelor încărcate din panou; aceeași ca în `src/lib/images.ts`. */
export const MAX_PHOTO_MB = 8;

/**
 * Fișierul ales într-un câmp de fotografie, sau null. Unul prea mare e respins
 * pe loc, cu mesaj, în loc să plece spre server și să fie refuzat acolo.
 */
export function acceptPhoto(input: HTMLInputElement): File | null {
  const file = input.files?.[0] ?? null;
  if (file && file.size > MAX_PHOTO_MB * 1024 * 1024) {
    input.value = "";
    toast.error(
      `Fotografia are ${(file.size / 1024 / 1024).toFixed(1)} MB. Limita este ${MAX_PHOTO_MB} MB.`,
    );
    return null;
  }
  return file;
}

/**
 * Buton de submit care se dezactivează cât timp acțiunea rulează.
 *
 * Formularele legate cu `useFormAction` îi dau starea prin `pending`. Fără ea,
 * cade pe `useFormStatus`, care vede doar `<form action>` - și doar dacă
 * butonul e copil al formularului.
 */
export function SubmitButton({
  children,
  pendingLabel = "Se salvează…",
  className,
  variant,
  size,
  disabled,
  pending,
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  disabled?: boolean;
  pending?: boolean;
}) {
  const status = useFormStatus();
  const isPending = pending ?? status.pending;

  return (
    <Button
      type="submit"
      disabled={isPending || disabled}
      variant={variant}
      size={size}
      className={cn("rounded-full", className)}
    >
      {isPending ? pendingLabel : children}
    </Button>
  );
}

/** Rezultatul unei acțiuni: verde pentru reușită, roșu pentru eroare. */
export function FormMessage({
  ok,
  message,
  error,
}: {
  ok?: boolean;
  message?: string;
  error?: string;
}) {
  if (!error && !(ok && message)) return null;

  const isError = Boolean(error);

  return (
    <p
      role={isError ? "alert" : "status"}
      className={cn(
        "flex items-start gap-2 rounded-xl border p-3 text-sm",
        isError
          ? "border-destructive/30 bg-destructive/5 text-destructive"
          : "border-emerald-600/30 bg-emerald-600/5 text-emerald-700",
      )}
    >
      {isError ? (
        <AlertCircle className="mt-0.5 size-4 shrink-0" />
      ) : (
        <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
      )}
      {error ?? message}
    </p>
  );
}
