import type { Metadata } from "next";
import { Star } from "lucide-react";
import { requireRole } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { testimonials as fallbackTestimonials } from "@/lib/testimonials";
import {
  CreateTestimonialForm,
  TestimonialCard,
  type TestimonialRow,
} from "./testimonial-editor";

export const metadata: Metadata = { title: "Recenzii" };

export const dynamic = "force-dynamic";

export default async function RecenziiPage() {
  await requireRole("testimonials");

  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("order_index", { ascending: true });

  const rows: TestimonialRow[] = (data ?? []).map((t) => ({
    id: t.id,
    author: t.author,
    rating: t.rating,
    text: t.text,
    isPublished: t.is_published,
  }));

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="text-2xl text-foreground">Recenzii</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Recenziile afișate în secțiunea „Ce spun pacienții noștri”, pe prima
          pagină. Ordinea de aici e ordinea de pe site.
        </p>
      </header>

      {rows.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
          <Star className="mx-auto size-8 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium text-foreground">
            Tabelul de recenzii e gol
          </p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Site-ul afișează deocamdată cele {fallbackTestimonials.length}{" "}
            recenzii scrise în cod. Din momentul în care adaugi prima recenzie
            aici, site-ul folosește exclusiv lista din panou.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {rows.map((row, i) => (
          <TestimonialCard
            key={row.id}
            testimonial={row}
            isFirst={i === 0}
            isLast={i === rows.length - 1}
          />
        ))}
      </div>

      <CreateTestimonialForm />
    </div>
  );
}
