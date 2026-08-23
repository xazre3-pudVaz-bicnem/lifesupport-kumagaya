import Breadcrumbs from "@/components/ui/Breadcrumbs";
import type { Crumb } from "@/lib/jsonld";

type Props = {
  en: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs: Crumb[];
  /** 右側に置く装飾（イラスト等） */
  aside?: React.ReactNode;
};

/**
 * 下層ページの冒頭。写真素材がないため、
 * 薄い黄緑の面と大きなタイポグラフィで構成する。
 */
export default function PageHeader({ en, title, lead, crumbs, aside }: Props) {
  return (
    <header className="relative overflow-hidden bg-mint pt-24 lg:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[22rem] w-[22rem] rounded-full bg-sprout/50 blur-3xl lg:h-[30rem] lg:w-[30rem]"
      />
      <Breadcrumbs crumbs={crumbs} className="relative" />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-5 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
        <div>
          <p className="eyebrow">{en}</p>
          <h1 className="mt-4 font-maru text-[1.85rem] font-bold leading-[1.45] tracking-[0.02em] sm:text-[2.4rem] lg:text-[2.8rem]">
            {title}
          </h1>
          {lead ? (
            <p className="mt-6 max-w-2xl text-[0.95rem] leading-[2.1] text-ink-soft sm:text-[1.02rem]">{lead}</p>
          ) : null}
        </div>
        {aside ? <div className="hidden lg:block">{aside}</div> : null}
      </div>
    </header>
  );
}
