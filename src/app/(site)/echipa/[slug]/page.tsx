import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  Clock,
  GraduationCap,
  MapPin,
  Phone,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TimelineBlock } from "@/components/doctor-timeline";
import { CtaBand } from "@/components/cta-band";
import { WhatsAppIcon } from "@/components/brand/social-icons";
import {
  getDoctorBySlug,
  getDoctors,
  getSpecialtiesForDoctor,
} from "@/lib/data";
import { doctorDetails } from "@/lib/doctor-details";
import { doctorPhoto } from "@/lib/doctor-photos";
import { contact } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { physicianLd, breadcrumbLd } from "@/lib/seo";

export async function generateStaticParams() {
  const doctors = await getDoctors();
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);
  if (!doctor) return { title: "Specialist negăsit" };
  const description =
    `${doctor.title ?? "Specialist"} la Anova Medical Clinic, Iași. ${doctor.short_bio ?? ""}`.trim();
  return {
    title: doctor.name,
    description,
    alternates: { canonical: `/echipa/${slug}` },
    openGraph: {
      type: "profile",
      title: `${doctor.name} · Anova Medical Clinic`,
      description,
      url: `/echipa/${slug}`,
    },
  };
}

export default async function DoctorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);
  if (!doctor) notFound();

  const specialties = await getSpecialtiesForDoctor(doctor.id);
  const details = doctorDetails[slug];
  const description =
    details?.description ?? (doctor.full_bio ? [doctor.full_bio] : []);
  const photo = doctorPhoto(doctor);

  return (
    <main className="flex-1 overflow-x-hidden">
      <JsonLd
        data={[
          physicianLd({ doctor, specialties, image: photo }),
          breadcrumbLd([
            { name: "Acasă", path: "/" },
            { name: "Echipa", path: "/echipa" },
            { name: doctor.name, path: `/echipa/${doctor.slug}` },
          ]),
        ]}
      />
      {/* Antet profil */}
      <section className="pt-28 md:pt-32">
        <Container>
          <Reveal>
            <Breadcrumb
              items={[
                { label: "Echipa", href: "/echipa" },
                { label: doctor.name },
              ]}
            />
          </Reveal>

          <Reveal
            delay={0.08}
            className="mt-6 overflow-hidden rounded-3xl border border-border bg-card"
          >
            {/* Cover */}
            <div className="relative h-32 bg-gradient-to-br from-primary via-[#4c6656] to-sage/60 sm:h-44 md:h-52">
              <div
                aria-hidden
                className="absolute -right-8 -top-10 size-52 rounded-full bg-primary-foreground/10 blur-2xl"
              />
              <div
                aria-hidden
                className="absolute bottom-[-4rem] left-10 size-52 rounded-full bg-sand/20 blur-3xl"
              />
            </div>

            {/* Rând profil */}
            <div className="px-6 pb-6 sm:px-8 sm:pb-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                  <div className="relative -mt-16 size-28 shrink-0 overflow-hidden rounded-full border-4 border-card bg-secondary shadow-lg shadow-foreground/10 sm:-mt-20 sm:size-36">
                    <Image
                      src={photo}
                      alt={`Portret ${doctor.name}`}
                      fill
                      sizes="144px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                  <div className="space-y-2">
                    {doctor.credentials && (
                      <span className="text-xs font-medium uppercase tracking-[0.14em] text-sage-strong">
                        {doctor.credentials}
                      </span>
                    )}
                    <h1 className="text-2xl text-foreground sm:text-3xl">
                      {doctor.name}
                    </h1>
                    {doctor.title && (
                      <p className="text-muted-foreground">{doctor.title}</p>
                    )}
                    {specialties.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {specialties.map((s) => (
                          <Badge
                            key={s.id}
                            variant="secondary"
                            className="bg-secondary text-secondary-foreground"
                          >
                            {s.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap">
                  <Button asChild className="rounded-full hover:bg-primary-hover">
                    <Link href="/contact">Programează-te</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                  >
                    <a href={contact.phoneHref}>
                      <Phone className="size-4" />
                      Sună
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="col-span-2 rounded-full hover:border-primary/30 hover:bg-primary/5 hover:text-primary sm:size-10 sm:p-0"
                    aria-label="WhatsApp"
                  >
                    <a
                      href={contact.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon className="size-4" />
                      <span className="sm:hidden">Mesaj pe WhatsApp</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Conținut */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-14">
          <div className="space-y-10">
            {description.length > 0 && (
              <div>
                <h2 className="flex items-center gap-3 text-xl text-foreground">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                    <UserRound className="size-5" strokeWidth={1.75} />
                  </span>
                  Despre
                </h2>
                <div className="prose-readable mt-5 space-y-4 text-pretty text-muted-foreground">
                  {description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            )}

            {details?.education && details.education.length > 0 && (
              <TimelineBlock
                icon={GraduationCap}
                title="Educație"
                items={details.education}
              />
            )}

            {details?.experience && details.experience.length > 0 && (
              <TimelineBlock
                icon={Briefcase}
                title="Experiență profesională"
                items={details.experience}
              />
            )}

            {details?.current && details.current.length > 0 && (
              <TimelineBlock
                icon={Sparkles}
                title="În prezent"
                items={details.current}
              />
            )}
          </div>

          {/* Sidebar */}
          <aside className="h-fit space-y-4 lg:sticky lg:top-28">
            <div className="space-y-5 rounded-3xl border border-border bg-card p-6">
              {specialties.length > 0 && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Specialitate
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {specialties.map((s) => (
                      <Badge key={s.id} variant="secondary">
                        {s.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 border-t border-border pt-5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-sage-strong" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Locație
                  </p>
                  <p className="mt-1 text-sm text-foreground">
                    {contact.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-sage-strong" />
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

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-sage-strong" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Telefon
                  </p>
                  <a
                    href={contact.phoneHref}
                    className="mt-1 block text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>

              <Button
                asChild
                className="w-full rounded-full hover:bg-primary-hover"
              >
                <Link href="/contact">Programează o consultație</Link>
              </Button>
            </div>
          </aside>
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}
