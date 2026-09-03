import { cn } from "@/lib/utils";
import { custodyChain, custodyPartyCount } from "@/lib/custody";

/**
 * The site's central proof, drawn so the argument lands before a word is read.
 *
 * Six steps, run down the page as a manifest. Two lanes carry them. The middle
 * lane — freight and brokerage bought separately — is severed: at every change
 * of company an oxide handover rule cuts across it, and the line naming what
 * goes wrong in that gap is printed right there. The right lane — Noble Star
 * holding the file — is one unbroken violet column. It is a single drenched
 * block on purpose: it cannot be broken up, because the file never moves off
 * the desk.
 *
 * Broken fragments against one solid column. Nothing here is decorative: every
 * rule marks a real change of party, and every failure line is a real failure
 * mode taken in substance from the service content.
 */
export function CustodyChain({
  headingLevel = 3,
}: {
  /**
   * Depth of each step's heading. Defaults to 3, which is right under a
   * section heading set at 2. The homepage opens on this section and sets its
   * heading to 1, so there it must be 2 or the document skips a level.
   */
  headingLevel?: 2 | 3;
} = {}) {
  const Heading = `h${headingLevel}` as const;
  const cols =
    "sm:grid sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1fr)]";

  return (
    <div className="mt-12 sm:mt-16">
      {/* ============ The count, aligned to the manifest lanes so the
          violet reads as one continuous column from here down ============ */}
      <div className={cn("grid grid-cols-1 border-t border-paper-300", cols)}>
        <div className="hidden sm:block" />
        <div className="border-t border-paper-300 bg-white py-7 sm:border-t-0 sm:px-5">
          <span className="u-caption text-oxide-600">Bought separately</span>
          <p className="mt-4 flex items-baseline gap-3">
            <span className="font-mono text-5xl leading-none text-oxide-600">
              {custodyPartyCount.typical}
            </span>
            <span className="text-sm text-ink-600">companies on the file</span>
          </p>
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-500">
            Every boundary between them is a place a customs query stops while
            somebody goes looking for somebody else.
          </p>
        </div>
        <div className="bg-stamp-700 px-5 py-7 text-stamp-100 max-sm:border-t max-sm:border-stamp-500">
          <span className="u-caption text-stamp-300">With Noble Star</span>
          <p className="mt-4 flex items-baseline gap-3">
            <span className="font-mono text-5xl leading-none text-white">
              {custodyPartyCount.noblestar}
            </span>
            <span className="text-sm text-stamp-200">
              and we instruct the second
            </span>
          </p>
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-stamp-200">
            One coordinator holds the file from the booking to the
            consignee&rsquo;s door. Nothing is handed over.
          </p>
        </div>
      </div>

      {/* ======================= The manifest ======================= */}
      <ol className="border-b border-paper-300">
        {custodyChain.map((step, i) => {
          const previous = custodyChain[i - 1];
          // A handover is a change of performing party between adjacent steps.
          const typicalHandover = previous && previous.typical !== step.typical;
          const ownParty = (s: (typeof custodyChain)[number]) =>
            s.inHouse ? "Noble Star" : s.typical;
          const ownSeam = previous && ownParty(previous) !== ownParty(step);

          return (
            <li key={step.index} className={cn("grid grid-cols-1", cols)}>
              {/* ---- What the step is ---- */}
              <div className="border-b border-paper-200 py-7 pr-8 sm:border-b-0">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-2xl leading-none text-ink-500 tabular-nums">
                    {String(step.index).padStart(2, "0")}
                  </span>
                  <Heading className="text-lg font-semibold text-ink-900 sm:text-xl">
                    {step.name}
                  </Heading>
                </div>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-600 sm:pl-10">
                  {step.detail}
                </p>
              </div>

              {/* ---- Bought separately: severed at every handover ---- */}
              <div
                className={cn(
                  "relative bg-white py-7 sm:px-5",
                  typicalHandover
                    ? "mt-5 border-t-2 border-oxide-500 sm:mt-0"
                    : "border-t border-paper-200 sm:border-t-0",
                )}
              >
                {typicalHandover ? (
                  <span className="u-caption absolute -top-[0.9rem] left-0 rotate-[-3deg] border border-oxide-500 bg-white px-1.5 py-1 text-oxide-600 sm:left-5">
                    Handover
                  </span>
                ) : null}
                <span className="u-caption mb-2 block text-ink-500">
                  Performed by
                </span>
                <span className="text-[0.9375rem] text-ink-800">
                  {step.typical}
                </span>
                <p
                  className={cn(
                    "mt-3 border-l-2 pl-3 text-[0.8125rem] leading-relaxed",
                    typicalHandover
                      ? "border-oxide-500 text-oxide-700"
                      : "border-paper-300 text-ink-500",
                  )}
                >
                  {step.failure}
                </p>
              </div>

              {/* ---- With Noble Star: one unbroken violet column ---- */}
              <div className="relative bg-stamp-700 px-5 py-7 text-stamp-100 max-sm:border-t max-sm:border-stamp-500">
                {ownSeam ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 border-t border-dashed border-stamp-400/50"
                  />
                ) : null}
                <span className="u-caption mb-2 block text-stamp-300">
                  Performed by
                </span>
                <span
                  className={cn(
                    "text-[0.9375rem]",
                    step.inHouse
                      ? "font-semibold text-white"
                      : "text-stamp-100/90",
                  )}
                >
                  {step.noblestar}
                </span>
                {!step.inHouse ? (
                  <p className="mt-3 border-l-2 border-stamp-400/60 pl-3 text-[0.8125rem] leading-relaxed text-stamp-200">
                    Required by law at origin. They are instructed by us and
                    report to us, so the answer still reaches you through your
                    coordinator.
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-8 max-w-2xl border-t border-paper-300 pt-6 text-sm leading-relaxed text-ink-500">
        One column is five company names on a single file. The other is Noble
        Star, five times over, with one agent we instruct at origin. That is the
        whole difference &mdash; and the reason a held consignment moves again in
        hours here rather than days.
      </p>
    </div>
  );
}
