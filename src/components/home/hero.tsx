"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollIndicator } from "@/components/home/scroll-indicator";
import { siteConfig } from "@/lib/site";

/**
 * Hero. Fundalul inițial este un gradient cald (paint instant, fără cost de
 * rețea), astfel încât LCP-ul rămâne rapid. Videoclipul se încarcă imediat după
 * idle pe ORICE dispozitiv (inclusiv mobil / iPhone) și apare peste gradient.
 */
export function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const start = () => setShowVideo(true);
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void;
    };
    if (w.requestIdleCallback) {
      w.requestIdleCallback(start, { timeout: 2000 });
    } else {
      const t = setTimeout(start, 1000);
      return () => clearTimeout(t);
    }
  }, []);

  // iOS/Safari cere muted + playsInline și, uneori, un apel explicit .play().
  useEffect(() => {
    if (!showVideo) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [showVideo]);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="w-full py-28 md:py-32">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mx-auto mt-4 max-w-none text-balance text-4xl sm:mt-6 sm:max-w-2xl sm:text-5xl md:text-6xl lg:mt-6 xl:text-7xl">
              Regăsește-ți echilibrul, pas cu pas.
            </h1>
            <p className="mx-auto mt-5 max-w-md text-balance text-base text-muted-foreground sm:mt-6 sm:max-w-2xl sm:text-lg">
              Clinică de sănătate mintală și neurologică în {siteConfig.city}. Un
              spațiu discret și sigur, unde fiecare poveste este ascultată cu
              răbdare, iar îngrijirea e croită pe măsura ta.
            </p>

            <div className="mt-8 flex justify-center sm:mt-10">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full px-7 text-base transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover"
              >
                <Link href="/contact">
                  <span className="text-nowrap">Programează-te</span>
                  <ChevronRight className="ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Fundal full-bleed. Gradient cald (fără cost de rețea) = paint instant;
            videoclipul apare peste gradient, pe orice dispozitiv. */}
        <div className="absolute inset-1 overflow-hidden rounded-3xl border border-black/10 bg-[linear-gradient(150deg,#eef2f0_0%,#f6f3ee_45%,#f3ece2_100%)] lg:rounded-[3rem]">
          <div
            aria-hidden
            className="absolute -right-16 -top-20 size-80 rounded-full bg-sage/25 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -left-16 size-80 rounded-full bg-sand/20 blur-3xl"
          />
          {showVideo && (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/hero-poster.jpg"
              aria-hidden
              onLoadedData={() => setVideoReady(true)}
              onCanPlay={() => setVideoReady(true)}
              className={`absolute inset-0 size-full scale-105 object-cover transition-opacity duration-700 ${
                videoReady ? "opacity-100" : "opacity-0"
              }`}
            >
              <source src="/videoprezentare.mp4" type="video/mp4" />
            </video>
          )}
          {/* Voal cremă pentru un fundal calm și contrast bun pentru text. */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/65 to-background/90" />
          <div className="absolute inset-0 bg-background/10" />
        </div>

        <ScrollIndicator />
      </div>
    </section>
  );
}
