import { createElement } from "react";
import {
  Activity,
  Baby,
  Brain,
  Droplets,
  HeartHandshake,
  HeartPulse,
  MessagesSquare,
  Stethoscope,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

/**
 * Mapează numele de iconiță stocat în Supabase (`specialties.icon`)
 * la componenta lucide-react corespunzătoare.
 */
const iconMap: Record<string, LucideIcon> = {
  brain: Brain,
  baby: Baby,
  "heart-handshake": HeartHandshake,
  "messages-square": MessagesSquare,
  activity: Activity,
  stethoscope: Stethoscope,
  "heart-pulse": HeartPulse,
  droplets: Droplets,
};

export function getSpecialtyIcon(name: string | null | undefined): LucideIcon {
  if (!name) return HeartHandshake;
  return iconMap[name] ?? HeartHandshake;
}

/**
 * Randează iconița unei specialități după numele stocat în DB.
 * Folosește createElement pentru a evita crearea unei componente în timpul
 * randării (regula react-hooks/static-components).
 */
export function SpecialtyIcon({
  icon,
  ...props
}: { icon: string | null | undefined } & LucideProps) {
  return createElement(getSpecialtyIcon(icon), props);
}
