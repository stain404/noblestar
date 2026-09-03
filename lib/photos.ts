import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Photographs supplied by the client, resolved from `public/photos` at build
 * time.
 *
 * Every photographic slot on this site is optional. A photograph that has not
 * been supplied yet resolves to `null`, and its slot falls back to the design
 * that shipped before photography existed — so a partial set is a normal
 * state, not a broken one, and the site can go live with none of them.
 *
 * Resolution happens at build time rather than by hardcoding paths so that
 * dropping a file into `public/photos` is the entire act of adding a
 * photograph. See `public/photos/README.md` for the slot names and what each
 * one must show; the alt text written against each slot describes the
 * photograph that brief asks for.
 */

const DIR = path.join(process.cwd(), "public", "photos");

/**
 * Formats the image pipeline can read and transcode. HEIC is deliberately
 * absent — Next's optimiser cannot decode it, and a HEIC file dropped here
 * would resolve to a slot that silently fails to render in most browsers.
 */
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

/**
 * The public URL for a supplied photograph, or `null` when it is still
 * outstanding. `name` is the path under `public/photos` without an extension,
 * so `"hero"` or `"services/sea-freight"`.
 */
export function photo(name: string): string | null {
  for (const ext of EXTENSIONS) {
    const file = `${name}${ext}`;
    if (fs.existsSync(path.join(DIR, file))) {
      // Always a forward-slash URL, whatever the host platform's separator is.
      return `/photos/${name}${ext}`;
    }
  }
  return null;
}

/**
 * Client logos live in `public/photos/clients/`. SVG is preferred and checked
 * first; a raster file also resolves. Returns `null` until a file is supplied,
 * so the client strip only ever shows logos that have actually been delivered
 * and cleared for use.
 */
const LOGO_EXTENSIONS = [".svg", ".png", ".webp", ".avif", ".jpg", ".jpeg"];

export function clientLogo(slug: string): string | null {
  for (const ext of LOGO_EXTENSIONS) {
    if (fs.existsSync(path.join(DIR, "clients", `${slug}${ext}`))) {
      return `/photos/clients/${slug}${ext}`;
    }
  }
  return null;
}

/**
 * The hero background, as an ordered list of every supplied frame: `background`
 * first, then `background_2`, `background_3` and so on for as long as they are
 * present. One frame renders as a still; two or more cross-fade slowly. An
 * empty list falls back to the pre-photography hero.
 */
export function heroPhotos(): string[] {
  const first = photo("background");
  if (!first) return [];

  const frames = [first];
  for (let n = 2; n <= 8; n++) {
    const next = photo(`background_${n}`);
    if (!next) break;
    frames.push(next);
  }
  return frames;
}
