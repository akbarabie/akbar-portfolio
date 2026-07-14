import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["id", "en"],
  defaultLocale: "id", // recruiter Indonesia jadi default; /en untuk audiens internasional
  localePrefix: "always", // /id/... dan /en/... eksplisit — terbaik untuk SEO (setiap bahasa jadi URL ter-index terpisah)
});

export type Locale = (typeof routing.locales)[number];