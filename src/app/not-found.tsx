import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ページが見つかりません",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] flex-col items-center justify-center px-5 pb-24 pt-32 text-center">
      <p aria-hidden className="eyebrow justify-center">
        404 Not Found
      </p>
      <h1 className="mt-4 font-maru text-2xl font-bold sm:text-3xl">お探しのページは見つかりませんでした</h1>
      <p className="mt-5 max-w-md text-sm leading-[2] text-ink-soft">
        ページが移動したか、URLが変わった可能性があります。トップページから、改めてお探しください。
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn btn-primary">
          トップページへ
        </Link>
        <Link href="/shopping-support" className="btn btn-outline">
          買い物代行について
        </Link>
      </div>
    </div>
  );
}
