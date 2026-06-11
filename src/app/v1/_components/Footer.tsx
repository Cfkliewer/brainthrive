import Link from "next/link";
import { navFor, quickLinksFor } from "@/lib/content/nav";
import { SITE } from "@/lib/content/site";
import { CONTAINER, EYEBROW_MUTED } from "./styles";

const NAV = navFor("v1");
const QUICK_LINKS = quickLinksFor("v1");

const COLUMN_HEADING = EYEBROW_MUTED;
const LINK = "transition-colors hover:text-brand-ultraviolet";

/** Silver editorial footer: wordmark, four hairline columns, legal row. */
export default function Footer() {
  return (
    <footer className="border-t border-brand-navy/10 bg-brand-silver">
      <div className={`${CONTAINER} py-16 lg:py-20`}>
        <div className="border-b border-brand-navy/10 pb-10">
          <p className="v1-display text-2xl tracking-tight md:text-3xl">
            {SITE.name}
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-brand-navy/70">
            {SITE.tagline}
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-12 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Quick links">
            <h2 className={COLUMN_HEADING}>Quick Links</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Who we help">
            <h2 className={COLUMN_HEADING}>Who We Help</h2>
            <ul className="mt-5 space-y-2 text-sm">
              {NAV.whoWeHelp.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={LINK}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={COLUMN_HEADING}>Contact</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <a href={SITE.phone.href} className={LINK}>
                  {SITE.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className={LINK}>
                  {SITE.email}
                </a>
              </li>
              <li className="pt-2 text-brand-navy/75">
                {SITE.address.street}
                <br />
                {SITE.address.cityStateZip}
              </li>
              <li className="text-brand-navy/70">{SITE.address.note}</li>
              <li>
                <a
                  href={SITE.address.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${LINK} text-brand-ultraviolet underline decoration-brand-ultraviolet/30 underline-offset-4`}
                >
                  Open in Google Maps
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={COLUMN_HEADING}>Social</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <a
                  href={SITE.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK}
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={SITE.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK}
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-brand-navy/10 pt-6 text-xs text-brand-navy/70 md:flex-row md:items-baseline md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}
          </p>
          <p className="max-w-xl md:text-right">{SITE.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
