import { HeroIllustration } from "@/components/ui/Illustrations";
import { site } from "@/data/site";

/**
 * ファーストビュー。CTAは置かない（方針）。
 * 写真素材が無いため、ブランドイラストと余白・タイポグラフィで構成する。
 */
export default function Hero() {
  return (
    <section className="grain relative overflow-hidden bg-ivory pt-24 lg:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-mint lg:-right-24 lg:top-0 lg:h-[48rem] lg:w-[48rem]"
      />
      <div className="relative mx-auto grid max-w-[80rem] items-center gap-6 px-5 pb-16 sm:px-8 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-24">
        {/* SPではイラストを先に */}
        <div className="hero-fade order-1 mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:order-2 lg:max-w-none" style={{ "--hero-delay": "0.15s" } as React.CSSProperties}>
          <div className="hero-float">
            <HeroIllustration className="h-auto w-full" />
          </div>
        </div>

        <div className="order-2 lg:order-1 lg:pr-8">
          <p className="hero-fade eyebrow" style={{ "--hero-delay": "0.05s" } as React.CSSProperties}>
            Life Support Kumagaya
          </p>
          <h1 className="hero-fade mt-5 font-maru" style={{ "--hero-delay": "0.2s" } as React.CSSProperties}>
            <span className="block text-[2.1rem] font-bold leading-[1.35] tracking-[0.02em] sm:text-[2.8rem] lg:text-[3.1rem] xl:text-[3.5rem]">
              <span className="whitespace-nowrap">「ちょっとお願い」が</span>
              <br />
              <span className="whitespace-nowrap">言える、熊谷に。</span>
            </span>
            <span className="mt-6 block text-[0.95rem] font-medium tracking-[0.08em] text-moss sm:text-base">
              熊谷市の買い物代行｜{site.name}
            </span>
          </h1>
          <p
            className="hero-fade mt-7 max-w-[34rem] text-[0.98rem] leading-[2.15] text-ink-soft sm:text-[1.05rem]"
            style={{ "--hero-delay": "0.4s" } as React.CSSProperties}
          >
            買い物に行くのが少し大変になった日も、いつもの暮らしはそのままに。
            食料品・日用品・重い物のお買い物を代わりに行い、ご自宅までお届けします。
            ご本人からも、離れて暮らすご家族からも。
          </p>
          {site.launch.status === "pre-launch" ? (
            <p
              className="hero-fade mt-8 inline-flex items-center gap-3 text-[12.5px] tracking-wider text-stone"
              style={{ "--hero-delay": "0.6s" } as React.CSSProperties}
            >
              <span className="h-px w-8 bg-leaf" aria-hidden />
              {site.launch.label}／{site.areas.join("・")}
            </p>
          ) : (
            <p
              className="hero-fade mt-8 inline-flex items-center gap-3 text-[12.5px] tracking-wider text-stone"
              style={{ "--hero-delay": "0.6s" } as React.CSSProperties}
            >
              <span className="h-px w-8 bg-leaf" aria-hidden />
              対応エリア：{site.areas.join("・")}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
