-- Curățenie în antetul card-urilor de pe /echipa.
--
-- 1. „medic primar” apărea și în `credentials` (rândul mic de deasupra
--    numelui), și în `title` (rândul de sub nume) — aceeași informație de
--    două ori. Rămâne doar în `title`.
-- 2. Dr. Palimariciuc și dr. Florea nu mai sunt asistenți universitari, așa
--    că titulatura dispare din credențiale și din biografii. Unde propoziția
--    rămânea ciupită, se pune calitatea care e în continuare valabilă
--    (doctorand), nu se inventează alta.
--
-- Biografiile se modifică prin `replace` pe fragment, nu prin rescrierea
-- întregului text: restul frazei rămâne bit-identic cu ce e în baza acum.

update doctors
   set credentials = 'Dr.'
 where slug in (
   'andra-morasan',
   'cartas-nicoleta',
   'georgean-rozinbaum',
   'gilea-andra',
   'tudor-florea',
   'matei-palimariciuc'
 );

update doctors
   set short_bio = replace(short_bio, 'psihiatru și asistent universitar,', 'psihiatru,'),
       full_bio  = replace(full_bio,  'psihiatru și asistent universitar,', 'psihiatru,')
 where slug = 'tudor-florea';

update doctors
   set short_bio = replace(short_bio, 'psihiatru și asistent universitar,', 'psihiatru,'),
       full_bio  = replace(full_bio,  'psihiatru și asistent universitar la Catedra',
                                      'psihiatru și doctorand la Catedra')
 where slug = 'matei-palimariciuc';
