import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/marketing/cta-band";
import { FaqAccordion } from "@/components/marketing/faq";
import { PageHero } from "@/components/marketing/page-hero";
import { MdxContent } from "@/components/mdx/mdx-content";
import { JsonLd } from "@/components/seo/json-ld";
import { buttonVariants } from "@/components/ui/button";
import { Field } from "@/components/ui/document";
import { Photograph } from "@/components/ui/photograph";
import { Section } from "@/components/ui/section";
import { ServiceIcon } from "@/components/ui/service-icon";
import { getService, getServices } from "@/lib/content";
import { breadcrumbSchema, faqSchema, pageMetadata, serviceSchema } from "@/lib/seo";
import { HoldingNotice } from "@/components/marketing/holding-notice";
import { isHeld } from "@/lib/site";

export function generateStaticParams() {
  return getServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    ...pageMetadata({
      title: service.meta.title,
      description: service.meta.summary,
      path: `/services/${slug}`,
    }),
    // Held sections must not be indexed while they are unfinished.
    ...(isHeld("/services")
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (isHeld("/services")) {
    return (
      <HoldingNotice
        section="This service"
        detail="The transit times, document checklists and customs notes on this page were written from general GCC trade knowledge and are awaiting review by operations before they go live."
      />
    );
  }

  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const { meta, body } = service;
  const related = getServices().filter((s) => meta.related?.includes(s.slug));
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: meta.navTitle, path: `/services/${slug}` },
  ];

  return (
    <>
      <JsonLd
        schema={[
          serviceSchema({
            name: meta.title,
            description: meta.summary,
            path: `/services/${slug}`,
          }),
          breadcrumbSchema(breadcrumbs),
          ...(meta.faqs?.length ? [faqSchema(meta.faqs)] : []),
        ]}
      />

      <PageHero
        eyebrow="Service"
        title={meta.title}
        intro={meta.summary}
        breadcrumbs={breadcrumbs}
      >
        <Link
          href={`/quote?service=${slug}`}
          className={buttonVariants({ variant: "primary", size: "lg" })}
        >
          Get a quote for {meta.navTitle.toLowerCase()}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </PageHero>

      {/* The exhibit attached to this service's file. Sits between the hero
          and the endorsements so it does not compete with the heading, and is
          simply absent until a photograph for this service is supplied. */}
      {meta.photo ? (
        <div className="border-b border-ink-300 bg-paper-50">
          <div className="container-page py-10">
            <Photograph
              src={meta.photo}
              alt={
                meta.photoAlt ??
                `Noble Star Shipping ${meta.navTitle.toLowerCase()} operations`
              }
              caption={meta.navTitle}
              aspect="16 / 9"
              priority
              sizes="(min-width: 1280px) 78rem, 100vw"
            />
          </div>
        </div>
      ) : null}

      {/* What the service includes, set as the endorsements block of the form. */}
      <div className="border-b border-ink-300 bg-paper-50">
        <div className="container-page py-10">
          <span className="field-caption">Included</span>
          <div className="field-grid mt-4 sm:grid-cols-2 lg:grid-cols-4">
            {meta.highlights.map((highlight) => (
              <div
                key={highlight}
                className="bg-white p-5 text-sm leading-snug text-ink-700"
              >
                {highlight}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <article className="min-w-0">
            <MdxContent source={body} />
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {meta.transitTimes?.length ? (
              <Field caption="Indicative transit times">
                <dl className="space-y-0">
                  {meta.transitTimes.map((row) => (
                    <div
                      key={row.lane}
                      className="flex items-baseline justify-between gap-4 border-b border-paper-200 py-3 last:border-0"
                    >
                      <dt className="text-sm leading-snug text-ink-600">
                        {row.lane}
                      </dt>
                      <dd className="shrink-0 font-mono text-sm text-ink-900">
                        {row.time}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-xs leading-relaxed text-ink-500">
                  Indicative only. Actual transit depends on schedule, customs
                  and border conditions on the day.
                </p>
              </Field>
            ) : null}

            {meta.documents?.length ? (
              <Field caption="Documents we will need">
                <ol className="space-y-0">
                  {meta.documents.map((doc, i) => (
                    <li
                      key={doc}
                      className="grid grid-cols-[2rem_1fr] border-b border-paper-200 py-3 text-sm leading-snug text-ink-600 last:border-0"
                    >
                      <span className="font-mono text-[0.6875rem] text-ink-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {doc}
                    </li>
                  ))}
                </ol>
              </Field>
            ) : null}

            <Field caption="If in doubt" className="bg-stamp-50">
              <h2 className="font-semibold text-ink-900">
                Not sure this is the right service?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                Tell us the route and the cargo and we will recommend the mode
                that actually fits — including the cheaper one.
              </p>
              <Link
                href="/quote"
                className={buttonVariants({
                  variant: "primary",
                  className: "mt-4 w-full",
                })}
              >
                Request a quote
              </Link>
            </Field>
          </aside>
        </div>
      </Section>

      {meta.faqs?.length ? (
        <Section tone="white">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <h2 className="text-h2">
              {meta.navTitle} — frequently asked questions
            </h2>
            <FaqAccordion faqs={meta.faqs} />
          </div>
        </Section>
      ) : null}

      {related.length ? (
        <Section>
          <h2 className="text-h2">Related services</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/services/${item.slug}`}
                  className="group flex h-full items-start gap-3 border border-ink-300 bg-white p-5 transition-colors duration-150 ease-[var(--ease-stamp)] hover:bg-stamp-50 hover:border-stamp-500"
                >
                  <ServiceIcon
                    name={item.icon}
                    className="mt-0.5 size-5 shrink-0 text-stamp-600"
                  />
                  <span>
                    <span className="block font-semibold text-ink-900">
                      {item.navTitle}
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-ink-500">
                      {item.summary}
                    </span>
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
