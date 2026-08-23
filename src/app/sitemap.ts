import type { MetadataRoute } from "next";
import { getBlogCategoriesInUse, getBlogList } from "@/lib/blog";
import { site } from "@/data/site";

/** ブログ記事が増えると自動的にエントリが追加される */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/shopping-support`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/for-seniors`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/for-family`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/insurance-outside`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/area/kumagaya`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/message`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/flow`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/faq`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/blog`, changeFrequency: "daily", priority: 0.7 },
  ];

  const categories: MetadataRoute.Sitemap = getBlogCategoriesInUse().map((c) => ({
    url: `${site.url}/blog/category/${c.slug}`,
    changeFrequency: "daily",
    priority: 0.4,
  }));

  const posts: MetadataRoute.Sitemap = getBlogList().map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: p.updatedAt || p.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...categories, ...posts];
}
