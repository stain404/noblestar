"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

const controlBase =
  "w-full border bg-white px-3.5 py-2.5 text-[0.9375rem] text-ink-900 " +
  "placeholder:text-ink-400 transition-colors duration-150 " +
  "disabled:cursor-not-allowed disabled:bg-paper-100";

/**
 * Wraps a control with a label, optional hint and an error message that is
 * announced to screen readers. Children receive the ids they must be wired to.
 */
function FieldShell({
  label,
  hint,
  error,
  required,
  className,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: (ids: {
    id: string;
    describedBy: string | undefined;
    invalid: boolean;
  }) => React.ReactNode;
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink-800">
        {label}
        {required ? (
          <span className="ml-0.5 text-stamp-600" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-ink-500">
            (optional)
          </span>
        )}
      </label>
      {hint ? (
        <p id={hintId} className="text-xs text-ink-500">
          {hint}
        </p>
      ) : null}
      {children({ id, describedBy, invalid: Boolean(error) })}
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-oxide-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function borderFor(invalid: boolean) {
  return invalid
    ? "border-oxide-500 focus:border-oxide-600"
    : "border-ink-300 hover:border-ink-400 focus:border-stamp-500";
}

export function Input({
  label,
  hint,
  error,
  required,
  wrapperClassName,
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "id"> & {
  label: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
}) {
  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={wrapperClassName}
    >
      {({ id, describedBy, invalid }) => (
        <input
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          required={required}
          className={cn(controlBase, borderFor(invalid), className)}
          {...props}
        />
      )}
    </FieldShell>
  );
}

export function Textarea({
  label,
  hint,
  error,
  required,
  wrapperClassName,
  className,
  ...props
}: Omit<React.ComponentProps<"textarea">, "id"> & {
  label: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
}) {
  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={wrapperClassName}
    >
      {({ id, describedBy, invalid }) => (
        <textarea
          id={id}
          rows={4}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          required={required}
          className={cn(
            controlBase,
            borderFor(invalid),
            "resize-y",
            className,
          )}
          {...props}
        />
      )}
    </FieldShell>
  );
}

export function Select({
  label,
  hint,
  error,
  required,
  wrapperClassName,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"select">, "id"> & {
  label: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
}) {
  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={wrapperClassName}
    >
      {({ id, describedBy, invalid }) => (
        <select
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          required={required}
          className={cn(
            controlBase,
            borderFor(invalid),
            "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22none%22 stroke=%22%2364748b%22 stroke-width=%221.75%22><path d=%22M6 8l4 4 4-4%22/></svg>')] bg-[length:1.25rem] bg-[position:right_0.75rem_center] bg-no-repeat pr-10",
            className,
          )}
          {...props}
        >
          {children}
        </select>
      )}
    </FieldShell>
  );
}

/** Standalone checkbox with its own label — used for consent and yes/no flags. */
export function Checkbox({
  label,
  error,
  ...props
}: Omit<React.ComponentProps<"input">, "type" | "id"> & {
  label: React.ReactNode;
  error?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? true : undefined}
          className={cn(
            "mt-0.5 size-4.5 shrink-0 border-ink-300 text-stamp-700",
            "accent-stamp-600",
            error && "border-oxide-500",
          )}
          {...props}
        />
        <label htmlFor={id} className="text-sm leading-relaxed text-ink-600">
          {label}
        </label>
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-oxide-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
