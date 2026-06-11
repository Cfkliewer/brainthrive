import Link from "next/link";
import { navFor, quickLinksFor } from "@/lib/content/nav";
import { SITE } from "@/lib/content/site";
import { BTN_GLOW, CONTAINER, EYEBROW } from "./styles";

const NAV = navFor("v3");
const QUICK_LINKS = quickLinksFor("v3");

const SOCIALS = [
  { label: "Instagram", href: SITE.socials.instagram },
  { label: "Facebook", href: SITE.socials.facebook },
];

/**
 * V3 footer: gradient hairline top, glowing CTA block, four link columns,
 * disclaimer. Rendered on every page so "Schedule Consultation" always
 * closes the journey.
 */
export default function Footer() {
  return (
    <footer className="relative bg-medical-secondary">
      <div
        aria-hidden="true"
        className="h-px bg-gradient-to-r from-brand-ultraviolet via-brand-dark-teal to-brand-teal"
      />
      <div className="relative overflow-hidden">
        {/* Ambient glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(53,243,230,0.35), transparent)",
          }}
        />

        {/* CTA block */}
        <div className={`${CONTAINER} relative py-20 text-center md:py-24`}>
          <p className={EYEBROW}>Take the first step</p>
          <p className="v3-display mx-auto mt-4 max-w-3xl text-balance text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.95] text-white">
            Ready to prioritize your brain health?
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={NAV.cta.href} className={BTN_GLOW}>
              {NAV.cta.label}
            </Link>
            <a
              href={SITE.phone.href}
              className="text-sm font-medium tracking-[0.12em] text-white/80 transition-colors hover:text-brand-teal"
            >
              or call {SITE.phone.display}
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className={`${CONTAINER} relative border-t border-white/10 py-14`}>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <nav aria-label="Quick links">
              <p className={EYEBROW}>Explore</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 transition-colors hover:text-brand-teal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Who we help">
              <p className={EYEBROW}>Who We Help</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {NAV.whoWeHelp.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/70 transition-colors hover:text-brand-teal"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className={EYEBROW}>Contact</p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/70">
                <li>
                  <a
                    href={SITE.phone.href}
                    className="transition-colors hover:text-brand-teal"
                  >
                    {SITE.phone.display}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="break-all transition-colors hover:text-brand-teal"
                  >
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.address.mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-brand-teal"
                  >
                    {SITE.address.street}
                    <br />
                    {SITE.address.cityStateZip}
                  </a>
                </li>
                <li className="text-white/50">{SITE.address.note}</li>
              </ul>
            </div>

            <div>
              <p className={EYEBROW}>Follow</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {SOCIALS.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 transition-colors hover:text-brand-teal"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Fine print */}
        <div className={`${CONTAINER} relative border-t border-white/10 py-8`}>
          <p className="text-xs leading-relaxed text-brand-silver/60">
            &copy; {new Date().getFullYear()} {SITE.name}. {SITE.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
