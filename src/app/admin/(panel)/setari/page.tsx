import type { Metadata } from "next";
import { Mail, ShieldCheck } from "lucide-react";
import { requireRole } from "@/lib/auth/dal";
import {
  getNotificationSettings,
  getSmtpSettingsForForm,
} from "@/lib/settings";
import { NotificationsForm, SmtpForm, TestEmailForm } from "./smtp-form";

export const metadata: Metadata = { title: "Setări" };

/** Conține configurări private; nu se prerandează și nu se pune în cache. */
export const dynamic = "force-dynamic";

export default async function SetariPage() {
  const user = await requireRole("settings");

  const [smtp, notifications] = await Promise.all([
    getSmtpSettingsForForm(),
    getNotificationSettings(),
  ]);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <h1 className="text-2xl text-foreground">Setări</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Contul de email al clinicii și adresele care primesc cererile de
          programare.
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <Mail className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <h2 className="text-lg text-foreground">Cont de email (cPanel)</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Emailurile pleacă prin serverul tău de mail, de pe adresa clinicii.
            </p>
          </div>
        </div>

        <div className="mt-5">
          <SmtpForm initial={smtp} />
        </div>

        {smtp && (
          <div className="mt-6 border-t border-border pt-5">
            <TestEmailForm defaultTo={user.email} />
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h2 className="text-lg text-foreground">Notificări pentru cereri</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Cine primește pe email cererile venite din formular.
        </p>

        <div className="mt-5">
          <NotificationsForm
            recipients={notifications.recipients}
            enabled={notifications.enabled}
          />
        </div>
      </section>

      <p className="flex items-start gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-4 shrink-0" />
        Parola contului de email este păstrată într-un tabel accesibil doar
        serverului și nu este trimisă niciodată către browser, nici măcar ție,
        când deschizi această pagină.
      </p>
    </div>
  );
}
