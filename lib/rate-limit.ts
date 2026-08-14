import "server-only";

/**
 * In-memory fixed-window rate limiter.
 *
 * Deliberately simple: state lives in the process, so it resets on deploy and is
 * per-instance rather than global. That is adequate for form spam on a marketing
 * site. If submission volume ever justifies it, swap the Map for Upstash Redis —
 * the call signature does not need to change.
 */

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX_REQUESTS - 1 };
  }

  entry.count += 1;

  if (entry.count > MAX_REQUESTS) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  return { ok: true, remaining: MAX_REQUESTS - entry.count };
}

/** Best-effort client IP from proxy headers. */
export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** Periodically drop expired entries so the Map cannot grow without bound. */
export function pruneRateLimit() {
  const now = Date.now();
  for (const [key, entry] of hits) {
    if (now > entry.resetAt) hits.delete(key);
  }
}
