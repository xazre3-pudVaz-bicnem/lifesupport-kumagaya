import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import LaunchNotice from "@/components/ui/LaunchNotice";
import PhotoFrame from "@/components/ui/Photo";
import { photos } from "@/data/photos";
import { site } from "@/data/site";
import { ArrowRightIcon, ExternalIcon, InstagramIcon, PhoneIcon } from "@/components/ui/icons";

type Props = {
  title?: React.ReactNode;
  lead?: React.ReactNode;
  /** Instagram DM ボタンの文言（ページの文脈に合わせる） */
  primaryLabel?: string;
  compact?: boolean;
  /** 写真を添えるか（記事下など、繰り返し出る場所では false） */
  withPhoto?: boolean;
};

/**
 * お問い合わせCTA。ヒーローには置かず、サービス説明の後に配置する。
 * 電話・Instagram DM とも、確認できている手段のみ表示する（site.ts が一次情報）。
 */
export default function ContactCta({
  title = "買い物のこと、まずは相談から。",
  lead = "「これって頼める？」という段階で構いません。ご本人からでも、ご家族からでも。お電話またはInstagramのDMからお気軽にどうぞ。",
  primaryLabel = "InstagramのDMで相談する",
  compact = false,
  withPhoto = false,
}: Props) {
  return (
    <section className={`relative overflow-hidden bg-mint ${compact ? "py-16 sm:py-20" : "py-20 sm:py-28"}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-[-8rem] h-[20rem] w-[20rem] rounded-full bg-sprout/60 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 text-balance font-maru text-[1.6rem] font-bold leading-[1.5] sm:text-[2rem]">{title}</h2>
          <p className="mt-5 max-w-xl text-[0.95rem] leading-[2.1] text-ink-soft sm:text-base">{lead}</p>
          <LaunchNotice className="mt-5" />
          {withPhoto ? (
            <PhotoFrame
              photo={photos.doorstepSmile}
              className="mt-8 hidden aspect-[16/9] lg:block"
              position="50% 45%"
              sizes="(min-width: 1024px) 34rem, 100vw"
              decorative
            />
          ) : null}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col gap-3">
            {/* 電話（ご本人にとって最も使いやすい導線） */}
            {site.tel && site.telLink ? (
              <a
                href={site.telLink}
                className="group flex flex-col items-center gap-1 rounded-3xl bg-white px-6 py-6 text-center shadow-[0_10px_30px_-18px_rgba(43,46,42,0.4)] transition-transform hover:-translate-y-0.5"
              >
                <span className="inline-flex items-center gap-2 text-[13px] font-medium tracking-wider text-moss">
                  <PhoneIcon className="h-4 w-4" />
                  お電話でのご相談
                </span>
                <span className="font-maru text-[1.9rem] font-bold tracking-[0.02em] text-ink sm:text-[2.2rem]">
                  {site.tel}
                </span>
                <span className="text-[12px] text-stone">タップで発信できます</span>
              </a>
            ) : null}

            <a href={site.instagramDm} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
              <InstagramIcon className="h-5 w-5" />
              <span>{primaryLabel}</span>
              <ExternalIcon className="h-4 w-4 opacity-70" />
            </a>

            <p className="text-center text-[12.5px] text-stone">Instagram {site.instagramId}</p>

            <Link href="/contact" className="link-line mx-auto mt-2 text-sm">
              お問い合わせ方法の詳細 <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
