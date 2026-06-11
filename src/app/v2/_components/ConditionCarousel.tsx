"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CONDITIONS } from "@/lib/content/conditions";
import ConditionCard from "./ConditionCard";
import SectionHeader from "./SectionHeader";
import { CONTAINER, SCROLL_OFFSET } from "./styles";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * "Who We Help": on desktop without reduced motion the section pins and
 * the ten condition cards translate horizontally with the scroll (scrub),
 * with a teal-on-navy progress bar tied to progress. Everywhere else the
 * same DOM degrades to a native overflow-x scroll-snap row (the default
 * markup state). DOM order is reading order; cards stay tabbable — in
 * pinned mode focus moves the page to the card's scrub position.
 */
export default function ConditionCarousel() {
  const ref = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const setProgress = (progress: number) => {
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${progress})`;
    }
  };

  useGSAP(
    () => {
      const section = ref.current;
      if (!section) return;
      const wrapper = section.querySelector<HTMLElement>(
        "[data-track-wrapper]"
      );
      const track = section.querySelector<HTMLElement>("[data-track]");
      if (!wrapper || !track) return;

      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const distance = () =>
            Math.max(0, track.scrollWidth - wrapper.clientWidth);

          // Disable the native scroll fallback while pinned.
          gsap.set(wrapper, { overflowX: "visible" });

          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              start: "top top",
              end: () => "+=" + distance(),
              invalidateOnRefresh: true,
              onUpdate: (self) => setProgress(self.progress),
            },
          });

          // Keyboard support: when a pinned card receives focus, jump the
          // page scroll to the position that brings that card into view.
          const onFocusIn = (event: FocusEvent) => {
            const card = (event.target as HTMLElement).closest("li");
            const st = tween.scrollTrigger;
            if (!card || !st) return;
            wrapper.scrollLeft = 0; // undo the browser's auto scroll
            const max = distance();
            const offset = max > 0 ? card.offsetLeft / max : 0;
            window.scrollTo({
              top: gsap.utils.clamp(
                st.start,
                st.end,
                st.start + offset * (st.end - st.start)
              ),
            });
          };
          track.addEventListener("focusin", onFocusIn);
          return () => {
            track.removeEventListener("focusin", onFocusIn);
            setProgress(1);
          };
        }
      );

      // Native scroll fallback keeps the progress bar honest on mobile.
      const onScroll = () => {
        const max = wrapper.scrollWidth - wrapper.clientWidth;
        setProgress(max > 0 ? wrapper.scrollLeft / max : 1);
      };
      wrapper.addEventListener("scroll", onScroll, { passive: true });
      return () => wrapper.removeEventListener("scroll", onScroll);
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="who-we-help"
      className={`${SCROLL_OFFSET} overflow-hidden bg-medical-gray-50 lg:flex lg:min-h-screen lg:flex-col lg:justify-center`}
    >
      <div className={`${CONTAINER} w-full pb-10 pt-20 lg:pt-12`}>
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <SectionHeader
            index="02"
            eyebrow="Who We Help"
            heading={
              <>
                Ten reasons people
                <br className="hidden md:block" /> walk through our door.
              </>
            }
            tone="light"
          />
          {/* Teal scrub indicator on a navy track (teal stays on navy only) */}
          <div className="w-full max-w-xs">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-medical-gray-500">
              <span>Scroll to explore</span>
              <span aria-hidden className="tabular-nums">
                {String(CONDITIONS.length).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-brand-navy">
              <div
                ref={barRef}
                aria-hidden
                style={{ transform: "scaleX(0)" }}
                className="h-full w-full origin-left rounded-full bg-brand-teal"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        data-track-wrapper
        className="v2-no-scrollbar snap-x snap-mandatory overflow-x-auto pb-20 lg:pb-12"
      >
        <ul
          data-track
          className="flex w-max gap-6 px-6 md:px-10 lg:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]"
        >
          {CONDITIONS.map((condition, index) => (
            <li
              key={condition.slug}
              className="w-[19rem] shrink-0 snap-start md:w-[21rem]"
            >
              <ConditionCard condition={condition} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
