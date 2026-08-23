import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { formatDate, type BlogMeta } from "@/lib/blog";

/** ブログ記事一覧（罫線で区切ったリスト。カードは使わない） */
export default function PostList({ posts }: { posts: BlogMeta[] }) {
  if (posts.length === 0) {
    return <p className="py-16 text-center text-sm text-stone">記事はまだありません。準備中です。</p>;
  }
  return (
    <ul className="border-t hairline">
      {posts.map((post, i) => (
        <Reveal key={post.slug} as="li" delay={(i % 6) * 0.04} className="border-b hairline">
          <article>
            <Link
              href={`/blog/${post.slug}`}
              className="group grid gap-4 py-7 sm:grid-cols-[11rem_1fr] sm:items-start sm:gap-8"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-mint sm:aspect-[4/3]">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 11rem, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[11.5px] tracking-wider text-stone">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="text-moss">{post.category}</span>
                </div>
                <h2 className="mt-2 font-maru text-[1.08rem] font-bold leading-[1.7] underline-offset-4 group-hover:underline sm:text-[1.15rem]">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-[0.9rem] leading-[1.9] text-ink-soft">{post.description}</p>
              </div>
            </Link>
          </article>
        </Reveal>
      ))}
    </ul>
  );
}

/** カテゴリの絞り込みナビ */
export function CategoryNav({
  categories,
  current,
}: {
  categories: { name: string; slug: string; count: number }[];
  current?: string;
}) {
  if (categories.length === 0) return null;
  return (
    <nav aria-label="カテゴリー">
      <ul className="flex flex-wrap gap-x-2 gap-y-2 text-[13.5px]">
        <li>
          <Link
            href="/blog"
            className={`inline-flex min-h-10 items-center rounded-full border px-4 transition-colors ${
              current ? "border-line text-ink-soft hover:border-moss hover:text-moss" : "border-moss bg-moss text-white"
            }`}
          >
            すべて
          </Link>
        </li>
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/blog/category/${c.slug}`}
              className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 transition-colors ${
                current === c.slug ? "border-moss bg-moss text-white" : "border-line text-ink-soft hover:border-moss hover:text-moss"
              }`}
            >
              {c.name}
              <span className="text-[11px] opacity-70">{c.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** ページ送り */
export function Pagination({ page, pageCount }: { page: number; pageCount: number }) {
  if (pageCount <= 1) return null;
  const hrefOf = (p: number) => (p === 1 ? "/blog" : `/blog/page/${p}`);
  return (
    <nav aria-label="ページ送り" className="mt-12 flex items-center justify-center gap-8 text-sm">
      {page > 1 ? (
        <Link href={hrefOf(page - 1)} className="link-line">
          ← 前のページ
        </Link>
      ) : null}
      <span className="font-maru tracking-wider text-stone">
        {page} / {pageCount}
      </span>
      {page < pageCount ? (
        <Link href={hrefOf(page + 1)} className="link-line">
          次のページ →
        </Link>
      ) : null}
    </nav>
  );
}
