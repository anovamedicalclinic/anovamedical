import { Hero } from "@/components/home/hero";
import { AboutPreview } from "@/components/home/about-preview";
import { SpecialtiesSection } from "@/components/home/specialties-section";
import { TeamSection } from "@/components/home/team-section";
import { Testimonials } from "@/components/home/testimonials";
import { VisitSection } from "@/components/home/visit-section";
import { CtaBand } from "@/components/cta-band";
import { FadeSection } from "@/components/fade-section";
import { getDoctors, getSpecialties, getTestimonials } from "@/lib/data";
import { fill, getContent } from "@/lib/content/get";
import { siteConfig } from "@/lib/site";

export default async function Home() {
  const [specialties, doctors, testimonials, content] = await Promise.all([
    getSpecialties(),
    getDoctors(),
    getTestimonials(),
    getContent(),
  ]);

  return (
    <main className="flex-1 overflow-x-hidden">
      <Hero
        title={content("home.hero.title")}
        subtitle={fill(content("home.hero.subtitle"), {
          oras: siteConfig.city,
        })}
        ctaLabel={content("home.hero.cta")}
      />
      <FadeSection>
        <AboutPreview content={content} />
      </FadeSection>
      <FadeSection>
        <SpecialtiesSection specialties={specialties} content={content} />
      </FadeSection>
      <FadeSection>
        <TeamSection doctors={doctors} content={content} />
      </FadeSection>
      <FadeSection>
        <Testimonials testimonials={testimonials} content={content} />
      </FadeSection>
      <FadeSection>
        <VisitSection specialties={specialties} content={content} />
      </FadeSection>
      <FadeSection>
        <CtaBand />
      </FadeSection>
    </main>
  );
}
