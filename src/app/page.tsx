import Link from "next/link";
import Hero from "@/components/sections/home/Hero";
import Intro from "@/components/sections/home/Intro";
import Troubles from "@/components/sections/home/Troubles";
import Service from "@/components/sections/home/Service";
import Values from "@/components/sections/home/Values";
import WhoCanUse from "@/components/sections/home/WhoCanUse";
import Flow from "@/components/sections/home/Flow";
import Area from "@/components/sections/home/Area";
import InsuranceNote from "@/components/sections/home/InsuranceNote";
import LatestPosts from "@/components/sections/home/LatestPosts";
import InstagramSection from "@/components/sections/home/InstagramSection";
import ContactCta from "@/components/ui/ContactCta";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import { FAQ_HOME } from "@/data/faq";
import { webPageJsonLd } from "@/lib/jsonld";
import { ArrowRightIcon } from "@/components/ui/icons";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          path: "/",
          name: "熊谷市の買い物代行ならライフサポート熊谷｜高齢者の買い物支援",
          description:
            "熊谷市を中心に深谷市・行田市・東松山市で買い物代行を行う地域密着型サービス。介護保険外のため介護認定は不要。離れて暮らすご家族からのご依頼も。",
        })}
      />
      <Hero />
      <Intro />
      <Troubles />
      <Service />
      {/* 最初のCTAはサービス説明の後 */}
      <ContactCta compact />
      <Values />
      <WhoCanUse />
      <Flow />
      {/* 料金はInstagramで確認できないため、セクションを設けずCTAで案内 */}
      <Area />
      <InsuranceNote />
      <Faq
        items={FAQ_HOME}
        lead="ご利用前によくいただく質問をまとめました。"
        footer={
          <Link href="/faq" className="link-line text-[0.95rem]">
            質問の一覧を見る <ArrowRightIcon className="h-4 w-4" />
          </Link>
        }
      />
      <LatestPosts />
      <InstagramSection />
      <ContactCta />
    </>
  );
}
