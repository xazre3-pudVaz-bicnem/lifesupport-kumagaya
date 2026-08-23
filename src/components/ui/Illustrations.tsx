/**
 * ブランドイラスト（SVG・Server Component）。
 * public に写真素材が無いため、Instagramのイラスト調の世界観に合わせて
 * フラットで柔らかい買い物のモチーフを自作している。
 * 写真が提供されたら差し替える想定（TODO-CONTENT.md 参照）。
 */

type Props = { className?: string };

const C = {
  leaf: "#8cc63f",
  leafSoft: "#a8d468",
  sprout: "#d9ecb8",
  mint: "#eef6e1",
  moss: "#4f8a1f",
  cream: "#f6f3ea",
  sand: "#efe9dc",
  sandDeep: "#e3dbc8",
  ink: "#2b2e2a",
  orange: "#f0a35e",
  red: "#e2725b",
  bread: "#e7c98f",
  breadDeep: "#d4a86a",
  white: "#ffffff",
};

/** ヒーロー：若葉のマークが付いた買い物袋と、今日の食材 */
export function HeroIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 640 560" className={className} role="img" aria-labelledby="hero-ill-title">
      <title id="hero-ill-title">若葉のマークの付いた買い物袋に、長ねぎやパン、牛乳が入っているイラスト</title>
      {/* 背景の柔らかい面 */}
      <ellipse cx="330" cy="300" rx="290" ry="230" fill={C.mint} />
      <ellipse cx="200" cy="180" rx="120" ry="90" fill={C.sprout} opacity="0.45" />
      {/* 地面の影 */}
      <ellipse cx="330" cy="505" rx="200" ry="16" fill={C.ink} opacity="0.06" />

      {/* 長ねぎ */}
      <g transform="rotate(-14 250 300)">
        <rect x="238" y="60" width="22" height="250" rx="11" fill={C.white} />
        <rect x="238" y="60" width="22" height="150" rx="11" fill={C.leaf} />
        <path d="M249 62 c-18 -30 -22 -48 -14 -58 c10 6 16 26 14 58z" fill={C.leafSoft} />
        <path d="M249 62 c18 -30 22 -48 14 -58 c-10 6 -16 26 -14 58z" fill={C.moss} />
      </g>

      {/* バゲット */}
      <g transform="rotate(18 400 280)">
        <rect x="384" y="70" width="38" height="240" rx="19" fill={C.bread} />
        {[100, 140, 180, 220].map((y) => (
          <path key={y} d={`M392 ${y} q11 10 22 0`} stroke={C.breadDeep} strokeWidth="4" fill="none" strokeLinecap="round" />
        ))}
      </g>

      {/* にんじん */}
      <g transform="rotate(-4 320 250)">
        <path d="M308 120 l12 150 l12 -150 z" fill={C.orange} />
        <path d="M320 122 c-14 -28 -30 -40 -44 -42 c6 18 20 32 44 42z" fill={C.leaf} />
        <path d="M320 122 c14 -28 30 -40 44 -42 c-6 18 -20 32 -44 42z" fill={C.leafSoft} />
        <path d="M320 124 c-2 -34 -2 -60 0 -78" stroke={C.moss} strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>

      {/* 牛乳パック */}
      <g>
        <path d="M330 180 h78 v110 h-78z" fill={C.white} />
        <path d="M330 180 l14 -28 h50 l14 28z" fill={C.sand} />
        <rect x="330" y="232" width="78" height="14" fill={C.leaf} />
        <rect x="342" y="200" width="30" height="6" rx="3" fill={C.sandDeep} />
      </g>

      {/* 袋の持ち手 */}
      <path
        d="M245 262 c0 -52 34 -82 85 -82 c51 0 85 30 85 82"
        stroke={C.sandDeep}
        strokeWidth="16"
        fill="none"
        strokeLinecap="round"
      />
      {/* 袋本体 */}
      <path
        d="M168 262 h324 c8 0 14 6 13 14 l-22 212 c-1 8 -7 14 -15 14 h-276 c-8 0 -14 -6 -15 -14 l-22 -212 c-1 -8 5 -14 13 -14z"
        fill={C.cream}
      />
      {/* 袋の折り返し */}
      <path d="M168 262 h324 c8 0 14 6 13 14 l-2 20 h-346 l-2 -20 c-1 -8 5 -14 13 -14z" fill={C.sand} />
      {/* 袋の側面の影 */}
      <path d="M470 296 l-17 190 c-1 8 -7 14 -15 14 h-26 l22 -204z" fill={C.sand} opacity="0.6" />

      {/* 袋のマーク：若葉 */}
      <g transform="translate(330 400)">
        <circle r="46" fill={C.leaf} />
        <path d="M-4 24 c0 -30 16 -46 44 -46 c0 30 -16 46 -44 46z" fill={C.cream} />
        <path d="M-4 24 l32 -32" stroke={C.leaf} strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* りんご */}
      <g transform="translate(540 470)">
        <circle r="30" fill={C.red} />
        <circle cx="-10" cy="-10" r="8" fill={C.white} opacity="0.35" />
        <path d="M0 -28 c2 -12 8 -18 16 -20" stroke={C.moss} strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M2 -34 c10 -12 22 -14 30 -8 c-8 10 -20 12 -30 8z" fill={C.leaf} />
      </g>

      {/* 浮かぶ小さな葉 */}
      <g opacity="0.9">
        <path d="M96 120 c0 -18 10 -28 28 -28 c0 18 -10 28 -28 28z" fill={C.leafSoft} />
        <path d="M556 150 c0 -14 8 -22 22 -22 c0 14 -8 22 -22 22z" fill={C.sprout} />
        <path d="M120 420 c0 -12 7 -19 19 -19 c0 12 -7 19 -19 19z" fill={C.sprout} />
      </g>
    </svg>
  );
}

