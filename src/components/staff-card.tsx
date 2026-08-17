import Image from "next/image";
import type { StaffMember } from "@/lib/supabase/types";

/**
 * Card pentru echipa de suport. Variantă simplificată a `DoctorCard`: aceleași
 * proporții și stil, dar fără link către pagină individuală (acești membri nu
 * au profil propriu).
 */
export function StaffCard({ member }: { member: StaffMember }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card">
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <Image
          src={member.photo_url ?? "/medici/Placeholder.webp"}
          alt={`Portret ${member.name}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-top"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4 sm:gap-1.5 sm:p-6">
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-sage-strong sm:text-xs sm:tracking-[0.14em]">
          {member.role}
        </span>
        <h3 className="text-base leading-tight text-foreground sm:text-lg">
          {member.name}
        </h3>
      </div>
    </div>
  );
}
