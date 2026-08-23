import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROMISES, VALUES } from "@/data/content";

/** 大切にしていること（3つの価値観）＋ 3つのお約束 */
export default function Values({ showPromises = true }: { showPromises?: boolean }) {
  return (
    <section className="bg-mint">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <SectionHeading
            en="Values"
            title="ライフサポート熊谷が大切にしていること"
            lead="安心して「ちょっとお願い」と言える存在を目指して。"
          />
        </Reveal>
        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-14">
          {VALUES.map((v, i) => (
            <Reveal key={v.num} delay={i * 0.08}>
              <div className="border-t-2 border-leaf pt-6">
                <span className="big-num text-[2.6rem] sm:text-[3rem]" aria-hidden>
                  {v.num}
                </span>
                <h3 className="mt-3 font-maru text-[1.35rem] font-bold tracking-[0.06em]">{v.title}</h3>
                <p className="mt-4 text-[0.93rem] leading-[2.05] text-ink-soft">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {showPromises ? (
          <div className="mt-20 grid gap-8 border-t hairline pt-14 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <Reveal>
              <h3 className="font-maru text-[1.25rem] font-bold leading-[1.6]">
                安心してご利用いただくための
                <br />
                3つのお約束
              </h3>
              <p className="mt-4 text-[0.92rem] leading-[2] text-ink-soft">
                お預かりするのは、商品だけでなく信頼です。迷ったときは、必ず確認してから動きます。
              </p>
            </Reveal>
            <ol className="space-y-6">
              {PROMISES.map((p, i) => (
                <Reveal key={p.title} as="li" delay={i * 0.06} className="flex gap-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white font-maru text-[0.95rem] font-bold text-moss">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-maru text-[1.02rem] font-bold leading-[1.7]">{p.title}</p>
                    <p className="mt-1.5 text-[0.9rem] leading-[1.95] text-ink-soft">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        ) : null}
      </div>
    </section>
  );
}
