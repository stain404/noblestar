/**
 * The chain of custody a GCC import consignment passes through, and who
 * performs each step under the two arrangements.
 *
 * This is the site's central proof, so it is held here rather than in a
 * component: the homepage graphic, the about page and the services pages all
 * read from it and cannot drift apart.
 *
 * Accuracy matters more here than anywhere else on the site. `noblestar`
 * records who performs the step when Noble Star holds the file; `typical`
 * records the party that ordinarily performs it when freight forwarding and
 * brokerage are bought separately, which is the arrangement this company was
 * built to replace. Both columns are drawn from the account of the business in
 * `app/about/page.tsx` and the service content — review with operations before
 * launch, as with everything else describing coverage.
 */

export type CustodyStep = {
  /** Step number as it appears on the file. A genuine sequence, not a device. */
  index: number;
  name: string;
  /** What actually happens, in one line. */
  detail: string;
  /** What goes wrong here when the step changes hands. */
  failure: string;
  /** Who performs it under the ordinary split arrangement. */
  typical: string;
  /** Who performs it when Noble Star holds the file. */
  noblestar: string;
  /** True where Noble Star performs the step with its own people. */
  inHouse: boolean;
};

export const custodyChain: CustodyStep[] = [
  {
    index: 1,
    name: "Booking and document check",
    detail:
      "Commercial invoice, packing list and certificates are read against the destination's requirements before anything moves.",
    failure:
      "Nobody checks the paperwork until it reaches the broker, by which time the goods are already on the water.",
    typical: "Freight forwarder",
    noblestar: "Noble Star",
    inHouse: true,
  },
  {
    index: 2,
    name: "Origin handling and export clearance",
    detail:
      "Collection at the supplier, export formalities and loading at the origin port or airport.",
    failure:
      "The origin agent answers to the forwarder, not to you, and a query at origin reaches you late.",
    typical: "Origin agent",
    noblestar: "Origin agent, instructed by Noble Star",
    inHouse: false,
  },
  {
    index: 3,
    name: "Freight",
    detail:
      "Sea, air or road movement on the booked carrier, with the file tracked against the confirmed transit.",
    failure:
      "A rolled sailing or a missed connection is discovered from the tracking page rather than from a person.",
    typical: "Freight forwarder",
    noblestar: "Noble Star",
    inHouse: true,
  },
  {
    index: 4,
    name: "Import customs clearance",
    detail:
      "Declaration filed in the destination's own system — Dubai Customs, FASAH, Bayan, Al-Nadeeb or OFOQ.",
    failure:
      "The broker is a separate company. A customs query goes to them, they escalate to the forwarder, the forwarder calls you, and a day is gone.",
    typical: "Customs broker",
    noblestar: "Noble Star, in-house",
    inHouse: true,
  },
  {
    index: 5,
    name: "Packing, repacking and temperature handling",
    detail:
      "Food-safe packing, label application and cold-chain handling where the commodity requires it.",
    failure:
      "Handled by whichever warehouse had space, with no accountability for the cold chain between legs.",
    typical: "Third-party warehouse",
    noblestar: "Noble Star, own facility",
    inHouse: true,
  },
  {
    index: 6,
    name: "Final-mile delivery",
    detail:
      "Delivery to the consignee's door, with proof of delivery back on the same file.",
    failure:
      "Whoever was available on the day, with no relationship to the file and no way to answer a question about it.",
    typical: "Third-party haulier",
    noblestar: "Noble Star drivers",
    inHouse: true,
  },
];

/** Distinct parties involved under each arrangement — the number that makes the point. */
export const custodyPartyCount = {
  typical: new Set(custodyChain.map((step) => step.typical)).size,
  noblestar: new Set(
    custodyChain.map((step) => (step.inHouse ? "Noble Star" : step.typical)),
  ).size,
};
