import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Inline critical CSS (elimină CSS-ul care blochează randarea) + tree-shaking
  // mai agresiv pentru pachetele cu multe exporturi (icoane, animații).
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "motion", "date-fns"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
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
};

export default nextConfig;
