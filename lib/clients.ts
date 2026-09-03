import "server-only";
import { clientLogo } from "./photos";

/**
 * Businesses whose freight and customs Noble Star runs, and who have agreed to
 * be named. This list is the display order.
 *
 * An entry appears on the site only once a logo file exists at
 * `public/photos/clients/<slug>` (see `public/photos/README.md`). Entries with
 * no file yet are skipped, so the strip always reflects exactly what has been
 * supplied and cleared — a partial set is a normal state.
 */
export type Client = {
  /** Trading name, used verbatim as the logo's alt text. */
  name: string;
  /** File stem under `public/photos/clients/`. */
  slug: string;
};

export const clients: Client[] = [
  { name: "Pasons Group", slug: "pasons" },
  { name: "Golden Rise Trading L.L.C.", slug: "golden-rise" },
  { name: "Nesto", slug: "nesto" },
  { name: "Abdulla Ummer Abdulla Foodstuff", slug: "aua" },
  { name: "Hebron General Trading L.L.C.", slug: "hebron" },
  { name: "Gateway Trading Co. L.L.C.", slug: "gateway" },
];

export type SuppliedClient = Client & { logo: string };

/** The clients that have a logo file on disk, in list order. */
export function suppliedClients(): SuppliedClient[] {
  return clients
    .map((client) => ({ ...client, logo: clientLogo(client.slug) }))
    .filter((client): client is SuppliedClient => client.logo !== null);
}
