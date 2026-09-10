import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { FaqAccordion } from "@/components/marketing/faq";
import { PageHero } from "@/components/marketing/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { Field } from "@/components/ui/document";
import { Section, SectionHeader } from "@/components/ui/section";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const faqs = [
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

export const metadata = pageMetadata({
  title: "Contact Our Dubai Freight Team",
  description:
    "Call, WhatsApp or email our Dubai team for freight forwarding and customs clearance across the GCC. We answer the same business day, Mon to Sat.",
  path: "/contact",
});

export default function ContactPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <JsonLd schema={[breadcrumbSchema(breadcrumbs), faqSchema(faqs)]} />

      <PageHero
        eyebrow="Contact"
        title="Talk to a Dubai freight coordinator"
        intro="Call, message or write to us. Whichever route you take, a person who moves cargo for a living will answer — not a ticket queue."
        breadcrumbs={breadcrumbs}
      />

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <div className="space-y-6">
            <Field>
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-stamp-600">
                Direct lines
              </h2>
              <ul className="mt-5 space-y-4">
                {site.contact.phones.map((phone) => (
                  <li key={phone.href}>
                    <a
                      href={phone.href}
                      className="group flex items-center gap-3 text-ink-900"
                    >
                      <span className="inline-flex size-9 shrink-0 items-center justify-center bg-stamp-50 text-stamp-700 transition-colors group-hover:bg-stamp-100 group-hover:text-stamp-700">
                        <Phone className="size-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-semibold">
                          {phone.number}
                        </span>
                        <span className="text-xs text-ink-500">
                          {phone.label}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}

                <li>
                  <a
                    href={site.contact.whatsapp.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center gap-3 text-ink-900"
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center bg-seal-100 text-seal-700">
                      <MessageCircle className="size-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-semibold">WhatsApp</span>
                      <span className="text-xs text-ink-500">
                        {site.contact.whatsapp.number}
                      </span>
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="group flex items-center gap-3 text-ink-900"
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center bg-stamp-50 text-stamp-700 transition-colors group-hover:bg-stamp-100 group-hover:text-stamp-700">
                      <Mail className="size-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-semibold">
                        {site.contact.email}
                      </span>
                      <span className="text-xs text-ink-500">
                        General enquiries
                      </span>
                    </span>
                  </a>
                </li>
              </ul>
            </Field>

            <Field>
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-stamp-600">
                Office
              </h2>
              <p className="mt-4 flex items-start gap-3 text-ink-900">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-ink-400"
                  aria-hidden="true"
                />
                <span className="font-medium">{site.contact.address.full}</span>
              </p>
              <p className="mt-3 flex items-start gap-3 text-sm text-ink-600">
                <Clock
                  className="mt-0.5 size-4 shrink-0 text-ink-400"
                  aria-hidden="true"
                />
                {site.contact.hours}
              </p>
            </Field>
          </div>

          <ContactForm />
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeader eyebrow="Before you book" title="Straight answers" />
          <FaqAccordion faqs={faqs} />
        </div>
      </Section>
    </>
  );
}
