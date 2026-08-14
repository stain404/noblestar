import { z } from "zod";

/**
 * Shared by the client form (via the react-hook-form resolver) and the API route.
 * Client and server validation cannot drift because they are the same object.
 */

const trimmed = (min: number, max: number, message: string) =>
  z.string().trim().min(min, message).max(max, "This is longer than we can accept.");

/**
 * Honeypot + timing fields. Bots fill the hidden input; humans take more than 3s.
 * Both are accepted by the schema and judged in the route handler, which returns a
 * plain 200 — a validation error here would tell a bot exactly which field is the trap.
 */
const antiSpam = {
  company_website: z.string().optional(),
  startedAt: z.number().int().optional(),
};

export const quoteSchema = z.object({
  // Step 1 — mode
  mode: z.enum(["sea", "air", "road", "customs", "other"], {
    message: "Choose a freight mode.",
  }),

  // Step 2 — route
  originCountry: trimmed(2, 60, "Enter the origin country."),
  originCity: z.string().trim().max(80).optional(),
  destinationCountry: trimmed(2, 60, "Enter the destination country."),
  destinationCity: z.string().trim().max(80).optional(),
  // The select's empty "Select…" option is normalised to undefined.
  incoterm: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z
      .enum(["EXW", "FCA", "FOB", "CFR", "CIF", "DAP", "DDP", "unsure"])
      .optional(),
  ),

  // Step 3 — cargo
  loadType: z.enum(["fcl", "lcl", "loose", "unsure"], {
    message: "Choose a load type.",
  }),
  commodity: trimmed(2, 200, "Tell us what the cargo is."),
  weightKg: z
    .number({ message: "Enter the gross weight in kilograms." })
    .positive("Weight must be greater than zero.")
    .max(10_000_000, "That weight looks wrong — please check it."),
  volumeCbm: z
    .number()
    .positive("Volume must be greater than zero.")
    .max(100_000, "That volume looks wrong — please check it.")
    .optional(),
  containerCount: z
    .number()
    .int("Enter a whole number of containers.")
    .positive("Container count must be greater than zero.")
    .max(1000, "That container count looks wrong — please check it.")
    .optional(),
  hazardous: z.boolean().default(false),
  temperatureControlled: z.boolean().default(false),
  readyDate: z.string().trim().max(40).optional(),

  // Step 4 — contact
  name: trimmed(2, 100, "Enter your name."),
  company: z.string().trim().max(120).optional(),
  email: z.email("Enter a valid email address.").max(200),
  phone: trimmed(6, 40, "Enter a phone number we can reach you on."),
  notes: z.string().trim().max(4000).optional(),
  consent: z.literal(true, {
    message: "Please confirm we may contact you about this enquiry.",
  }),

  ...antiSpam,
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteData = z.output<typeof quoteSchema>;

export const contactSchema = z.object({
  name: trimmed(2, 100, "Enter your name."),
  company: z.string().trim().max(120).optional(),
  email: z.email("Enter a valid email address.").max(200),
  phone: z.string().trim().max(40).optional(),
  subject: trimmed(2, 160, "Enter a subject."),
  message: trimmed(10, 4000, "Please give us a little more detail."),
  consent: z.literal(true, {
    message: "Please confirm we may contact you about this enquiry.",
  }),
  ...antiSpam,
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

/** Labels used in the confirmation emails and the internal notification. */
export const loadTypeLabels: Record<QuoteData["loadType"], string> = {
  fcl: "FCL — full container load",
  lcl: "LCL — consolidated cargo",
  loose: "Loose / palletised cargo",
  unsure: "Not sure",
};
