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
import { FLOW } from "@/data/content";
import { FAQ_GENERAL } from "@/data/faq";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/jsonld";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";

const TITLE = "ご利用の流れ｜ご相談から商品のお受け取りまで";
const DESCRIPTION =
  "ライフサポート熊谷の買い物代行は、InstagramのDMでのご相談から、ご依頼内容の確認、お買い物、ご自宅へのお届けまで4ステップ。ご依頼時にお伝えいただきたいことや、売り切れのときの対応もご案内します。熊谷市・深谷市・行田市・東松山市対応。";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/flow",
  keywords: ["買い物代行 流れ", "熊谷 買い物代行 依頼方法", "買い物代行 頼み方"],
});

const TELL_US = [
  "お届け先の地域（熊谷市・深谷市・行田市・東松山市のどちらか）",
  "買いたい物（分かる範囲で、銘柄・サイズ・数量）",
  "いつものお店や、ご希望のお店があれば",
  "ご希望の日時、お届けの方法（在宅・置き場所など）",
  "ご本人からのご依頼か、ご家族からのご依頼か",
];

const FAQ_ITEMS = [FAQ_GENERAL[8], FAQ_GENERAL[9], FAQ_GENERAL[10], FAQ_GENERAL[12], FAQ_GENERAL[4]];

export default function FlowPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ path: "/flow", name: TITLE, description: DESCRIPTION })} />
      <PageHeader
        en="Flow"
        title="ご利用の流れ"
        lead="ご相談から商品のお受け取りまで。はじめての方でも迷わないよう、ひとつひとつ確認しながら進めます。"
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "ご利用の流れ", path: "/flow" },
        ]}
        photo={photos.listAndTote}
        photoPosition="50% 50%"
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <AnswerBox
            question="買い物代行は、どうやって頼めばいいですか？"
            answer={
              <>
                お電話（{site.tel}）またはInstagram（{site.instagramId}）のDMで、お届け先の地域と買いたい物をお知らせください。内容を確認し、ご希望の日時に合わせてお買い物・お届けをします。料金とお支払い方法はご相談時にご案内します。
              </>
            }
          />
        </Reveal>
      </section>

      {/* ステップ詳細 */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <SectionHeading en="4 steps" title="4つのステップ" />
          </Reveal>
          <ol className="mt-12 border-t hairline">
            {FLOW.map((f, i) => (
              <Reveal key={f.step} as="li" delay={i * 0.05}>
                <div className="grid gap-4 border-b hairline py-9 md:grid-cols-[6rem_1fr] md:gap-10">
                  <span className="big-num text-[2.8rem] sm:text-[3.2rem]" aria-hidden>
                    {f.step}
                  </span>
                  <div>
                    <h3 className="font-maru text-[1.25rem] font-bold tracking-[0.04em]">{f.title}</h3>
                    <p className="mt-3 max-w-2xl text-[0.95rem] leading-[2.05] text-ink-soft">{f.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 伝えていただきたいこと */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              en="Before you ask"
              title="ご相談のときに、お伝えいただけると助かること"
              lead="分からないところは空欄で構いません。やりとりの中で確認していきます。"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="space-y-3">
              {TELL_US.map((t) => (
                <li key={t} className="flex gap-3 text-[0.95rem] leading-[1.95]">
                  <CheckIcon className="mt-1.5 h-4 w-4 shrink-0 text-moss" />
                  {t}
                </li>
              ))}
            </ul>
            <PhotoFrame
              photo={photos.memoVegetables}
              className="mt-8 aspect-[16/10]"
              position="50% 50%"
              sizes="(min-width: 1024px) 40rem, 100vw"
              decorative
            />
            <div className="mt-8 border-l-[3px] border-sprout pl-5">
              <p className="font-maru text-[1rem] font-bold">売り切れ・見当たらないときは</p>
              <p className="mt-2 text-[0.92rem] leading-[2] text-ink-soft">
                勝手に判断せず、できる限りお客様に確認してから対応します。「似たものでよい」「なければ不要」など、あらかじめご希望をいただいていれば、その通りに動きます。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 料金 */}
      <section className="bg-mint">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <Reveal>
              <SectionHeading en="Price" title="料金・お支払い" />
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-[0.95rem] leading-[2.1] text-ink-soft">
                料金とお支払い方法は、ご相談時にご案内しています。商品の購入代金（実費）と利用料金の区分を含め、ご依頼前に分かりやすくご説明します。ライフサポート熊谷は介護保険外のサービスのため、料金は全額自己負担です。
              </p>
              <Link href="/shopping-support" className="link-line mt-6 text-[0.95rem]">
                買い物代行サービスの詳細 <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <Faq items={FAQ_ITEMS} lead="ご依頼の方法について、よくいただく質問です。" />
      <ContactCta primaryLabel="DMで相談してみる" />
    </>
  );
}
