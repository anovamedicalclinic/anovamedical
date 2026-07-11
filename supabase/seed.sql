-- =============================================================================
-- Anova Medical Clinic - date inițiale (seed)
-- Conținut real din brief (secțiunea 8). Idempotent: rerularea actualizează
-- rândurile existente după `slug` (on conflict do update).
-- =============================================================================

-- -----------------------------------------------------------------------------
-- SPECIALITĂȚI
-- -----------------------------------------------------------------------------
insert into public.specialties (slug, name, tagline, summary, description, icon, order_index)
values
  (
    'psihiatrie',
    'Psihiatrie',
    'O abordare holistică pentru sănătatea mintală.',
    'Evaluări și tratamente personalizate pentru anxietate, depresie, tulburări de somn și alte afecțiuni psihiatrice.',
    $md$Echipa noastră de medici psihiatri îți oferă un cadru confidențial și empatic, în care fiecare poveste este ascultată cu atenție. Pornim de la o evaluare atentă a nevoilor tale și construim împreună un plan de tratament personalizat, adaptat ritmului și obiectivelor tale.

Credem într-o îngrijire care privește persoana în întregul ei, nu doar simptomele. De aceea îmbinăm evaluarea clinică riguroasă cu blândețea și răbdarea necesare pentru a-ți recâștiga echilibrul.

## Semne care indică nevoia unui consult
- Probleme de somn (insomnie sau somn excesiv)
- Modificări de apetit sau greutate
- Dificultăți de concentrare sau de memorie
- Tendința de a te izola de cei din jur
- Iritabilitate sau fluctuații frecvente de dispoziție
- Apatie, lipsă de interes pentru activitățile obișnuite
- Oboseală persistentă sau, dimpotrivă, energie excesivă
- Declin în funcționarea socială sau profesională

## Afecțiuni frecvente
- Anxietate
- Depresie
- Demență
- Tulburări de somn
- Tulburare afectivă bipolară
- Tulburări de alimentație
- Dependențe
- Tulburare de stres post-traumatic (PTSD)
- Tulburări de personalitate
- Schizofrenie

## Strategii de prevenție
- Practicarea mindfulness-ului și a tehnicilor de relaxare
- Exercițiu fizic regulat
- Nutriție echilibrată
- Un program de somn regulat
- Gestionarea sănătoasă a stresului
- Cultivarea relațiilor sănătoase și a sprijinului social
- Recunoașterea și exprimarea emoțiilor$md$,
    'brain',
    1
  ),
  (
    'psihiatrie-pediatrica',
    'Psihiatrie Pediatrică',
    'Sprijin pentru sănătatea mintală a copiilor și adolescenților.',
    'Susținem dezvoltarea armonioasă a celor mici printr-o îngrijire blândă și specializată.',
    $md$Sănătatea mintală a copiilor și adolescenților cere o atenție specială și un limbaj pe înțelesul lor. Medicii noștri specializați în psihiatrie pediatrică creează un mediu cald și sigur, în care cei mici se simt înțeleși, iar părinții găsesc sprijin și îndrumare.

Lucrăm îndeaproape cu familia pentru a susține dezvoltarea armonioasă a copilului, abordând cu delicatețe provocările emoționale, de comportament sau de adaptare specifice fiecărei vârste.$md$,
    'baby',
    2
  ),
  (
    'psihologie',
    'Psihologie',
    'Un spațiu sigur pentru a-ți explora gândurile.',
    'Într-un mediu confidențial și empatic, psihologii noștri te ajută să înțelegi și să gestionezi emoțiile.',
    $md$Psihoterapia este un drum pe care nu trebuie să îl parcurgi singur. Într-un spațiu confidențial și lipsit de judecată, psihologii noștri te însoțesc în explorarea gândurilor și emoțiilor, ajutându-te să găsești resurse și strategii potrivite pentru tine.

Fie că treci printr-o perioadă dificilă, fie că îți dorești o mai bună cunoaștere de sine, te sprijinim să îți recâștigi echilibrul și să construiești relații mai sănătoase cu tine și cu cei din jur.$md$,
    'messages-square',
    3
  ),
  (
    'neurologie',
    'Neurologie',
    'De la migrene la afecțiuni neurodegenerative.',
    'Diagnostic și tratament pentru o gamă largă de afecțiuni neurologice.',
    $md$Sistemul nervos influențează profund calitatea vieții noastre. În cadrul consultațiilor de neurologie, evaluăm și tratăm o gamă largă de afecțiuni, de la migrene și tulburări de somn până la afecțiuni neurodegenerative.

Punem accent pe un diagnostic corect și pe un plan de tratament adaptat fiecărui pacient, cu explicații clare la fiecare pas, astfel încât să înțelegi ce se întâmplă și ce urmează.$md$,
    'activity',
    4
  ),
  (
    'cardiologie',
    'Cardiologie',
    'Sănătatea inimii, cu grijă și prevenție.',
    'Diagnostic, tratament și prevenție pentru afecțiunile inimii și ale sistemului cardiovascular.',
    $md$Inima lucrează pentru tine în fiecare clipă, iar sănătatea ei se reflectă în întregul organism. În cadrul consultațiilor de cardiologie evaluăm riscul cardiovascular, urmărim tensiunea și ritmul cardiac și construim un plan de îngrijire potrivit fiecărui pacient.

Punem accent pe prevenție și pe explicații clare, astfel încât să înțelegi ce înseamnă rezultatele investigațiilor și ce pași poți face pentru o inimă sănătoasă pe termen lung.$md$,
    'heart-pulse',
    5
  ),
  (
    'endocrinologie',
    'Endocrinologie',
    'Echilibrul hormonal, cheia stării de bine.',
    'Evaluarea și tratamentul afecțiunilor glandelor endocrine, de la tiroidă la metabolism.',
    $md$Sistemul endocrin coordonează, prin hormoni, procese esențiale din corp, de la metabolism și energie până la somn și dispoziție. În cadrul consultațiilor de endocrinologie evaluăm funcția glandelor și identificăm cauzele dezechilibrelor hormonale.

Fie că e vorba de tiroidă, de metabolism sau de alte afecțiuni endocrine, îți oferim un diagnostic atent și un plan de tratament personalizat, cu monitorizare pe parcurs.$md$,
    'droplets',
    6
  )
