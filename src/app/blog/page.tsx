import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import JsonLd from "@/components/ui/JsonLd";
import ContactCta from "@/components/ui/ContactCta";
import PostList, { CategoryNav, Pagination } from "@/components/blog/PostList";
import { getBlogCategoriesInUse, getBlogPage, getBlogPageCount } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/jsonld";

const TITLE = "お役立ち情報｜熊谷の買い物・高齢者の生活支援・介護保険外サービス";
const DESCRIPTION =
  "熊谷市の買い物代行 ライフサポート熊谷のお役立ち情報。買い物に行くのが大変になったとき、離れて暮らす親が心配なとき、介護保険で買い物を頼めないとき。熊谷の暮らしに役立つ情報を発信しています。";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/blog",
});

export default function BlogPage() {
  const posts = getBlogPage(1);
  const pageCount = getBlogPageCount();
  const categories = getBlogCategoriesInUse();

  return (
    <>
      <JsonLd data={webPageJsonLd({ path: "/blog", name: TITLE, description: DESCRIPTION, type: "CollectionPage" })} />
      <PageHeader
        en="Blog"
        title="お役立ち情報"
        lead="買い物のこと、高齢の親のこと、介護保険外サービスのこと。熊谷の暮らしに役立つ情報を、ライフサポート熊谷から。"
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "お役立ち情報", path: "/blog" },
        ]}
      />
      <div className="mx-auto max-w-4xl px-5 pb-20 pt-10 sm:px-8 sm:pb-28">
        <CategoryNav categories={categories} />
        <div className="mt-8">
          <PostList posts={posts} />
        </div>
        <Pagination page={1} pageCount={pageCount} />
      </div>
      <ContactCta compact />
    </>
  );
}
