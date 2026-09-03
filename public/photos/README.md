# Photography

Drop original photographs straight into this folder. Do not resize, crop,
compress or filter them first — the build generates every size and format the
site serves, and it can only do that well from the original file.

Name them exactly as below. **A slot with no file is not rendered at all**, and
the page falls back to the design that shipped before photography existed — so
partial delivery is a normal state, nothing looks broken, and the site can go
live with none of these.

## The hero

| File | What it shows |
|---|---|
| `background.png` | One wide establishing shot. **Currently a stock container-ship photograph.** |
| `background_2.png`, `background_3.png`, … | Optional. Add these and the hero cross-fades slowly through every frame it finds, in order. One file = a plain still. |

Replace them by overwriting `background.png` (`.jpg` also resolves), and add
`background_2.png` onwards for the slideshow. A shot of your own operation —
the packing floor, a loading bay, vehicles being worked on — is worth
considerably more here than a stock port scene, which any competitor can buy
the same afternoon.

The cross-fade holds each frame for seven seconds and never slides or zooms;
it stops entirely for visitors who ask for reduced motion.

This one sits behind the homepage headline, washed back to ink so the type
stays readable, so it wants depth and activity rather than a single subject.
Landscape, and the wider the better.

## Priority 1 — the claims nothing else on the site can prove

| File | What it shows |
|---|---|
| `packing-facility.jpg` | Our own packing / repacking facility, mid-work |
| `drivers-fleet.jpg`    | Our drivers with our vehicles |
| `coordinator-desk.jpg` | A coordinator working a file, screens visible |

## Priority 2

| File | What it shows |
|---|---|
| `food-cargo-handling.jpg` | A food consignment being handled or labelled |
| `office.jpg`              | The Al Mezan Tower premises, inside or out |
| `team.jpg`                | The team |

## Services — `photos/services/`

One photograph per service, named for its slug. These appear on the service
grid and at the top of that service's own page.

| File | Service |
|---|---|
| `services/sea-freight.jpg`       | Sea Freight |
| `services/air-freight.jpg`       | Air Freight |
| `services/road-freight.jpg`      | Road Freight |
| `services/customs-clearance.jpg` | Customs Clearance |
| `services/fcl-cargo.jpg`         | FCL Cargo |
| `services/lcl-cargo.jpg`         | LCL Cargo |
| `services/food-cargo.jpg`        | Food Cargo |

The grid treats these as all-or-nothing: as soon as one service has a
photograph every cell gets an image region, and services still waiting on one
show their mark on paper. Supplying all seven is better than supplying three.

To describe a service photograph more precisely than the default, add
`photoAlt` to that service's frontmatter in `content/services/<slug>.mdx`.

## Requirements

- At least 2000px on the long edge. Larger is better; phone photos are fine.
- **JPEG, PNG, WebP or AVIF.** Not HEIC — the image pipeline cannot read it.
  iPhone photos are HEIC by default; either set Settings → Camera → Formats →
  Most Compatible before shooting, or send them and they will be converted.
- Landscape for most slots. `coordinator-desk` and `office` may be portrait.
- No filters, no beauty edits, no stock. This site's credibility rests on
  operational detail, and stock photography reads as exactly what it is.
- Anyone whose face is identifiable must be content to appear on the website.
- No visible client names, invoice numbers or declaration numbers unless you
  are happy for them to be public.

After adding files, re-run `npm run build && npm start -- -p 4300` then
`npm run audit` to confirm the accessibility and SEO scores still hold.
