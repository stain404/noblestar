import {
  Anchor,
  Container,
  FileCheck2,
  PackageSearch,
  Plane,
  Ship,
  Snowflake,
  Truck,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

/** Maps the `icon` string in service frontmatter to a component. */
const icons: Record<string, LucideIcon> = {
  ship: Ship,
  plane: Plane,
  truck: Truck,
  customs: FileCheck2,
  container: Container,
  package: PackageSearch,
  cold: Snowflake,
  anchor: Anchor,
  warehouse: Warehouse,
};

/** Resolve a frontmatter `icon` string to the raw component, for APIs that take one. */
export function serviceIcon(name: string): LucideIcon {
  return icons[name] ?? Ship;
}

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = icons[name] ?? Ship;
  return <Icon className={className} aria-hidden="true" strokeWidth={1.6} />;
}
