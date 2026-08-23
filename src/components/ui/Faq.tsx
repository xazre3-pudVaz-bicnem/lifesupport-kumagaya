import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { faqJsonLd, type FaqItem } from "@/lib/jsonld";
import { ChevronDownIcon } from "@/components/ui/icons";

type Props = {
  items: FaqItem[];
  title?: React.ReactNode;
  en?: string;
  lead?: React.ReactNode;
  /** JSON-LD を出力するか（1ページ1つに限定する） */
  withJsonLd?: boolean;
  /** 最初の項目を開いた状態にする */
  openFirst?: boolean;
  footer?: React.ReactNode;
  /** 背景色 */
  tone?: "plain" | "cream" | "mint";
};

const TONE = { plain: "", cream: "bg-cream", mint: "bg-mint" };

/**
 * よくある質問。表示内容と FAQPage JSON-LD を同一データから生成する。
 * details/summary で JS なしに開閉できる。
 */
export default function Faq({
  items,
  title = "よくある質問",
  en = "FAQ",
  lead,
  withJsonLd = true,
  openFirst = false,
  footer,
  tone = "plain",
}: Props) {
  if (items.length === 0) return null;
  return (
    <section className={TONE[tone]}>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        {withJsonLd ? <JsonLd data={faqJsonLd(items)} /> : null}
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <SectionHeading en={en} title={title} lead={lead} />
            {footer ? <div className="mt-8">{footer}</div> : null}
          </div>
          <div className="border-t hairline">
            {items.map((f, i) => (
              <Reveal key={f.question} delay={Math.min(i, 5) * 0.04}>
                <details className="group border-b hairline" open={openFirst && i === 0}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                    <h3 className="font-maru text-[1.02rem] font-bold leading-[1.7]">
                      <span aria-hidden className="mr-3 text-leaf">
                        Q
                      </span>
                      {f.question}
                    </h3>
                    <ChevronDownIcon className="mt-1.5 h-5 w-5 shrink-0 text-stone transition-transform duration-500 group-open:rotate-180" />
                  </summary>
                  <p className="pb-6 pl-7 text-[0.95rem] leading-[2] text-ink-soft">{f.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
