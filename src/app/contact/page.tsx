import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import JsonLd from "@/components/ui/JsonLd";
import LaunchNotice from "@/components/ui/LaunchNotice";
import { contactChannels, site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/jsonld";
import { ArrowRightIcon, CheckIcon, ExternalIcon, InstagramIcon, PhoneIcon } from "@/components/ui/icons";

const TITLE = "お問い合わせ｜買い物のご相談はInstagramのDMから";
const DESCRIPTION =
  "ライフサポート熊谷へのお問い合わせ・買い物代行のご相談は、Instagram（@lifesupport_kumagaya）のDMで受け付けています。ご本人からも、離れて暮らすご家族からも。熊谷市・深谷市・行田市・東松山市対応。";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/contact",
  keywords: ["ライフサポート熊谷 問い合わせ", "熊谷 買い物代行 相談"],
});

const TELL_US = [
  "お届け先の地域（熊谷市・深谷市・行田市・東松山市）",
  "困っていること、頼みたい買い物（分かる範囲で）",
  "ご本人からのご相談か、ご家族からのご相談か",
];

export default function ContactPage() {
  const channels = contactChannels();
  return (
    <>
      <JsonLd data={webPageJsonLd({ path: "/contact", name: TITLE, description: DESCRIPTION, type: "ContactPage" })} />
      <PageHeader
        en="Contact"
        title="お問い合わせ"
        lead="買い物のご相談・ご依頼・サービスについてのご質問は、InstagramのDMで受け付けています。「これって頼める？」という段階で構いません。"
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "お問い合わせ", path: "/contact" },
        ]}
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              en="How to reach us"
              title="ご相談方法"
              lead="現在、ご相談はInstagramのDMでお受けしています。ご本人からも、離れて暮らすご家族からもご連絡ください。"
            />
            <LaunchNotice className="mt-6" />
          </Reveal>
          <Reveal delay={0.08}>
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
                  <span>{c.label}</span>
                  {c.external ? <ExternalIcon className="h-4 w-4 opacity-70" /> : null}
                </a>
              ))}
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 text-[0.92rem] text-moss underline-offset-4 hover:underline"
              >
                Instagramのプロフィールを開く（{site.instagramId}）
                <ExternalIcon className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-12 border-t hairline pt-8">
              <h3 className="font-maru text-[1.05rem] font-bold">ご相談のときに、お伝えいただけると助かること</h3>
              <ul className="mt-4 space-y-2.5">
                {TELL_US.map((t) => (
                  <li key={t} className="flex gap-3 text-[0.93rem] leading-[1.95] text-ink-soft">
                    <CheckIcon className="mt-1.5 h-4 w-4 shrink-0 text-moss" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.88rem] leading-[1.9] text-stone">
                料金・お支払い方法・対応できる日時などは、ご相談時にご案内します。お返事までお時間をいただく場合があります。
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-3 text-[0.92rem]">
              <Link href="/flow" className="link-line w-fit">
                ご利用の流れを見る <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link href="/faq" className="link-line w-fit">
                よくある質問を見る <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
