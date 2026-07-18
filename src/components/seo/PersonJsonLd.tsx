import { siteConfig } from "@/data/site-config";

/**
 * Structured data (schema.org Person) buat SEO. Ini bukan sesuatu yang
 * user LIHAT — Google (dan mesin pencari lain) baca ini buat ngerti
 * "siapa" pemilik situs ini secara terstruktur, bisa nge-trigger rich
 * result kayak knowledge panel di hasil pencarian nama kamu.
 *
 * Server Component murni (gak ada state/interaktivity), render sekali di
 * root layout, jadi ada di setiap halaman.
 */
export function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role.join(" / "),
    url: siteConfig.siteUrl,
    email: `mailto:${siteConfig.social.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location,
    },
    sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
