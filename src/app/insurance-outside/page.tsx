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
import { FAQ_INSURANCE } from "@/data/faq";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/jsonld";
import { ArrowRightIcon, CheckIcon, ExternalIcon } from "@/components/ui/icons";

const TITLE = "熊谷市で介護保険外の買い物に困ったときは？｜自費の買い物代行という選択肢";
const DESCRIPTION =
  "介護保険で頼める買い物・頼みにくい買い物を、厚生労働省の通知など一次情報をもとに整理。熊谷市で介護認定がない方、同居家族がいる方、嗜好品や家族分の買い物に困ったときの選択肢として、介護保険外（自費）の買い物代行「ライフサポート熊谷」をご案内します。";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/insurance-outside",
  keywords: ["熊谷 介護保険外サービス", "熊谷 自費介護", "介護保険 買い物代行", "介護保険でできないこと 買い物", "熊谷市 介護保険外サービス"],
});

/**
 * 一次情報（制度説明の根拠）。本文の記述はこの範囲に留める。
 * 制度は改正されるため、閲覧時点の最新情報は各機関で確認するよう案内する。
 */
const SOURCES = [
  {
    name: "厚生労働省「訪問介護におけるサービス行為ごとの区分等について」（老計第10号）",
    url: "https://www.mhlw.go.jp/file/06-Seisakujouhou-12300000-Roukenkyoku/0000201799.pdf",
  },
  {
    name: "厚生労働省「同居家族等がいる場合における訪問介護サービス等の生活援助の取扱いについて」",
    url: "https://www.mhlw.go.jp/stf/houdou/2r98520000003fwn-img/2r98520000003fy5.pdf",
  },
  {
    name: "熊谷市「介護保険制度」",
    url: "https://www.city.kumagaya.lg.jp/kenkouhukushi/kaigohoken/kaigohokenn.html",
  },
  {
    name: "大里広域市町村圏組合「地域包括支援センター」",
    url: "https://www.osato-k.jp/kaigohoken/supportcenter/",
  },
  {
    name: "熊谷市「軽度生活援助」",
    url: "https://www.city.kumagaya.lg.jp/kenkouhukushi/koureisya/shien/keidoseikatuennjo.html",
  },
];

const COVERED = [
  "要介護認定（または要支援認定）を受けている",
  "ケアマネジャー等が作成するケアプランに、訪問介護（生活援助）として位置づけられている",
  "単身、または同居のご家族が障害・疾病などで家事を行うことが難しい状況にある",
  "内容が、日常生活に必要な品物の買い物である（通知の例示では「日常品等の買物」）",
];

const NOT_COVERED = [
  {
    t: "介護認定を受けていない",
    b: "「最近、買い物がつらい」という段階では、介護保険の訪問介護は利用できません。認定の申請から利用開始までは、一定の期間がかかります。",
  },
  {
    t: "同居のご家族がいる",
    b: "同居家族がいる場合、生活援助は原則として算定できないとされています。家族が障害・疾病などで家事ができないなど、やむを得ない事情がある場合は例外的に利用できることがあります（個別の判断はケアマネジャー等が行います）。",
  },
  {
    t: "ご本人以外のための買い物",
    b: "国の通知では、ご家族など利用者以外の方のための買い物は、生活援助に含まれない行為として例示されています。",
  },
  {
    t: "日常生活の範囲を超える買い物",
    b: "嗜好品、贈り物、季節の特別な買い物などは、「日常生活の援助」に当たらないと判断されることがあります。",
  },
  {
    t: "ケアプランの時間や回数に収まらない",
    b: "ケアプランで決まった時間・回数の範囲を超える買い物や、急な買い足しには対応しにくいことがあります。",
  },
];

