import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Toaster } from "@/components/ui/sonner";

// Body / UI - sans grotesc curat. latin-ext pentru diacritice românești (ș ț ă î â).
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Headings - serif editorial premium, cu optical sizing.
const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anovamedical.ro"),
  title: {
    default: "Anova Medical Clinic · Sănătate mintală și neurologică în Iași",
    template: "%s · Anova Medical Clinic",
  },
  description:
    "Clinică dedicată sănătății mintale și neurologice în Iași. Învingem obstacolele, restabilim echilibrul. Psihiatrie, psihologie, neurologie, cardiologie și endocrinologie.",
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
        <Header />
        {children}
        <Footer />
        <FloatingActions />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
