import { cn } from "@/lib/utils";
import { custodyChain, custodyPartyCount } from "@/lib/custody";

/**
 * The site's central proof.
 *
 * Two columns of the same six steps. On the left, the ordinary arrangement,
 * where the file changes hands four times and each boundary is ruled in oxide
 * — those rules are the handovers, and the handover is the defect. On the
 * right, one unbroken violet bar down the steps Noble Star performs itself.
 *
 * The graphic argues by shape before anyone reads a word of it: broken column
 * against continuous column. Nothing here is decorative — every rule marks a
 * change of party, and every gap is a real one.
 */
export function CustodyChain() {
  return (
    <div className="mt-12">
      {/* Column headers, set as the document's own field captions. */}
      <div className="grid grid-cols-[1fr] gap-px sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="hidden sm:block" />
        <div className="border-b border-ink-300 pb-2.5">
          <span className="u-caption text-ink-500">Bought separately</span>
          <p className="mt-2 font-mono text-2xl text-oxide-600">
            {custodyPartyCount.typical} parties
          </p>
        </div>
        <div className="border-b border-stamp-500 pb-2.5">
          <span className="u-caption text-stamp-600">With Noble Star</span>
          <p className="mt-2 font-mono text-2xl text-stamp-700">
            {custodyPartyCount.noblestar} parties
          </p>
        </div>
      </div>

      <ol className="mt-0">
        {custodyChain.map((step, i) => {
          const previous = custodyChain[i - 1];
          // A handover is a change of performing party between adjacent steps.
          const typicalHandover = previous && previous.typical !== step.typical;
          const ownHandover =
            previous &&
            (previous.inHouse ? "Noble Star" : previous.typical) !==
              (step.inHouse ? "Noble Star" : step.typical);

          return (
            <li
              key={step.index}
              className="grid grid-cols-[1fr] border-b border-paper-200 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]"
            >
              {/* What the step is */}
              <div className="py-5 pr-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[0.6875rem] text-ink-500">
                    {String(step.index).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-semibold text-ink-900">
                    {step.name}
                  </h3>
                </div>
                <p className="mt-2 pl-8 text-sm leading-relaxed text-ink-600">
                  {step.detail}
                </p>
              </div>

              {/* Bought separately — every party change ruled in oxide */}
              <div
                className={cn(
                  "relative flex items-center py-5 pl-4 pr-4 sm:pl-6",
                  typicalHandover && "border-t-2 border-oxide-500",
                )}
              >
                {typicalHandover ? (
                  <span className="u-caption absolute -top-2.5 left-4 bg-paper-50 px-1.5 text-oxide-600 sm:left-6">
                    Handover
                  </span>
                ) : null}
                <span className="text-sm text-ink-600">{step.typical}</span>
              </div>

              {/* With Noble Star — one continuous bar where the file never moves */}
              <div className="relative flex items-center py-5 pl-6 pr-4">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-0 bottom-0 w-1",
                    step.inHouse ? "bg-stamp-600" : "bg-paper-300",
                  )}
                />
                {ownHandover ? (
                  <span className="u-caption absolute -top-2.5 left-6 bg-paper-50 px-1.5 text-ink-500">
                    Handover
                  </span>
                ) : null}
                <span
                  className={cn(
                    "text-sm",
                    step.inHouse
                      ? "font-semibold text-stamp-700"
                      : "text-ink-600",
                  )}
                >
                  {step.noblestar}
                </span>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-500">
        The one step we do not perform ourselves is origin handling outside the
        GCC, where a local agent is required by law. We instruct them and they
        report to us, so the query still reaches you from the person holding
        your file.
      </p>
    </div>
  );
}
