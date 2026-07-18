import { posts } from "@/.velite";
import type { Post } from "@/.velite";
import type { Locale } from "@/i18n/routing";

export type { Post };

/**
 * Post yang published, untuk 1 locale tertentu, urut dari terbaru.
 * Dipakai di listing page `/blog`.
 */
export function getPublishedPosts(locale: Locale): Post[] {
  return posts
    .filter((post) => post.locale === locale && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Satu post spesifik by slug, untuk 1 locale. Return undefined kalau gak
 * ketemu atau belum published — dipakai di `/blog/[slug]` buat trigger
 * notFound().
 */
export function getPostBySlug(locale: Locale, slug: string): Post | undefined {
  return posts.find(
    (post) => post.locale === locale && post.slug === slug && post.published
  );
}

/**
 * Semua kombinasi (locale, slug) yang published — dipakai di
 * generateStaticParams supaya semua artikel di-pre-render saat build.
 */
export function getAllPublishedParams(): Array<{ locale: Locale; slug: string }> {
  return posts
    .filter((post) => post.published)
    .map((post) => ({ locale: post.locale, slug: post.slug }));
}