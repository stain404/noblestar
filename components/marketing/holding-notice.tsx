import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Marker } from "@/components/ui/document";
import { site } from "@/lib/site";

/**
 * Served in place of a section that is not ready yet (see `heldSections` in
 * `lib/site.ts`).
 *
 * It uses the same device the rest of the site uses for anything unverified —
 * the held marker and the oxide overprint — so an unfinished section reads as
 * a document awaiting its stamp rather than as a broken page.
 */
export function HoldingNotice({
  section,
  detail,
}: {
  section: string;
  detail: string;
}) {
  return (
    <section className="border-t-2 border-oxide-500 bg-paper-50">
      <Container className="py-20 lg:py-32">
        <div className="max-w-2xl">
          <Marker tone="held">In preparation</Marker>

          <h1 className="u-wide mt-8 text-h1 text-ink-900">
            {section} is not ready to be published.
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-ink-600">{detail}</p>

          <p className="mt-5 leading-relaxed text-ink-600">
            The rest of the site is live. Coverage, the quote form and our
            contact details are all current, and a coordinator can answer
            anything this section would have told you.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/quote" className={buttonVariants({ size: "lg" })}>
              Open a file
            </Link>
            <a
              href={site.contact.phones[0].href}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              {site.contact.phones[0].number}
            </a>
          </div>

          <p className="u-caption mt-12 border-t border-paper-300 pt-6 text-ink-500">
            Held pending review · {site.name} Services L.L.C
          </p>
        </div>
      </Container>
    </section>
  );
}
