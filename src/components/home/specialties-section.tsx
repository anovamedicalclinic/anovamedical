import { Section, SectionHeading } from "@/components/layout/section";
import { ServiceCard } from "@/components/home/service-card";
import { getDoctorsBySpecialtySlug } from "@/lib/data";
import { specialtyHighlights } from "@/lib/specialty-highlights";
import { specialtyImage } from "@/lib/specialty-images";
import type { Specialty } from "@/lib/supabase/types";

export async function SpecialtiesSection({
  specialties,
}: {
  specialties: Specialty[];
}) {
  const cards = await Promise.all(
    specialties.map(async (specialty) => ({
      specialty,
      doctors: await getDoctorsBySpecialtySlug(specialty.slug),
      imageSrc: specialtyImage(specialty.slug),
    })),
  );

  return (
    <Section id="specialitati">
      <SectionHeading
        eyebrow="Specialități"
        title="Îngrijire completă, sub același acoperiș"
        description="De la sănătate mintală la neurologie, cardiologie și endocrinologie, echipa noastră acoperă o gamă largă de nevoi, cu aceeași grijă și atenție."
      />
      <div className="mt-12 flex flex-col gap-6">
        {cards.map(({ specialty, doctors, imageSrc }, index) => (
          <ServiceCard
            key={specialty.id}
            specialty={specialty}
            highlights={specialtyHighlights[specialty.slug] ?? []}
            doctors={doctors}
            imageSrc={imageSrc}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </Section>
  );
}
