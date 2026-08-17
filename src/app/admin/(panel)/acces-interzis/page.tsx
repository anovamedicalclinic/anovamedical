import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { requireUser, roleLabels } from "@/lib/auth/dal";

export const metadata: Metadata = { title: "Acces restricționat" };

const areaLabels: Record<string, string> = {
  content: "Texte",
  doctors: "Medici",
  staff: "Echipa de suport",
  testimonials: "Recenzii",
  appointments: "Cereri de programare",
  settings: "Setări",
  users: "Utilizatori",
};

export default async function AccesInterzisPage({
  searchParams,
}: {
  searchParams: Promise<{ sectiune?: string }>;
}) {
  const user = await requireUser();
  const { sectiune } = await searchParams;
  const area = sectiune ? areaLabels[sectiune] : undefined;

  return (
    <div className="mx-auto max-w-md py-12 text-center">
      <ShieldAlert className="mx-auto size-10 text-muted-foreground" />

      <h1 className="mt-4 text-2xl text-foreground">Acces restricționat</h1>

      <p className="mt-2 text-sm text-muted-foreground">
        {area ? (
          <>
            Secțiunea <strong className="text-foreground">{area}</strong> nu este
            disponibilă pentru rolul{" "}
            <strong className="text-foreground">
              {roleLabels[user.profile.role]}
            </strong>
            .
          </>
        ) : (
          <>
            Rolul <strong className="text-foreground">
              {roleLabels[user.profile.role]}
            </strong>{" "}
            nu are acces la această secțiune.
          </>
        )}{" "}
        Cere unui administrator să îți schimbe rolul, dacă ai nevoie de ea.
      </p>

      <Link
        href="/admin"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft className="size-4" />
        Înapoi în panou
      </Link>
    </div>
  );
}
