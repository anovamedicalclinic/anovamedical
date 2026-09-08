"use client";

import { useState } from "react";
import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * `<Link>` care preîncarcă ruta abia când utilizatorul arată intenție, nu de
 * cum intră în ecran.
 *
 * Comportamentul implicit al Next.js preîncarcă fiecare link vizibil. Pe
 * `/echipa`, cu 21 de medici, asta însemna ~30 de cereri suplimentare care se
 * bat pe bandă exact cu fotografiile și cu scriptul paginii - pe o conexiune
 * mobilă slabă, tocmai când vizitatorul așteaptă conținutul.
 *
 * Aici preîncărcarea pornește la `mouseenter`, la focus din tastatură sau la
 * prima atingere. `prefetch={null}` readuce comportamentul standard, deci
 * navigarea rămâne instantanee pentru cine chiar se îndreaptă spre link.
 */
export function PrefetchLink({
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "prefetch">) {
  const [intent, setIntent] = useState(false);
  const arm = () => setIntent(true);

  return (
    <Link
      {...props}
      prefetch={intent ? null : false}
      onMouseEnter={arm}
      onFocus={arm}
      onTouchStart={arm}
    >
      {children}
    </Link>
  );
}
