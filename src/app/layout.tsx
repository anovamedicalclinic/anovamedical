import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Toaster } from "@/components/ui/sonner";
import { JsonLd } from "@/components/seo/json-ld";
import { clinicLd, websiteLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

// Body / UI - Gotham Book (font secundar de brand) nu are diacriticele românești
// (ă, ș, ț) și e comercial. Montserrat e cea mai apropiată alternativă geometrică
// gratuită, cu suport complet latin-ext. latin-ext pentru diacritice (ș ț ă î â).
// `preload: false` - fontul de body nu e pe calea critică a LCP (titlul mare e Athena).
const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: false,
});

// Headings - Athena Regular, fontul primar oficial ANOVA (serif de titlu, self-hosted).
// Are suport complet pentru diacriticele românești. `display: swap` ca titlul (LCP)
// să apară imediat cu fallback, apoi să comute la Athena.
const athena = localFont({
  src: "./fonts/Athena-Regular.ttf",
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Anova Medical Clinic · Sănătate mintală și neurologică în Iași",
    template: "%s · Anova Medical Clinic",
  },
  description:
    "Clinică dedicată sănătății mintale și neurologice în Iași. Învingem obstacolele, restabilim echilibrul. Psihiatrie, psihologie, neurologie, cardiologie și endocrinologie.",
  applicationName: siteConfig.name,
  keywords: [
    "psihiatru Iași",
    "psiholog Iași",
    "neurolog Iași",
    "cardiolog Iași",
    "endocrinolog Iași",
    "clinică sănătate mintală Iași",
    "psihoterapie Iași",
    "consultații psihiatrie",
    "Anova Medical Clinic",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: "Inovex.ro",
  publisher: siteConfig.name,
  category: "health",
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Anova Medical Clinic · Sănătate mintală și neurologică în Iași",
    description:
      "Clinică dedicată sănătății mintale și neurologice în Iași. Învingem obstacolele, restabilim echilibrul.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anova Medical Clinic · Sănătate mintală și neurologică în Iași",
    description:
      "Clinică dedicată sănătății mintale și neurologice în Iași. Învingem obstacolele, restabilim echilibrul.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#ebe7e3",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      suppressHydrationWarning
      className={`${montserrat.variable} ${athena.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col overflow-x-hidden"
      >
        <JsonLd data={[clinicLd(), websiteLd()]} />
        <Header />
        {children}
        <Footer />
        <FloatingActions />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
