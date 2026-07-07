"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { ro } from "date-fns/locale";
import { CalendarIcon, Loader2, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitAppointment } from "@/lib/actions/appointment";
import {
  appointmentSchema,
  type AppointmentInput,
} from "@/lib/appointment-schema";
import { contact } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Specialty } from "@/lib/supabase/types";

export function AppointmentForm({
  specialties,
}: {
  specialties: Pick<Specialty, "id" | "name">[];
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      specialtyId: "",
      preferredDate: "",
      message: "",
      consent: false,
      company: "",
    },
  });

  const onSubmit = async (values: AppointmentInput) => {
    const res = await submitAppointment(values);
    if (res.ok) {
      toast.success("Cerere trimisă. Te contactăm telefonic pentru confirmare.");
      reset();
    } else {
      toast.error(res.error ?? "A apărut o eroare. Te rugăm să ne suni.");
    }
  };

  const errClass = "text-xs text-destructive";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
        {...register("company")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nume și prenume *</Label>
          <Input id="fullName" placeholder="Ex: Maria Popescu" {...register("fullName")} />
          {errors.fullName && <p className={errClass}>{errors.fullName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefon *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Ex: 07XX XXX XXX"
            {...register("phone")}
          />
          {errors.phone && <p className={errClass}>{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email (opțional)</Label>
          <Input
            id="email"
            type="email"
            placeholder="nume@email.ro"
            {...register("email")}
          />
          {errors.email && <p className={errClass}>{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Specialitate (opțional)</Label>
          <Controller
            name="specialtyId"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Alege o specialitate" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Data preferată (opțional)</Label>
        <Controller
          name="preferredDate"
          control={control}
          render={({ field }) => {
            const selected = field.value ? parseISO(field.value) : undefined;
            return (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "h-10 w-full justify-start gap-2 rounded-lg px-3 font-normal",
                      !selected && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="size-4" />
                    {selected
                      ? format(selected, "d MMMM yyyy", { locale: ro })
                      : "Alege o zi"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    locale={ro}
                    selected={selected}
                    onSelect={(d) =>
                      field.onChange(d ? format(d, "yyyy-MM-dd") : "")
                    }
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const day = date.getDay();
                      return date < today || day === 0 || day === 6;
                    }}
                  />
                </PopoverContent>
              </Popover>
            );
          }}
        />
        <p className="text-xs text-muted-foreground">
          Programul: Luni–Vineri. Ziua o confirmăm telefonic în funcție de
          disponibilitate.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mesaj (opțional)</Label>
        <Textarea
          id="message"
          rows={3}
          placeholder="Spune-ne pe scurt cu ce te putem ajuta."
          {...register("message")}
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 accent-primary"
            {...register("consent")}
          />
          <span>
            Sunt de acord cu prelucrarea datelor conform{" "}
            <a
              href="/politica-de-confidentialitate"
              className="text-primary underline underline-offset-2 hover:text-primary-hover"
            >
              politicii de confidențialitate
            </a>
            . *
          </span>
        </label>
        {errors.consent && <p className={errClass}>{errors.consent.message}</p>}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full hover:bg-primary-hover sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Se trimite...
          </>
        ) : (
          "Trimite cererea"
        )}
      </Button>

      <p className="flex items-start gap-2 rounded-xl bg-secondary p-3 text-xs text-muted-foreground">
        <Phone className="mt-0.5 size-3.5 shrink-0 text-primary" />
        Programarea nu este confirmată automat. După trimiterea cererii, te
        contactăm telefonic la {contact.phone} pentru a confirma data și ora în
        funcție de disponibilitate.
      </p>
    </form>
  );
}
