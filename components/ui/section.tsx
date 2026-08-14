import { cn } from "@/lib/utils";

export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("container-page", className)} {...props} />;
}

/**
 * Vertical rhythm wrapper.
 *
 * `violet` and `ink` are the drenched bands — the colour carries whole regions
 * rather than being scattered as accents, and they are what keeps the surface
 * from reading as a white page with a purple button on it.
 */
export function Section({
  tone = "paper",
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & {
  tone?: "paper" | "white" | "violet" | "ink";
}) {
  const tones = {
    paper: "bg-paper-50",
    white: "bg-white",
    violet: "bg-stamp-700 text-stamp-100",
    ink: "bg-ink-900 text-ink-200",
  };

  return (
    <section
      className={cn("py-16 sm:py-20 lg:py-28", tones[tone], className)}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}

/**
 * Section heading.
 *
 * The eyebrow is set as a field caption with a rule running off it — the way a
 * printed form names a block of boxes. It is never a pill, and it never floats
 * free of the content it labels.
 */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  onDark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            "mb-5 flex items-center gap-4",
            align === "center" && "justify-center",
          )}
        >
          <span
            className={cn(
              "u-caption shrink-0",
              onDark ? "text-stamp-300" : "text-stamp-600",
            )}
          >
            {eyebrow}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "h-px flex-1",
              onDark ? "bg-stamp-400/40" : "bg-paper-300",
              align === "center" && "max-w-16",
            )}
          />
        </div>
      ) : null}

      <h2 className={cn("u-wide text-h2", onDark && "text-white")}>{title}</h2>

      {intro ? (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            onDark ? "text-stamp-100/80" : "text-ink-600",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
