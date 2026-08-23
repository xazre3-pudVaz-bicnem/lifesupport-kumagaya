import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { photos } from "@/data/photos";
import PhotoFrame from "@/components/ui/Photo";
import AnswerBox from "@/components/ui/AnswerBox";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Faq from "@/components/ui/Faq";
import ContactCta from "@/components/ui/ContactCta";
import JsonLd from "@/components/ui/JsonLd";
import Flow from "@/components/sections/home/Flow";
import RelatedPosts from "@/components/blog/RelatedPosts";
import { ITEMS, PROMISES, SCENES } from "@/data/content";
import { FAQ_GENERAL } from "@/data/faq";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/jsonld";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";

const TITLE = "熊谷市の買い物代行サービス｜食料品・日用品・重い物をご自宅へ";
const DESCRIPTION =
  "熊谷市の買い物代行ならライフサポート熊谷。食料品・日用品・ドラッグストアの商品・重い物のお買い物を代わりに行い、ご自宅へお届けします。介護保険外のため介護認定は不要。ご家族からのご依頼も可能。深谷市・行田市・東松山市にも対応。";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/shopping-support",
  keywords: ["熊谷 買い物代行", "熊谷市 買い物代行", "買い物代行 熊谷", "熊谷 高齢者 買い物代行"],
});

const FAQ_ITEMS = [FAQ_GENERAL[0], FAQ_GENERAL[6], FAQ_GENERAL[7], FAQ_GENERAL[8], FAQ_GENERAL[9], FAQ_GENERAL[10], FAQ_GENERAL[12]];

const NOT_PROVIDED = ["掃除・洗濯・調理", "通院の付き添い・送迎", "身体介護（入浴・排泄・移乗など）", "服薬の介助・医療行為"];

