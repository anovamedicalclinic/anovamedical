import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politica de cookie-uri",
  description:
    "Politica de cookie-uri a Anova Medical Clinic: ce sunt cookie-urile, ce tipuri folosim și cum le poți gestiona.",
  alternates: { canonical: "/politica-de-cookie-uri" },
};

export default function CookiePage() {
  return (
    <LegalPage
      title="Politica de cookie-uri"
      intro="Această politică explică ce sunt cookie-urile, cum le folosim pe acest website și cum le poți controla."
    >
      <section>
        <h2>1. Ce sunt cookie-urile</h2>
        <p>
          Cookie-urile sunt fișiere text de mici dimensiuni pe care un website le
          stochează în browserul tău atunci când îl vizitezi. Ele permit
          site-ului să funcționeze corect, să rețină anumite preferințe și să
          înțeleagă modul în care este utilizat.
        </p>
      </section>

      <section>
        <h2>2. Ce cookie-uri folosim</h2>
        <ul>
          <li>
            <strong>Cookie-uri strict necesare:</strong> asigură funcționarea de
            bază a website-ului și securitatea acestuia. Fără ele, site-ul nu
            poate funcționa corect, iar acestea nu pot fi dezactivate.
          </li>
          <li>
            <strong>Cookie-uri de preferințe:</strong> rețin opțiuni precum
            alegeri de afișare, pentru o experiență mai bună.
          </li>
        </ul>
        <p>
          În prezent nu folosim cookie-uri de publicitate sau de profilare. Dacă
          vom introduce instrumente de analiză a traficului, acestea vor fi
          activate doar în baza consimțământului tău.
        </p>
      </section>

      <section>
        <h2>3. Cookie-uri de la terți</h2>
        <p>
          Anumite componente încorporate în site pot seta cookie-uri proprii,
          conform politicilor furnizorilor respectivi, de exemplu harta afișată
          prin Google Maps sau conținutul din rețelele sociale. Îți recomandăm să
          consulți politicile de confidențialitate ale acestor furnizori.
        </p>
      </section>

      <section>
        <h2>4. Durata cookie-urilor</h2>
        <p>
          Cookie-urile pot fi de sesiune (se șterg la închiderea browserului) sau
          persistente (rămân o perioadă determinată, până la expirare sau până
          când le ștergi manual).
        </p>
      </section>

      <section>
        <h2>5. Cum gestionezi cookie-urile</h2>
        <p>
          Poți controla și șterge cookie-urile din setările browserului tău.
          Majoritatea browserelor îți permit să blochezi sau să ștergi
          cookie-urile; reține însă că dezactivarea celor strict necesare poate
          afecta funcționarea site-ului. Instrucțiuni utile găsești în secțiunile
          de ajutor ale Google Chrome, Mozilla Firefox, Safari sau Microsoft
          Edge.
        </p>
      </section>

      <section>
        <h2>6. Modificări și contact</h2>
        <p>
          Putem actualiza această politică periodic. Pentru întrebări legate de
          utilizarea cookie-urilor, ne poți contacta la{" "}
          <a href={contact.emailHref}>{contact.email}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
