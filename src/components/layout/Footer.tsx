import Link from "next/link";
import { site } from "@/data/site";
import { FOOTER_SUB, NAV } from "@/data/nav";
import { PHOTO_NOTE } from "@/data/photos";
import { InstagramIcon, LogoMark } from "@/components/ui/icons";

/**
 * フッター。事業情報はInstagramで確認できた範囲のみ（NAP統一）。
 * 住所・電話番号は確認でき次第 site.ts に追記すると自動で表示される。
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t hairline bg-cream">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* 事業情報 */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label={`${site.name} トップページ`}>
              <LogoMark className="h-10 w-10" />
              <span className="flex flex-col leading-none">
                <span className="font-maru text-[1.15rem] font-bold tracking-[0.04em]">{site.name}</span>
                <span className="mt-1 text-[10px] tracking-[0.18em] text-moss">{site.nameEn}</span>
              </span>
            </Link>
            <p className="mt-6 max-w-md text-[13.5px] leading-[2] text-ink-soft">
              {site.prefecture}{site.areaMain}を中心に、{site.areas.filter((a) => a !== site.areaMain).join("・")}
              で買い物代行を行う地域密着型サービスです。食料品・日用品・重い物などのお買い物を、ご自宅までお届けします。
            </p>
            <dl className="mt-6 grid grid-cols-[5.5rem_1fr] gap-y-1.5 text-[13.5px] leading-[1.9] text-ink-soft">
              <dt className="text-stone">サービス</dt>
              <dd>{site.services.join("・")}</dd>
              <dt className="text-stone">対応エリア</dt>
              <dd>{site.areas.join("・")}</dd>
              <dt className="text-stone">代表</dt>
              <dd>{site.representative}</dd>
              {site.address ? (
                <>
                  <dt className="text-stone">所在地</dt>
                  <dd>{site.address}</dd>
                </>
              ) : null}
              {site.tel ? (
                <>
                  <dt className="text-stone">電話</dt>
                  <dd>
                    <a href={site.telLink ?? undefined} className="hover:text-moss">
                      {site.tel}
                    </a>
                  </dd>
                </>
              ) : null}
              {site.email ? (
                <>
                  <dt className="text-stone">メール</dt>
                  <dd>
                    <a href={`mailto:${site.email}`} className="break-all hover:text-moss">
                      {site.email}
                    </a>
                  </dd>
                </>
              ) : null}
              {site.hours ? (
                <>
                  <dt className="text-stone">受付時間</dt>
                  <dd>{site.hours}</dd>
                </>
              ) : null}
            </dl>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-[13.5px] font-medium text-moss hover:text-moss-deep"
            >
              <InstagramIcon className="h-4 w-4" />
              Instagram {site.instagramId}
            </a>
          </div>

          {/* 主要ページ */}
          <nav aria-label="フッター">
            <p className="text-[11px] tracking-[0.3em] text-moss">MENU</p>
            <ul className="mt-4 grid gap-y-2.5 text-[13.5px] text-ink-soft">
              <li>
                <Link href="/" className="hover:text-moss">
                  ホーム
                </Link>
              </li>
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-moss">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="フッター（その他）">
            <p className="text-[11px] tracking-[0.3em] text-moss">INFO</p>
            <ul className="mt-4 grid gap-y-2.5 text-[13.5px] text-ink-soft">
              {FOOTER_SUB.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-moss">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[12px] leading-[1.9] text-stone">
              ライフサポート熊谷は介護保険外のサービスです。
              <br />
              現在提供しているサービスは買い物代行のみです。
              <br />
              {PHOTO_NOTE}
            </p>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t hairline pt-6 text-[11.5px] tracking-wider text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <p>熊谷市の買い物代行・高齢者の買い物支援｜埼玉県</p>
        </div>
      </div>
    </footer>
  );
}
