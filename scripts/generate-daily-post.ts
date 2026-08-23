/**
 * 毎日1記事を Claude API で自動生成し、content/blog/ に Markdown で保存します。
 * GitHub Actions（.github/workflows/daily-blog.yml）から実行されます。
 *
 * 実行:  npx tsx scripts/generate-daily-post.ts
 *        npx tsx scripts/generate-daily-post.ts --dry-run   （APIを呼ばずプロンプト確認）
 * 必要な環境変数:
 *   - ANTHROPIC_API_KEY（必須。GitHub Actions Secrets から渡す。コードに書かない）
 *   - ANTHROPIC_MODEL（任意。未設定なら Haiku を使用）
 *
 * 方針:
 *   - コスト削減のためデフォルトは claude-haiku-4-5
 *   - トピッククラスター（A〜E）ごとにテーマを用意し、未使用のものから選ぶ
 *   - 生成前に既存記事の title / slug / targetKeyword / description / topicId を読み込み、
 *     モデルに渡してカニバリゼーションを避けさせる
 *   - 保存前にタイトル類似度・targetKeyword 重複・禁止表現を機械的にチェックし、問題があれば保存しない
 *     （失敗時は例外で終了し、空ファイルや不完全な記事は残さない）
 *   - 事業者の事実は src/data/site.ts と下記 FACTS のみ参照し、それ以外は書かせない（捏造防止）
 *   - 【最重要】提供サービスは買い物代行のみ。他サービスを提供しているかのような記述は禁止し、
 *     生成後にも正規表現で検出して保存を中止する
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Anthropic from "@anthropic-ai/sdk";
import { site } from "../src/data/site";
import { photos } from "../src/data/photos";

// ---- 設定 -------------------------------------------------------------
const DEFAULT_MODEL = "claude-haiku-4-5";
const MODEL = process.env.ANTHROPIC_MODEL?.trim() || DEFAULT_MODEL;

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/** 毎回のプロンプトに固定で含める、サービス範囲の制約 */
const SERVICE_CONSTRAINT =
  "ライフサポート熊谷が現在提供しているサービスは買い物代行のみである。掃除、洗濯、調理、通院同行・通院介助、送迎、介護タクシー、身体介護（入浴・排泄・移乗など）、服薬介助、医療行為、訪問介護、ケアマネジメントなどを提供している、または今後提供するかのように記述してはならない。ライフサポート熊谷を「介護事業所」「訪問介護事業所」「自費介護事業所」と表現してはならない。";

/**
 * 記事内で参照してよい事業者の事実（これ以外の事業者情報は書かせない）。
 * 出典：公式Instagram。変更があったら src/data/site.ts と合わせて更新すること。
 */
const FACTS = [
  `名称：${site.name}（Instagram ${site.instagramId}）。埼玉県熊谷市の買い物代行サービス`,
  `代表：${site.representative}。福祉・介護の現場経験から生まれた地域の買い物代行サービス`,
  `提供サービス：${site.services.join("・")}のみ（介護保険外サービス。介護認定は不要）`,
  `対応エリア：${site.areas.join("・")}（${site.launch.status === "pre-launch" ? site.launch.label : "サービス提供中"}）`,
  "買えるもの：食材・お惣菜・飲み物／日用品（トイレットペーパー・洗剤・シャンプーなど）／ドラッグストアの商品（マスク・衛生用品・サプリメントなど）／ペット用品・贈り物・季節の商品",
  "利用場面：体調不良のとき／仕事や育児で忙しいとき／重い物を運びたくないとき／外出が難しいとき／離れて暮らす家族の買い物を頼みたいとき",
  "大切にしていること：安心・丁寧・地域とのつながり。安心して「ちょっとお願い」と言える存在を目指している",
  "3つのお約束：商品とお金を丁寧に扱う／ご依頼内容をしっかり確認する／分からないことを勝手に判断しない（売り切れや指定商品が見つからないときは、できる限りお客様に確認してから対応する）",
  `依頼方法：電話（${site.tel}）またはInstagramのDM。ご本人からも、ご家族（遠方在住でも可）からも依頼できる`,
  "料金・お支払い方法・受付時間・当日対応の可否・定期利用の条件：未公開。記事では「ご相談時に案内」とだけ書き、金額や時間を創作しない",
  "所在地・メールアドレス・公式LINE：未公開。記事に書かない",
  "電話番号は公開しているが、記事本文には書かない（表記ゆれを防ぐため、連絡先は固定ページに集約する）。記事では「お電話またはInstagramのDMで相談できる」とだけ書く",
] as const;

/**
 * 制度・地域に関する事実（一次情報で確認済み。閲覧時点）。
 * 制度記事はこの範囲＋一般常識に留め、数値・条件を創作しない。
 */