on conflict (slug) do update set
  name        = excluded.name,
  tagline     = excluded.tagline,
  summary     = excluded.summary,
  description = excluded.description,
  icon        = excluded.icon,
  order_index = excluded.order_index;

-- -----------------------------------------------------------------------------
-- MEDICI
-- TODO: bio de confirmat de client + fotografii reale (photo_url momentan NULL).
-- Bio-urile sunt redactate pornind de la fragmentele din brief; a se valida.
-- -----------------------------------------------------------------------------
insert into public.doctors (slug, name, title, credentials, short_bio, full_bio, order_index, is_founder)
values
  (
    'matei-palimariciuc',
    'Matei Palimariciuc',
    'Medic specialist psihiatru',
    'Dr., asistent univ.',
    'Medic specialist psihiatru și asistent universitar, co-fondator Anova Medical Clinic.',
    'Dr. Matei Palimariciuc este medic specialist psihiatru și asistent universitar la Catedra de Psihiatrie a UMF „Grigore T. Popa" din Iași. Co-fondator al Anova Medical Clinic, îmbină experiența clinică cu activitatea academică, punând accent pe o relație terapeutică bazată pe încredere și pe planuri de tratament adaptate fiecărui pacient.',
    1, true
  ),
  (
    'alexandru-ungureanu',
    'Alexandru Ungureanu',
    'Psiholog clinician',
    'Psiholog clinician',
    'Psiholog clinician și co-fondator Anova, dedicat binelui și echilibrului pacienților.',
    'Alexandru Ungureanu este psiholog clinician și co-fondator al Anova Medical Clinic. Crede într-o abordare empatică și personalizată a psihoterapiei, în care fiecare persoană este însoțită cu răbdare în procesul de cunoaștere de sine și de recâștigare a echilibrului interior.',
    2, true
  ),
  (
    'ana-caterina-cristofor',
    'Ana-Caterina Cristofor',
    'Medic primar psihiatru',
    'Dr., șef de lucrări',
    'Medic primar psihiatru și șef de lucrări, specializată în tulburări afective, anxietate și demențe.',
    'Dr. Ana-Caterina Cristofor este medic primar psihiatru și șef de lucrări la UMF „Gr. T. Popa" din Iași, cu peste un deceniu de experiență în tratamentul tulburărilor afective, al anxietății și al demențelor. Abordează fiecare caz cu răbdare și empatie, într-o viziune holistică asupra sănătății mintale.',
    3, false
  ),
  (
    'irina-dobrin',
    'Irina Dobrin',
    'Medic primar psihiatru',
    'Dr., șef de lucrări',
    'Medic primar psihiatru și șef de lucrări, care îmbină practica clinică, cercetarea și activitatea academică.',
    'Dr. Irina Dobrin este medic primar psihiatru și șef de lucrări la Catedra de Psihiatrie a UMF „Gr. T. Popa" din Iași. Îmbină practica clinică, cercetarea și activitatea didactică, fiind autoare a numeroase articole și cărți de specialitate în domeniul sănătății mintale.',
    4, false
  ),
  (
    'tudor-florea',
    'Tudor Florea',
    'Medic primar psihiatru',
    'Dr., medic primar, asistent univ.',
    'Medic primar psihiatru și asistent universitar, cu formare în Germania și abordare integrativă.',
    'Dr. Tudor Florea este medic primar psihiatru și asistent universitar, cu formare profesională în Germania sub coordonarea Prof. Pollmächer. Adept al unei abordări integrative și personalizate, oferă consultații în română, engleză, germană și franceză.',
    5, false
  ),
  (
    'cartas-nicoleta',
    'Nicoleta Cartas',
    'Medic primar psihiatru',
    'Dr., medic primar',
    'Medic primar psihiatru, cu experiență solidă în tratamentul tulburărilor de sănătate mintală.',
    'Dr. Nicoleta Cartas este medic primar psihiatru, cu o experiență clinică bogată în evaluarea și tratarea afecțiunilor psihiatrice. Îmbină rigoarea diagnosticului cu o abordare caldă, orientată spre echilibrul și recuperarea pacientului.',
    6, false
  ),
  (
    'gilea-andra',
    'Andra Gîlea',
    'Medic primar psihiatru',
    'Dr., medic primar',
    'Medic primar psihiatru, cu o abordare empatică și centrată pe nevoile pacientului.',
    'Dr. Andra Gîlea este medic primar psihiatru, cu experiență vastă în îngrijirea sănătății mintale. Construiește împreună cu pacientul un parcurs terapeutic clar și adaptat, într-un cadru discret și lipsit de judecată.',
    7, false
  ),
  (
    'andra-morasan',
    'Andra Morășan',
    'Medic primar psihiatru',
    'Dr., medic primar',
    'Medic primar psihiatru dedicat unui parcurs terapeutic blând și personalizat.',
    'Dr. Andra Morășan este medic primar psihiatru, dedicată unui parcurs terapeutic blând și personalizat, în care fiecare pacient se simte ascultat și sprijinit.',
    8, false
  ),
  (
    'aionesei-catalin',
    'Cătălin Aionesei',
    'Medic specialist psihiatru',
    'Dr.',
    'Medic specialist psihiatru, atent la povestea fiecărui pacient și la un plan de tratament potrivit.',
    'Dr. Cătălin Aionesei este medic specialist psihiatru în echipa Anova Medical Clinic. Abordează fiecare pacient cu răbdare și fără judecată, punând accent pe o relație terapeutică bazată pe încredere și pe un plan de tratament adaptat nevoilor reale ale fiecăruia.',
    9, false
  ),
  (
    'aura-cosofret',
    'Aura Coșofreț',
    'Medic specialist psihiatru',
    'Dr.',
    'Medic psihiatru atentă la complexitatea fiecărei povești.',
    'Dr. Aura Coșofreț este medic specialist psihiatru, atentă la complexitatea și unicitatea fiecărei povești, pe care o abordează cu empatie și profesionalism, orientată spre recuperare și reintegrare socio-familială.',
    10, false
  ),
  (
    'mihulca-ioana',
    'Ioana Mihulcă',
    'Medic specialist psihiatru',
    'Dr.',
    'Medic specialist psihiatru, orientată spre o îngrijire blândă și personalizată.',
    'Dr. Ioana Mihulcă este medic specialist psihiatru, atentă la nevoile emoționale ale fiecărui pacient. Abordează fiecare caz cu empatie și profesionalism, sprijinind pacienții să își recapete echilibrul.',
    11, false
  ),
  (
    'silvia-tudosa',
    'Silvia Tudosă',
    'Medic specialist psihiatru',
    'Dr.',
    'Medic psihiatru cu o abordare empatică și centrată pe pacient.',
    'Dr. Silvia Tudosă este medic specialist psihiatru, cu o abordare empatică și bazată pe dovezi. Îmbină strategii terapeutice moderne cu un management medicamentos atent, pentru rezultate de durată.',
    12, false
  ),
  (
    'elena-pcela',
    'Elena Pcela',
    'Medic specialist psihiatru',
    'Dr.',
    'Medic psihiatru atentă la nevoile emoționale ale fiecărui pacient.',
    'Dr. Elena Pcela este medic specialist psihiatru, cu formare la Chișinău și rezidențiat la Institutul „Socola" din Iași. Abordare integrativă și îngrijire personalizată; oferă consultații și în limba rusă.',
    13, false
  ),
  (
    'vlasceanu-marceza',
    'Marceza Vlăsceanu',
    'Medic specialist psihiatru',
    'Dr.',
    'Medic specialist psihiatru, dedicată unei relații terapeutice bazate pe încredere.',
    'Dr. Marceza Vlăsceanu este medic specialist psihiatru în cadrul Anova Medical Clinic. Pune accent pe ascultare, pe un diagnostic atent și pe un plan de tratament croit pe ritmul fiecărui pacient.',
    14, false
  ),
  (
    'georgean-rozinbaum',
    'Georgean Rozinbaum',
    'Medic primar psihiatrie pediatrică',
    'Dr., medic primar',
    'Specialist în psihiatrie pediatrică, cu experiență vastă în îngrijirea copiilor și adolescenților.',
    'Dr. Georgean Rozinbaum este medic în psihiatrie pediatrică și fondator al „Centrului Vocale" din Vaslui. Are o experiență vastă în îngrijirea copiilor și adolescenților, abordând cu blândețe și profesionalism provocările emoționale și de dezvoltare ale celor mici.',
    15, false
  ),
  (
    'andreea-albu',
    'Andreea Albu',
    'Medic specialist neurolog',
    'Dr.',
    'Medic neurolog, cu experiență în diagnosticul și tratamentul afecțiunilor neurologice.',
    'Dr. Andreea Albu este medic specialist neurolog, cu experiență în diagnosticarea și tratarea unei game largi de afecțiuni neurologice, precum și în interpretarea investigațiilor imagistice.',
    16, false
  ),
  (
    'thomas-gabriel-schreiner',
    'Thomas Gabriel Schreiner',
    'Medic specialist neurolog',
    'Dr., șef de lucrări, doctor în medicină',
    'Medic neurolog, doctor în medicină și cadru didactic la Catedra de Neurologie.',
    'Dr. Thomas Gabriel Schreiner este medic specialist neurolog, doctor în medicină și cadru didactic la Catedra de Neurologie a UMF „Grigore T. Popa" din Iași. Domenii de interes: boli cerebrovasculare, patologii neurodegenerative și tulburări de mișcare.',
    17, false
  ),
  (
    'gusa-lucia',
    'Lucia Gușă',
    'Medic specialist cardiolog',
    'Dr.',
    'Medic specialist cardiolog, atentă la sănătatea inimii și la prevenție.',
    'Dr. Lucia Gușă este medic specialist cardiolog în echipa Anova Medical Clinic. Se dedică diagnosticului, tratamentului și prevenției afecțiunilor cardiovasculare, cu explicații clare și un plan adaptat fiecărui pacient.',
    18, false
  ),
  (
    'dorneanu-andra',
    'Andra Dorneanu',
    'Medic specialist endocrinolog',
    'Dr.',
    'Medic specialist endocrinolog, dedicată echilibrului hormonal și stării generale de bine.',
    'Dr. Andra Dorneanu este medic specialist endocrinolog în cadrul Anova Medical Clinic. Se ocupă de diagnosticul și tratamentul afecțiunilor glandelor endocrine, corelând echilibrul hormonal cu starea generală de sănătate, într-o abordare atentă și personalizată.',
    19, false
  ),
  (
    'mihaela-ungureanu',
    'Mihaela Ungureanu',
    'Psiholog clinician',
    'Psiholog clinician',
    'Psiholog clinician specializat în terapie cognitiv-comportamentală și dialectic-comportamentală.',
    'Mihaela Ungureanu este psiholog clinician, specializată în terapie cognitiv-comportamentală și dialectic-comportamentală. Abordare holistică, axată pe gestionarea emoțiilor și dezvoltarea abilităților de adaptare.',
    20, false
  ),
  (
    'ramona-costiug',
    'Ramona Coștiug',
    'Psiholog clinician',
    'Psiholog clinician',
    'Psiholog clinician cu formare în psihoterapie integrativă, centrată pe soluții.',
    'Ramona Coștiug este psiholog clinician cu formare în psihoterapie integrativă. Are experiență în anxietate, depresie, burnout și recuperare cognitivă post-AVC, cu o abordare centrată pe soluții și pe nevoile fiecărei persoane.',
    21, false
  ),
  (
    'dan-chirila',
    'Dan Chirilă',
    'Psiholog clinician',
    'Psiholog clinician',
    'Psiholog clinician care creează un spațiu sigur pentru auto-descoperire și transformare.',
    'Dan Chirilă este psiholog clinician care creează un spațiu sigur și confidențial pentru auto-descoperire. Folosește strategii creative, bazate pe dovezi, pentru provocările emoționale și comportamentale ale fiecărui pacient.',
    22, false
  ),
  (
    'paula-stanciulescu',
    'Paula Stănciulescu',
    'Psiholog clinician',
    'Psiholog clinician',
    'Psiholog clinician și psihoterapeut, specializată în terapia copilului și adolescentului.',
    'Paula Stănciulescu este psiholog clinician și psihoterapeut cu peste un deceniu de experiență, specializată în terapia copilului și adolescentului. Certificată în Terapia Comportamentală Aplicată (ABA) și în terapia limbajului.',
    23, false
  ),
  (
    'banu-adelina',
    'Adelina Banu',
    'Psiholog clinician',
    'Psiholog clinician',
    'Psiholog clinician, alături de pacienți în explorarea gândurilor și emoțiilor.',
    'Adelina Banu este psiholog clinician în echipa Anova Medical Clinic. Într-un cadru confidențial și cald, însoțește pacienții în procesul de cunoaștere de sine, oferind sprijin în gestionarea emoțiilor și în dezvoltarea personală.',
    24, false
  )
