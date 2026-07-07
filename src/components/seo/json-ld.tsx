/**
 * Randează un bloc JSON-LD (structured data) pentru SEO.
 * Se folosește cu obiectele construite în `src/lib/seo.ts`.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Datele sunt statice, generate pe server din configul propriu.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
