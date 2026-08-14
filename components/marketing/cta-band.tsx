import Link from "next/link";
import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { site } from "@/lib/site";

/**
 * The page's close, set as the signature block at the foot of a document:
 * ink ground, security screen, and the two ways to reach a person. Every page
 * ends anchored on this rather than trailing off.
 */
export function CtaBand({
  title = "Send us the lane and the commodity.",
  intro = "You will have a considered quote from a coordinator who has read the file — not an automated estimate. If the mode you asked for is the wrong one, we will say so.",
}: {
  title?: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-900">
      <div
        aria-hidden="true"
        className="guilloche pointer-events-none absolute inset-0 text-stamp-400"
      />
      <Container className="relative py-16 lg:py-24">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <span className="u-caption text-stamp-300">Next step</span>
            <h2 className="u-wide mt-5 text-h2 text-white">{title}</h2>
            <p className="mt-5 leading-relaxed text-ink-300">{intro}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link href="/quote" className={buttonVariants({ size: "lg" })}>
              Open a file
            </Link>
            <a
              href={site.contact.phones[0].href}
              className={buttonVariants({ variant: "onViolet", size: "lg" })}
            >
              <Phone className="size-4" aria-hidden="true" />
              {site.contact.phones[0].number}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
