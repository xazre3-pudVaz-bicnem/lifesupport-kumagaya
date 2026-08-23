/**
 * OGP画像・アイコンを生成します（sharp）。
 *   npx tsx scripts/make-assets.ts
 *
 * 生成物:
 *   public/og.jpg (1200x630 / ヒーロー写真＋コピー)
 *   public/icon-192.png, public/icon-512.png
 *   src/app/icon.png (favicon), src/app/apple-icon.png
 *
 * 前提: scripts/prepare-images.ts を先に実行し、public/images が存在すること。
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const APP = path.join(ROOT, "src", "app");

const C = {
  leaf: "#8cc63f",
  moss: "#4f8a1f",
  ivory: "#fbfaf6",
  ink: "#2b2e2a",
  inkSoft: "#585d55",
};

const FONT = `'Yu Gothic UI', 'Yu Gothic', 'Meiryo', 'Hiragino Sans', 'Noto Sans JP', sans-serif`;

/** ロゴマーク（src/components/ui/icons.tsx の LogoMark と同じ形） */
function logoMark(size: number, radius = size * 0.25) {
  const s = size / 48;
  return `
  <g transform="scale(${s})">
    <rect x="0" y="0" width="48" height="48" rx="${radius / s}" fill="${C.leaf}" />
    <path d="M17 19.5h14l1.8 13.2a2 2 0 0 1-2 2.3H17.2a2 2 0 0 1-2-2.3z" fill="${C.ivory}" />
    <path d="M19.5 19.5v-2.3a4.5 4.5 0 0 1 9 0v2.3" fill="none" stroke="${C.ivory}" stroke-width="2.2" stroke-linecap="round" />
    <path d="M24 31.5c0-4.2 2.4-6.6 6.4-6.6 0 4.2-2.4 6.6-6.4 6.6z" fill="${C.leaf}" />
    <path d="M24 31.3l4.6-4.6" stroke="${C.ivory}" stroke-width="1.1" stroke-linecap="round" />
  </g>`;
}

/** 写真の上に重ねる、左からのグラデーションと文字 */
function ogOverlay() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${C.ivory}" stop-opacity="1" />
      <stop offset="42%" stop-color="${C.ivory}" stop-opacity="0.97" />
      <stop offset="62%" stop-color="${C.ivory}" stop-opacity="0.72" />
      <stop offset="100%" stop-color="${C.ivory}" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#fade)" />
  <g transform="translate(72 74)">${logoMark(56, 16)}</g>
  <text x="144" y="102" font-family="${FONT}" font-size="27" font-weight="700" fill="${C.ink}" letter-spacing="2">ライフサポート熊谷</text>
  <text x="144" y="130" font-family="${FONT}" font-size="14" fill="${C.moss}" letter-spacing="3">LIFE SUPPORT KUMAGAYA</text>
  <text x="72" y="286" font-family="${FONT}" font-size="62" font-weight="700" fill="${C.ink}" letter-spacing="2">「ちょっとお願い」が</text>
  <text x="72" y="368" font-family="${FONT}" font-size="62" font-weight="700" fill="${C.ink}" letter-spacing="2">言える、熊谷に。</text>
  <rect x="72" y="414" width="44" height="4" rx="2" fill="${C.leaf}" />
  <text x="72" y="470" font-family="${FONT}" font-size="27" font-weight="700" fill="${C.moss}" letter-spacing="2">熊谷市の買い物代行</text>
  <text x="72" y="514" font-family="${FONT}" font-size="19" fill="${C.inkSoft}" letter-spacing="1">食料品・日用品・重い物を、ご自宅へ。介護認定は不要。</text>
  <text x="72" y="550" font-family="${FONT}" font-size="17" fill="${C.inkSoft}" letter-spacing="1">熊谷市・深谷市・行田市・東松山市</text>
</svg>`;
}

function iconSvg(size: number) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 48 48">${logoMark(48, 12)}</svg>`;
}

async function main() {
  fs.mkdirSync(PUBLIC, { recursive: true });

  // ---- OGP（ヒーロー写真の上にコピーを載せる） ----
  const heroPath = path.join(PUBLIC, "images", "hero", "kumagaya-shopping-service-hero.jpg");
  if (!fs.existsSync(heroPath)) {
    throw new Error(`ヒーロー写真が見つかりません: ${heroPath}\n先に npx tsx scripts/prepare-images.ts を実行してください。`);
  }
  const photoBase = await sharp(heroPath)
    .resize(1200, 630, { fit: "cover", position: "right top" })
    .toBuffer();

  await sharp(photoBase)
    .composite([{ input: Buffer.from(ogOverlay()), left: 0, top: 0 }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(PUBLIC, "og.jpg"));
  console.log("✓ public/og.jpg");

  // ---- アイコン ----
  for (const [file, size] of [
    ["icon-192.png", 192],
    ["icon-512.png", 512],
  ] as const) {
    await sharp(Buffer.from(iconSvg(size)), { density: 300 }).resize(size, size).png().toFile(path.join(PUBLIC, file));
    console.log(`✓ public/${file}`);
  }
  await sharp(Buffer.from(iconSvg(64)), { density: 300 }).resize(64, 64).png().toFile(path.join(APP, "icon.png"));
  console.log("✓ src/app/icon.png");
  await sharp(Buffer.from(iconSvg(180)), { density: 300 }).resize(180, 180).png().toFile(path.join(APP, "apple-icon.png"));
  console.log("✓ src/app/apple-icon.png");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
