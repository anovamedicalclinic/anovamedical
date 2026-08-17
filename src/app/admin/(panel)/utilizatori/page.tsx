import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { CreateUserForm, UserList, type UserRow } from "./user-list";

export const metadata: Metadata = { title: "Utilizatori" };

export const dynamic = "force-dynamic";

export default async function UtilizatoriPage() {
  const current = await requireRole("users");

  // Citit cu sesiunea administratorului: policy-ul `profiles_select_self_or_admin`
  // îi lasă să vadă tot, deci nu e nevoie de service role aici.
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, is_active, created_at")
    .order("created_at", { ascending: true });

  const users: UserRow[] = (data ?? []).map((p) => ({
    id: p.id,
    email: p.email,
    fullName: p.full_name,
    role: p.role,
    isActive: p.is_active,
    createdAt: p.created_at,
  }));

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <h1 className="text-2xl text-foreground">Utilizatori</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Cine are acces la panou și cu ce drepturi.
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h2 className="text-lg text-foreground">
          Conturi ({users.length})
        </h2>
        <div className="mt-2">
          <UserList users={users} currentUserId={current.id} />
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h2 className="text-lg text-foreground">Adaugă un cont</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Contul e activ imediat, cu rolul ales.
        </p>
        <div className="mt-5">
          <CreateUserForm />
        </div>
      </section>
    </div>
  );
}
