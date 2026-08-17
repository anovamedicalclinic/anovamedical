import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Autentificare",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary/40 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo priority />
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl text-foreground">Administrare</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Autentifică-te pentru a gestiona conținutul clinicii.
          </p>

          <div className="mt-6">
            <LoginForm redirectTo={redirect} />
          </div>
        </div>

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-3.5" />
          Înapoi la site
        </Link>
      </div>
    </main>
  );
}
