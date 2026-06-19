import Link from "next/link";
import { NAV, QUICK_LINKS } from "@/lib/content/nav";
import { SITE } from "@/lib/content/site";
import { CONTAINER, EYEBROW } from "./styles";

const COLUMN_HEADING = `${EYEBROW} text-brand-teal`;
const LINK = "transition-colors hover:text-brand-teal";

/**
 * Navy footer with the ultraviolet -> teal gradient top rule, four columns
 * (quick links / conditions / contact / social), and the legal row.
 */
export default function Footer() {
  return (
    <footer className="v2-band-dark bg-medical-secondary text-white">
      <div
        aria-hidden
        className="h-1 bg-linear-to-r from-brand-ultraviolet via-brand-purple to-brand-teal"
      />
      <div className={`${CONTAINER} py-16 lg:py-20`}>
        <div className="border-b border-white/10 pb-10">
          <p className="text-2xl font-semibold tracking-tight md:text-3xl">
            {SITE.name}
          </p>
          <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.28em] text-white/60">
            {SITE.tagline}
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-12 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Quick links">
            <h2 className={COLUMN_HEADING}>Quick Links</h2>
            <ul className="mt-5 space-y-2.5 text-sm text-white/80">
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
            <ul className="mt-5 space-y-2 text-sm text-white/80">
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
            <ul className="mt-5 space-y-2.5 text-sm text-white/80">
              <li>
                <a href={SITE.phone.href} className={`font-medium ${LINK}`}>
                  {SITE.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className={`break-all ${LINK}`}>
                  {SITE.email}
                </a>
              </li>
              <li className="pt-2">
                {SITE.address.street}
                <br />
                {SITE.address.cityStateZip}
              </li>
              <li className="text-white/60">{SITE.address.note}</li>
              <li>
                <a
                  href={SITE.address.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`underline decoration-white/30 underline-offset-4 ${LINK}`}
                >
                  Open in Google Maps
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={COLUMN_HEADING}>Social</h2>
            <ul className="mt-5 space-y-2.5 text-sm text-white/80">
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

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row md:items-baseline md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}
          </p>
          <p className="max-w-xl md:text-right">{SITE.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
