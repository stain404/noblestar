import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";
import { footerNav, isHeld, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const socials = [
  {
    name: "LinkedIn",
    href: site.social.linkedin,
    path: "M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.22 8.02h4.54V24H.22V8.02Zm7.4 0h4.35v2.18h.06c.6-1.14 2.08-2.35 4.28-2.35 4.58 0 5.43 3.02 5.43 6.94V24h-4.53v-7.3c0-1.74-.03-3.98-2.42-3.98-2.43 0-2.8 1.9-2.8 3.86V24H7.62V8.02Z",
  },
  {
    name: "Instagram",
    href: site.social.instagram,
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91a5.9 5.9 0 0 0 1.38 2.13 5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z",
  },
  {
    name: "Facebook",
    href: site.social.facebook,
    path: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07Z",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-800 bg-ink-900 text-ink-300">
      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo onDark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-400">
              {site.tagline}. Sea, air and road freight with in-house customs
              clearance across the GCC.
            </p>
            <ul className="mt-6 flex gap-3">
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex size-9 items-center justify-center border border-ink-700 text-ink-400 transition-colors hover:border-stamp-400 hover:text-stamp-300"
                  >
                    <span className="sr-only">{social.name}</span>
                    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                      <path d={social.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footerNav.map((group) => (
            <div key={group.title}>
              <h2 className="u-caption text-stamp-300">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "inline-flex items-center text-sm transition-colors hover:text-white",
                        isHeld(link.href) ? "text-ink-600" : "text-ink-400",
                      )}
                    >
                      {link.label}
                      {isHeld(link.href) ? (
                        <>
                          <span
                            aria-hidden="true"
                            className="ml-2 inline-block size-1.5 bg-oxide-500"
                          />
                          <span className="sr-only">(in preparation)</span>
                        </>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="u-caption text-stamp-300">Get in touch</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {site.contact.phones.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    className="inline-flex items-center gap-2.5 text-ink-400 transition-colors hover:text-white"
                  >
                    <Phone className="size-4 shrink-0 text-stamp-400" aria-hidden="true" />
                    <span>
                      {phone.number}
                      <span className="ml-1.5 font-mono text-xs text-ink-500">
                        {phone.label}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-2.5 text-ink-400 transition-colors hover:text-white"
                >
                  <Mail className="size-4 shrink-0 text-stamp-400" aria-hidden="true" />
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-ink-400">
                <MapPin className="mt-0.5 size-4 shrink-0 text-stamp-400" aria-hidden="true" />
                {site.contact.address.full}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-800 pt-6 font-mono text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.contact.hours}</p>
        </div>
      </div>
    </footer>
  );
}
