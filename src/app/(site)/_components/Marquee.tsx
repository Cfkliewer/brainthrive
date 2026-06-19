"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface MarqueeItem {
  label: string;
  href: string;
}

const ITEM_LINK =
  "whitespace-nowrap text-sm font-medium text-medical-gray-600 transition-colors hover:text-brand-purple";

function TrackItems({
  items,
  tabbable,
}: {
  items: MarqueeItem[];
  tabbable: boolean;
}) {
  return (
    <>
      {items.map((item) => (
        <li key={item.href} className="flex items-center gap-8">
          <Link
            href={item.href}
            tabIndex={tabbable ? undefined : -1}
            className={ITEM_LINK}
          >
            {item.label}
          </Link>
          <span
            aria-hidden
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-ultraviolet/40"
          />
        </li>
      ))}
    </>
  );
}

/**
 * Infinite horizontal strip of the ten condition labels: the inner rail
 * holds the list twice (second copy aria-hidden) and loops via an
 * xPercent tween, pausing on hover and on focus-within. Reduced-motion
 * users (and pre-hydration SSR) get a static wrapped list instead.
 */
export default function Marquee({ items }: { items: MarqueeItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setMotionOk(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      if (!motionOk) return;
      const rail = ref.current?.querySelector("[data-marquee-rail]");
      if (!rail) return;
      tweenRef.current = gsap.to(rail, {
        xPercent: -50,
        repeat: -1,
        ease: "none",
        duration: 40,
      });
    },
    { scope: ref, dependencies: [motionOk] }
  );

  const pause = () => tweenRef.current?.pause();
  const play = () => tweenRef.current?.play();

  if (!motionOk) {
    return (
      <div className="border-y border-medical-gray-200 bg-medical-gray-50 py-5">
        <ul className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-8 gap-y-3 px-6">
          <TrackItems items={items} tabbable />
        </ul>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="overflow-hidden border-y border-medical-gray-200 bg-medical-gray-50 py-5"
      onMouseEnter={pause}
      onMouseLeave={play}
      onFocus={pause}
      onBlur={play}
    >
      <div data-marquee-rail className="flex w-max gap-8">
        <ul className="flex gap-8">
          <TrackItems items={items} tabbable />
        </ul>
        <ul aria-hidden className="flex gap-8">
          <TrackItems items={items} tabbable={false} />
        </ul>
      </div>
    </div>
  );
}
