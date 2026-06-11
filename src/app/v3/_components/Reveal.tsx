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
   * When set, staggers the element's direct children instead of revealing
   * the wrapper as one block.
   */
  stagger?: number;
}

/**
 * V3 scroll reveal: a weighty, once-only fade-up on first entry.
 * gsap.from inside a reduced-motion matchMedia, so content is fully
 * visible by default and for reduced-motion users.
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
      const targets = stagger ? Array.from(el.children) : el;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(targets, {
          autoAlpha: 0,
          y: 32,
          duration: 0.9,
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
