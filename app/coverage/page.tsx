import { CtaBand } from "@/components/marketing/cta-band";
import { PageHero } from "@/components/marketing/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { Marker } from "@/components/ui/document";
import { Section, SectionHeader } from "@/components/ui/section";
import { countries } from "@/lib/coverage";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "GCC Coverage — Ports, Airports & Border Crossings",
  description:
    "Noble Star Shipping's coverage across the UAE, Saudi Arabia, Oman, Qatar, Kuwait and Bahrain — the ports, airports, land borders and customs regimes we work in.",
  path: "/coverage",
});

const facets = [
  { key: "seaPorts", label: "Sea ports" },
  { key: "airports", label: "Airports" },
  { key: "landBorders", label: "Land borders" },
] as const;

export default function CoveragePage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Coverage", path: "/coverage" },
  ];

  return (
    <>
      <JsonLd schema={breadcrumbSchema(breadcrumbs)} />

      <PageHero
        eyebrow="Coverage"
        title="One network across all six GCC states"
        intro="Dubai is our hub. From it we run own operations into Saudi Arabia, Oman and Qatar, and work through vetted partner agents in Kuwait and Bahrain — with Noble Star keeping single-point control of your file either way."
        breadcrumbs={breadcrumbs}
      />

      {/* Jurisdiction index. The two-letter code is how these markets are
          actually written on a declaration, so it carries the wayfinding. */}
      <div className="sticky top-24 z-30 border-b border-ink-300 bg-paper-50/95 backdrop-blur-sm">
        <nav aria-label="Countries" className="container-page">
          <ul className="flex overflow-x-auto">
            {countries.map((country) => (
              <li key={country.slug}>
                <a
                  href={`#${country.slug}`}
                  className="u-caption inline-flex shrink-0 items-center gap-2 border-r border-paper-200 px-4 py-4 text-ink-500 transition-colors hover:bg-stamp-50 hover:text-stamp-700"
                >
                  <span className="text-ink-900">{country.code}</span>
                  <span className="hidden sm:inline">{country.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Section>
        <SectionHeader
          eyebrow="Market by market"
          title="What we can actually do, country by country"
          intro="We would rather be precise than impressive. Where a market is served through partners rather than our own operation, this page says so."
        />

        <div className="mt-14 space-y-16">
          {countries.map((country) => (
            <article
              key={country.slug}
              id={country.slug}
              className="scroll-mt-44"
            >
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-b-2 border-ink-900 pb-5">
                <div className="flex items-end gap-5">
                  <span
                    className="u-wide font-mono text-5xl leading-none text-stamp-600"
                    aria-hidden="true"
                  >
                    {country.code}
                  </span>
                  <h2 className="u-wide text-2xl">{country.name}</h2>
                </div>
                <Marker tone={country.directService ? "cleared" : "plain"}>
                  {country.directService
                    ? "Own operations"
                    : "Via partner network"}
                </Marker>
              </div>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-600">
                {country.summary}
              </p>

              <div className="field-grid mt-8 sm:grid-cols-2 lg:grid-cols-4">
                {facets.map((facet) => (
                  <div key={facet.key} className="bg-white p-5">
                    <h3 className="field-caption">{facet.label}</h3>
                    <ul className="mt-4 space-y-2">
                      {country[facet.key].map((item) => (
                        <li
                          key={item}
                          className="text-sm leading-snug text-ink-700"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* The customs regime is the reason this page exists, so it
                    gets the one coloured cell in the row. */}
                <div className="bg-stamp-50 p-5">
                  <h3 className="field-caption text-stamp-600">
                    Customs regime
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink-700">
                    {country.customsNote}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Moving cargo on a lane we have not listed?"
        intro="Our network reaches beyond the ports and borders on this page. Tell us the route and we will confirm what we can do on it — honestly."
      />
    </>
  );
}
