import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { JsonLd } from "@/components/seo/json-ld";
import { clinicLd, websiteLd } from "@/lib/seo";

/**
 * Învelișul site-ului public: antet, subsol, butoane flotante și datele
 * structurate pentru Google.
 *
 * A fost separat din layout-ul rădăcină ca panoul de administrare (`/admin`) să
 * nu moștenească nimic din cromatica publică. Grupul `(site)` nu apare în URL,
 * deci adresele paginilor rămân neschimbate.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <JsonLd data={[clinicLd(), websiteLd()]} />
      <Header />
      {children}
      <Footer />
      <FloatingActions />
    </>
  );
}
