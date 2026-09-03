import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { photo } from "./photos";

/**
 * The only module that reads the content directory. Swapping MDX for a
 * headless CMS later means rewriting this file and nothing else. Photographs
 * are public assets rather than content, and are resolved by `lib/photos.ts`.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Faq = { q: string; a: string };

export type ServiceMeta = {
  slug: string;
  title: string;
  navTitle: string;
  summary: string;
  /**
   * Meta description for this service's page, written to 140–155 characters.
   * Kept separate from `summary` because that one is card copy and has to stay
   * short — a description written to fit a card wastes half the snippet a
   * search result would have given it. Falls back to `summary` when absent.
   */
  metaDescription?: string;
  icon: string;
  order: number;
  highlights: string[];
  transitTimes?: { lane: string; time: string }[];
  documents?: string[];
  faqs?: Faq[];
  related?: string[];
  /**
   * Resolved from `public/photos/services/<slug>`, not from frontmatter — a
   * photograph exists because someone put a file there, and there is no state
   * where the two can disagree. Null until one is supplied.
   */
  photo: string | null;
  /**
   * Alt text for that photograph. Override in frontmatter as `photoAlt` when
   * the supplied image shows something more specific than the default.
   */
  photoAlt?: string;
};

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  readingTime: number;
  draft: boolean;
};

type Entry<T> = { meta: T; body: string };

function readDir(dir: string) {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full).filter((f) => f.endsWith(".mdx"));
}

function readFile(dir: string, file: string) {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, dir, file), "utf8");
  return matter(raw);
}

/* ---------------------------------- services --------------------------------- */

function toServiceMeta(slug: string, data: Record<string, unknown>): ServiceMeta {
  return {
    ...(data as Omit<ServiceMeta, "slug" | "photo">),
    slug,
    photo: photo(`services/${slug}`),
  };
}

export function getServices(): ServiceMeta[] {
  return readDir("services")
    .map((file) => {
      const { data } = readFile("services", file);
      return toServiceMeta(file.replace(/\.mdx$/, ""), data);
    })
    .sort((a, b) => a.order - b.order);
}

export function getService(slug: string): Entry<ServiceMeta> | null {
  const file = `${slug}.mdx`;
  if (!readDir("services").includes(file)) return null;
  const { data, content } = readFile("services", file);
  return { meta: toServiceMeta(slug, data), body: content };
}

/* ----------------------------------- blog ------------------------------------ */

/** ~220 wpm, rounded up — good enough for a "5 min read" label. */
function readingTime(body: string) {
  return Math.max(1, Math.round(body.split(/\s+/).length / 220));
}

function toPostMeta(
  slug: string,
  data: Record<string, unknown>,
  body: string,
): PostMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    author: String(data.author ?? "Noble Star Shipping"),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    readingTime: readingTime(body),
    draft: data.draft === true,
  };
}

/** Drafts are excluded outside development so they never reach the index or sitemap. */
function isVisible(post: PostMeta) {
  return !post.draft || process.env.NODE_ENV === "development";
}

export function getPosts(): PostMeta[] {
  return readDir("blog")
    .map((file) => {
      const { data, content } = readFile("blog", file);
      return toPostMeta(file.replace(/\.mdx$/, ""), data, content);
    })
    .filter(isVisible)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPost(slug: string): Entry<PostMeta> | null {
  const file = `${slug}.mdx`;
  if (!readDir("blog").includes(file)) return null;
  const { data, content } = readFile("blog", file);
  const meta = toPostMeta(slug, data, content);
  if (!isVisible(meta)) return null;
  return { meta, body: content };
}

export function getAllTags(): string[] {
  return [...new Set(getPosts().flatMap((p) => p.tags))].sort();
}
