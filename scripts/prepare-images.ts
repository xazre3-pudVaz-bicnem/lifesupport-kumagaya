/**
 * public 直下に置かれた元写真（生成時のファイル名のまま）を、
 * 内容とSEOを考慮したファイル名に変更しつつ最適化して public/images に出力します。
 * 元写真は assets/originals に退避します（Git管理外）。
 *
 * 実行: npx tsx scripts/prepare-images.ts
 *
 * 出力方針:
 *   - 横長（16:9）はヒーロー用に幅2000、それ以外は幅1800
 *   - JPEG（mozjpeg・品質82）。WebP/AVIF への変換は next/image が担当する
 *   - 人物写真はトリミングせず、元の構図のまま縮小する（切り取りは表示側の object-position で行う）
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const ORIGINALS = path.join(ROOT, "assets", "originals");

const P = "ChatGPT Image 2026年8月23日 ";

/**
 * 切り出しが必要な写真。
 * 代表プロフィールはインフォグラフィック（文字入り）のため、
 * 人物部分だけを切り出して使う（文字は画像に頼らずHTMLで書く）。
 */
const CROPS: Record<string, { out: string; left: number; top: number; width: number; height: number }> = {
  "S__26247175.jpg": {
    out: "images/about/kumagaya-representative-saito-takumi.jpg",
    left: 45,
    top: 178,
    width: 395,
    height: 480,
  },
};

/** 元ファイル名 → 出力パス（public からの相対） */
const MAP: Record<string, string> = {
  // ---- ヒーロー（横長16:9・SPは4:3を使用） ----
  [`${P}10_45_50 (1).png`]: "images/hero/kumagaya-shopping-service-hero.jpg",
  [`${P}10_45_52 (8).png`]: "images/hero/kumagaya-delivery-receipt-check.jpg",
  [`${P}10_45_40 (1).png`]: "images/hero/kumagaya-delivery-paper-bag.jpg",

  // ---- お買い物（サービス） ----
  [`${P}10_45_51 (4).png`]: "images/service/kumagaya-staff-selecting-vegetables.jpg",
  [`${P}10_45_40 (2).png`]: "images/service/kumagaya-supermarket-shopping-basket.jpg",

  // ---- お届け ----
  [`${P}10_45_42 (8).png`]: "images/delivery/kumagaya-delivery-doorstep-smile.jpg",
  [`${P}10_45_41 (6).png`]: "images/delivery/kumagaya-delivery-heavy-drinks.jpg",
  [`${P}10_45_53 (10).png`]: "images/delivery/kumagaya-delivery-rice-and-water.jpg",

  // ---- ご本人（高齢者） ----
  [`${P}10_45_41 (4).png`]: "images/senior/kumagaya-senior-shopping-list-kitchen.jpg",
  [`${P}10_45_53 (9).png`]: "images/senior/kumagaya-senior-writing-memo.jpg",
  [`${P}10_45_42 (7).png`]: "images/senior/kumagaya-carrying-shopping-bags.jpg",

  // ---- ご家族 ----
  [`${P}10_45_41 (5).png`]: "images/family/kumagaya-family-smartphone-sofa.jpg",
  [`${P}10_45_51 (3).png`]: "images/family/kumagaya-family-smartphone-living.jpg",

  // ---- ご自宅で受け取る ----
  [`${P}10_45_42 (10).png`]: "images/home/kumagaya-unpacking-vegetables.jpg",
  [`${P}10_45_51 (2).png`]: "images/home/kumagaya-delivery-box-rice.jpg",

  // ---- 静物 ----
  [`${P}10_45_41 (3).png`]: "images/still/kumagaya-groceries-and-daily-goods.jpg",
  [`${P}10_45_52 (5).png`]: "images/still/kumagaya-tote-bag-groceries.jpg",
  [`${P}10_45_52 (6).png`]: "images/still/kumagaya-shopping-memo-vegetables.jpg",
  [`${P}10_45_42 (9).png`]: "images/still/kumagaya-shopping-list-and-tote.jpg",

  // ---- 地域 ----
  [`${P}10_45_52 (7).png`]: "images/area/kumagaya-residential-street.jpg",
};

async function convert(srcPath: string, outRel: string) {
  const out = path.join(PUBLIC, outRel);
  fs.mkdirSync(path.dirname(out), { recursive: true });

  const img = sharp(srcPath).rotate();
  const meta = await img.metadata();
  const wide = (meta.width ?? 0) / (meta.height ?? 1) > 1.6;

  const info = await img
    .resize({ width: wide ? 2000 : 1800, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(out);

  const kb = Math.round(info.size / 1024);
  console.log(`✓ ${outRel}  ${info.width}x${info.height}  ${kb}KB`);
  return { outRel, width: info.width, height: info.height };
}

/** 指定範囲を切り出して出力する（人物写真をトリミングしすぎないこと） */
async function cropOne(srcPath: string, c: (typeof CROPS)[string]) {
  const out = path.join(PUBLIC, c.out);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const info = await sharp(srcPath)
    .rotate()
    .extract({ left: c.left, top: c.top, width: c.width, height: c.height })
    .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(out);
  console.log(`✂ ${c.out}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`);
  return { outRel: c.out, width: info.width, height: info.height };
}

async function main() {
  fs.mkdirSync(ORIGINALS, { recursive: true });
  const results: { outRel: string; width: number; height: number }[] = [];
  const missing: string[] = [];

  // ---- 切り出しが必要な写真 ----
  for (const [src, c] of Object.entries(CROPS)) {
    const inPublic = path.join(PUBLIC, src);
    const inOriginals = path.join(ORIGINALS, src);
    const srcPath = fs.existsSync(inPublic) ? inPublic : fs.existsSync(inOriginals) ? inOriginals : null;
    if (!srcPath) {
      missing.push(src);
      continue;
    }
    results.push(await cropOne(srcPath, c));
    if (srcPath === inPublic) fs.renameSync(inPublic, inOriginals);
  }

  for (const [src, outRel] of Object.entries(MAP)) {
    const inPublic = path.join(PUBLIC, src);
    const inOriginals = path.join(ORIGINALS, src);
    const srcPath = fs.existsSync(inPublic) ? inPublic : fs.existsSync(inOriginals) ? inOriginals : null;
    if (!srcPath) {
      missing.push(src);
      continue;
    }
    results.push(await convert(srcPath, outRel));
    // public に残っている元ファイルは assets/originals へ退避する
    if (srcPath === inPublic) fs.renameSync(inPublic, inOriginals);
  }

  if (missing.length > 0) {
    console.warn(`\n見つからなかった元ファイル（${missing.length}件）:`);
    for (const m of missing) console.warn(`  - ${m}`);
  }

  console.log(`\n${results.length} 件を出力しました。`);
  console.log("src/data/photos.ts の width / height はこの値と一致させること。");
  const bySize = new Map<string, number>();
  for (const r of results) bySize.set(`${r.width}x${r.height}`, (bySize.get(`${r.width}x${r.height}`) ?? 0) + 1);
  for (const [size, count] of bySize) console.log(`  ${size} … ${count}件`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
