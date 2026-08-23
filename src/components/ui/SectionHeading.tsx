type Props = {
  en?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
};

/** セクション見出し。英字ラベル＋丸ゴシックの見出し＋リード文 */
export default function SectionHeading({ en, title, lead, as = "h2", align = "left", className }: Props) {
  const Tag = as;
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className ?? ""}`}>
      {en ? <p className={`eyebrow ${align === "center" ? "justify-center" : ""}`}>{en}</p> : null}
      <Tag className="mt-4 font-maru text-[1.6rem] font-bold leading-[1.5] tracking-[0.02em] sm:text-[2rem] lg:text-[2.25rem]">
        {title}
      </Tag>
      {lead ? (
        <div
          className={`mt-5 max-w-2xl text-[0.95rem] leading-[2.1] text-ink-soft sm:text-base ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {lead}
        </div>
      ) : null}
    </div>
  );
}
