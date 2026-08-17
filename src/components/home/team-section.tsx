import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import { TeamCarousel } from "@/components/home/team-carousel";
import { getSpecialtiesByDoctor } from "@/lib/data";
import type { Doctor } from "@/lib/supabase/types";
import type { ContentReader } from "@/lib/content/get";

export async function TeamSection({
  doctors,
  content,
}: {
  doctors: Doctor[];
  content: ContentReader;
}) {
  // O singură citire a hărții medic -> specialități, în loc de una per medic.
  const byDoctor = await getSpecialtiesByDoctor();
  const cards = doctors.map((doctor) => ({
    doctor,
    specialties: byDoctor.get(doctor.id) ?? [],
  }));

  // Doar membrii asociați unei specialități (medici, psihologi, neurologi).
  // Pe homepage arătăm un teaser (primii 10); echipa completă e pe /echipa.
  const medics = cards.filter((c) => c.specialties.length > 0).slice(0, 10);

  return (
    <Section id="echipa" className="bg-card">
      <SectionHeading
        eyebrow={content("home.team.eyebrow")}
        title={content("home.team.title")}
        description={content("home.team.description")}
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
            {content("home.team.cta")}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover/all:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
