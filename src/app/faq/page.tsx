import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Faq from "@/components/ui/Faq";
import ContactCta from "@/components/ui/ContactCta";
import JsonLd from "@/components/ui/JsonLd";
import { FAQ_GENERAL } from "@/data/faq";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/jsonld";
import { ArrowRightIcon } from "@/components/ui/icons";

const TITLE = "よくある質問｜熊谷市の買い物代行について";
const DESCRIPTION =
  "ライフサポート熊谷の買い物代行に関するよくある質問。介護認定がなくても使える？介護保険は使える？家族が代わりに頼める？重い物や当日の依頼、売り切れ時の対応、対応エリア（熊谷市・深谷市・行田市・東松山市）などにお答えします。";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/faq",
  keywords: ["買い物代行 よくある質問", "熊谷 買い物代行 介護認定", "買い物代行 家族 依頼"],
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ path: "/faq", name: TITLE, description: DESCRIPTION })} />
      <PageHeader
        en="FAQ"
        title="よくある質問"
        lead="ご利用前によくいただく質問をまとめました。ここにないことは、InstagramのDMでお気軽にお尋ねください。"
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "よくある質問", path: "/faq" },
        ]}
      />
      <Faq
        items={FAQ_GENERAL}
        en="Questions"
        title="ご利用について"
        openFirst
        footer={
          <div className="flex flex-col gap-3 text-[0.92rem]">
            <Link href="/shopping-support" className="link-line w-fit">
              買い物代行サービスの詳細 <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link href="/insurance-outside" className="link-line w-fit">
              介護保険外の買い物支援について <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link href="/flow" className="link-line w-fit">
              ご利用の流れ <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        }
      />
      <ContactCta title="ここにない質問は、DMでどうぞ。" primaryLabel="質問してみる" />
    </>
  );
}
