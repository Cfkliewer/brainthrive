import Link from "next/link";
import { navFor } from "@/lib/content/nav";
import { SITE } from "@/lib/content/site";
import { BTN_PRIMARY } from "./styles";

const NAV = navFor("v2");

/**
 * Slim fixed bottom CTA bar for condition pages, below lg only: Schedule
 * Consultation plus a call icon button. The right padding keeps clear of
 * the fixed VersionSwitcher pill.
 */
export default function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-medical-gray-200 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-3 pr-28">
        <Link href={NAV.cta.href} className={`${BTN_PRIMARY} flex-1 py-3`}>
          {NAV.cta.label}
        </Link>
        <a
          href={SITE.phone.href}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-medical-gray-300 text-brand-navy"
        >
          <span className="sr-only">Call {SITE.phone.display}</span>
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="h-4 w-4 fill-current"
          >
            <path d="M3.6 1.2c.4-.4 1-.4 1.4 0l1.9 1.9c.4.4.4 1 0 1.4l-.9.9c.5 1 1.6 2.1 2.6 2.6l.9-.9c.4-.4 1-.4 1.4 0l1.9 1.9c.4.4.4 1 0 1.4l-1 1c-.7.7-1.8.9-2.7.4-2.9-1.5-5.3-3.9-6.8-6.8-.5-.9-.3-2 .4-2.7l.9-1.1z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
