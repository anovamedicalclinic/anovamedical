import "server-only";

import { revalidateTag } from "next/cache";

/**
 * Invalidarea cache-ului după o salvare din panou.
 *
 * `revalidateTag` acceptă un al doilea argument care decide comportamentul:
 *
 *   - `"max"` (recomandarea generală) înseamnă stale-while-revalidate: eticheta
 *     e marcată ca învechită, dar următorul vizitator primește tot conținutul
 *     vechi, iar cel proaspăt se aduce în fundal.
 *   - `{ expire: 0 }` expiră imediat: prima cerere de după salvare așteaptă
 *     datele noi și vede modificarea.
 *
 * Alegem a doua variantă pentru că panoul promite exact asta - salvezi și
 * verifici pe site. Costul e o singură cerere mai lentă după fiecare salvare,
 * ceea ce e neglijabil pentru un site editat de câteva ori pe lună.
 *
 * Forma cu un singur argument, `revalidateTag(tag)`, are aceeași semantică, dar
 * e marcată drept învechită în Next.js 16.
 */
export function refreshTag(tag: string): void {
  revalidateTag(tag, { expire: 0 });
}