on conflict (slug) do update set
  name        = excluded.name,
  title       = excluded.title,
  credentials = excluded.credentials,
  short_bio   = excluded.short_bio,
  full_bio    = excluded.full_bio,
  order_index = excluded.order_index,
  is_founder  = excluded.is_founder;

-- -----------------------------------------------------------------------------
-- RELAȚII medic <-> specialitate
-- -----------------------------------------------------------------------------
insert into public.doctor_specialties (doctor_id, specialty_id)
select d.id, s.id
from public.doctors d
join public.specialties s on (d.slug, s.slug) in (
  ('matei-palimariciuc',        'psihiatrie'),
  ('ana-caterina-cristofor',    'psihiatrie'),
  ('irina-dobrin',              'psihiatrie'),
  ('tudor-florea',              'psihiatrie'),
  ('cartas-nicoleta',           'psihiatrie'),
  ('gilea-andra',               'psihiatrie'),
  ('andra-morasan',             'psihiatrie'),
  ('aionesei-catalin',          'psihiatrie'),
  ('aura-cosofret',             'psihiatrie'),
  ('mihulca-ioana',             'psihiatrie'),
  ('silvia-tudosa',             'psihiatrie'),
  ('elena-pcela',               'psihiatrie'),
  ('vlasceanu-marceza',         'psihiatrie'),
  ('georgean-rozinbaum',        'psihiatrie-pediatrica'),
  ('andreea-albu',              'neurologie'),
  ('thomas-gabriel-schreiner',  'neurologie'),
  ('gusa-lucia',                'cardiologie'),
  ('dorneanu-andra',            'endocrinologie'),
  ('alexandru-ungureanu',       'psihologie'),
  ('mihaela-ungureanu',         'psihologie'),
  ('ramona-costiug',            'psihologie'),
  ('dan-chirila',               'psihologie'),
  ('paula-stanciulescu',        'psihologie'),
  ('banu-adelina',              'psihologie')
)
on conflict (doctor_id, specialty_id) do nothing;

-- -----------------------------------------------------------------------------
-- CURĂȚARE colaboratori care nu mai fac parte din echipă (lista finală).
-- Rulează după actualizarea listei de mai sus.
-- -----------------------------------------------------------------------------
delete from public.doctors
where slug in (
  'romeo-dobrin',
  'cezara-ungureanu',
  'codrina-lupu',
  'diana-arcana',
  'lacramioara-mihaela-marar',
  'ramona-profire'
);

delete from public.specialties where slug = 'medicina-interna';
