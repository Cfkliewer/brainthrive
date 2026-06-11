"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

interface SplitHeadingProps {
  /** Heading tag to render. */
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  children: React.ReactNode;
}

/**
 * Line-masked SplitText reveal: each line is wrapped in an overflow-hidden
 * mask and rises into place once on first scroll entry. The split runs only
 * after document.fonts.ready (avoids mis-measured lines) and only when
 * motion is allowed — otherwise the heading stays static and unsplit.
 */
export default function SplitHeading({
  as = "h2",
  className,
  children,
}: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let split: SplitText | null = null;
        let cancelled = false;
        document.fonts.ready.then(() => {
          if (cancelled || !el.isConnected) return;
          split = new SplitText(el, {
            type: "lines",
            mask: "lines",
            linesClass: "v3-split-line",
          });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          });
        });
        return () => {
          cancelled = true;
          split?.revert();
        };
      });
    },
    { scope: ref }
  );

  const Tag = as;
  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}
