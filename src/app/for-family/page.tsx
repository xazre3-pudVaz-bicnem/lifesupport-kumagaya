import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import AnswerBox from "@/components/ui/AnswerBox";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Faq from "@/components/ui/Faq";
import ContactCta from "@/components/ui/ContactCta";
import JsonLd from "@/components/ui/JsonLd";
import RelatedPosts from "@/components/blog/RelatedPosts";
import { FamilyIllustration } from "@/components/ui/Illustrations";
import { FAQ_FAMILY } from "@/data/faq";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/jsonld";
import { ArrowRightIcon } from "@/components/ui/icons";

const TITLE = "離れて暮らすご家族へ｜熊谷の親の買い物を、代わりにサポート";
const DESCRIPTION =
  "熊谷市で一人暮らしの親の買い物が心配なご家族へ。ライフサポート熊谷の買い物代行なら、東京・県外からInstagramのDMでご依頼でき、食料品・日用品・重い物を親御さんのご自宅へお届けします。介護認定は不要。「重い物だけ」の部分利用も。";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/for-family",
  keywords: ["熊谷 親 買い物代行", "離れて暮らす親 買い物", "熊谷 高齢の親 買い物", "一人暮らし 高齢者 買い物"],
});

const SITUATIONS = [
  {
    title: "電話では「大丈夫」と言う",
    body: "帰省するたびに、冷蔵庫の中身が少なくなっている。重い物を買うのを避けているのが分かる。でも本人は「まだ大丈夫」と言う。",
  },
  {
    title: "毎週は、通えない",
    body: "月に一度は顔を出せても、毎週の買い物までは代われない。仕事と育児のあいだで、気にはなっているのに手が届かない。",
  },
  {
    title: "介護サービスは、まだ早い気がする",
    body: "介護認定を受けるほどではない。ケアマネジャーに相談するのも、本人が嫌がりそう。でも買い物だけは、誰かに頼めたら。",
  },
  {
    title: "ネットスーパーを、親は使いこなせない",
    body: "スマホで注文するのは本人には難しい。自分が遠隔で注文しても、受け取りや細かな希望のすり合わせがうまくいかない。",
  },
];

const STEPS = [
  {
    t: "ご家族からDMでご相談",
    b: "親御さんのお住まいの地域（熊谷市・深谷市・行田市・東松山市）と、困っている状況をお知らせください。ご本人がまだ乗り気でない段階でも構いません。",
  },
  {
    t: "始め方を一緒に考える",
    b: "「重い物だけ」「暑い時期だけ」など、ご本人が受け入れやすい形からご提案します。ご本人とのやりとりの方法も、このときにご相談ください。",
  },
  {
    t: "ご依頼・お買い物・お届け",
    b: "買いたい物・数量・お届けのご希望をうかがい、購入してご自宅へお届けします。売り切れなど迷う場面では、勝手に判断せず確認してから対応します。",
  },
  {
    t: "続けるかどうかは、その都度",
    b: "一度きりでも、定期的でも。ご本人の状況に合わせて、頼む範囲を増やしたり減らしたりできます。料金・お支払いはご相談時にご案内します。",
  },
];

export default function ForFamilyPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ path: "/for-family", name: TITLE, description: DESCRIPTION })} />
      <PageHeader
        en="For family"
        title={
          <>
            離れて暮らす
            <br className="sm:hidden" />
            ご家族へ
            <span className="mt-3 block text-[1rem] font-medium tracking-[0.06em] text-moss sm:text-[1.1rem]">
              熊谷の親の買い物を、代わりにサポートします。
            </span>
          </>
        }
        lead="東京や県外で暮らしながら、熊谷市の親御さんのことが気になっている方へ。毎週の買い物を代わりに行くことはできなくても、頼める先をひとつ持っておくことはできます。"
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "離れて暮らすご家族へ", path: "/for-family" },
        ]}
        aside={<FamilyIllustration className="h-auto w-[26rem]" />}
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <AnswerBox
            question="離れて暮らす親のために、買い物代行を依頼できますか？"
            answer={
              <>
                はい。ライフサポート熊谷は、ご本人に代わってご家族からご依頼いただけます。ご相談・ご依頼はInstagram（{site.instagramId}）のDMで行えるため、遠方にお住まいでもやりとりが可能です。対象は熊谷市・深谷市・行田市・東松山市にお住まいの方。介護認定は不要です。
              </>
            }
          />
        </Reveal>
        <div className="mt-10 lg:hidden">
          <FamilyIllustration className="mx-auto h-auto w-full max-w-md" />
        </div>
      </section>

      {/* 状況 */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <SectionHeading
              en="Situation"
              title="「気にはなっている」と「毎週は行けない」のあいだで。"
              lead="離れて暮らすご家族から、よくうかがう状況です。"
            />
          </Reveal>
          <div className="mt-12 grid gap-x-14 gap-y-10 md:grid-cols-2">
            {SITUATIONS.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 0.06} className="border-t-2 border-sprout pt-6">
                <h3 className="font-maru text-[1.12rem] font-bold leading-[1.65]">{s.title}</h3>
                <p className="mt-3 text-[0.93rem] leading-[2.05] text-ink-soft">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 家族からの流れ */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <SectionHeading
            en="How it works"
            title="ご家族からのご依頼は、こう進みます"
            lead="ご本人がまだ乗り気でない段階からご相談いただけます。部分的な利用から、無理なく始める方法を一緒に考えます。"
          />
        </Reveal>
        <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} as="li" delay={i * 0.07}>
              <span className="big-num text-[2.8rem]" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-maru text-[1.08rem] font-bold leading-[1.7]">{s.t}</h3>
              <p className="mt-3 text-[0.9rem] leading-[2] text-ink-soft">{s.b}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* 親への切り出し方 */}
      <section className="bg-mint">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                en="A gentle start"
                title={
                  <>
                    親が「まだ大丈夫」と
                    <br />
                    言うときは。
                  </>
                }
              />
            </Reveal>
            <Reveal delay={0.08}>
              <div className="space-y-5 text-[0.97rem] leading-[2.15] text-ink-soft">
                <p>
                  「介護」という言葉が出た途端に、話が止まってしまうことがあります。ライフサポート熊谷は介護サービスではなく、買い物代行です。「重い物だけ、届けてもらえるサービスがあるみたい」という切り出し方で、受け入れやすくなることがあります。
                </p>
                <p>
                  最初は、お米や飲料など重い物だけ。夏の暑い時期だけ。体調を崩したときだけ。ご本人の「自分でできる」を奪わない範囲から始めて、必要に応じて広げていく形をおすすめしています。
                </p>
                <p>
                  帰省のタイミングで、ご本人と一緒にご相談いただくのもひとつの方法です。どんな人が、どんなふうに届けてくれるのか。顔が見えると、安心につながります。
                </p>
              </div>
              <Link href="/for-seniors" className="link-line mt-8 text-[0.95rem]">
                ご本人向けのページを見る <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <Faq items={FAQ_FAMILY} lead="ご家族からよくいただく質問です。" />
      <RelatedPosts categories={["ご家族向け"]} />
      <ContactCta
        title="親御さんの買い物のこと、まずはご相談ください。"
        lead="遠方からでも、InstagramのDMでやりとりできます。ご本人がまだ乗り気でない段階のご相談も歓迎です。"
        primaryLabel="家族として相談する"
      />
    </>
  );
}
