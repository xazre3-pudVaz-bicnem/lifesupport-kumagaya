"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { NAV } from "@/data/nav";
import { ExternalIcon, InstagramIcon, LogoMark, PhoneIcon } from "@/components/ui/icons";

/**
 * 固定ヘッダー。最上部では背景に溶け、スクロールで白い面＋細い罫線になる。
 * backdrop-filter は使わない（配下の fixed/absolute 要素の挙動が崩れるため）。
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "bg-ivory/95 shadow-[0_1px_0_var(--color-line)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between gap-4 px-5 sm:px-8 lg:h-20">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${site.name} トップページ`}>
          <LogoMark className="h-9 w-9 lg:h-10 lg:w-10" />
          <span className="flex flex-col leading-none">
            <span className="font-maru text-[1.05rem] font-bold tracking-[0.04em] lg:text-[1.15rem]">{site.name}</span>
            <span className="mt-1 text-[10px] tracking-[0.18em] text-moss">{site.tagline}</span>
          </span>
        </Link>

        {/* PCナビ */}
        <nav aria-label="メイン" className="hidden items-center gap-3.5 xl:flex 2xl:gap-6">
          {NAV.filter((n) => n.href !== "/faq").map((item) => {
            const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative whitespace-nowrap text-[12.5px] tracking-[0.02em] transition-colors hover:text-moss 2xl:text-[13px] 2xl:tracking-[0.04em] ${
                  active ? "text-moss" : "text-ink"
                }`}
              >
                {item.label}
                {active ? <span aria-hidden className="absolute -bottom-1.5 left-0 h-[2px] w-full rounded bg-leaf" /> : null}
              </Link>
            );
          })}
        </nav>

        {/* PC：電話・Instagram導線 */}
        <div className="hidden shrink-0 items-center gap-3 xl:flex 2xl:gap-4">
          {site.tel && site.telLink ? (
            <>
              {/* 幅に余裕のある画面では番号を出し、狭い画面はアイコンのみにする */}
              <a
                href={site.telLink}
                aria-label={`お電話でのご相談 ${site.tel}`}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-moss transition-colors hover:border-moss hover:bg-mint 2xl:hidden"
              >
                <PhoneIcon className="h-5 w-5" />
              </a>
              <a
                href={site.telLink}
                className="group hidden shrink-0 flex-col items-end whitespace-nowrap leading-none 2xl:flex"
              >
                <span className="text-[10px] tracking-[0.16em] text-moss">お電話でのご相談</span>
                <span className="mt-1 inline-flex items-center gap-1.5 font-maru text-[1.05rem] font-bold tracking-[0.02em] text-ink transition-colors group-hover:text-moss">
                  <PhoneIcon className="h-4 w-4 text-moss" />
                  {site.tel}
                </span>
              </a>
            </>
          ) : null}
          <a
            href={site.instagramDm}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-moss px-4 text-[13px] font-medium tracking-wider text-white transition-colors hover:bg-moss-deep 2xl:px-5"
          >
            <InstagramIcon className="h-4 w-4" />
            DMで相談
          </a>
        </div>

        {/* メニュー開閉 */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          className="flex h-12 w-12 flex-col items-center justify-center gap-[6px] rounded-full xl:hidden"
        >
          <span className={`h-[2px] w-6 rounded bg-ink transition-transform duration-300 ${open ? "translate-y-[8px] rotate-45" : ""}`} />
          <span className={`h-[2px] w-6 rounded bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-[2px] w-6 rounded bg-ink transition-transform duration-300 ${open ? "-translate-y-[8px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* モバイル／タブレットナビ（header 基準の absolute で全画面に広げる） */}
      {open ? (
        <nav
          id="mobile-nav"
          aria-label="メイン"
          className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-4rem)] overflow-y-auto bg-ivory lg:h-[calc(100dvh-5rem)] xl:hidden"
        >
          <ul className="px-6 pt-2 sm:px-10">
            {[{ href: "/", label: "ホーム", en: "Home" }, ...NAV].map((item) => (
              <li key={item.href} className="border-b hairline">
                <Link href={item.href} onClick={close} className="flex min-h-14 items-center justify-between py-3">
                  <span className="font-maru text-[1.08rem] font-bold tracking-[0.04em]">{item.label}</span>
                  <span aria-hidden className="text-[10px] uppercase tracking-[0.3em] text-moss">
                    {item.en}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-y-3 px-6 pb-28 pt-8 sm:px-10">
            {site.tel && site.telLink ? (
              <a
                href={site.telLink}
                className="flex flex-col items-center gap-1 rounded-3xl bg-mint px-6 py-5 text-center"
              >
                <span className="inline-flex items-center gap-2 text-[12px] font-medium tracking-wider text-moss">
                  <PhoneIcon className="h-4 w-4" />
                  お電話でのご相談
                </span>
                <span className="font-maru text-[1.7rem] font-bold tracking-[0.02em] text-ink">{site.tel}</span>
              </a>
            ) : null}
            <a href={site.instagramDm} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
              <InstagramIcon className="h-5 w-5" />
              InstagramのDMで相談する
              <ExternalIcon className="h-4 w-4 opacity-70" />
            </a>
            <Link href="/contact" onClick={close} className="btn btn-outline w-full">
              お問い合わせ方法を見る
            </Link>
            <p className="pt-2 text-center text-[12.5px] leading-relaxed text-stone">
              {site.tagline}／{site.areas.join("・")}
            </p>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
