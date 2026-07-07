import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import type { TimelineItem } from "@/lib/doctor-details";

/** Bloc de timeline vertical premium: antet cu iconiță + listă cu marcaje. */
export function TimelineBlock({
  icon: Icon,
  title,
  items,
}: {
  icon: LucideIcon;
  title: string;
  items: TimelineItem[];
}) {
  return (
    <div>
      <h2 className="flex items-center gap-3 text-xl text-foreground">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        {title}
      </h2>

      <ol className="relative ml-1.5 mt-6 border-l border-border">
        {items.map((item, i) => (
          <Reveal
            as="li"
            key={`${item.period ?? ""}-${i}`}
            delay={i * 0.04}
            className="relative pb-7 pl-7 last:pb-0"
          >
            <span
              aria-hidden
              className="absolute -left-[7px] top-1 size-3.5 rounded-full border-2 border-primary bg-background"
            />
            {item.period && (
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-sage-strong">
                {item.period}
              </p>
            )}
            <p className="mt-0.5 text-sm leading-relaxed text-foreground/90">
              {item.text}
            </p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
