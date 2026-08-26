import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ContactCta from "@/components/ui/ContactCta";
import AreaIllustrations from "@/components/ui/AreaIllustrations";
import JsonLd from "@/components/ui/JsonLd";
import { photos } from "@/data/photos";
import { CAREER, CLOSING, STORY, representative } from "@/data/representative";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { personJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { ArrowRightIcon } from "@/components/ui/icons";

const TITLE = "代表挨拶｜安心と人の温かさを、一緒にお届けします";
const DESCRIPTION =
  "ライフサポート熊谷 代表・齋藤匠のご挨拶。家族の介護をきっかけに福祉の道へ進み、今も現場に立ちながら、熊谷市で買い物代行を始めました。サービスに込めた想いと、これまでの歩みをお伝えします。";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/message",
  keywords: ["ライフサポート熊谷 代表", "齋藤匠", "熊谷 買い物代行 代表挨拶"],
});

export default function MessagePage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ path: "/message", name: TITLE, description: DESCRIPTION, type: "AboutPage" })} />
      <JsonLd data={personJsonLd()} />

      <PageHeader
        en="Message"
        title={
          <>
            安心と人の温かさを、
            <br />
            一緒にお届けします。
          </>
        }
        lead="ライフサポート熊谷の代表を務める、齋藤匠と申します。家族の介護をきっかけに福祉の道へ進み、今も現場に立ちながら、熊谷市で買い物代行を始めました。"
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "私たちについて", path: "/about" },
          { name: "代表挨拶", path: "/message" },
        ]}
        photo={photos.representative}
        photoPosition="50% 20%"
        photoClassName="mx-auto aspect-[3/4] w-full max-w-[15rem] bg-transparent [mask-image:linear-gradient(to_bottom,black_86%,transparent_100%)] sm:max-w-[17rem] lg:mx-0 lg:ml-auto lg:max-w-[19rem]"
        decoration={false}
      />

      {/* 名前・肩書き */}
      <section className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-20">
        <Reveal>
          <div className="flex flex-wrap items-end gap-x-6 gap-y-2 border-b hairline pb-6">
            <p className="text-[13px] tracking-[0.14em] text-moss">{representative.title}</p>
            <p className="font-maru text-[1.8rem] font-bold tracking-[0.12em] sm:text-[2.1rem]">
              {representative.name}
              <span className="ml-3 align-middle text-[0.78rem] font-medium tracking-[0.1em] text-stone">
                {representative.nameKana}
              </span>
            </p>
          </div>
        </Reveal>
      </section>

      {/* 本編（写真はページ冒頭の1点のみ。読みやすさを優先して1カラムにする） */}
      <section className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <div>
          <div>
            {STORY.map((s, i) => (
              <Reveal key={s.id} delay={Math.min(i, 3) * 0.05}>
                <section className={i === 0 ? "" : "mt-14"}>
                  <h2 className="text-balance font-maru text-[1.3rem] font-bold leading-[1.6] sm:text-[1.5rem]">
                    <span aria-hidden className="mr-3 inline-block h-[2px] w-6 align-middle bg-leaf" />
                    {s.heading}
                  </h2>
                  <div className="mt-5 space-y-5 text-[0.97rem] leading-[2.15] text-ink-soft sm:text-base">
                    {s.paragraphs.map((p) => (
                      <p key={p.slice(0, 12)}>{p}</p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}

            {/* 対応エリア（4市のイラスト） */}
            <AreaIllustrations
              className="mt-16 border-t hairline pt-14"
              title="うかがうのは、この4つのまち"
              lead="熊谷市を中心に、深谷市・行田市・東松山市。住み慣れたまちで暮らし続けるお手伝いを、この地域で続けていきます。"
            />

            {/* 締めの挨拶 */}
            <Reveal>
              <div className="mt-16 border-l-[3px] border-leaf bg-mint py-7 pl-6 pr-5 sm:py-8 sm:pl-8">
                {CLOSING.map((p) => (
                  <p key={p.slice(0, 12)} className="text-[0.97rem] leading-[2.15] text-ink first:mb-4 sm:text-base">
                    {p}
                  </p>
                ))}
                <p className="mt-6 text-right font-maru text-[1.05rem] font-bold tracking-[0.08em]">
                  <span className="mr-3 text-[12px] font-medium tracking-[0.14em] text-moss">
                    {representative.title}
                  </span>
                  {representative.name}
                </p>
              </div>
            </Reveal>

            {/* サービス範囲の明示（誤解を防ぐ） */}
            <Reveal>
              <p className="mt-8 text-[0.88rem] leading-[2] text-stone">
                ※ 代表個人の職歴として福祉・介護の現場勤務を記載していますが、
                {site.name}が事業として提供しているのは買い物代行のみです。
                身体介護・掃除・調理・通院の付き添い・送迎などは行っていません。
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* プロフィール */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <Reveal>
              <SectionHeading en="Profile" title="代表プロフィール" />
            </Reveal>
            <Reveal delay={0.08}>
              <dl className="border-t hairline">
                {[
                  ["氏名", `${representative.name}（${representative.nameKana}）`],
                  ["生年月日", representative.birthDateLabel],
                  ["出身", representative.birthPlace],
                  ["現在", representative.residence],
                ].map(([k, v]) => (
                  <div key={k} className="grid gap-1 border-b hairline py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
                    <dt className="text-[0.88rem] tracking-wider text-stone">{k}</dt>
                    <dd className="text-[0.95rem]">{v}</dd>
                  </div>
                ))}
                {CAREER.map((c) => (
                  <div key={c.label} className="grid gap-1 border-b hairline py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
                    <dt className="text-[0.88rem] tracking-wider text-stone">{c.label}</dt>
                    <dd>
                      <ul className="space-y-1.5 text-[0.95rem] leading-[1.9]">
                        {c.items.map((item) => (
                          <li key={item} className="flex gap-2.5">
                            <span aria-hidden className="mt-[0.95em] h-px w-2.5 shrink-0 bg-sprout" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[0.95rem]">
                <Link href="/about" className="link-line">
                  私たちについて <ArrowRightIcon className="h-4 w-4" />
                </Link>
                <Link href="/shopping-support" className="link-line">
                  買い物代行サービスの詳細 <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ContactCta
        title="買い物のこと、どうぞお気軽に。"
        lead="「これって頼める？」という段階のご相談で構いません。ご本人からでも、離れて暮らすご家族からでも。代表の齋藤がお話をうかがいます。"
      />
    </>
  );
}
