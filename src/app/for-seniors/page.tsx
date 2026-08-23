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
import { PROMISES } from "@/data/content";
import { FAQ_GENERAL } from "@/data/faq";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/jsonld";
import { ArrowRightIcon } from "@/components/ui/icons";

const TITLE = "熊谷市の高齢者向け買い物支援｜買い物代行で「いつもの暮らし」を続ける";
const DESCRIPTION =
  "熊谷市で高齢者の買い物支援をお探しなら、ライフサポート熊谷の買い物代行。足腰の負担、夏の暑さ、重い荷物、運転をやめた後の買い物をサポート。介護認定は不要、重い物だけ・暑い時期だけの部分利用も。ご本人・ご家族どちらからでも。";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/for-seniors",
  keywords: ["熊谷 高齢者 買い物代行", "熊谷市 高齢者 買い物支援", "高齢者 買い物 困難", "高齢者 買い物支援"],
});

const REASONS = [
  {
    title: "荷物の重さ",
    body: "お米・飲料・洗剤・トイレットペーパー。必要なものほど重くてかさばります。持ち帰れる量に合わせて買うと、買い物の回数が増え、外出の負担が積み重なります。",
  },
  {
    title: "熊谷の夏、そして冬",
    body: "熊谷市は2018年7月に国内観測史上最高の41.1℃を記録した、日本でも有数の暑さの街です。真夏の日中の外出は、年齢にかかわらず体にこたえます。冬の冷え込みも同様です。",
  },
  {
    title: "移動手段の変化",
    body: "車の運転をやめると、郊外の大型スーパーやドラッグストアが急に遠くなります。バスの本数、停留所までの距離、帰りの荷物。行けないわけではないが、行くたびに疲れる。",
  },
  {
    title: "体調の波",
    body: "けがや風邪、持病の調子が悪い日。数日間だけ外に出たくないときに、冷蔵庫の中身が心細くなる。そんな一時的な困りごとも、買い物に関しては起こりがちです。",
  },
];

const FAQ_ITEMS = [FAQ_GENERAL[0], FAQ_GENERAL[2], FAQ_GENERAL[3], FAQ_GENERAL[7], FAQ_GENERAL[9], FAQ_GENERAL[12]];

export default function ForSeniorsPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ path: "/for-seniors", name: TITLE, description: DESCRIPTION })} />
      <PageHeader
        en="For seniors"
        title={
          <>
            高齢者の買い物支援
            <span className="mt-3 block text-[1rem] font-medium tracking-[0.06em] text-moss sm:text-[1.1rem]">
              買い物に行くのが、少し大変になってきた方へ。
            </span>
          </>
        }
        lead="いつもの暮らしを続けるために、「買い物」という一部分だけをサポートします。できることはこれまで通りご自身で。負担の大きいところだけを、ライフサポート熊谷がお手伝いします。"
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "高齢者の買い物支援", path: "/for-seniors" },
        ]}
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <AnswerBox
            question="熊谷市で、高齢者向けの買い物代行は利用できますか？"
            answer="はい。ライフサポート熊谷は、熊谷市を中心に深谷市・行田市・東松山市で買い物代行を行っています。介護保険外のサービスなので、要介護・要支援の認定は不要です。食料品・日用品・重い物などをご依頼にそって購入し、ご自宅へお届けします。ご本人からも、ご家族からもご依頼いただけます。"
          />
        </Reveal>
      </section>

      {/* 大変になる理由 */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <SectionHeading
              en="Why"
              title="年齢を重ねると、買い物はなぜ大変になるのか"
              lead="「行けない」のではなく、「行くたびに疲れる」。買い物の負担は、少しずつ、いくつもの理由が重なって大きくなります。"
            />
          </Reveal>
          <div className="mt-12 grid gap-x-14 gap-y-10 md:grid-cols-2">
            {REASONS.map((r, i) => (
              <Reveal key={r.title} delay={(i % 2) * 0.06} className="border-t-2 border-sprout pt-6">
                <h3 className="font-maru text-[1.15rem] font-bold tracking-[0.04em]">{r.title}</h3>
                <p className="mt-3 text-[0.93rem] leading-[2.05] text-ink-soft">{r.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 尊厳ある支援の考え方 */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              en="Our stance"
              title={
                <>
                  「まだ大丈夫」は、
                  <br />
                  そのままで。
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-5 text-[0.97rem] leading-[2.15] text-ink-soft">
              <p>
                買い物に行くことは、外に出るきっかけであり、季節を感じる時間でもあります。ライフサポート熊谷は、その全部を代わろうとは考えていません。
              </p>
              <p>
                重い物だけ頼む。暑い時期だけ頼む。体調がすぐれない週だけ頼む。
                「自分でできること」を残したまま、負担の大きい部分だけを手放す。そんな使い方をおすすめしています。
              </p>
              <p>
                何を買うかを決めるのは、いつも通りご本人です。銘柄や数量、売り切れのときにどうするか。分からないことは勝手に判断せず、確認してから動きます。
              </p>
            </div>
            <Link href="/shopping-support" className="link-line mt-8 text-[0.95rem]">
              買い物代行サービスの詳細 <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 3つのお約束（簡易） */}
      <section className="bg-mint">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <SectionHeading en="Promise" title="はじめての方に、3つのお約束" />
          </Reveal>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {PROMISES.map((p, i) => (
              <Reveal key={p.title} as="li" delay={i * 0.06} className="border-t-2 border-leaf pt-5">
                <span className="big-num text-[2rem]" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-maru text-[1.05rem] font-bold leading-[1.7]">{p.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-[1.95] text-ink-soft">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 介護保険との関係・家族への導線 */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="eyebrow">Insurance</p>
            <h2 className="mt-4 font-maru text-[1.35rem] font-bold leading-[1.6]">介護認定がなくても、介護保険を使っていても。</h2>
            <p className="mt-4 text-[0.93rem] leading-[2.05] text-ink-soft">
              ライフサポート熊谷は介護保険外のサービスです。認定を受けていない方はもちろん、介護保険のサービスをご利用中の方が、保険の範囲に入りにくい買い物だけを頼むこともできます。
            </p>
            <Link href="/insurance-outside" className="link-line mt-5 text-[0.92rem]">
              介護保険外の買い物支援について <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow">Family</p>
            <h2 className="mt-4 font-maru text-[1.35rem] font-bold leading-[1.6]">ご家族が、代わりに相談することもできます。</h2>
            <p className="mt-4 text-[0.93rem] leading-[2.05] text-ink-soft">
              「親に勧めたいが、本人はまだ乗り気でない」。そんなときは、まずご家族からご相談ください。部分的な利用の始め方を一緒に考えます。
            </p>
            <Link href="/for-family" className="link-line mt-5 text-[0.92rem]">
              離れて暮らすご家族へ <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Faq items={FAQ_ITEMS} lead="ご本人からよくいただく質問です。" tone="cream" />
      <div className="pt-20 sm:pt-28">
        <RelatedPosts categories={["高齢者の生活支援"]} />
      </div>
      <ContactCta primaryLabel="買い物について相談する" />
    </>
  );
}
