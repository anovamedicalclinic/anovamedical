-- =============================================================================
-- Anova Medical Clinic - panou de administrare
--
-- Adaugă tot ce are nevoie /admin: roluri, conținut editabil, recenzii, echipa
-- de suport, setări private (SMTP), jurnal de audit și extinderea cererilor de
-- programare. Peste schema din 0001_init.sql, fără a atinge datele existente.
--
-- Migrația este idempotentă (`if not exists` / `drop policy if exists`), deci
-- poate fi rulată din nou fără efecte secundare.
--
-- Model de securitate:
--   - conținut public (site_content, testimonials, staff): SELECT public,
--     scriere doar pentru admin/editor;
--   - date de pacienți (appointment_requests): NICIUN acces public la citire,
--     doar personalul autentificat;
--   - secrete (app_settings, ex. parola SMTP): niciun rol nu are policy, deci
--     tabelul e accesibil EXCLUSIV cu service role, din server.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- profiles - utilizatorii panoului, cu rol
--
-- Un rând per utilizator din auth.users. Rolul guvernează tot accesul, atât în
-- RLS cât și în Server Actions.
--   admin     - tot, inclusiv utilizatori și setări
--   editor    - conținut (texte, medici, recenzii) + cereri de programare
--   reception - exclusiv cererile de programare
-- -----------------------------------------------------------------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  full_name  text,
  role       text not null default 'reception',
  is_active  boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_role_valid
    check (role in ('admin', 'editor', 'reception')),
  constraint profiles_full_name_len
    check (full_name is null or char_length(full_name) between 2 and 120)
);

create index if not exists profiles_role_idx on public.profiles (role);

-- -----------------------------------------------------------------------------
-- Funcții ajutătoare pentru RLS
--
-- `security definer` este esențial: fără el, o policy pe `profiles` care
-- citește `profiles` ar intra în recursiune infinită. `set search_path` previne
-- deturnarea funcției prin scheme puse în față.
-- -----------------------------------------------------------------------------
create or replace function public.auth_role()
returns text
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select p.role
  from public.profiles p
  where p.id = auth.uid()
    and p.is_active
$$;

comment on function public.auth_role() is
  'Rolul utilizatorului curent, sau null dacă nu are profil activ.';

create or replace function public.has_role(allowed text[])
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select coalesce(public.auth_role() = any(allowed), false)
$$;

comment on function public.has_role(text[]) is
  'True dacă utilizatorul curent are unul dintre rolurile date.';

-- Trigger pentru `updated_at`, refolosit de mai multe tabele.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- Orice utilizator creat în Supabase Auth (inclusiv din dashboard) primește
-- automat un profil inactiv, cu rolul minim. Astfel nu există cont cu acces
-- implicit: un admin trebuie să îl activeze explicit.
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.profiles (id, email, role, is_active)
  values (new.id, new.email, 'reception', false)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

-- -----------------------------------------------------------------------------
-- site_content - textele editabile din site, ca perechi cheie/valoare
--
-- Sursa de adevăr pentru STRUCTURĂ rămâne codul: `src/lib/content/registry.ts`
-- declară fiecare câmp editabil, cu valoarea implicită și limita de caractere.
-- Aici se stochează DOAR suprascrierile. Un tabel gol => site-ul arată exact ca
-- înainte, iar layout-ul și tipografia nu pot fi stricate din panou.
-- -----------------------------------------------------------------------------
create table if not exists public.site_content (
  key        text primary key,
  value      text,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null,
  constraint site_content_key_format
    check (key ~ '^[a-z0-9]+(\.[a-z0-9_]+)+$'),
  constraint site_content_value_len
    check (value is null or char_length(value) <= 5000)
);

-- -----------------------------------------------------------------------------
-- testimonials - recenziile de pe prima pagină
-- -----------------------------------------------------------------------------
create table if not exists public.testimonials (
  id           uuid primary key default gen_random_uuid(),
  author       text not null,
  rating       smallint not null default 5,
  text         text not null,
  is_published boolean not null default true,
  order_index  integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  constraint testimonials_rating_range check (rating between 1 and 5),
  constraint testimonials_author_len   check (char_length(author) between 2 and 120),
  constraint testimonials_text_len     check (char_length(text) between 10 and 1200)
);

create index if not exists testimonials_order_index_idx
  on public.testimonials (order_index);

drop trigger if exists testimonials_touch_updated_at on public.testimonials;
create trigger testimonials_touch_updated_at
  before update on public.testimonials
  for each row execute function public.touch_updated_at();

