import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/marketing/cta-band";
import { PageHero } from "@/components/marketing/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { buttonVariants } from "@/components/ui/button";
import { Attestation, Field, Marker } from "@/components/ui/document";
import { Section, SectionHeader } from "@/components/ui/section";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { HoldingNotice } from "@/components/marketing/holding-notice";
import { isHeld } from "@/lib/site";

export const metadata = {
  ...pageMetadata({
    title: "About Noble Star Shipping",
    description:
      "A Dubai-based freight forwarder and customs broker serving the GCC, with in-house brokerage, our own drivers and a specialisation in food cargo.",
    path: "/about",
  }),
  // Held sections must not be indexed while they are unfinished.
  ...(isHeld("/about") ? { robots: { index: false, follow: true } } : {}),
};

const values = [
  {
    title: "Tell people the truth",
    body: "If sea is cheaper than the air freight you asked for, we will say so. If a deadline is not achievable, we will say that too — before you commit, not after.",
  },
  {
    title: "Own the whole file",
    body: "Freight and customs sit under one roof so nothing falls between a forwarder and a broker. One reference number, one coordinator, one point of accountability.",
  },
  {
    title: "Prevent, do not firefight",
    body: "Most costly problems in this business are visible in the paperwork days before the cargo moves. We look for them then, when they are still cheap to fix.",
  },
];

export default function AboutPage() {
  if (isHeld("/about")) {
    return (
      <HoldingNotice
        section="About us"
        detail="Our company profile, credentials and the numbers behind them are still being confirmed — including the trade licence and customs broker registration numbers we would want listed here."
      />
    );
  }

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <JsonLd schema={breadcrumbSchema(breadcrumbs)} />

      <PageHero
        eyebrow="About us"
        title="We give you control of your shipments"
        intro="Noble Star Shipping is a Dubai-based freight forwarder and customs broker. We handle every detail of your cargo — from collection at your supplier's door to delivery at your customer's — giving you a smooth run on your supply chain."
        breadcrumbs={breadcrumbs}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-h2">Built around a single idea</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-600">
              <p>
                Most of what goes wrong in freight goes wrong at a handover. The
                forwarder books the vessel but the broker files the declaration.
                The broker clears the cargo but a third party trucks it. Each
                party is doing their own job correctly, and the shipment still
                sits at the port for a week because nobody owns the gap between
                them.
              </p>
              <p>
                Noble Star was built to remove those gaps. Freight forwarding and
                customs brokerage are both in-house functions. Our UAE drivers are
                recruited and trained by us. When a consignment is queried by
                customs, the notification comes to us directly and we act the same
                day, because there is no one to escalate to.
              </p>
              <p>
                We started in Dubai handling shipping, clearance and warehousing
                for UAE importers. As our customers grew into Saudi Arabia, Oman
                and the wider Gulf, we grew with them. Today we work across all six
                GCC markets — with our own operations where we have them and
                carefully vetted partner agents where we do not.
              </p>
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Field className="border-ink-900 bg-ink-900 text-ink-300">
              <span className="field-caption text-stamp-300">
                By the numbers
              </span>
              <dl className="space-y-0">
                {site.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-baseline justify-between gap-4 border-b border-ink-800 py-3.5 last:border-0"
                  >
                    <dt className="text-sm text-ink-400">{stat.label}</dt>
                    <dd className="shrink-0 font-mono text-xl text-white">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Field>

            <Field caption="Procurement">
              <h2 className="font-semibold text-ink-900">Company profile</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                A full overview of our services, coverage and credentials for
                your procurement file.
              </p>
              {/* TODO: replace with the client-supplied PDF in /public. */}
              <Link
                href="/contact"
                className={buttonVariants({
                  variant: "outline",
                  className: "mt-4 w-full",
                })}
              >
                Request the profile
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Field>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeader
          eyebrow="How we work"
          title="Three commitments we actually keep"
          align="center"
        />
        {/* Three clauses of the same undertaking — no icon tiles, because the
            commitment is the content and an icon would only decorate it. */}
        <ol className="field-grid mt-12 lg:grid-cols-3">
          {values.map((value, i) => (
            <li key={value.title} className="contents">
              <div className="flex h-full flex-col bg-white p-6">
                <span className="font-mono text-[0.6875rem] text-ink-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-lg font-semibold">{value.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-600">
                  {value.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-h2">Where we specialise</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">
              Every forwarder moves boxes. Fewer understand what happens when the
              box contains food — municipality label registration, remaining
              shelf life at arrival, halal certification from a recognised body,
              a cold chain that has to hold from the factory to the shelf.
            </p>
            <p className="mt-5 leading-relaxed text-ink-600">
              Food cargo is the category where the most money is lost to
              avoidable mistakes, and almost all of those mistakes are made
              before the goods ever ship. It is where we have invested most
              heavily — in our own packing facility, in the regulatory knowledge,
              and in the habit of asking awkward questions early.
            </p>
            <Link
              href="/services/food-cargo"
              className={buttonVariants({ variant: "primary", className: "mt-8" })}
            >
              Our food cargo service
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          {/* The one place the world's own logic is turned on the company:
              what is attested carries a mark, what is not is marked held. */}
          <Field caption="Credentials and registrations">
            <div className="flex items-start justify-between gap-6">
              <p className="text-sm leading-relaxed text-ink-700">
                Noble Star Shipping is a licensed trading entity in the United
                Arab Emirates and is registered as a customs broker with Dubai
                Customs and Abu Dhabi Customs.
              </p>
              <Attestation
                label="Registered"
                authority="Dubai & Abu Dhabi Customs"
                tone="seal"
                rotate={3}
                className="shrink-0"
              />
            </div>

            <div className="mt-7 border-t border-paper-200 pt-6">
              <Marker tone="held">Awaiting documents</Marker>
              <p className="mt-4 text-sm leading-relaxed text-ink-500">
                Trade licence number, customs broker registration number and
                association memberships (FIATA, IATA) will be published here as
                soon as operations supplies them.
              </p>
            </div>
          </Field>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
