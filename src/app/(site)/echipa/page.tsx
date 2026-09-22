import type { Metadata } from "next";
import { buildMetadata, requireMeta } from "@/lib/page-meta";
import { connection } from "next/server";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeading } from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import { TeamGrid } from "@/components/team-grid";
import { StaffCard, StaffLeadCard } from "@/components/staff-card";
import { CtaBand } from "@/components/cta-band";
import {
  getDoctors,
  getSpecialties,
  getSpecialtiesByDoctor,
  getStaff,
} from "@/lib/data";
import { getContent } from "@/lib/content/get";
import { isLeadershipRole, staffGroupLabel } from "@/lib/staff";
import { shuffle } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  path: "/echipa",
  ...requireMeta("/echipa"),
});

/** Titlul discret care desparte conducerea de restul echipei de suport. */
function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-sage-strong">
        {children}
      </h3>
    </Reveal>
  );
}

export default async function EchipaPage() {
  // Ordinea medicilor se amestecă la fiecare vizită, ca nimeni să nu fie
  // permanent primul sau ultimul — dar numai în interiorul specialității lui,
  // așa că grila rămâne grupată pe specialități. `connection()` scoate pagina
  // din prerender, altfel `Math.random()` ar rula o singură dată, la build.
  await connection();

  const [doctors, specialties, byDoctor, staff, content] = await Promise.all([
    getDoctors(),
    getSpecialties(),
    getSpecialtiesByDoctor(),
    getStaff(),
    getContent(),
  ]);

  const cards = doctors.map((doctor) => ({
    doctor,
    specialties: byDoctor.get(doctor.id) ?? [],
  }));

  // Un medic apare o singură dată, la prima lui specialitate (harta vine deja
  // ordonată după `order_index`), ca să nu se repete dintr-un grup în altul.
  // Cine nu e legat de nicio specialitate nu dispare din pagină: intră la
  // coadă, ca să rămână vizibil chiar dacă lipsește o asociere.
  const grouped = [
    ...specialties.flatMap((specialty) =>
      shuffle(cards.filter((c) => c.specialties[0]?.id === specialty.id)),
    ),
    ...shuffle(cards.filter((c) => c.specialties.length === 0)),
  ];

  // Butoanele de filtrare arată doar specialitățile care chiar au medici, ca
  // să nu existe un filtru care duce la o grilă goală.
  const filters = specialties
    .filter((s) => cards.some((c) => c.specialties.some((x) => x.id === s.id)))
    .map((s) => ({ id: s.id, name: s.name }));

  // Conducerea stă pe un rând al ei, centrat, deasupra restului echipei de
  // suport: directorul nu apare în aceeași grilă cu asistenții medicali.
  const leadership = staff.filter((m) => isLeadershipRole(m.role));
  const support = staff.filter((m) => !isLeadershipRole(m.role));

  return (
    <main className="flex-1 overflow-x-hidden">
      <PageHeader
        breadcrumb={[{ label: content("echipa.header.eyebrow") }]}
        eyebrow={content("echipa.header.eyebrow")}
        title={content("echipa.header.title")}
        description={content("echipa.header.description")}
      />

      <Section>
        <TeamGrid cards={grouped} filters={filters} />
      </Section>

      {/* Echipa de suport */}
      {staff.length > 0 && (
        <Section blend className="bg-card">
          <SectionHeading
            eyebrow={content("echipa.support.eyebrow")}
            title={content("echipa.support.title")}
            description={content("echipa.support.description")}
            align="center"
          />

          {leadership.length > 0 && (
            <div className="mt-12 flex flex-col gap-6 sm:gap-8">
              <GroupHeading>
                {staffGroupLabel(leadership, "Conducere")}
              </GroupHeading>
              <div className="flex flex-wrap gap-3.5 sm:gap-5">
                {leadership.map((member, i) => (
                  <Reveal key={member.id} delay={i * 0.05} className="w-full max-w-lg">
                    <StaffLeadCard member={member} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {support.length > 0 && (
            <div
              className={`flex flex-col gap-6 sm:gap-8 ${
                leadership.length > 0 ? "mt-14 sm:mt-16" : "mt-12"
              }`}
            >
              <GroupHeading>
                {staffGroupLabel(support, "Echipa de suport")}
              </GroupHeading>
              <div className="grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {support.map((member, i) => (
                  <Reveal key={member.id} delay={(i % 4) * 0.05}>
                    <StaffCard member={member} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </Section>
      )}

      <CtaBand />
    </main>
  );
}
