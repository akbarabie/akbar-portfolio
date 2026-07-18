import { defineCollection, defineConfig, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypeShiki from "@shikijs/rehype";
import remarkGfm from "remark-gfm";

const SUPPORTED_LOCALES = ["en", "id"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

/**
 * Struktur konten: content/blog/<locale>/<slug>.mdx
 * Locale & slug SENGAJA di-derive dari path file lewat `s.path()` (bukan
 * field manual di frontmatter) supaya artikel EN & ID otomatis "berpasangan"
 * selama nama filenya sama persis di kedua folder locale — satu sumber
 * kebenaran, gak ada risiko typo slug antara dua bahasa.
 */
const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(120),
      excerpt: s.string().max(280),
      date: s.isodate(),
      tags: s.array(s.string()).default([]),
      cover: s.string().optional(),
      published: s.boolean().default(true),
      metadata: s.metadata(), // auto: { readingTime, wordCount }
      content: s.mdx(),
      path: s.path(), // contoh: "blog/en/xgboost-investor-risk-mifid-ii"
    })
    .transform((data, { addIssue }) => {
      const segments = data.path.split("/");
      const locale = segments[1];
      const slug = segments[segments.length - 1];

      if (!SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
        addIssue({
          code: "custom",
          message: `File "${data.path}.mdx" harus ditaruh di content/blog/en/ atau content/blog/id/, bukan langsung di content/blog/`,
        });
        return null as never;
      }

      return {
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        tags: data.tags,
        cover: data.cover,
        published: data.published,
        metadata: data.metadata,
        content: data.content,
        locale: locale as SupportedLocale,
        slug,
      };
    }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      // Single dark theme dulu untuk v1 — situs ini dark-first, dan project
      // masih punya open bug CSS token light-mode yang belum di-fix (lihat
      // pending item lama). Dual light/dark shiki theme bisa jadi fast-follow
      // setelah bug light-mode itu beres, biar gak numpuk dua area "light
      // mode belum diverifikasi" sekaligus.
      [rehypeShiki, { theme: "github-dark-dimmed" }],
    ],
  },
});
