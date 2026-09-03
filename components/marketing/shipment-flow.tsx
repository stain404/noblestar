import { cn } from "@/lib/utils";
import { custodyChain } from "@/lib/custody";
import { Marker } from "@/components/ui/document";

type Step = (typeof custodyChain)[number];

/**
 * How a shipment runs once a file is open: the six steps in order, and who
 * carries out each one.
 *
 * This is the positive form of the site's core claim. Rather than arguing
 * against the split arrangement, it lets the fact speak — "Noble Star" sits on
 * the line for five of the six steps, each marked as an own operation in seal
 * green, and the one exception is named honestly. The reader sweeps the column
 * and sees the answer.
 *
 * The steps hang off one continuous rule: the file's throughline, and the
 * reason the section exists — the same file runs the whole length.
 */
export function ShipmentFlow({
  headingLevel = 3,
}: {
  /**
   * Depth of each step's heading. Defaults to 3, under a section heading at 2.
   * The homepage sets its section heading to 1, so it passes 2 here.
   */
  headingLevel?: 2 | 3;
} = {}) {
  const Heading = `h${headingLevel}` as const;

  return (
    <div className="mt-12 sm:mt-16">
      <ol className="relative max-w-4xl border-t border-paper-300">
        {/* The throughline the steps hang off. Sits behind the numerals; each
            numeral masks its own segment with a white ground. */}
        <span
          aria-hidden="true"
          className="absolute bottom-8 left-[0.6875rem] top-8 w-px bg-ink-300 sm:left-[0.875rem]"
        />

        {custodyChain.map((step) => (
          <li
            key={step.index}
            className={cn(
              "relative grid gap-x-5 border-b border-paper-200 py-7",
              "grid-cols-[1.875rem_1fr]",
              "sm:grid-cols-[2.25rem_1fr] sm:gap-x-8 sm:py-9",
            )}
          >
            {/* Step index — a station on the throughline */}
            <span className="relative bg-white pb-1 font-mono text-xl leading-none text-ink-600 tabular-nums sm:text-2xl">
              {String(step.index).padStart(2, "0")}
            </span>

            <div className="min-w-0">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
                <Heading className="text-lg font-semibold text-ink-900 sm:order-1 sm:text-xl">
                  {step.name}
                </Heading>
                <div className="sm:order-2 sm:shrink-0 sm:pt-0.5">
                  <HandledBy step={step} />
                </div>
              </div>
              <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-ink-600">
                {step.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-500">
        One file, one reference, one coordinator &mdash; from the quote to the
        consignee&rsquo;s door. The single step we do not run ourselves is origin
        handling outside the GCC, where a local agent is required by law. We
        instruct them and they report to us, so a query still reaches you from
        the person holding your file.
      </p>
    </div>
  );
}

function HandledBy({ step }: { step: Step }) {
  return (
    <span className="flex items-center gap-2.5 sm:flex-col sm:items-end sm:gap-2">
      <span className="u-caption whitespace-nowrap text-ink-500">
        Carried out by
      </span>
      <Marker
        tone={step.inHouse ? "cleared" : "plain"}
        className="whitespace-nowrap"
      >
        {step.inHouse ? "Noble Star" : "Agent we instruct"}
      </Marker>
    </span>
  );
}
