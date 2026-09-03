import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import {
  DataCell,
  DataHead,
  DataTable,
  Marker,
} from "@/components/ui/document";
import { CtaBand } from "@/components/marketing/cta-band";
import { ShipmentFlow } from "@/components/marketing/shipment-flow";
import { FaqAccordion } from "@/components/marketing/faq";
import { ServiceGrid } from "@/components/marketing/service-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { getPosts, getServices } from "@/lib/content";
import { countries } from "@/lib/coverage";
import { photo } from "@/lib/photos";
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
  const heroPhoto = photo("background");

  return (
    <>
      <JsonLd schema={faqSchema(homeFaqs)} />

      {/* ========================== The banner ===========================
          An image-led band: the photograph carries the full width and the
          type sits directly on it.

          The photograph is held back rather than shown raw — desaturated part
          of the way and washed with ink — so it reads as a ground this
          document is printed on rather than as a picture the page is sitting
          in front of. The scrims below are set from the image's brightest
          pixel, not its average, so the type's contrast never depends on what
          the photograph happens to be doing behind it. */}
      <section className="relative flex min-h-[30rem] items-center border-b border-ink-300 bg-ink-900 lg:min-h-[38rem]">
        {heroPhoto ? (
          <>
            <Image
              src={heroPhoto}
              alt="A container ship berthed beneath gantry cranes at sunset."
              fill
              priority
              sizes="100vw"
              className="object-cover grayscale-[0.3]"
            />
            {/* Two scrims, one per breakpoint, because the text column is a
                different fraction of the width at each.

                75% is the floor, and it is not arbitrary. Measured against
                this image's brightest pixel — the sun — 75% ink composites to
                a luminance of 0.082, which is 7.9:1 for the white heading and
                5.2:1 for the violet caption. Both clear AA with room, and
                they clear it over the worst pixel in the frame rather than
                the average one, so the type is safe wherever the sun sits.

                Going darker than this buys contrast nobody needs and costs
                the photograph: at 88% a mid-brightness pixel composites to
                RGB 35, which is why the first version of this looked like a
                black band rather than a port.

                From lg up the copy is capped at 42rem inside an 82rem
                container, so it never passes 55% across. The gradient holds
                the floor to that point and then opens to 25%, where the ship
                and the cranes actually read. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-ink-900/75 lg:hidden"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 hidden lg:block"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(23,19,31,0.88) 0%, rgba(23,19,31,0.75) 55%, rgba(23,19,31,0.25) 100%)",
              }}
            />
          </>
        ) : null}

        {/* The empty slot, named. Never rendered in a production build. */}
        {!heroPhoto && process.env.NODE_ENV !== "production" ? (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-4 border border-dashed border-stamp-400/40"
            />
            <span className="u-caption pointer-events-none absolute bottom-5 right-5 hidden text-stamp-200 lg:block">
              Photograph slot · public/photos/background.png
            </span>
          </>
        ) : null}

        <Container className="relative py-20 lg:py-28">
          <div className="max-w-2xl">
            <span className="u-caption text-stamp-200">Description of goods</span>

            {/* Deliberately the same proposition as the document title in
                app/layout.tsx, in the same words. The h1 and the title tag
                agreeing on one phrase is worth more than two clever variants
                competing. The differentiator moved to the paragraph below —
                the heading says what this company is, the body says why it is
                different. */}
            <h1 className="u-wide mt-6 text-h1 text-white">
              Freight forwarding and customs clearance across the GCC.
            </h1>

            {/* Deliberately no company count. The five-versus-two arithmetic
                asks a reader to hold six jobs and two totals in their head
                before the point lands, and the point is not a number — it is
                that the work is not subcontracted. The chain table further
                down proves it far better than a figure does: one column is
                five different company names, the other says Noble Star five
                times, and that reads in about two seconds. */}
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper-100">
              Freight forwarding, customs clearance, packing and final delivery
              are all <strong className="font-semibold text-white">ours</strong>
              . Most forwarders subcontract three of the four — and every
              company they hand your cargo to is another place a question can
              sit unanswered for a day.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className={buttonVariants({ size: "lg" })}>
                Open a file
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href={site.contact.phones[0].href}
                className={buttonVariants({ variant: "onViolet", size: "lg" })}
              >
                <Phone className="size-4" aria-hidden="true" />
                Speak to a coordinator
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== The proof: the process ===================== */}
      <Section tone="white">
        <SectionHeader
          eyebrow="Start to finish"
          title="How a shipment runs with us"
          intro="From the booking to the consignee's door, on one file with one coordinator. Every step below, and who carries it out — the work is ours, not subcontracted."
        />
        <ShipmentFlow />
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
      {/* Set on the ordinary paper substrate rather than as a drenched violet
          band: the argument is the loudest thing on the page already, and it
          reads as part of the same document as the sections around it. The
          rule above it does the separating, the way it does everywhere else in
          this system. Oxide is the one colour used, on the numbers — it is the
          overprint reserved for refused and stopped, which is precisely what
          each of these three causes is. */}
      <Section className="border-t border-paper-300">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeader
              eyebrow="Where we specialise"
              title="Food is where the money is lost"
              intro="Every forwarder moves boxes. Fewer understand what happens when the box contains food — and nearly every costly mistake is made in the paperwork, before the goods ever ship."
            />
            {/* The argument stands on its own; only the link out is held. */}
            {!isHeld("/services") ? (
              <Link
                href="/services/food-cargo"
                className={buttonVariants({ size: "lg", className: "mt-9" })}
              >
                Our food cargo service
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            ) : (
              <Link
                href="/quote"
                className={buttonVariants({ size: "lg", className: "mt-9" })}
              >
                Ask us about a food consignment
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            )}
          </div>

          <div>
            <p className="u-caption text-stamp-600">
              The three things that stop a consignment
            </p>
            <ol className="mt-6">
              {foodFailures.map((item, i) => (
                <li
                  key={item.cause}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-2 border-t border-paper-300 py-6"
                >
                  <span className="font-mono text-sm text-oxide-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink-900">
                      {item.cause}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink-600">
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
                  <span className="mt-6 font-mono text-[0.6875rem] text-ink-500">
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
