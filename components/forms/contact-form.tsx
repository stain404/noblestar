"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox, Input, Textarea } from "@/components/ui/field";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { site } from "@/lib/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Stamped after mount so the render stays pure; read only in the submit handler.
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  async function onSubmit(values: ContactInput) {
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
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

      setSent(true);
    } catch {
      setSubmitError(
        `We could not reach the server. Please check your connection, or call us on ${site.contact.phones[0].number}.`,
      );
    }
  }

  if (sent) {
    return (
      <div
        role="status"
        className="border border-seal-600 bg-seal-100 p-8 text-center"
      >
        <CheckCircle2
          className="mx-auto size-10 text-seal-700"
          strokeWidth={1.6}
          aria-hidden="true"
        />
        <h2 className="mt-4 text-xl font-bold text-ink-900">
          Message received
        </h2>
        <p className="mt-2 leading-relaxed text-ink-600">
          Thank you — we will reply within one business day. A confirmation is on
          its way to your inbox.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => handleSubmit(onSubmit)(event)}
      noValidate
      className="border border-ink-300 bg-white p-6 sm:p-8"
    >
      <h2 className="text-xl font-bold text-ink-900">Send us a message</h2>
      <p className="mt-2 text-sm text-ink-600">
        For a freight quote, the{" "}
        <a
          href="/quote"
          className="font-medium text-stamp-700 underline decoration-stamp-300 underline-offset-2"
        >
          quote form
        </a>{" "}
        collects the details we need and gets you a faster answer.
      </p>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0">
        <label htmlFor="contact_company_website">Company website</label>
        <input
          id="contact_company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company_website")}
        />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
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
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          label="Subject"
          required
          wrapperClassName="sm:col-span-2"
          error={errors.subject?.message}
          {...register("subject")}
        />
        <Textarea
          label="Message"
          required
          rows={6}
          wrapperClassName="sm:col-span-2"
          error={errors.message?.message}
          {...register("message")}
        />
        <div className="sm:col-span-2">
          <Checkbox
            label="I agree that Noble Star Shipping may contact me about this enquiry."
            error={errors.consent?.message}
            {...register("consent")}
          />
        </div>
      </div>

      {submitError ? (
        <p
          role="alert"
          className="mt-6 border border-oxide-500 bg-oxide-100 p-4 text-sm text-oxide-700"
        >
          {submitError}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="mt-7 w-full sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" />
            Send message
          </>
        )}
      </Button>
    </form>
  );
}
