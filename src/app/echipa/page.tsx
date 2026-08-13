import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeading } from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import { DoctorFlipCard } from "@/components/doctor-flip-card";
import { StaffCard } from "@/components/staff-card";
import { CtaBand } from "@/components/cta-band";
import { getDoctors, getSpecialtiesForDoctor } from "@/lib/data";
import { staff } from "@/lib/staff";

export const metadata: Metadata = {
  title: "Echipa",
  description:
    "Echipa Anova Medical Clinic: medici psihiatri, psihologi, neurologi, cardiologi și endocrinologi dedicați sănătății tale, în Iași.",
  alternates: { canonical: "/echipa" },
};

export default async function EchipaPage() {
  const doctors = await getDoctors();
  const cards = await Promise.all(
    doctors.map(async (doctor) => ({
      doctor,
      specialties: await getSpecialtiesForDoctor(doctor.id),
    })),
  );

  return (
    <main className="flex-1 overflow-x-hidden">
      <PageHeader
        breadcrumb={[{ label: "Echipa" }]}
        eyebrow="Echipa"
        title="Oamenii din spatele îngrijirii tale"
        description="O echipă multidisciplinară de medici psihiatri, psihologi, neurologi, cardiologi și endocrinologi. Apasă pe un card pentru a afla mai multe despre fiecare specialist."
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
      <Section className="bg-card">
        <SectionHeading
          eyebrow="Echipa de suport"
          title="Oamenii care te întâmpină"
          description="Conducerea clinicii și asistentele medicale care se ocupă de programări, de pregătirea consultațiilor și de confortul tău la fiecare vizită."
          align="center"
        />
        <div className="mt-12 grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {staff.map((member, i) => (
            <Reveal key={member.name} delay={(i % 4) * 0.05}>
              <StaffCard member={member} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}
