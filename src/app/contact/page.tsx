import type { Metadata } from "next";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import { AppointmentForm } from "@/components/home/appointment-form";
import { CtaBand } from "@/components/cta-band";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "@/components/brand/social-icons";
import { getSpecialties } from "@/lib/data";
import { contact, social } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactează Anova Medical Clinic din Iași: telefon 0774 037 531, WhatsApp, email și formular de programare. Programarea se confirmă telefonic.",
  alternates: { canonical: "/contact" },
};

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  "Șoseaua Nicolina 14, Iași",
)}&z=15&output=embed`;

const methods = [
  {
    icon: Phone,
    label: "Sună-ne",
    value: contact.phone,
    href: contact.phoneHref,
    external: false,
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "Scrie-ne un mesaj rapid",
    href: contact.whatsappHref,
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: contact.email,
    href: contact.emailHref,
    external: false,
  },
];

export default async function ContactPage() {
  const specialties = await getSpecialties();

  return (
    <main className="flex-1 overflow-x-hidden">
      <PageHeader
        breadcrumb={[{ label: "Contact" }]}
        eyebrow="Contact"
        title="Suntem aici pentru tine"
        description="Programează o consultație completând formularul sau scrie-ne direct. Îți răspundem cu căldură și fără grabă."
      />

      <Section>
        {/* Metode rapide de contact */}
        <div className="grid gap-4 sm:grid-cols-3">
          {methods.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06}>
              <a
                href={m.href}
                {...(m.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group relative flex h-full items-start gap-4 overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-foreground/5"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#2a6a63] text-primary-foreground shadow-sm shadow-primary/20 transition-transform duration-300 group-hover:scale-110">
                  <m.icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {m.label}
                  </span>
                  <span className="mt-1 block truncate font-medium text-foreground">
                    {m.value}
                  </span>
                </span>
                <ArrowUpRight className="absolute right-5 top-5 size-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 size-24 rounded-full bg-sage/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
              </a>
            </Reveal>
          ))}
        </div>

        {/* Formular + info + hartă */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal className="rounded-3xl border border-border bg-card p-6 shadow-sm shadow-foreground/5 sm:p-8">
            <h2 className="text-2xl text-foreground">
              Programează o consultație
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Completează câmpurile, iar noi te sunăm pentru confirmare.
            </p>
            <div className="mt-6">
              <AppointmentForm specialties={specialties} />
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal className="space-y-5 rounded-3xl border border-border bg-card p-6 sm:p-7">
              <InfoRow icon={MapPin} label="Adresă">
                <p className="text-sm text-foreground">{contact.address}</p>
              </InfoRow>
              <InfoRow icon={Clock} label="Program" className="border-t pt-5">
                <div className="space-y-0.5 text-sm text-foreground">
                  {contact.schedule.map((row) => (
                    <p key={row.days}>
                      {row.days}: {row.hours}
                    </p>
                  ))}
                </div>
              </InfoRow>
              <div className="flex items-center gap-3 border-t border-border pt-5">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Urmărește-ne
                </p>
                <div className="flex gap-2">
                  <SocialLink href={social.facebook} label="Facebook">
                    <FacebookIcon className="size-4" />
                  </SocialLink>
                  <SocialLink href={social.instagram} label="Instagram">
                    <InstagramIcon className="size-4" />
                  </SocialLink>
                </div>
              </div>
            </Reveal>

            <Reveal
              delay={0.06}
              className="overflow-hidden rounded-3xl border border-border"
            >
              <iframe
                src={MAP_SRC}
                title="Harta locației Anova Medical Clinic"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full"
              />
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}

function InfoRow({
  icon: Icon,
  label,
  className,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex items-start gap-3 border-border", className)}>
      <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
    >
      {children}
    </a>
  );
}
