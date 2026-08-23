/**
 * 写真の一元管理。
 * public/images 配下の最適化済み写真を、用途・alt・サイズとともに定義する。
 * alt は検索語の羅列ではなく、写真の内容を自然な日本語で説明する。
 *
 * 注意：掲載写真はサービス内容を伝えるためのイメージ写真であり、
 * 実在のスタッフ・利用者・制服を撮影したものではない。
 * そのため alt でも「ライフサポート熊谷のスタッフが」と断定しない。
 * 実写が用意でき次第 scripts/prepare-images.ts の MAP を差し替える。
 */

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** 4:3 の写真 */
const W = 1448;
const H = 1086;
/** 16:9 の写真 */
const WW = 1672;
const WH = 941;

export const photos = {
  // ---- 代表（実写。イメージ写真ではない） ----
  representative: {
    src: "/images/about/kumagaya-representative-saito-takumi.jpg",
    alt: "ライフサポート熊谷 代表の齊藤匠。緑の木々を背景に、スーツ姿で微笑んでいる",
    width: 395,
    height: 480,
  },

  // ---- ヒーロー ----
  /** PC用ヒーロー（16:9・左に余白があり文字を載せられる） */
  hero: {
    src: "/images/hero/kumagaya-shopping-service-hero.jpg",
    alt: "玄関先で、買い物代行のスタッフが野菜や飲み物の入ったトートバッグを高齢の女性に手渡している様子",
    width: WW,
    height: WH,
  },
  /** SP用ヒーロー（4:3・人物が大きく写る） */
  heroSp: {
    src: "/images/hero/kumagaya-delivery-receipt-check.jpg",
    alt: "玄関先で、買い物代行のスタッフがレシートを見せながら、野菜の入った袋を高齢の女性に手渡している様子",
    width: W,
    height: H,
  },
  /** 紙袋を手渡す（16:9） */
  deliveryPaperBag: {
    src: "/images/hero/kumagaya-delivery-paper-bag.jpg",
    alt: "住宅街の玄関先で、買い物代行のスタッフが野菜の入った紙袋を高齢の女性に手渡し、笑顔で言葉を交わしている様子",
    width: WW,
    height: WH,
  },

  // ---- お買い物（サービス） ----
  selectingVegetables: {
    src: "/images/service/kumagaya-staff-selecting-vegetables.jpg",
    alt: "スーパーの野菜売り場で、買い物代行の担当者が買い物かごを持ち、依頼された小松菜を選んでいる様子",
    width: W,
    height: H,
  },
  shoppingBasket: {
    src: "/images/service/kumagaya-supermarket-shopping-basket.jpg",
    alt: "スーパーの売り場で、買い物かごに野菜を入れながら商品を選んでいる様子",
    width: W,
    height: H,
  },

  // ---- お届け ----
  doorstepSmile: {
    src: "/images/delivery/kumagaya-delivery-doorstep-smile.jpg",
    alt: "玄関先で、買い物代行のスタッフが野菜の入った紙袋を高齢の女性に手渡している様子",
    width: W,
    height: H,
  },
  heavyDrinks: {
    src: "/images/delivery/kumagaya-delivery-heavy-drinks.jpg",
    alt: "玄関先で、飲み物のペットボトルとトイレットペーパーを抱えたスタッフが、高齢の女性へ届けている様子",
    width: W,
    height: H,
  },
  riceAndWater: {
    src: "/images/delivery/kumagaya-delivery-rice-and-water.jpg",
    alt: "玄関先で、お米・トイレットペーパー・お茶のペットボトルを載せたケースを、スタッフが高齢の女性へ届けている様子",
    width: W,
    height: H,
  },

  // ---- ご本人（高齢者） ----
  shoppingListKitchen: {
    src: "/images/senior/kumagaya-senior-shopping-list-kitchen.jpg",
    alt: "明るいキッチンで、高齢の女性が買い物メモを書いている様子。そばには野菜の入ったトートバッグ",
    width: W,
    height: H,
  },
  writingMemo: {
    src: "/images/senior/kumagaya-senior-writing-memo.jpg",
    alt: "自宅のキッチンカウンターで、高齢の女性がノートに買い物のメモを書いている様子",
    width: W,
    height: H,
  },
  carryingBags: {
    src: "/images/senior/kumagaya-carrying-shopping-bags.jpg",
    alt: "住宅街の道を、買い物袋を両手に提げて歩いて帰る後ろ姿",
    width: W,
    height: H,
  },

  // ---- ご家族 ----
  familySofa: {
    src: "/images/family/kumagaya-family-smartphone-sofa.jpg",
    alt: "自宅のソファで、女性がスマートフォンを見ながら微笑んでいる様子",
    width: W,
    height: H,
  },
  familyLiving: {
    src: "/images/family/kumagaya-family-smartphone-living.jpg",
    alt: "リビングのテーブルで、女性がスマートフォンを操作しながら微笑んでいる様子",
    width: W,
    height: H,
  },

  // ---- ご自宅で受け取る ----
  unpackingVegetables: {
    src: "/images/home/kumagaya-unpacking-vegetables.jpg",
    alt: "自宅のリビングで、届いた箱から野菜を取り出している様子",
    width: W,
    height: H,
  },
  deliveryBoxRice: {
    src: "/images/home/kumagaya-delivery-box-rice.jpg",
    alt: "自宅のテーブルで、届いた箱から葉物野菜を取り出す高齢の女性。手前にはお米とトイレットペーパー",
    width: W,
    height: H,
  },

  // ---- 静物 ----
  groceriesAndGoods: {
    src: "/images/still/kumagaya-groceries-and-daily-goods.jpg",
    alt: "テーブルに並んだ買い物の品。野菜、果物、卵、お肉、パン、飲み物、洗剤やティッシュなどの日用品",
    width: W,
    height: H,
  },
  toteGroceries: {
    src: "/images/still/kumagaya-tote-bag-groceries.jpg",
    alt: "テーブルに置かれたトートバッグ。長ねぎやパプリカなどの野菜と、調味料や洗剤が入っている",
    width: W,
    height: H,
  },
  memoVegetables: {
    src: "/images/still/kumagaya-shopping-memo-vegetables.jpg",
    alt: "「買い物メモ」と書かれたノートと、レタスやパプリカなどの野菜を並べた様子",
    width: W,
    height: H,
  },
  listAndTote: {
    src: "/images/still/kumagaya-shopping-list-and-tote.jpg",
    alt: "買い物リストを書いたノートと、野菜や飲み物を入れたトートバッグを並べた様子",
    width: W,
    height: H,
  },

  // ---- 地域 ----
  residentialStreet: {
    src: "/images/area/kumagaya-residential-street.jpg",
    alt: "緑の多い住宅街の道を、買い物袋を提げて歩いている後ろ姿",
    width: W,
    height: H,
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/**
 * 掲載写真に添える注記。
 * 代表者の写真は実写のため、対象を「お買い物・お届けの様子」に限定して書く。
 */
export const PHOTO_NOTE = "※お買い物やお届けの様子の写真はイメージです。";
