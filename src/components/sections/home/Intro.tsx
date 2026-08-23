import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { BagMark } from "@/components/ui/Illustrations";
import { ArrowRightIcon } from "@/components/ui/icons";
import { site } from "@/data/site";

/** ライフサポート熊谷について（冒頭で要点を言い切る） */
export default function Intro() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
        <Reveal>
          <BagMark className="h-24 w-24 sm:h-28 sm:w-28" />
        </Reveal>
        <div>
          <Reveal>
            <p className="eyebrow">About</p>
            <h2 className="mt-4 font-maru text-[1.6rem] font-bold leading-[1.5] sm:text-[2rem] lg:text-[2.25rem]">
              熊谷で暮らす人の、
              <br className="hidden sm:block" />
              「買い物の困った」をサポートします。
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-7 max-w-2xl space-y-5 text-[0.97rem] leading-[2.15] text-ink-soft sm:text-base">
              <p>
                {site.name}は、熊谷市を中心に、深谷市・行田市・東松山市で買い物代行を行う地域密着型のサービスです。
                福祉・介護の現場経験から生まれました。
              </p>
              <p>
                介護が必要かどうかにかかわらず、「買い物に行くのが大変」という場面は誰にでも訪れます。
                足腰の不安、夏の暑さ、重い荷物、車を手放したあと。
                その「買い物」という一部分だけを、いつもの暮らしを続けるためにお手伝いします。
              </p>
              <p>
                現在ご提供しているのは買い物代行のみ。ひとつのことに専念するからこそ、丁寧に。
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <Link href="/about" className="link-line mt-8 text-[0.95rem]">
              私たちについて、もう少し詳しく
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
