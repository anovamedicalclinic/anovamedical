import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { doctorPhoto } from "@/lib/doctor-photos";
import {
  CreateDoctorForm,
  DoctorCardEditor,
  type DoctorRow,
  type SpecialtyOption,
} from "./doctor-form";

export const metadata: Metadata = { title: "Medici" };

export default async function MediciPage() {
  await requireRole("doctors");

  const supabase = await createClient();

  const [{ data: doctors }, { data: specialties }, { data: links }] =
    await Promise.all([
      supabase.from("doctors").select("*").order("order_index"),
      supabase.from("specialties").select("id, name").order("order_index"),
      supabase.from("doctor_specialties").select("doctor_id, specialty_id"),
    ]);

  const byDoctor = new Map<string, string[]>();
  for (const link of links ?? []) {
    const list = byDoctor.get(link.doctor_id) ?? [];
    list.push(link.specialty_id);
    byDoctor.set(link.doctor_id, list);
  }

  const rows: DoctorRow[] = (doctors ?? []).map((d) => ({
    id: d.id,
    slug: d.slug,
    name: d.name,
    title: d.title,
    credentials: d.credentials,
    shortBio: d.short_bio,
    fullBio: d.full_bio,
    photoUrl: d.photo_url,
    // Ce se vede efectiv pe site: `photo_url` dacă există, altfel fișierul
    // mapat local, altfel placeholder.
    displayPhoto: doctorPhoto({ slug: d.slug, photo_url: d.photo_url }),
    isFounder: d.is_founder,
    specialtyIds: byDoctor.get(d.id) ?? [],
  }));

  const options: SpecialtyOption[] = (specialties ?? []).map((s) => ({
    id: s.id,
    name: s.name,
  }));

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="text-2xl text-foreground">Medici</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {rows.length} specialiști. Ordinea de aici e ordinea de pe pagina
          Echipa și în caruselul de pe prima pagină.
        </p>
      </header>

      <div className="space-y-3">
        {rows.map((row, i) => (
          <DoctorCardEditor
            key={row.id}
            doctor={row}
            specialties={options}
            isFirst={i === 0}
            isLast={i === rows.length - 1}
          />
        ))}
      </div>

      <CreateDoctorForm specialties={options} />
    </div>
  );
}
