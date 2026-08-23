import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PhotoFrame from "@/components/ui/Photo";
import type { Crumb } from "@/lib/jsonld";
import type { Photo } from "@/data/photos";

type Props = {
  en: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs: Crumb[];
  /** 右側に添える写真 */
  photo?: Photo;
  photoPosition?: string;
};

/**
 * 下層ページの冒頭。薄い黄緑の面に見出しを置き、右に写真を添える。
 * 写真がない場合はタイポグラフィだけで構成する。
 */
export default function PageHeader({ en, title, lead, crumbs, photo, photoPosition }: Props) {
  return (
    <header className="relative overflow-hidden bg-mint pt-24 lg:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[22rem] w-[22rem] rounded-full bg-sprout/50 blur-3xl lg:h-[30rem] lg:w-[30rem]"
      />
      <Breadcrumbs crumbs={crumbs} className="relative" />
      <div
        className={`relative mx-auto grid max-w-6xl gap-8 px-5 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:gap-14 ${
          photo ? "lg:grid-cols-[1.15fr_1fr] lg:items-center" : ""
        }`}
      >
        <div>
          <p className="eyebrow">{en}</p>
          <h1 className="mt-4 text-balance font-maru text-[1.85rem] font-bold leading-[1.45] tracking-[0.02em] sm:text-[2.3rem] lg:text-[2.5rem]">
            {title}
          </h1>
          {lead ? (
            <p className="mt-6 max-w-2xl text-[0.95rem] leading-[2.1] text-ink-soft sm:text-[1.02rem]">{lead}</p>
          ) : null}
        </div>
        {photo ? (
          <PhotoFrame
            photo={photo}
            className="aspect-[16/10] lg:aspect-[4/3]"
            position={photoPosition}
            sizes="(min-width: 1024px) 34rem, 100vw"
            priority
          />
        ) : null}
      </div>
    </header>
  );
}
