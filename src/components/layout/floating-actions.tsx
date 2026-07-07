"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand/social-icons";
import { contact } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Butoane de acțiune flotante (dreapta-jos), vizibile pe orice pagină, dar
 * apar doar după ce utilizatorul derulează dincolo de hero (prima vizualizare).
 * Pe mobil sunt iconițe circulare; de la sm devin pill-uri de aceeași lățime.
 */
export function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const btn =
    "flex size-14 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl sm:w-60 sm:justify-start sm:gap-2.5 sm:px-5";

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 transition-all duration-300 ease-out sm:bottom-6 sm:right-6",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <a
        href={contact.phoneHref}
        aria-label={`Sună-ne la ${contact.phone}`}
        tabIndex={visible ? 0 : -1}
        className={cn(
          btn,
          "bg-primary text-primary-foreground shadow-primary/30 hover:bg-primary-hover",
        )}
      >
        <Phone className="size-6 shrink-0 sm:size-5" />
        <span className="hidden whitespace-nowrap text-sm font-medium sm:inline">
          Sună-ne
        </span>
      </a>

      <a
        href={contact.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Mesaj pe WhatsApp"
        tabIndex={visible ? 0 : -1}
        className={cn(btn, "bg-[#25D366] text-white shadow-[#25D366]/30 hover:bg-[#20bd5a]")}
      >
        <WhatsAppIcon className="size-6 shrink-0 sm:size-5" />
        <span className="hidden whitespace-nowrap text-sm font-medium sm:inline">
          Mesaj pe WhatsApp
        </span>
      </a>
    </div>
  );
}
