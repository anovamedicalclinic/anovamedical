import { ArrowUpRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import { GoogleIcon } from "@/components/brand/social-icons";
import { googleReviews, testimonials, type Testimonial } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .replace(/[.,]/g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p.charAt(0))
    .join("")
    .toUpperCase();
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} din 5 stele`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < count ? "fill-amber-400 text-amber-400" : "fill-muted text-muted",
          )}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="flex h-[19rem] flex-col rounded-3xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <GoogleIcon className="size-6" />
        <Stars count={t.rating} />
      </div>

      <p className="mt-4 line-clamp-5 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
        {t.text}
      </p>

      <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium text-primary">
          {initials(t.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">
            {t.name}
          </p>
          <p className="text-xs text-muted-foreground">Recenzie Google</p>
        </div>
      </div>
    </article>
  );
}

export function Testimonials() {
  return (
    <Section id="recenzii">
      <div className="flex flex-col items-center gap-6">
        <SectionHeading
          eyebrow="Recenzii"
          title="Ce spun pacienții noștri"
          align="center"
        />

        <Reveal
          delay={0.08}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5">
            <GoogleIcon className="size-5" />
            <span className="text-sm font-semibold text-foreground">
              {googleReviews.rating.toLocaleString("ro-RO")}
            </span>
            <Stars count={Math.round(googleReviews.rating)} />
            <span className="text-sm text-muted-foreground">
              {googleReviews.countLabel} pe Google
            </span>
          </div>

          <Button
            asChild
            variant="outline"
            className="group/rev rounded-full hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
          >
            <a
              href={googleReviews.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Vezi toate recenziile
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover/rev:-translate-y-0.5 group-hover/rev:translate-x-0.5" />
            </a>
          </Button>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={(i % 4) * 0.05}>
            <TestimonialCard t={t} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
