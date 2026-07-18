import { routing } from "@/i18n/routing";
import { siteConfig } from "@/data/site-config";

/**
 * `siteConfig.siteUrl` tanpa trailing slash — defensif. Kalau suatu saat
 * siteUrl ke-isi ulang dengan "/" di akhir (sudah pernah kejadian: bikin
 * sitemap generate URL dobel-slash kayak "mas-porto.my.id//id"), semua
 * kode yang gabungin SITE_URL + path tetap aman.
 */
export const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, "");

/**
 * Bangun object `alternates.languages` untuk Next.js Metadata API — ini yang
 * jadi tag `<link rel="alternate" hreflang="...">`, sinyal ke Google bahwa
 * halaman ini punya versi bahasa lain di URL tertentu (bukan duplicate
 * content dua bahasa yang gak berhubungan).
 *
 * `pathWithoutLocale` HARUS locale-agnostic, contoh "/blog/slug-x" atau "/"
 * — JANGAN include prefix locale ("/id/blog/slug-x" salah).
 *
 * Asumsi saat ini: setiap slug (project/blog) punya versi di SEMUA locale
 * yang terdaftar di `routing.locales` — sesuai konvensi "artikel EN & ID
 * selalu berpasangan" yang sudah disepakati. Kalau nanti ada post yang
 * sengaja cuma 1 bahasa, helper ini perlu di-extend buat skip locale yang
 * gak punya versi (belum jadi masalah nyata sekarang, jadi belum ditangani).
 */
export function buildLanguageAlternates(pathWithoutLocale: string) {
  const suffix = pathWithoutLocale === "/" ? "" : pathWithoutLocale;
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = `${SITE_URL}/${locale}${suffix}`;
  }

  languages["x-default"] = languages[routing.defaultLocale];

  return languages;
}