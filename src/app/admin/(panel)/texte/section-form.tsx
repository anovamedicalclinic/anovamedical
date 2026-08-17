"use client";

import { useActionState, useState } from "react";
import { ExternalLink, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormMessage, SubmitButton } from "@/components/admin/ui";
import { saveContentSection, type ContentState } from "@/lib/actions/content";
import type { ContentField, ContentSection } from "@/lib/content/registry";
import { cn } from "@/lib/utils";

/**
 * Formularul unei secțiuni de text.
 *
 * Fiecare câmp are limita lui de caractere, afișată în timp real. Depășirea o
 * semnalează întâi interfața, apoi acțiunea de pe server, apoi constrângerea din
 * baza de date - trei bariere, pentru că un titlu prea lung strică exact ce
 * trebuia protejat: layout-ul.
 */
export function SectionForm({
  section,
  values,
  overridden,
}: {
  section: ContentSection;
  /** Valoarea curentă (suprascriere sau implicit) pentru fiecare cheie. */
  values: Record<string, string>;
  /** Cheile care au o suprascriere în baza de date. */
  overridden: Set<string>;
}) {
  const [state, action] = useActionState<ContentState, FormData>(
    saveContentSection,
    {},
  );

  return (
    <form
      action={action}
      id={section.id}
      className="scroll-mt-24 rounded-2xl border border-border bg-card p-5 sm:p-6"
    >
      <input type="hidden" name="sectionId" value={section.id} />

      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg text-foreground">{section.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {section.description}
          </p>
        </div>

        <Link
          href={section.preview}
          target="_blank"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          Vezi pe site
          <ExternalLink className="size-3.5" />
        </Link>
      </header>

      <div className="mt-5 space-y-5">
        {section.fields.map((field) => (
          <Field
            key={field.key}
            field={field}
            initial={values[field.key] ?? ""}
            isOverridden={overridden.has(field.key)}
            hasError={state.invalid?.includes(field.key) ?? false}
          />
        ))}
      </div>

      <div className="mt-5 space-y-4">
        <FormMessage ok={state.ok} message={state.message} error={state.error} />
        <SubmitButton>Publică</SubmitButton>
      </div>
    </form>
  );
}

function Field({
  field,
  initial,
  isOverridden,
  hasError,
}: {
  field: ContentField;
  initial: string;
  isOverridden: boolean;
  hasError: boolean;
}) {
  const [value, setValue] = useState(initial);

  const over = value.length > field.max;
  const changed = value !== initial;
  const isDefault = value === field.default;

  const shared = {
    id: field.key,
    name: field.key,
    value,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setValue(e.target.value),
    "aria-invalid": over || hasError,
    className: cn((over || hasError) && "border-destructive"),
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Label htmlFor={field.key} className="flex items-center gap-2">
          {field.label}
          {isOverridden && !isDefault && (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] font-normal text-muted-foreground">
              modificat
            </span>
          )}
        </Label>

        <span className="flex items-center gap-3">
          {!isDefault && (
            <button
              type="button"
              onClick={() => setValue(field.default)}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              <RotateCcw className="size-3" />
              Text implicit
            </button>
          )}
          <span
            className={cn(
              "text-xs tabular-nums",
              over ? "font-medium text-destructive" : "text-muted-foreground",
            )}
          >
            {value.length}/{field.max}
          </span>
        </span>
      </div>

      {field.kind === "multiline" ? (
        <Textarea {...shared} rows={value.length > 160 ? 4 : 3} />
      ) : (
        <Input
          {...shared}
          type={
            field.kind === "email"
              ? "email"
              : field.kind === "tel"
                ? "text"
                : field.kind === "url"
                  ? "url"
                  : "text"
          }
        />
      )}

      {field.help && (
        <p className="text-xs text-muted-foreground">{field.help}</p>
      )}

      {over && (
        <p className="text-xs font-medium text-destructive">
          Textul depășește limita cu {value.length - field.max} caractere.
        </p>
      )}

      {changed && !over && (
        <p className="text-xs text-muted-foreground">
          Nesalvat. Apasă Publică pentru a trimite pe site.
        </p>
      )}
    </div>
  );
}