export default function InsuranceOutsidePage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ path: "/insurance-outside", name: TITLE, description: DESCRIPTION })} />
      <PageHeader
        en="Outside insurance"
        title={
          <>
            熊谷市で介護保険外の
            <br className="sm:hidden" />
            買い物に困ったときは？
          </>
        }
        lead="介護保険で頼める買い物と、頼みにくい買い物。その違いを一次情報をもとに整理したうえで、「自費サービス」という選択肢と、ライフサポート熊谷が対応していることをご案内します。"
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "介護保険外の買い物支援", path: "/insurance-outside" },
        ]}
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <AnswerBox
            question="介護保険で、買い物を頼むことはできますか？"
            answer="条件を満たせばできます。一般に、要介護・要支援の認定を受け、ケアプランに訪問介護（生活援助）として位置づけられた場合に、日常生活に必要な品物の買い物を頼むことができます。一方で、認定がない方、同居のご家族がいる方、ご家族の分や嗜好品の買い物などは対象になりにくく、そうした場面では介護保険外（自費）のサービスが選択肢になります。"
          />
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-6 text-[0.88rem] leading-[1.95] text-ink-soft">
            ※このページは制度の概要を一次情報にもとづいて整理した情報提供ページです。個別のケースで利用できるかどうかは、お住まいの地域の地域包括支援センター・ケアマネジャー・保険者（熊谷市の場合は大里広域市町村圏組合）にご確認ください。ライフサポート熊谷は介護保険の事業者ではありません。
          </p>
        </Reveal>
      </section>

      {/* できる・できない */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <SectionHeading
              en="Covered or not"
              title="介護保険で対応できる買い物・できない買い物"
              lead="訪問介護の「生活援助」には買い物が含まれますが、誰でも・何でも頼めるわけではありません。"
            />
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <Reveal>
              <h3 className="font-maru text-[1.15rem] font-bold tracking-[0.04em]">対応できる場合の、おもな条件</h3>
              <ul className="mt-5 space-y-3">
                {COVERED.map((c) => (
                  <li key={c} className="flex gap-3 text-[0.93rem] leading-[1.95] text-ink-soft">
                    <CheckIcon className="mt-1.5 h-4 w-4 shrink-0 text-moss" />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.85rem] leading-[1.9] text-stone">
                厚生労働省の通知（老計第10号）では、生活援助の内容として「買い物・薬の受け取り」が挙げられ、「日常品等の買物」が例示されています。
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="font-maru text-[1.15rem] font-bold tracking-[0.04em]">対象になりにくい、おもなケース</h3>
              <dl className="mt-5 border-t hairline">
                {NOT_COVERED.map((n) => (
                  <div key={n.t} className="border-b hairline py-5">
                    <dt className="font-maru text-[1rem] font-bold">{n.t}</dt>
                    <dd className="mt-1.5 text-[0.9rem] leading-[1.95] text-ink-soft">{n.b}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 家族だけで支えるのが難しくなるケース */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              en="Family limits"
              title="家族だけで買い物を支えるのが難しくなるケース"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-5 text-[0.97rem] leading-[2.15] text-ink-soft">
              <p>
                介護保険の対象にならない買い物は、多くの場合、ご家族が担っています。同居していれば日々の買い物を、離れていれば帰省のたびのまとめ買いを。
              </p>
              <p>
                けれど、同居のご家族にも仕事や育児があり、体調を崩す日もあります。離れて暮らすご家族は、月に一度は来られても、毎週の買い物までは代われません。「家族がいるから大丈夫」という前提が、少しずつ重荷になっていくことがあります。
              </p>
              <p>
                介護保険は使えない、家族だけでは続かない。そのあいだを埋めるのが、介護保険外のサービスです。
              </p>
            </div>
            <Link href="/for-family" className="link-line mt-8 text-[0.95rem]">
              離れて暮らすご家族へ <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 自費サービスという選択肢 */}
      <section className="bg-mint">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <SectionHeading
              en="Options"
              title="自費サービスという選択肢"
              lead="介護保険外のサービスは、全額自己負担である代わりに、認定やケアプランを必要とせず、内容や頻度を自由に決められます。"
            />
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-14">
            <Reveal>
              <h3 className="font-maru text-[1.12rem] font-bold tracking-[0.04em]">介護保険外（自費）のサービスの特徴</h3>
              <ul className="mt-4 space-y-2.5 text-[0.93rem] leading-[1.95] text-ink-soft">
                {[
                  "介護認定・ケアプランが不要で、思い立ったときに使える",
                  "同居家族の有無や、買い物の内容（嗜好品・家族分）に制限がない",
                  "回数・頻度を自分で決められる（一度きりでも、定期的でも）",
                  "料金は全額自己負担。事前に料金体系を確認して選ぶ",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <CheckIcon className="mt-1.5 h-4 w-4 shrink-0 text-moss" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="font-maru text-[1.12rem] font-bold tracking-[0.04em]">熊谷市の公的な支援も確認を</h3>
              <p className="mt-4 text-[0.93rem] leading-[1.95] text-ink-soft">
                熊谷市には、おおむね65歳以上の一人暮らしの高齢者などを対象に、買い物支援を含む「軽度生活援助」事業があります（市の案内では1時間あたり300円、月4時間まで等の条件あり。介護保険の訪問介護対象者は利用不可）。窓口は長寿いきがい課（048-524-1398）です。
              </p>
              <p className="mt-3 text-[0.88rem] leading-[1.9] text-stone">
                ※上記は市の公開情報（閲覧時点）の要約です。条件・内容は変わることがありますので、必ず市の窓口でご確認ください。ライフサポート熊谷は市の事業とは関係のない民間サービスです。
              </p>
              <Link href="/area/kumagaya" className="link-line mt-5 text-[0.92rem]">
                熊谷市の相談先・支援について <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ライフサポート熊谷は買い物代行に対応 */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              en="Our service"
              title={
                <>
                  ライフサポート熊谷は
                  <br />
                  「買い物代行」に対応しています。
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-5 text-[0.97rem] leading-[2.15] text-ink-soft">
              <p>
                ライフサポート熊谷は、熊谷市を中心に深谷市・行田市・東松山市で買い物代行を行う、介護保険外のサービスです。介護認定の有無、同居家族の有無、買い物の内容（ご家族の分・嗜好品・贈り物など）にかかわらず、ご依頼いただけます。
              </p>
              <p>
                介護保険サービスをご利用中の方が、保険の範囲に入りにくい買い物だけを頼む、という使い方もできます。ケアマネジャーや地域の支援者の方からのお問い合わせも歓迎しています。
              </p>
              <p className="font-medium text-ink">
                現在ご提供しているのは買い物代行のみです。身体介護・掃除・調理・通院の付き添い・送迎などは行っていません。
              </p>
            </div>
            <Link href="/shopping-support" className="link-line mt-8 text-[0.95rem]">
              買い物代行サービスの詳細 <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 出典 */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <p className="text-[11px] tracking-[0.3em] text-moss">SOURCES</p>
          <h2 className="mt-3 font-maru text-[1.05rem] font-bold">このページの根拠にした一次情報</h2>
          <ul className="mt-4 space-y-2">
            {SOURCES.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 text-[0.9rem] leading-[1.9] text-ink-soft underline-offset-4 hover:text-moss hover:underline"
                >
                  {s.name}
                  <ExternalIcon className="mt-1.5 h-3.5 w-3.5 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[0.85rem] leading-[1.9] text-stone">
            制度は改正されることがあります。最新の内容は各機関の公式情報でご確認ください。
          </p>
        </div>
      </section>

      <Faq items={FAQ_INSURANCE} lead="介護保険との関係について、よくいただく質問です。" />
      <RelatedPosts categories={["介護保険外サービス"]} />
      <ContactCta
        title="介護保険の対象にならない買い物、ご相談ください。"
        lead="認定の有無や同居家族の有無にかかわらず、買い物代行をご利用いただけます。ケアマネジャーや地域の支援者の方からのお問い合わせも歓迎です。"
        primaryLabel="買い物について相談する"
      />
    </>
  );
}
