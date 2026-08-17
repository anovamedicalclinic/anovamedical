import Link from "next/link";
import { ArrowRight, Inbox, Mail, TriangleAlert } from "lucide-react";
import { requireUser, roleCan } from "@/lib/auth/dal";
import { countAppointmentsByStatus, statusLabels } from "@/lib/admin/appointments";
import { getNotificationSettings, getSmtpSettings } from "@/lib/settings";
import { statusOrder } from "@/lib/admin/appointments";

/** Depinde de sesiune și de date private, deci nu se prerandează. */
export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const user = await requireUser();
  const role = user.profile.role;

  const canSeeAppointments = roleCan(role, "appointments");
  const canSeeSettings = roleCan(role, "settings");

  const counts = canSeeAppointments
    ? await countAppointmentsByStatus()
    : null;

  // Verificăm dacă emailul e configurat, ca adminul să afle aici, nu când pierde
  // prima cerere.
  const emailReady = canSeeSettings
    ? await (async () => {
        const [smtp, notifications] = await Promise.all([
          getSmtpSettings(),
          getNotificationSettings(),
        ]);
        return {
          smtp: Boolean(smtp),
          recipients: notifications.recipients.length,
          enabled: notifications.enabled,
        };
      })()
    : null;

  const firstName = (user.profile.full_name || user.email).split(/[\s@]/)[0];

  return (
    <div className="mx-auto max-w-4xl">
      <header>
        <h1 className="text-2xl text-foreground">Bun venit, {firstName}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          De aici administrezi conținutul site-ului și cererile de programare.
        </p>
      </header>

      {emailReady && (!emailReady.smtp || emailReady.recipients === 0) && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
          <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-600" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">
              Notificările pe email nu sunt gata
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {!emailReady.smtp
                ? "Contul de email al clinicii nu e conectat."
                : "Nu ai adăugat nicio adresă care să primească cererile."}{" "}
              Cererile se salvează oricum în panou, dar nu ajung pe mail.
            </p>
            <Link
              href="/admin/setari"
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              <Mail className="size-4" />
              Configurează în Setări
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      )}

      {counts && (
        <section className="mt-6">
          <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Cereri de programare
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {statusOrder.map((s) => (
              <Link
                key={s}
                href={`/admin/cereri?stare=${s}`}
                className="rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
              >
                <p className="text-2xl text-foreground">{counts[s]}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {statusLabels[s]}
                </p>
              </Link>
            ))}
          </div>

          <Link
            href="/admin/cereri"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <Inbox className="size-4" />
            Vezi toate cererile
            <ArrowRight className="size-3.5" />
          </Link>
        </section>
      )}
    </div>
  );
}
