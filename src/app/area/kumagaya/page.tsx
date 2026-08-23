import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import AnswerBox from "@/components/ui/AnswerBox";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Faq from "@/components/ui/Faq";
import ContactCta from "@/components/ui/ContactCta";
import JsonLd from "@/components/ui/JsonLd";
import LaunchNotice from "@/components/ui/LaunchNotice";
import RelatedPosts from "@/components/blog/RelatedPosts";
import { FAQ_GENERAL } from "@/data/faq";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/jsonld";
import { ArrowRightIcon, ExternalIcon } from "@/components/ui/icons";

const TITLE = "熊谷市の買い物代行・高齢者の生活支援｜ライフサポート熊谷の対応エリア";
const DESCRIPTION =
  "熊谷市全域で買い物代行を行うライフサポート熊谷の地域ページ。熊谷市の暮らしと買い物の事情、市の高齢者向け相談窓口（地域包括支援センター・長寿いきがい課）、公的な生活支援との違いをまとめました。深谷市・行田市・東松山市にも対応。";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/area/kumagaya",
  keywords: ["熊谷市 買い物代行", "熊谷市 生活支援", "熊谷市 高齢者 サポート", "熊谷 高齢者 生活支援"],
});

/** 公的な相談先（市・組合の公開情報。閲覧時点） */
const PUBLIC_CONTACTS = [
  {
    name: "大里広域地域包括支援センター（熊谷市内）",
    body: "介護・福祉・健康・医療に関する高齢者の総合相談窓口。熊谷市内には複数のセンターが圏域ごとに設置されています。お住まいの地域の担当センターは、市または大里広域市町村圏組合のサイトで確認できます。",
    url: "https://www.osato-k.jp/kaigohoken/supportcenter/",
    linkLabel: "大里広域市町村圏組合：地域包括支援センター",
  },
  {
    name: "大里広域市町村圏組合 介護保険課",
    body: "熊谷市の介護保険の保険者。要介護認定の申請や介護保険サービスの相談先です（電話 048-501-1330）。",
    url: "https://www.city.kumagaya.lg.jp/kenkouhukushi/kaigohoken/kaigohokenn.html",
    linkLabel: "熊谷市：介護保険制度",
  },
  {
    name: "熊谷市 長寿いきがい課",
    body: "一人暮らしの高齢者向けの市のサービス（買い物支援を含む軽度生活援助、配食サービスなど）の窓口です（電話 048-524-1398）。",
    url: "https://www.city.kumagaya.lg.jp/faq/7/153/ta070202dokkyo.html",
    linkLabel: "熊谷市：ひとり暮らしの高齢者のためのサービス",
  },
];

const FAQ_ITEMS = [FAQ_GENERAL[0], FAQ_GENERAL[11], FAQ_GENERAL[2]];

