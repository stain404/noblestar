import type { Metadata } from "next";
import { site } from "./site";

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

/** Builds page metadata with canonical URL and OG/Twitter cards filled in. */
export function pageMetadata({
  title,
  description,
  path = "/",
  type = "website",
  publishedTime,
}: {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/* --------------------------------- JSON-LD ---------------------------------- */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.contact.email,
    telephone: site.contact.phones.map((p) => p.number),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.contact.address.city,
      addressCountry: "AE",
    },
    areaServed: ["AE", "SA", "OM", "QA", "KW", "BH"].map((code) => ({
      "@type": "Country",
      identifier: code,
    })),
    sameAs: Object.values(site.social),
  };
}

export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: name,
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: "Gulf Cooperation Council",
  };
}

export function articleSchema({
  title,
  description,
  path,
  date,
  author,
}: {
  title: string;
  description: string;
  path: string;
  date: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: { "@type": "Organization", name: author },
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: absoluteUrl(path),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
