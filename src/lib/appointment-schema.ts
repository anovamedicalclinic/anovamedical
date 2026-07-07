import { z } from "zod";

export const appointmentSchema = z.object({
  fullName: z.string().trim().min(2, "Introdu numele complet."),
  phone: z
    .string()
    .trim()
    .regex(/^[+0-9()\s.-]{8,20}$/, "Introdu un număr de telefon valid.")
    .refine(
      (v) => (v.match(/\d/g)?.length ?? 0) >= 9,
      "Numărul de telefon pare prea scurt.",
    ),
  email: z
    .string()
    .trim()
    .email("Adresă de email invalidă.")
    .optional()
    .or(z.literal("")),
  specialtyId: z.string().optional().or(z.literal("")),
  preferredDate: z.string().optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  consent: z.boolean().refine((v) => v === true, {
    message: "Trebuie să accepți politica de confidențialitate.",
  }),
  // Honeypot anti-spam - trebuie să rămână gol.
  company: z.string().optional().or(z.literal("")),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

export type AppointmentResult = {
  ok: boolean;
  error?: string;
};
