/**
 * Lighthouse accessibility and SEO sweep over every public route.
 *
 * Run against a production build, because the dev server injects overlays and
 * unminified payloads that Lighthouse scores differently:
 *
 *   npm run build && npm start -- -p 4300
 *   npm run audit
 *
 * `/quote/thank-you` is expected to score below 100 on SEO. It is deliberately
 * `noindex` and disallowed in `robots.ts` — a conversion confirmation page has
 * no business in search results — and Lighthouse's `is-crawlable` audit marks
 * that down. It is listed here anyway so its accessibility score is checked.
 */

import { spawn } from "node:child_process";
import { readFile, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = process.env.AUDIT_URL ?? "http://localhost:4300";

/** Every indexable route, plus the one deliberately excluded from search. */
const ROUTES = [
  "/",
  "/about",
  "/services",
  "/services/food-cargo",
  "/coverage",
  "/coverage/uae",
  "/coverage/saudi-arabia",
  "/coverage/kuwait",
  "/blog",
  "/contact",
  "/quote",
  "/quote/thank-you",
];

/** Audits we knowingly accept, with the reason they are not defects. */
const ACCEPTED = new Map([
  ["/quote/thank-you::is-crawlable", "noindex by design — conversion page"],
]);

// Passed as one shell string rather than an argv array: with `shell: true`
// Node concatenates the array without escaping and warns about it (DEP0190).
const run = (args) =>
  new Promise((resolve) => {
    const child = spawn(`npx lighthouse ${args.join(" ")}`, {
      shell: true,
      stdio: "ignore",
    });
    child.on("close", resolve);
  });

const dir = await mkdtemp(join(tmpdir(), "nss-audit-"));
let failed = false;

try {
  for (const route of ROUTES) {
    const out = join(dir, `${route.replace(/\W+/g, "_")}.json`);
    await run([
      `"${BASE}${route}"`,
      "--only-categories=accessibility,seo",
      '--chrome-flags="--headless=new --no-sandbox --disable-gpu"',
      "--output=json",
      `--output-path="${out}"`,
      "--quiet",
    ]);

    const report = JSON.parse(await readFile(out, "utf8"));
    const a11y = Math.round(report.categories.accessibility.score * 100);
    const seo = Math.round(report.categories.seo.score * 100);

    const problems = Object.entries(report.audits)
      .filter(([id, audit]) => {
        if (audit.score === null || audit.score >= 1) return false;
        // Weight 0 audits do not move the score but are still real defects.
        return !ACCEPTED.has(`${route}::${id}`);
      })
      .map(([id]) => id);

    if (problems.length) failed = true;
    console.log(
      `${route.padEnd(24)} a11y ${String(a11y).padStart(3)}  seo ${String(seo).padStart(3)}` +
        (problems.length ? `  ← ${problems.join(", ")}` : ""),
    );
  }
} finally {
  await rm(dir, { recursive: true, force: true }).catch(() => {});
}

process.exit(failed ? 1 : 0);
