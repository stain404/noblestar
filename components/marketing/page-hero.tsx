import Link from "next/link";
import { Container } from "@/components/ui/section";

/**
 * The masthead of an inner page, set as the head of a document rather than a
 * banner: a violet rule across the top, the breadcrumb trail as a filing path
 * in mono, and the title at full width. Light, because the whole world is
 * paper — the drenched violet is spent on the bands that carry an argument,
 * not on every page header.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  breadcrumbs?: { name: string; path: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-t-2 border-stamp-600 bg-white">
      <div
        aria-hidden="true"
        className="linescreen pointer-events-none absolute inset-x-0 top-0 h-40 text-paper-400"
      />

      <Container className="relative py-12 lg:py-20">
        {breadcrumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span className="text-ink-300" aria-hidden="true">
                      /
                    </span>
                  ) : null}
                  {index === breadcrumbs.length - 1 ? (
                    <span aria-current="page" className="u-caption text-ink-600">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.path}
                      className="u-caption text-ink-400 transition-colors hover:text-stamp-700"
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
          <p className="u-caption mb-5 text-stamp-600">{eyebrow}</p>
        ) : null}

        <h1 className="u-wide max-w-4xl text-h1 text-ink-900">{title}</h1>

        {intro ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">
            {intro}
          </p>
        ) : null}

        {children ? <div className="mt-9">{children}</div> : null}
      </Container>
    </section>
  );
}
