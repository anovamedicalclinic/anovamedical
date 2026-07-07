import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { contact, legal } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termeni și condiții",
  description:
    "Termenii și condițiile de utilizare a website-ului Anova Medical Clinic (AMEDICALCLINIC SRL).",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Termeni și condiții"
      intro="Prin accesarea și utilizarea acestui website, ești de acord cu termenii și condițiile de mai jos. Te rugăm să îi citești cu atenție."
    >
      <section>
        <h2>1. Operatorul website-ului</h2>
        <p>
          Website-ul este deținut și operat de <strong>{legal.company}</strong>,
          CIF {legal.cif}, Nr. Registrul Comerțului {legal.regCom}, cu sediul
          social în {legal.registeredOffice} și punct de lucru în{" "}
          {legal.workPoint}.
        </p>
      </section>

      <section>
        <h2>2. Obiectul website-ului</h2>
        <p>
          Website-ul are caracter informativ și prezintă serviciile medicale
          oferite de Anova Medical Clinic. Prin intermediul formularului, poți
          transmite o cerere de programare.
        </p>
      </section>

      <section>
        <h2>3. Cererile de programare</h2>
        <p>
          Trimiterea formularului reprezintă o <strong>cerere de programare</strong>,
          nu o programare confirmată. Programarea devine efectivă numai după ce te
          contactăm telefonic pentru a confirma data și ora, în funcție de
          disponibilitate.
        </p>
      </section>

      <section>
        <h2>4. Informațiile nu înlocuiesc consultul medical</h2>
        <p>
          Conținutul website-ului are scop informativ general și nu constituie un
          diagnostic sau o recomandare medicală personalizată. Nu înlocuiește
          consultul de specialitate. În situații de urgență, apelează numărul unic
          112.
        </p>
      </section>

      <section>
        <h2>5. Proprietate intelectuală</h2>
        <p>
          Toate elementele website-ului (texte, imagini, logo, grafică, structură)
          sunt proprietatea {legal.company} sau a partenerilor săi și sunt
          protejate de legislația privind drepturile de autor. Reproducerea,
          distribuirea sau utilizarea lor fără acordul scris prealabil este
          interzisă.
        </p>
      </section>

      <section>
        <h2>6. Obligațiile utilizatorului</h2>
        <ul>
          <li>să furnizeze informații corecte și complete în formulare;</li>
          <li>
            să utilizeze website-ul în conformitate cu legea și cu prezentele
            condiții;
          </li>
          <li>
            să nu întreprindă acțiuni care ar putea afecta funcționarea sau
            securitatea website-ului.
          </li>
        </ul>
      </section>

      <section>
        <h2>7. Limitarea răspunderii</h2>
        <p>
          Depunem eforturi pentru ca informațiile publicate să fie corecte și
          actuale, însă nu garantăm că website-ul va fi permanent disponibil sau
          lipsit de erori. {legal.company} nu răspunde pentru eventuale daune
          rezultate din utilizarea sau imposibilitatea utilizării website-ului sau
          din baza deciziilor luate exclusiv pe baza informațiilor de aici.
        </p>
      </section>

      <section>
        <h2>8. Linkuri externe</h2>
        <p>
          Website-ul poate conține linkuri către site-uri terțe. Nu deținem
          controlul asupra acestora și nu ne asumăm răspunderea pentru conținutul
          sau practicile lor de confidențialitate.
        </p>
      </section>

      <section>
        <h2>9. Protecția datelor</h2>
        <p>
          Prelucrarea datelor cu caracter personal este descrisă în{" "}
          <a href="/politica-de-confidentialitate">
            Politica de confidențialitate
          </a>
          , iar utilizarea cookie-urilor în{" "}
          <a href="/politica-de-cookie-uri">Politica de cookie-uri</a>.
        </p>
      </section>

      <section>
        <h2>10. Legea aplicabilă și soluționarea litigiilor</h2>
        <p>
          Prezentele condiții sunt guvernate de legea română. Orice litigiu se
          soluționează pe cale amiabilă; în caz contrar, sunt competente
          instanțele din România. Consumatorii pot apela la Autoritatea Națională
          pentru Protecția Consumatorilor (ANPC) și la mecanismele de{" "}
          <a
            href="https://anpc.ro/ce-este-sal/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Soluționare Alternativă a Litigiilor (SAL)
          </a>
          , respectiv{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
          >
            Soluționare Online a Litigiilor (SOL)
          </a>
          .
        </p>
      </section>

      <section>
        <h2>11. Modificarea termenilor</h2>
        <p>
          Ne rezervăm dreptul de a modifica acești termeni oricând. Versiunea
          actualizată se publică pe această pagină. Pentru întrebări, ne poți
          contacta la <a href={contact.emailHref}>{contact.email}</a> sau la{" "}
          <a href={contact.phoneHref}>{contact.phone}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