export default function ShoppingSupportPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ path: "/shopping-support", name: TITLE, description: DESCRIPTION })} />
      <PageHeader
        en="Shopping support"
        title={
          <>
            熊谷市の買い物代行
            <span className="mt-3 block text-[1rem] font-medium tracking-[0.06em] text-moss sm:text-[1.1rem]">
              食料品・日用品・重い物を、ご自宅へ。
            </span>
          </>
        }
        lead="いつものスーパーやドラッグストアでのお買い物を、ご依頼内容にそって代わりに行い、ご自宅までお届けします。介護保険外のサービスなので、介護認定や手続きは不要。ご本人からも、ご家族からもご依頼いただけます。"
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "買い物代行について", path: "/shopping-support" },
        ]}
        photo={photos.selectingVegetables}
        photoPosition="55% 45%"
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <AnswerBox
            question="熊谷市で買い物代行を頼むには、どうすればいいですか？"
            answer={
              <>
                お電話（{site.tel}）またはInstagram（{site.instagramId}）のDMで、買いたい物とお届け先の地域をお知らせください。内容を確認のうえ、対応できる形をご案内します。対象は熊谷市・深谷市・行田市・東松山市。介護認定の有無や年齢は問いません（{site.launch.label}）。
              </>
            }
          />
        </Reveal>
      </section>

      {/* サービスの範囲 */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                en="What we do"
                title="買い物代行で、できること"
                lead="「買い物に行く」「持ち帰る」という部分を、そっくりお引き受けします。何を買うかを決めるのは、いつも通りご本人です。"
              />
            </Reveal>
            <div>
              <Reveal>
                <h3 className="font-maru text-[1.1rem] font-bold tracking-[0.04em]">買えるもの</h3>
              </Reveal>
              <dl className="mt-4 border-t hairline">
                {ITEMS.map((item, i) => (
                  <Reveal key={item.label} delay={i * 0.05}>
                    <div className="grid gap-1 border-b hairline py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                      <dt className="font-maru text-[1rem] font-bold">{item.label}</dt>
                      <dd>
                        <p className="text-[0.95rem]">{item.examples}</p>
                        <p className="mt-1 text-[0.9rem] leading-[1.9] text-ink-soft">{item.detail}</p>
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
              <Reveal delay={0.06}>
                <PhotoFrame
                  photo={photos.groceriesAndGoods}
                  className="mt-8 aspect-[16/10]"
                  position="50% 50%"
                  sizes="(min-width: 1024px) 40rem, 100vw"
                  decorative
                />
              </Reveal>
              <Reveal>
                <h3 className="mt-12 font-maru text-[1.1rem] font-bold tracking-[0.04em]">こんなときに</h3>
              </Reveal>
              <ul className="mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {SCENES.map((s, i) => (
                  <Reveal key={s.title} as="li" delay={i * 0.04} className="flex gap-3">
                    <CheckIcon className="mt-1.5 h-4 w-4 shrink-0 text-moss" />
                    <div>
                      <p className="text-[0.95rem] font-medium">{s.title}</p>
                      <p className="mt-0.5 text-[0.88rem] leading-[1.9] text-ink-soft">{s.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>

          <Reveal>
            <div className="mt-16 grid gap-6 border-t hairline pt-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
              <h3 className="font-maru text-[1.1rem] font-bold tracking-[0.04em]">現在は行っていないこと</h3>
              <div>
                <ul className="grid gap-x-10 gap-y-2 sm:grid-cols-2">
                  {NOT_PROVIDED.map((n) => (
                    <li key={n} className="flex gap-3 text-[0.93rem] text-ink-soft">
                      <span aria-hidden className="mt-[0.85em] h-px w-3 shrink-0 bg-stone" />
                      {n}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[0.9rem] leading-[2] text-ink-soft">
                  ライフサポート熊谷が現在ご提供しているのは買い物代行のみです。介護保険のサービスや訪問介護ではありません。
                  介護保険のサービスが必要な場合は、お住まいの地域の地域包括支援センターやケアマネジャーにご相談ください。
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3つのお約束 */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              en="Promise"
              title="安心してご利用いただくための3つのお約束"
              lead="お預かりするのは、商品だけでなく信頼です。はじめての方にも安心していただけるよう、3つのことをお約束します。"
            />
          </Reveal>
          <ol className="border-t hairline">
            {PROMISES.map((p, i) => (
              <Reveal key={p.title} as="li" delay={i * 0.06} className="flex gap-6 border-b hairline py-7">
                <span className="big-num text-[2rem]" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-maru text-[1.08rem] font-bold leading-[1.7]">{p.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-[2] text-ink-soft">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* だれが依頼できる */}
      <section className="bg-mint">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <SectionHeading en="Who can ask" title="ご本人からも、ご家族からも。" />
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {[
              {
                t: "ご本人",
                b: "買い物に行くのが少し大変になってきた方。重い物だけ、暑い時期だけ、といった部分的なご利用もできます。",
                href: "/for-seniors",
                l: "高齢者の買い物支援",
              },
              {
                t: "ご家族",
                b: "熊谷市で暮らす親御さんを心配しているご家族。東京や県外からでも、DMでご依頼・やりとりができます。",
                href: "/for-family",
                l: "離れて暮らすご家族へ",
              },
              {
                t: "介護・福祉に関わる方",
                b: "「買い物だけ困っている」方に、介護保険外の地域の選択肢としてご紹介いただけます。サービス内容のご質問も歓迎です。",
                href: "/insurance-outside",
                l: "介護保険外の買い物支援",
              },
            ].map((w, i) => (
              <Reveal key={w.t} delay={i * 0.06} className="border-t-2 border-leaf pt-6">
                <h3 className="font-maru text-[1.2rem] font-bold tracking-[0.04em]">{w.t}</h3>
                <p className="mt-3 text-[0.92rem] leading-[2] text-ink-soft">{w.b}</p>
                <Link href={w.href} className="link-line mt-4 text-[0.9rem]">
                  {w.l} <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Flow />

      {/* 料金（未確認のため案内のみ） */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal>
            <SectionHeading en="Price" title="料金・お支払いについて" />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[0.97rem] leading-[2.1] text-ink-soft">
              料金とお支払い方法は、ご相談時にご案内しています。商品の購入代金（実費）と利用料金の区分を含め、ご依頼前に分かりやすくご説明しますので、ご不明点はお気軽にお尋ねください。
            </p>
            <p className="mt-4 text-[0.9rem] leading-[2] text-ink-soft">
              ライフサポート熊谷は介護保険外のサービスのため、料金は全額自己負担となります。そのぶん、介護認定やケアプランは不要で、必要なときに必要なぶんだけご利用いただけます。
            </p>
          </Reveal>
        </div>
      </section>

      <Faq items={FAQ_ITEMS} lead="買い物代行についてよくいただく質問です。" tone="cream" />
      <div className="pt-20 sm:pt-28">
        <RelatedPosts categories={["熊谷の買い物代行"]} />
      </div>
      <ContactCta primaryLabel="買い物について相談する" />
    </>
  );
}
