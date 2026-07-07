import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import { DoctorFlipCard } from "@/components/doctor-flip-card";
import { CtaBand } from "@/components/cta-band";
import { getDoctors, getSpecialtiesForDoctor } from "@/lib/data";

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

      <CtaBand />
    </main>
  );
}
