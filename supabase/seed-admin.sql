-- =============================================================================
-- Anova Medical Clinic - date inițiale pentru panoul de administrare
--
-- Mută în baza de date conținutul care până acum trăia în cod:
--   - recenziile din `src/lib/testimonials.ts`
--   - echipa de suport din `src/lib/staff.ts`
--
-- Se rulează O SINGURĂ DATĂ, după 0002_admin.sql. Fiecare bloc verifică întâi
-- dacă tabelul e gol, deci o rulare repetată nu duplică nimic.
--
-- Textele din site (titluri, descrieri) NU au nevoie de seed: `site_content`
-- păstrează doar suprascrierile, iar valorile implicite sunt deja în cod, în
-- `src/lib/content/registry.ts`. Un tabel gol înseamnă „exact ca înainte”.
-- =============================================================================

-- ------------------------------------------------------------------ recenzii
insert into public.testimonials (author, rating, text, order_index)
select * from (values
  (
    'Ioana Pavel', 5::smallint,
    'Cea mai bună clinică, cu cei mai bine pregătiți medici! Recomand cu drag! 🤗😊',
    0
  ),
  (
    'Georgiana Ignat', 5::smallint,
    'Sunt foarte mulțumită de serviciile oferite de Clinica Anova. Toată lumea a fost drăguță cu mine, m-a ascultat și mi-a oferit suport când am avut cel mai mult nevoie. Voi rămâne datoare toată viața pentru cât m-au ajutat, de la fetele de la recepție până la domnul psiholog Alexandru Ungureanu și doamna psihiatru Andra Morășan. Recomand cu toată inima!',
    1
  ),
  (
    'Oana C.', 5::smallint,
    'O recomand cu încredere ca medic diabetolog pe dr. Ungureanu Adelina, este o persoană dedicată și foarte atentă cu pacienții. Am apreciat răbdarea și modul clar în care explică.',
    2
  ),
  (
    'Laura Ioana Bucovanu', 5::smallint,
    'Recomand cu mare drag! Dna dr. Marceza este o profesionistă în domeniu! 🤗',
    3
  ),
  (
    'Marcel Vasilache', 5::smallint,
    'Recomand cu toată încrederea Clinica Anova. Mulțumesc din suflet doamnei dr. Cristofor, datorită devotamentului și profesionalismului său mama încă ne mai recunoaște și încă mai putem vorbi cu ea. De asemenea, recomand și îi mulțumesc doamnei dr. Mihaela Ungureanu.',
    4
  ),
  (
    'Pina Movileanu', 5::smallint,
    'Personal amabil, receptiv la nevoile pacienților, atmosferă plăcută. Doamna doctor Irina Dobrin este un medic profesionist, empatic, răspunde cu răbdare tuturor întrebărilor.',
    5
  ),
  (
    'Pascal Maricica', 5::smallint,
    'Cele mai drăguțe doamne doctor. Foarte empatice, sociabile și mereu disponibile pentru pacient. Recomand cu toată încrederea.',
    6
  ),
  (
    'Georgiana Ungureanu', 5::smallint,
    'Cei mai buni medici! Foarte empatici, săritori și mereu atenți cu pacientul. În special dna dr. Georgiana Coștiug și dna psihiatru Silvia Tudosă.',
    7
  )
) as seed (author, rating, text, order_index)
where not exists (select 1 from public.testimonials);

-- --------------------------------------------------------- echipa de suport
-- Fotografiile rămân fișierele deja aflate în `public/medici`. O poză înlocuită
-- din panou va fi încărcată în Supabase Storage și va suprascrie calea de aici.
insert into public.staff (name, role, photo_url, order_index)
select * from (values
  ('Cristian Hogaș',     'Director',            '/medici/DirectorHogasCristian.webp', 0),
  ('Ema Urzică',         'Asistentă medicală',  '/medici/EmaUrzica.webp',             1),
  ('Marina Atodiresei',  'Asistentă medicală',  '/medici/MarinaAtodiresei.webp',      2),
  ('Damaris Smântână',   'Asistentă medicală',  '/medici/SmantanaDamaris.webp',       3),
  ('Tatiana Barbieru',   'Asistentă medicală',  '/medici/BarbieruTatiana.webp',       4)
) as seed (name, role, photo_url, order_index)
where not exists (select 1 from public.staff);
