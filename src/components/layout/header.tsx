"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { useScroll, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { SpecialtyIcon } from "@/lib/icons";
import { contact } from "@/lib/site";
import { cn } from "@/lib/utils";

// Aranjament header (desktop):
//   "logo-left"   - logo în stânga, meniul centrat, butoane dreapta (varianta nouă)
//   "logo-center" - meniul în stânga, logo centrat, butoane dreapta (varianta veche,
//                   păstrată în caz că ne răzgândim - schimbă doar această constantă)
type HeaderLayout = "logo-left" | "logo-center";
const HEADER_LAYOUT = "logo-left" as HeaderLayout;

const menuItems = [
  { name: "Acasă", href: "/" },
  { name: "Despre noi", href: "/despre-noi" },
  { name: "Specialități", href: "/specialitati", mega: true },
  { name: "Echipa", href: "/echipa" },
  { name: "Contact", href: "/contact" },
];

const megaSpecialties = [
  {
    slug: "psihiatrie",
    name: "Psihiatrie",
    icon: "brain",
    desc: "Anxietate, depresie, tulburări de somn",
  },
  {
    slug: "psihiatrie-pediatrica",
    name: "Psihiatrie Pediatrică",
    icon: "baby",
    desc: "Sănătatea mintală a copiilor și adolescenților",
  },
  {
    slug: "psihologie",
    name: "Psihologie",
    icon: "messages-square",
    desc: "Ședințe de psihoterapie, într-un spațiu sigur",
  },
  {
    slug: "neurologie",
    name: "Neurologie",
    icon: "activity",
    desc: "Migrene, amețeli, afecțiuni neurodegenerative",
  },
  {
    slug: "cardiologie",
    name: "Cardiologie",
    icon: "heart-pulse",
    desc: "Sănătatea inimii, prevenție și tratament",
  },
  {
    slug: "endocrinologie",
    name: "Endocrinologie",
    icon: "droplets",
    desc: "Tiroidă, metabolism și echilibru hormonal",
  },
];

const linkClass =
  "whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-primary";