const PUBLIC_FACTS = [
  "介護保険の訪問介護「生活援助」には買い物が含まれる（厚生労働省 老計第10号の例示：「買い物・薬の受け取り」「日常品等の買物」）。利用には要介護・要支援認定と、ケアプランへの位置づけが必要",
  "同居家族がいる場合、生活援助は原則として算定できない。家族が障害・疾病などで家事ができない等やむを得ない事情がある場合は例外的に利用できることがある（個別判断はケアマネジャー等）",
  "国の通知では、利用者以外（家族など）のための買い物や、日常生活の範囲を超える行為は生活援助に含まれない行為として例示されている",
  "熊谷市の介護保険の保険者は大里広域市町村圏組合（介護保険課 048-501-1330）。高齢者の総合相談窓口は大里広域地域包括支援センター（熊谷市内に複数）",
  "熊谷市には、おおむね65歳以上の一人暮らし高齢者等を対象とした「軽度生活援助」事業がある（買い物支援を含む。市の案内では1時間300円、月4時間・年度30時間まで、平日8:30〜17:00。介護保険の訪問介護対象者は利用不可）。窓口は長寿いきがい課 048-524-1398",
  "熊谷市の人口は189,391人（2026年8月1日時点・市公表）",
  "熊谷市は2018年7月23日に41.1℃を観測し、当時の国内最高気温を記録した",
  "ライフサポート熊谷は市の事業や介護保険とは関係のない民間サービスである。行政サービスと混同させない",
] as const;

/** 内部リンク（実在するページのみ） */
const INTERNAL_LINKS = [
  { url: "/", label: "トップページ（熊谷市の買い物代行 ライフサポート熊谷）" },
  { url: "/shopping-support", label: "買い物代行サービスの詳細（買えるもの・こんなとき・お約束）" },
  { url: "/for-seniors", label: "高齢者の買い物支援（ご本人向け）" },
  { url: "/for-family", label: "離れて暮らすご家族へ（家族からの依頼）" },
  { url: "/insurance-outside", label: "介護保険外の買い物支援について（制度の整理）" },
  { url: "/area/kumagaya", label: "熊谷市の買い物代行・生活支援（公的な相談先）" },
  { url: "/flow", label: "ご利用の流れ" },
  { url: "/faq", label: "よくある質問" },
  { url: "/about", label: "私たちについて（サービス開始の想い）" },
  { url: "/message", label: "代表挨拶（代表の経歴と、買い物代行を始めた理由）" },
  { url: "/contact", label: "お問い合わせ（電話・InstagramのDM）" },
];

// ---- トピックプール（トピッククラスター） ------------------------------
//
// 【重要・キーワードのすみ分け】
//  コアキーワードは固定ページ（ピラー）に集約する。
//   - TOP／/shopping-support …「熊谷 買い物代行」「熊谷市 買い物代行」
//   - /for-seniors …「熊谷 高齢者 買い物代行」「熊谷市 高齢者 買い物支援」
//   - /for-family …「熊谷 親 買い物代行」「離れて暮らす親 買い物」
//   - /insurance-outside …「熊谷 介護保険外サービス」「熊谷 自費介護」
//   - /area/kumagaya …「熊谷市 生活支援」「熊谷市 高齢者 サポート」
//  ブログはロングテール担当。固定ページの言い換え記事は作らない。
//  カテゴリー名は src/lib/blog.ts の BLOG_CATEGORIES と一致させること。

type Topic = {
  id: string;
  theme: string;
  targetKeyword: string;
  slugBase: string;
  category: string;
  /** 制度・行政の記述を含む記事（YMYL注意喚起を強める） */
  ymyl?: boolean;
};

const CAT = {
  A: "熊谷の買い物代行",
  B: "高齢者の生活支援",
  C: "ご家族向け",
  D: "介護保険外サービス",
  E: "熊谷の地域情報",
} as const;

