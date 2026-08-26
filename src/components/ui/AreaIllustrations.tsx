import Reveal from "@/components/ui/Reveal";
import PhotoFrame from "@/components/ui/Photo";
import { AREA_ILLUSTRATIONS } from "@/data/photos";

type Props = {
  title?: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
};

/**
 * 対応エリア4市を、その土地の風景のイラストで紹介する。
 * カードで囲わず、絵と市名だけを並べて軽やかに見せる。
 */
export default function AreaIllustrations({
  title = "うかがうのは、この4つのまち",
  lead,
  className,
}: Props) {
  return (
    <section className={className}>
      {title ? (
        <Reveal>
          <div className="text-center">
            <h2 className="text-balance font-maru text-[1.3rem] font-bold leading-[1.6] sm:text-[1.5rem]">{title}</h2>
            {lead ? (
              <p className="mx-auto mt-4 max-w-2xl text-[0.93rem] leading-[2.05] text-ink-soft">{lead}</p>
            ) : null}
          </div>
        </Reveal>
      ) : null}

      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-8 sm:gap-y-8">
        {AREA_ILLUSTRATIONS.map((a, i) => (
          <Reveal key={a.area} as="li" delay={(i % 2) * 0.06}>
            <figure>
              <PhotoFrame
                photo={a.photo}
                className="aspect-[4/3] rounded-sm"
                sizes="(min-width: 640px) 22rem, 45vw"
              />
              <figcaption className="mt-3 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                <span className="font-maru text-[0.98rem] font-bold tracking-[0.06em] sm:text-[1.05rem]">{a.area}</span>
                <span className="text-[11.5px] text-stone sm:text-[12px]">{a.caption}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
