import Link from "next/link";
import Image from "next/image";
import { Clock, Heart, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/brand/logo";
import { FacebookIcon, InstagramIcon } from "@/components/brand/social-icons";
import {
  author,
  contact,
  navSpecialties,
  siteConfig,
  social,
} from "@/lib/site";

const legalLinks = [
  {
    label: "Politica de confidențialitate",
    href: "/politica-de-confidentialitate",
  },
  { label: "Politica de cookie-uri", href: "/politica-de-cookie-uri" },
  { label: "Termeni și condiții", href: "/termeni-si-conditii" },
];

const SAL_URL = "https://anpc.ro/ce-este-sal/";
const SOL_URL = "https://ec.europa.eu/consumers/odr";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="space-y-5 md:col-span-2 lg:col-span-2">
            <Logo />
            <p className="max-w-xs text-pretty text-sm text-muted-foreground">
              {siteConfig.tagline}
            </p>
            <div className="flex gap-3">
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
              >
                <FacebookIcon className="size-4" />
              </a>
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
              >
                <InstagramIcon className="size-4" />
              </a>
            </div>

            {/* ANPC */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={SAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ANPC - Soluționarea Alternativă a Litigiilor"
              >
                <Image
                  src="/SAL.png"
                  alt="ANPC SAL"
                  width={130}
                  height={33}
                  className="h-8 w-auto opacity-75 transition-opacity hover:opacity-100"
                />
              </a>
              <a
                href={SOL_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Soluționarea Online a Litigiilor"
              >
                <Image
                  src="/SOL.png"
                  alt="ANPC SOL"
                  width={130}
                  height={33}
                  className="h-8 w-auto opacity-75 transition-opacity hover:opacity-100"
                />
              </a>
            </div>
          </div>

          {/* Specialități */}
          <div>
            <h3 className="font-heading text-base text-foreground">
              Specialități
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navSpecialties.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/specialitati/${s.slug}`}
                    className="inline-block py-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigare */}
          <div>
            <h3 className="font-heading text-base text-foreground">Clinică</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/despre-noi" className="inline-block py-1 text-sm text-muted-foreground transition-colors hover:text-primary">
                  Despre noi
                </Link>
              </li>
              <li>
                <Link href="/echipa" className="inline-block py-1 text-sm text-muted-foreground transition-colors hover:text-primary">
                  Echipa
                </Link>
              </li>
              <li>
                <Link href="/specialitati" className="inline-block py-1 text-sm text-muted-foreground transition-colors hover:text-primary">
                  Specialități
                </Link>
              </li>
              <li>
                <Link href="/contact" className="inline-block py-1 text-sm text-muted-foreground transition-colors hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-base text-foreground">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-sage-strong" />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-sage-strong" />
                <a href={contact.phoneHref} className="transition-colors hover:text-primary">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-sage-strong" />
                <a href={contact.emailHref} className="transition-colors hover:text-primary">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-sage-strong" />
                <span className="space-y-0.5">
                  {contact.schedule.map((row) => (
                    <span key={row.days} className="block">
                      {row.days}: {row.hours}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading text-base text-foreground">Legal</h3>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Toate drepturile
            rezervate.
          </p>
          <p className="flex items-center gap-1.5">
            Made with
            <Heart className="size-3.5 fill-[#d1685f] text-[#d1685f]" />
            by
            <a
              href={author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground transition-colors hover:text-primary"
            >
              {author.name}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
