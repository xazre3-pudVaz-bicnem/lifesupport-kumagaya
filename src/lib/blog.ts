import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { site } from "@/data/site";

/**
 * content/blog/*.md（毎日1記事の自動生成ブログ＋手書き記事）を読み込む。
 * frontmatter は gray-matter で解析する。
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogFaq = { question: string; answer: string };

export type BlogMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedAt: string;
  category: string;
  keywords: string[];
  targetKeyword: string;
  author: string;
  /** アイキャッチ・OGP（public からの絶対パス） */
  image: string;
  topicId: string;
  /** この記事が支えるピラーページ（内部リンク先） */
  pillar: string;
  faq: BlogFaq[];
};

export type BlogPost = BlogMeta & { content: string };

/**
 * カテゴリー（トピッククラスター）。表示名 → URL用スラッグ → ピラーページ。
 * scripts/generate-daily-post.ts の TOPICS と一致させること。
 */
export const BLOG_CATEGORIES: { name: string; slug: string; pillar: string; lead: string }[] = [
  {
    name: "熊谷の買い物代行",
    slug: "kumagaya-shopping",
    pillar: "/shopping-support",
    lead: "熊谷市で買い物代行を利用する方法、選択肢、メリットについて。",
  },
  {
    name: "高齢者の生活支援",
    slug: "senior-life",
    pillar: "/for-seniors",
    lead: "高齢になると買い物が大変になる理由と、無理をしないための工夫。",
  },
  {
    name: "ご家族向け",
    slug: "family",
    pillar: "/for-family",
    lead: "離れて暮らす親の買い物が心配なとき、家族にできること。",
  },
  {
    name: "介護保険外サービス",
    slug: "insurance-outside",
    pillar: "/insurance-outside",
    lead: "介護保険で対応できる買い物・できない買い物と、自費サービスという選択肢。",
  },
  {
    name: "熊谷の地域情報",
    slug: "kumagaya-area",
    pillar: "/area/kumagaya",
    lead: "熊谷市の高齢者向け支援、相談先、暮らしの情報。",
  },
];

export function categorySlug(name: string): string {
  return BLOG_CATEGORIES.find((c) => c.name === name)?.slug ?? BLOG_CATEGORIES[0].slug;
}

export function categoryName(slug: string): string | undefined {
  return BLOG_CATEGORIES.find((c) => c.slug === slug)?.name;
}

export function categoryPillar(name: string): string {
  return BLOG_CATEGORIES.find((c) => c.name === name)?.pillar ?? "/shopping-support";
}

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  if (typeof value === "string")
    return value
      .split(/[,、]/)
      .map((v) => v.trim())
      .filter(Boolean);
  return [];
}

function toFaq(value: unknown): BlogFaq[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => {
      if (!v || typeof v !== "object") return null;
      const o = v as Record<string, unknown>;
      const question = String(o.question ?? o.q ?? "").trim();
      const answer = String(o.answer ?? o.a ?? "").trim();
      return question && answer ? { question, answer } : null;
    })
    .filter((v): v is BlogFaq => v !== null);
}

function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

let cache: BlogPost[] | null = null;

function readAll(): BlogPost[] {
  if (cache) return cache;
  if (!fs.existsSync(BLOG_DIR)) return (cache = []);
  cache = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slugFromFile = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const category = String(data.category ?? BLOG_CATEGORIES[0].name);
      return {
        slug: String(data.slug ?? slugFromFile),
        title: String(data.title ?? slugFromFile),
        description: String(data.description ?? ""),
        date: toDateString(data.date),
        updatedAt: toDateString(data.updatedAt ?? data.date),
        category,
        keywords: toArray(data.keywords),
        targetKeyword: String(data.targetKeyword ?? ""),
        author: String(data.author ?? site.author),
        image: String(data.image ?? "/og.jpg"),
        topicId: String(data.topicId ?? ""),
        pillar: String(data.pillar ?? categoryPillar(category)),
        faq: toFaq(data.faq),
        content: content.trim(),
      };
    });
  return cache;
}

/** 1ページあたりの記事数 */
export const BLOG_PER_PAGE = 12;

/** 記事メタ一覧（日付降順） */
export function getBlogList(): BlogMeta[] {
  return (
    readAll()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ content, ...meta }) => meta)
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  );
}

export function getBlogPageCount(): number {
  return Math.max(1, Math.ceil(getBlogList().length / BLOG_PER_PAGE));
}

export function getBlogPage(page: number): BlogMeta[] {
  const start = (page - 1) * BLOG_PER_PAGE;
  return getBlogList().slice(start, start + BLOG_PER_PAGE);
}

export function getBlogPost(slug: string): BlogPost | null {
  return readAll().find((p) => p.slug === slug) ?? null;
}

export function getBlogSlugs(): string[] {
  return readAll().map((p) => p.slug);
}

export function getBlogCategoriesInUse(): { name: string; slug: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of readAll()) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  return BLOG_CATEGORIES.map((c) => ({ name: c.name, slug: c.slug, count: counts.get(c.name) ?? 0 })).filter(
    (c) => c.count > 0,
  );
}

export function getBlogPostsByCategory(slug: string): BlogMeta[] {
  const name = categoryName(slug);
  if (!name) return [];
  return getBlogList().filter((p) => p.category === name);
}

/** 指定カテゴリーの最新記事（固定ページから関連記事へ内部リンクするため） */
export function getBlogPostsForCategories(names: string[], limit = 3): BlogMeta[] {
  return getBlogList()
    .filter((p) => names.includes(p.category))
    .slice(0, limit);
}

/** 関連記事：同カテゴリー → キーワード一致数 → 新しい順 */
export function getRelatedBlogPosts(slug: string, limit = 4): BlogMeta[] {
  const all = getBlogList();
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.slice(0, limit);
  return all
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;
      if (p.category === current.category) score += 3;
      score += p.keywords.filter((t) => current.keywords.includes(t)).length;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1))
    .slice(0, limit)
    .map((s) => s.p);
}

/** 「2026-08-21」→「2026.08.21」 */
export function formatDate(date: string): string {
  return date.replaceAll("-", ".");
}
