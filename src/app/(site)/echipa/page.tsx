import type { Metadata } from "next";
import { buildMetadata, requireMeta } from "@/lib/page-meta";
import { connection } from "next/server";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeading } from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import { DoctorFlipCard } from "@/components/doctor-flip-card";
import { StaffCard } from "@/components/staff-card";
import { CtaBand } from "@/components/cta-band";
import {
  getDoctors,
  getSpecialties,
  getSpecialtiesByDoctor,
  getStaff,
} from "@/lib/data";
import { getContent } from "@/lib/content/get";
import { groupStaffByRole } from "@/lib/staff";
import { shuffle } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  path: "/echipa",
  ...requireMeta("/echipa"),
});

/** Titlul discret care desparte grupurile din pagină. */
function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-sage-strong">
        {children}
      </h2>
    </Reveal>
  );
}

export default async function EchipaPage() {
  // Ordinea medicilor se amestecă la fiecare vizită, ca nimeni să nu fie
  // permanent primul sau ultimul — dar numai în interiorul specialității lui.
  // `connection()` scoate pagina din prerender, altfel `Math.random()` ar rula
  // o singură dată, la build.
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
  // ordonată după `order_index`), ca să nu se repete de la un grup la altul.
  const groups = specialties
    .map((specialty) => ({
      label: specialty.name,
      cards: shuffle(cards.filter((c) => c.specialties[0]?.id === specialty.id)),
    }))
    .filter((group) => group.cards.length > 0);

  // Cine nu e legat de nicio specialitate nu dispare din pagină: intră într-un
  // grup la coadă, ca să rămână vizibil chiar dacă lipsește o asociere.
  const unassigned = shuffle(cards.filter((c) => c.specialties.length === 0));
  if (unassigned.length > 0) {
    groups.push({ label: "Alți membri ai echipei", cards: unassigned });
  }

  const staffGroups = groupStaffByRole(staff);

  return (
    <main className="flex-1 overflow-x-hidden">
      <PageHeader
        breadcrumb={[{ label: content("echipa.header.eyebrow") }]}
        eyebrow={content("echipa.header.eyebrow")}
        title={content("echipa.header.title")}
        description={content("echipa.header.description")}
      />

      <Section>
        <div className="flex flex-col gap-14 sm:gap-16">
          {groups.map((group) => (
            <div key={group.label} className="flex flex-col gap-6 sm:gap-8">
              <GroupHeading>{group.label}</GroupHeading>
              <div className="grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {group.cards.map(({ doctor, specialties }, i) => (
                  <Reveal
                    key={doctor.id}
                    delay={(i % 4) * 0.05}
                    className="h-[23rem] sm:h-[27rem]"
                  >
                    <DoctorFlipCard doctor={doctor} specialties={specialties} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Echipa de suport */}
      {staffGroups.length > 0 && (
        <Section blend className="bg-card">
          <SectionHeading
            eyebrow={content("echipa.support.eyebrow")}
            title={content("echipa.support.title")}
            description={content("echipa.support.description")}
            align="center"
          />
          {/* Conducerea are rândul ei, deasupra asistenților medicali. */}
          <div className="mt-12 flex flex-col gap-14 sm:gap-16">
            {staffGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-6 sm:gap-8">
                <GroupHeading>{group.label}</GroupHeading>
                <div className="grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                  {group.members.map((member, i) => (
                    <Reveal key={member.id} delay={(i % 4) * 0.05}>
                      <StaffCard member={member} />
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </main>
  );
}
