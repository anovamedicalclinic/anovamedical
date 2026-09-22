-- Titulaturi oficiale pe card-urile de echipă.
--
-- 1. Titlul medicilor numește specialitatea, nu practicianul: „Medic
--    Specialist Neurologie” în loc de „Medic specialist neurolog”. Așa,
--    titlul de sub nume spune același lucru ca eticheta de specialitate de pe
--    card, cu denumirea din nomenclatorul de specialități.
-- 2. Psihologii rămân „Psiholog clinician” — e titulatura de atestat COPSI,
--    nu o specialitate medicală.
-- 3. Rolurile din echipa de suport trec la denumirea din Clasificarea
--    Ocupațiilor din România: „Asistent medical”, invariabil după gen.
--
-- Biografiile nu se ating: acolo cuvintele sunt parte din frază („este medic
-- specialist psihiatru și doctorand...”), nu titulatură pe card.

update doctors set title = 'Medic Specialist Psihiatrie'          where title = 'Medic specialist psihiatru';
update doctors set title = 'Medic Primar Psihiatrie'              where title = 'Medic primar psihiatru';
update doctors set title = 'Medic Primar Psihiatrie Pediatrică'   where title = 'Medic primar psihiatrie pediatrică';
update doctors set title = 'Medic Specialist Psihiatrie Pediatrică' where title = 'Medic specialist psihiatrie pediatrică';
update doctors set title = 'Medic Specialist Neurologie'          where title = 'Medic specialist neurolog';
update doctors set title = 'Medic Primar Neurologie'              where title = 'Medic primar neurolog';
update doctors set title = 'Medic Specialist Cardiologie'         where title = 'Medic specialist cardiolog';
update doctors set title = 'Medic Primar Cardiologie'             where title = 'Medic primar cardiolog';
update doctors set title = 'Medic Specialist Endocrinologie'      where title = 'Medic specialist endocrinolog';
update doctors set title = 'Medic Primar Endocrinologie'          where title = 'Medic primar endocrinolog';

update staff set role = 'Asistent medical'
 where role in ('Asistentă medicală', 'Asistenta medicala');

update staff set role = 'Asistent medical principal'
 where role in ('Asistentă medicală principală', 'Asistenta medicala principala');

-- Textul editabil de deasupra echipei de suport, dacă a fost suprascris din
-- panou cu varianta veche.
update site_content
   set value = replace(value, 'asistentele medicale', 'asistenții medicali')
 where key = 'echipa.support.description'
   and value like '%asistentele medicale%';
