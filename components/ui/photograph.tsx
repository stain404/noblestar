import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A photograph, set as an exhibit attached to the file.
 *
 * This world has no cards and no elevation, so a photograph is not floated on
 * the page — it is ruled, and its caption names what it shows the way every
 * other box here names what it holds. The caption is not optional: an
 * unlabelled photograph on a freight site is decoration, and a reader has no
 * way to know whether they are looking at this company's own operation or a
 * stock library's.
 *
 * The frame reserves its space from the aspect ratio rather than from the
 * file's own dimensions, so nothing shifts as the image decodes.
 */
export function Photograph({
  src,
  alt,
  caption,
  reference,
  aspect = "4 / 3",
  priority = false,
  sizes = "100vw",
  className,
}: {
  src: string;
  alt: string;
  /** What the photograph shows. Set as a field caption, like every other box. */
  caption: string;
  /** Optional right-hand datum — a place, a date, a file reference. */
  reference?: string;
  /** CSS aspect ratio for the frame. Holds the layout before the image loads. */
  aspect?: string;
  /** Set on an above-the-fold photograph so it is not lazy-loaded. */
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={cn("border border-paper-300 bg-white", className)}>
      <div className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
      <figcaption className="flex items-baseline justify-between gap-4 border-t border-paper-300 px-4 py-3">
        <span className="field-caption">{caption}</span>
        {reference ? (
          <span className="shrink-0 font-mono text-[0.6875rem] text-ink-500">
            {reference}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
