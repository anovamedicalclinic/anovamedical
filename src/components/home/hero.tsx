import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollIndicator } from "@/components/home/scroll-indicator";
import { siteConfig } from "@/lib/site";

export function Hero() {
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

        {/* Video de prezentare full-bleed în hero, cu blur subtil. */}
        <div className="absolute inset-1 overflow-hidden rounded-3xl border border-black/10 lg:rounded-[3rem]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="size-full scale-110 object-cover blur-[5px]"
            src="/videoprezentare.mp4"
          ></video>
          {/* Voal cremă pentru un fundal calm și contrast bun pentru text. */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/65 to-background/90" />
          <div className="absolute inset-0 bg-background/10" />
        </div>

        <ScrollIndicator />
      </div>
    </section>
  );
}
