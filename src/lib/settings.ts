import "server-only";

import { z } from "zod";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";

/**
 * Setările private ale aplicației (`app_settings`).
 *
 * Tabelul nu are nicio policy RLS, deci se poate atinge exclusiv cu service
 * role. Toate funcțiile de aici presupun că apelantul a verificat deja rolul de
 * administrator (vezi `authorize("settings")`).
 *
 * Parola SMTP nu părăsește niciodată serverul: `getSmtpSettingsForForm` o
 * înlocuiește cu un indicator boolean, iar la salvare un câmp gol înseamnă
 * „păstrează parola existentă”, nu „șterge-o”.
 */

export const SMTP_KEY = "smtp";
export const NOTIFICATIONS_KEY = "notifications";

export const smtpSchema = z.object({
  host: z.string().trim().min(1).max(255),
  port: z.coerce.number().int().min(1).max(65535),
  /** cPanel expune de regulă 465 cu TLS implicit sau 587 cu STARTTLS. */
  secure: z.boolean(),
  user: z.string().trim().min(1).max(255),
  password: z.string().min(1).max(255),
  fromName: z.string().trim().min(1).max(120),
  fromEmail: z.string().trim().toLowerCase().pipe(z.email()).or(z.literal("")),
});

export type SmtpSettings = z.infer<typeof smtpSchema>;

export const notificationsSchema = z.object({
  /** Adresele care primesc cererile de programare. */
  recipients: z.array(z.string().trim().toLowerCase().pipe(z.email())).max(10),
  enabled: z.boolean(),
});

export type NotificationSettings = z.infer<typeof notificationsSchema>;

async function readSetting<T>(
  key: string,
  schema: z.ZodType<T>,
): Promise<T | null> {
  if (!isAdminConfigured()) return null;

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("app_settings")
      .select("value")
      .eq("key", key)
      .maybeSingle();

    if (error) throw error;
    if (!data?.value) return null;

    const parsed = schema.safeParse(data.value);
    if (!parsed.success) {
      console.warn(`[settings] valoare invalidă pentru "${key}"`);
      return null;
    }
    return parsed.data;
  } catch (err) {
    console.error(`[settings] nu am putut citi "${key}":`, err);
    return null;
  }
}

async function writeSetting(
  key: string,
  value: unknown,
  updatedBy: string,
): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("app_settings").upsert(
    {
      key,
      value: value as never,
      updated_by: updatedBy,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" },
  );
  if (error) throw error;
}

export async function getSmtpSettings(): Promise<SmtpSettings | null> {
  return readSetting(SMTP_KEY, smtpSchema);
}

export async function saveSmtpSettings(
  value: SmtpSettings,
  updatedBy: string,
): Promise<void> {
  await writeSetting(SMTP_KEY, value, updatedBy);
}

export async function getNotificationSettings(): Promise<NotificationSettings> {
  return (
    (await readSetting(NOTIFICATIONS_KEY, notificationsSchema)) ?? {
      recipients: [],
      enabled: true,
    }
  );
}

export async function saveNotificationSettings(
  value: NotificationSettings,
  updatedBy: string,
): Promise<void> {
  await writeSetting(NOTIFICATIONS_KEY, value, updatedBy);
}

/** Varianta sigură pentru interfață: fără parolă, doar dacă există una. */
export type SmtpFormValues = Omit<SmtpSettings, "password"> & {
  hasPassword: boolean;
};

export async function getSmtpSettingsForForm(): Promise<SmtpFormValues | null> {
  const settings = await getSmtpSettings();
  if (!settings) return null;
  const { password, ...rest } = settings;
  return { ...rest, hasPassword: password.length > 0 };
}
