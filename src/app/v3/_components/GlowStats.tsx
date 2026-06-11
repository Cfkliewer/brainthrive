"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CONTAINER, EYEBROW, GRADIENT_TEXT } from "./styles";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Honest, copy-sourced numbers only — no invented patient counts. */
const STATS = [
  { value: 10, label: "Conditions we support" },
  { value: 2, label: "Drug-free core therapies" },
  { value: 121, label: "Frames in our brain map visual" },
  { value: 15, suffix: " min", label: "For a Brain Gauge assessment" },
] as const;

/**
 * Chapter 5: monumental Bebas stats with a once-on-enter counter tween.
 * Final values are rendered in the markup, so the numbers are correct
 * without JS and under reduced motion.
 */
export default function GlowStats() {
  const scopeRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = scopeRef.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counters = gsap.utils.toArray<HTMLElement>(
          el.querySelectorAll("[data-counter]")
        );
        counters.forEach((counter) => {
          const target = Number(counter.dataset.counter);
          const proxy = { value: 0 };
          gsap.to(proxy, {
            value: target,
            duration: 1.6,
            ease: "power3.out",
            onUpdate: () => {
              counter.textContent = String(Math.round(proxy.value));
            },
            scrollTrigger: {
              trigger: counter,
              start: "top 85%",
              once: true,
            },
          });
        });
        gsap.from(el.querySelectorAll("[data-stat]"), {
          autoAlpha: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
      });
    },
    { scope: scopeRef }
  );

  return (
    <section
      ref={scopeRef}
      aria-label="Brain Thrive Wellness by the numbers"
      className="relative border-y border-white/10 bg-brand-navy/40"
    >
      <div className={`${CONTAINER} py-20 md:py-28`}>
        <p className={EYEBROW}>Grounded in data</p>
        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} data-stat className="flex flex-col">
              <dt className="order-2 mt-3 text-sm uppercase tracking-[0.18em] text-white/65">
                {stat.label}
              </dt>
              <dd
                className={`order-1 v3-display text-[clamp(3.5rem,7vw,6.5rem)] leading-none ${GRADIENT_TEXT} [filter:drop-shadow(0_0_24px_rgba(53,243,230,0.35))]`}
              >
                <span data-counter={stat.value}>{stat.value}</span>
                {"suffix" in stat ? stat.suffix : ""}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
