import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import AnswerBox from "@/components/ui/AnswerBox";
import { ArrowRightIcon } from "@/components/ui/icons";

/** 介護保険外の買い物について（TOPの導入。詳細は /insurance-outside） */
export default function InsuranceNote() {
  return (
    <section className="bg-mint">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              en="Outside insurance"
              title={
                <>
                  介護保険の対象にならない
                  <br className="hidden sm:block" />
                  買い物で、困っていませんか？
                </>
              }
              lead="介護保険の訪問介護（生活援助）で買い物を頼めるのは、一般に要介護・要支援の認定を受け、ケアプランに位置づけられた場合です。認定がない方、同居のご家族がいる方、嗜好品やご家族の分の買い物などは、対象になりにくいことがあります。"
            />
            <Link href="/insurance-outside" className="link-line mt-8 text-[0.95rem]">
              介護保険外の買い物支援について
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <AnswerBox
              question="介護保険が使えなくても、買い物を頼めますか？"
              answer={
                <>
                  はい。ライフサポート熊谷は介護保険外（全額自己負担）の買い物代行です。介護認定やケアプランは不要で、ご本人・ご家族の判断でいつでもご依頼いただけます。介護保険サービスをご利用中の方が、保険の範囲に入りにくい買い物だけを頼む、という使い方もできます。
                </>
              }
            />
            <p className="mt-6 text-[0.88rem] leading-[1.95] text-ink-soft">
              ※介護保険制度の詳細や、ご自身が対象になるかどうかは、お住まいの地域の地域包括支援センターやケアマネジャーにご確認ください。ライフサポート熊谷は介護保険の事業者ではありません。
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
