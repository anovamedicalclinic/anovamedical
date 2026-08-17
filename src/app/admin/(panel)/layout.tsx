import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { requireUser, roleCan, roleLabels } from "@/lib/auth/dal";
import { countNewAppointments } from "@/lib/admin/appointments";
import { signOut } from "@/lib/actions/auth";
import { AdminNav, type NavItem } from "./nav";

/**
 * Cromatica panoului: bară laterală și antet.
 *
 * `requireUser()` de aici asigură doar că avem un utilizator pentru a desena
 * meniul. NU este o barieră de securitate: layout-urile nu se re-randează la
 * fiecare navigare, deci fiecare pagină cheamă `requireRole` pe cont propriu.
 */
/**
 * Tot panoul depinde de sesiune, deci nimic de aici nu se prerandează. Setat pe
 * layout ca regula să acopere automat și paginile adăugate ulterior.
 */
export const dynamic = "force-dynamic";

const allItems: NavItem[] = [
  { href: "/admin", label: "Panou", area: "appointments", icon: "inbox" },
  { href: "/admin/cereri", label: "Cereri de programare", area: "appointments", icon: "inbox" },
  { href: "/admin/texte", label: "Texte", area: "content", icon: "text" },
  { href: "/admin/medici", label: "Medici", area: "doctors", icon: "doctors" },
  { href: "/admin/echipa-suport", label: "Echipa de suport", area: "staff", icon: "staff" },
  { href: "/admin/recenzii", label: "Recenzii", area: "testimonials", icon: "reviews" },
  { href: "/admin/utilizatori", label: "Utilizatori", area: "users", icon: "users" },
  { href: "/admin/setari", label: "Setări", area: "settings", icon: "settings" },
];

export default async function PanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await requireUser();
  const role = user.profile.role;

  const items = allItems.filter((item) => roleCan(role, item.area));

  // Numărul de cereri noi, arătat ca badge lângă „Cereri de programare”.
  const newCount = roleCan(role, "appointments")
    ? await countNewAppointments()
    : 0;

  const withBadges = items.map((item) =>
    item.href === "/admin/cereri" ? { ...item, badge: newCount } : item,
  );

  return (
    <div className="flex min-h-screen bg-secondary/30">
      {/* Bară laterală */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">
        <div className="border-b border-border px-5 py-4">
          <Logo href="/admin" />
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <AdminNav items={withBadges} />
        </div>

        <div className="border-t border-border p-3">
          <div className="px-3 py-2">
            <p className="truncate text-sm font-medium text-foreground">
              {user.profile.full_name || user.email}
            </p>
            <p className="text-xs text-muted-foreground">{roleLabels[role]}</p>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ExternalLink className="size-4" />
            Vezi site-ul
          </Link>

          <form action={signOut}>
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start gap-3 rounded-xl px-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <LogOut className="size-4" />
              Ieși din cont
            </Button>
          </form>
        </div>
      </aside>

      {/* Conținut */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Antet mobil: bara laterală e ascunsă sub lg. */}
        <header className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-3 lg:hidden">
          <Logo href="/admin" />
          <form action={signOut}>
            <Button type="submit" variant="ghost" size="sm" className="gap-2">
              <LogOut className="size-4" />
              Ieși
            </Button>
          </form>
        </header>

        <div className="overflow-x-auto border-b border-border bg-card px-2 py-2 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <AdminNav items={withBadges} orientation="horizontal" />
        </div>

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
