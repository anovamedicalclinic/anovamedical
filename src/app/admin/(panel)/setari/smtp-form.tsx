"use client";

import { useActionState } from "react";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormMessage, SubmitButton } from "@/components/admin/ui";
import {
  saveNotifications,
  saveSmtp,
  sendTest,
  type SettingsState,
} from "@/lib/actions/settings";
import type { SmtpFormValues } from "@/lib/settings";

export function SmtpForm({ initial }: { initial: SmtpFormValues | null }) {
  const [state, action] = useActionState<SettingsState, FormData>(saveSmtp, {});

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="host">Server SMTP</Label>
          <Input
            id="host"
            name="host"
            required
            defaultValue={initial?.host ?? ""}
            placeholder="mail.anovamedical.ro"
          />
          <p className="text-xs text-muted-foreground">
            În cPanel: Email Accounts → Connect Devices → Outgoing Server.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="port">Port</Label>
          <Input
            id="port"
            name="port"
            type="number"
            required
            min={1}
            max={65535}
            defaultValue={initial?.port ?? 465}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="secure">Criptare</Label>
          <label className="flex h-9 items-center gap-2 rounded-md border border-input px-3 text-sm">
            <input
              id="secure"
              name="secure"
              type="checkbox"
              defaultChecked={initial?.secure ?? true}
              className="size-4 accent-[var(--primary)]"
            />
            TLS de la conectare
          </label>
          <p className="text-xs text-muted-foreground">
            Bifat pentru portul 465. Debifat pentru 587 (STARTTLS).
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="user">Utilizator</Label>
          <Input
            id="user"
            name="user"
            required
            autoComplete="off"
            defaultValue={initial?.user ?? ""}
            placeholder="contact@anovamedical.ro"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Parolă</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder={initial?.hasPassword ? "••••••••  (nemodificată)" : ""}
            required={!initial?.hasPassword}
          />
          <p className="text-xs text-muted-foreground">
            {initial?.hasPassword
              ? "Lasă gol ca să păstrezi parola actuală."
              : "Parola contului de email din cPanel."}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fromName">Nume expeditor</Label>
          <Input
            id="fromName"
            name="fromName"
            required
            defaultValue={initial?.fromName ?? "Anova Medical Clinic"}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fromEmail">Adresă expeditor</Label>
          <Input
            id="fromEmail"
            name="fromEmail"
            type="email"
            defaultValue={initial?.fromEmail ?? ""}
            placeholder="la fel ca utilizatorul"
          />
          <p className="text-xs text-muted-foreground">
            Lasă gol dacă e aceeași cu utilizatorul. Multe servere cPanel resping
            un expeditor diferit de contul autentificat.
          </p>
        </div>
      </div>

      <FormMessage ok={state.ok} message={state.message} error={state.error} />

      <div className="flex items-center gap-3">
        <SubmitButton pendingLabel="Se verifică…">
          Verifică și salvează
        </SubmitButton>
        <p className="text-xs text-muted-foreground">
          Conexiunea e testată înainte de salvare.
        </p>
      </div>
    </form>
  );
}

export function TestEmailForm({ defaultTo }: { defaultTo: string }) {
  const [state, action] = useActionState<SettingsState, FormData>(sendTest, {});

  return (
    <form action={action} className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="testEmail">Trimite un email de test către</Label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id="testEmail"
            name="testEmail"
            type="email"
            required
            defaultValue={defaultTo}
            className="sm:flex-1"
          />
          <SubmitButton variant="outline" pendingLabel="Se trimite…">
            Trimite test
          </SubmitButton>
        </div>
      </div>

      <FormMessage ok={state.ok} message={state.message} error={state.error} />
    </form>
  );
}

export function NotificationsForm({
  recipients,
  enabled,
}: {
  recipients: string[];
  enabled: boolean;
}) {
  const [state, action] = useActionState<SettingsState, FormData>(
    saveNotifications,
    {},
  );

  return (
    <form action={action} className="space-y-4">
      <label className="flex items-center gap-2 text-sm">
        <input
          name="enabled"
          type="checkbox"
          defaultChecked={enabled}
          className="size-4 accent-[var(--primary)]"
        />
        Trimite un email la fiecare cerere nouă
      </label>

      <div className="space-y-2">
        <Label htmlFor="recipients">Destinatari</Label>
        <Textarea
          id="recipients"
          name="recipients"
          rows={3}
          defaultValue={recipients.join("\n")}
          placeholder={"receptie@anovamedical.ro\ncontact@anovamedical.ro"}
        />
        <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          Câte o adresă pe rând, maximum 10. Cererile rămân vizibile în panou
          chiar dacă emailul nu pleacă.
        </p>
      </div>

      <FormMessage ok={state.ok} message={state.message} error={state.error} />

      <SubmitButton>Salvează destinatarii</SubmitButton>
    </form>
  );
}
