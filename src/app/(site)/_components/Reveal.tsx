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
  delay?: number;
  /**
   * When set, the block's direct children rise in sequence with this
   * stagger (seconds) instead of the block animating as one unit.
   * Keep it subtle — 0.06 is the house default.
   */
  stagger?: number;
}

/**
 * V2's batch reveal: a once-only fade-up on first entry, optionally
 * staggered across direct children. gsap.from inside a reduced-motion
 * matchMedia, so content is fully visible by default and for
 * reduced-motion users.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  stagger,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = stagger ? Array.from(el.children) : el;
        gsap.from(targets, {
          autoAlpha: 0,
          y: 28,
          duration: 0.8,
          ease: "power3.out",
          delay,
          ...(stagger ? { stagger } : {}),
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });
    },
    { scope: ref, dependencies: [delay, stagger] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
