-- =============================================================================
-- Anova Medical Clinic - schema inițială
-- Tabele: specialties, doctors, doctor_specialties, appointment_requests
-- Row Level Security activat pe toate tabelele (vezi secțiunea RLS de mai jos).
-- =============================================================================

-- -----------------------------------------------------------------------------
-- specialties - cele 5 specialități ale clinicii
-- -----------------------------------------------------------------------------
create table if not exists public.specialties (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  tagline     text,              -- subtitlu scurt
  summary     text,              -- descriere card (1–2 fraze)
  description text,              -- conținut lung pagina (markdown)
  icon        text,              -- nume iconiță lucide-react
  order_index integer not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists specialties_order_index_idx
  on public.specialties (order_index);

-- -----------------------------------------------------------------------------
-- doctors - specialiștii clinicii
-- -----------------------------------------------------------------------------
create table if not exists public.doctors (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  title       text,              -- ex: „Medic specialist psihiatru"
  credentials text,              -- ex: „Dr.", „Prof. Univ. Dr."
  photo_url   text,
  short_bio   text,              -- pentru card
  full_bio    text,              -- pagina individuală
  order_index integer not null default 0,
  is_founder  boolean not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists doctors_order_index_idx
  on public.doctors (order_index);

-- -----------------------------------------------------------------------------
-- doctor_specialties - relație many-to-many medic <-> specialitate
-- -----------------------------------------------------------------------------
create table if not exists public.doctor_specialties (
  doctor_id    uuid not null references public.doctors (id) on delete cascade,
  specialty_id uuid not null references public.specialties (id) on delete cascade,
  primary key (doctor_id, specialty_id)
);

create index if not exists doctor_specialties_specialty_id_idx
  on public.doctor_specialties (specialty_id);

-- -----------------------------------------------------------------------------
-- appointment_requests - cereri din formularul de contact (date private)
-- -----------------------------------------------------------------------------
create table if not exists public.appointment_requests (
  id             uuid primary key default gen_random_uuid(),
  full_name      text not null,
  email          text,
  phone          text not null,
  specialty_id   uuid references public.specialties (id) on delete set null,
  message        text,
  preferred_date date,
  status         text not null default 'new',
  created_at     timestamptz not null default now(),
  constraint appointment_requests_full_name_len
    check (char_length(full_name) between 2 and 200),
  constraint appointment_requests_email_present
    check (char_length(email) between 3 and 320),
  constraint appointment_requests_phone_present
    check (char_length(phone) between 4 and 40),
  constraint appointment_requests_status_valid
    check (status in ('new', 'contacted', 'scheduled'))
);

create index if not exists appointment_requests_created_at_idx
  on public.appointment_requests (created_at desc);

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

alter table public.specialties          enable row level security;
alter table public.doctors               enable row level security;
alter table public.doctor_specialties    enable row level security;
alter table public.appointment_requests  enable row level security;

-- --- Conținut public: lizibil de oricine (anon + authenticated), fără scriere ---

create policy "specialties_public_select"
  on public.specialties
  for select
  to anon, authenticated
  using (true);

create policy "doctors_public_select"
  on public.doctors
  for select
  to anon, authenticated
  using (true);

create policy "doctor_specialties_public_select"
  on public.doctor_specialties
  for select
  to anon, authenticated
  using (true);

-- --- Cereri de programare: doar INSERT public; NICIUN select public ---
-- Datele pacienților sunt private. Citirea se face exclusiv cu service role
-- (care ocolește RLS), niciodată din browser.

create policy "appointment_requests_public_insert"
  on public.appointment_requests
  for insert
  to anon, authenticated
  with check (true);
