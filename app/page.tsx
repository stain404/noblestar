import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import {
  Attestation,
  DataCell,
  DataHead,
  DataTable,
  Marker,
} from "@/components/ui/document";
import { CtaBand } from "@/components/marketing/cta-band";
import { CustodyChain } from "@/components/marketing/custody-chain";
import { FaqAccordion } from "@/components/marketing/faq";
import { ServiceGrid } from "@/components/marketing/service-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { getPosts, getServices } from "@/lib/content";
import { countries } from "@/lib/coverage";
import { custodyPartyCount } from "@/lib/custody";
import { faqSchema } from "@/lib/seo";
import { isHeld, site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

/**
 * The three failure modes that actually stop food consignments, taken verbatim
 * in substance from `content/services/food-cargo.mdx`. Published because
 * saying the unwelcome thing is the differentiator — a competitor's site will
 * not tell an importer what is about to go wrong.
 */
const foodFailures = [
  {
    cause: "Label non-compliance",
    detail:
      "Missing Arabic text, missing importer details, or a production and expiry date format the inspector will not accept.",
  },
  {
    cause: "Insufficient remaining shelf life",
    detail:
      "Goods that left the factory too late arrive too close to expiry and are refused entry outright.",
  },
  {
    cause: "Mismatched health certificates",
    detail:
      "The certificate must match the consignment exactly — same product, same batch, same quantity.",
  },
];

const homeFaqs = [
  {
    q: "Which countries does Noble Star cover?",
    a: "We serve all six GCC states — the United Arab Emirates, Saudi Arabia, Oman and Qatar as own operations, and Kuwait and Bahrain through our vetted partner agent network. In every case Noble Star retains single-point control of your file.",
  },
  {
    q: "How quickly can I get a quote?",
    a: "For standard lanes and commodities, usually the same business day. Complex, hazardous or project cargo may take longer because we confirm equipment and carrier acceptance before quoting rather than after.",
  },
  {
    q: "Do you handle customs clearance as well as freight?",
    a: "Yes, and it is done in-house. You can also engage us for customs clearance alone if your freight is already arranged.",
  },
  {
    q: "What information do you need to quote?",
    a: "The origin and destination, the commodity, the gross weight and dimensions or container type, your preferred incoterm, and the date the goods are ready. If you are not sure of any of it, send what you have and we will ask for the rest.",
  },
];

export default function HomePage() {
  const services = getServices();
  const posts = getPosts().slice(0, 3);

  return (
    <>
      <JsonLd schema={faqSchema(homeFaqs)} />

      {/* =========================== The file ============================ */}
      <section className="border-b border-ink-300 bg-paper-50">
        <Container className="py-10 lg:py-16">
          <div className="field-grid lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
            {/* ---------------------- left: the form ---------------------- */}
            <div className="bg-white">
              <div className="border-b border-paper-300 px-6 py-4">
                <span className="field-caption">Issued by</span>
                <p className="mt-2 text-sm text-ink-700">
                  {site.name} Services L.L.C — {site.contact.address.full}
                </p>
              </div>

              <div className="px-6 py-8 lg:px-9 lg:py-12">
                <span className="field-caption">Description of goods</span>

                <h1 className="u-wide mt-6 text-display text-ink-900">
                  Freight fails at the handover.
                </h1>

                <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-600">
                  Bought separately, your consignment passes through{" "}
                  <strong className="font-semibold text-oxide-600">
                    {custodyPartyCount.typical} companies
                  </strong>{" "}
                  between your supplier and your door. Every boundary between
                  them is a place a question can sit unanswered for a day.
                </p>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-600">
                  We are a freight forwarder and a licensed customs broker with
                  our own drivers and our own packing facility. With us it
                  passes through{" "}
                  <strong className="font-semibold text-stamp-700">
                    {custodyPartyCount.noblestar}
                  </strong>{" "}
                  — and we hold the file for both.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/quote"
                    className={buttonVariants({ size: "lg" })}
                  >
                    Open a file
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={site.contact.phones[0].href}
                    className={buttonVariants({
                      variant: "outline",
                      size: "lg",
                    })}
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    Speak to a coordinator
                  </a>
                </div>
              </div>
            </div>

            {/* ------------- right: the stamped certificate ------------- */}
            <div className="relative flex flex-col justify-between overflow-hidden bg-stamp-700 text-stamp-100">
              <div
                aria-hidden="true"
                className="guilloche pointer-events-none absolute inset-0 text-stamp-200"
              />

              <div className="relative border-b border-stamp-500/50 px-6 py-4">
                <span className="field-caption text-stamp-300">
                  Parties to the file
                </span>
              </div>

              <dl className="relative flex-1 px-6 py-8 lg:px-8">
                <div>
                  <dt className="u-caption text-stamp-300">
                    Bought separately
                  </dt>
                  <dd className="mt-3 font-mono text-6xl leading-none text-white/45 lg:text-7xl">
                    {custodyPartyCount.typical}
                  </dd>
                </div>
                <div className="mt-9 border-t border-stamp-500/50 pt-9">
                  <dt className="u-caption text-stamp-200">With Noble Star</dt>
                  <dd className="mt-3 font-mono text-6xl leading-none text-white lg:text-7xl">
                    {custodyPartyCount.noblestar}
                  </dd>
                </div>
              </dl>

              <div className="relative flex items-end justify-between gap-4 border-t border-stamp-500/50 px-6 py-6 lg:px-8">
                <p className="max-w-[14rem] text-xs leading-relaxed text-stamp-200">
                  Brokerage, drivers and packing are held in-house, not
                  subcontracted.
                </p>
                <Attestation
                  label="Registered broker"
                  authority="Dubai & Abu Dhabi Customs"
                  tone="stamp"
                  rotate={-5}
                  className="shrink-0 bg-stamp-700/60 text-stamp-200"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ======================= The proof: custody ======================= */}
      <Section tone="white">
        <SectionHeader
          eyebrow="Chain of custody"
          title="Six steps, and who performs each one"
          intro="Every rule in the left column is a change of company. Every one of them is a place where a customs query reaches somebody who then has to reach somebody else."
        />
        <CustodyChain />
      </Section>

      {/* ============================ Services ===========================
          Skipped entirely while the section is held, rather than shown as a
          grid of seven links to a holding notice. */}
      {!isHeld("/services") ? (
        <Section>
          <SectionHeader
            eyebrow="The range"
            title="What we will carry, and clear"
            intro="From a single pallet of consolidated cargo to a chartered aircraft, and from a routine import declaration to a first-time food product registration."
          />
          <ServiceGrid services={services} className="mt-12" />
        </Section>
      ) : null}

      {/* ========================= The specialisation ===================== */}
      <Section tone="violet" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="linescreen pointer-events-none absolute inset-0 text-stamp-300"
        />
        <div className="relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeader
              eyebrow="Where we specialise"
              title="Food is where the money is lost"
              intro="Every forwarder moves boxes. Fewer understand what happens when the box contains food — and nearly every costly mistake is made in the paperwork, before the goods ever ship."
              onDark
            />
            {/* The argument stands on its own; only the link out is held. */}
            {!isHeld("/services") ? (
              <Link
                href="/services/food-cargo"
                className={buttonVariants({
                  variant: "onViolet",
                  size: "lg",
                  className: "mt-9",
                })}
              >
                Our food cargo service
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            ) : (
              <Link
                href="/quote"
                className={buttonVariants({
                  variant: "onViolet",
                  size: "lg",
                  className: "mt-9",
                })}
              >
                Ask us about a food consignment
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            )}
          </div>

          <div>
            <p className="u-caption text-stamp-300">
              The three things that stop a consignment
            </p>
            <ol className="mt-6">
              {foodFailures.map((item, i) => (
                <li
                  key={item.cause}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-2 border-t border-stamp-500/50 py-6"
                >
                  <span className="font-mono text-sm text-stamp-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {item.cause}
                    </h3>
                    <p className="mt-2 leading-relaxed text-stamp-100/80">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* ============================ Coverage =========================== */}
      <Section tone="white">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Jurisdictions"
            title="Six markets, six customs systems"
            intro="Each GCC state files through its own system, and each refuses consignments for its own reasons. These are the ones we file in."
          />
          <Link
            href="/coverage"
            className={buttonVariants({ variant: "outline" })}
          >
            Full coverage
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <DataTable className="mt-12">
          <thead>
            <tr>
              <DataHead>Market</DataHead>
              <DataHead>Arrangement</DataHead>
              <DataHead className="hidden sm:table-cell">
                Declaration system
              </DataHead>
              <DataHead className="hidden lg:table-cell">Sea ports</DataHead>
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr key={country.slug} className="group">
                <DataCell>
                  <Link
                    href={`/coverage#${country.slug}`}
                    className="font-semibold text-ink-900 transition-colors hover:text-stamp-700"
                  >
                    {country.name}
                  </Link>
                </DataCell>
                <DataCell>
                  <Marker tone={country.directService ? "cleared" : "plain"}>
                    {country.directService ? "Own operations" : "Partner agent"}
                  </Marker>
                </DataCell>
                <DataCell className="hidden font-mono text-[0.8125rem] text-ink-600 sm:table-cell">
                  {declarationSystem(country.customsNote)}
                </DataCell>
                <DataCell className="hidden text-ink-600 lg:table-cell">
                  {country.seaPorts.length}
                </DataCell>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </Section>

      {/* ============================== FAQ ============================== */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeader
            eyebrow="Before you book"
            title="Straight answers"
          />
          <FaqAccordion faqs={homeFaqs} />
        </div>
      </Section>

      {/* ============================ Insights =========================== */}
      {posts.length > 0 && !isHeld("/blog") ? (
        <Section tone="white">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="From the desk"
              title="Notes on GCC customs"
              intro="Practical guidance on trade lanes, documentation and the mistakes we see repeated."
            />
            <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
              All notes
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="field-grid mt-12 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug} className="contents">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col bg-white p-6 transition-colors duration-150 hover:bg-stamp-50"
                >
                  <span className="u-caption text-stamp-600">
                    {post.tags[0] ?? "Note"}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold leading-snug text-ink-900 transition-colors group-hover:text-stamp-700">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
                    {post.description}
                  </p>
                  <span className="mt-6 font-mono text-[0.6875rem] text-ink-400">
                    {formatDate(post.date)} · {post.readingTime} min
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <CtaBand />
    </>
  );
}

/**
 * Pull the named declaration system out of a country's customs note, so the
 * homepage table stays in step with `lib/coverage.ts` instead of repeating it.
 */
function declarationSystem(note: string): string {
  const known = [
    "FASAH",
    "SABER",
    "Bayan",
    "Al-Nadeeb",
    "OFOQ",
    "Dubai Customs",
  ];
  const found = known.filter((name) => note.includes(name));
  return found.length ? found.join(" · ") : "—";
}
