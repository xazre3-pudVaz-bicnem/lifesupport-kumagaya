import type { Metadata } from "next";
import { site } from "@/data/site";

/**
 * 下層ページの metadata を統一フォーマットで生成する。
 * title はサイト名だけにならないよう、各ページで具体的に指定する。
 */
export function pageMetadata(input: {
  /** 「｜ライフサポート熊谷」が自動で付く（layout の template） */
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  noindex?: boolean;
}): Metadata {
  const url = input.path === "/" ? "/" : input.path;
  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${input.title}｜${site.name}`,
      description: input.description,
      url,
      siteName: site.name,
      locale: "ja_JP",
      type: input.type ?? "website",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.nameWithService }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${input.title}｜${site.name}`,
      description: input.description,
      images: ["/og.jpg"],
    },
    ...(input.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
