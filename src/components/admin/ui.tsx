"use client";

import { useFormStatus } from "react-dom";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Piese mărunte refolosite în tot panoul: butonul care își arată singur starea
 * de trimitere și banda de mesaj după o acțiune.
 */

/**
 * Buton de submit care se dezactivează cât timp acțiunea rulează.
 *
 * Folosește `useFormStatus`, deci trebuie să fie copil al formularului, nu
 * componenta care îl randează - altfel hook-ul nu vede starea.
 */
export function SubmitButton({
  children,
  pendingLabel = "Se salvează…",
  className,
  variant,
  size,
  disabled,
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending || disabled}
      variant={variant}
      size={size}
      className={cn("rounded-full", className)}
    >
      {pending ? pendingLabel : children}
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
