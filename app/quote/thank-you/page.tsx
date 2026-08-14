import Link from "next/link";
import { CheckCircle2, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = {
  ...pageMetadata({
    title: "Thank you — we have your request",
    description: "Your quote request has reached the Noble Star Shipping team.",
    path: "/quote/thank-you",
  }),
  // A conversion confirmation page has no business in search results.
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <Section className="min-h-[60vh]">
      <div className="mx-auto max-w-xl text-center">
        <span className="inline-flex size-14 items-center justify-center bg-seal-100 text-seal-700">
          <CheckCircle2 className="size-7" strokeWidth={1.6} aria-hidden="true" />
        </span>

        <h1 className="mt-6 text-h1">Thank you — we have your request</h1>

        <p className="mt-5 text-lg leading-relaxed text-ink-600">
          A coordinator is reviewing it now. You will hear from us within one
          business day, usually sooner. We have also sent a confirmation to your
          email address.
        </p>

        <p className="mt-4 leading-relaxed text-ink-600">
          If it is urgent, call us — mention that you submitted a request online
          and we will pull it up.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={site.contact.phones[0].href}
            className={buttonVariants({ variant: "primary", size: "lg" })}
          >
            <Phone className="size-4" aria-hidden="true" />
            {site.contact.phones[0].number}
          </a>
          <Link
            href="/blog"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Read our GCC customs guides
          </Link>
        </div>
      </div>
    </Section>
  );
}
