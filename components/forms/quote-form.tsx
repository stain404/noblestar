"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox, Input, Select, Textarea } from "@/components/ui/field";
import { quoteSchema, type QuoteInput } from "@/lib/schemas";
import { freightModes, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const steps = [
  { title: "Mode", legend: "How should the cargo travel?" },
  { title: "Route", legend: "Where is it going?" },
  { title: "Cargo", legend: "What are we moving?" },
  { title: "Contact", legend: "How do we reach you?" },
] as const;

/** Fields validated before each step is allowed to advance. */
const stepFields: FieldPath<QuoteInput>[][] = [
  ["mode"],
  ["originCountry", "originCity", "destinationCountry", "destinationCity", "incoterm"],
  [
    "loadType",
    "commodity",
    "weightKg",
    "volumeCbm",
    "containerCount",
    "hazardous",
    "temperatureControlled",
    "readyDate",
  ],
  ["name", "company", "email", "phone", "notes", "consent"],
];

const loadTypes = [
  { value: "fcl", label: "FCL — full container load" },
  { value: "lcl", label: "LCL — consolidated cargo" },
  { value: "loose", label: "Loose / palletised cargo" },
  { value: "unsure", label: "Not sure" },
];

const incoterms = ["EXW", "FCA", "FOB", "CFR", "CIF", "DAP", "DDP", "unsure"];

export function QuoteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const headingRef = useRef<HTMLLegendElement>(null);

  // Stamped after mount so the render stays pure; read only in the submit handler.
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // A service page can deep-link with ?service=sea-freight to preselect the mode.
  const preselected = freightModes.find(
    (mode) => mode.serviceSlug === searchParams.get("service"),
  );

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    mode: "onBlur",
    defaultValues: {
      mode: preselected?.value,
      hazardous: false,
      temperatureControlled: false,
    },
  });

  // Drives whether step 3 asks for container count (FCL) or volume.
  const loadType = useWatch({ control, name: "loadType" });

  // Move focus to the new step so keyboard and screen reader users follow along.
  useEffect(() => {
    if (step > 0) headingRef.current?.focus();
  }, [step]);

  async function next() {
    const valid = await trigger(stepFields[step], { shouldFocus: true });
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  async function onSubmit(values: QuoteInput) {
    setSubmitError(null);
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          startedAt: startedAt.current || undefined,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setSubmitError(
          body.error ?? "Something went wrong. Please try again or call us.",
        );
        return;
      }

      router.push("/quote/thank-you");
    } catch {
      setSubmitError(
        `We could not reach the server. Please check your connection, or call us on ${site.contact.phones[0].number}.`,
      );
    }
  }

  return (
    <form
      onSubmit={(event) => handleSubmit(onSubmit)(event)}
      noValidate
      className="border border-ink-300 bg-white p-6 sm:p-8"
    >
      {/* Progress */}
      <ol className="mb-8 flex items-center gap-2" aria-label="Progress">
        {steps.map((item, index) => (
          <li key={item.title} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "inline-flex size-7 shrink-0 items-center justify-center text-xs font-bold transition-colors",
                index < step && "bg-stamp-500 text-ink-900",
                index === step && "bg-stamp-700 text-white",
                index > step && "bg-ink-100 text-ink-500",
              )}
              aria-hidden="true"
            >
              {index < step ? <Check className="size-3.5" strokeWidth={3} /> : index + 1}
            </span>
            <span
              className={cn(
                "hidden text-sm font-medium sm:inline",
                index <= step ? "text-ink-900" : "text-ink-500",
              )}
            >
              {item.title}
            </span>
            {index < steps.length - 1 ? (
              <span
                className={cn(
                  "h-px flex-1 transition-colors",
                  index < step ? "bg-stamp-500" : "bg-ink-200",
                )}
                aria-hidden="true"
              />
            ) : null}
          </li>
        ))}
      </ol>

      <fieldset>
        <legend
          ref={headingRef}
          tabIndex={-1}
          className="mb-6 text-xl font-bold text-ink-900 outline-none"
        >
          {steps[step].legend}
        </legend>

        {/* Honeypot — hidden from humans, tempting to bots. */}
        <div aria-hidden="true" className="absolute left-[-9999px] top-0">
          <label htmlFor="company_website">Company website</label>
          <input
            id="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("company_website")}
          />
        </div>

        {/* ------------------------------ Step 1 ----------------------------- */}
        {step === 0 ? (
          <div className="space-y-3">
            {freightModes.map((mode) => (
              <label
                key={mode.value}
                className="flex cursor-pointer items-center gap-3 border border-ink-300 p-4 transition-colors hover:border-stamp-500 hover:bg-stamp-50 has-checked:border-stamp-600 has-checked:bg-stamp-50"
              >
                <input
                  type="radio"
                  value={mode.value}
                  className="size-4 accent-stamp-600"
                  {...register("mode")}
                />
                <span className="font-medium text-ink-900">{mode.label}</span>
              </label>
            ))}
            {errors.mode ? (
              <p role="alert" className="text-sm text-oxide-600">
                {errors.mode.message}
              </p>
            ) : null}
          </div>
        ) : null}

        {/* ------------------------------ Step 2 ----------------------------- */}
        {step === 1 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Origin country"
              required
              autoComplete="country-name"
              error={errors.originCountry?.message}
              {...register("originCountry")}
            />
            <Input
              label="Origin city or port"
              error={errors.originCity?.message}
              {...register("originCity")}
            />
            <Input
              label="Destination country"
              required
              error={errors.destinationCountry?.message}
              {...register("destinationCountry")}
            />
            <Input
              label="Destination city or port"
              error={errors.destinationCity?.message}
              {...register("destinationCity")}
            />
            <Select
              label="Incoterm"
              hint="Leave as 'Not sure' if it has not been agreed yet."
              wrapperClassName="sm:col-span-2"
              error={errors.incoterm?.message}
              {...register("incoterm")}
            >
              <option value="">Select…</option>
              {incoterms.map((term) => (
                <option key={term} value={term}>
                  {term === "unsure" ? "Not sure yet" : term}
                </option>
              ))}
            </Select>
          </div>
        ) : null}

        {/* ------------------------------ Step 3 ----------------------------- */}
        {step === 2 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <Select
              label="Load type"
              required
              wrapperClassName="sm:col-span-2"
              error={errors.loadType?.message}
              {...register("loadType")}
            >
              <option value="">Select…</option>
              {loadTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>

            <Input
              label="Commodity"
              required
              hint="What the goods actually are — this determines duty and permits."
              wrapperClassName="sm:col-span-2"
              error={errors.commodity?.message}
              {...register("commodity")}
            />

            <Input
              label="Gross weight (kg)"
              type="number"
              step="any"
              min="0"
              inputMode="decimal"
              required
              error={errors.weightKg?.message}
              {...register("weightKg", { valueAsNumber: true })}
            />

            {loadType === "fcl" ? (
              <Input
                label="Number of containers"
                type="number"
                step="1"
                min="1"
                inputMode="numeric"
                error={errors.containerCount?.message}
                {...register("containerCount", {
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
              />
            ) : (
              <Input
                label="Volume (cbm)"
                type="number"
                step="any"
                min="0"
                inputMode="decimal"
                hint="Length × width × height of all pieces, in cubic metres."
                error={errors.volumeCbm?.message}
                {...register("volumeCbm", {
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
              />
            )}

            <Input
              label="Cargo ready date"
              type="date"
              wrapperClassName="sm:col-span-2"
              error={errors.readyDate?.message}
              {...register("readyDate")}
            />

            <div className="space-y-3 sm:col-span-2">
              <Checkbox
                label="Cargo is hazardous (dangerous goods)"
                {...register("hazardous")}
              />
              <Checkbox
                label="Cargo requires temperature control"
                {...register("temperatureControlled")}
              />
            </div>
          </div>
        ) : null}

        {/* ------------------------------ Step 4 ----------------------------- */}
        {step === 3 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Your name"
              required
              autoComplete="name"
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              label="Company"
              autoComplete="organization"
              error={errors.company?.message}
              {...register("company")}
            />
            <Input
              label="Email"
              type="email"
              required
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Phone"
              type="tel"
              required
              autoComplete="tel"
              error={errors.phone?.message}
              {...register("phone")}
            />
            <Textarea
              label="Anything else we should know"
              wrapperClassName="sm:col-span-2"
              placeholder="Deadlines, special handling, previous shipments on this lane…"
              error={errors.notes?.message}
              {...register("notes")}
            />
            <div className="sm:col-span-2">
              <Checkbox
                label="I agree that Noble Star Shipping may contact me about this enquiry."
                error={errors.consent?.message}
                {...register("consent")}
              />
            </div>
          </div>
        ) : null}
      </fieldset>

      {submitError ? (
        <p
          role="alert"
          className="mt-6 border border-oxide-500 bg-oxide-100 p-4 text-sm text-oxide-700"
        >
          {submitError}
        </p>
      ) : null}

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-ink-300 pt-6">
        {step > 0 ? (
          <Button
            type="button"
            variant="quiet"
            onClick={() => setStep((s) => s - 1)}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </Button>
        ) : (
          <span />
        )}

        {step < steps.length - 1 ? (
          <Button type="button" variant="primary" onClick={next}>
            Continue
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                Send request
                <ArrowRight className="size-4" aria-hidden="true" />
              </>
            )}
          </Button>
        )}
      </div>
    </form>
  );
}
