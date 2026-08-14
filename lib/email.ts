import "server-only";
import { Resend } from "resend";
import { freightModes, site } from "./site";
import { loadTypeLabels, type ContactData, type QuoteData } from "./schemas";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = process.env.RESEND_FROM ?? `${site.name} <noreply@noblestarshipping.com>`;
const SALES_INBOX = process.env.SALES_INBOX ?? site.contact.email;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string | number | undefined | null) {
  if (value === undefined || value === null || value === "") return "";
  return `<tr>
    <td style="padding:8px 16px 8px 0;color:#64748b;font-size:14px;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>
    <td style="padding:8px 0;color:#0f172a;font-size:14px;font-weight:600">${escapeHtml(String(value))}</td>
  </tr>`;
}

function wrap(title: string, intro: string, tableRows: string) {
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;padding:32px 24px">
    <div style="padding-bottom:20px;margin-bottom:24px;border-bottom:1px solid #e2e8f0">
      <h1 style="margin:0;font-size:20px;color:#0a2540">${escapeHtml(title)}</h1>
      <p style="margin:6px 0 0;color:#475569;font-size:14px">${escapeHtml(intro)}</p>
    </div>
    <table style="width:100%;border-collapse:collapse">${tableRows}</table>
    <p style="margin-top:32px;padding-top:16px;border-top:1px solid #e2e8f0;color:#94a3b8;font-size:12px">
      Sent from ${escapeHtml(site.url)}
    </p>
  </div>`;
}

/** True when email delivery is configured; lets callers fail loudly in production. */
export const emailConfigured = Boolean(resend);

/* ---------------------------------- quote ----------------------------------- */

export async function sendQuoteEmails(data: QuoteData) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — logging quote instead.");
    console.info(JSON.stringify(data, null, 2));
    return;
  }

  const modeLabel =
    freightModes.find((m) => m.value === data.mode)?.label ?? data.mode;

  const internalRows = [
    row("Freight mode", modeLabel),
    row("Load type", loadTypeLabels[data.loadType]),
    row("Origin", [data.originCity, data.originCountry].filter(Boolean).join(", ")),
    row(
      "Destination",
      [data.destinationCity, data.destinationCountry].filter(Boolean).join(", "),
    ),
    row("Incoterm", data.incoterm),
    row("Commodity", data.commodity),
    row("Gross weight", `${data.weightKg} kg`),
    row("Volume", data.volumeCbm ? `${data.volumeCbm} cbm` : undefined),
    row("Containers", data.containerCount),
    row("Hazardous", data.hazardous ? "YES — check class and UN number" : "No"),
    row(
      "Temperature controlled",
      data.temperatureControlled ? "YES — confirm setpoint" : "No",
    ),
    row("Cargo ready", data.readyDate),
    row("—", "—"),
    row("Name", data.name),
    row("Company", data.company),
    row("Email", data.email),
    row("Phone", data.phone),
    row("Notes", data.notes),
  ].join("");

  const customerRows = [
    row("Freight mode", modeLabel),
    row("Origin", [data.originCity, data.originCountry].filter(Boolean).join(", ")),
    row(
      "Destination",
      [data.destinationCity, data.destinationCountry].filter(Boolean).join(", "),
    ),
    row("Commodity", data.commodity),
    row("Gross weight", `${data.weightKg} kg`),
  ].join("");

  await Promise.all([
    resend.emails.send({
      from: FROM,
      to: SALES_INBOX,
      replyTo: data.email,
      subject: `Quote request — ${modeLabel} — ${data.originCountry} → ${data.destinationCountry}`,
      html: wrap(
        "New quote request",
        `${data.name}${data.company ? ` (${data.company})` : ""} submitted a quote request.`,
        internalRows,
      ),
    }),
    resend.emails.send({
      from: FROM,
      to: data.email,
      subject: `We have your quote request — ${site.name}`,
      html: wrap(
        "Thank you — we have your request",
        `A coordinator will come back to you, usually within one business day. Here is what we received.`,
        customerRows,
      ),
    }),
  ]);
}

/* --------------------------------- contact ---------------------------------- */

export async function sendContactEmails(data: ContactData) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — logging enquiry instead.");
    console.info(JSON.stringify(data, null, 2));
    return;
  }

  const rows = [
    row("Name", data.name),
    row("Company", data.company),
    row("Email", data.email),
    row("Phone", data.phone),
    row("Subject", data.subject),
    row("Message", data.message),
  ].join("");

  await Promise.all([
    resend.emails.send({
      from: FROM,
      to: SALES_INBOX,
      replyTo: data.email,
      subject: `Website enquiry — ${data.subject}`,
      html: wrap("New website enquiry", `From ${data.name}.`, rows),
    }),
    resend.emails.send({
      from: FROM,
      to: data.email,
      subject: `We have your message — ${site.name}`,
      html: wrap(
        "Thank you for getting in touch",
        "We have received your message and will reply, usually within one business day.",
        row("Subject", data.subject) + row("Message", data.message),
      ),
    }),
  ]);
}
