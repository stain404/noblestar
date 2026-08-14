import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/marketing/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { Field } from "@/components/ui/document";
import { Section } from "@/components/ui/section";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Noble Star Shipping",
  description:
    "Call, WhatsApp or email Noble Star Shipping in Dubai for freight forwarding and customs clearance across the GCC.",
  path: "/contact",
});

export default function ContactPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <JsonLd schema={breadcrumbSchema(breadcrumbs)} />

      <PageHero
        eyebrow="Contact"
        title="Talk to a coordinator"
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
              {/* TODO: swap for the exact office address and an embedded map once supplied. */}
              <p className="mt-5 border border-dashed border-ink-300 bg-paper-100 p-4 text-xs leading-relaxed text-ink-500">
                Full street address and a map will be added here once the client
                supplies the registered office details.
              </p>
            </Field>
          </div>

          <ContactForm />
        </div>
      </Section>
    </>
  );
}
