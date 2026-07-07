import { Clock, MapPin, Phone } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import { AppointmentForm } from "@/components/home/appointment-form";
import { WhatsAppIcon } from "@/components/brand/social-icons";
import { contact } from "@/lib/site";
import type { Specialty } from "@/lib/supabase/types";

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  "Șoseaua Nicolina 14, Iași",
)}&z=15&output=embed`;

export function VisitSection({
  specialties,
}: {
  specialties: Pick<Specialty, "id" | "name">[];
}) {
  return (
    <Section id="contact" className="bg-card">
      <SectionHeading
        eyebrow="Vizitează-ne"
        title="Suntem aproape de tine, în inima Iașului"
        description="Programează o consultație completând formularul de mai jos sau sună-ne direct. Te așteptăm într-un spațiu cald și primitor."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Hartă + date de contact */}
        <div className="flex flex-col gap-6">
          <Reveal className="overflow-hidden rounded-3xl border border-border">
            <iframe
              src={MAP_SRC}
              title="Harta locației Anova Medical Clinic"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full lg:h-80"
            />
          </Reveal>

          <Reveal delay={0.08} className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-secondary p-5">
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                <MapPin className="size-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Adresă
                </p>
                <p className="mt-1 text-sm text-foreground">{contact.address}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-secondary p-5">
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                <Clock className="size-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Program
                </p>
                <div className="mt-1 space-y-0.5 text-sm text-foreground">
                  {contact.schedule.map((row) => (
                    <p key={row.days}>
                      {row.days}: {row.hours}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-secondary p-5 sm:col-span-2">
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                <Phone className="size-5" strokeWidth={1.75} />
              </span>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Telefon
                  </p>
                  <a
                    href={contact.phoneHref}
                    className="mt-1 block text-lg font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {contact.phone}
                  </a>
                </div>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-secondary"
                >
                  <WhatsAppIcon className="size-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Formular de programare */}
        <Reveal
          delay={0.12}
          className="rounded-3xl border border-border bg-background p-6 shadow-sm shadow-foreground/5 sm:p-8"
        >
          <h3 className="text-xl text-foreground">Programează o consultație</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Completează câmpurile, iar noi te sunăm pentru confirmare.
          </p>
          <div className="mt-6">
            <AppointmentForm specialties={specialties} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
