import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CtaBand } from "@/components/marketing/cta-band";
import { PageHero } from "@/components/marketing/page-hero";
import { MdxContent } from "@/components/mdx/mdx-content";
import { JsonLd } from "@/components/seo/json-ld";
import { Section } from "@/components/ui/section";
import { getPost, getPosts } from "@/lib/content";
import { articleSchema, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { HoldingNotice } from "@/components/marketing/holding-notice";
import { isHeld } from "@/lib/site";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    ...pageMetadata({
      title: post.meta.title,
      description: post.meta.description,
      path: `/blog/${slug}`,
      type: "article",
      publishedTime: post.meta.date,
    }),
    // Held sections must not be indexed while they are unfinished.
    ...(isHeld("/blog") ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (isHeld("/blog")) {
    return (
      <HoldingNotice
        section="Insights"
        detail="This note is drafted but has not been reviewed by operations. Customs guidance that has not been checked is worse than none, so it stays held until it has been."
      />
    );
  }

  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { meta, body } = post;
  const more = getPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/blog" },
    { name: meta.title, path: `/blog/${slug}` },
  ];

  return (
    <>
      <JsonLd
        schema={[
          articleSchema({
            title: meta.title,
            description: meta.description,
            path: `/blog/${slug}`,
            date: meta.date,
            author: meta.author,
          }),
          breadcrumbSchema(breadcrumbs),
        ]}
      />

      <PageHero
        eyebrow={meta.tags[0] ?? "Insight"}
        title={meta.title}
        intro={meta.description}
        breadcrumbs={breadcrumbs}
      >
        <p className="text-sm text-ink-500">
          <time dateTime={meta.date}>{formatDate(meta.date)}</time> ·{" "}
          {meta.readingTime} min read · {meta.author}
        </p>
      </PageHero>

      <Section>
        <article className="mx-auto max-w-2xl">
          <MdxContent source={body} />
        </article>

        <div className="mx-auto mt-14 max-w-2xl border-t border-ink-300 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-stamp-700 transition-colors hover:text-ink-900"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All insights
          </Link>
        </div>
      </Section>

      {more.length ? (
        <Section tone="white">
          <h2 className="text-h2">Keep reading</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {more.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/blog/${item.slug}`}
                  className="group flex h-full flex-col border border-ink-300 bg-white p-6 transition-colors duration-150 ease-[var(--ease-stamp)] hover:bg-stamp-50 hover:border-stamp-500"
                >
                  <span className="text-xs font-medium text-stamp-600">
                    {item.tags[0] ?? "Insight"}
                  </span>
                  <h3 className="mt-2.5 text-lg font-bold leading-snug transition-colors group-hover:text-stamp-700">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-600">
                    {item.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <CtaBand />
    </>
  );
}
