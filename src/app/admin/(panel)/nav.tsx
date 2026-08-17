"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Inbox,
  Settings,
  Star,
  Stethoscope,
  Users,
  UsersRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Area } from "@/lib/auth/roles";

export type NavItem = {
  href: string;
  label: string;
  area: Area;
  icon: keyof typeof icons;
  badge?: number;
};

const icons = {
  inbox: Inbox,
  text: FileText,
  doctors: Stethoscope,
  staff: UsersRound,
  reviews: Star,
  users: Users,
  settings: Settings,
} as const;

/**
 * Navigația panoului. Primește doar elementele la care rolul curent are acces -
 * filtrarea se face pe server, în layout, ca să nu ajungă în bundle linkuri pe
 * care utilizatorul nu le poate folosi.
 */
export function AdminNav({
  items,
  orientation = "vertical",
}: {
  items: NavItem[];
  /** `horizontal` e varianta pentru bara de sub antet, pe ecrane mici. */
  orientation?: "vertical" | "horizontal";
}) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        orientation === "vertical" ? "space-y-1" : "flex items-center gap-1",
      )}
    >
      {items.map((item) => {
        const Icon = icons[item.icon];
        // `/admin` e activ doar exact; restul și pe subpagini.
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
              orientation === "horizontal" && "shrink-0 whitespace-nowrap",
              active
                ? "bg-primary/10 font-medium text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className={orientation === "vertical" ? "flex-1" : undefined}>
              {item.label}
            </span>
            {item.badge ? (
              <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[0.65rem] font-semibold text-primary-foreground">
                {item.badge > 99 ? "99+" : item.badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
