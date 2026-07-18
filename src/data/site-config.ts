// src/data/site-config.ts

/**
 * Single source of truth untuk data personal & konfigurasi situs.
 * Dipakai oleh: Navbar, Footer, Contact page, dan JSON-LD structured data (SEO).
 *
 * Kenapa pakai interface + `satisfies` (bukan object polos):
 * - TypeScript akan flag di compile time kalau ada field yang typo/hilang,
 *   bukan baru ketahuan saat runtime pas komponen coba akses field yang undefined.
 * - `satisfies` (bukan `: SiteConfig`) dipilih supaya literal type tetap presisi
 *   (misal `navItems` tetap ke-infer sebagai tuple literal, bukan di-widen ke `string`),
 *   sambil tetap dapat type-checking penuh.
 */

interface NavItem {
  key: string;
  href: string;
}

interface SocialLinks {
  linkedin: string;
  github: string;
  /** Nomor WA raw, format internasional TANPA "+", spasi, atau "0" di depan. Contoh: "6281234567890" */
  whatsapp: string;
  email: string;
}

interface SiteConfig {
  name: string;
  title: string;
  role: string[];
  location: string;
  siteUrl: string; // dipakai untuk canonical URL & Open Graph, isi setelah domain final ada
  navItems: NavItem[];
  social: SocialLinks;
  tagline: string;
}

export const siteConfig = {
  name: "Muhammad Akbar Suharbi",
  title: "Muhammad Akbar Suharbi | Data & AI Professional",
  role: ["Data Analyst", "Data Scientist", "Data Engineer"],
  location: "Jakarta, Indonesia",
  siteUrl: "https://mas-porto.my.id", // TODO: ganti setelah deploy Vercel pertama
  tagline: "Transforming 7+ years of enterprise IT experience with modern Data Science and AI Engineering.",

  navItems: [
    { href: "/#home", key: "home" },
    { href: "/#about", key: "about" },
    { href: "/projects", key: "projects" },
    { href: "/blog", key: "blog" },
    { href: "/#contact", key: "contact" },
  ],

  social: {
    email: "akbarsuharbi@gmail.com",
    whatsapp: "6285290830915",
    github: "https://github.com/akbarabie",
    linkedin: "https://www.linkedin.com/in/muhammad-akbar-suharbi-6955ba189/",
  },
} satisfies SiteConfig;

/**
 * Helper untuk construct link WA dengan pesan pre-filled (opsional).
 * Dipakai nanti di tombol "Chat via WhatsApp" pada Contact page.
 */
export function getWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.social.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}