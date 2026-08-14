import { site } from "@/lib/site";

/**
 * Floating WhatsApp contact — the dominant channel for GCC trade enquiries, so
 * it stays pinned. Square, like everything else here: the glyph carries the
 * recognition, the shape does not have to.
 */
export function WhatsAppFab() {
  return (
    <a
      href={site.contact.whatsapp.href}
      target="_blank"
      rel="noreferrer noopener"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 border border-ink-900 bg-[#25D366] px-4 py-3 transition-transform duration-150 ease-[var(--ease-stamp)] hover:translate-y-px"
    >
      <span className="sr-only">Chat with us on WhatsApp</span>
      <svg
        viewBox="0 0 24 24"
        className="size-6 text-ink-900"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.8h-.02a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.71.97.99-3.62-.23-.37a9.78 9.78 0 0 1-1.5-5.22c0-5.4 4.4-9.8 9.82-9.8a9.75 9.75 0 0 1 6.93 2.88 9.72 9.72 0 0 1 2.87 6.93c0 5.4-4.4 9.81-9.8 9.81ZM20.52 3.5A11.8 11.8 0 0 0 12.05 0C5.5 0 .18 5.32.17 11.86c0 2.09.55 4.13 1.59 5.93L.07 24l6.35-1.66a11.9 11.9 0 0 0 5.67 1.44h.01c6.54 0 11.86-5.32 11.87-11.86a11.8 11.8 0 0 0-3.46-8.4Z" />
      </svg>
      <span className="u-caption hidden text-ink-900 sm:inline">WhatsApp</span>
    </a>
  );
}
