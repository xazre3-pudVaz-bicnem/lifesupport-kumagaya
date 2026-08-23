/**
 * 事業者の基本情報を一元管理する（NAP統一）。
 * 名称・エリア・連絡先・提供サービスの表記は必ずこのファイルを参照し、
 * ページごとの表記ゆれ・捏造を防ぐ。
 *
 * 出典：公式Instagram（@lifesupport_kumagaya）2026年8月時点の公開情報のみ。
 * Instagramで確認できない項目は null のままにし、画面・JSON-LDに出さない。
 * 未確認項目の一覧は TODO-CONTENT.md を参照。
 */

const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");

export const site = {
  /** 正式名称（「熊谷ライフサポート」など別事業者と混同しないこと） */
  name: "ライフサポート熊谷",
  nameEn: "LIFE SUPPORT KUMAGAYA",
  /** 検索結果・OGで事業内容まで伝える表記 */
  nameWithService: "ライフサポート熊谷｜熊谷市の買い物代行",
  /** 一言で言うと */
  tagline: "熊谷市の買い物代行サービス",

  /** 代表（Instagramプロフィールに記載） */
  representative: "齊藤 匠",

  /** 提供サービス。現時点では買い物代行のみ。ここ以外を提供サービスとして書かない */
  services: ["買い物代行"] as const,
  serviceType: "買い物代行",

  /**
   * 対応エリア。Instagramでは「熊谷市・深谷市・行田市・東松山市」と記載。
   * 熊谷市を中心エリアとし、他3市は同列に「対応エリア」として扱う。
   */
  areaMain: "熊谷市",
  areas: ["熊谷市", "深谷市", "行田市", "東松山市"] as const,
  prefecture: "埼玉県",

  /**
   * サービス開始。Instagramでは「2026年9月スタート予定」。
   * 開始後は status を "open" に変更し、文言を消す。
   */
  launch: {
    status: "pre-launch" as "pre-launch" | "open",
    label: "2026年9月スタート予定",
    note: "現在、ご相談・お問い合わせを受け付けています。",
  },

  /** 連絡先。電話番号はオーナー確認済み（2026年8月23日） */
  instagram: "https://www.instagram.com/lifesupport_kumagaya/",
  instagramId: "@lifesupport_kumagaya",
  instagramDm: "https://ig.me/m/lifesupport_kumagaya",
  /** 表示用（この表記でサイト全体・GoogleビジネスプロフィールのNAPを統一する） */
  tel: "080-1243-7154" as string | null,
  telLink: "tel:08012437154" as string | null,
  /** JSON-LD 用の国際表記 */
  telIntl: "+81-80-1243-7154",
  line: null as string | null,
  email: null as string | null,

  /** 住所・営業時間・料金・支払い方法は未確認（null） */
  address: null as string | null,
  hours: null as string | null,
  price: null as string | null,
  payment: null as string | null,

  /**
   * 公開URL（本番ドメイン。2026年8月23日にオーナー確認）。
   * canonical・OGP・sitemap・JSON-LD すべてこの値を基準にする。
   * プレビュー環境などで変えたい場合のみ NEXT_PUBLIC_SITE_URL で上書きする。
   */
  url: envUrl || "https://www.lifesupport2026.com",

  /** ブログの著者表記（資格表記はしない） */
  author: "ライフサポート熊谷",
} as const;

/**
 * 確認できた問い合わせ手段だけを返す。
 * 電話を先頭にするのは、利用される方ご本人にとって最も使いやすい手段のため。
 */
export function contactChannels() {
  const channels: { key: string; label: string; href: string; external: boolean; note?: string }[] = [];
  if (site.tel && site.telLink) {
    channels.push({ key: "tel", label: site.tel, href: site.telLink, external: false, note: "お電話でのご相談" });
  }
  channels.push({
    key: "instagram",
    label: "InstagramのDMで相談する",
    href: site.instagramDm,
    external: true,
    note: site.instagramId,
  });
  if (site.line) {
    channels.push({ key: "line", label: "LINEで相談する", href: site.line, external: true });
  }
  return channels;
}

export const areaLabel = site.areas.join("・");
