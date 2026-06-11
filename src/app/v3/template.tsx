"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Page-enter transition for every /v3 route: a teal-tinted navy overlay
 * sweeps up and away while the page content rises in. Enter only — there
 * are no exit animations. The overlay sits off-screen by default
 * (-translate-y-full), so content is fully visible without JS and for
 * reduced-motion users.
 */
export default function V3Template({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const content = contentRef.current;
      if (!overlay || !content) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline();
        tl.fromTo(
          overlay,
          { yPercent: 0 },
          { yPercent: -100, duration: 0.5, ease: "power3.inOut" }
        );
        tl.from(
          content,
          { autoAlpha: 0, y: 28, duration: 0.5, ease: "power2.out" },
          0.12
        );
      });
    },
    { scope: scopeRef }
  );

  return (
    <div ref={scopeRef}>
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70] -translate-y-full bg-gradient-to-b from-brand-navy via-medical-secondary to-medical-secondary"
      >
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-teal/70 to-transparent" />
      </div>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
