import Link from "next/link";
import { CtaBand } from "@/components/marketing/cta-band";
import { HoldingNotice } from "@/components/marketing/holding-notice";
import { PageHero } from "@/components/marketing/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { Section } from "@/components/ui/section";
import { getAllTags, getPosts } from "@/lib/content";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { isHeld } from "@/lib/site";
import { cn, formatDate } from "@/lib/utils";

export const metadata = {
  ...pageMetadata({
    title: "Insights — GCC Customs & Freight Guidance",
    description:
      "Practical guidance on GCC customs clearance, trade lanes, food import rules and freight cost decisions, from Noble Star Shipping's operations desk.",
    path: "/blog",
  }),
  ...(isHeld("/blog") ? { robots: { index: false, follow: true } } : {}),
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  if (isHeld("/blog")) {
    return (
      <HoldingNotice
        section="Insights"
        detail="Our notes on GCC customs, trade lanes and food import rules are drafted, but operations has not yet reviewed them for accuracy — and publishing customs guidance that has not been checked would be worse than publishing none."
      />
    );
  }

  const { tag } = await searchParams;
  const allPosts = getPosts();
  const tags = getAllTags();
  const posts = tag ? allPosts.filter((p) => p.tags.includes(tag)) : allPosts;

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/blog" },
  ];

  return (
    <>
      <JsonLd schema={breadcrumbSchema(breadcrumbs)} />

      <PageHero
        eyebrow="Insights"
        title="Notes from the operations desk"
        intro="What we have learned moving cargo through GCC customs — written for the people who have to make the decisions, not for search engines."
        breadcrumbs={breadcrumbs}
      />

      <Section>
        {tags.length > 0 ? (
          <nav aria-label="Filter by topic" className="mb-10">
            <ul className="flex flex-wrap gap-2">
              <li>
                <Link
                  href="/blog"
                  aria-current={!tag ? "page" : undefined}
                  className={cn(
                    "inline-block border px-3.5 py-1.5 text-sm font-medium transition-colors",
                    !tag
                      ? "border-ink-900 bg-stamp-700 text-white"
                      : "border-ink-300 text-ink-600 hover:border-stamp-500 hover:text-ink-900",
                  )}
                >
                  All topics
                </Link>
              </li>
              {tags.map((item) => (
                <li key={item}>
                  <Link
                    href={`/blog?tag=${encodeURIComponent(item)}`}
                    aria-current={tag === item ? "page" : undefined}
                    className={cn(
                      "inline-block border px-3.5 py-1.5 text-sm font-medium transition-colors",
                      tag === item
                        ? "border-ink-900 bg-stamp-700 text-white"
                        : "border-ink-300 text-ink-600 hover:border-stamp-500 hover:text-ink-900",
                    )}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        {posts.length === 0 ? (
          <p className="border border-dashed border-ink-300 p-10 text-center text-ink-500">
            No articles under this topic yet.{" "}
            <Link href="/blog" className="font-medium text-stamp-700 underline">
              View all articles
            </Link>
            .
          </p>
        ) : (
          <ul className="grid gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col border border-ink-300 bg-white p-6 transition-colors duration-150 ease-[var(--ease-stamp)] hover:bg-stamp-50 hover:border-stamp-500"
                >
                  <span className="text-xs font-medium text-stamp-600">
                    {post.tags[0] ?? "Insight"}
                  </span>
                  <h2 className="mt-2.5 text-lg font-bold leading-snug transition-colors group-hover:text-stamp-700">
                    {post.title}
                  </h2>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-600">
                    {post.description}
                  </p>
                  <span className="mt-5 text-xs text-ink-400">
                    {formatDate(post.date)} · {post.readingTime} min read
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <CtaBand />
    </>
  );
}
