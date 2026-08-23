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
 * （代表プロフィールは高解像度の原本を受領したため、現在は使用していない。
 *   資料からの切り出しが再び必要になった場合はここに定義する）
 */
const CROPS: Record<string, { out: string; left: number; top: number; width: number; height: number }> = {};

/**
 * 背景を差し替える写真。
 * 代表の写真は青いスタジオ背景で撮影されており、サイトの配色から浮くため、
 * 背景だけをブランドカラー（--color-mint）へ置き換える。
 */
const BG_REPLACE: Record<string, { out: string; bg: [number, number, number] }> = {
  "representative-saito-takumi-original.jpg": {
    out: "images/about/kumagaya-representative-saito-takumi.jpg",
    bg: [238, 246, 225], // --color-mint #eef6e1
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

/**
 * 青いスタジオ背景をブランドカラーへ差し替える。
 *
 * ネクタイの青ストライプは B-R が背景（約145）を上回る箇所すらあり、色だけでは分離できない。
 * そこで「背景色の連結領域のうち、外周に接するもの／面積が一定以上のもの」だけを背景とする。
 * この写真では 主背景 852,148px・脇の隙間 1,626px に対し、
 * ネクタイの断片は最大 325px なので、面積 800px を境に安全に分けられる。
 * 輪郭に残る青フチは、背景色を混ぜず「青みだけを中和」してディテールを保つ。
 */
async function replaceBackground(srcPath: string, cfg: (typeof BG_REPLACE)[string], minArea = 800) {
  const out = path.join(PUBLIC, cfg.out);
  fs.mkdirSync(path.dirname(out), { recursive: true });

  const { data, info } = await sharp(srcPath).rotate().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  const N = W * H;
  const bg = cfg.bg;

  // 背景色の候補
  const seed = new Uint8Array(N);
  for (let p = 0; p < N; p++) {
    const i = p * C;
    if (data[i + 2] - data[i] > 100 && data[i + 1] > 110) seed[p] = 1;
  }

  // 連結領域ごとに、外周接触または十分な面積があるものだけを背景と認める
  const label = new Int32Array(N).fill(-1);
  const core = new Uint8Array(N);
  let comp = 0;
  for (let s = 0; s < N; s++) {
    if (!seed[s] || label[s] !== -1) continue;
    const cells: number[] = [];
    const stack = [s];
    label[s] = comp;
    let touchesEdge = false;
    while (stack.length) {
      const p = stack.pop()!;
      cells.push(p);
      const x = p % W;
      const y = (p - x) / W;
      if (x === 0 || y === 0 || x === W - 1 || y === H - 1) touchesEdge = true;
      const nb: number[] = [];
      if (x > 0) nb.push(p - 1);
      if (x < W - 1) nb.push(p + 1);
      if (y > 0) nb.push(p - W);
      if (y < H - 1) nb.push(p + W);
      for (const q of nb) if (seed[q] && label[q] === -1) { label[q] = comp; stack.push(q); }
    }
    if (touchesEdge || cells.length >= minArea) for (const p of cells) core[p] = 1;
    comp++;
  }

  // 背景の縁から数px を「青みの中和」対象にする
  const BAND = 4;
  const dist = new Uint8Array(N).fill(255);
  let frontier: number[] = [];
  for (let p = 0; p < N; p++) if (core[p]) { dist[p] = 0; frontier.push(p); }
  for (let d = 1; d <= BAND && frontier.length; d++) {
    const next: number[] = [];
    for (const p of frontier) {
      const x = p % W;
      const y = (p - x) / W;
      const nb: number[] = [];
      if (x > 0) nb.push(p - 1);
      if (x < W - 1) nb.push(p + 1);
      if (y > 0) nb.push(p - W);
      if (y < H - 1) nb.push(p + W);
      for (const q of nb) if (dist[q] === 255) { dist[q] = d; next.push(q); }
    }
    frontier = next;
  }

  const buf = Buffer.alloc(N * 3);
  for (let p = 0, j = 0; p < N; p++, j += 3) {
    const i = p * C;
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];
    if (core[p]) {
      r = bg[0];
      g = bg[1];
      b = bg[2];
    } else if (dist[p] <= BAND) {
      const strength = (BAND + 1 - dist[p]) / (BAND + 1);
      if (b - (r + g) / 2 > 12) {
        const neutral = (r + g) / 2 + 12;
        b = Math.round(b - (b - neutral) * strength);
        if (b - r > 60 && g > 100) {
          r = Math.round(r + (bg[0] - r) * strength);
          g = Math.round(g + (bg[1] - g) * strength);
          b = Math.round(b + (bg[2] - b) * strength);
        }
      }
    }
    buf[j] = r;
    buf[j + 1] = g;
    buf[j + 2] = b;
  }

  const res = await sharp(buf, { raw: { width: W, height: H, channels: 3 } })
    .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(out);
  console.log(`◐ ${cfg.out}  ${res.width}x${res.height}  ${Math.round(res.size / 1024)}KB（背景を差し替え）`);
  return { outRel: cfg.out, width: res.width, height: res.height };
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

  // ---- 背景を差し替える写真 ----
  for (const [src, cfg] of Object.entries(BG_REPLACE)) {
    const inPublic = path.join(PUBLIC, src);
    const inOriginals = path.join(ORIGINALS, src);
    const srcPath = fs.existsSync(inPublic) ? inPublic : fs.existsSync(inOriginals) ? inOriginals : null;
    if (!srcPath) {
      missing.push(src);
      continue;
    }
    results.push(await replaceBackground(srcPath, cfg));
    if (srcPath === inPublic) fs.renameSync(inPublic, inOriginals);
  }

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
