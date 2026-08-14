import type { MetadataRoute } from "next";
import { getPosts, getServices } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";
import { isHeld } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/coverage", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/quote", priority: 0.9, changeFrequency: "yearly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  ];

  return [
    ...staticPages.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    // Generated from the content collections, so new MDX is indexed automatically.
    ...getServices().map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getPosts().map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    // Sections still in preparation stay out of the sitemap entirely — see
    // `heldSections` in `lib/site.ts`. Filtered at the end so every source
    // above (static list and both content collections) is covered by one rule.
  ].filter((entry) => !isHeld(new URL(entry.url).pathname));
}
