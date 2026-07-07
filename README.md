# Anova Medical Clinic

Website de prezentare pentru **Anova Medical Clinic** (AMEDICALCLINIC SRL), clinică de sănătate mintală și neurologică din Iași.

> Învingem obstacolele, restabilim echilibrul.

## Stack

- **Next.js 16** (App Router, RSC, Turbopack) + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (registry radix)
- **Supabase** (Postgres + RLS) prin `@supabase/ssr`
- **Framer Motion** (`motion/react`) pentru animații
- **React Hook Form** + **Zod** pentru formulare
- **lucide-react**, `next/font` (Fraunces + Inter), `next/image`
- Deploy: **Vercel**

## Dezvoltare locală

```bash
pnpm install
pnpm dev
```

Aplicația pornește pe [http://localhost:3000](http://localhost:3000).

Alte comenzi:

```bash
pnpm build   # build de producție
pnpm start   # rulează build-ul
pnpm lint    # ESLint
```

## Variabile de mediu

Copiază `.env.example` în `.env.local` și completează cheile Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Fără aceste chei, site-ul rulează pe **datele de rezervă** din `src/lib/fallback-data.ts`, astfel încât se poate construi și rula fără o bază de date conectată. Odată setate cheile, comută automat pe Supabase.

## Baza de date

Scripturile SQL sunt în `supabase/`:

1. `migrations/0001_init.sql` — schema + politicile RLS
2. `seed.sql` — specialitățile, medicii și relațiile (idempotent)

Se rulează în SQL Editor din proiectul Supabase.

## Structură

```
src/
  app/            # rute (App Router)
  components/     # componente UI și de layout
  lib/            # config, acces la date, conținut, utilitare
public/           # imagini (medici, servicii, logo, video)
supabase/         # migrații + seed
```

---

Made with ❤️ by [Inovex.ro](https://inovex.ro)
