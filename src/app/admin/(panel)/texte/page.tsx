import type { Metadata } from "next";
import { Info } from "lucide-react";
import { requireRole } from "@/lib/auth/dal";
import { getContentOverrides } from "@/lib/content/get";
import { contentDefaults, sectionsByPage } from "@/lib/content/registry";
import { SectionForm } from "./section-form";

export const metadata: Metadata = { title: "Texte" };

export const dynamic = "force-dynamic";

export default async function TextePage() {
  await requireRole("content");

  const overrides = await getContentOverrides();
  const overridden = new Set(Object.keys(overrides));
  const values = { ...contentDefaults, ...overrides };

  const grouped = sectionsByPage();

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <h1 className="text-2xl text-foreground">Texte</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Textele din site, grupate pe secțiuni. Modificările apar pe site în
          câteva secunde după publicare.
        </p>
      </header>

      <p className="flex items-start gap-2 rounded-xl bg-secondary/60 p-3 text-sm text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0" />
        Fiecare câmp are o limită de caractere aleasă după spațiul real din
        design. Golește un câmp și publică pentru a reveni la textul inițial.
      </p>

      {[...grouped.entries()].map(([page, sections]) => (
        <section key={page} className="space-y-4">
          <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {page}
          </h2>

          {sections.map((section) => (
            <SectionForm
              key={section.id}
              section={section}
              values={values}
              overridden={overridden}
            />
          ))}
        </section>
      ))}
    </div>
  );
}
