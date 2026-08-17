"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authorize } from "@/lib/auth/dal";
import { logAudit } from "@/lib/audit";
import { sendTestEmail, verifySmtp } from "@/lib/email";
import {
  getSmtpSettings,
  saveNotificationSettings,
  saveSmtpSettings,
  smtpSchema,
} from "@/lib/settings";

/**
 * Acțiunile din ecranul Setări. Toate cer rolul de administrator.
 *
 * Parola SMTP nu circulă niciodată spre browser. La salvare, un câmp gol
 * înseamnă „păstrează parola existentă”: altfel, orice modificare de port sau de
 * nume expeditor ar șterge parola, pentru că formularul nu o are de unde ști.
 */

export type SettingsState = {
  ok?: boolean;
  message?: string;
  error?: string;
};

const formSchema = z.object({
  host: z.string().trim().min(1, "Completează serverul SMTP.").max(255),
  port: z.coerce.number().int().min(1).max(65535),
  secure: z.boolean(),
  user: z.string().trim().min(1, "Completează utilizatorul.").max(255),
  password: z.string().max(255),
  fromName: z.string().trim().min(1, "Completează numele expeditorului.").max(120),
  fromEmail: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Adresa expeditorului nu e validă."))
    .or(z.literal("")),
});

function readForm(formData: FormData) {
  return {
    host: formData.get("host"),
    port: formData.get("port"),
    // Un checkbox nebifat nu apare deloc în FormData.
    secure: formData.get("secure") === "on",
    user: formData.get("user"),
    password: formData.get("password") ?? "",
    fromName: formData.get("fromName"),
    fromEmail: formData.get("fromEmail") ?? "",
  };
}

/** Completează parola din baza de date când formularul a lăsat câmpul gol. */
async function withExistingPassword(
  values: z.infer<typeof formSchema>,
): Promise<{ ok: true; value: z.infer<typeof smtpSchema> } | { ok: false; error: string }> {
  let password = values.password;

  if (!password) {
    const existing = await getSmtpSettings();
    if (!existing?.password) {
      return { ok: false, error: "Completează parola contului de email." };
    }
    password = existing.password;
  }

  const parsed = smtpSchema.safeParse({ ...values, password });
  if (!parsed.success) {
    return { ok: false, error: "Datele SMTP nu sunt valide." };
  }
  return { ok: true, value: parsed.data };
}

export async function saveSmtp(
  _state: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const auth = await authorize("settings");
  if (!auth.ok) return { error: auth.error };

  const parsed = formSchema.safeParse(readForm(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Date invalide." };
  }

  const merged = await withExistingPassword(parsed.data);
  if (!merged.ok) return { error: merged.error };

  // Verificăm înainte de a salva: nu are rost să păstrăm date care nu
  // funcționează, iar utilizatorul află imediat ce e greșit.
  const check = await verifySmtp(merged.value);
  if (!check.ok) {
    return { error: `Conectarea a eșuat: ${check.error}` };
  }

  try {
    await saveSmtpSettings(merged.value, auth.user.id);
    await logAudit({
      actorId: auth.user.id,
      actorEmail: auth.user.email,
      action: "update",
      entity: "settings",
      entityId: "smtp",
      // Deliberat fără parolă și fără utilizator în jurnal.
      details: { host: merged.value.host, port: merged.value.port },
    });

    revalidatePath("/admin/setari");
    revalidatePath("/admin");
    return { ok: true, message: "Contul de email a fost conectat." };
  } catch (err) {
    console.error("[settings] salvare SMTP:", err);
    return { error: "Nu am putut salva setările." };
  }
}

export async function sendTest(
  _state: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const auth = await authorize("settings");
  if (!auth.ok) return { error: auth.error };

  const to = z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email())
    .safeParse(formData.get("testEmail"));

  if (!to.success) {
    return { error: "Introdu o adresă de email validă pentru test." };
  }

  const result = await sendTestEmail(to.data);
  if (!result.ok) {
    return { error: `Trimiterea a eșuat: ${result.error}` };
  }

  return { ok: true, message: `Email de test trimis către ${to.data}.` };
}

const notificationsFormSchema = z.object({
  enabled: z.boolean(),
  recipients: z
    .array(z.string().trim().toLowerCase().pipe(z.email("Una dintre adrese nu e validă.")))
    .max(10, "Maximum 10 destinatari."),
});

export async function saveNotifications(
  _state: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const auth = await authorize("settings");
  if (!auth.ok) return { error: auth.error };

  // Adresele vin dintr-un singur câmp, separate prin virgulă sau linie nouă.
  const raw = String(formData.get("recipients") ?? "");
  const recipients = raw
    .split(/[\s,;]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const parsed = notificationsFormSchema.safeParse({
    enabled: formData.get("enabled") === "on",
    recipients,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Date invalide." };
  }

  try {
    await saveNotificationSettings(parsed.data, auth.user.id);
    await logAudit({
      actorId: auth.user.id,
      actorEmail: auth.user.email,
      action: "update",
      entity: "settings",
      entityId: "notifications",
      details: { count: parsed.data.recipients.length, enabled: parsed.data.enabled },
    });

    revalidatePath("/admin/setari");
    revalidatePath("/admin");
    return { ok: true, message: "Destinatarii au fost salvați." };
  } catch (err) {
    console.error("[settings] salvare notificări:", err);
    return { error: "Nu am putut salva destinatarii." };
  }
}
