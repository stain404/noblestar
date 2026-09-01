import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceIcon } from "@/components/ui/service-icon";
import type { ServiceMeta } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The range, set as an index of the document's numbered clauses rather than a
 * grid of cards. Cells share single rules, so the block reads as one table.
 * The numbers are the services' real order in `content/services/*.mdx`.
 *
 * Photographs are all-or-nothing per grid, not per cell. The moment one
 * service has an image every cell gets an image region of the same height —
 * services still waiting on a photograph show their mark on paper instead —
 * because a grid where three cells carry photographs and four do not reads as
 * broken rather than as incomplete. With no photographs supplied at all the
 * grid is exactly what it was.
 */
export function ServiceGrid({
  services,
  className,
  headingLevel = 3,
}: {
  services: ServiceMeta[];
  className?: string;
  /**
   * Depth of each service's heading. Defaults to 3, which is right wherever
   * the grid sits under a `SectionHeader`. The services index has no such
   * heading above it — there the services are the page's own top-level
   * sections and must be 2, or the document jumps h1 to h3.
   */
  headingLevel?: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as const;
  const withPhotographs = services.some((service) => service.photo);

  return (
    <ul className={cn("field-grid sm:grid-cols-2 lg:grid-cols-3", className)}>
      {services.map((service, i) => (
        <li key={service.slug} className="contents">
          <Link
            href={`/services/${service.slug}`}
            className="group flex h-full flex-col bg-white transition-colors duration-150 ease-[var(--ease-stamp)] hover:bg-stamp-50"
          >
            {withPhotographs ? (
              <div
                className="relative overflow-hidden border-b border-paper-300"
                style={{ aspectRatio: "16 / 9" }}
              >
                {service.photo ? (
                  <Image
                    src={service.photo}
                    alt={
                      service.photoAlt ??
                      `Noble Star Shipping ${service.navTitle.toLowerCase()} operations`
                    }
                    fill
                    sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-paper-100">
                    <ServiceIcon
                      name={service.icon}
                      className="size-7 text-paper-500"
                    />
                  </div>
                )}
              </div>
            ) : null}

            <div className="flex flex-1 flex-col justify-between gap-8 p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[0.6875rem] text-ink-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* The mark is the image region's job once photographs exist. */}
                {withPhotographs ? null : (
                  <ServiceIcon
                    name={service.icon}
                    className="size-5 shrink-0 text-stamp-500"
                  />
                )}
              </div>

              <div>
                <Heading className="text-lg font-semibold text-ink-900 transition-colors group-hover:text-stamp-700">
                  {service.navTitle}
                </Heading>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                  {service.summary}
                </p>
                <span className="u-caption mt-5 inline-flex items-center gap-2 text-stamp-600">
                  Open
                  <ArrowRight
                    className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
