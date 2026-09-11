"use client";

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Eroare neprevăzută într-o secțiune a panoului. Fără acest fișier, Next
 * afișa ecranul lui implicit, fără meniu, și utilizatorul pierdea contextul.
 * Meniul din layout rămâne vizibil, deci poate merge în altă secțiune.
 */
export default function PanelError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[admin]", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-6 text-center">
      <TriangleAlert className="mx-auto size-8 text-amber-600" />
      <h1 className="mt-3 text-lg text-foreground">Ceva n-a mers</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Pagina nu s-a putut încărca. Încearcă din nou; dacă problema persistă,
        ieși din cont și intră din nou.
      </p>
      {error.digest && (
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          Cod: {error.digest}
        </p>
      )}
      <Button onClick={() => unstable_retry()} className="mt-5 rounded-full">
        Încearcă din nou
      </Button>
    </div>
  );
}
