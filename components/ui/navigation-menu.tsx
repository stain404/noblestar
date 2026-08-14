"use client";

import * as React from "react";
import Link from "next/link";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ArrowRight, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

type NavItemType = {
  title: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu flex max-w-max flex-1 items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

/**
 * Top-level nav labels are set as field captions, because that is what they
 * are: the names of the sections of this document. The open state is marked by
 * a rule under the label rather than a filled pill.
 */
const topLevel = cn(
  "u-caption relative inline-flex h-16 w-max items-center px-4 text-ink-600 outline-none transition-colors duration-150",
  "hover:text-stamp-700 focus-visible:text-stamp-700",
  "after:pointer-events-none after:absolute after:inset-x-4 after:bottom-5 after:h-px after:origin-left after:scale-x-0 after:bg-stamp-600 after:transition-transform after:duration-200 after:ease-[var(--ease-stamp)]",
  "hover:after:scale-x-100 data-[active]:after:scale-x-100 data-[state=open]:after:scale-x-100",
  "data-[active]:text-stamp-700 data-[state=open]:text-stamp-700",
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn("group", topLevel, className)}
      {...props}
    >
      {children}
      {/* A plus, not a chevron: this opens a block of the form rather than
          dropping a list down. It rotates to a close mark when open. */}
      <Plus
        className="ml-2 size-3 transition-transform duration-300 ease-[var(--ease-stamp)] group-data-[state=open]:rotate-45"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "top-0 left-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out md:absolute md:w-auto",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    // `inset-x-0` is load-bearing: the wrapper must span the full width of the
    // positioned ancestor for `justify-center` to have anything to centre
    // against. With `left-0` alone it shrink-wraps and the panel hangs off the
    // left gutter.
    <div className="absolute inset-x-0 top-full isolate z-50 flex justify-center">
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "relative h-[var(--radix-navigation-menu-viewport-height)] w-full origin-top overflow-hidden border border-ink-300 bg-white text-ink-700 transition-[width,height] duration-200 ease-[var(--ease-stamp)] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 md:w-[var(--radix-navigation-menu-viewport-width)]",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "flex flex-col justify-center gap-1 text-sm text-ink-600 outline-none transition-colors",
        "hover:text-stamp-700 focus-visible:text-stamp-700",
        // Radix renders `data-active=""`, not `data-active="true"`.
        "data-[active]:text-stamp-700",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in",
        className,
      )}
      {...props}
    />
  );
}

/**
 * A section that exists but is not ready to be shown. The label stays in the
 * bar so the shape of the site is still legible, greyed back with an oxide
 * mark — the same colour the rest of the system uses for anything unverified.
 */
const heldMark = (
  <span
    aria-hidden="true"
    className="ml-2 inline-block size-1.5 shrink-0 bg-oxide-500 align-middle"
  />
);

/** Top-level bar link — the flat siblings of the Services trigger. */
function NavTopLink({
  item,
  active,
  held,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "href"> & {
  item: Omit<NavItemType, "description" | "icon">;
  active?: boolean;
  held?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Link asChild active={active}>
      <Link
        href={item.href}
        className={cn(
          topLevel,
          held && "text-ink-300 after:bg-oxide-500 hover:text-ink-400",
          className,
        )}
        {...props}
      >
        {item.title}
        {held ? (
          <>
            {heldMark}
            <span className="sr-only">(in preparation)</span>
          </>
        ) : null}
      </Link>
    </NavigationMenuPrimitive.Link>
  );
}

/**
 * A service inside the Services panel, set as a numbered field. The number is
 * the service's real order in the range, not an ornament.
 */
function NavFieldItem({
  link,
  index,
  active,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "href"> & {
  link: NavItemType;
  index: number;
  active?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Link asChild active={active}>
      <Link
        href={link.href}
        className={cn(
          "group flex h-full flex-col justify-between gap-3 border-r border-b border-paper-200 p-5 outline-none transition-colors duration-150",
          "hover:bg-stamp-50 focus-visible:bg-stamp-50",
          active && "bg-stamp-50",
          className,
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-[0.6875rem] text-ink-400">
            {String(index).padStart(2, "0")}
          </span>
          {link.icon && (
            <link.icon className="size-4 shrink-0 text-stamp-500" />
          )}
        </div>
        <div>
          <span className="block text-[0.9375rem] font-semibold text-ink-900 transition-colors group-hover:text-stamp-700">
            {link.title}
          </span>
          {link.description && (
            <p className="mt-1.5 text-xs leading-snug text-ink-500">
              {link.description}
            </p>
          )}
        </div>
      </Link>
    </NavigationMenuPrimitive.Link>
  );
}

/** Compact row with an arrow that slides in on hover. */
function NavSmallItem({
  item,
  active,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "href"> & {
  item: Omit<NavItemType, "description">;
  active?: boolean;
}) {
  return (
    <NavigationMenuLink asChild active={active}>
      <Link
        href={item.href}
        className={cn(
          "group relative h-max flex-row items-center gap-x-3 px-2.5 py-2",
          className,
        )}
        {...props}
      >
        {item.icon && <item.icon className="size-4 text-stamp-500" />}
        <p className="text-sm">{item.title}</p>
        <span className="relative ml-auto flex h-full w-4 items-center">
          <ArrowRight className="size-4 -translate-x-2 text-stamp-500 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
        </span>
      </Link>
    </NavigationMenuLink>
  );
}

/** Mobile sheet row: number, title and one supporting line. */
function NavItemMobile({
  item,
  index,
  held,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "href"> & {
  item: NavItemType;
  index?: number;
  held?: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex gap-x-4 border-b border-paper-200 py-3.5 outline-none transition-colors",
        "hover:text-stamp-700 focus-visible:text-stamp-700",
        className,
      )}
      {...props}
    >
      <span className="mt-0.5 w-6 shrink-0 font-mono text-[0.6875rem] text-ink-400">
        {index !== undefined ? String(index).padStart(2, "0") : null}
      </span>
      <span className="flex flex-col">
        <span
          className={cn(
            "block text-[0.9375rem] font-semibold transition-colors group-hover:text-stamp-700",
            held ? "text-ink-400" : "text-ink-900",
          )}
        >
          {item.title}
          {held ? (
            <>
              {heldMark}
              <span className="sr-only">(in preparation)</span>
            </>
          ) : null}
        </span>
        {item.description && (
          <span className="mt-1 block text-xs leading-snug text-ink-500">
            {item.description}
          </span>
        )}
      </span>
    </Link>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  NavFieldItem,
  NavTopLink,
  NavSmallItem,
  NavItemMobile,
  type NavItemType,
};
