# ライフサポート熊谷 公式サイト

熊谷市の買い物代行サービス「ライフサポート熊谷」の公式サイト。
Next.js (App Router) + TypeScript + Tailwind CSS v4。Vercel でホスティング、GitHub Actions で毎日ブログを自動生成。

## 開発

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
npm run images     # public 直下の元写真を public/images へ最適化（sharp）
npm run assets     # OGP画像・アイコンを再生成（ヒーロー写真＋コピー）
```

環境変数は `.env.example` を参照。

## ディレクトリ

```text
src/app/                 ページ（App Router）
  page.tsx               TOP
  shopping-support/      熊谷市の買い物代行（最重要LP）
  for-seniors/           高齢者の買い物支援
  for-family/            離れて暮らすご家族へ
  insurance-outside/     介護保険外の買い物支援（制度の情報提供）
  area/kumagaya/         熊谷市の買い物代行・生活支援
  about/ flow/ faq/ contact/ privacy/
  blog/                  一覧・記事・カテゴリ・ページ送り
  sitemap.ts robots.ts manifest.ts feed.xml/
src/components/
  layout/                Header / Footer
  sections/home/         TOPの各セクション
  ui/                    汎用UI（Faq, AnswerBox, ContactCta, Illustrations …）
  blog/                  PostList / RelatedPosts
src/data/
  site.ts                事業者情報の一元管理（NAP統一・未確認項目は null）
  photos.ts              写真の一元管理（パス・alt・サイズ）
  content.ts             文言データ（お困りごと・買えるもの・お約束・流れ）
  faq.ts                 FAQ（表示と FAQPage JSON-LD を同一データから生成）
  nav.ts
src/lib/
  blog.ts                content/blog の読み込み・カテゴリ・関連記事
  jsonld.ts              構造化データ（Organization/LocalBusiness/Service/FAQ/Breadcrumb/BlogPosting）
  seo.ts                 ページ metadata の共通生成
content/blog/*.md        ブログ記事（自動生成＋手書き）
scripts/
  generate-daily-post.ts 毎日1記事を Claude API で生成
  prepare-images.ts      元写真のリネーム・最適化（assets/originals へ退避）
  make-assets.ts         OGP・アイコン生成
public/images/           最適化済みの写真（hero / service / delivery / senior / family / home / still / area）
assets/originals/        元写真（Git管理外）
.github/workflows/daily-blog.yml
TODO-CONTENT.md          オーナー確認が必要な情報
```

## 写真

- 元写真を `public` 直下に置いて `npm run images` を実行すると、`scripts/prepare-images.ts` の `MAP` に従ってリネーム・最適化し、`public/images/` へ出力する（元は `assets/originals/` に退避）
- 表示側は `src/data/photos.ts` を参照する。`alt`・`width`・`height` はここで一元管理する
- **現在の掲載写真は生成AIによるイメージ写真**。実在のスタッフ・利用者ではないため、フッターに注記を出し、alt では断定を避けている（`PHOTO_NOTE`）。実写に差し替える場合は `MAP` を書き換えて再実行する

## 事業情報の更新

電話番号・住所・受付時間・料金などが確定したら `src/data/site.ts` を更新する。
フッター・CTA・JSON-LD・各ページに自動で反映される。
サービス開始後は `site.launch.status` を `"open"` に変更する。

**提供サービスは買い物代行のみ。** 他サービスを提供しているような記述は、ページ・ブログとも禁止（`scripts/generate-daily-post.ts` の `SERVICE_CONSTRAINT` と `FORBIDDEN_PATTERNS` で機械的にも検出）。

## ブログ自動投稿

- 毎日 9:17 JST に GitHub Actions が `scripts/generate-daily-post.ts` を実行
- モデルは `ANTHROPIC_MODEL`（リポジトリ変数）で変更可。未設定なら `claude-haiku-4-5`
- `ANTHROPIC_API_KEY` は GitHub Secrets からのみ渡す
- 5つのクラスター（熊谷の買い物代行／高齢者の生活支援／ご家族向け／介護保険外サービス／熊谷の地域情報）からトピックを選び、各記事はピラーページへ内部リンク
- 重複防止：既存記事の title / slug / targetKeyword / topicId をプロンプトに渡し、保存前にタイトル類似度（バイグラム Jaccard ≥ 0.6）・対策KW重複・禁止表現・不正リンクを検査。問題があれば保存せず終了（空ファイルは commit されない）
- 生成 → lint → build が通った場合のみ `main` へ push → Vercel が自動デプロイ

ローカルでプロンプトだけ確認する：

```bash
npx tsx scripts/generate-daily-post.ts --dry-run
```

## 必要な GitHub 設定

| 種類 | 名前 | 用途 |
| --- | --- | --- |
| Secret | `ANTHROPIC_API_KEY` | Claude API |
| Variable（任意） | `ANTHROPIC_MODEL` | モデル変更 |
| Variable（任意） | `NEXT_PUBLIC_SITE_URL` | 公開URLの上書き（未設定なら https://www.lifesupport2026.com） |
