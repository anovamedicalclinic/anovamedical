import type { NextConfig } from "next";

/**
 * Politica de securitate a conținutului.
 *
 * `unsafe-inline` pe script-src este necesar: Next.js injectează în pagină
 * scripturi inline pentru bootstrap-ul React și pentru fluxul RSC. Varianta
 * curată ar fi nonce-uri generate în `proxy.ts`, dar asta ar face fiecare pagină
 * dinamică - adică ar arunca la coș tot prerender-ul static de care depinde
 * viteza site-ului. Compromisul e conștient: păstrăm restul directivelor strânse,
 * mai ales `object-src 'none'`, `base-uri` și `frame-ancestors`, care închid
 * clasele de atac ce contează aici.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  // Supabase Storage pentru fotografiile încărcate din panou; data:/blob: pentru
  // previzualizarea locală a unei poze înainte de trimitere.
  "img-src 'self' data: blob: https://*.supabase.co https://anovamedical.ro https://www.anovamedical.ro",
  "media-src 'self'",
  "font-src 'self' data:",
  // Supabase pentru date și autentificare.
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
  // Harta Google din secțiunea de contact.
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

/** Aplicate pe tot site-ul. */
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Redundant cu `frame-ancestors`, dar acoperă browserele mai vechi.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  // Site-ul nu are nevoie de resurse cross-origin, deci le izolăm.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

/**
 * Redirecturi de pe site-ul WordPress înlocuit.
 *
 * Structura veche era alta: medicii stăteau sub `/despre-noi/<nume>`, iar
 * specialitățile direct în rădăcină. Fără regulile de mai jos, cele ~48 de
 * adrese indexate de Google ar da 404 în ziua mutării domeniului, iar
 * poziționarea construită până acum s-ar pierde.
 *
 * `permanent: true` trimite 308, nu 301. Next preferă 308 pentru că păstrează
 * metoda cererii; Google îl tratează identic cu 301 la transferul de autoritate.
 *
 * Adresele vechi se termină toate cu `/`. Nu au nevoie de reguli separate:
 * proiectul rulează cu `trailingSlash` implicit (false), deci Next normalizează
 * întâi `/x/` la `/x` și abia apoi caută potrivirea.
 */

/** Aveau pagină pe site-ul vechi, nu mai sunt în echipă. Profilul nu mai
 *  există, deci îi ducem la lista de echipă, nu în 404. */
const MEDICI_PLECATI = [
  "cezara-ungureanu",
  "codrina-barbalata",
  "diana-arcana",
  "lacramioara-mihaela-marar",
  "ramona-profire",
  "romeo-dobrin",
];

/** Specialitățile stăteau în rădăcină, acum sunt sub `/specialitati`. */
const SPECIALITATI_MUTATE = [
  "neurologie",
  "psihiatrie",
  "psihiatrie-pediatrica",
  "psihologie",
];

/** Rămășițe din tema WordPress (pagini demo de blog și „portfolio", un footer
 *  de probă) plus `/qr1`, pagina către care duceau codurile QR tipărite.
 *  Niciuna nu are corespondent, deci merg la prima pagină. */
const PAGINI_FARA_CORESPONDENT = [
  "/blog",
  "/blog/:path*",
  "/portfolio",
  "/portfolio/:path*",
  "/portfolio_category/:path*",
  "/footer-home-03",
  "/qr1",
];

/** Un an, imuabil - pentru fișiere cu nume stabil din `public/`. */
const IMMUTABLE = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  // Inline critical CSS (elimină CSS-ul care blochează randarea) + tree-shaking
  // mai agresiv pentru pachetele cu multe exporturi (icoane, animații).
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "motion", "date-fns"],
    /**
     * Fotografiile din panou pleacă prin Server Actions, iar limita implicită
     * de 1 MB respingea orice poză de telefon înainte ca acțiunea să ruleze.
     * Panoul acceptă poze de până la 8 MB (`src/lib/images.ts`); restul e loc
     * pentru celelalte câmpuri ale formularului.
     */
    serverActions: {
      bodySizeLimit: "9mb",
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    /**
     * Un an de cache pe imaginile optimizate.
     *
     * Fără asta, `/_next/image` răspunde cu `max-age=0, must-revalidate`, deci
     * fiecare portret și fiecare fotografie de specialitate se re-descarcă la
     * fiecare vizită. Numele fișierelor sursă sunt stabile, iar o poză
     * înlocuită din panou primește oricum un nume nou (cu marcaj temporal), deci
     * nu există risc de conținut învechit.
     */
    minimumCacheTTL: 31536000,
    remotePatterns: [
      // Supabase Storage (bucket public — fotografii medici, imagini editoriale)
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // Migrare temporară a imaginilor de pe site-ul vechi WordPress
      {
        protocol: "https",
        hostname: "anovamedical.ro",
      },
      {
        protocol: "https",
        hostname: "www.anovamedical.ro",
      },
    ],
  },
  async redirects() {
    /*
      Ordinea contează: prima regulă care se potrivește câștigă. Regula generală
      pentru medici stă ultima, altfel ar înghiți și `/despre-noi/contact`, și
      medicii plecați, trimițându-i pe toți către profiluri care nu există.
    */
    return [
      // Contactul era o subpagină a secțiunii „despre noi".
      {
        source: "/despre-noi/contact",
        destination: "/contact",
        permanent: true,
      },

      ...MEDICI_PLECATI.map((slug) => ({
        source: `/despre-noi/${slug}`,
        destination: "/echipa",
        permanent: true,
      })),

      ...SPECIALITATI_MUTATE.map((slug) => ({
        source: `/${slug}`,
        destination: `/specialitati/${slug}`,
        permanent: true,
      })),

      ...PAGINI_FARA_CORESPONDENT.map((source) => ({
        source,
        destination: "/",
        permanent: true,
      })),

      // Medicii rămași în echipă au păstrat exact același slug.
      {
        source: "/despre-noi/:slug",
        destination: "/echipa/:slug",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      /**
       * Fișierele din `public/` primesc implicit `max-age=0, must-revalidate` pe
       * Vercel, deci se re-descarcă la fiecare vizită. Pentru videoclipul din
       * hero asta însemna 1,9 MB de fiecare dată. Toate căile de mai jos au nume
       * stabile și conținut care se schimbă doar printr-un deploy nou.
       */
      {
        source: "/videoprezentare.mp4",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
      {
        source: "/videoprezentare.webm",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
      {
        source: "/hero-poster.jpg",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
      {
        source: "/medici/:path*",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
      {
        source: "/servicii/:path*",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
      {
        source: "/:file(logo-color.png|logo-alb.png|poza-about.jpg|SAL.png|SOL.png)",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
      // Panoul nu are ce căuta în niciun cache, nici în cel al browserului.
      {
        source: "/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, must-revalidate" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
