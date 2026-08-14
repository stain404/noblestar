import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

/**
 * Long-form MDX rendering. Elements are styled individually rather than via a
 * prose plugin so the typography stays inside the project's own design system.
 *
 * Long-form is the one place this world relaxes its grip: the measure widens,
 * the rules thin out, and violet appears only on links and list markers. A
 * customs guide has to be readable for ten minutes straight.
 */
const components = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      className="u-wide mt-14 scroll-mt-24 border-t border-paper-300 pt-8 text-2xl first:mt-0 first:border-0 first:pt-0"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mt-9 scroll-mt-24 text-lg font-semibold" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mt-5 leading-[1.78] text-ink-600" {...props} />
  ),
  // Square markers, because nothing in this system rounds.
  ul: (props: React.ComponentProps<"ul">) => (
    <ul
      className="mt-5 space-y-3 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.72em] [&>li]:before:size-1.5 [&>li]:before:bg-stamp-500"
      {...props}
    />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol
      className="mt-5 list-decimal space-y-3 pl-6 marker:font-mono marker:text-sm marker:text-stamp-600"
      {...props}
    />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="leading-[1.78] text-ink-600" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-ink-900" {...props} />
  ),
  a: ({ href = "", ...props }: React.ComponentProps<"a">) => {
    const isInternal = href.startsWith("/");
    const className =
      "font-medium text-stamp-700 underline decoration-stamp-300 decoration-2 underline-offset-2 transition-colors hover:decoration-stamp-600";

    if (isInternal) {
      return <Link href={href} className={className} {...props} />;
    }
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noreferrer noopener"
        {...props}
      />
    );
  },
  table: (props: React.ComponentProps<"table">) => (
    <div className="mt-7 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  thead: (props: React.ComponentProps<"thead">) => <thead {...props} />,
  th: (props: React.ComponentProps<"th">) => (
    <th
      className="u-caption border-b border-ink-300 px-3 pb-2.5 text-ink-500 first:pl-0"
      {...props}
    />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td
      className="border-b border-paper-200 px-3 py-3 align-top text-ink-600 first:pl-0"
      {...props}
    />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="mt-7 border-l-2 border-stamp-500 bg-stamp-50 py-4 pl-6 pr-5 text-ink-700"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-paper-300" />,
};

export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
    />
  );
}
