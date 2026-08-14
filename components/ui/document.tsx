import { cn } from "@/lib/utils";

/**
 * The document primitives — this world's whole container vocabulary.
 *
 * There are no cards here, and there is no elevation. A box on a shipping
 * document is a ruled rectangle with a caption naming what it holds, and depth
 * comes from rule weight and ink darkness. If a box has no honest caption, it
 * should not be a box.
 */

export function Field({
  caption,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { caption?: string }) {
  return (
    <div className={cn("field", className)} {...props}>
      {caption ? <span className="field-caption">{caption}</span> : null}
      {children}
    </div>
  );
}

/**
 * A field acting as the surface of a link. Put `group` on the anchor: hovering
 * rules the box in violet and darkens the ink, which is what picking a document
 * off the pile looks like on paper.
 */
export function FieldSurface({
  caption,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { caption?: string }) {
  return (
    <div
      className={cn(
        "field h-full transition-colors duration-150 ease-[var(--ease-stamp)]",
        "group-hover:border-stamp-500 group-focus-visible:border-stamp-500",
        className,
      )}
      {...props}
    >
      {caption ? <span className="field-caption">{caption}</span> : null}
      {children}
    </div>
  );
}

/**
 * A square status marker. Deliberately not a pill — nothing in this system
 * rounds — and only used where the state it names is real.
 *
 * `cleared` own-operation, verified, passed. `held` provisional, refused,
 * stopped. `plain` neutral classification with no status meaning.
 */
export function Marker({
  tone = "plain",
  className,
  ...props
}: React.ComponentProps<"span"> & {
  tone?: "plain" | "cleared" | "held";
}) {
  const tones = {
    plain: "border-ink-300 text-ink-600 bg-white",
    cleared: "border-seal-600 text-seal-700 bg-seal-100",
    held: "border-oxide-500 text-oxide-700 bg-oxide-100",
  };

  return (
    <span
      className={cn(
        "u-caption inline-flex items-center border px-2 py-1.5",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

/**
 * The mark.
 *
 * `authority` is required and has no default on purpose: this component may
 * only appear where a named body actually stands behind the claim — Dubai
 * Customs, a municipality, a chamber of commerce. That constraint is the whole
 * point of the world. A stamp with nobody behind it is the decoration this
 * design exists to refuse.
 */
export function Attestation({
  authority,
  label,
  rotate = -4,
  tone = "stamp",
  className,
}: {
  authority: string;
  label: string;
  rotate?: number;
  tone?: "stamp" | "seal" | "oxide";
  className?: string;
}) {
  const tones = {
    stamp: "text-stamp-600",
    seal: "text-seal-700",
    oxide: "text-oxide-600",
  };

  return (
    <span
      className={cn("stamp flex-col items-start gap-1", tones[tone], className)}
      style={{ "--stamp-rotate": `${rotate}deg` } as React.CSSProperties}
    >
      <span className="font-semibold">{label}</span>
      <span className="text-[0.5625rem] tracking-[0.12em] opacity-70">
        {authority}
      </span>
    </span>
  );
}

/**
 * A ruled data table — the transit schedules, document checklists and customs
 * columns that carry most of this site's credibility. Rules only between rows,
 * the way a printed schedule sets them.
 */
export function DataTable({
  className,
  ...props
}: React.ComponentProps<"table">) {
  return (
    <div className="overflow-x-auto">
      <table
        className={cn("w-full border-collapse text-left", className)}
        {...props}
      />
    </div>
  );
}

export function DataHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      scope="col"
      className={cn(
        "u-caption border-b border-ink-300 pb-2.5 pr-6 text-ink-500 last:pr-0",
        className,
      )}
      {...props}
    />
  );
}

export function DataCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={cn(
        "border-b border-paper-200 py-3.5 pr-6 align-top text-[0.9375rem] leading-snug last:pr-0",
        className,
      )}
      {...props}
    />
  );
}

/** A reference number, lane code or any other value that reads as document data. */
export function Datum({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("font-mono text-[0.8125rem] text-ink-800", className)}
      {...props}
    />
  );
}
