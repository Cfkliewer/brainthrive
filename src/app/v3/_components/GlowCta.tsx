"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { navFor } from "@/lib/content/nav";
import { SITE } from "@/lib/content/site";
import { BTN_GLOW_BASE, CONTAINER, EYEBROW } from "./styles";

const NAV = navFor("v3");

interface GlowCtaProps {
  /** Verbatim closing line (e.g. a condition's `cta`). */
  text?: string;
  heading?: string;
}

/**
 * Chapter 8: the CTA "portal" — concentric teal rings pulse slowly behind a
 * magnetic Schedule Consultation button (gsap.quickTo, hover-capable
 * pointers only) and a tel link.
 */
export default function GlowCta({
  text,
  heading = "Step into a better-regulated brain.",
}: GlowCtaProps) {
  const scopeRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Subtle breathing rings.
        gsap.utils
          .toArray<HTMLElement>("[data-cta-ring]")
          .forEach((ring, index) => {
            gsap.to(ring, {
              scale: 1.12,
              opacity: 0.25,
              duration: 2.6,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: index * 0.5,
            });
          });
      });

      // Magnetic button: hover-capable fine pointers only.
      mm.add(
        "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
        () => {
          const wrap = buttonRef.current;
          if (!wrap) return;
          const xTo = gsap.quickTo(wrap, "x", { duration: 0.4, ease: "power3" });
          const yTo = gsap.quickTo(wrap, "y", { duration: 0.4, ease: "power3" });

          const onMove = (event: PointerEvent) => {
            const rect = wrap.getBoundingClientRect();
            const relX = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
            const relY = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
            xTo(gsap.utils.clamp(-8, 8, relX * 16));
            yTo(gsap.utils.clamp(-8, 8, relY * 16));
          };
          const onLeave = () => {
            xTo(0);
            yTo(0);
          };
          wrap.addEventListener("pointermove", onMove);
          wrap.addEventListener("pointerleave", onLeave);
          return () => {
            wrap.removeEventListener("pointermove", onMove);
            wrap.removeEventListener("pointerleave", onLeave);
          };
        }
      );
    },
    { scope: scopeRef }
  );

  return (
    <section
      ref={scopeRef}
      aria-label="Schedule a consultation"
      className="relative overflow-hidden"
    >
      <div className={`${CONTAINER} relative py-28 text-center md:py-40`}>
        {/* Portal rings */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span
            data-cta-ring
            className="absolute h-[26rem] w-[26rem] rounded-full border border-brand-teal/25 shadow-[0_0_60px_rgba(53,243,230,0.12),inset_0_0_60px_rgba(53,243,230,0.08)]"
          />
          <span
            data-cta-ring
            className="absolute h-[38rem] w-[38rem] rounded-full border border-brand-ultraviolet/20"
          />
          <span
            data-cta-ring
            className="absolute h-[52rem] w-[52rem] rounded-full border border-brand-teal/10"
          />
        </div>

        <div className="relative">
          <p className={EYEBROW}>Begin</p>
          <h2 className="v3-display mx-auto mt-5 max-w-3xl text-balance text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] text-white">
            {heading}
          </h2>
          {text && (
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-[1.7] text-white/80">
              {text}
            </p>
          )}
          <div className="mt-10 flex flex-col items-center gap-5">
            <div ref={buttonRef} className="will-change-transform">
              <Link href={NAV.cta.href} className={`${BTN_GLOW_BASE} px-10 py-4 text-sm`}>
                {NAV.cta.label}
              </Link>
            </div>
            <a
              href={SITE.phone.href}
              className="text-sm tracking-[0.12em] text-white/70 transition-colors hover:text-brand-teal"
            >
              or call {SITE.phone.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
