-- Corectează abrevierea: TSPT -> PTSD în tabelul `specialties`.
-- Rulează în Supabase: Dashboard → SQL Editor → Run.
-- Sigur și idempotent (poate fi rulat de mai multe ori).

update public.specialties
set description = replace(description, '(TSPT)', '(PTSD)')
where description like '%(TSPT)%';

-- Verificare (opțional): ar trebui să afișeze 0 rânduri după update.
-- select slug from public.specialties where description like '%TSPT%';
