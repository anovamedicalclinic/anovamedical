import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import { TeamCarousel } from "@/components/home/team-carousel";
import { getSpecialtiesForDoctor } from "@/lib/data";
import type { Doctor } from "@/lib/supabase/types";

export async function TeamSection({ doctors }: { doctors: Doctor[] }) {
  const cards = await Promise.all(
    doctors.map(async (doctor) => ({
      doctor,
      specialties: await getSpecialtiesForDoctor(doctor.id),
    })),
  );

  // Doar membrii asociați unei specialități (medici, psihologi, neurologi).
  // Pe homepage arătăm un teaser (primii 10); echipa completă e pe /echipa.
  const medics = cards.filter((c) => c.specialties.length > 0).slice(0, 10);

  return (
    <Section id="echipa" className="bg-card">
      <SectionHeading
        eyebrow="Echipa"
        title="Specialiști dedicați, alături de tine"
        description="O echipă multidisciplinară de medici, psihologi și terapeuți. Apasă pe un card pentru a afla mai multe."
        align="center"
      />

      <Reveal className="mt-12">
        <TeamCarousel items={medics} />
      </Reveal>

      <div className="mt-10 flex justify-center">
        <Button
          asChild
          size="lg"
          variant="outline"
          className="group/all rounded-full px-7 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
        >
          <Link href="/echipa">
            Vezi echipa completă
            <ArrowRight className="size-4 transition-transform duration-200 group-hover/all:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
