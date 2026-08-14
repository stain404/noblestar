import { Plus } from "lucide-react";
import type { Faq } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Native <details> accordion — keyboard accessible and works without JavaScript,
 * which also means it is indexable alongside the FAQPage JSON-LD.
 *
 * The marker is a plus that rotates to a close mark, matching the nav: in this
 * world a disclosure opens a block of the form, it does not drop a list down.
 */
export function FaqAccordion({
  faqs,
  className,
}: {
  faqs: Faq[];
  className?: string;
}) {
  return (
    <div className={cn("border-t border-ink-300", className)}>
      {faqs.map((faq) => (
        <details key={faq.q} className="group border-b border-paper-200">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left font-semibold text-ink-900 transition-colors marker:hidden hover:text-stamp-700 [&::-webkit-details-marker]:hidden">
            {faq.q}
            <Plus
              className="mt-1 size-4 shrink-0 text-stamp-500 transition-transform duration-300 ease-[var(--ease-stamp)] group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p className="max-w-2xl pb-6 pr-10 leading-relaxed text-ink-600">
            {faq.a}
          </p>
        </details>
      ))}
    </div>
  );
}
