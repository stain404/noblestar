# Noble Star Shipping

Marketing website for Noble Star Shipping — a Dubai-based freight forwarder and
customs broker operating across all six GCC markets.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · MDX.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

The site runs at http://localhost:3000.

Without `RESEND_API_KEY`, the quote and contact forms still work end to end —
submissions are logged to the server console instead of emailed. That is deliberate,
so the forms are testable before email is provisioned.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint, including the React 19 compiler rules |

## Environment variables

See `.env.example`. `RESEND_FROM` must be an address on a domain verified in Resend,
otherwise sending fails at runtime.

## Editing content

**Services** — `content/services/*.mdx`. The filename is the URL slug. Frontmatter
drives the nav dropdown, the cards, the sidebar tables and the FAQ schema; the body is
long-form copy. Adding a file adds the service everywhere, including the sitemap.

**Blog** — `content/blog/*.mdx`. Set `draft: true` to keep a post visible in
development but excluded from the index, its own route and the sitemap in production.

**Company details** — `lib/site.ts`. Phone numbers, email, address, stats and
navigation all live here and nowhere else.

**Coverage** — `lib/coverage.ts`. Each country has a `directService` flag: `true`
renders as an own-operation market, `false` renders as "via partner network".

## Outstanding items before launch

These are content and credentials the client needs to supply; the site is built with
clearly marked placeholders in the meantime.

1. **Logo** — SVG or high-res PNG. Replace the placeholder mark in
   `components/layout/logo.tsx`.
2. **Brand colours** — currently a maritime navy and gold palette defined in the
   `@theme` block of `app/globals.css`.
3. **Photography** — warehouse, fleet, team and port operations. The design currently
   uses no photography rather than placeholder stock.
4. **Confirmed GCC coverage** — `lib/coverage.ts` currently marks UAE, Saudi Arabia,
   Oman and Qatar as own operations and Kuwait and Bahrain as partner network. This is
   an assumption and **must be verified by operations before launch** — overstated
   coverage carries commercial and legal risk.
5. **Company profile PDF** — drop into `public/` and link it from `app/about/page.tsx`
   (marked with a TODO).
6. **Embedded map** — `app/contact/page.tsx`. The street address itself is
   confirmed and lives in `lib/site.ts`.
7. **Trade licence number and certifications** (FIATA, IATA, customs broker
   registration) — `app/about/page.tsx` has a placeholder card for these.
8. **Resend account** — verified sending domain, API key and the sales inbox.

Service transit times, port lists and customs notes throughout `content/` and
`lib/coverage.ts` were written from general GCC trade knowledge and should be reviewed
by operations for accuracy before launch.

## Deployment

Deploys to Vercel with no configuration beyond the environment variables. Set
`NEXT_PUBLIC_SITE_URL` to the production domain so canonical URLs, the sitemap and
JSON-LD resolve correctly.

## Known issues

`npm audit` reports high-severity advisories in transitive dependencies of Next.js and
ESLint (`postcss`, `sharp`/libvips, `brace-expansion`). They are build-time
dependencies pinned by the framework and cannot be resolved without downgrading Next.
Re-check when Next.js publishes an update.
