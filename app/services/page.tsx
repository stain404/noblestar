import { CtaBand } from "@/components/marketing/cta-band";
import { HoldingNotice } from "@/components/marketing/holding-notice";
import { PageHero } from "@/components/marketing/page-hero";
import { ServiceGrid } from "@/components/marketing/service-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { Section } from "@/components/ui/section";
import { getServices } from "@/lib/content";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { isHeld } from "@/lib/site";

export const metadata = {
  ...pageMetadata({
    title: "Freight & Customs Services",
    description:
      "Sea, air and road freight, customs clearance, FCL and LCL cargo and temperature-controlled food logistics across the GCC.",
    path: "/services",
  }),
  // Held sections must not be indexed while they are unfinished.
  ...(isHeld("/services")
    ? { robots: { index: false, follow: true } }
    : {}),
};

export default function ServicesPage() {
  if (isHeld("/services")) {
    return (
      <HoldingNotice
        section="Our service range"
        detail="The seven services we offer — sea, air and road freight, customs clearance, FCL, LCL and food cargo — are written up but not yet signed off for publication."
      />
    );
  }

  const services = getServices();

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <PageHero
        eyebrow="Services"
        title="Every leg of the chain, under one file"
        intro="We move cargo by sea, air and road across the GCC and clear it through customs ourselves. Engage us for the whole journey or for a single leg."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />

      <Section>
        <ServiceGrid services={services} />
      </Section>

      <CtaBand />
    </>
  );
}
