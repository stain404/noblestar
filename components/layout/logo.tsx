import { cn } from "@/lib/utils";
import {
  markPaths,
  markViewBox,
  wordmarkPaths,
  wordmarkViewBox,
} from "./logo-art";

/**
 * The supplied brand artwork. The original is a stacked lockup on one canvas;
 * splitting the mark and the wordmark into two viewBoxes (see `logo-art.ts`)
 * lets us set them side by side for the header and footer without redrawing
 * anything. Widths follow each viewBox's aspect ratio so nothing letterboxes.
 *
 * The wordmark inherits `currentColor` so the lockup inverts cleanly on the
 * dark footer. The mark keeps its own brand colours.
 */

function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={markViewBox}
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {markPaths.map((path) => (
        <path key={path.d} d={path.d} fill={path.fill} />
      ))}
    </svg>
  );
}

function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={wordmarkViewBox}
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      {wordmarkPaths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/** The mark on its own — for tight spots where the full lockup will not read. */
export function LogoMark({ className }: { className?: string }) {
  return <Mark className={cn("h-9 w-[2.6325rem]", className)} />;
}

export function Logo({
  onDark = false,
  className,
}: {
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        onDark ? "text-white" : "text-ink-900",
        className,
      )}
    >
      <Mark className="h-11 w-[3.2175rem] shrink-0" />
      <span className="flex flex-col">
        <Wordmark className="h-[1.35rem] w-[6.885rem]" />
        {/* Both sub-lines follow the lockup's own colour so a caller can retint
            the whole thing with one class — the header does exactly that as the
            bar crosses from the dark hero onto white. */}
        <span className="mt-1 text-[0.5rem] font-medium leading-none tracking-[0.14em] text-current/70">
          SHIPPING SERVICES L.L.C
        </span>
        {/* The mark keeps its own supplied colours, so the tagline stays
            neutral rather than competing with it at 7px. */}
        <span
          data-logo-tag=""
          className={cn(
            "mt-1 font-mono text-[0.4375rem] font-medium leading-none tracking-[0.1em]",
            onDark ? "text-paper-400" : "text-ink-400",
          )}
        >
          LOGS TO TRUST, LOGISTICS FIRST
        </span>
      </span>
    </span>
  );
}
