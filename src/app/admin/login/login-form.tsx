"use client";

import { AlertCircle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormAction } from "@/components/admin/ui";
import { signIn, type LoginState } from "@/lib/actions/auth";

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  // Prin `useFormAction`, ca o parolă greșită să nu golească și adresa de email.
  const { state, onSubmit, pending } = useFormAction<LoginState>(
    signIn,
    undefined,
  );

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {redirectTo && <input type="hidden" name="redirectTo" value={redirectTo} />}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          autoFocus
          placeholder="nume@anovamedical.ro"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Parolă</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>

      {state?.error && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={pending} className="w-full rounded-full">
        {pending ? "Se verifică…" : "Intră în panou"}
        {!pending && <LogIn className="size-4" />}
      </Button>
    </form>
  );
}
