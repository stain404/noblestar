import { Suspense } from "react";
import { Clock, Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { QuoteForm } from "@/components/forms/quote-form";
import { PageHero } from "@/components/marketing/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { Field } from "@/components/ui/document";
import { Section } from "@/components/ui/section";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Request a Freight Quote",
  description:
    "Tell us the route, the cargo and the deadline. A Noble Star coordinator will come back with a considered quote, usually within one business day.",
  path: "/quote",
});

const reassurances = [
  {
    icon: Clock,
    title: "A reply within one business day",
    body: "Usually the same day for standard lanes. Complex or hazardous cargo takes longer because we confirm carrier acceptance before quoting.",
  },
  {
    icon: ShieldCheck,
    title: "A real coordinator, not a calculator",
    body: "Someone who moves cargo on this lane reads your request. If a different mode would serve you better, they will say so.",
  },
];

export default function QuotePage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Request a quote", path: "/quote" },
  ];

  return (
    <>
      <JsonLd schema={breadcrumbSchema(breadcrumbs)} />

      <PageHero
        eyebrow="Request a quote"
        title="Request a freight quote"
        intro="Four short steps. The more precise the cargo details, the more precise the quote — and the fewer surprises later."
        breadcrumbs={breadcrumbs}
      />

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <Suspense
            fallback={
              <div className="h-[32rem] animate-pulse border border-ink-300 bg-white" />
            }
          >
            <QuoteForm />
          </Suspense>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {reassurances.map((item) => (
              <Field key={item.title}>
                <span className="inline-flex size-10 items-center justify-center bg-stamp-50 text-stamp-700">
                  <item.icon
                    className="size-5"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </span>
                <h2 className="mt-4 font-bold text-ink-900">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {item.body}
                </p>
              </Field>
            ))}

            <Field className="bg-ink-900 text-ink-300">
              <h2 className="font-bold text-white">Prefer to talk it through?</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">
                Some shipments are easier to explain than to type. Call or message
                us and we will take the details down for you.
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                {site.contact.phones.map((phone) => (
                  <li key={phone.href}>
                    <a
                      href={phone.href}
                      className="inline-flex items-center gap-2.5 text-ink-300 transition-colors hover:text-white"
                    >
                      <Phone
                        className="size-4 text-stamp-400"
                        aria-hidden="true"
                      />
                      {phone.number}
                      <span className="text-xs text-ink-400">
                        {phone.label}
                      </span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={site.contact.whatsapp.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2.5 text-ink-300 transition-colors hover:text-white"
                  >
                    <MessageCircle
                      className="size-4 text-stamp-400"
                      aria-hidden="true"
                    />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="inline-flex items-center gap-2.5 text-ink-300 transition-colors hover:text-white"
                  >
                    <Mail className="size-4 text-stamp-400" aria-hidden="true" />
                    {site.contact.email}
                  </a>
                </li>
              </ul>
            </Field>
          </aside>
        </div>
      </Section>
    </>
  );
}
