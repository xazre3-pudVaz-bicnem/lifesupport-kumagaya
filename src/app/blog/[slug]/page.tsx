import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/ui/JsonLd";
import ContactCta from "@/components/ui/ContactCta";
import Reveal from "@/components/ui/Reveal";
import { blogPostingJsonLd, faqJsonLd } from "@/lib/jsonld";
import { categorySlug, formatDate, getBlogPost, getBlogSlugs, getRelatedBlogPosts } from "@/lib/blog";
import { site } from "@/data/site";
import { NAV } from "@/data/nav";
import { ArrowRightIcon, ChevronDownIcon } from "@/components/ui/icons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: { absolute: `${post.title}｜${site.name}` },
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      images: [{ url: post.image || "/og.jpg", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", images: [post.image || "/og.jpg"] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getRelatedBlogPosts(slug, 4);
  const pillar = NAV.find((n) => n.href === post.pillar) ?? { href: "/shopping-support", label: "買い物代行について" };

  return (
    <>
      <JsonLd data={blogPostingJsonLd(post)} />
      {post.faq.length > 0 ? <JsonLd data={faqJsonLd(post.faq)} /> : null}
      <div className="pt-20 lg:pt-24" />
      <Breadcrumbs
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "お役立ち情報", path: "/blog" },
          { name: post.category, path: `/blog/category/${categorySlug(post.category)}` },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <article className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <header>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[12px] tracking-wider text-stone">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.updatedAt && post.updatedAt !== post.date ? <span>更新 {formatDate(post.updatedAt)}</span> : null}
            <Link href={`/blog/category/${categorySlug(post.category)}`} className="text-moss underline-offset-4 hover:underline">
              {post.category}
            </Link>
          </div>
          <h1 className="mt-4 font-maru text-[1.7rem] font-bold leading-[1.55] tracking-[0.02em] sm:text-[2.1rem]">{post.title}</h1>
          <p className="mt-4 text-[13px] text-stone">文：{post.author}</p>
          {post.image && post.image !== "/og.jpg" ? (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden bg-mint">
              <Image
                src={post.image}
                alt=""
                fill
                priority
                sizes="(min-width: 768px) 48rem, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </header>

        <div className="prose-blog mt-10 text-[0.97rem] leading-[2.1] sm:text-base">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

        {post.faq.length > 0 ? (
          <section className="mt-14">
            <h2 className="font-maru text-[1.3rem] font-bold">この記事に関するよくある質問</h2>
            <div className="mt-4 border-t hairline">
              {post.faq.map((f) => (
                <details key={f.question} className="group border-b hairline">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-4 text-left [&::-webkit-details-marker]:hidden">
                    <h3 className="font-maru text-[1rem] font-bold leading-[1.7]">
                      <span aria-hidden className="mr-3 text-leaf">
                        Q
                      </span>
                      {f.question}
                    </h3>
                    <ChevronDownIcon className="mt-1.5 h-5 w-5 shrink-0 text-stone transition-transform duration-500 group-open:rotate-180" />
                  </summary>
                  <p className="pb-5 pl-7 text-[0.92rem] leading-[2] text-ink-soft">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        {/* ピラーページへの導線 */}
        <aside className="mt-14 bg-mint px-6 py-7 sm:px-8">
          <p className="text-[11px] tracking-[0.3em] text-moss">RELATED PAGE</p>
          <p className="mt-2 font-maru text-[1.05rem] font-bold">この記事に関連するページ</p>
          <Link href={pillar.href} className="link-line mt-3 text-[0.95rem]">
            {pillar.label} <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </aside>

        <footer className="mt-10 border-t hairline pt-8">
          <p className="font-maru text-[0.95rem] font-bold">{site.name}</p>
          <p className="mt-1 text-[12.5px] leading-[1.9] text-ink-soft">
            {site.tagline}｜対応エリア：{site.areas.join("・")}
            <br />
            現在提供しているサービスは買い物代行のみです。介護保険外のサービスのため、介護認定は不要です。
          </p>
          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <Link href="/shopping-support" className="link-line">
              買い物代行について <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
            <Link href="/flow" className="link-line">
              ご利用の流れ <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
            <Link href="/contact" className="link-line">
              お問い合わせ <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </footer>
      </article>

      {related.length > 0 ? (
        <section className="mx-auto max-w-3xl px-5 pb-20 sm:px-8 sm:pb-28">
          <h2 className="font-maru text-[1.2rem] font-bold">関連するお役立ち情報</h2>
          <ul className="mt-4 border-t hairline">
            {related.map((p) => (
              <Reveal key={p.slug} as="li" className="border-b hairline">
                <Link href={`/blog/${p.slug}`} className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-5">
                  <time dateTime={p.date} className="shrink-0 text-[12px] tracking-wider text-stone">
                    {formatDate(p.date)}
                  </time>
                  <span className="text-[0.95rem] underline-offset-4 group-hover:underline">{p.title}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
          <div className="mt-8">
            <Link href="/blog" className="link-line text-sm">
              お役立ち情報の一覧へ <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </section>
      ) : null}
      <ContactCta compact />
    </>
  );
}
