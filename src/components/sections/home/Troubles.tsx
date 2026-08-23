import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import PhotoFrame from "@/components/ui/Photo";
import { photos } from "@/data/photos";
import { TROUBLES } from "@/data/content";

/** こんなお困りごとはありませんか？（罫線で区切ったリスト。カードは使わない） */
export default function Troubles() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <Reveal>
            <SectionHeading
              en="Troubles"
              title={
                <>
                  こんなお困りごとは
                  <br className="sm:hidden" />
                  ありませんか？
                </>
              }
              lead="どれかひとつでも思い当たれば、それで十分です。介護認定の有無や年齢は問いません。"
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:w-[22rem]">
            <PhotoFrame
              photo={photos.carryingBags}
              className="aspect-[16/10] lg:aspect-[4/3]"
              position="50% 55%"
              sizes="(min-width: 1024px) 22rem, 100vw"
            />
          </Reveal>
        </div>

        <ol className="mt-12 grid border-t hairline sm:grid-cols-2 sm:gap-x-14">
          {TROUBLES.map((t, i) => (
            <Reveal key={t.title} as="li" delay={(i % 2) * 0.06} className="border-b hairline py-7 sm:py-8">
              <div className="flex gap-5">
                <span className="big-num mt-1 text-[1.6rem] sm:text-[1.9rem]" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-maru text-[1.05rem] font-bold leading-[1.65] sm:text-[1.1rem]">{t.title}</h3>
                  <p className="mt-2.5 text-[0.92rem] leading-[2] text-ink-soft">{t.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <p className="mt-10 max-w-2xl text-[0.95rem] leading-[2.1] text-ink-soft">
            「まだ自分でできる」という気持ちは、そのままで構いません。
            重い物だけ、暑い時期だけ、体調がすぐれない週だけ。
            必要なところだけをお手伝いするのが、ライフサポート熊谷の考え方です。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
