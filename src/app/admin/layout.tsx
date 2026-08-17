import type { Metadata } from "next";

/**
 * Învelișul comun al panoului. Există în principal pentru metadate: panoul nu
 * are ce căuta în Google, nici măcar pagina de login.
 *
 * Cromatica (bara laterală, antetul) stă în `(panel)/layout.tsx`, ca pagina de
 * autentificare să rămână curată.
 */
export const metadata: Metadata = {
  title: "Administrare",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
