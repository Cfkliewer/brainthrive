"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const MAX_PULL_PX = 8;

interface MagneticButtonProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * A link that leans toward the cursor by up to ±8px (gsap.quickTo),
 * only on fine-pointer hover devices without reduced motion. tel:/mailto:
 * hrefs render a plain anchor; everything else is a Next <Link>.
 */
export default function MagneticButton({
  href,
  className,
  children,
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const wrapper = ref.current;
      const target = wrapper?.firstElementChild as HTMLElement | null;
      if (!wrapper || !target) return;

      const mm = gsap.matchMedia();
      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const xTo = gsap.quickTo(target, "x", {
            duration: 0.4,
            ease: "power3.out",
          });
          const yTo = gsap.quickTo(target, "y", {
            duration: 0.4,
            ease: "power3.out",
          });

          const onMove = (event: MouseEvent) => {
            const rect = wrapper.getBoundingClientRect();
            const relX = event.clientX - (rect.left + rect.width / 2);
            const relY = event.clientY - (rect.top + rect.height / 2);
            xTo(
              gsap.utils.clamp(
                -MAX_PULL_PX,
                MAX_PULL_PX,
                (relX / (rect.width / 2)) * MAX_PULL_PX
              )
            );
            yTo(
              gsap.utils.clamp(
                -MAX_PULL_PX,
                MAX_PULL_PX,
                (relY / (rect.height / 2)) * MAX_PULL_PX
              )
            );
          };
          const onLeave = () => {
            xTo(0);
            yTo(0);
          };

          wrapper.addEventListener("mousemove", onMove);
          wrapper.addEventListener("mouseleave", onLeave);
          return () => {
            wrapper.removeEventListener("mousemove", onMove);
            wrapper.removeEventListener("mouseleave", onLeave);
          };
        }
      );
    },
    { scope: ref }
  );

  const isPlainAnchor = href.startsWith("tel:") || href.startsWith("mailto:");

  return (
    <span ref={ref} className="inline-block">
      {isPlainAnchor ? (
        <a href={href} className={className}>
          {children}
        </a>
      ) : (
        <Link href={href} className={className}>
          {children}
        </Link>
      )}
    </span>
  );
}
