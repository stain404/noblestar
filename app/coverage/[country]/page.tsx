import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/marketing/cta-band";
import { PageHero } from "@/components/marketing/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { buttonVariants } from "@/components/ui/button";
import { DataCell, DataHead, DataTable, Marker } from "@/components/ui/document";
import { Section, SectionHeader } from "@/components/ui/section";
import { getServices } from "@/lib/content";
import { countries, getCountry } from "@/lib/coverage";
import {
  breadcrumbSchema,
  faqSchema,
  pageMetadata,
  serviceSchema,
} from "@/lib/seo";
import { isHeld } from "@/lib/site";

/**
 * One page per GCC market.
 *
 * These exist because the detail was already written and had nowhere to be
 * indexed: `lib/coverage.ts` holds the real ports, airports, land borders and
 * declaration systems for all six states, and until now it all rendered on a
 * single `/coverage` page behind `#anchors`. An anchor is not a search result.
 * A buyer searching "customs clearance Oman" is looking for a page about Oman,
 * and this is that page — same facts, addressable.
 */

export function generateStaticParams() {
  return countries.map((country) => ({ country: country.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country: slug } = await params;
  const country = getCountry(slug);
  if (!country) return {};

  return pageMetadata({
    // Built from `shortName`, so the brand suffix still fits inside the ~60
    // characters a search result will actually display.
    title: `Freight & Customs in ${country.shortName}`,
    description: country.metaDescription,
    path: `/coverage/${slug}`,
  });
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country: slug } = await params;
  const country = getCountry(slug);
  if (!country) notFound();

  const services = getServices();
  const others = countries.filter((c) => c.slug !== slug);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Coverage", path: "/coverage" },
    { name: country.name, path: `/coverage/${slug}` },
  ];

  /** Answers the two questions every enquiry about a new market opens with. */
  const faqs = [
    {
      q: `Does Noble Star clear customs in ${country.shortName}?`,
      a: country.directService
        ? `Yes. ${country.name} is an own-operation market for us, so the declaration is filed by Noble Star rather than handed to a separate broker. ${country.customsNote}`
        : `Yes, through our vetted partner agent network. Noble Star keeps single-point control of the file, so you deal with one coordinator throughout rather than being passed to a local agent. ${country.customsNote}`,
    },
    {
      q: `Which ports and airports do you use for ${country.shortName}?`,
      a: `Sea cargo moves through ${country.seaPorts.join(", ")}. Air cargo moves through ${country.airports.join(", ")}. Overland movements cross at ${country.landBorders.join(", ")}.`,
    },
  ];

  const facets = [
    { label: "Sea ports", items: country.seaPorts },
    { label: "Airports", items: country.airports },
    { label: "Land borders", items: country.landBorders },
  ];

  return (
    <>
      <JsonLd
        schema={[
          serviceSchema({
            name: `Freight forwarding and customs clearance in ${country.name}`,
            description: country.metaDescription,
            path: `/coverage/${slug}`,
            areaServed: country.name,
          }),
          breadcrumbSchema(breadcrumbs),
          faqSchema(faqs),
        ]}
      />

      <PageHero
        eyebrow="Coverage"
        title={`Freight forwarding and customs clearance in ${country.shortName}`}
        intro={country.summary}
        breadcrumbs={breadcrumbs}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/quote" className={buttonVariants({ size: "lg" })}>
            Get a quote for {country.shortName}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Marker tone={country.directService ? "cleared" : "plain"}>
            {country.directService ? "Own operations" : "Via partner network"}
          </Marker>
        </div>
      </PageHero>

      {/* The gateways, set as the endorsements block of the form. */}
      <div className="border-b border-ink-300 bg-paper-50">
        <div className="container-page py-10">
          <span className="field-caption">Gateways we work through</span>
          <div className="field-grid mt-4 sm:grid-cols-2 lg:grid-cols-3">
            {facets.map((facet) => (
              <div key={facet.label} className="bg-white p-5">
                <h2 className="field-caption">{facet.label}</h2>
                <ul className="mt-4 space-y-2">
                  {facet.items.map((item) => (
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
          </div>
        </div>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="min-w-0">
            <h2 className="text-h2">
              How clearance works in {country.shortName}
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-600">
              <p>{country.customsNote}</p>
              <p>
                {country.directService
                  ? `Because ${country.name} is an own-operation market, the customs declaration is filed by Noble Star rather than passed to a separate broker. When the authority raises a query, the notification reaches us directly and we act on it the same day — there is nobody to escalate to first.`
                  : `${country.name} is served through our vetted partner agent network rather than our own licence. We say so plainly because the alternative — implying own operations everywhere — is the kind of claim that unravels at the worst moment. Noble Star still holds the file end to end: you brief one coordinator, and we instruct the agent.`}
              </p>
              <p>
                Most consignments that are held in {country.shortName} are held
                on paperwork rather than on the cargo itself. We read the
                commercial invoice, packing list and certificates against the
                destination&rsquo;s requirements before anything moves, because
                a document corrected at booking costs nothing and the same
                document corrected at the border costs demurrage.
              </p>
            </div>

            <h2 className="mt-12 text-h2">
              Services we run into {country.shortName}
            </h2>
            {!isHeld("/services") ? (
              <ul className="field-grid mt-8 sm:grid-cols-2">
                {services.map((service) => (
                  <li key={service.slug} className="contents">
                    <Link
                      href={`/services/${service.slug}`}
                      className="group flex h-full flex-col bg-white p-5 transition-colors duration-150 hover:bg-stamp-50"
                    >
                      <h3 className="font-semibold text-ink-900 transition-colors group-hover:text-stamp-700">
                        {service.navTitle}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">
                        {service.summary}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="field">
              <span className="field-caption">Arrangement</span>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">
                {country.directService
                  ? `Own operations. Noble Star files the declaration in ${country.shortName} itself.`
                  : `Vetted partner agent network, with Noble Star holding the file end to end.`}
              </p>
            </div>

            <div className="field">
              <span className="field-caption">Other GCC markets</span>
              <ul className="mt-3 space-y-2.5">
                {others.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/coverage/${other.slug}`}
                      className="inline-flex items-center gap-2 text-sm text-ink-700 transition-colors hover:text-stamp-700"
                    >
                      <span className="font-mono text-[0.6875rem] text-ink-500">
                        {other.code}
                      </span>
                      {other.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeader
          eyebrow="Before you book"
          title={`Straight answers on ${country.shortName}`}
        />
        <DataTable className="mt-10">
          <thead>
            <tr>
              <DataHead>Question</DataHead>
              <DataHead>Answer</DataHead>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq.q}>
                <DataCell className="w-1/3 font-semibold text-ink-900">
                  {faq.q}
                </DataCell>
                <DataCell className="text-ink-600">{faq.a}</DataCell>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </Section>

      <CtaBand
        title={`Moving cargo into ${country.shortName}?`}
        intro="Tell us the origin, the commodity and the date it is ready. We will confirm what we can do on the lane, and say so plainly if another mode would serve you better."
      />
    </>
  );
}
