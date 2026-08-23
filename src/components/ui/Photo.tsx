import Image from "next/image";
import type { Photo } from "@/data/photos";

type Props = {
  photo: Photo;
  /** 縦横比などの見た目は className で指定する（例: "aspect-[4/3]"） */
  className?: string;
  /** object-position（被写体が切れないよう調整する） */
  position?: string;
  sizes?: string;
  priority?: boolean;
  /** 装飾目的で、内容が本文と重複する場合は true（alt="" になる） */
  decorative?: boolean;
  quality?: 75 | 82;
};

/**
 * 写真の共通ラッパー。
 * 外側に relative / overflow-hidden を必ず付けるため、
 * className に absolute などを渡しても高さが 0 に潰れない。
 */
export default function PhotoFrame({
  photo,
  className,
  position = "50% 50%",
  sizes = "100vw",
  priority = false,
  decorative = false,
  quality = 82,
}: Props) {
  return (
    <div className={`relative overflow-hidden bg-mint ${className ?? ""}`}>
      <Image
        src={photo.src}
        alt={decorative ? "" : photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        style={{ objectPosition: position }}
        className="object-cover"
      />
    </div>
  );
}
