import type { Metadata } from "next";
import { Archivo, Spline_Sans_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { JsonLd } from "@/components/seo/json-ld";
import { getServices } from "@/lib/content";
import { organizationSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

/**
 * Archivo carries the whole surface. It is a grotesque out of signage and
 * printed-form lettering, and its width axis is what lets a heading be wide
 * the way stencilled and stamped lettering is wide — without a second family.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

/** Field captions, reference numbers and every cell of tabular data. */
const splineMono = Spline_Sans_Mono({
  variable: "--font-spline-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Freight Forwarder & Customs Broker Dubai | Noble Star",
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
  },
  robots: { index: true, follow: true },
};

/**
 * The direction contract, emitted as a real HTML comment.
 *
 * A JSX comment would be stripped by the compiler; this survives into the
 * production markup, so the rules the world was built under travel with the
 * thing they govern instead of living only in a doc nobody re-opens.
 */
const DIRECTION_CONTRACT = `
  ATTESTED — direction contract.

  THESIS: In GCC trade nothing is true until an authority has stamped it. This
  site is a document that carries its own attestations. It refuses the category
  arrangement — navy hero, glowing world-map routes, stat counters,
  icon-in-a-pill eyebrow badges — and its predictable opposite, Swiss
  white-space minimalism.

  OWN-WORLD: Security-paper ground (cool green-grey, never cream), stamp-pad
  ink that is violet not neutral, attestation violet for every mark and primary
  action, oxide red reserved for provisional and refused, seal green for
  cleared and own-operation. One container primitive: the ruled field with a
  mono caption naming what it holds. No cards, no corners, no shadows.
  Archivo on its width axis; Spline Sans Mono for captions and tabular data.

  STORY: A coordinator comparing forwarders sees that every step of a
  consignment is performed by one company, understands that handovers are where
  freight fails, and opens a file.

  FIRST VIEWPORT: A half-completed shipping file. Left, a ruled field grid where
  the headline sits in the Description of Goods box. Right, the chain-of-custody
  column: six steps, each marked with who performs it, all reading NOBLE STAR.
  Primary action is the form's own last box.

  FORM: Attestation stamps, seals and official marks — candidate 7 of 7 on the
  grounded list, assigned by seed 3187a3bc. Staged as the document itself rather
  than the dealt filament-zoom staging.

  FINISH: unreviewed and undocumented is unfinished; this build ends with the
  finish review, the verdict, and DESIGN.md
`;

function DirectionContract() {
  return (
    <div
      hidden
      dangerouslySetInnerHTML={{ __html: `<!--${DIRECTION_CONTRACT}-->` }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const services = getServices();

  return (
    <html
      lang="en"
      className={`${archivo.variable} ${splineMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <DirectionContract />
        <JsonLd schema={organizationSchema()} />
        <Header services={services} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