const TOPICS: Topic[] = [
  // --- A. 熊谷×買い物代行 ---
  { id: "a-how-to-use", theme: "熊谷市で買い物代行を利用する方法｜依頼から受け取りまで", targetKeyword: "熊谷市 買い物代行 利用方法", slugBase: "kumagaya-shopping-service-how-to-use", category: CAT.A },
  { id: "a-senior-trouble", theme: "熊谷市で高齢者の買い物に困ったとき、最初に考えたい選択肢", targetKeyword: "熊谷市 高齢者 買い物 困った", slugBase: "kumagaya-senior-shopping-trouble", category: CAT.A },
  { id: "a-cannot-go", theme: "熊谷で買い物に行けないときの選択肢｜ネットスーパー・家族・代行の違い", targetKeyword: "熊谷 買い物に行けない", slugBase: "kumagaya-cannot-go-shopping-options", category: CAT.A },
  { id: "a-what-is", theme: "高齢者向け買い物代行とは？頼めること・頼めないこと", targetKeyword: "高齢者向け 買い物代行 とは", slugBase: "what-is-senior-shopping-service", category: CAT.A },
  { id: "a-merit", theme: "買い物代行を利用するメリットと、向いている人", targetKeyword: "買い物代行 メリット", slugBase: "shopping-service-merits", category: CAT.A },
  { id: "a-heavy-items", theme: "お米・飲料・洗剤。重い物だけ買い物代行に頼むという使い方", targetKeyword: "重い物 買い物代行", slugBase: "heavy-items-shopping-service", category: CAT.A },
  { id: "a-drugstore", theme: "体調がすぐれない日のドラッグストアの買い物を頼むには", targetKeyword: "ドラッグストア 買い物代行", slugBase: "drugstore-shopping-service", category: CAT.A },
  { id: "a-first-time", theme: "はじめて買い物代行を頼むときに、伝えておきたい5つのこと", targetKeyword: "買い物代行 初めて 伝えること", slugBase: "first-time-shopping-service-tips", category: CAT.A },
  { id: "a-sold-out", theme: "頼んだ商品が売り切れだったら？買い物代行の「確認」の大切さ", targetKeyword: "買い物代行 売り切れ 対応", slugBase: "shopping-service-sold-out", category: CAT.A },
  { id: "a-regular", theme: "定期的に買い物代行を頼むときの考え方｜頻度と頼む範囲", targetKeyword: "買い物代行 定期利用", slugBase: "regular-shopping-service", category: CAT.A },
  { id: "a-fukaya-gyoda", theme: "深谷市・行田市・東松山市でも買い物代行を頼めます", targetKeyword: "深谷市 行田市 東松山市 買い物代行", slugBase: "fukaya-gyoda-higashimatsuyama-shopping-service", category: CAT.A },
  { id: "a-busy-generation", theme: "高齢者だけじゃない。仕事や育児で忙しい週の買い物代行", targetKeyword: "買い物代行 忙しい 子育て", slugBase: "shopping-service-for-busy-people", category: CAT.A },

  // --- B. 高齢者の生活支援 ---
  { id: "b-why-hard", theme: "高齢になると買い物が大変になる理由｜荷物・移動・暑さ・体調", targetKeyword: "高齢者 買い物 大変 理由", slugBase: "why-shopping-gets-hard-with-age", category: CAT.B },
  { id: "b-heavy-no-push", theme: "重い買い物を無理して持ち帰らないために", targetKeyword: "高齢者 重い買い物 持ち帰り", slugBase: "seniors-avoid-carrying-heavy-shopping", category: CAT.B },
  { id: "b-summer-kumagaya", theme: "夏の熊谷で高齢者の買い物負担を減らす方法", targetKeyword: "熊谷 夏 高齢者 買い物", slugBase: "kumagaya-summer-senior-shopping", category: CAT.B },
  { id: "b-winter", theme: "冬の外出が難しいときの買い物方法", targetKeyword: "冬 高齢者 買い物 外出", slugBase: "winter-shopping-for-seniors", category: CAT.B },
  { id: "b-after-driving", theme: "車を運転しなくなった後の買い物方法｜熊谷での選択肢", targetKeyword: "運転免許 返納 買い物 高齢者", slugBase: "shopping-after-giving-up-driving", category: CAT.B },
  { id: "b-keep-going-out", theme: "買い物は「全部任せる」より「一部を頼む」。外出の習慣を残す考え方", targetKeyword: "高齢者 買い物 外出 習慣", slugBase: "keep-going-out-partial-support", category: CAT.B },
  { id: "b-one-person-household", theme: "一人暮らしの高齢者が買い物で困りやすい場面と備え", targetKeyword: "一人暮らし 高齢者 買い物", slugBase: "single-senior-shopping-preparation", category: CAT.B },
  { id: "b-sick-days", theme: "体調を崩した数日間、食料品と日用品をどうするか", targetKeyword: "体調不良 買い物 行けない", slugBase: "shopping-when-sick-for-a-few-days", category: CAT.B },
  { id: "b-couple", theme: "高齢のご夫婦世帯の買い物｜どちらかが動けなくなったとき", targetKeyword: "高齢夫婦 買い物 負担", slugBase: "elderly-couple-shopping", category: CAT.B },
  { id: "b-checklist", theme: "買い物の負担を感じ始めたら確認したいチェックリスト", targetKeyword: "高齢者 買い物 負担 チェック", slugBase: "shopping-burden-checklist", category: CAT.B },

  // --- C. 家族向け ---
  { id: "c-worried", theme: "離れて暮らす親の買い物が心配なとき、家族にできること", targetKeyword: "離れて暮らす親 買い物 心配", slugBase: "worried-about-parents-shopping", category: CAT.C },
  { id: "c-support-alone", theme: "熊谷で一人暮らしをする親を支える方法｜買い物から始める", targetKeyword: "熊谷 一人暮らし 親 支える", slugBase: "supporting-parent-living-alone-in-kumagaya", category: CAT.C },
  { id: "c-remote", theme: "遠方から親の買い物をサポートするには", targetKeyword: "遠方 親 買い物 サポート", slugBase: "remote-shopping-support-for-parents", category: CAT.C },
  { id: "c-still-fine", theme: "親が「まだ大丈夫」と言うときの買い物支援の始め方", targetKeyword: "親 まだ大丈夫 買い物 支援", slugBase: "when-parents-say-still-fine", category: CAT.C },
  { id: "c-working", theme: "仕事をしながら親の生活を支える方法｜全部を抱えない", targetKeyword: "仕事 親の生活 支える", slugBase: "supporting-parents-while-working", category: CAT.C },
  { id: "c-homecoming", theme: "帰省のたびのまとめ買いが限界に近いと感じたら", targetKeyword: "帰省 まとめ買い 親", slugBase: "homecoming-bulk-shopping-limit", category: CAT.C },
  { id: "c-netsuper", theme: "親がネットスーパーを使えないときの買い物の選択肢", targetKeyword: "親 ネットスーパー 使えない", slugBase: "when-parents-cannot-use-online-grocery", category: CAT.C },
  { id: "c-siblings", theme: "きょうだいで親の買い物を分担するときに決めておくこと", targetKeyword: "親の買い物 きょうだい 分担", slugBase: "sharing-parents-shopping-among-siblings", category: CAT.C },
  { id: "c-how-to-ask", theme: "家族が代わりに買い物代行を依頼するときの伝え方", targetKeyword: "買い物代行 家族 依頼", slugBase: "how-family-can-request-shopping-service", category: CAT.C },
  { id: "c-signs", theme: "帰省して気づく「冷蔵庫の変化」。親の買い物のサイン", targetKeyword: "親 冷蔵庫 変化 サイン", slugBase: "fridge-signs-of-parents-shopping-trouble", category: CAT.C },

  // --- D. 介護保険外サービス（制度：YMYL） ---
  { id: "d-what-is", theme: "介護保険外サービスとは？保険サービスとの違いを分かりやすく", targetKeyword: "介護保険外サービス とは", slugBase: "what-is-outside-insurance-service", category: CAT.D, ymyl: true },
  { id: "d-shopping-scope", theme: "買い物は介護保険でどこまで対応できる？生活援助の範囲", targetKeyword: "買い物 介護保険 どこまで", slugBase: "insurance-shopping-scope", category: CAT.D, ymyl: true },
  { id: "d-hard-to-ask", theme: "介護保険では頼みにくい日常のお困りごと｜買い物の例", targetKeyword: "介護保険 頼めないこと 買い物", slugBase: "daily-troubles-hard-to-ask-insurance", category: CAT.D, ymyl: true },
  { id: "d-jihi-vs-hoken", theme: "自費サービスと介護保険サービスの違い｜買い物で比べる", targetKeyword: "自費サービス 介護保険 違い", slugBase: "private-pay-vs-insurance-service", category: CAT.D, ymyl: true },
  { id: "d-choose", theme: "高齢者の生活支援サービスを選ぶポイント", targetKeyword: "高齢者 生活支援サービス 選び方", slugBase: "how-to-choose-senior-life-support", category: CAT.D, ymyl: true },
  { id: "d-family-living-together", theme: "同居家族がいると介護保険の買い物は頼めない？原則と例外", targetKeyword: "同居家族 生活援助 買い物", slugBase: "living-with-family-and-insurance-shopping", category: CAT.D, ymyl: true },
  { id: "d-no-certification", theme: "介護認定がなくても使える買い物のサポート", targetKeyword: "介護認定なし 買い物 サポート", slugBase: "shopping-support-without-certification", category: CAT.D, ymyl: true },
  { id: "d-combination", theme: "介護保険サービスと買い物代行を組み合わせる考え方", targetKeyword: "介護保険 買い物代行 併用", slugBase: "combining-insurance-and-shopping-service", category: CAT.D, ymyl: true },
  { id: "d-caremanager", theme: "ケアマネジャーに買い物の相談をするときに伝えたいこと", targetKeyword: "ケアマネジャー 買い物 相談", slugBase: "talking-to-care-manager-about-shopping", category: CAT.D, ymyl: true },

  // --- E. 熊谷地域情報（行政：YMYL） ---
  { id: "e-senior-support", theme: "熊谷市の高齢者向け生活支援｜公的サービスと民間の違い", targetKeyword: "熊谷市 高齢者 生活支援", slugBase: "kumagaya-senior-life-support-overview", category: CAT.E, ymyl: true },
  { id: "e-shopping-support", theme: "熊谷市の買い物支援について｜軽度生活援助と買い物代行", targetKeyword: "熊谷市 買い物支援", slugBase: "kumagaya-shopping-support-overview", category: CAT.E, ymyl: true },
  { id: "e-consult", theme: "熊谷市で日常生活に困ったときの相談先", targetKeyword: "熊谷市 高齢者 相談先", slugBase: "kumagaya-where-to-consult", category: CAT.E, ymyl: true },
  { id: "e-houkatsu", theme: "熊谷市の地域包括支援センターとは？どんなときに相談できる？", targetKeyword: "熊谷市 地域包括支援センター", slugBase: "kumagaya-community-support-center", category: CAT.E, ymyl: true },
  { id: "e-heat", theme: "日本一暑い街・熊谷で、夏の買い物をどう乗り切るか", targetKeyword: "熊谷 暑さ 買い物", slugBase: "kumagaya-heat-and-shopping", category: CAT.E },
  { id: "e-car-society", theme: "車社会の熊谷で、運転をやめた後の暮らしを考える", targetKeyword: "熊谷 車 運転 やめた後", slugBase: "kumagaya-life-after-driving", category: CAT.E },
];

