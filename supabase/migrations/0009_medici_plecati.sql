-- Doi medici au plecat din echipă: dr. Georgean Rozinbaum și Paula Stănciulescu.
--
-- Legăturile din `doctor_specialties` sunt `on delete cascade`, deci dispar
-- odată cu rândul din `doctors`. Psihiatria pediatrică rămâne fără niciun medic
-- asociat; pagina specialității își ascunde singură secțiunea de echipă.

delete from doctors
 where slug in ('georgean-rozinbaum', 'paula-stanciulescu');
