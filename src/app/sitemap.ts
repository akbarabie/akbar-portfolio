import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getAllPublishedParams } from "@/lib/blog";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      changeFrequency: "monthly",
      priority: 1,
    });

    entries.push({
      url: `${SITE_URL}/${locale}/projects`,
      changeFrequency: "monthly",
      priority: 0.8,
    });

    for (const project of projects) {
      entries.push({
        url: `${SITE_URL}/${locale}/projects/${project.slug}`,
        changeFrequency: "yearly",
        priority: 0.7,
      });
    }

    entries.push({
      url: `${SITE_URL}/${locale}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  for (const { locale, slug } of getAllPublishedParams()) {
    entries.push({
      url: `${SITE_URL}/${locale}/blog/${slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}