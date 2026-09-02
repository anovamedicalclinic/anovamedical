-- Textele noi de la client pentru specialități.
--
-- Subtitlul fiecărei descrieri (rândul „##” din documentul primit) devine
-- `tagline` — e locul unde ajunge pe card-urile din /specialitati și de pe
-- prima pagină. Paragraful propriu-zis stă în `specialty-content.ts`, de unde
-- îl citește pagina de detaliu.
--
-- `description` din tabel rămâne neatins: nu e randat nicăieri (pagina de
-- detaliu folosește întotdeauna `specialtyContent`), iar rescrierea lui ar
-- arunca la gunoi listele pe care le conține, fără niciun efect vizibil.
--
-- Psihologia trece la coada listei, restul urcă cu o poziție.

update specialties set tagline = 'Îngrijire specializată pentru sănătatea mintală',            order_index = 1 where slug = 'psihiatrie';
update specialties set tagline = 'Evaluare și îngrijire specializată pentru copii și adolescenți', order_index = 2 where slug = 'psihiatrie-pediatrica';
update specialties set tagline = 'Evaluare și tratament pentru afecțiunile sistemului nervos',  order_index = 3 where slug = 'neurologie';
update specialties set tagline = 'Îngrijire specializată pentru sănătatea inimii',              order_index = 4 where slug = 'cardiologie';
update specialties set tagline = 'Evaluarea și tratamentul afecțiunilor hormonale și metabolice', order_index = 5 where slug = 'endocrinologie';
update specialties set tagline = 'Sprijin specializat pentru echilibrul tău emoțional',         order_index = 6 where slug = 'psihologie';
