import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceIcon } from "@/components/ui/service-icon";
import type { ServiceMeta } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The range, set as an index of the document's numbered clauses rather than a
 * grid of cards. Cells share single rules, so the block reads as one table.
 * The numbers are the services' real order in `content/services/*.mdx`.
 */
export function ServiceGrid({
  services,
  className,
}: {
  services: ServiceMeta[];
  className?: string;
}) {
  return (
    <ul className={cn("field-grid sm:grid-cols-2 lg:grid-cols-3", className)}>
      {services.map((service, i) => (
        <li key={service.slug} className="contents">
          <Link
            href={`/services/${service.slug}`}
            className="group flex h-full flex-col justify-between gap-8 bg-white p-6 transition-colors duration-150 ease-[var(--ease-stamp)] hover:bg-stamp-50"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-[0.6875rem] text-ink-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <ServiceIcon
                name={service.icon}
                className="size-5 shrink-0 text-stamp-500"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-ink-900 transition-colors group-hover:text-stamp-700">
                {service.navTitle}
              </h3>
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
          </Link>
        </li>
      ))}
    </ul>
  );
}
