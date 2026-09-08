import { Clock, Phone } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import { LazyAppointmentForm } from "@/components/home/lazy-appointment-form";
import { WhatsAppIcon } from "@/components/brand/social-icons";
import { Locations } from "@/components/layout/locations";
import { LocationsMap } from "@/components/layout/locations-map";
import { contact } from "@/lib/site";
import type { Specialty } from "@/lib/supabase/types";
import type { ContentReader } from "@/lib/content/get";

export function VisitSection({
  specialties,
  content,
}: {
  specialties: Pick<Specialty, "id" | "name">[];
  content: ContentReader;
}) {
  return (
    <Section id="contact" blend className="bg-card">
      <SectionHeading
        eyebrow={content("home.visit.eyebrow")}
        title={content("home.visit.title")}
        description={content("home.visit.description")}
      />

      {/*
        Aceeași structură ca pe pagina de contact: formularul pe un rând
        întreg, sediile dedesubt. Înghesuite în jumătate de coloană, adresele
        ajungeau fiecare pe patru-cinci rânduri.
      */}
      <Reveal className="mt-12 rounded-3xl border border-border bg-background p-6 shadow-sm shadow-foreground/5 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-12">
          <div>
            <h3 className="text-balance text-2xl text-foreground sm:text-3xl">
              {content("home.visit.form_title")}
            </h3>
            <p className="prose-readable mt-3 text-pretty text-muted-foreground">
              {content("home.visit.form_note")}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                <Phone className="size-4" />
                {contact.phone}
              </a>
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                <WhatsAppIcon className="size-4" />
                WhatsApp
              </a>
            </div>

            <div className="mt-6 flex items-start gap-3 border-t border-border pt-6">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                <Clock className="size-4" strokeWidth={1.75} />
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
          </div>

          <LazyAppointmentForm specialties={specialties} />
        </div>
      </Reveal>

      <div className="mt-14 sm:mt-16">
        <Reveal>
          <span className="text-sm font-medium uppercase tracking-[0.18em] text-sage-strong">
            Sedii
          </span>
          <h3 className="mt-2 text-balance text-2xl text-foreground sm:text-3xl">
            Ne găsești în două locuri
          </h3>
        </Reveal>

        <Reveal delay={0.06}>
          <Locations variant="cards" className="mt-8 sm:grid-cols-2" />
        </Reveal>

        <Reveal delay={0.1} className="mt-6">
          <LocationsMap />
        </Reveal>
      </div>
    </Section>
  );
}
