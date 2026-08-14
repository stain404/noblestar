import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section className="min-h-[60vh]">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-stamp-600">
          404
        </p>
        <h1 className="mt-3 text-h1">This page has gone off course</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-600">
          The page you were looking for does not exist, or has moved. Our
          services and coverage are a good place to pick the trail back up.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className={buttonVariants({ variant: "primary", size: "lg" })}
          >
            Back to home
          </Link>
          <Link
            href="/services"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Browse services
          </Link>
        </div>
      </div>
    </Section>
  );
}
