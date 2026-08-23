import { getImageProps } from "next/image";
import { photos } from "@/data/photos";
import { site } from "@/data/site";

/**
 * ファーストビュー。CTAは置かない（方針）。
 *
 * 写真は getImageProps を2回呼び、<picture> で PC / SP のカットを出し分ける。
 * こうすると片方しか読み込まれず、SPでも人物が切れない。
 *   - PC（横長）：玄関先でトートバッグを手渡す。左に余白があり文字を載せられる
 *   - SP（4:3）：レシートを見せながら手渡す。人物が大きく写る
 * SPでは写真の下にテキスト、PCでは写真の上に重ねる（DOMは共通）。
 */
export default function Hero() {
  const common = { alt: "", quality: 82, fill: true } as const;

  const {
    props: { srcSet: spSrcSet },
  } = getImageProps({ ...common, src: photos.heroSp.src, sizes: "100vw" });

  const {
    props: { srcSet: pcSrcSet, ...pcRest },
  } = getImageProps({ ...common, src: photos.hero.src, sizes: "100vw", priority: true });

  return (
    <section className="relative bg-ivory pt-16 lg:pt-20">
      <div className="relative">
        {/* 写真 */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-mint sm:aspect-[16/10] lg:aspect-auto lg:h-[calc(100svh-5rem)] lg:max-h-[46rem] lg:min-h-[34rem]">
          <picture>
            <source media="(max-width: 767px)" srcSet={spSrcSet} />
            <img
              {...pcRest}
              srcSet={pcSrcSet}
              alt={photos.hero.alt}
              className="absolute inset-0 h-full w-full object-cover object-[62%_50%] md:object-[70%_50%] lg:object-[64%_45%]"
            />
          </picture>

          {/* PCのみ：文字を載せるための白のグラデーション */}
          <div
            aria-hidden
            className="absolute inset-0 hidden bg-gradient-to-r from-ivory via-ivory/85 to-transparent lg:block lg:from-35% lg:via-55%"
          />
        </div>

        {/* テキスト（SPは写真の下、PCは写真の上に重ねる） */}
        <div className="lg:absolute lg:inset-0">
          <div className="mx-auto flex h-full max-w-[88rem] items-center px-5 sm:px-8">
            <div className="max-w-[36rem] py-10 sm:py-12 lg:py-0">
              <p className="hero-fade eyebrow" style={{ "--hero-delay": "0.05s" } as React.CSSProperties}>
                Life Support Kumagaya
              </p>
              <h1 className="hero-fade mt-5 font-maru" style={{ "--hero-delay": "0.2s" } as React.CSSProperties}>
                <span className="block text-[2.1rem] font-bold leading-[1.35] tracking-[0.02em] sm:text-[2.8rem] lg:text-[3.1rem] xl:text-[3.5rem]">
                  <span className="whitespace-nowrap">「ちょっとお願い」が</span>
                  <br />
                  <span className="whitespace-nowrap">言える、熊谷に。</span>
                </span>
                <span className="mt-5 block text-[0.95rem] font-medium tracking-[0.08em] text-moss sm:text-base">
                  熊谷市の買い物代行｜{site.name}
                </span>
              </h1>
              <p
                className="hero-fade mt-6 text-[0.98rem] leading-[2.15] text-ink-soft sm:text-[1.05rem]"
                style={{ "--hero-delay": "0.4s" } as React.CSSProperties}
              >
                買い物に行くのが少し大変になった日も、いつもの暮らしはそのままに。
                食料品・日用品・重い物のお買い物を代わりに行い、ご自宅までお届けします。
                ご本人からも、離れて暮らすご家族からも。
              </p>
              <p
                className="hero-fade mt-7 inline-flex items-center gap-3 text-[12.5px] tracking-wider text-stone"
                style={{ "--hero-delay": "0.6s" } as React.CSSProperties}
              >
                <span className="h-px w-8 bg-leaf" aria-hidden />
                {site.launch.status === "pre-launch"
                  ? `${site.launch.label}／${site.areas.join("・")}`
                  : `対応エリア：${site.areas.join("・")}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
