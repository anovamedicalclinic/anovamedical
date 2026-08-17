"use client";

import { useActionState, useState, useTransition } from "react";
import { ChevronDown, ChevronUp, Plus, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormMessage, SubmitButton } from "@/components/admin/ui";
import {
  createTestimonial,
  deleteTestimonial,
  moveTestimonial,
  updateTestimonial,
  type TestimonialState,
} from "@/lib/actions/testimonials";
import { cn } from "@/lib/utils";

export type TestimonialRow = {
  id: string;
  author: string;
  rating: number;
  text: string;
  isPublished: boolean;
};

const TEXT_MAX = 1200;

/** Selector de notă cu stele, cu un input ascuns pentru trimiterea în formular. */
function RatingInput({ defaultValue = 5 }: { defaultValue?: number }) {
  const [rating, setRating] = useState(defaultValue);

  return (
    <div className="flex items-center gap-1">
      <input type="hidden" name="rating" value={rating} />
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => setRating(value)}
          aria-label={`${value} ${value === 1 ? "stea" : "stele"}`}
          aria-pressed={value === rating}
          className="rounded p-0.5 transition-transform hover:scale-110"
        >
          <Star
            className={cn(
              "size-5",
              value <= rating
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted",
            )}
          />
        </button>
      ))}
    </div>
  );
}

function CharCount({ value, max }: { value: string; max: number }) {
  const over = value.length > max;
  return (
    <span
      className={cn(
        "text-xs tabular-nums",
        over ? "font-medium text-destructive" : "text-muted-foreground",
      )}
    >
      {value.length}/{max}
    </span>
  );
}

export function CreateTestimonialForm() {
  const [state, action] = useActionState<TestimonialState, FormData>(
    createTestimonial,
    {},
  );
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className="rounded-full"
      >
        <Plus className="size-4" />
        Adaugă o recenzie
      </Button>
    );
  }

  return (
    <form
      action={action}
      className="space-y-4 rounded-2xl border border-border bg-card p-5"
    >
      <h3 className="text-base text-foreground">Recenzie nouă</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="new-author">Autor</Label>
          <Input id="new-author" name="author" required maxLength={120} />
        </div>

        <div className="space-y-2">
          <Label>Notă</Label>
          <RatingInput />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="new-text">Text</Label>
          <CharCount value={text} max={TEXT_MAX} />
        </div>
        <Textarea
          id="new-text"
          name="text"
          required
          rows={4}
          maxLength={TEXT_MAX}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          name="isPublished"
          type="checkbox"
          defaultChecked
          className="size-4 accent-[var(--primary)]"
        />
        Publicată pe site
      </label>

      <FormMessage ok={state.ok} message={state.message} error={state.error} />

      <div className="flex gap-2">
        <SubmitButton pendingLabel="Se adaugă…">Adaugă</SubmitButton>
        <Button
          type="button"
          variant="ghost"
          onClick={() => setOpen(false)}
          className="rounded-full"
        >
          Renunță
        </Button>
      </div>
    </form>
  );
}

export function TestimonialCard({
  testimonial,
  isFirst,
  isLast,
}: {
  testimonial: TestimonialRow;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [state, action] = useActionState<TestimonialState, FormData>(
    updateTestimonial,
    {},
  );
  const [text, setText] = useState(testimonial.text);
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  const move = (direction: "up" | "down") => {
    startTransition(async () => {
      const result = await moveTestimonial(testimonial.id, direction);
      if (!result.ok) toast.error(result.error ?? "Nu am putut muta recenzia.");
    });
  };

  const remove = () => {
    startTransition(async () => {
      const result = await deleteTestimonial(testimonial.id);
      if (result.ok) toast.success(result.message ?? "Ștearsă.");
      else toast.error(result.error ?? "Nu am putut șterge.");
      setConfirming(false);
    });
  };

  return (
    <form
      action={action}
      className="space-y-4 rounded-2xl border border-border bg-card p-5"
    >
      <input type="hidden" name="id" value={testimonial.id} />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="grid flex-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={`author-${testimonial.id}`}>Autor</Label>
            <Input
              id={`author-${testimonial.id}`}
              name="author"
              required
              maxLength={120}
              defaultValue={testimonial.author}
            />
          </div>

          <div className="space-y-2">
            <Label>Notă</Label>
            <RatingInput defaultValue={testimonial.rating} />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label="Mută mai sus"
            disabled={isFirst || pending}
            onClick={() => move("up")}
          >
            <ChevronUp className="size-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label="Mută mai jos"
            disabled={isLast || pending}
            onClick={() => move("down")}
          >
            <ChevronDown className="size-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor={`text-${testimonial.id}`}>Text</Label>
          <CharCount value={text} max={TEXT_MAX} />
        </div>
        <Textarea
          id={`text-${testimonial.id}`}
          name="text"
          required
          rows={4}
          maxLength={TEXT_MAX}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Pe card se văd primele ~5 rânduri; restul e tăiat elegant.
        </p>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          name="isPublished"
          type="checkbox"
          defaultChecked={testimonial.isPublished}
          className="size-4 accent-[var(--primary)]"
        />
        Publicată pe site
      </label>

      <FormMessage ok={state.ok} message={state.message} error={state.error} />

      <div className="flex flex-wrap items-center gap-2">
        <SubmitButton>Salvează</SubmitButton>

        {confirming ? (
          <>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              disabled={pending}
              onClick={remove}
              className="rounded-full"
            >
              Confirmă ștergerea
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => setConfirming(false)}
              className="rounded-full"
            >
              Renunță
            </Button>
          </>
        ) : (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            disabled={pending}
            onClick={() => setConfirming(true)}
            className="rounded-full text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" />
            Șterge
          </Button>
        )}
      </div>
    </form>
  );
}
