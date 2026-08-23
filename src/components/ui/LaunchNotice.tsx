import { site } from "@/data/site";

/** サービス開始前の注記。開始後は site.launch.status を "open" にすると消える */
export default function LaunchNotice({ className }: { className?: string }) {
  if (site.launch.status !== "pre-launch") return null;
  return (
    <p className={`inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-ink-soft ${className ?? ""}`}>
      <span className="rounded-full border border-moss/40 px-3 py-0.5 text-[11.5px] font-medium tracking-wider text-moss">
        {site.launch.label}
      </span>
      <span>{site.launch.note}</span>
    </p>
  );
}
