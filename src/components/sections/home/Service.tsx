import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ITEMS, SCENES } from "@/data/content";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";

/** 買い物代行サービス（TOP） */
export default function Service() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionHeading
              en="Service"
              title={
                <>
                  買い物代行
                  <span className="mt-2 block text-[1rem] font-medium tracking-[0.06em] text-moss sm:text-[1.05rem]">
                    ご依頼の品を、ご自宅へ。
                  </span>
                </>
              }
              lead={
                <>
                  いつものスーパーやドラッグストアでのお買い物を、ご依頼内容にそって代わりに行い、ご自宅までお届けします。
                  ご依頼・確認・お届けまで、ひとつひとつ確認しながら進めます。
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Link href="/shopping-support" className="link-line mt-8 text-[0.95rem]">
              買い物代行サービスの詳細
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <h3 className="font-maru text-[1.1rem] font-bold tracking-[0.04em]">買えるもの</h3>
          </Reveal>
          <dl className="mt-4 border-t hairline">
            {ITEMS.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.05}>
                <div className="grid gap-1 border-b hairline py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="font-maru text-[1rem] font-bold">{item.label}</dt>
                  <dd>
                    <p className="text-[0.95rem] text-ink">{item.examples}</p>
                    <p className="mt-1 text-[0.9rem] leading-[1.9] text-ink-soft">{item.detail}</p>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal>
            <h3 className="mt-12 font-maru text-[1.1rem] font-bold tracking-[0.04em]">こんなときに</h3>
          </Reveal>
          <ul className="mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {SCENES.map((s, i) => (
              <Reveal key={s.title} as="li" delay={i * 0.04} className="flex gap-3">
                <CheckIcon className="mt-1.5 h-4 w-4 shrink-0 text-moss" />
                <div>
                  <p className="text-[0.95rem] font-medium">{s.title}</p>
                  <p className="mt-0.5 text-[0.88rem] leading-[1.9] text-ink-soft">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <p className="mt-10 border-l-[3px] border-sprout pl-5 text-[0.9rem] leading-[2] text-ink-soft">
              現在ご提供しているのは買い物代行のみです。掃除・調理・通院の付き添い・送迎・身体介護などは行っていません。
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
