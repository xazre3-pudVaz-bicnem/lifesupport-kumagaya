import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { WHO } from "@/data/content";
import { ArrowRightIcon } from "@/components/ui/icons";

/** どんな方が利用できる？ */
export default function WhoCanUse() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            en="For whom"
            title="どんな方が利用できる？"
            lead="介護認定の有無、年齢、お住まいの形（一人暮らし・ご夫婦・ご家族と同居）は問いません。"
          />
          <div className="mt-8 flex flex-col gap-3 text-[0.95rem]">
            <Link href="/for-seniors" className="link-line w-fit">
              高齢者の買い物支援について <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link href="/for-family" className="link-line w-fit">
              離れて暮らすご家族へ <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <ul className="grid gap-x-10 sm:grid-cols-2">
          {WHO.map((w, i) => (
            <Reveal key={w.title} as="li" delay={i * 0.06} className="border-t-2 border-sprout py-6">
              <h3 className="font-maru text-[1.05rem] font-bold leading-[1.65]">{w.title}</h3>
              <p className="mt-3 text-[0.92rem] leading-[2] text-ink-soft">{w.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
