import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import { photos } from "@/data/photos";
import ContactCta from "@/components/ui/ContactCta";
import PostList, { CategoryNav } from "@/components/blog/PostList";
import { BLOG_CATEGORIES, categoryName, getBlogCategoriesInUse, getBlogPostsByCategory } from "@/lib/blog";
import { NAV } from "@/data/nav";
import { site } from "@/data/site";
import { ArrowRightIcon } from "@/components/ui/icons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = categoryName(slug);
  if (!name) return {};
  const empty = getBlogPostsByCategory(slug).length === 0;
  return {
    title: `${name}の記事一覧｜お役立ち情報`,
    description: `熊谷市の買い物代行 ${site.name}のお役立ち情報から、「${name}」に関する記事の一覧です。`,
    alternates: { canonical: `/blog/category/${slug}` },
    openGraph: {
      title: `${name}の記事一覧｜${site.name}`,
      url: `/blog/category/${slug}`,
      images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    },
    // 記事がまだ無いカテゴリーは薄いページになるためインデックスさせない
    ...(empty ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const name = categoryName(slug);
  if (!name) notFound();

  const cat = BLOG_CATEGORIES.find((c) => c.slug === slug)!;
  const posts = getBlogPostsByCategory(slug);
  const categories = getBlogCategoriesInUse();
  const pillar = NAV.find((n) => n.href === cat.pillar);

  return (
    <>
      <PageHeader
        en="Blog"
        title={name}
        lead={cat.lead}
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "お役立ち情報", path: "/blog" },
          { name, path: `/blog/category/${slug}` },
        ]}
        photo={photos.toteGroceries}
        photoPosition="50% 50%"
      />
      <div className="mx-auto max-w-4xl px-5 pb-20 pt-10 sm:px-8 sm:pb-28">
        <CategoryNav categories={categories} current={slug} />
        {pillar ? (
          <p className="mt-6 text-[0.92rem] text-ink-soft">
            このカテゴリーのまとめページ：
            <Link href={pillar.href} className="link-line ml-2">
              {pillar.label} <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </p>
        ) : null}
        <div className="mt-8">
          <PostList posts={posts} />
        </div>
      </div>
      <ContactCta compact />
    </>
  );
}
