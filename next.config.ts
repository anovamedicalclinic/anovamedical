import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
