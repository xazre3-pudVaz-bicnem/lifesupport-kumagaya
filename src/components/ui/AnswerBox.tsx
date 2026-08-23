/**
 * AIO対策：ページ冒頭で「質問 → 端的な回答」を明示するブロック。
 * 検索エンジン・生成AIが要点を引用しやすいよう、短い段落で完結させる。
 */
export default function AnswerBox({
  question,
  answer,
  className,
}: {
  question: string;
  answer: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-l-[3px] border-leaf bg-white/70 py-5 pl-6 pr-5 sm:py-6 sm:pl-8 ${className ?? ""}`}>
      <p className="font-maru text-[1.02rem] font-bold leading-[1.7] sm:text-[1.1rem]">Q. {question}</p>
      <p className="mt-3 text-[0.95rem] leading-[2] text-ink-soft sm:text-base">
        <span className="mr-1 font-maru font-bold text-moss">A.</span>
        {answer}
      </p>
    </div>
  );
}
