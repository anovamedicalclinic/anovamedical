/**
 * Afișat imediat la navigarea între secțiunile panoului, cât timp pagina nouă
 * își citește datele. Fără el, un click nu dădea niciun semn până la sosirea
 * răspunsului complet, iar panoul părea blocat.
 */
export default function PanelLoading() {
  return (
    <div
      className="mx-auto max-w-3xl animate-pulse space-y-6"
      role="status"
      aria-label="Se încarcă"
    >
      <div className="space-y-2">
        <div className="h-7 w-56 rounded-lg bg-muted" />
        <div className="h-4 w-80 max-w-full rounded-lg bg-muted" />
      </div>
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-24 rounded-2xl border border-border bg-card" />
        ))}
      </div>
    </div>
  );
}
