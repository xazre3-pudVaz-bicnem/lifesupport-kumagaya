import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import LaunchNotice from "@/components/ui/LaunchNotice";
import { contactChannels, site } from "@/data/site";
import { ArrowRightIcon, ExternalIcon, InstagramIcon, PhoneIcon } from "@/components/ui/icons";

type Props = {
  title?: React.ReactNode;
  lead?: React.ReactNode;
  /** ボタンの文言（ページの文脈に合わせる） */
  primaryLabel?: string;
  compact?: boolean;
};

/**
 * お問い合わせCTA。ヒーローには置かず、サービス説明の後に配置する。
 * 確認できている連絡手段（Instagram DM）のみ表示し、電話・LINEは site.ts で確認でき次第出る。
 */
export default function ContactCta({
  title = "買い物のこと、まずは相談から。",
  lead = "「これって頼める？」という段階で構いません。ご本人からでも、ご家族からでも。InstagramのDMからお気軽にどうぞ。",
  primaryLabel = "買い物について相談する",
  compact = false,
}: Props) {
  const channels = contactChannels();
  return (
    <section className={`relative overflow-hidden bg-mint ${compact ? "py-16 sm:py-20" : "py-20 sm:py-28"}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-[-8rem] h-[20rem] w-[20rem] rounded-full bg-sprout/60 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 font-maru text-[1.6rem] font-bold leading-[1.5] sm:text-[2rem]">{title}</h2>
          <p className="mt-5 max-w-xl text-[0.95rem] leading-[2.1] text-ink-soft sm:text-base">{lead}</p>
          <LaunchNotice className="mt-5" />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-col gap-3">
            {channels.map((c) => (
              <a
                key={c.key}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className={c.key === "instagram" ? "btn btn-primary w-full" : "btn btn-outline w-full"}
              >
                {c.key === "instagram" ? <InstagramIcon className="h-5 w-5" /> : <PhoneIcon className="h-5 w-5" />}
                <span>{c.key === "instagram" ? primaryLabel : c.label}</span>
                {c.external ? <ExternalIcon className="h-4 w-4 opacity-70" /> : null}
              </a>
            ))}
            <p className="text-center text-[12.5px] text-stone">
              Instagram {site.instagramId}（DMでのご相談を受け付けています）
            </p>
            <Link href="/contact" className="link-line mx-auto mt-2 text-sm">
              お問い合わせ方法の詳細 <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
