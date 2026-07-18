import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";
import { projects } from "@/data/projects";
import { getAllPublishedParams } from "@/lib/blog";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    // Homepage
    entries.push({
      url: `${siteConfig.siteUrl}/${locale}`,
      changeFrequency: "monthly",
      priority: 1,
    });

    // Projects listing
    entries.push({
      url: `${siteConfig.siteUrl}/${locale}/projects`,
      changeFrequency: "monthly",
      priority: 0.8,
    });

    // Project detail
    for (const project of projects) {
      entries.push({
        url: `${siteConfig.siteUrl}/${locale}/projects/${project.slug}`,
        changeFrequency: "yearly",
        priority: 0.7,
      });
    }

    // Blog listing
    entries.push({
      url: `${siteConfig.siteUrl}/${locale}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Blog detail — sudah per (locale, slug) dari getAllPublishedParams
  for (const { locale, slug } of getAllPublishedParams()) {
    entries.push({
      url: `${siteConfig.siteUrl}/${locale}/blog/${slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
