import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { formatDate, getBlogList } from "@/lib/blog";
import { ArrowRightIcon } from "@/components/ui/icons";

/** ブログ・お役立ち情報（最新3件） */
export default function LatestPosts() {
  const posts = getBlogList().slice(0, 3);
  if (posts.length === 0) return null;
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              en="Blog"
              title="お役立ち情報"
              lead="買い物のこと、高齢の親のこと、介護保険外サービスのこと。熊谷の暮らしに役立つ情報を発信しています。"
            />
            <Link href="/blog" className="link-line text-[0.95rem]">
              一覧を見る <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <ul className="mt-10 grid gap-x-10 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} as="li" delay={i * 0.06}>
              <Link href={`/blog/${p.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden bg-mint">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 22rem, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-baseline gap-3 border-t-2 border-sprout pt-4 text-[11.5px] tracking-wider text-stone">
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                  <span className="text-moss">{p.category}</span>
                </div>
                <h3 className="mt-2 font-maru text-[1.02rem] font-bold leading-[1.7] underline-offset-4 group-hover:underline">
                  {p.title}
                </h3>
                <p className="mt-2 line-clamp-3 pb-6 text-[0.88rem] leading-[1.9] text-ink-soft">{p.description}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
