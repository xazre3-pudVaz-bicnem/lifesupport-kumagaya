import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import LaunchNotice from "@/components/ui/LaunchNotice";
import PhotoFrame from "@/components/ui/Photo";
import { photos } from "@/data/photos";
import { site } from "@/data/site";
import { ArrowRightIcon } from "@/components/ui/icons";

/** 対応エリア（Instagramで確認できた市のみ） */
export default function Area() {
  const others = site.areas.filter((a) => a !== site.areaMain);
  return (
    <section>
      {/* 住宅街の写真を全幅の帯で。地域に根ざしたサービスであることを視覚で伝える */}
      <Reveal>
        <PhotoFrame
          photo={photos.residentialStreet}
          className="h-[16rem] w-full sm:h-[22rem] lg:h-[26rem]"
          position="50% 58%"
          sizes="100vw"
        />
      </Reveal>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-16">
          <Reveal>
            <SectionHeading
              en="Area"
              title="対応エリア"
              lead="熊谷市を中心に、近隣の3市に対応しています。エリア内でもお届け先の場所によってはご相談となる場合がありますので、まずはお住まいの地域をお知らせください。"
            />
            <LaunchNotice className="mt-6" />
            <Link href="/area/kumagaya" className="link-line mt-8 text-[0.95rem]">
              熊谷市の買い物代行・生活支援について
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border-t-2 border-leaf pt-8">
              <p className="text-[12px] tracking-[0.2em] text-moss">MAIN AREA</p>
              <p className="mt-2 font-maru text-[2.6rem] font-bold leading-none tracking-[0.04em] sm:text-[3.4rem]">
                {site.areaMain}
              </p>
              <p className="mt-3 text-[0.9rem] text-ink-soft">埼玉県北部・熊谷市全域</p>
              <div className="mt-8 border-t hairline pt-6">
                <p className="text-[12px] tracking-[0.2em] text-moss">ALSO</p>
                <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
                  {others.map((a) => (
                    <li key={a} className="font-maru text-[1.5rem] font-bold tracking-[0.04em] sm:text-[1.8rem]">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
