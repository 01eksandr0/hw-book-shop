import { useState } from "react";
import { cn } from "@/lib/utils";

/** Якщо Open Library не має обкладинки за ISBN, приходить 1×1 GIF — схоже на «пустоту». */
const MIN_EDGE = 48;

const FALLBACK_COVERS = [
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=480&h=720&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=480&h=720&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1524578271613-d551bdacf27c?w=480&h=720&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=480&h=720&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1495447164868-9882bea3d8f8?w=480&h=720&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1506880012583-d2bbeac19156?w=480&h=720&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=480&h=720&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=480&h=720&fit=crop&q=80&auto=format",
];

type BookCoverProps = {
  src: string;
  alt: string;
  className?: string;
  /** Для різних запасних фото в сітці */
  index?: number;
};

export default function BookCover({ src, alt, className, index = 0 }: BookCoverProps) {
  const [failed, setFailed] = useState(false);
  const fallback = FALLBACK_COVERS[index % FALLBACK_COVERS.length];
  const activeSrc = failed ? fallback : src;

  return (
    <img
      key={activeSrc}
      src={activeSrc}
      alt={alt}
      className={cn(className)}
      referrerPolicy="no-referrer"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      onLoad={(e) => {
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_EDGE || naturalHeight < MIN_EDGE) {
          setFailed(true);
        }
      }}
    />
  );
}