export default function AreaKumagayaPage() {
  const others = site.areas.filter((a) => a !== site.areaMain);
  return (
    <>
      <JsonLd data={webPageJsonLd({ path: "/area/kumagaya", name: TITLE, description: DESCRIPTION })} />
      <PageHeader
        en="Kumagaya"
        title={
          <>
            熊谷市の買い物代行・
            <br className="sm:hidden" />
            生活支援
          </>
        }
        lead="ライフサポート熊谷は、熊谷市全域で買い物代行を行っています。このページでは、熊谷市での対応と、市内で利用できる公的な相談窓口・支援についてまとめています。"
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "熊谷市の買い物代行・生活支援", path: "/area/kumagaya" },
        ]}
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <AnswerBox
            question="熊谷市のどの地域でも、買い物代行を頼めますか？"
            answer={
              <>
                熊谷市全域が対応エリアです。あわせて{others.join("・")}にも対応しています。エリア内でもお届け先の場所によってはご相談となる場合がありますので、まずはお住まいの地域をInstagramのDMでお知らせください（{site.launch.label}）。
              </>
            }
          />
        </Reveal>
      </section>

      {/* 熊谷の暮らしと買い物 */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <Reveal>
              <SectionHeading en="Kumagaya life" title="熊谷の暮らしと、買い物の事情" />
              <LaunchNotice className="mt-6" />
            </Reveal>
            <Reveal delay={0.08}>
              <div className="space-y-5 text-[0.97rem] leading-[2.15] text-ink-soft">
                <p>
                  熊谷市は埼玉県北部の中心都市で、人口は約19万人（市の公表値：2026年8月1日時点 189,391人）。郊外には大型のスーパーやドラッグストアが点在し、日々の買い物は車が前提になりがちな地域です。運転をやめたあとに、買い物の負担が一気に増える方が少なくありません。
                </p>
                <p>
                  そして、夏の暑さ。熊谷市は2018年7月23日に41.1℃を観測し、当時の国内最高気温を記録しました。真夏の日中に歩いて買い物へ行き、重い荷物を持って帰ることは、年齢を問わず体への負担になります。
                </p>
                <p>
                  ライフサポート熊谷は、こうした熊谷ならではの事情を踏まえ、「買い物」という一部分をサポートすることで、住み慣れた家での暮らしを続けるお手伝いをしたいと考えています。
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 対応エリア */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-20">
          <Reveal>
            <SectionHeading
              en="Area"
              title="対応エリア"
              lead="熊谷市を中心に、近隣3市に対応しています。対応エリアは今後の状況に応じて見直すことがあります。"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="border-t-2 border-leaf pt-8">
              <p className="font-maru text-[2.4rem] font-bold leading-none sm:text-[3rem]">{site.areaMain}</p>
              <p className="mt-2 text-[0.9rem] text-ink-soft">市内全域</p>
              <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t hairline pt-6">
                {others.map((a) => (
                  <li key={a} className="font-maru text-[1.4rem] font-bold sm:text-[1.6rem]">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 公的な相談先 */}
      <section className="bg-mint">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <SectionHeading
              en="Public support"
              title="熊谷市で利用できる、公的な相談窓口・支援"
              lead="買い物以外の困りごとや、介護保険の利用については、まず公的な窓口へ。ライフサポート熊谷は市の事業とは関係のない民間の買い物代行サービスです。"
            />
          </Reveal>
          <dl className="mt-12 border-t hairline">
            {PUBLIC_CONTACTS.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.05}>
                <div className="grid gap-3 border-b hairline py-7 lg:grid-cols-[1fr_1.6fr] lg:gap-10">
                  <dt className="font-maru text-[1.05rem] font-bold leading-[1.7]">{c.name}</dt>
                  <dd>
                    <p className="text-[0.92rem] leading-[2] text-ink-soft">{c.body}</p>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-[0.88rem] text-moss underline-offset-4 hover:underline"
                    >
                      {c.linkLabel}
                      <ExternalIcon className="h-3.5 w-3.5" />
                    </a>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
          <Reveal>
            <p className="mt-6 text-[0.85rem] leading-[1.9] text-stone">
              ※各窓口の情報は公開情報（閲覧時点）にもとづきます。最新の内容は各機関でご確認ください。
            </p>
          </Reveal>
        </div>
      </section>

      {/* 民間サービスの位置づけ */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal>
            <SectionHeading en="Our role" title="公的支援と、ライフサポート熊谷の違い" />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-5 text-[0.97rem] leading-[2.15] text-ink-soft">
              <p>
                市の軽度生活援助や介護保険の生活援助には、対象者の条件や利用時間の上限があります。ライフサポート熊谷は介護保険外の民間サービスとして、条件や上限にしばられず、必要なときに必要なぶんだけ買い物代行をご利用いただけます。
              </p>
              <p>
                公的な支援を使える方はそれを土台に、足りない部分や対象外の買い物を民間で補う。そんな組み合わせ方も、ご相談ください。
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <Link href="/insurance-outside" className="link-line w-fit text-[0.95rem]">
                介護保険外の買い物支援について <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link href="/shopping-support" className="link-line w-fit text-[0.95rem]">
                買い物代行サービスの詳細 <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Faq items={FAQ_ITEMS} tone="cream" lead="熊谷市でのご利用について、よくいただく質問です。" />
      <div className="pt-20 sm:pt-28">
        <RelatedPosts categories={["熊谷の地域情報"]} />
      </div>
      <ContactCta primaryLabel="熊谷市での買い物について相談する" />
    </>
  );
}
