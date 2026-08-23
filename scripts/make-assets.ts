/**
 * OGP画像・アイコンを SVG から生成します（sharp）。
 *   npx tsx scripts/make-assets.ts
 * 生成物:
 *   public/og.jpg (1200x630), public/icon-192.png, public/icon-512.png,
 *   src/app/icon.png (32x32 favicon), src/app/apple-icon.png (180x180)
 * 写真素材が届いたら og.jpg を差し替えてよい。
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const APP = path.join(ROOT, "src", "app");

const C = {
  leaf: "#8cc63f",
  leafSoft: "#a8d468",
  sprout: "#d9ecb8",
  mint: "#eef6e1",
  moss: "#4f8a1f",
  cream: "#f6f3ea",
  sand: "#efe9dc",
  sandDeep: "#e3dbc8",
  ivory: "#fbfaf6",
  ink: "#2b2e2a",
  inkSoft: "#585d55",
  orange: "#f0a35e",
  red: "#e2725b",
  bread: "#e7c98f",
  breadDeep: "#d4a86a",
  white: "#ffffff",
};

const FONT = `'Yu Gothic UI', 'Yu Gothic', 'Meiryo', 'Hiragino Sans', 'Noto Sans JP', sans-serif`;

/** ロゴマーク（icons.tsx の LogoMark と同じ形） */
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

/** ヒーローと同じ買い物袋のイラスト */
function bagIllustration() {
  return `
  <ellipse cx="330" cy="300" rx="290" ry="230" fill="${C.mint}" />
  <ellipse cx="330" cy="505" rx="200" ry="16" fill="${C.ink}" opacity="0.06" />
  <g transform="rotate(-14 250 300)">
    <rect x="238" y="60" width="22" height="250" rx="11" fill="${C.white}" />
    <rect x="238" y="60" width="22" height="150" rx="11" fill="${C.leaf}" />
    <path d="M249 62 c-18 -30 -22 -48 -14 -58 c10 6 16 26 14 58z" fill="${C.leafSoft}" />
    <path d="M249 62 c18 -30 22 -48 14 -58 c-10 6 -16 26 -14 58z" fill="${C.moss}" />
  </g>
  <g transform="rotate(18 400 280)">
    <rect x="384" y="70" width="38" height="240" rx="19" fill="${C.bread}" />
    ${[100, 140, 180, 220].map((y) => `<path d="M392 ${y} q11 10 22 0" stroke="${C.breadDeep}" stroke-width="4" fill="none" stroke-linecap="round" />`).join("")}
  </g>
  <g transform="rotate(-4 320 250)">
    <path d="M308 120 l12 150 l12 -150 z" fill="${C.orange}" />
    <path d="M320 122 c-14 -28 -30 -40 -44 -42 c6 18 20 32 44 42z" fill="${C.leaf}" />
    <path d="M320 122 c14 -28 30 -40 44 -42 c-6 18 -20 32 -44 42z" fill="${C.leafSoft}" />
  </g>
  <g>
    <path d="M330 180 h78 v110 h-78z" fill="${C.white}" />
    <path d="M330 180 l14 -28 h50 l14 28z" fill="${C.sand}" />
    <rect x="330" y="232" width="78" height="14" fill="${C.leaf}" />
  </g>
  <path d="M245 262 c0 -52 34 -82 85 -82 c51 0 85 30 85 82" stroke="${C.sandDeep}" stroke-width="16" fill="none" stroke-linecap="round" />
  <path d="M168 262 h324 c8 0 14 6 13 14 l-22 212 c-1 8 -7 14 -15 14 h-276 c-8 0 -14 -6 -15 -14 l-22 -212 c-1 -8 5 -14 13 -14z" fill="${C.cream}" />
  <path d="M168 262 h324 c8 0 14 6 13 14 l-2 20 h-346 l-2 -20 c-1 -8 5 -14 13 -14z" fill="${C.sand}" />
  <g transform="translate(330 400)">
    <circle r="46" fill="${C.leaf}" />
    <path d="M-4 24 c0 -30 16 -46 44 -46 c0 30 -16 46 -44 46z" fill="${C.cream}" />
    <path d="M-4 24 l32 -32" stroke="${C.leaf}" stroke-width="4" stroke-linecap="round" />
  </g>
  <g transform="translate(540 470)">
    <circle r="30" fill="${C.red}" />
    <circle cx="-10" cy="-10" r="8" fill="${C.white}" opacity="0.35" />
    <path d="M2 -34 c10 -12 22 -14 30 -8 c-8 10 -20 12 -30 8z" fill="${C.leaf}" />
  </g>`;
}

function ogSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${C.ivory}" />
  <circle cx="1010" cy="330" r="360" fill="${C.mint}" />
  <g transform="translate(640 40) scale(0.95)">${bagIllustration()}</g>
  <g transform="translate(80 96)">${logoMark(64, 18)}</g>
  <text x="160" y="128" font-family="${FONT}" font-size="30" font-weight="700" fill="${C.ink}" letter-spacing="2">ライフサポート熊谷</text>
  <text x="160" y="160" font-family="${FONT}" font-size="16" fill="${C.moss}" letter-spacing="3">LIFE SUPPORT KUMAGAYA</text>
  <text x="80" y="300" font-family="${FONT}" font-size="66" font-weight="700" fill="${C.ink}" letter-spacing="2">「ちょっとお願い」が</text>
  <text x="80" y="388" font-family="${FONT}" font-size="66" font-weight="700" fill="${C.ink}" letter-spacing="2">言える、熊谷に。</text>
  <rect x="80" y="436" width="48" height="4" rx="2" fill="${C.leaf}" />
  <text x="80" y="490" font-family="${FONT}" font-size="28" font-weight="700" fill="${C.moss}" letter-spacing="2">熊谷市の買い物代行</text>
  <text x="80" y="534" font-family="${FONT}" font-size="20" fill="${C.inkSoft}" letter-spacing="1">食料品・日用品・重い物を、ご自宅へ。介護認定は不要。</text>
  <text x="80" y="568" font-family="${FONT}" font-size="18" fill="${C.inkSoft}" letter-spacing="1">熊谷市・深谷市・行田市・東松山市</text>
</svg>`;
}

function iconSvg(size: number) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 48 48">${logoMark(48, 12)}</svg>`;
}

async function main() {
  fs.mkdirSync(PUBLIC, { recursive: true });

  await sharp(Buffer.from(ogSvg()), { density: 144 })
    .resize(1200, 630)
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(PUBLIC, "og.jpg"));
  console.log("✓ public/og.jpg");

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
