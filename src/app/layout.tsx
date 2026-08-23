import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Zen_Maru_Gothic } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/ui/JsonLd";
import { organizationJsonLd, serviceJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { site } from "@/data/site";
import "./globals.css";

const zenMaru = Zen_Maru_Gothic({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-zen-maru",
  display: "swap",
  preload: false,
});

const notoSans = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
  preload: false,
});

const TITLE = "熊谷市の買い物代行ならライフサポート熊谷｜高齢者の買い物支援";
const DESCRIPTION =
  "ライフサポート熊谷は、熊谷市を中心に深谷市・行田市・東松山市で買い物代行を行う地域密着型サービスです。食料品・日用品・重い物のお買い物をご自宅へ。介護保険外のため介護認定は不要。離れて暮らすご家族からのご依頼も。";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: TITLE,
    template: `%s｜${site.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    "熊谷 買い物代行",
    "熊谷市 買い物代行",
    "熊谷 高齢者 買い物代行",
    "熊谷市 高齢者 買い物支援",
    "熊谷 介護保険外サービス",
    "熊谷 生活支援",
    "ライフサポート熊谷",
  ],
  applicationName: site.name,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: site.name,
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.nameWithService }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${site.url}/feed.xml` },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#8cc63f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: 下の inline script が hydration 前に <html> へ
    // .js を付けるため、className の差分警告だけを抑止する
    <html lang="ja" className={`${zenMaru.variable} ${notoSans.variable}`} suppressHydrationWarning>
      <body className="bg-ivory font-sans text-ink antialiased">
        {/* JSが動く環境でだけ <html> に .js を付ける。スクロール出現（.reveal）は
            このクラス配下でのみ要素を隠すため、JS無効でも本文が見えなくならない */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={serviceJsonLd()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-ivory"
        >
          本文へスキップ
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