/** 記事の構成パターン。毎回変える */
const STRUCTURES = [
  "結論→理由→具体的な状況→選択肢→熊谷という地域性→ライフサポート熊谷との関連（基本形）",
  "読者の悩み・場面の描写から始め、解決策を3つの見出しで示し、最後に熊谷での具体例",
  "Q&A形式を軸にする（H2を質問文にして、冒頭で端的に答える）。最後に短いまとめ",
  "比較形式（AとB）で違いを整理し、選び方を提案",
  "時系列（困り始め→家族の対応→限界→選択肢）で流れを追う",
  "5つのポイントを番号付きH2で列挙し、最後に一言",
  "チェックリスト形式（箇条書き中心）。各項目に短い解説を付ける",
];

/** 締めの誘導の角度。毎回変える（同じCTA文の使い回しを防ぐ） */
const CTA_ANGLES = [
  "InstagramのDMから「これって頼める？」と気軽に相談できることを案内する",
  "ご家族からでも依頼できることに触れ、家族向けページへ誘導する",
  "重い物だけ・暑い時期だけなど、部分的な利用から始められることを提案する",
  "介護認定がなくても使えることに触れ、介護保険外ページへ誘導する",
  "関連する固定ページ（ご利用の流れ・よくある質問）を読むよう促す",
  "CTAらしい文言は書かず、余韻のある一文で静かに終える",
];

