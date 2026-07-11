"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/reveal";
import { conditionDescriptions } from "@/lib/condition-descriptions";
import { cn } from "@/lib/utils";

/**
 * Pilule de afecțiuni interactive: la click pe o afecțiune care are descriere,
 * se deschide un panou (cu fade) sub grilă, cu detalii despre aceasta.
 */
export function ConditionPills({
  items,
  onCard,
}: {
  items: string[];
  onCard: boolean;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const itemBg = onCard ? "bg-background" : "bg-card";
  const description = selected ? conditionDescriptions[selected] : undefined;

  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {items.map((item, i) => {
          const hasDesc = Boolean(conditionDescriptions[item]);
          const isActive = selected === item;

          return (
            <Reveal key={item} delay={i * 0.03}>
              <button
                type="button"
                disabled={!hasDesc}
                onClick={() => setSelected(isActive ? null : item)}
                aria-expanded={isActive}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm shadow-foreground/[0.03] transition-all duration-200",
                  itemBg,
                  hasDesc &&
                    "cursor-pointer hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:shadow-primary/25",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "border-border text-foreground",
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full transition-colors duration-200",
                    isActive
                      ? "bg-primary-foreground"
                      : "bg-sage group-hover:bg-primary-foreground",
                  )}
                />
                {item}
              </button>
            </Reveal>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {description && (
          <motion.div
            key={selected}
            initial={reduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "mt-4 rounded-2xl border border-primary/15 p-4 sm:p-5",
              onCard ? "bg-background" : "bg-accent/40",
            )}
          >
            <p className="text-sm font-semibold text-primary">{selected}</p>
            <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
