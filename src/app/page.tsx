import { Hero } from "@/components/home/hero";
import { AboutPreview } from "@/components/home/about-preview";
import { SpecialtiesSection } from "@/components/home/specialties-section";
import { TeamSection } from "@/components/home/team-section";
import { Testimonials } from "@/components/home/testimonials";
import { VisitSection } from "@/components/home/visit-section";
import { CtaBand } from "@/components/cta-band";
import { getDoctors, getSpecialties } from "@/lib/data";

export default async function Home() {
  const [specialties, doctors] = await Promise.all([
    getSpecialties(),
    getDoctors(),
  ]);

  return (
    <main className="flex-1 overflow-x-hidden">
      <Hero />
      <AboutPreview />
      <SpecialtiesSection specialties={specialties} />
      <TeamSection doctors={doctors} />
      <Testimonials />
      <VisitSection specialties={specialties} />
      <CtaBand />
    </main>
  );
}
