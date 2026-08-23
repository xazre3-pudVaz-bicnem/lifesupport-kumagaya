import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import ContactCta from "@/components/ui/ContactCta";
import PostList, { CategoryNav, Pagination } from "@/components/blog/PostList";
import { getBlogCategoriesInUse, getBlogPage, getBlogPageCount } from "@/lib/blog";
import { site } from "@/data/site";

type Props = { params: Promise<{ num: string }> };

export function generateStaticParams() {
  const count = getBlogPageCount();
  // 1ページ目は /blog が担当
  return Array.from({ length: Math.max(0, count - 1) }, (_, i) => ({ num: String(i + 2) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { num } = await params;
  return {
    title: `お役立ち情報（${num}ページ目）`,
    description: `${site.name}のお役立ち情報 ${num}ページ目。買い物のこと、高齢の親のこと、介護保険外サービスのことを発信しています。`,
    alternates: { canonical: `/blog/page/${num}` },
    robots: { index: false, follow: true },
  };
}

export default async function BlogPagedPage({ params }: Props) {
  const { num } = await params;
  const page = Number(num);
  if (!Number.isInteger(page) || page < 1) notFound();
  if (page === 1) redirect("/blog");
  const pageCount = getBlogPageCount();
  if (page > pageCount) notFound();

  const posts = getBlogPage(page);
  const categories = getBlogCategoriesInUse();

  return (
    <>
      <PageHeader
        en="Blog"
        title="お役立ち情報"
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "お役立ち情報", path: "/blog" },
          { name: `${page}ページ目`, path: `/blog/page/${page}` },
        ]}
      />
      <div className="mx-auto max-w-4xl px-5 pb-20 pt-10 sm:px-8 sm:pb-28">
        <CategoryNav categories={categories} />
        <div className="mt-8">
          <PostList posts={posts} />
        </div>
        <Pagination page={page} pageCount={pageCount} />
      </div>
      <ContactCta compact />
    </>
  );
}
