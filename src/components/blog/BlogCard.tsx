// src/components/blog/BlogCard.tsx
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Card,
  CardImage,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BlogCoverPlaceholder } from "@/components/blog/BlogCoverPlaceholder";
import { publicAssetExists } from "@/lib/asset-exists";
import type { Post } from "@/lib/blog";
import type { Locale } from "@/i18n/routing";

interface BlogCardProps {
  post: Post;
  locale: Locale;
}

export async function BlogCard({ post, locale }: BlogCardProps) {
  const t = await getTranslations("blog");
  const hasCover = post.cover ? publicAssetExists(post.cover) : false;
  const formattedDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(post.date));

  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <Card interactive className="flex h-full flex-col">
        {hasCover && post.cover ? (
          <CardImage src={post.cover} alt={post.title} />
        ) : (
          <div className="relative aspect-video w-full overflow-hidden bg-background">
            <BlogCoverPlaceholder title={post.title} />
          </div>
        )}

        <CardHeader>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} className="w-fit">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{post.excerpt}</CardDescription>
        </CardHeader>

        <CardContent className="mt-auto flex items-center gap-3 text-xs text-text-muted">
          <span>{formattedDate}</span>
          <span aria-hidden="true">·</span>
          <span>{t("readTime", { minutes: post.metadata.readingTime })}</span>
        </CardContent>
      </Card>
    </Link>
  );
}
