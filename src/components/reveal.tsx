"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
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
  /** Elementul HTML randat (implicit div). */
  as?: "div" | "li" | "span";
} & Omit<HTMLMotionProps<"div">, "children">;

/**
 * Wrapper pentru animații subtile la scroll: fade + translate (+ scale opțional),
 * o singură dată. Respectă `prefers-reduced-motion` (conținut static).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  x = 0,
  scale,
  duration = 0.6,
  as = "div",
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag
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
      initial={{ opacity: 0, y, x, ...(scale ? { scale } : {}) }}
      whileInView={{ opacity: 1, y: 0, x: 0, ...(scale ? { scale: 1 } : {}) }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </MotionComp>
  );
}
