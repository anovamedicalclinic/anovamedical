"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Întârziere în secunde pentru efecte în cascadă. */
  delay?: number;
  /** Distanța de translație pe Y la intrare (px). */
  y?: number;
  /** Distanța de translație pe X la intrare (px). Pozitiv = dinspre dreapta. */
  x?: number;
  /** Scală inițială la intrare (ex: 1.06 pentru un micro-zoom subtil). */
  scale?: number;
  /** Durata animației în secunde. */
  duration?: number;
  /** Cât de neclar pornește conținutul, în px. 0 dezactivează. */
  blur?: number;
  /** Elementul HTML randat (implicit div). */
  as?: "div" | "li" | "span";
} & Omit<HTMLMotionProps<"div">, "children">;

/**
 * Wrapper pentru animații subtile la scroll: conținutul intră estompat și se
 * limpezește, cu fade + translate (+ scale opțional), o singură dată.
 *
 * Regula de bază: **conținutul nu depinde niciodată de JavaScript ca să fie
 * vizibil.** Serverul randează un element obișnuit, fără niciun stil inline,
 * deci textul se vede din primul paint - pe orice dispozitiv, pe orice
 * conexiune, chiar dacă bundle-ul nu ajunge niciodată.
 *
 * Animația se „armează" abia după hidratare și numai pentru elementele aflate
 * SUB ecran în acel moment. Astfel:
 *
 *  - ce se vede deja la încărcare rămâne vizibil, fără clipire și fără să
 *    aștepte nimic (contează direct pentru LCP);
 *  - ce e mai jos pornește ascuns și se animează la derulare, ca înainte -
 *    schimbarea de stare se petrece în afara ecranului, deci nu se observă;
 *  - dacă JavaScript-ul nu rulează deloc, nimic nu se armează și pagina rămâne
 *    pur și simplu întreagă.
 *
 * Varianta anterioară făcea exact invers - pleca de la `opacity:0` randat pe
 * server - și golea complet site-ul ori de câte ori JS-ul întârzia sau pica.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  x = 0,
  scale,
  duration = 0.6,
  blur = 6,
  as = "div",
  ...props
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Strict ce e sub marginea de jos a ecranului. `getBoundingClientRect` e
    // citit o singură dată, la montare, deci nu costă nimic la derulare.
    if (el.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, []);

  if (!armed) {
    const Tag = as;
    return (
      <Tag
        ref={ref as React.Ref<never>}
        className={className}
        {...(props as unknown as React.HTMLAttributes<HTMLElement>)}
      >
        {children}
      </Tag>
    );
  }

  const MotionComp = (
    as === "li" ? motion.li : as === "span" ? motion.span : motion.div
  ) as unknown as typeof motion.div;

  return (
    <MotionComp
      className={cn(className)}
      initial={{
        opacity: 0,
        y,
        x,
        ...(blur ? { filter: `blur(${blur}px)` } : {}),
        ...(scale ? { scale } : {}),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        ...(blur ? { filter: "blur(0px)" } : {}),
        ...(scale ? { scale: 1 } : {}),
      }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: duration + 0.15, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </MotionComp>
  );
}
