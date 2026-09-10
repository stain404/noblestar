import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/**
 * The masthead of an inner page, set as the head of a document rather than a
 * banner: a violet rule across the top, the breadcrumb trail as a filing path
 * in mono, and the title at full width.
 *
 * Light by default, because the whole world is paper. Pass `backdrop` and the
 * header inverts onto a photograph washed with ink — the same treatment as the
 * homepage banner, used on the service pages so each one opens on a picture of
 * the work it describes. The scrim is a flat 80% floor rising to 90% under the
 * text column, measured to clear AA for white body text over any frame.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  backdrop,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  breadcrumbs?: { name: string; path: string }[];
  backdrop?: { src: string; alt: string };
  children?: React.ReactNode;
}) {
  const dark = Boolean(backdrop);

  return (
    <section
      className={cn(
        "relative overflow-hidden border-t-2 border-stamp-600",
        dark ? "bg-ink-900" : "bg-white",
      )}
    >
      {backdrop ? (
        <>
          <Image
            src={backdrop.src}
            alt={backdrop.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale-[0.3]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-ink-900/80 lg:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden lg:block"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(23,19,31,0.9) 0%, rgba(23,19,31,0.8) 52%, rgba(23,19,31,0.42) 100%)",
            }}
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="linescreen pointer-events-none absolute inset-x-0 top-0 h-40 text-paper-400"
        />
      )}

      <Container className="relative py-12 lg:py-20">
        {breadcrumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span
                      className={dark ? "text-paper-400" : "text-ink-300"}
                      aria-hidden="true"
                    >
                      /
                    </span>
                  ) : null}
                  {index === breadcrumbs.length - 1 ? (
                    <span
                      aria-current="page"
                      className={cn(
                        "u-caption",
                        dark ? "text-paper-200" : "text-ink-600",
                      )}
                    >
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.path}
                      className={cn(
                        "u-caption transition-colors",
                        dark
                          ? "text-paper-300 hover:text-white"
                          : "text-ink-500 hover:text-stamp-700",
                      )}
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {eyebrow ? (
          <p
            className={cn(
              "u-caption mb-5",
              dark ? "text-stamp-200" : "text-stamp-600",
            )}
          >
            {eyebrow}
          </p>
        ) : null}

        <h1
          className={cn(
            "u-wide max-w-4xl text-h1",
            dark ? "text-white" : "text-ink-900",
          )}
        >
          {title}
        </h1>

        {intro ? (
          <p
            className={cn(
              "mt-6 max-w-2xl text-lg leading-relaxed",
              dark ? "text-paper-100" : "text-ink-600",
            )}
          >
            {intro}
          </p>
        ) : null}

        {children ? <div className="mt-9">{children}</div> : null}
      </Container>
    </section>
  );
}
