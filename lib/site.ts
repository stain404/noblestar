/**
 * Single source of truth for company details, navigation and social links.
 * Nothing else in the codebase should hardcode a phone number, address or nav item.
 */

export const site = {
  name: "Noble Star Shipping",
  shortName: "Noble Star",
  tagline: "Your Shipping & Clearance Service Provider",
  description:
    "Dubai freight forwarder and licensed customs broker. Sea, air and road freight with in-house customs clearance across all six GCC states.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.noblestarshipping.com",
  locale: "en_AE",

  contact: {
    email: "info@noblestarshipping.com",
    phones: [
      { label: "Sales", number: "+971 55 283 6626", href: "tel:+971552836626" },
      {
        label: "Operations",
        number: "+971 58 897 6916",
        href: "tel:+971588976916",
      },
    ],
    whatsapp: {
      number: "+971 58 897 6916",
      href: "https://wa.me/971588976916",
    },
    address: {
      street: "Al Mezan Tower, Al Qusais, Muhaisnah 4, Fewa 1",
      city: "Dubai",
      country: "United Arab Emirates",
      full: "Al Mezan Tower, Al Qusais, Muhaisnah 4, Fewa 1, Dubai",
    },
    hours: "Monday – Saturday, 9:00 – 18:00 GST",
    /** Schema.org opening-hours shorthand, kept in step with `hours` above. */
    openingHours: "Mo-Sa 09:00-18:00",
  },

  social: {
    facebook: "https://www.facebook.com/noblestarshipping",
    instagram: "https://www.instagram.com/noblestarshipping",
    linkedin: "https://www.linkedin.com/company/noblestarshipping",
  },
} as const;

/**
 * Primary navigation. `description` is rendered in the header mega-menu and the
 * mobile sheet — keep it to one short line.
 */
export const mainNav = [
  {
    label: "Services",
    href: "/services",
    description: "Sea, air and road freight plus in-house customs brokerage",
  },
  {
    label: "Coverage",
    href: "/coverage",
    description: "Ports, airports and land borders across all six GCC markets",
  },
  {
    label: "About",
    href: "/about",
    description: "Who we are and how we move your cargo",
  },
  {
    label: "Insights",
    href: "/blog",
    description: "Customs updates, lane guides and trade notes",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Talk to sales or operations — we answer the same day",
  },
] as const;

/**
 * Sections not yet ready to be shown.
 *
 * TEMPORARY. Empty this array to release everything — nothing else needs to
 * change. A held section keeps its nav entry (so the range of the site is still
 * legible) but the entry is not a link, its routes serve a holding notice
 * instead of their content, and it is dropped from the sitemap and from search
 * indexing. Held rather than 404: a missing page reads as broken, a held one
 * reads as in progress, which is the actual state.
 */
export const heldSections: readonly string[] = [];

/** True when `href` is inside a section that is not ready to be shown. */
export function isHeld(href: string): boolean {
  return heldSections.some(
    (section) => href === section || href.startsWith(`${section}/`),
  );
}

export const footerNav = [
  {
    title: "Services",
    links: [
      { label: "Sea Freight", href: "/services/sea-freight" },
      { label: "Air Freight", href: "/services/air-freight" },
      { label: "Road Freight", href: "/services/road-freight" },
      { label: "Customs Clearance", href: "/services/customs-clearance" },
      { label: "FCL Cargo", href: "/services/fcl-cargo" },
      { label: "LCL Cargo", href: "/services/lcl-cargo" },
      { label: "Food Cargo", href: "/services/food-cargo" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "GCC Coverage", href: "/coverage" },
      { label: "Insights", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Request a Quote", href: "/quote" },
    ],
  },
] as const;

/** Freight modes offered in the quote form. Values are stable ids used in URLs and emails. */
export const freightModes = [
  { value: "sea", label: "Sea Freight", serviceSlug: "sea-freight" },
  { value: "air", label: "Air Freight", serviceSlug: "air-freight" },
  { value: "road", label: "Road Freight", serviceSlug: "road-freight" },
  { value: "customs", label: "Customs Clearance Only", serviceSlug: "customs-clearance" },
  { value: "other", label: "Not sure / Something else", serviceSlug: null },
] as const;

export type FreightMode = (typeof freightModes)[number]["value"];
