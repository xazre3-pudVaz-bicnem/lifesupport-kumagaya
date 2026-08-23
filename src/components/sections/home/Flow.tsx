import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import PhotoFrame from "@/components/ui/Photo";
import { photos } from "@/data/photos";
import { FLOW } from "@/data/content";
import { ArrowRightIcon } from "@/components/ui/icons";

/** 各ステップに添える写真（FLOW と同じ並び） */
const STEP_PHOTOS = [photos.memoVegetables, photos.selectingVegetables, photos.riceAndWater, photos.unpackingVegetables];
const STEP_POSITION = ["50% 50%", "55% 45%", "55% 50%", "50% 45%"];

/** ご利用の流れ（4ステップ） */
export default function Flow({ withLink = true }: { withLink?: boolean }) {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <SectionHeading
            en="Flow"
            title="ご利用の流れ"
            lead="ご相談からお受け取りまで、4つのステップ。はじめての方でも迷わないよう、その都度ご案内します。"
          />
        </Reveal>
        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {FLOW.map((f, i) => (
            <Reveal key={f.step} as="li" delay={i * 0.08}>
              <PhotoFrame
                photo={STEP_PHOTOS[i]}
                className="aspect-[4/3]"
                position={STEP_POSITION[i]}
                sizes="(min-width: 1024px) 17rem, (min-width: 768px) 45vw, 100vw"
                decorative
              />
              <div className="mt-5 flex items-end gap-3">
                <span className="big-num text-[2.4rem] leading-none sm:text-[2.8rem]" aria-hidden>
                  {f.step}
                </span>
                {i < FLOW.length - 1 ? <span aria-hidden className="mb-3 hidden h-px flex-1 bg-sprout lg:block" /> : null}
              </div>
              <h3 className="mt-3 font-maru text-[1.15rem] font-bold tracking-[0.04em]">{f.title}</h3>
              <p className="mt-3 text-[0.92rem] leading-[2] text-ink-soft">{f.body}</p>
            </Reveal>
          ))}
        </ol>
        {withLink ? (
          <Reveal>
            <Link href="/flow" className="link-line mt-12 text-[0.95rem]">
              ご利用の流れをくわしく見る
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
