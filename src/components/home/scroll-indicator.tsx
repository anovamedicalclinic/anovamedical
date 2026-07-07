"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

/**
 * Indiciu animat de scroll în partea de jos a hero-ului: un „mouse" cu o bilă
 * care coboară în buclă. Se estompează pe măsură ce utilizatorul derulează.
 * Respectă prefers-reduced-motion.
 */
export function ScrollIndicator() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
      aria-hidden
    >
      <div className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/40 p-1.5">
        <motion.span
          className="size-1.5 rounded-full bg-primary"
          animate={reduce ? undefined : { y: [0, 10, 0], opacity: [1, 0.2, 1] }}
          transition={
            reduce
              ? undefined
              : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </div>
    </motion.div>
  );
}
