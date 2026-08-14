import { NextResponse } from "next/server";
import { sendQuoteEmails } from "@/lib/email";
import { clientIp, pruneRateLimit, rateLimit } from "@/lib/rate-limit";
import { quoteSchema } from "@/lib/schemas";

/** Bots submit instantly; a human takes longer than this to fill four steps. */
const MIN_FILL_MS = 3000;

export async function POST(request: Request) {
  pruneRateLimit();

  const limit = rateLimit(`quote:${clientIp(request)}`);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later, or call us." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Re-validate server-side with the same schema the client used.
  const parsed = quoteSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Some details need correcting.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: a filled hidden field means a bot. Return 200 so it learns nothing.
  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  // Timing check, same reasoning.
  if (data.startedAt && Date.now() - data.startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendQuoteEmails(data);
  } catch (error) {
    console.error("[api/quote] send failed", error);
    return NextResponse.json(
      {
        error:
          "We could not send your request. Please call or email us directly and we will pick it up straight away.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
