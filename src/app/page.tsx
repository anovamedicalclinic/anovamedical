import { Hero } from "@/components/home/hero";
import { AboutPreview } from "@/components/home/about-preview";
import { SpecialtiesSection } from "@/components/home/specialties-section";
import { TeamSection } from "@/components/home/team-section";
import { Testimonials } from "@/components/home/testimonials";
import { VisitSection } from "@/components/home/visit-section";
import { CtaBand } from "@/components/cta-band";
import { FadeSection } from "@/components/fade-section";
import { getDoctors, getSpecialties } from "@/lib/data";

export default async function Home() {
  const [specialties, doctors] = await Promise.all([
    getSpecialties(),
    getDoctors(),
  ]);

  return (
    <main className="flex-1 overflow-x-hidden">
      <Hero />
      <FadeSection>
        <AboutPreview />
      </FadeSection>
      <FadeSection>
        <SpecialtiesSection specialties={specialties} />
      </FadeSection>
      <FadeSection>
        <TeamSection doctors={doctors} />
      </FadeSection>
      <FadeSection>
        <Testimonials />
      </FadeSection>
      <FadeSection>
        <VisitSection specialties={specialties} />
      </FadeSection>
      <FadeSection>
        <CtaBand />
      </FadeSection>
    </main>
  );
}
