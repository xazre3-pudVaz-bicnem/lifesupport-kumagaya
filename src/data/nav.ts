export type NavItem = { href: string; label: string; en: string };

/** ヘッダー・フッター・モバイルメニューで共有するナビゲーション */
export const NAV: NavItem[] = [
  { href: "/shopping-support", label: "買い物代行について", en: "Service" },
  { href: "/for-seniors", label: "高齢者の買い物支援", en: "Seniors" },
  { href: "/for-family", label: "離れて暮らすご家族へ", en: "Family" },
  { href: "/insurance-outside", label: "介護保険外の買い物", en: "Insurance" },
  { href: "/flow", label: "ご利用の流れ", en: "Flow" },
  { href: "/about", label: "私たちについて", en: "About" },
  { href: "/message", label: "代表挨拶", en: "Message" },
  { href: "/faq", label: "よくある質問", en: "FAQ" },
  { href: "/blog", label: "お役立ち情報", en: "Blog" },
];

export const FOOTER_SUB: NavItem[] = [
  { href: "/area/kumagaya", label: "熊谷市の買い物代行・生活支援", en: "Area" },
  { href: "/contact", label: "お問い合わせ", en: "Contact" },
  { href: "/privacy", label: "プライバシーポリシー", en: "Privacy" },
];
