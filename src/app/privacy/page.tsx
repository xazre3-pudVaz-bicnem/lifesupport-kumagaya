import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import JsonLd from "@/components/ui/JsonLd";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/jsonld";

const TITLE = "プライバシーポリシー";
const DESCRIPTION = "ライフサポート熊谷における個人情報の取り扱いについて定めたプライバシーポリシーです。";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/privacy",
  noindex: true,
});

const SECTIONS: { h: string; body: React.ReactNode }[] = [
  {
    h: "1. 基本方針",
    body: (
      <p>
        {site.name}（以下「当サービス」）は、買い物代行サービスの提供にあたり、お客様の個人情報を適切に取り扱うことが重要な責務であると考え、個人情報の保護に関する法律その他の関係法令を遵守し、以下の方針に基づいて個人情報を取り扱います。
      </p>
    ),
  },
  {
    h: "2. 取得する情報",
    body: (
      <>
        <p>当サービスは、ご相談・ご依頼・サービス提供のために、次の情報を取得することがあります。</p>
        <ul>
          <li>お名前、ご住所（お届け先）、電話番号、InstagramアカウントなどのSNS上の連絡先</li>
          <li>ご依頼内容（購入を希望される商品、ご希望の日時、お届けの方法など）</li>
          <li>ご家族からのご依頼の場合、ご依頼者とご利用者それぞれの連絡先・続柄</li>
          <li>お支払いに関する情報（お支払い方法、購入代金・利用料金の記録）</li>
          <li>当サイトの閲覧に伴い自動的に送信される情報（アクセス日時、ブラウザの種類など）</li>
        </ul>
      </>
    ),
  },
  {
    h: "3. 利用目的",
    body: (
      <>
        <p>取得した個人情報は、次の目的の範囲内で利用します。</p>
        <ul>
          <li>買い物代行サービスの提供（ご依頼内容の確認、お買い物、お届け、ご連絡）</li>
          <li>料金のご案内、お支払いに関する事務</li>
          <li>ご相談・お問い合わせへの回答</li>
          <li>サービス改善のための記録・分析（個人を特定しない形で行います）</li>
          <li>法令に基づく対応</li>
        </ul>
      </>
    ),
  },
  {
    h: "4. 第三者への提供",
    body: (
      <p>
        当サービスは、法令に基づく場合、人の生命・身体・財産の保護のために必要で本人の同意を得ることが困難な場合を除き、あらかじめ本人の同意を得ることなく個人情報を第三者に提供しません。ご家族からのご依頼の場合、サービス提供に必要な範囲で、ご依頼者とご利用者の間で情報を共有することがあります。
      </p>
    ),
  },
  {
    h: "5. 安全管理",
    body: (
      <p>
        当サービスは、取得した個人情報の漏えい、滅失、き損を防止するため、必要かつ適切な安全管理措置を講じます。お預かりした情報は、利用目的の達成に必要な期間のみ保管し、不要となった情報は適切に廃棄します。
      </p>
    ),
  },
  {
    h: "6. 外部サービスの利用",
    body: (
      <p>
        ご相談・ご依頼のやりとりにInstagram（Meta Platforms, Inc.）のダイレクトメッセージを利用しています。Instagram上でのデータの取り扱いについては、同社のプライバシーポリシーをご確認ください。当サイトでは、アクセス状況の把握のためにアクセス解析ツールを利用する場合があります。これらのツールはCookie等を利用して情報を収集しますが、個人を特定するものではありません。
      </p>
    ),
  },
  {
    h: "7. 開示・訂正・削除",
    body: (
      <p>
        ご本人から個人情報の開示・訂正・利用停止・削除のお申し出があった場合、ご本人であることを確認のうえ、合理的な範囲で速やかに対応します。お申し出は、当サービスのInstagram（{site.instagramId}）のDMよりご連絡ください。
      </p>
    ),
  },
  {
    h: "8. 本ポリシーの変更",
    body: (
      <p>
        本ポリシーの内容は、法令の改正やサービス内容の変更に応じて、予告なく改定することがあります。改定後の内容は、当サイトに掲載した時点から適用されます。
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ path: "/privacy", name: TITLE, description: DESCRIPTION })} />
      <PageHeader
        en="Privacy policy"
        title="プライバシーポリシー"
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "プライバシーポリシー", path: "/privacy" },
        ]}
      />
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="prose-blog text-[0.95rem] leading-[2.05]">
          {SECTIONS.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              {s.body}
            </section>
          ))}
          <p className="mt-12 text-[0.88rem] text-stone">
            制定日：2026年8月21日
            <br />
            {site.name}（代表 {site.representative}）
          </p>
        </div>
      </section>
    </>
  );
}