-- -----------------------------------------------------------------------------
-- staff - echipa de suport (conducere, asistente, recepție)
--
-- Migrează `src/lib/staff.ts` în baza de date. Aceștia nu au pagină proprie,
-- bio sau specialități - doar nume, rol și fotografie.
-- -----------------------------------------------------------------------------
create table if not exists public.staff (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  role         text not null,
  photo_url    text,
  is_published boolean not null default true,
  order_index  integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  constraint staff_name_len check (char_length(name) between 2 and 120),
  constraint staff_role_len check (char_length(role) between 2 and 120)
);

create index if not exists staff_order_index_idx on public.staff (order_index);

drop trigger if exists staff_touch_updated_at on public.staff;
create trigger staff_touch_updated_at
  before update on public.staff
  for each row execute function public.touch_updated_at();

-- -----------------------------------------------------------------------------
-- app_settings - configurări private (SMTP cPanel, destinatari notificări)
--
-- ATENȚIE: conține secrete. Tabelul are RLS activ și NICIO policy, deci nici
-- anon nici authenticated nu îl pot atinge - accesul se face exclusiv cu
-- service role, din Server Actions care verifică întâi rolul de admin.
-- -----------------------------------------------------------------------------
create table if not exists public.app_settings (
  key        text primary key,
  value      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);

drop trigger if exists app_settings_touch_updated_at on public.app_settings;
create trigger app_settings_touch_updated_at
  before update on public.app_settings
  for each row execute function public.touch_updated_at();

-- -----------------------------------------------------------------------------
-- audit_log - urmă pentru fiecare modificare făcută din panou
-- -----------------------------------------------------------------------------
create table if not exists public.audit_log (
  id          bigint generated always as identity primary key,
  actor_id    uuid references auth.users (id) on delete set null,
  actor_email text,
  action      text not null,   -- 'create' | 'update' | 'delete' | 'login' ...
  entity      text not null,   -- 'doctor' | 'content' | 'settings' ...
  entity_id   text,
  details     jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists audit_log_created_at_idx
  on public.audit_log (created_at desc);

-- -----------------------------------------------------------------------------
-- appointment_requests - câmpuri necesare pentru gestionarea din panou
-- -----------------------------------------------------------------------------
alter table public.appointment_requests
  add column if not exists notes        text,
  add column if not exists handled_by   uuid references auth.users (id) on delete set null,
  add column if not exists handled_at   timestamptz,
  add column if not exists email_status text,
  add column if not exists email_error  text;

-- Statusul primește și 'cancelled' (cerere anulată de pacient sau duplicat).
alter table public.appointment_requests
  drop constraint if exists appointment_requests_status_valid;
alter table public.appointment_requests
  add constraint appointment_requests_status_valid
    check (status in ('new', 'contacted', 'scheduled', 'cancelled'));

alter table public.appointment_requests
  drop constraint if exists appointment_requests_email_status_valid;
alter table public.appointment_requests
  add constraint appointment_requests_email_status_valid
    check (email_status is null or email_status in ('sent', 'failed'));

-- Index pentru filtrul implicit din panou (cererile noi, cele mai recente).
create index if not exists appointment_requests_status_created_at_idx
  on public.appointment_requests (status, created_at desc);

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

alter table public.profiles      enable row level security;
alter table public.site_content  enable row level security;
alter table public.testimonials  enable row level security;
alter table public.staff         enable row level security;
alter table public.app_settings  enable row level security;
alter table public.audit_log     enable row level security;

-- --- profiles ----------------------------------------------------------------
-- Fiecare își vede propriul profil (pentru a ști ce rol are); adminul vede tot.
drop policy if exists profiles_select_self_or_admin on public.profiles;
create policy profiles_select_self_or_admin
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid() or public.has_role(array['admin']));

drop policy if exists profiles_admin_write on public.profiles;
create policy profiles_admin_write
  on public.profiles
  for all
  to authenticated
  using (public.has_role(array['admin']))
  with check (public.has_role(array['admin']));

-- --- site_content ------------------------------------------------------------
drop policy if exists site_content_public_select on public.site_content;
create policy site_content_public_select
  on public.site_content
  for select
  to anon, authenticated
  using (true);

drop policy if exists site_content_editor_write on public.site_content;
create policy site_content_editor_write
  on public.site_content
  for all
  to authenticated
  using (public.has_role(array['admin', 'editor']))
  with check (public.has_role(array['admin', 'editor']));