export const Header = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [megaOpen, setMegaOpen] = React.useState(false);
  const [mobileSpecOpen, setMobileSpecOpen] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollY } = useScroll();

  React.useEffect(() => {
    const update = (latest: number) => setScrolled(latest > 24);
    update(scrollY.get());
    const unsubscribe = scrollY.on("change", update);
    return () => unsubscribe();
  }, [scrollY]);

  React.useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  const floating = scrolled || menuState;

  const logoCentered = HEADER_LAYOUT === "logo-center";
  // Trei grupuri flex-1 egale => centrare verticală perfectă și distribuție
  // echilibrată. "logo-center": meniu stânga, logo centru. "logo-left": logo
  // stânga, meniu centru. Butoanele rămân mereu în dreapta.
  const navGroupClass = logoCentered ? "lg:justify-start" : "lg:justify-center";
  const logoGroupClass = logoCentered
    ? "justify-center"
    : "justify-center lg:justify-start";

  // Meniul și logo-ul definite ca blocuri, ca să le putem reordona după layout.
  const navMenu = (
    <ul
      className={cn(
        "hidden flex-1 items-center gap-6 lg:flex",
        navGroupClass,
      )}
    >
      {menuItems.map((item) =>
        item.mega ? (
          <li
            key={item.href}
            onMouseEnter={openMega}
            onMouseLeave={scheduleClose}
          >
            <Link
              href={item.href}
              aria-expanded={megaOpen}
              className={cn(linkClass, "flex items-center gap-1")}
            >
              {item.name}
              <ChevronDown
                className={cn(
                  "size-4 transition-transform duration-200",
                  megaOpen && "rotate-180",
                )}
              />
            </Link>
          </li>
        ) : (
          <li key={item.href}>
            <Link href={item.href} className={linkClass}>
              {item.name}
            </Link>
          </li>
        ),
      )}
    </ul>
  );

  const logoBlock = (
    <div className={cn("flex flex-1", logoGroupClass)}>
      <Logo priority />
    </div>
  );

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="group fixed z-30 w-full pt-3"
      >
        <div className="mx-auto px-4 lg:px-6">
          <motion.div
            className={cn(
              "mx-auto rounded-[1.75rem] border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              floating
                ? "max-w-6xl border-border bg-background/80 shadow-lg shadow-foreground/5 backdrop-blur-xl"
                : "max-w-7xl border-transparent bg-transparent",
            )}
          >
            <div
              className={cn(
                "relative flex items-center justify-between px-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:px-8",
                scrolled ? "py-2" : "py-3 lg:py-3.5",
              )}
            >
              {/* Ordinea logo/meniu depinde de HEADER_LAYOUT; butoanele mereu dreapta */}
              {logoCentered ? navMenu : logoBlock}
              {logoCentered ? logoBlock : navMenu}

              {/* Dreapta - butoane (desktop) */}
              <div className="hidden flex-1 items-center justify-end gap-2 lg:flex">
                <Button
                  asChild
                  variant="outline"
                  className="h-10 gap-2 rounded-full border-border bg-transparent px-4 text-sm hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                >
                  <a href={contact.phoneHref}>
                    <Phone className="size-4" />
                    Sună acum
                  </a>
                </Button>
                <Button
                  asChild
                  className="group/cta h-10 gap-2 rounded-full px-5 text-sm shadow-md shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/25"
                >
                  <Link href="/contact">
                    Programează-te
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
                  </Link>
                </Button>
              </div>

              {/* Mega meniu Specialități (desktop) */}
              {megaOpen && (
                <div
                  onMouseEnter={openMega}
                  onMouseLeave={scheduleClose}
                  className="absolute left-1/2 top-full z-40 hidden w-[min(44rem,92vw)] -translate-x-1/2 pt-3 lg:block"
                >
                  <div className="rounded-3xl border border-border bg-card p-3 shadow-xl shadow-foreground/5">
                    <div className="grid gap-1 sm:grid-cols-2">
                      {megaSpecialties.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/specialitati/${s.slug}`}
                          onClick={() => setMegaOpen(false)}
                          className="group/item flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-secondary"
                        >
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover/item:bg-primary group-hover/item:text-primary-foreground">
                            <SpecialtyIcon
                              icon={s.icon}
                              className="size-5"
                              strokeWidth={1.75}
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-foreground">
                              {s.name}
                            </span>
                            <span className="block text-xs text-muted-foreground">
                              {s.desc}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-1 border-t border-border pt-1">
                      <Link
                        href="/specialitati"
                        onClick={() => setMegaOpen(false)}
                        className="flex items-center justify-between rounded-2xl p-3 text-sm font-medium text-primary transition-colors hover:bg-secondary"
                      >
                        Vezi toate specialitățile
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Hamburger (mobil) */}
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Închide meniul" : "Deschide meniul"}
                className="absolute right-3 z-20 -m-2.5 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="m-auto size-6 duration-200 group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0" />
                <X className="absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100" />
              </button>
            </div>

            {/* Panou mobil */}
            <div className="hidden px-5 pb-5 group-data-[state=active]:block lg:hidden">
              <ul className="flex flex-col gap-1 border-t border-border pt-4">
                {menuItems.map((item) =>
                  item.mega ? (
                    <li key={item.href} className="flex flex-col">
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          onClick={() => setMenuState(false)}
                          className="flex-1 rounded-xl px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                        >
                          {item.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileSpecOpen((v) => !v)}
                          aria-expanded={mobileSpecOpen}
                          aria-label={
                            mobileSpecOpen
                              ? "Ascunde specialitățile"
                              : "Arată specialitățile"
                          }
                          className="ml-1 shrink-0 rounded-xl p-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                        >
                          <ChevronDown
                            className={cn(
                              "size-5 transition-transform duration-200",
                              mobileSpecOpen && "rotate-180",
                            )}
                          />
                        </button>
                      </div>
                      {mobileSpecOpen && (
                        <ul className="mb-1 ml-3 flex flex-col gap-0.5 border-l border-border pl-3">
                          {megaSpecialties.map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/specialitati/${s.slug}`}
                                onClick={() => setMenuState(false)}
                                className="block rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                              >
                                {s.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ) : (
                    <li key={item.href} className="flex flex-col">
                      <Link
                        href={item.href}
                        onClick={() => setMenuState(false)}
                        className="block rounded-xl px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
              <div className="mt-4 flex flex-col gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full hover:bg-primary-hover"
                >
                  <Link href="/contact" onClick={() => setMenuState(false)}>
                    Programează-te
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <a
                  href={contact.phoneHref}
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="size-4" />
                  {contact.phone}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </nav>
    </header>
  );
};
