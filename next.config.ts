import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Velite: trigger content build.
// - Production build (`next build`) TIDAK di-trigger di sini — itu tugas
//   npm script "prebuild" (lihat package.json), supaya `.velite` dijamin
//   sudah selesai dan lengkap SEBELUM Next.js mulai baca file yang
//   nge-import dari situ. Kalau ditrigger async di sini, ada race condition:
//   Next.js bisa aja mulai compile duluan sebelum Velite kelar nulis output.
// - Dev server (`next dev`) di-trigger di sini dengan watch:true, supaya
//   edit file .mdx langsung ke-refresh tanpa restart manual.

if (!process.env.VELITE_STARTED && process.argv.includes("dev")) {
  process.env.VELITE_STARTED = "1";
  import("velite").then((m) => m.build({ watch: true }));
}

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // konfigurasi existing kamu (kalau ada) tetap di sini
};

export default withNextIntl(nextConfig);