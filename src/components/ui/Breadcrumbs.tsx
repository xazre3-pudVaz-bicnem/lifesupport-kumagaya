import Link from "next/link";
import JsonLd from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, type Crumb } from "@/lib/jsonld";

/**
 * パンくずリスト。画面表示と BreadcrumbList JSON-LD を
 * 同じデータから生成し、不一致をなくす。
 */
export default function Breadcrumbs({ crumbs, className }: { crumbs: Crumb[]; className?: string }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <nav aria-label="パンくずリスト" className={`mx-auto max-w-6xl px-5 sm:px-8 ${className ?? ""}`}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] tracking-wider text-stone">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="line-clamp-1">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="underline-offset-4 transition-colors hover:text-moss hover:underline">
                      {c.name}
                    </Link>
                    <span aria-hidden className="text-sprout">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
