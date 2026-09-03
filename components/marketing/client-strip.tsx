import { clients, suppliedClients } from "@/lib/clients";
import { cn } from "@/lib/utils";

/**
 * The client strip: logos of the businesses Noble Star clears and delivers for,
 * set as ruled cells sharing single rules — a list of counterparties on the
 * file, not a floating logo wall.
 *
 * Each logo resolves from `public/photos/clients/` at build time. The strip
 * renders only the logos that exist, so a partial set is fine and the section
 * simply does not appear until at least one logo is supplied.
 */
export function ClientStrip({ className }: { className?: string }) {
  const shown = suppliedClients();

  if (shown.length === 0) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <p
        className={cn(
          "u-caption border border-dashed border-oxide-500/50 p-4 text-oxide-600",
          className,
        )}
      >
        Client logo slot · add {clients.map((c) => c.slug).join(", ")} to
        public/photos/clients/
      </p>
    );
  }

  return (
    <ul
      className={cn(
        "field-grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
        className,
      )}
    >
      {shown.map((client) => (
        <li
          key={client.slug}
          className="flex items-center justify-center bg-white px-5 py-8 sm:px-6"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- logos are
              static third-party assets, often SVG; the image optimiser adds
              nothing and would need dangerouslyAllowSVG. */}
          <img
            src={client.logo}
            alt={client.name}
            loading="lazy"
            className="max-h-10 w-auto opacity-70 grayscale transition-opacity duration-200 hover:opacity-100"
          />
        </li>
      ))}
    </ul>
  );
}
