import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * Breadcrumb premium: pill flotant, blur subtil, cu iconiță Home, separatoare
 * cu chevron și pagina curentă evidențiată. Primul element (Acasă) e adăugat
 * automat.
 */
export function Breadcrumb({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="inline-flex flex-wrap items-center gap-1 rounded-full border border-border bg-card/70 px-2 py-1.5 text-sm shadow-sm shadow-foreground/5 backdrop-blur-sm">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
          >
            <Home className="size-3.5" />
            <span className="sr-only sm:not-sr-only">Acasă</span>
          </Link>
        </li>

        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              <ChevronRight
                className="size-3.5 shrink-0 text-muted-foreground/40"
                aria-hidden
              />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="rounded-full px-2.5 py-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    "rounded-full px-2.5 py-1 font-medium",
                    isLast ? "bg-secondary text-primary" : "text-foreground",
                  )}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