/** カテゴリーごとのアイキャッチ候補。順番に回して偏りを防ぐ */
const IMAGE_POOL: Record<string, string[]> = {
  [CAT.A]: [
    photos.selectingVegetables.src,
    photos.groceriesAndGoods.src,
    photos.toteGroceries.src,
    photos.shoppingBasket.src,
  ],
  [CAT.B]: [
    photos.carryingBags.src,
    photos.shoppingListKitchen.src,
    photos.heavyDrinks.src,
    photos.writingMemo.src,
  ],
  [CAT.C]: [
    photos.familyLiving.src,
    photos.familySofa.src,
    photos.deliveryBoxRice.src,
    photos.doorstepSmile.src,
  ],
  [CAT.D]: [
    photos.memoVegetables.src,
    photos.listAndTote.src,
    photos.writingMemo.src,
    photos.unpackingVegetables.src,
  ],
  [CAT.E]: [
    photos.residentialStreet.src,
    photos.deliveryPaperBag.src,
    photos.riceAndWater.src,
    photos.doorstepSmile.src,
  ],
};

/** 生成結果に含まれていたら保存しない表現（提供サービスの捏造・資格詐称・テンプレ表現） */
const FORBIDDEN_PATTERNS: { re: RegExp; reason: string }[] = [
  {
    re: /ライフサポート熊谷(?:が|は|では|でも|なら|の)[^。\n]{0,40}(?:掃除|洗濯|調理|料理|通院|送迎|介護タクシー|入浴|排泄|移乗|服薬|身体介護|訪問介護|ケアプラン|ケアマネジメント|見守りサービス|安否確認サービス)[^。\n]{0,20}(?:提供|対応|行|サポート|お手伝い|可能|できます|承|引き受け)/,
    reason: "買い物代行以外のサービスを提供しているかのような記述",
  },
  { re: /(?:介護福祉士|看護師|ケアマネジャー|専門家|医師)(?:が)?監修/, reason: "確認できない資格・監修表記" },
  { re: /(?:自費介護事業所|訪問介護事業所|介護事業所)(?:である|です|として)/, reason: "介護事業所としての自称" },
  { re: /いかがでし(?:た)?でしょうか/, reason: "テンプレート表現" },
  { re: /近年[、，][^。]{0,20}(?:高まって|増えて|注目)/, reason: "テンプレート表現" },
  { re: /\d{2,4}-\d{2,4}-\d{3,4}/, reason: "電話番号らしき数字（事業者の電話番号は未公開）" },
  { re: /(?:利用料|料金|手数料)[^。\n]{0,15}\d[\d,]*\s*円/, reason: "料金の創作（未公開）" },
];

// ---- ユーティリティ ---------------------------------------------------
function today(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function stamp(): string {
  return today().replace(/-/g, "");
}

type ExistingPost = {
  topicId: string;
  date: string;
  title: string;
  slug: string;
  description: string;
  targetKeyword: string;
  category: string;
  keywords: string[];
  image: string;
};

/** 既存記事のメタ情報を読み込む（重複・類似判定に使用） */
function readExistingPosts(): ExistingPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf-8"));
      return {
        topicId: String(data.topicId ?? ""),
        date: String(data.date ?? ""),
        title: String(data.title ?? ""),
        slug: String(data.slug ?? file.replace(/\.md$/, "")),
        description: String(data.description ?? ""),
        targetKeyword: String(data.targetKeyword ?? ""),
        category: String(data.category ?? ""),
        keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
        image: String(data.image ?? ""),
      };
    });
}

/** 未使用トピックを優先し（カテゴリーが偏らないよう回す）、全て使用済みなら最も古いものを選ぶ */
function pickTopic(existing: ExistingPost[]): { topic: Topic; fresh: boolean } {
  const used = new Map<string, string>();
  for (const p of existing) {
    if (p.topicId && (!used.has(p.topicId) || p.date > (used.get(p.topicId) ?? ""))) used.set(p.topicId, p.date);
  }
  const unused = TOPICS.filter((t) => !used.has(t.id));
  if (unused.length > 0) {
    const recent = [...existing].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 2);
    const recentCats = new Set(recent.map((p) => p.category));
    const candidates = unused.filter((t) => !recentCats.has(t.category));
    const pool = candidates.length > 0 ? candidates : unused;
    const idx = used.size % pool.length;
    return { topic: pool[idx], fresh: true };
  }
  const sorted = [...TOPICS].sort((a, b) => (used.get(a.id) ?? "").localeCompare(used.get(b.id) ?? ""));
  return { topic: sorted[0], fresh: false };
}

function uniqueSlug(base: string): string {
  if (!fs.existsSync(path.join(BLOG_DIR, `${base}.md`))) return base;
  return `${base}-${stamp()}`;
}

