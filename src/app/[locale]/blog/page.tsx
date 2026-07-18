// src/app/[locale]/blog/page.tsx
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { BlogCard } from "@/components/blog/BlogCard";
import { getPublishedPosts } from "@/lib/blog";
import { routing, type Locale } from "@/i18n/routing";
import { buildLanguageAlternates } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { languages: buildLanguageAlternates("/blog") },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const posts = getPublishedPosts(locale as Locale);

  return (
    <Container className="py-24">
      <AnimatedSection>
        <h1 className="mb-4 text-4xl font-bold text-foreground">{t("title")}</h1>
        <p className="mb-12 max-w-2xl text-text-muted">{t("subtitle")}</p>
      </AnimatedSection>

      {posts.length === 0 ? (
        <p className="text-text-muted">{t("empty")}</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <AnimatedSection key={post.slug}>
              <BlogCard post={post} locale={locale as Locale} />
            </AnimatedSection>
          ))}
        </div>
      )}
    </Container>
  );
}