/** 家族向け：離れた二つの家をつなぐ点線 */
export function FamilyIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 520 300" className={className} role="img" aria-labelledby="family-ill-title">
      <title id="family-ill-title">遠くの家と熊谷の家が点線でつながっているイラスト</title>
      <ellipse cx="260" cy="160" rx="250" ry="120" fill={C.mint} />
      <ellipse cx="260" cy="252" rx="210" ry="10" fill={C.ink} opacity="0.05" />
      {/* 点線 */}
      <path
        d="M130 200 C 200 90, 320 90, 390 200"
        stroke={C.leaf}
        strokeWidth="4"
        strokeDasharray="2 12"
        strokeLinecap="round"
        fill="none"
      />
      {/* 小さな家（都市） */}
      <g transform="translate(60 150)">
        <rect x="0" y="40" width="110" height="70" rx="4" fill={C.white} />
        <path d="M-8 44 L55 0 L118 44z" fill={C.sand} />
        <rect x="44" y="72" width="22" height="38" rx="2" fill={C.sprout} />
        <rect x="14" y="56" width="18" height="16" rx="2" fill={C.mint} />
        <rect x="78" y="56" width="18" height="16" rx="2" fill={C.mint} />
      </g>
      {/* 熊谷の家 */}
      <g transform="translate(330 140)">
        <rect x="0" y="50" width="130" height="80" rx="4" fill={C.white} />
        <path d="M-10 54 L65 0 L140 54z" fill={C.leaf} />
        <rect x="54" y="84" width="24" height="46" rx="2" fill={C.sand} />
        <rect x="16" y="70" width="20" height="18" rx="2" fill={C.mint} />
        <rect x="94" y="70" width="20" height="18" rx="2" fill={C.mint} />
        {/* 玄関先の袋 */}
        <path d="M96 102 h28 l3 28 h-34z" fill={C.cream} />
        <path d="M102 102 v-5 a8 8 0 0 1 16 0 v5" stroke={C.sandDeep} strokeWidth="3" fill="none" />
        <circle cx="110" cy="118" r="6" fill={C.leaf} />
      </g>
      {/* 葉 */}
      <path d="M255 98 c0 -14 8 -22 22 -22 c0 14 -8 22 -22 22z" fill={C.leafSoft} />
    </svg>
  );
}

/** 小さな袋：Aboutや区切りの装飾 */
export function BagMark({ className }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="60" fill={C.mint} />
      <path d="M36 50 h48 l5 40 a4 4 0 0 1 -4 4 h-50 a4 4 0 0 1 -4 -4z" fill={C.cream} />
      <path d="M36 50 h48 l1 8 h-50z" fill={C.sand} />
      <path d="M46 50 v-7 a14 14 0 0 1 28 0 v7" stroke={C.sandDeep} strokeWidth="5" strokeLinecap="round" fill="none" />
      <circle cx="60" cy="74" r="11" fill={C.leaf} />
      <path d="M59 80 c0 -8 4 -12 12 -12 c0 8 -4 12 -12 12z" fill={C.cream} />
    </svg>
  );
}
