-- Dr. Andra Dorneanu a plecat din echipă.
--
-- Legătura din `doctor_specialties` e `on delete cascade`, deci dispare odată
-- cu rândul din `doctors`. Endocrinologia rămâne fără niciun medic asociat;
-- pagina specialității își ascunde singură secțiunea de echipă.

delete from doctors
 where slug = 'dorneanu-andra';
