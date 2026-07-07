import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Toaster } from "@/components/ui/sonner";
import { JsonLd } from "@/components/seo/json-ld";
import { clinicLd, websiteLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

// Body / UI - sans grotesc curat. latin-ext pentru diacritice românești (ș ț ă î â).
// `preload: false` - fontul de body nu e pe calea critică a LCP (textul mare e
// serif); se încarcă fără să concureze cu randarea inițială.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: false,
});

// Headings - serif editorial premium. Greutate statică (500) în loc de variabilă,
// pentru un fișier mult mai mic pe calea critică. `display: optional` evită
// re-paint-ul târziu al titlului (LCP) pe conexiuni lente.
const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "optional",
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
  themeColor: "#f6f3ee",
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
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
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