-- --- testimonials ------------------------------------------------------------
-- Publicul vede doar recenziile publicate; personalul le vede pe toate.
drop policy if exists testimonials_public_select on public.testimonials;
create policy testimonials_public_select
  on public.testimonials
  for select
  to anon, authenticated
  using (is_published or public.has_role(array['admin', 'editor']));

drop policy if exists testimonials_editor_write on public.testimonials;
create policy testimonials_editor_write
  on public.testimonials
  for all
  to authenticated
  using (public.has_role(array['admin', 'editor']))
  with check (public.has_role(array['admin', 'editor']));

-- --- staff -------------------------------------------------------------------
drop policy if exists staff_public_select on public.staff;
create policy staff_public_select
  on public.staff
  for select
  to anon, authenticated
  using (is_published or public.has_role(array['admin', 'editor']));

drop policy if exists staff_editor_write on public.staff;
create policy staff_editor_write
  on public.staff
  for all
  to authenticated
  using (public.has_role(array['admin', 'editor']))
  with check (public.has_role(array['admin', 'editor']));

-- --- doctors / specialties / doctor_specialties ------------------------------
-- 0001 le-a dat deja SELECT public. Aici adăugăm scrierea pentru admin/editor.
drop policy if exists doctors_editor_write on public.doctors;
create policy doctors_editor_write
  on public.doctors
  for all
  to authenticated
  using (public.has_role(array['admin', 'editor']))
  with check (public.has_role(array['admin', 'editor']));

drop policy if exists specialties_editor_write on public.specialties;
create policy specialties_editor_write
  on public.specialties
  for all
  to authenticated
  using (public.has_role(array['admin', 'editor']))
  with check (public.has_role(array['admin', 'editor']));

drop policy if exists doctor_specialties_editor_write on public.doctor_specialties;
create policy doctor_specialties_editor_write
  on public.doctor_specialties
  for all
  to authenticated
  using (public.has_role(array['admin', 'editor']))
  with check (public.has_role(array['admin', 'editor']));

-- --- appointment_requests ----------------------------------------------------
-- INSERT public rămâne din 0001 (formularul de pe site). Citirea și editarea
-- sunt permise doar personalului; ștergerea, doar adminului.
drop policy if exists appointment_requests_staff_select on public.appointment_requests;
create policy appointment_requests_staff_select
  on public.appointment_requests
  for select
  to authenticated
  using (public.has_role(array['admin', 'editor', 'reception']));

drop policy if exists appointment_requests_staff_update on public.appointment_requests;
create policy appointment_requests_staff_update
  on public.appointment_requests
  for update
  to authenticated
  using (public.has_role(array['admin', 'editor', 'reception']))
  with check (public.has_role(array['admin', 'editor', 'reception']));

drop policy if exists appointment_requests_admin_delete on public.appointment_requests;
create policy appointment_requests_admin_delete
  on public.appointment_requests
  for delete
  to authenticated
  using (public.has_role(array['admin']));

-- --- audit_log ---------------------------------------------------------------
-- Doar adminul citește. Scrierea se face cu service role, din server.
drop policy if exists audit_log_admin_select on public.audit_log;
create policy audit_log_admin_select
  on public.audit_log
  for select
  to authenticated
  using (public.has_role(array['admin']));

-- app_settings: intenționat FĂRĂ policy. Doar service role are acces.

-- =============================================================================
-- STORAGE - bucket public pentru fotografii
-- =============================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'medici',
  'medici',
  true,
  5242880,                                          -- 5 MB
  array['image/webp', 'image/jpeg', 'image/png']
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists medici_public_read on storage.objects;
create policy medici_public_read
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'medici');

drop policy if exists medici_editor_write on storage.objects;
create policy medici_editor_write
  on storage.objects
  for all
  to authenticated
  using (
    bucket_id = 'medici'
    and public.has_role(array['admin', 'editor'])
  )
  with check (
    bucket_id = 'medici'
    and public.has_role(array['admin', 'editor'])
  );

-- =============================================================================
-- PRIMUL ADMIN
--
-- Trigger-ul de mai sus creează profiluri INACTIVE, deci imediat după această
-- migrație nimeni nu are acces. Creează utilizatorul în Supabase (Authentication
-- -> Users -> Add user), apoi rulează o singură dată, cu emailul tău:
--
--   update public.profiles
--      set role = 'admin', is_active = true
--    where email = 'adresa@exemplu.ro';
--
-- De acolo încolo, utilizatorii se gestionează din /admin/utilizatori.
-- =============================================================================
