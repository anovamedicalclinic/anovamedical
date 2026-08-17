import type { Metadata } from "next";
import { UsersRound } from "lucide-react";
import { requireRole } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { staff as fallbackStaff } from "@/lib/staff";
import {
  CreateStaffForm,
  StaffCardEditor,
  type StaffRow,
} from "./staff-form";

export const metadata: Metadata = { title: "Echipa de suport" };

export default async function EchipaSuportPage() {
  await requireRole("staff");

  const supabase = await createClient();
  const { data } = await supabase
    .from("staff")
    .select("*")
    .order("order_index", { ascending: true });

  const rows: StaffRow[] = (data ?? []).map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    photoUrl: m.photo_url,
    isPublished: m.is_published,
  }));

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="text-2xl text-foreground">Echipa de suport</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Conducerea și asistentele medicale, afișate la finalul paginii Echipa.
          Nu au pagină individuală.
        </p>
      </header>

      {rows.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
          <UsersRound className="mx-auto size-8 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium text-foreground">
            Tabelul e gol
          </p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Site-ul afișează deocamdată cei {fallbackStaff.length} membri scriși
            în cod. Din momentul în care adaugi primul membru aici, site-ul
            folosește exclusiv lista din panou.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {rows.map((row, i) => (
          <StaffCardEditor
            key={row.id}
            member={row}
            isFirst={i === 0}
            isLast={i === rows.length - 1}
          />
        ))}
      </div>

      <CreateStaffForm />
    </div>
  );
}
