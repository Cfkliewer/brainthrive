"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * "rise" fades the block up 24px on first entry; "rule" draws the element
   * (a hairline) from the left via scaleX. Both are gsap.from tweens inside
   * a reduced-motion matchMedia, so content is fully visible by default and
   * for reduced-motion users.
   */
  variant?: "rise" | "rule";
  delay?: number;
}

/**
 * The one scroll animation in V1 "Editorial Calm": a quiet, once-only
 * fade-up (or hairline draw) when a block first scrolls into view.
 */
export default function Reveal({
  children,
  className,
  variant = "rise",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(el, {
          ...(variant === "rule"
            ? { scaleX: 0, transformOrigin: "left center" }
            : { autoAlpha: 0, y: 24 }),
          duration: 0.7,
          ease: "power2.out",
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });
    },
    // Re-create the tween if the variant/delay props ever change at runtime.
    { scope: ref, dependencies: [delay, variant] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