/** カテゴリー内で使用回数の少ない写真を選ぶ（直近3記事と同じ写真は避ける） */
function pickImage(category: string, existing: ExistingPost[]): string {
  const pool = IMAGE_POOL[category] ?? IMAGE_POOL[CAT.A];
  const counts = new Map<string, number>();
  for (const p of existing) counts.set(p.image, (counts.get(p.image) ?? 0) + 1);
  const recent = new Set(
    [...existing].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3).map((p) => p.image),
  );
  const sorted = [...pool].sort((a, b) => (counts.get(a) ?? 0) - (counts.get(b) ?? 0));
  return sorted.find((src) => !recent.has(src)) ?? sorted[0];
}

/** 文字バイグラムの Jaccard 類似度（0〜1） */
function bigramSimilarity(a: string, b: string): number {
  const grams = (s: string) => {
    const t = s.replace(/\s/g, "");
    const set = new Set<string>();
    for (let i = 0; i < t.length - 1; i++) set.add(t.slice(i, i + 2));
    return set;
  };
  const ga = grams(a);
  const gb = grams(b);
  if (ga.size === 0 || gb.size === 0) return 0;
  let inter = 0;
  for (const g of ga) if (gb.has(g)) inter++;
  return inter / (ga.size + gb.size - inter);
}

/** モデル出力からJSONを取り出す（```フェンス等を除去） */
function extractJson(text: string): string {
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) return fence[1].trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end !== -1) return text.slice(start, end + 1);
  return text.trim();
}

/** 本文の軽い整形（frontmatter・h1・余分なフェンスを除去） */
function cleanBody(body: string): string {
  let b = body.trim();
  b = b.replace(/^---[\s\S]*?---\s*/, "");
  b = b.replace(/^```(?:markdown|md)?\s*/i, "").replace(/```\s*$/i, "");
  b = b.replace(/^#\s+.*$/m, "").trim();
  return b;
}

/** 本文中の内部リンクが実在ページのみか検証する */
function validateInternalLinks(body: string): string[] {
  const allowed = new Set(INTERNAL_LINKS.map((l) => l.url));
  const bad: string[] = [];
  for (const m of body.matchAll(/\]\(([^)\s]*)\)/g)) {
    const url = m[1];
    if (url.startsWith("/")) {
      if (!allowed.has(url)) bad.push(url);
    } else if (!/^https?:\/\/(?:www\.)?(?:mhlw\.go\.jp|city\.kumagaya\.lg\.jp|osato-k\.jp|pref\.saitama\.lg\.jp)\//.test(url)) {
      // 外部リンクは一次情報（厚労省・熊谷市・大里広域・埼玉県）のみ許可
      bad.push(url);
    }
  }
  return bad;
}

function findForbidden(text: string): string[] {
  return FORBIDDEN_PATTERNS.filter((p) => p.re.test(text)).map((p) => p.reason);
}

