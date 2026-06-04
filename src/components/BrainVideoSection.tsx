"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAIN_FRAME_COUNT, frameSrc } from "@/lib/brain/frame-scrub";

const FRAME_COUNT = BRAIN_FRAME_COUNT;

const TINT_START = "rgb(230, 50, 70)";
const TINT_MID = "rgb(150, 60, 200)";
const TINT_END = "rgb(90, 170, 255)";
const TINT_OPACITY_START = 0.75;
const TINT_OPACITY_END = 0.25;

export default function BrainVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tintRef = useRef<HTMLDivElement>(null);
  const chaosRef = useRef<HTMLSpanElement>(null);
  const calmRef = useRef<HTMLSpanElement>(null);
  const bulletRefs = useRef<Array<HTMLLIElement | null>>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const canvas = canvasRef.current;
      if (!section || !canvas) return;

      if (typeof window !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
      }

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      const bullets = bulletRefs.current.filter(Boolean) as HTMLLIElement[];

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const images: HTMLImageElement[] = new Array(FRAME_COUNT);
      const state = { frame: 0 };

      const sizeCanvas = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        canvas.width = Math.max(1, Math.floor(rect.width * dpr));
        canvas.height = Math.max(1, Math.floor(rect.height * dpr));
        render();
      };

      const render = () => {
        const idx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(state.frame)));
        const img = images[idx];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const cW = canvas.width;
        const cH = canvas.height;
        const iW = img.naturalWidth;
        const iH = img.naturalHeight;
        const scale = Math.max(cW / iW, cH / iH);
        const dW = iW * scale;
        const dH = iH * scale;
        const dX = (cW - dW) / 2;
        const dY = (cH - dH) / 2;

        ctx.clearRect(0, 0, cW, cH);
        ctx.drawImage(img, dX, dY, dW, dH);
      };

      let firstLoaded = false;
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.src = frameSrc(i);
        img.decoding = "async";
        img.onload = () => {
          if (!firstLoaded) {
            firstLoaded = true;
            render();
          } else if (i === Math.round(state.frame)) {
            render();
          }
        };
        images[i] = img;
      }

      sizeCanvas();
      window.addEventListener("resize", sizeCanvas);

      gsap.set(chaosRef.current, { autoAlpha: 0, y: 80 });
      gsap.set(calmRef.current, { autoAlpha: 0, y: 240 });
      bullets.forEach((b) => gsap.set(b, { autoAlpha: 0, y: 30 }));
      if (tintRef.current) {
        gsap.set(tintRef.current, { backgroundColor: TINT_START, opacity: TINT_OPACITY_START });
      }

      if (reducedMotion) {
        gsap.set(chaosRef.current, { autoAlpha: 1, y: 0 });
        gsap.set(calmRef.current, { autoAlpha: 1, y: 0, position: "relative", inset: "auto" });
        bullets.forEach((b) => gsap.set(b, { autoAlpha: 1, y: 0, position: "relative", inset: "auto" }));
        if (tintRef.current) {
          gsap.set(tintRef.current, { backgroundColor: TINT_END, opacity: TINT_OPACITY_END });
        }
        return () => window.removeEventListener("resize", sizeCanvas);
      }

      const buildSequence = (tl: gsap.core.Timeline) => {
        tl.to(state, { frame: FRAME_COUNT - 1, ease: "none", duration: 1, onUpdate: render }, 0);

        if (tintRef.current) {
          tl.to(tintRef.current, { backgroundColor: TINT_MID, ease: "none", duration: 0.5 }, 0);
          tl.to(tintRef.current, { backgroundColor: TINT_END, ease: "none", duration: 0.5 }, 0.5);
          tl.to(
            tintRef.current,
            { opacity: TINT_OPACITY_END, ease: "power1.in", duration: 0.5 },
            0.5
          );
        }

        tl.to(chaosRef.current, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.08 }, 0);
        tl.to(
          chaosRef.current,
          { autoAlpha: 0, y: -320, ease: "none", duration: 0.4 },
          0.4
        );
        tl.to(
          calmRef.current,
          { autoAlpha: 1, y: 0, ease: "none", duration: 0.4 },
          0.5
        );

        if (bullets[0]) {
          tl.to(bullets[0], { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.08 }, 0.02);
          tl.to(bullets[0], { autoAlpha: 0, y: -30, ease: "power2.in", duration: 0.08 }, 0.3);
        }
        if (bullets[1]) {
          tl.to(bullets[1], { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.08 }, 0.36);
          tl.to(bullets[1], { autoAlpha: 0, y: -30, ease: "power2.in", duration: 0.08 }, 0.6);
        }
        if (bullets[2]) {
          tl.to(bullets[2], { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.08 }, 0.66);
        }
      };

      if (isMobile) {
        const tl = gsap.timeline({ paused: true });
        buildSequence(tl);
        tl.timeScale(0.2);

        ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => tl.play(),
          onEnterBack: () => tl.play(),
          onLeave: () => tl.pause(),
          onLeaveBack: () => tl.pause(),
        });

        return () => window.removeEventListener("resize", sizeCanvas);
      }

      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });
      buildSequence(scrubTl);

      return () => window.removeEventListener("resize", sizeCanvas);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="brain-visualization"
      aria-label="Three-dimensional brain visualization overview"
      className="relative h-[380vh] bg-[#001a3d]"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#35F3E6]/20 to-transparent" />

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full"
        />

        <div
          ref={tintRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none mix-blend-color opacity-70"
          style={{ backgroundColor: TINT_START }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#002554]/70 via-[#001a3d]/20 to-[#001a3d]/95" />
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(53, 243, 230, 0.4) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          }}
        />

        <div className="absolute top-16 md:top-24 left-6 md:left-12 lg:left-20 z-20 w-[calc(100%-3rem)] md:w-auto md:max-w-[55vw] lg:max-w-[880px] text-left pointer-events-none">
          <span className="text-[#35F3E6] font-semibold tracking-[0.3em] text-[11px] uppercase mb-4 block [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
            QEEG-Guided Regulation
          </span>
          <h2 className="relative brand-font text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] h-[1.2em] [text-shadow:0_4px_18px_rgba(0,0,0,0.55),0_1px_4px_rgba(0,0,0,0.5)]">
            <span
              ref={chaosRef}
              className="absolute inset-0 block will-change-transform"
            >
              From <span className="text-[#FF7A7A]">chaos.</span>
            </span>
            <span
              ref={calmRef}
              className="absolute inset-0 block will-change-transform"
            >
              To <span className="text-[#35F3E6]">calm.</span>
            </span>
          </h2>
        </div>

        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 flex items-center justify-end">
          <ul className="relative min-h-[340px] w-full md:max-w-[44vw] lg:max-w-[640px] text-white text-xl md:text-2xl lg:text-[1.6rem] font-light leading-relaxed [text-shadow:0_3px_18px_rgba(0,0,0,0.75),0_1px_4px_rgba(0,0,0,0.6)]">
            <li
              ref={(el) => {
                bulletRefs.current[0] = el;
              }}
              className="absolute inset-0 flex gap-4 items-start"
            >
              <span className="shrink-0 mt-2 w-2 h-2 rounded-full bg-[#FF7A7A] shadow-[0_0_12px_rgba(255,122,122,0.9)]" />
              <span>
                <span className="block text-[10px] uppercase tracking-[0.3em] text-[#FF7A7A] mb-3 font-semibold">
                  01 — Chaos
                </span>
                <strong className="text-white font-medium">Dysregulation looks like chaos.</strong> Anxiety, ADHD, brain fog, trauma — they show up as disorganized electrical patterns firing across the brain.
              </span>
            </li>
            <li
              ref={(el) => {
                bulletRefs.current[1] = el;
              }}
              className="absolute inset-0 flex gap-4 items-start"
            >
              <span className="shrink-0 mt-2 w-2 h-2 rounded-full bg-[#A78BFA] shadow-[0_0_12px_rgba(167,139,250,0.9)]" />
              <span>
                <span className="block text-[10px] uppercase tracking-[0.3em] text-[#A78BFA] mb-3 font-semibold">
                  02 — Measure
                </span>
                <strong className="text-white font-medium">QEEG Brain Mapping</strong> measures the noise — pinpointing exactly where and how your brain is out of balance, frequency by frequency.
              </span>
            </li>
            <li
              ref={(el) => {
                bulletRefs.current[2] = el;
              }}
              className="absolute inset-0 flex gap-4 items-start"
            >
              <span className="shrink-0 mt-2 w-2 h-2 rounded-full bg-[#35F3E6] shadow-[0_0_12px_rgba(53,243,230,0.9)]" />
              <span>
                <span className="block text-[10px] uppercase tracking-[0.3em] text-[#35F3E6] mb-3 font-semibold">
                  03 — Calm
                </span>
                <strong className="text-white font-medium">QEEG-guided photobiomodulation</strong> trains your brain back to calm, regulated rhythms — measurable on every follow-up scan.
              </span>
            </li>
          </ul>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#35F3E6]/60 text-[10px] uppercase tracking-[0.3em] pointer-events-none">
          <span>Scroll to explore</span>
          <span className="w-px h-8 bg-gradient-to-b from-[#35F3E6]/60 to-transparent" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#35F3E6]/20 to-transparent" />
    </section>
  );
}
