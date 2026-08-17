import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeading } from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import { DoctorFlipCard } from "@/components/doctor-flip-card";
import { StaffCard } from "@/components/staff-card";
import { CtaBand } from "@/components/cta-band";
import { getDoctors, getSpecialtiesByDoctor, getStaff } from "@/lib/data";
import { getContent } from "@/lib/content/get";

export const metadata: Metadata = {
  title: "Echipa",
  description:
    "Echipa Anova Medical Clinic: medici psihiatri, psihologi, neurologi, cardiologi și endocrinologi dedicați sănătății tale, în Iași.",
  alternates: { canonical: "/echipa" },
};

export default async function EchipaPage() {
  const [doctors, byDoctor, staff, content] = await Promise.all([
    getDoctors(),
    getSpecialtiesByDoctor(),
    getStaff(),
    getContent(),
  ]);

  const cards = doctors.map((doctor) => ({
    doctor,
    specialties: byDoctor.get(doctor.id) ?? [],
  }));

  return (
    <main className="flex-1 overflow-x-hidden">
      <PageHeader
        breadcrumb={[{ label: content("echipa.header.eyebrow") }]}
        eyebrow={content("echipa.header.eyebrow")}
        title={content("echipa.header.title")}
        description={content("echipa.header.description")}
      />

      <Section>
        <div className="grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map(({ doctor, specialties }, i) => (
            <Reveal
              key={doctor.id}
              delay={(i % 4) * 0.05}
              className="h-[23rem] sm:h-[27rem]"
            >
              <DoctorFlipCard doctor={doctor} specialties={specialties} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Echipa de suport */}
      {staff.length > 0 && (
        <Section className="bg-card">
          <SectionHeading
            eyebrow={content("echipa.support.eyebrow")}
            title={content("echipa.support.title")}
            description={content("echipa.support.description")}
            align="center"
          />
          <div className="mt-12 grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {staff.map((member, i) => (
              <Reveal key={member.id} delay={(i % 4) * 0.05}>
                <StaffCard member={member} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </main>
  );
}
