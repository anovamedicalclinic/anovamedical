"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollIndicator } from "@/components/home/scroll-indicator";

/**
 * Hero. Fundalul inițial este un gradient cald (paint instant, fără cost de
 * rețea), iar videoclipul stă peste el.
 *
 * Videoclipul se afișează necondiționat, cerință explicită a clientului. A
 * existat aici un filtru care îl sărea pe `prefers-reduced-motion`, pe
 * `Save-Data` și pe conexiuni 2G/3G; a fost scos. De reținut dacă cineva se
 * întreabă mai târziu de ce: oamenii care cer mișcare redusă o fac de obicei
 * pentru că mișcarea le provoacă rău fizic, iar un fundal video în buclă e
 * exact asta. Decizia a fost luată în cunoștință de cauză.
 *
 * Elementul `<video>` e randat direct în HTML, nu montat din `useEffect`:
 * altfel un JavaScript care nu apucă să ruleze ar însemna hero fără video, iar
 * „indiferent de situație" include și situația aceea. Din același motiv nu mai
 * există stare `videoReady` care să comande opacitatea — `poster` acoperă
 * intervalul până la primele cadre, fără să depindă de nimic.
 *
 * Textele vin ca proprietăți, nu citite aici: componenta e client, iar conținutul
 * se încarcă pe server, în pagină.
 */
export function Hero({
  title,
  subtitle,
  ctaLabel,
}: {
  title: string;
  subtitle: string;
  ctaLabel: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // iOS/Safari cere muted + playsInline și, uneori, un apel explicit `.play()`.
  // E doar o plasă: atributul `autoPlay` din markup pornește redarea singur, deci
  // videoclipul rulează și dacă efectul ăsta nu apucă niciodată să se execute.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="w-full py-28 md:py-32">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="mx-auto mt-4 max-w-none text-balance text-4xl leading-[1.12] sm:mt-6 sm:max-w-3xl sm:text-5xl md:text-6xl lg:mt-6 lg:max-w-4xl xl:text-7xl">
              {title}
            </h1>
            <p className="mx-auto mt-6 max-w-md text-balance text-base leading-relaxed text-muted-foreground sm:mt-7 sm:max-w-3xl sm:text-lg">
              {subtitle}
            </p>

            <div className="mt-8 flex justify-center sm:mt-10">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full px-7 text-base transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover"
              >
                <Link href="/contact">
                  <span className="text-nowrap">{ctaLabel}</span>
                  <ChevronRight className="ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Fundal full-bleed. Gradient cald (fără cost de rețea) = paint instant;
            videoclipul apare peste gradient, pe orice dispozitiv. */}
        <div className="absolute inset-1 overflow-hidden rounded-3xl border border-black/10 bg-[linear-gradient(150deg,#eef1ec_0%,#ebe7e3_45%,#e7dfd3_100%)] lg:rounded-[3rem]">
          <div
            aria-hidden
            className="absolute -right-16 -top-20 size-80 rounded-full bg-sage/25 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -left-16 size-80 rounded-full bg-sand/20 blur-3xl"
          />
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            // `metadata`, nu `auto`: `autoPlay` pornește oricum descărcarea, iar
            // `auto` ar concura mai devreme cu resursele primului ecran.
            preload="metadata"
            // Se vede până sosesc primele cadre, deci nu există gol de umplut.
            poster="/hero-poster.jpg"
            aria-hidden
            className="absolute inset-0 size-full scale-105 object-cover"
          >
            {/* VP9 primul: browserele care îl susțin iau varianta mai mică. */}
            <source src="/videoprezentare.webm" type="video/webm" />
            <source src="/videoprezentare.mp4" type="video/mp4" />
          </video>
          {/* Voal cremă pentru un fundal calm și contrast bun pentru text. */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/65 to-background/90" />
          <div className="absolute inset-0 bg-background/10" />
        </div>

        <ScrollIndicator />
      </div>
    </section>
  );
}
