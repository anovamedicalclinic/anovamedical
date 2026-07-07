import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Logo-ul oficial Anova Medical Clinic.
 * `white` = varianta pe fundal închis (ex: benzi primary). Implicit color.
 */
export function Logo({
  className,
  href = "/",
  white = false,
  priority = false,
}: {
  className?: string;
  href?: string;
  white?: boolean;
  priority?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label="Anova Medical Clinic, Acasă"
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src={white ? "/logo-alb.png" : "/logo-color.png"}
        alt="Anova Medical Clinic"
        width={157}
        height={50}
        priority={priority}
        sizes="160px"
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
