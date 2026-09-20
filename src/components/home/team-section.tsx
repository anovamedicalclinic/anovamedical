import Link from "next/link";
import { connection } from "next/server";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import { TeamCarousel } from "@/components/home/team-carousel";
import { getSpecialtiesByDoctor } from "@/lib/data";
import type { Doctor } from "@/lib/supabase/types";
import type { ContentReader } from "@/lib/content/get";
import { shuffle } from "@/lib/utils";

export async function TeamSection({
  doctors,
  content,
}: {
  doctors: Doctor[];
  content: ContentReader;
}) {
  // Ordinea medicilor se amestecă la fiecare vizită, ca nimeni să nu fie
  // permanent primul sau ultimul - la fel ca pe /echipa. `connection()` scoate
  // secțiunea din prerender, altfel `Math.random()` ar rula o singură dată, la
  // build. Datele vin oricum din cache, deci randarea la cerere e ieftină.
  await connection();

  // O singură citire a hărții medic -> specialități, în loc de una per medic.
  const byDoctor = await getSpecialtiesByDoctor();
  const cards = doctors.map((doctor) => ({
    doctor,
    specialties: byDoctor.get(doctor.id) ?? [],
  }));

  // Doar membrii asociați unei specialități (medici, psihologi, neurologi).
  // Pe homepage arătăm un teaser de 10; amestecul e înaintea tăierii, așa că
  // se schimbă și cine apare, nu doar ordinea. Echipa completă e pe /echipa.
  const medics = shuffle(cards.filter((c) => c.specialties.length > 0)).slice(
    0,
    10,
  );

  return (
    <Section id="echipa" blend className="bg-card">
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
