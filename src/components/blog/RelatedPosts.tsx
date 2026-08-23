import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { formatDate, getBlogPostsForCategories } from "@/lib/blog";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * 固定ページ（ピラー）→ ブログ（クラスター）への内部リンク。
 * 指定カテゴリーの記事がまだ無ければ何も出さない。
 */
export default function RelatedPosts({
  categories,
  title = "関連するお役立ち情報",
  limit = 3,
}: {
  categories: string[];
  title?: string;
  limit?: number;
}) {
  const posts = getBlogPostsForCategories(categories, limit);
  if (posts.length === 0) return null;
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
      <Reveal>
        <div className="flex items-baseline justify-between gap-6 border-b hairline pb-4">
          <h2 className="font-maru text-[1.2rem] font-bold tracking-[0.04em]">{title}</h2>
          <Link href="/blog" className="link-line text-[13px]">
            一覧 <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Reveal>
      <ul className="grid gap-x-10 sm:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.slug} as="li" delay={i * 0.06} className="border-b hairline sm:border-b-0">
            <Link href={`/blog/${p.slug}`} className="group block py-5">
              <div className="flex items-baseline gap-3 text-[11.5px] tracking-wider text-stone">
                <time dateTime={p.date}>{formatDate(p.date)}</time>
                <span className="text-moss">{p.category}</span>
              </div>
              <h3 className="mt-1.5 font-maru text-[0.98rem] font-bold leading-[1.7] underline-offset-4 group-hover:underline">
                {p.title}
              </h3>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
