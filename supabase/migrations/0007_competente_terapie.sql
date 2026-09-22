-- Competențele de psihoterapie intră în titlul de sub nume, lângă specialitate.
--
-- Titlul e singurul rând care descrie ce face medicul, iar formarea în
-- psihoterapie e parte din asta, nu o notă separată: dr. Irina Dobrin lucrează
-- în terapie dialectic-comportamentală, iar Mihaela Ungureanu e psihoterapeut
-- în terapie cognitiv-comportamentală.

update doctors
   set title = 'Medic Primar Psihiatrie, Terapie dialectic-comportamentală'
 where slug = 'irina-dobrin';

update doctors
   set title = 'Psiholog clinician, Psihoterapeut TCC'
 where slug = 'mihaela-ungureanu';
