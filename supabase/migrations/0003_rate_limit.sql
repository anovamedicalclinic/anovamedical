-- =============================================================================
-- Anova Medical Clinic - limitare de rată pentru formularul public
--
-- Adaugă `client_ip` pe cererile de programare, ca să putem număra câte cereri
-- vin dintr-o sursă într-un interval. Fără el, formularul poate fi trimis în
-- buclă: tabelul se inundă, iar cu SMTP pornit fiecare trimitere ajunge un email
-- către clinică.
--
-- IP-ul este dată cu caracter personal, deci:
--   - nu e citibil public (tabelul nu are SELECT pentru anon);
--   - se completează server-side, din antetele platformei, nu din formular;
--   - se șterge automat după 30 de zile, cât e util pentru limitare.
-- =============================================================================

alter table public.appointment_requests
  add column if not exists client_ip text;

-- Index pe exact interogarea limitatorului: IP + fereastră de timp.
create index if not exists appointment_requests_client_ip_created_at_idx
  on public.appointment_requests (client_ip, created_at desc)
  where client_ip is not null;

-- -----------------------------------------------------------------------------
-- Ștergerea IP-urilor vechi
--
-- Păstrăm cererea (clinica are nevoie de istoric), dar golim IP-ul după 30 de
-- zile: după acest interval nu mai are nicio utilitate pentru limitare, iar
-- păstrarea lui ar fi date personale ținute fără scop.
-- -----------------------------------------------------------------------------
create or replace function public.purge_old_client_ips()
returns integer
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  affected integer;
begin
  update public.appointment_requests
     set client_ip = null
   where client_ip is not null
     and created_at < now() - interval '30 days';
  get diagnostics affected = row_count;
  return affected;
end;
$$;

comment on function public.purge_old_client_ips() is
  'Golește IP-urile mai vechi de 30 de zile. De rulat periodic (pg_cron sau job extern).';

-- Dacă extensia pg_cron e disponibilă, programăm curățarea zilnic la 03:15.
-- Pe proiectele fără pg_cron, blocul nu face nimic și nu blochează migrația.
do $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    perform cron.schedule(
      'purge-client-ips',
      '15 3 * * *',
      $cron$select public.purge_old_client_ips()$cron$
    );
  end if;
exception
  when others then
    raise notice 'pg_cron indisponibil; rulează manual public.purge_old_client_ips()';
end;
$$;
