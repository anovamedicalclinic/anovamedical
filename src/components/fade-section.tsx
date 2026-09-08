"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Învelește o secțiune și o aduce în prim-plan cu un fade (opacity 0 → 1)
 * la intrarea în viewport, o singură dată.
 *
 * Aceeași regulă ca la [Reveal]: serverul trimite secțiunea vizibilă, iar
 * fade-ul se armează după hidratare, doar dacă secțiunea e sub ecran. Vezi
 * comentariul din `reveal.tsx` pentru ce se strica altfel.
 */
export function FadeSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, []);

  if (!armed) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -120px 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
