import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import PhotoFrame from "@/components/ui/Photo";
import { photos } from "@/data/photos";
import { site } from "@/data/site";
import { ExternalIcon, InstagramIcon } from "@/components/ui/icons";

/**
 * Instagram導線。埋め込み（外部スクリプト）は使わず、リンクのみで軽く保つ。
 * 投稿画像はダウンロードして掲載しない（方針）。
 */
export default function InstagramSection() {
  const topics = [
    "買い物代行って、どんなときに使うの？",
    "「これって頼める？」こんなご依頼もOK",
    "なぜ、ライフサポート熊谷を始めるの？",
    "安心してご利用いただくための3つのお約束",
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <Reveal>
          <SectionHeading
            en="Instagram"
            title="日々の発信は、Instagramで。"
            lead="サービスの考え方や、よくあるご質問への回答を、イラストで分かりやすく投稿しています。ご相談もDMから受け付けています。"
          />
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-8">
            <InstagramIcon className="h-5 w-5" />
            {site.instagramId} を見る
            <ExternalIcon className="h-4 w-4 opacity-70" />
          </a>
        </Reveal>
        <Reveal delay={0.1}>
          <PhotoFrame
            photo={photos.toteGroceries}
            className="aspect-[16/10]"
            position="50% 50%"
            sizes="(min-width: 1024px) 34rem, 100vw"
            decorative
          />
          <ul className="mt-6 border-t hairline">
            {topics.map((t) => (
              <li key={t} className="border-b hairline">
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-14 items-center justify-between gap-4 py-4 text-[0.95rem]"
                >
                  <span className="underline-offset-4 group-hover:underline">{t}</span>
                  <ExternalIcon className="h-4 w-4 shrink-0 text-stone" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[12px] text-stone">投稿はInstagramで公開しています（外部サイトが開きます）。</p>
        </Reveal>
      </div>
    </section>
  );
}
