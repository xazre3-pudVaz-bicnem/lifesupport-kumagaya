import { site } from "@/data/site";
import { photos } from "@/data/photos";
import { representative } from "@/data/representative";
import type { BlogPost } from "@/lib/blog";

/**
 * 構造化データ（JSON-LD）。
 * - 介護・医療事業者と誤認される schema 型は使わない（Organization / LocalBusiness / Service のみ）
 * - 確認できていない情報（住所・電話・営業時間・評価）は出さない
 * - Service の serviceType は「買い物代行」固定
 */

export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;
export const SERVICE_ID = `${site.url}/#service`;
export const PERSON_ID = `${site.url}/message#person`;

/**
 * 代表者。E-E-A-T（経験・専門性・権威性・信頼性）の裏づけとして、
 * 資料で確認できた学歴・職歴・活動のみを記載する。
 * 保有資格は確認できていないため出さない。
 */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: representative.nameFlat,
    alternateName: representative.nameKana,
    jobTitle: "代表",
    description:
      "ライフサポート熊谷 代表。家族の介護をきっかけに福祉の道へ進み、ショートステイ・居宅介護・デイサービス・グループホーム・生活介護などの現場を経験。現在も福祉の現場に従事しながら、熊谷市で買い物代行サービスを運営している。",
    image: `${site.url}${photos.representative.src}`,
    url: `${site.url}/message`,
    birthDate: representative.birthDate,
    birthPlace: { "@type": "Place", name: representative.birthPlace },
    homeLocation: { "@type": "Place", name: `${site.prefecture}${site.areaMain}` },
    alumniOf: [
      { "@type": "EducationalOrganization", name: "桐生第一高等学校" },
      { "@type": "CollegeOrUniversity", name: "駿河台大学 メディア情報学部 メディア情報学科" },
    ],
    knowsAbout: ["買い物代行", "高齢者の生活支援", "介護・福祉の現場支援", "地域における孤立の防止"],
    worksFor: { "@id": ORG_ID },
    founderOf: { "@id": ORG_ID },
  };
}

function areaServed() {
  return site.areas.map((name) => ({
    "@type": "City",
    name,
    containedInPlace: { "@type": "AdministrativeArea", name: site.prefecture },
  }));
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": ORG_ID,
    name: site.name,
    alternateName: site.nameEn,
    url: site.url,
    logo: `${site.url}/icon-512.png`,
    image: `${site.url}/og.jpg`,
    description:
      "熊谷市を中心に、深谷市・行田市・東松山市で買い物代行を行う地域密着型サービス。食料品・日用品・重い物などの買い物を代わりに行い、ご自宅へお届けします。介護保険外のため、介護認定の有無を問わず利用できます。",
    areaServed: areaServed(),
    address: {
      "@type": "PostalAddress",
      addressCountry: "JP",
      addressRegion: site.prefecture,
      addressLocality: site.areaMain,
    },
    founder: { "@id": PERSON_ID },
    sameAs: [site.instagram],
    knowsAbout: ["買い物代行", "高齢者の買い物支援", "介護保険外サービス"],
    ...(site.tel ? { telephone: site.telIntl } : {}),
    ...(site.email ? { email: site.email } : {}),
  };
}

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": SERVICE_ID,
    name: "買い物代行（ライフサポート熊谷）",
    serviceType: site.serviceType,
    provider: { "@id": ORG_ID },
    areaServed: areaServed(),
    url: `${site.url}/shopping-support`,
    description:
      "食料品・日用品・ドラッグストアの商品・重い物などのお買い物を代わりに行い、ご自宅へお届けします。介護保険外サービスのため、介護認定の有無・年齢を問わず、ご本人・ご家族のどちらからでも依頼できます。",
    audience: {
      "@type": "Audience",
      audienceType: "買い物に行くのが大変な方、高齢の親を心配するご家族",
    },
    availableChannel: [
      ...(site.tel ? [{ "@type": "ServiceChannel", servicePhone: site.telIntl, name: "電話" }] : []),
      ...(site.email ? [{ "@type": "ServiceChannel", serviceUrl: `mailto:${site.email}`, name: "メール" }] : []),
      { "@type": "ServiceChannel", serviceUrl: site.instagramDm, name: "Instagram DM" },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    alternateName: site.nameWithService,
    url: site.url,
    inLanguage: "ja",
    publisher: { "@id": ORG_ID },
  };
}

export function webPageJsonLd(input: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "CollectionPage" | "ContactPage" | "FAQPage";
}) {
  const url = input.path === "/" ? `${site.url}/` : `${site.url}${input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: input.name,
    description: input.description,
    inLanguage: "ja",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.path === "/" ? `${site.url}/` : `${site.url}${c.path}`,
    })),
  };
}

export type FaqItem = { question: string; answer: string };

/** 画面に実際に表示しているFAQのみを渡すこと */
export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function blogPostingJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${site.url}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    inLanguage: "ja",
    image: `${site.url}${post.image || "/og.jpg"}`,
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    author: { "@type": "Organization", name: post.author || site.author, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: `${site.url}/icon-512.png` },
    },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };
}
