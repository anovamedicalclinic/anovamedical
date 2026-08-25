import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Fisher–Yates: întoarce o copie amestecată, fără să atingă lista primită.
 * Folosește `Math.random()`, deci apelantul trebuie să fie randat la request
 * (vezi `connection()` în pagina echipei), altfel ordinea rămâne cea din build.
 */
export function shuffle<T>(items: readonly T[]): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}
