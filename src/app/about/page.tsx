import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { photos } from "@/data/photos";
import PhotoFrame from "@/components/ui/Photo";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ContactCta from "@/components/ui/ContactCta";
import JsonLd from "@/components/ui/JsonLd";
import LaunchNotice from "@/components/ui/LaunchNotice";
import Values from "@/components/sections/home/Values";
import { site } from "@/data/site";
import { representative } from "@/data/representative";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/jsonld";
import { ArrowRightIcon, ExternalIcon, InstagramIcon } from "@/components/ui/icons";

const TITLE = "私たちについて｜福祉・介護の現場経験から生まれた、熊谷の買い物代行";
const DESCRIPTION =
  "ライフサポート熊谷は、福祉・介護の現場経験から生まれた熊谷市の買い物代行サービスです。「ちょっとお願い」と言える地域をつくりたい。代表・齊藤匠の想いと、大切にしている3つのこと、事業概要をご紹介します。";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/about",
  keywords: ["ライフサポート熊谷", "熊谷 買い物代行", "熊谷市 買い物代行 運営者"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ path: "/about", name: TITLE, description: DESCRIPTION, type: "AboutPage" })} />
      <PageHeader
        en="About"
        title={
          <>
            「ちょっとお願い」と
            <br />
            言える地域を、つくりたい。
          </>
        }
        lead="ライフサポート熊谷は、福祉・介護の現場経験から生まれた、熊谷の買い物代行サービスです。"
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "私たちについて", path: "/about" },
        ]}
        photo={photos.shoppingBasket}
        photoPosition="55% 45%"
      />

      {/* 想い */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal>
            <SectionHeading en="Why we started" title="なぜ、買い物代行なのか" />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-5 text-[0.97rem] leading-[2.15] text-ink-soft">
              <p>
                福祉・介護の現場で、「買い物に行くのが大変」という声に、何度も出会ってきました。介護が必要というほどではない。家族はいるけれど、毎回は頼みにくい。制度の枠には入らないけれど、確かに困っている。そんな「あいだ」にある困りごとです。
              </p>
              <p>
                買い物は、毎日の暮らしの土台です。そこが少し楽になるだけで、住み慣れた家での暮らしを続けやすくなる。だからライフサポート熊谷は、まず「買い物」に専念することにしました。
              </p>
              <p>
                目指しているのは、安心して「ちょっとお願い」と言える存在であること。そして、「ちょっとお願い」が自然に言える地域を、熊谷につくっていくことです。
              </p>
            </div>
          </Reveal>
        </div>

        {/* 代表挨拶への導線 */}
        <Reveal>
          <div className="mt-16 grid items-center gap-8 border-t hairline pt-12 sm:grid-cols-[auto_1fr] sm:gap-10">
            <PhotoFrame
              photo={photos.representative}
              className="aspect-[1023/1537] w-36 shrink-0 sm:w-44"
              sizes="12rem"
            />
            <div>
              <p className="text-[13px] tracking-[0.14em] text-moss">{representative.title}</p>
              <p className="mt-2 font-maru text-[1.5rem] font-bold tracking-[0.1em]">
                {representative.name}
                <span className="ml-3 align-middle text-[0.72rem] font-medium tracking-[0.1em] text-stone">
                  {representative.nameKana}
                </span>
              </p>
              <p className="mt-4 max-w-xl text-[0.93rem] leading-[2.05] text-ink-soft">
                家族の介護をきっかけに福祉の道へ進み、今も現場に立ちながら、熊谷市で買い物代行を始めました。サービスに込めた想いと、これまでの歩みをお伝えします。
              </p>
              <Link href="/message" className="link-line mt-5 text-[0.95rem]">
                代表挨拶を読む <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <Reveal>
        <PhotoFrame
          photo={photos.deliveryPaperBag}
          className="aspect-[16/9] sm:aspect-[21/9]"
          position="55% 50%"
          sizes="100vw"
          decorative
        />
      </Reveal>

      <Values />

      {/* 代表・事業概要 */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal>
            <SectionHeading en="Profile" title="事業概要" />
            <LaunchNotice className="mt-6" />
          </Reveal>
          <Reveal delay={0.08}>
            <dl className="border-t hairline">
              {[
                ["名称", site.name],
                ["代表", site.representative],
                ["事業内容", `${site.services.join("・")}（介護保険外サービス）`],
                ["対応エリア", site.areas.join("・")],
                ["背景", "福祉・介護の現場経験から生まれた地域の買い物代行サービス"],
                ...(site.tel ? [["電話", site.tel]] : []),
                ["ご相談方法", `お電話、または Instagram ${site.instagramId} のDM`],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-1 border-b hairline py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="text-[0.88rem] tracking-wider text-stone">{k}</dt>
                  <dd className="text-[0.95rem]">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-[0.85rem] leading-[1.9] text-stone">
              ※所在地・受付時間などは、確定次第このページと各ページに掲載します。ご相談はお電話またはInstagramのDMで受け付けています。
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line text-[0.95rem]"
              >
                <InstagramIcon className="h-4 w-4" />
                Instagramを見る
                <ExternalIcon className="h-3.5 w-3.5" />
              </a>
              <Link href="/shopping-support" className="link-line text-[0.95rem]">
                買い物代行サービスの詳細 <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
