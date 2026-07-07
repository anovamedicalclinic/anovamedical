import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { contact, legal } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politica de confidențialitate",
  description:
    "Politica de confidențialitate a Anova Medical Clinic (AMEDICALCLINIC SRL), conform Regulamentului (UE) 2016/679 (GDPR) și legislației din România.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Politica de confidențialitate"
      intro="Confidențialitatea și protecția datelor tale sunt esențiale pentru noi. Această politică explică ce date prelucrăm, în ce scop și care sunt drepturile tale, conform Regulamentului (UE) 2016/679 (GDPR)."
    >
      <section>
        <h2>1. Cine suntem</h2>
        <p>
          Website-ul este operat de <strong>{legal.company}</strong>, societatea
          care administrează Anova Medical Clinic, cu următoarele date de
          identificare:
        </p>
        <ul>
          <li>CIF: {legal.cif}</li>
          <li>Nr. Registrul Comerțului: {legal.regCom}</li>
          <li>Sediu social: {legal.registeredOffice}</li>
          <li>Punct de lucru: {legal.workPoint}</li>
          <li>
            Telefon:{" "}
            <a href={contact.phoneHref}>{contact.phone}</a> · Email:{" "}
            <a href={contact.emailHref}>{contact.email}</a>
          </li>
        </ul>
        <p>
          În înțelesul GDPR, {legal.company} are calitatea de{" "}
          <strong>operator de date cu caracter personal</strong>.
        </p>
      </section>

      <section>
        <h2>2. Ce date prelucrăm</h2>
        <p>În funcție de modul în care interacționezi cu noi, putem prelucra:</p>
        <ul>
          <li>
            <strong>Date de identificare și contact:</strong> nume, prenume,
            număr de telefon, adresă de email.
          </li>
          <li>
            <strong>Date privind programarea:</strong> specialitatea dorită, data
            preferată, mesajul transmis prin formular.
          </li>
          <li>
            <strong>Date privind sănătatea</strong> (categorie specială de date):
            informațiile pe care ni le comunici în legătură cu starea ta de
            sănătate, în contextul serviciilor medicale.
          </li>
          <li>
            <strong>Date tehnice:</strong> adresă IP, tip de dispozitiv și
            browser, date de navigare colectate prin cookie-uri (vezi{" "}
            <a href="/politica-de-cookie-uri">Politica de cookie-uri</a>).
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Scopurile și temeiurile prelucrării</h2>
        <ul>
          <li>
            Preluarea și gestionarea cererilor de programare și contactarea ta
            pentru confirmare, în baza consimțământului tău și a demersurilor
            precontractuale (art. 6 alin. 1 lit. a și b GDPR).
          </li>
          <li>
            Furnizarea serviciilor medicale, în baza art. 9 alin. 2 lit. h GDPR
            (scopuri de medicină și îngrijire a sănătății), sub obligația
            secretului profesional, și a consimțământului explicit (art. 9 alin.
            2 lit. a GDPR).
          </li>
          <li>
            Îndeplinirea obligațiilor legale ce ne revin, inclusiv evidențe
            medicale și raportări către Casa de Asigurări de Sănătate (art. 6
            alin. 1 lit. c GDPR).
          </li>
          <li>
            Îmbunătățirea și securizarea website-ului, în baza interesului nostru
            legitim (art. 6 alin. 1 lit. f GDPR).
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Cui divulgăm datele</h2>
        <p>
          Datele tale sunt accesate doar de personalul autorizat al clinicii.
          Le putem transmite, strict în limita necesară:
        </p>
        <ul>
          <li>Casei de Asigurări de Sănătate, pentru decontarea serviciilor;</li>
          <li>autorităților publice, atunci când legea ne obligă;</li>
          <li>
            furnizorilor de servicii care ne sprijină (găzduire web, servicii
            IT), în baza unor contracte care includ garanții de confidențialitate.
          </li>
        </ul>
        <p>
          Nu vindem și nu închiriem datele tale. Nu efectuăm transferuri în afara
          Spațiului Economic European; dacă acest lucru ar deveni necesar, se va
          face doar cu garanții adecvate, conform GDPR.
        </p>
      </section>

      <section>
        <h2>5. Cât timp păstrăm datele</h2>
        <p>
          Păstrăm datele doar atât timp cât este necesar pentru scopurile de mai
          sus și pentru respectarea termenelor legale aplicabile documentației
          medicale. Cererile de programare care nu se concretizează sunt păstrate
          o perioadă limitată, după care sunt șterse sau anonimizate.
        </p>
      </section>

      <section>
        <h2>6. Drepturile tale</h2>
        <p>Conform GDPR, ai următoarele drepturi:</p>
        <ul>
          <li>dreptul de acces la date;</li>
          <li>dreptul la rectificarea datelor inexacte;</li>
          <li>dreptul la ștergerea datelor („dreptul de a fi uitat”);</li>
          <li>dreptul la restricționarea prelucrării;</li>
          <li>dreptul la portabilitatea datelor;</li>
          <li>dreptul de opoziție;</li>
          <li>
            dreptul de a-ți retrage consimțământul în orice moment, fără a afecta
            legalitatea prelucrării anterioare;
          </li>
          <li>
            dreptul de a nu face obiectul unei decizii bazate exclusiv pe
            prelucrare automată.
          </li>
        </ul>
        <p>
          Îți poți exercita drepturile printr-o solicitare la{" "}
          <a href={contact.emailHref}>{contact.email}</a> sau telefonic la{" "}
          <a href={contact.phoneHref}>{contact.phone}</a>. De asemenea, ai dreptul
          de a depune o plângere la Autoritatea Națională de Supraveghere a
          Prelucrării Datelor cu Caracter Personal (ANSPDCP): B-dul G-ral
          Gheorghe Magheru nr. 28-30, Sector 1, București, email
          anspdcp@dataprotection.ro,{" "}
          <a
            href="https://www.dataprotection.ro"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.dataprotection.ro
          </a>
          .
        </p>
      </section>

      <section>
        <h2>7. Securitatea datelor</h2>
        <p>
          Implementăm măsuri tehnice și organizatorice adecvate pentru a proteja
          datele împotriva accesului neautorizat, pierderii sau divulgării, și
          revizuim periodic aceste măsuri.
        </p>
      </section>

      <section>
        <h2>8. Minori</h2>
        <p>
          Serviciile care implică minori se realizează cu acordul și în prezența
          reprezentantului legal al acestora.
        </p>
      </section>

      <section>
        <h2>9. Modificări ale politicii</h2>
        <p>
          Putem actualiza această politică pentru a reflecta modificări
          legislative sau ale practicilor noastre. Versiunea actualizată este
          publicată pe această pagină, cu data ultimei actualizări.
        </p>
      </section>
    </LegalPage>
  );
}
