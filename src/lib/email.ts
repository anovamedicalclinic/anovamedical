import "server-only";

import nodemailer from "nodemailer";
import { getNotificationSettings, getSmtpSettings } from "@/lib/settings";
import type { SmtpSettings } from "@/lib/settings";

/**
 * Trimiterea emailurilor prin SMTP-ul clinicii (mail pe hosting cPanel).
 *
 * Configurarea vine din `app_settings`, nu din variabile de mediu, ca să poată
 * fi schimbată din panou fără redeploy. De aceea transportul se construiește la
 * fiecare trimitere: o parolă schimbată trebuie să aibă efect imediat, iar
 * volumul (câteva emailuri pe zi) nu justifică un pool de conexiuni.
 */

const TIMEOUT = 15_000;

function buildTransport(smtp: SmtpSettings) {
  return nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    // 465 = TLS de la început; 587 = conexiune simplă, apoi STARTTLS.
    secure: smtp.secure,
    auth: { user: smtp.user, pass: smtp.password },
    connectionTimeout: TIMEOUT,
    greetingTimeout: TIMEOUT,
    socketTimeout: TIMEOUT,
  });
}

function fromHeader(smtp: SmtpSettings): string {
  // Multe servere cPanel resping un `From` care nu corespunde contului
  // autentificat, deci implicit folosim chiar utilizatorul SMTP.
  const address = smtp.fromEmail || smtp.user;
  return `"${smtp.fromName}" <${address}>`;
}

export type SendResult =
  | { ok: true }
  | { ok: false; error: string; skipped?: boolean };

function describe(err: unknown): string {
  if (err instanceof Error) {
    const code = (err as { code?: string }).code;
    // Traducem cele mai frecvente erori într-un mesaj acționabil.
    if (code === "EAUTH") return "Utilizator sau parolă SMTP greșite.";
    if (code === "ECONNREFUSED") return "Serverul a refuzat conexiunea. Verifică gazda și portul.";
    if (code === "ETIMEDOUT" || code === "ECONNECTION")
      return "Conexiunea a expirat. Verifică gazda, portul și dacă TLS e potrivit.";
    if (code === "ESOCKET")
      return "Eroare de TLS. Încearcă portul 465 cu TLS sau 587 fără.";
    return err.message;
  }
  return "Eroare necunoscută la trimitere.";
}

/** Verifică datele SMTP fără a trimite nimic. */
export async function verifySmtp(smtp: SmtpSettings): Promise<SendResult> {
  try {
    await buildTransport(smtp).verify();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: describe(err) };
  }
}

export async function sendMail(message: {
  to: string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}): Promise<SendResult> {
  const smtp = await getSmtpSettings();
  if (!smtp) {
    return { ok: false, error: "SMTP neconfigurat.", skipped: true };
  }
  if (message.to.length === 0) {
    return { ok: false, error: "Nu există destinatari configurați.", skipped: true };
  }

  try {
    await buildTransport(smtp).sendMail({
      from: fromHeader(smtp),
      to: message.to.join(", "),
      replyTo: message.replyTo,
      subject: message.subject,
      text: message.text,
      html: message.html,
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: describe(err) };
  }
}

/** Scapă textul introdus de vizitator înainte de a-l pune în HTML. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type AppointmentEmailData = {
  fullName: string;
  phone: string;
  email: string | null;
  specialtyName: string | null;
  preferredDate: string | null;
  message: string | null;
};

/**
 * Notificarea către clinică pentru o cerere nouă.
 *
 * Conținutul vine de la un vizitator anonim, deci fiecare câmp este escapat.
 * `replyTo` este setat pe adresa pacientului (când există), ca un Răspunde din
 * clientul de mail să ajungă direct la el.
 */
export async function sendAppointmentNotification(
  data: AppointmentEmailData,
): Promise<SendResult> {
  const notifications = await getNotificationSettings();
  if (!notifications.enabled) {
    return { ok: false, error: "Notificările sunt dezactivate.", skipped: true };
  }

  const rows: [string, string][] = [
    ["Nume", data.fullName],
    ["Telefon", data.phone],
    ["Email", data.email ?? "—"],
    ["Specialitate", data.specialtyName ?? "—"],
    ["Dată preferată", data.preferredDate ?? "—"],
    ["Mesaj", data.message ?? "—"],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const html = `<!doctype html>
<html lang="ro"><body style="margin:0;padding:24px;background:#f4f2ef;font-family:Arial,Helvetica,sans-serif;color:#1f2421">
  <table role="presentation" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;padding:24px">
    <tr><td>
      <h1 style="margin:0 0 4px;font-size:18px">Cerere nouă de programare</h1>
      <p style="margin:0 0 20px;font-size:13px;color:#6b7280">Anova Medical Clinic</p>
      <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `<tr>
          <td style="padding:8px 0;color:#6b7280;width:130px;vertical-align:top">${escapeHtml(label)}</td>
          <td style="padding:8px 0;vertical-align:top;white-space:pre-wrap">${escapeHtml(value)}</td>
        </tr>`,
          )
          .join("")}
      </table>
      <p style="margin:20px 0 0;font-size:12px;color:#6b7280">
        Cererea apare și în panoul de administrare, la Cereri de programare.
      </p>
    </td></tr>
  </table>
</body></html>`;

  return sendMail({
    to: notifications.recipients,
    subject: `Cerere de programare — ${data.fullName}`,
    text,
    html,
    replyTo: data.email ?? undefined,
  });
}

/** Email de probă, pentru butonul de test din Setări. */
export async function sendTestEmail(to: string): Promise<SendResult> {
  return sendMail({
    to: [to],
    subject: "Test — Anova Medical Clinic",
    text: "Configurarea SMTP funcționează. Acest mesaj a fost trimis din panoul de administrare.",
    html: `<p style="font-family:Arial,Helvetica,sans-serif;font-size:14px">
      Configurarea SMTP funcționează. Acest mesaj a fost trimis din panoul de administrare.
    </p>`,
  });
}
