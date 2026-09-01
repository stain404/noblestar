"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./logo";
import { buttonVariants } from "@/components/ui/button";
import { serviceIcon } from "@/components/ui/service-icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavFieldItem,
  NavItemMobile,
  NavTopLink,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  type NavItemType,
} from "@/components/ui/navigation-menu";
import { isHeld, mainNav, site } from "@/lib/site";
import type { ServiceMeta } from "@/lib/content";

/**
 * The header is the document's header: a masthead rule carrying the issuing
 * party and its hours, then the section names set as field captions. It is
 * always solid — this world's ground is paper, so there is no dark hero for a
 * transparent bar to sit over.
 */
export function Header({ services }: { services: ServiceMeta[] }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the sheet on navigation. Adjusting state during render rather than in
  // an effect avoids a frame where the menu is still open on the new page.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setMobileOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const serviceLinks: NavItemType[] = services.map((service) => ({
    title: service.navTitle,
    href: `/services/${service.slug}`,
    description: service.summary,
    icon: serviceIcon(service.icon),
  }));

  const otherLinks: NavItemType[] = mainNav
    .filter((item) => item.href !== "/services")
    .map((item) => ({
      title: item.label,
      href: item.href,
      description: item.description,
    }));

  const primaryPhone = site.contact.phones[0];

  return (
    <header className="sticky top-0 z-50 border-b border-ink-300 bg-paper-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-stamp-700 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      {/* Masthead rule — the issuing party, where it operates, and when it can
          be reached. Real document metadata, not decoration. */}
      <div className="border-b border-paper-200 bg-white">
        <div className="container-page flex h-8 items-center justify-between gap-6">
          <p className="u-caption truncate text-ink-500">
            {site.name} Services L.L.C · Dubai, U.A.E.
          </p>
          <p className="u-caption hidden shrink-0 text-ink-500 md:block">
            {site.contact.hours}
          </p>
        </div>
      </div>

      {/* `relative` anchors the mega-menu viewport to the page container, so a
          wide panel centres on the page and stays inside the gutters. */}
      <div className="container-page relative flex h-16 items-center gap-8">
        {/* The name is real text inside the link rather than an `aria-label`
            on it. The lockup sets two of its lines as live text, and an
            `aria-label` over the top of them is announced as a contradiction
            of what the element contains. */}
        <Link href="/" className="shrink-0">
          <span className="sr-only">{site.name} — home</span>
          <Logo />
        </Link>

        <DesktopMenu
          serviceLinks={serviceLinks}
          otherLinks={otherLinks}
          isActive={isActive}
        />

        <div className="ml-auto flex shrink-0 items-center gap-4">
          <a
            href={primaryPhone.href}
            className="u-caption hidden items-center gap-2 text-ink-600 transition-colors hover:text-stamp-700 lg:inline-flex"
          >
            <Phone className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="hidden xl:inline">{primaryPhone.number}</span>
            <span className="sr-only xl:hidden">
              Call {primaryPhone.number}
            </span>
          </a>
          <Link
            href="/quote"
            className={buttonVariants({
              variant: "primary",
              size: "sm",
              className: "hidden sm:inline-flex",
            })}
          >
            Open a file
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="-mr-2 inline-flex size-11 items-center justify-center text-ink-900 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-6" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent
              className="w-full gap-0 bg-paper-50"
              showClose={false}
            >
              <SheetTitle className="sr-only">Site navigation</SheetTitle>

              <div className="flex h-16 shrink-0 items-center justify-between border-b border-ink-300 px-5">
                <Logo />
                <SheetClose
                  className="-mr-2 inline-flex size-11 items-center justify-center text-ink-900"
                  aria-label="Close menu"
                >
                  <X className="size-6" aria-hidden="true" />
                </SheetClose>
              </div>

              <MobileMenu
                serviceLinks={serviceLinks}
                otherLinks={otherLinks}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

/* --------------------------------- desktop --------------------------------- */

function DesktopMenu({
  serviceLinks,
  otherLinks,
  isActive,
}: {
  serviceLinks: NavItemType[];
  otherLinks: NavItemType[];
  isActive: (href: string) => boolean;
}) {
  return (
    <NavigationMenu className="hidden lg:block" aria-label="Main">
      <NavigationMenuList>
        {/* Services is the only section deep enough to earn a panel; the rest
            are single pages and read faster as flat labels. While the section
            is held the panel collapses to a flat label — a menu of pages that
            are not ready would advertise seven dead ends. */}
        {isHeld("/services") ? (
          <NavigationMenuItem>
            <NavTopLink
              item={{ title: "Services", href: "/services" }}
              active={isActive("/services")}
              held
            />
          </NavigationMenuItem>
        ) : (
        <NavigationMenuItem>
          <NavigationMenuTrigger
            data-active={isActive("/services") ? "" : undefined}
          >
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[min(62rem,calc(100vw-5rem))]">
              <ul className="grid grid-cols-2 border-l border-paper-200 md:grid-cols-4">
                {serviceLinks.map((link, i) => (
                  <li key={link.href} className="contents">
                    <NavFieldItem
                      link={link}
                      index={i + 1}
                      active={isActive(link.href)}
                    />
                  </li>
                ))}
                {/* The panel's last cell is the index of the whole range —
                    it completes the grid instead of leaving a hole. */}
                <li className="contents">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/services"
                      className="group flex h-full flex-col justify-between gap-3 border-r border-b border-paper-200 bg-stamp-700 p-5 text-paper-50 transition-colors hover:bg-stamp-800"
                    >
                      <span className="u-caption text-stamp-300">All</span>
                      <span className="text-[0.9375rem] font-semibold text-white">
                        The full range →
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
              <div className="flex items-center justify-between gap-4 border-t border-ink-300 bg-white px-5 py-3">
                <p className="text-xs text-ink-500">
                  Sea, air, road and customs — end to end across the GCC.
                </p>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        )}

        {otherLinks.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavTopLink
              item={link}
              active={isActive(link.href)}
              held={isHeld(link.href)}
            />
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

/* --------------------------------- mobile ---------------------------------- */

function MobileMenu({
  serviceLinks,
  otherLinks,
}: {
  serviceLinks: NavItemType[];
  otherLinks: NavItemType[];
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {isHeld("/services") ? (
          <>
            <p className="u-caption border-b border-ink-300 py-4 text-ink-500">
              Services
            </p>
            <NavItemMobile
              item={{
                title: "Services",
                href: "/services",
                description: "In preparation",
              }}
              held
            />
          </>
        ) : (
          <>
            <p className="u-caption border-b border-ink-300 py-4 text-ink-500">
              Services
            </p>
            <ul>
              {serviceLinks.map((link, i) => (
                <li key={link.href}>
                  <NavItemMobile item={link} index={i + 1} />
                </li>
              ))}
            </ul>
          </>
        )}

        <p className="u-caption border-b border-ink-300 pb-4 pt-8 text-ink-500">
          Company
        </p>
        <ul>
          {otherLinks.map((link) => (
            <li key={link.href}>
              <NavItemMobile item={link} held={isHeld(link.href)} />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex shrink-0 flex-col gap-3 border-t border-ink-300 bg-white px-5 py-5">
        <Link
          href="/quote"
          className={buttonVariants({ variant: "primary", size: "lg" })}
        >
          Open a file
        </Link>
        <a
          href={site.contact.phones[0].href}
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          <Phone className="size-4" aria-hidden="true" />
          {site.contact.phones[0].number}
        </a>
      </div>
    </div>
  );
}