// ---- メイン -----------------------------------------------------------
async function main() {
  const dryRun = process.argv.includes("--dry-run") || process.env.DRY_RUN === "1";
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey && !dryRun) {
    console.error("ERROR: ANTHROPIC_API_KEY が設定されていません。");
    process.exit(1);
  }

  fs.mkdirSync(BLOG_DIR, { recursive: true });

  const existing = readExistingPosts();
  const { topic, fresh } = pickTopic(existing);
  const date = today();
  const slug = uniqueSlug(topic.slugBase);
  const image = pickImage(topic.category, existing);
  const structure = STRUCTURES[existing.length % STRUCTURES.length];
  const ctaAngle = CTA_ANGLES[existing.length % CTA_ANGLES.length];
  const pillar = INTERNAL_LINKS.find((l) => {
    if (topic.category === CAT.A) return l.url === "/shopping-support";
    if (topic.category === CAT.B) return l.url === "/for-seniors";
    if (topic.category === CAT.C) return l.url === "/for-family";
    if (topic.category === CAT.D) return l.url === "/insurance-outside";
    return l.url === "/area/kumagaya";
  })!;

  console.log("──────────────────────────────────────────────");
  console.log(`使用モデル (model)   : ${MODEL}`);
  console.log(`テーマ    (topic)    : ${topic.theme}`);
  console.log(`対策KW    (keyword)  : ${topic.targetKeyword}`);
  console.log(`カテゴリ  (category) : ${topic.category}`);
  console.log(`ピラー    (pillar)   : ${pillar.url}`);
  console.log(`slug                 : ${slug}`);
  console.log(`画像      (image)    : ${image}`);
  console.log(`構成      (structure): ${structure}`);
  console.log(`YMYL                 : ${topic.ymyl ? "yes" : "no"}`);
  console.log(`再執筆(全消化後)     : ${fresh ? "no" : "yes"}`);
  console.log("──────────────────────────────────────────────");

  const linkList = INTERNAL_LINKS.map((l) => `- ${l.label}: ${l.url}`).join("\n");
  const factList = FACTS.map((f) => `- ${f}`).join("\n");
  const publicFactList = PUBLIC_FACTS.map((f) => `- ${f}`).join("\n");
  const existingList = existing
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 80)
    .map((p) => `- 「${p.title}」(KW: ${p.targetKeyword || "-"} / topic: ${p.topicId || "-"} / ${p.description.slice(0, 50)}…)`)
    .join("\n");

  const system = [
    `あなたは埼玉県熊谷市の買い物代行サービス「${site.name}」に代わってブログを書く編集者です。`,
    "読者は、熊谷市とその周辺で「買い物に行くのが大変」と感じている方、熊谷に住む高齢の親を心配している遠方の家族、介護保険外のサービスを探している方、地域の支援者です。",
    "地域のサービスが自分たちの言葉で発信しているような、落ち着いた自然な文章を書きます。次のルールを厳守してください。",
    "",
    "【最重要：サービス範囲の制約】",
    `- ${SERVICE_CONSTRAINT}`,
    "- 「買い物代行」に関することだけを、ライフサポート熊谷のサービスとして書く。一般論として他のサービスに触れる場合は、「〜というサービスもあります」と第三者的に書き、ライフサポート熊谷とは切り離す",
    "",
    "【文章のルール】",
    "- 日本語で執筆する。本文（frontmatterを除く）は1,200〜2,000文字程度",
    "- 見出しは ## (H2) と ### (H3) で構成し、H1(#)は使わない",
    "- 冒頭の導入で結論（この記事で分かること）を先に、2〜3文で端的に述べる（AI検索に引用されやすい形）",
    "- 1記事1検索意図。与えられたテーマと対策キーワードだけに絞って書く",
    "- 対策キーワードはタイトル・導入・見出しのどれかに自然に含める。不自然な繰り返し・羅列は禁止",
    "- 本文中に地域名「熊谷市」を自然に含める（詰め込みは禁止）",
    "- 「いかがでしたでしょうか」「近年〜の重要性が高まっています」「〜と言えるでしょう」「ぜひ」の多用は禁止",
    "- 「おすすめです！」「No.1」「話題」「人気」「安心安全」など根拠のない表現は禁止",
    "- 一文は60文字以内を目安に。同じ結論の繰り返し、大げさな表現、水増しの一般論は禁止",
    "- 「介護される人」「お年寄り」「弱者」といった見下ろす表現は避け、尊厳を保つ言葉を使う（例：「いつもの暮らしを続けるために、買い物という一部分をサポート」）",
    "- 他社や競合を比較・批判する記述は禁止",
    "- 実体験風の創作（「先日お届けしたAさんが〜」など）、架空の利用者の声・事例は禁止",
    "- 指定された構成パターンに従い、前回までの記事と構成・見出しを変える",
    "",
    "【事実のルール（最重要）】",
    "- 事業者について書いてよい事実は、下記「事業者の事実」リストにあるものだけ",
    "- リストにない料金・営業時間・住所・電話番号・スタッフ・実績・利用者数・提携先・資格を創作することは絶対に禁止",
    "- 分からないことは書かない。料金や受付時間は「ご相談時にご案内」とだけ書く",
    "",
    "【制度・地域情報のルール（YMYL）】",
    "- 介護保険などの制度について書くときは、下記「制度・地域の事実」の範囲と、一般に知られている制度の枠組みだけを書く。数値・条件・割合を創作しない",
    "- 断定を避け、「一般に」「〜とされています」「個別の判断は地域包括支援センターやケアマネジャーに確認を」という表現を添える",
    "- 医療アドバイス、法律上の断定、認知症などについての診断的表現、特定の病名と結びつけた助言は禁止",
    "- 行政サービス（熊谷市の事業）とライフサポート熊谷を混同させない。ライフサポート熊谷は民間の買い物代行サービスであることを明確にする",
    "",
    "【事業者の事実】",
    factList,
    "",
    "【制度・地域の事実（一次情報で確認済み）】",
    publicFactList,
    "",
    "【内部リンク】",
    `- ピラーページ（${pillar.label}: ${pillar.url}）へのリンクを本文中に必ず1つ入れる`,
    "- そのほか文脈に合う内部リンクを1〜3個、Markdownリンク（[表示テキスト](URL)）で自然に挿入する",
    "- 使ってよい内部URLは下記のみ。外部リンクは厚生労働省・熊谷市・大里広域市町村圏組合・埼玉県の公式サイトのみ許可（それ以外は書かない）",
    "- アンカーテキストは具体的にし、「こちら」は使わない。毎回同じ文言にしない",
    linkList,
    "",
    "【キーワードのすみ分け】",
    "- この記事はロングテール担当。「熊谷 買い物代行」「熊谷市 買い物代行」を主題にした総合紹介記事にしない（それはトップページと /shopping-support の役割）",
    "- 高齢者の買い物支援の総合案内は /for-seniors、家族向けの総合案内は /for-family、介護保険外の制度整理は /insurance-outside、熊谷市の公的支援の総合案内は /area/kumagaya の役割。関連して触れる場合は深入りせずリンクする",
    "",
    "【締めの誘導（CTA）】",
    `- 今回の角度：${ctaAngle}`,
    "- 定型文の使い回しは禁止。記事の内容に合わせた自然な一段落にする",
    "",
    "【FAQ】",
    "- 読者が検索しそうな質問が本当にある場合のみ、faq を1〜3個付ける。必要なければ空配列にする",
    "- FAQの回答も「事業者の事実」「制度・地域の事実」の範囲内で書く",
  ].join("\n");

  const user = [
    `今日の記事テーマ：「${topic.theme}」`,
    `対策キーワード：「${topic.targetKeyword}」`,
    `カテゴリー：${topic.category}`,
    `構成パターン：${structure}`,
    topic.ymyl
      ? "※この記事は制度・行政に関わる内容を含みます。「制度・地域の事実」の範囲を超える数値や条件を書かず、末尾に「制度は変わることがあるため、最新の情報は各機関で確認してください」という趣旨の一文を入れてください。"
      : "",
    fresh ? "" : "※このテーマは過去に一度書いています。前回とは異なる切り口・見出し構成で、新しい観点から書き直してください。",
    "",
    "既存記事の一覧（これらと同じテーマ・同じ検索意図・似たタイトルの記事にしないこと。重なる場合は切り口を変えること）:",
    existingList || "（まだ記事はありません）",
    "",
    "次のJSON形式**のみ**を出力してください（前後に説明やコードフェンスを付けない）：",
    "{",
    '  "title": "28〜40文字程度の記事タイトル（対策キーワードを自然に含む・煽らない・同じ語を繰り返さない・既存記事と被らない）",',
    '  "description": "100〜125文字のメタディスクリプション（結論と「ライフサポート熊谷」を含む）",',
    '  "keywords": ["キーワード1", "キーワード2", "キーワード3", "キーワード4"],',
    '  "body": "Markdown本文（frontmatterやH1は含めない。## と ### の見出し、導入・本文・まとめ、内部リンクを含む1200〜2000字）",',
    '  "faq": [{"question": "質問文", "answer": "回答文"}]',
    "}",
  ].join("\n");

  if (dryRun) {
    console.log("（--dry-run）API は呼び出さず、プロンプトの確認のみ行います。");
    console.log(`system prompt: ${system.length} 文字 / user prompt: ${user.length} 文字`);
    console.log(`既存記事: ${existing.length} 件 / トピック総数: ${TOPICS.length} 件`);
    return;
  }

  const client = new Anthropic({ apiKey });
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 8000,
    temperature: 0.7,
    system,
    messages: [{ role: "user", content: user }],
  });

  const text = res.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");

  let parsed: {
    title: string;
    description: string;
    keywords: string[];
    body: string;
    faq?: { question: string; answer: string }[];
  };
  try {
    parsed = JSON.parse(extractJson(text));
  } catch (e) {
    console.error("ERROR: モデル出力のJSON解析に失敗しました。");
    console.error(text.slice(0, 800));
    throw e;
  }

  const title = String(parsed.title ?? "").trim();
  const description = String(parsed.description ?? "").trim();
  const keywords = Array.isArray(parsed.keywords)
    ? parsed.keywords.map((t) => String(t).trim()).filter(Boolean).slice(0, 6)
    : [];
  const body = cleanBody(String(parsed.body ?? ""));
  const faq = Array.isArray(parsed.faq)
    ? parsed.faq
        .map((f) => ({ question: String(f?.question ?? "").trim(), answer: String(f?.answer ?? "").trim() }))
        .filter((f) => f.question && f.answer)
        .slice(0, 3)
    : [];

  if (!title || body.length < 700) {
    throw new Error(`生成結果が不十分です（title: ${title ? "有" : "無"} / 本文長: ${body.length}）`);
  }

  // ---- 禁止表現（提供サービスの捏造・資格詐称・料金や電話番号の創作） ----
  const forbidden = findForbidden([title, description, body, ...faq.map((f) => `${f.question} ${f.answer}`)].join("\n"));
  if (forbidden.length > 0) {
    throw new Error(`禁止表現が含まれるため保存を中止しました: ${forbidden.join(" / ")}`);
  }

  // ---- 内部リンクの検証（存在しないページへのリンクは保存しない） ----
  const badLinks = validateInternalLinks(body);
  if (badLinks.length > 0) {
    throw new Error(`許可されていないリンクが含まれています: ${badLinks.join(", ")}`);
  }
  if (!body.includes(`](${pillar.url})`)) {
    throw new Error(`ピラーページ（${pillar.url}）へのリンクがありません`);
  }

  // ---- カニバリ防止：既存記事とのタイトル類似度・対策KW重複チェック ----
  for (const p of existing) {
    const sim = bigramSimilarity(title, p.title);
    if (sim >= 0.6) {
      throw new Error(`既存記事とタイトルの類似度が高いため保存を中止しました（${sim.toFixed(2)}）: 「${p.title}」`);
    }
    if (p.targetKeyword && p.targetKeyword === topic.targetKeyword && p.topicId !== topic.id) {
      throw new Error(`既存記事と対策キーワードが重複しています: ${topic.targetKeyword}`);
    }
  }

  const fileContent = matter.stringify(`\n${body}\n`, {
    title,
    slug,
    description,
    date,
    updatedAt: date,
    category: topic.category,
    keywords,
    targetKeyword: topic.targetKeyword,
    image,
    author: site.author,
    topicId: topic.id,
    pillar: pillar.url,
    ...(faq.length > 0 ? { faq } : {}),
  });

  const outPath = path.join(BLOG_DIR, `${slug}.md`);
  fs.writeFileSync(outPath, fileContent, "utf-8");

  const bodyChars = body.replace(/\s/g, "").length;
  console.log("✓ 生成完了");
  console.log(`  ファイル (file)     : content/blog/${slug}.md`);
  console.log(`  タイトル (title)    : ${title}`);
  console.log(`  本文文字数 (chars)  : 約 ${bodyChars} 文字`);
  console.log(`  FAQ                 : ${faq.length} 件`);
  console.log(`  使用モデル (model)  : ${MODEL}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
