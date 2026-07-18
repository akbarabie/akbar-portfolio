// src/app/[locale]/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { BlogCoverPlaceholder } from "@/components/blog/BlogCoverPlaceholder";
import { MDXContent } from "@/components/blog/MDXContent";
import { publicAssetExists } from "@/lib/asset-exists";
import { getPostBySlug, getAllPublishedParams } from "@/lib/blog";
import { buildLanguageAlternates } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllPublishedParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale as Locale, slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { languages: buildLanguageAlternates(`/blog/${post.slug}`) },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      ...(post.cover ? { images: [post.cover] } : {}),
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPostBySlug(locale as Locale, slug);
  if (!post) notFound();

  const t = await getTranslations("blog");
  const hasCover = post.cover ? publicAssetExists(post.cover) : false;
  const formattedDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(post.date));

  return (
    <article>
      <Container className="py-24">
        <AnimatedSection>
          <Link href="/blog" className="mb-8 inline-block text-sm text-accent hover:underline">
            &larr; {t("backToBlog")}
          </Link>

          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">{post.title}</h1>

          <div className="mb-10 flex items-center gap-3 text-sm text-text-muted">
            <span>{formattedDate}</span>
            <span aria-hidden="true">·</span>
            <span>{t("readTime", { minutes: post.metadata.readingTime })}</span>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-2xl border border-border">
            {hasCover && post.cover ? (
              <Image
                src={post.cover}
                alt={post.title}
                fill
                priority
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-cover"
              />
            ) : (
              <BlogCoverPlaceholder title={post.title} />
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="max-w-3xl">
            <MDXContent code={post.content} />
          </div>
        </AnimatedSection>
      </Container>
    </article>
  );
}
