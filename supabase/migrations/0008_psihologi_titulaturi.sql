-- Titulaturile psihologilor și corectarea celei a dr. Irina Dobrin.
--
-- 1. Psihologii primesc „Psih.” în rândul mic de deasupra numelui, ca medicii
--    „Dr.”. Până acum acolo scria „Psiholog clinician”, adică exact ce scrie și
--    în titlul de sub nume — același lucru, de două ori.
-- 2. Alexandru Ungureanu e doctorand în Psihologie la UAIC din 2025.
--    Titlul are două rânduri: calitatea academică, apoi cea clinică. Textul
--    îl desparte un `\n`, iar cardurile îl redau cu `whitespace-pre-line`.
-- 3. Terapia dialectic-comportamentală nu e a dr. Irina Dobrin: titlul ei
--    revine la specialitate (vezi 0007).

update doctors
   set credentials = 'Psih.'
 where credentials = 'Psiholog clinician';

update doctors
   set title = E'Doctorand în domeniul Psihologiei\nPsiholog clinician'
 where slug = 'alexandru-ungureanu';

update doctors
   set title = 'Medic Primar Psihiatrie'
 where slug = 'irina-dobrin';
