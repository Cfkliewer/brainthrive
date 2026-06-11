"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BRAIN_FRAME_COUNT, frameForProgress, frameSrc } from "@/lib/brain/frame-scrub";
import { CONTAINER, EYEBROW } from "./styles";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Mid-sequence frame used as the static poster (fly-in mostly resolved). */
const POSTER_FRAME = 79;

const BEATS = [
  {
    title: "Map it",
    body: "A qEEG brain map records your brain's electrical activity with a comfortable sensor cap, showing where patterns are out of balance — data, not guesswork.",
  },
  {
    title: "Train it",
    body: "Photobiomodulation and traditional neurofeedback gently reward healthier patterns, session by session — drug-free, non-invasive, and personalized to your map.",
  },
  {
    title: "Measure it",
    body: "We re-map and re-test at regular intervals, refining your protocol based on what the data shows — progress you can see in numbers, not just feelings.",
  },
] as const;

function BeatList({ active }: { active?: boolean }) {
  return (
    <ol className="space-y-10">
      {BEATS.map((beat, index) => (
        <li key={beat.title} data-beat className={active ? "max-w-md" : ""}>
          <p className={EYEBROW}>
            {String(index + 1).padStart(2, "0")} — Phase
          </p>
          <h3 className="v3-display mt-3 text-[clamp(2.5rem,4.5vw,4.25rem)] leading-[0.92] text-white">
            {beat.title}
          </h3>
          <p className="mt-4 text-[17px] leading-[1.7] text-white/80">
            {beat.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

/**
 * Chapter 3: pinned ~300vh chapter scrubbing the 121-frame brain fly-in on
 * a canvas while three copy beats light up in turn. Frames preload
 * progressively once the chapter approaches. Mobile (<lg), reduced motion,
 * and save-data fall back to a static poster frame with the beats stacked
 * as normal sections — DOM order is always reading order.
 */
export default function BrainScrubStory() {
  const scopeRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const pinSection = pinRef.current;
      const canvas = canvasRef.current;
      if (!pinSection || !canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const images: HTMLImageElement[] = new Array(BRAIN_FRAME_COUNT);
          const state = { frame: 0 };
          let loadingStarted = false;

          const render = () => {
            const idx = Math.max(
              0,
              Math.min(BRAIN_FRAME_COUNT - 1, Math.round(state.frame))
            );
            const img = images[idx];
            if (!img || !img.complete || img.naturalWidth === 0) return;
            // Cover-fit draw.
            const cW = canvas.width;
            const cH = canvas.height;
            const scale = Math.max(cW / img.naturalWidth, cH / img.naturalHeight);
            const dW = img.naturalWidth * scale;
            const dH = img.naturalHeight * scale;
            ctx.clearRect(0, 0, cW, cH);
            ctx.drawImage(img, (cW - dW) / 2, (cH - dH) / 2, dW, dH);
          };

          const loadFrame = (i: number) => {
            if (images[i]) return;
            const img = new Image();
            img.src = frameSrc(i);
            img.decoding = "async";
            img.onload = () => {
              if (i === Math.round(state.frame) || i === 0) render();
            };
            images[i] = img;
          };

          // Progressive preload: coarse pass first (every 8th frame) so
          // scrubbing is responsive immediately, then fill the gaps.
          const startLoading = () => {
            if (loadingStarted) return;
            loadingStarted = true;
            loadFrame(0);
            for (let i = 0; i < BRAIN_FRAME_COUNT; i += 8) loadFrame(i);
            for (let i = 0; i < BRAIN_FRAME_COUNT; i++) loadFrame(i);
          };

          const sizeCanvas = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = canvas.getBoundingClientRect();
            canvas.width = Math.max(1, Math.floor(rect.width * dpr));
            canvas.height = Math.max(1, Math.floor(rect.height * dpr));
            render();
          };
          sizeCanvas();
          window.addEventListener("resize", sizeCanvas);

          // Save-data: no scrub, just the poster frame and fully visible copy.
          const connection = (
            navigator as Navigator & { connection?: { saveData?: boolean } }
          ).connection;
          if (connection?.saveData) {
            state.frame = POSTER_FRAME;
            loadFrame(POSTER_FRAME);
            return () => window.removeEventListener("resize", sizeCanvas);
          }

          // Kick off preloading as the chapter approaches.
          ScrollTrigger.create({
            trigger: pinSection,
            start: "top 150%",
            once: true,
            onEnter: startLoading,
          });

          const beats = gsap.utils.toArray<HTMLElement>(
            pinSection.querySelectorAll("[data-beat]")
          );

          const setActiveBeat = (progress: number) => {
            const active = Math.min(
              BEATS.length - 1,
              Math.floor(progress * BEATS.length)
            );
            beats.forEach((beat, i) => {
              gsap.to(beat, {
                opacity: i === active ? 1 : 0.28,
                x: i === active ? 0 : -8,
                duration: 0.5,
                ease: "power2.out",
                overwrite: "auto",
              });
            });
          };
          setActiveBeat(0);

          const trigger = ScrollTrigger.create({
            trigger: pinSection,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            onUpdate: (self) => {
              state.frame = frameForProgress(self.progress, BRAIN_FRAME_COUNT);
              render();
              if (railRef.current) {
                gsap.set(railRef.current, { scaleY: self.progress });
              }
              setActiveBeat(self.progress);
            },
          });

          return () => {
            window.removeEventListener("resize", sizeCanvas);
            trigger.kill();
          };
        }
      );
    },
    { scope: scopeRef }
  );

  return (
    <section
      ref={scopeRef}
      aria-label="How brain training works, in three phases"
      className="relative bg-medical-secondary"
    >
      {/* Static fallback: mobile, reduced motion (any width), save-data. */}
      <div className="block lg:motion-safe:hidden">
        <div className={`${CONTAINER} py-24`}>
          <p className={EYEBROW}>The Method</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={frameSrc(POSTER_FRAME)}
            alt="Three-dimensional rendering of a glowing brain used in our qEEG mapping visual"
            className="mt-8 w-full rounded-2xl border border-white/10 object-cover"
            loading="lazy"
          />
          <div className="mt-12">
            <BeatList />
          </div>
        </div>
      </div>

      {/* Pinned scrub: desktop with motion allowed. */}
      <div ref={pinRef} className="relative hidden h-[300vh] lg:motion-safe:block">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Poster <img> sits under the canvas so something meaningful
              shows before JS draws (and while frames stream in). */}
          <div aria-hidden="true" className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={frameSrc(0)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-medical-secondary/95 via-medical-secondary/50 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-medical-secondary to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-medical-secondary to-transparent" />
          </div>

          <div className={`${CONTAINER} relative flex h-full items-center`}>
            {/* Teal progress rail tied to the scrub. */}
            <div
              aria-hidden="true"
              className="absolute bottom-[12vh] left-2 top-[12vh] w-px bg-white/10 md:left-4"
            >
              <div
                ref={railRef}
                className="h-full w-full origin-top scale-y-0 bg-brand-teal shadow-[0_0_12px_rgba(53,243,230,0.8)]"
              />
            </div>

            <div className="max-w-xl pl-8 md:pl-12">
              <p className={EYEBROW}>The Method</p>
              <div className="mt-8">
                <BeatList active />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
