import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "quiet" | "onViolet" | "oxide";
type Size = "sm" | "md" | "lg";

/**
 * Actions in this world are stamps, not buttons: square, ruled, mono-labelled,
 * and they press *down* on hover rather than lifting. Nothing rounds, nothing
 * casts a shadow.
 */
const variants: Record<Variant, string> = {
  primary:
    "bg-stamp-600 text-paper-50 border border-stamp-600 hover:bg-stamp-700 hover:border-stamp-700 active:bg-stamp-800",
  outline:
    "border border-ink-300 bg-white text-ink-800 hover:border-stamp-600 hover:text-stamp-700",
  quiet:
    "border border-transparent text-ink-600 hover:border-paper-300 hover:text-ink-900",
  // On the violet bands the value inverts: paper is the ink.
  onViolet:
    "border border-stamp-300/50 bg-transparent text-paper-50 hover:bg-paper-50 hover:text-stamp-800 hover:border-paper-50",
  oxide:
    "bg-oxide-600 text-paper-50 border border-oxide-600 hover:bg-oxide-700 hover:border-oxide-700",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[0.6875rem] tracking-[0.14em] gap-2",
  md: "h-11 px-5 text-[0.75rem] tracking-[0.14em] gap-2.5",
  lg: "h-14 px-7 text-[0.8125rem] tracking-[0.14em] gap-3",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center whitespace-nowrap font-mono font-medium uppercase",
    "transition-[background-color,border-color,color,translate] duration-150 ease-[var(--ease-stamp)]",
    // the press
    "active:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-45",
    variants[variant],
    sizes[size],
    className,
  );
}

export function Button({
  variant,
  size,
  className,
  ...props
}: React.ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return (
    <button className={buttonVariants({ variant, size, className })} {...props} />
  );
}
