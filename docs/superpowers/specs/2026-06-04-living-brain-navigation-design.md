# BrainThrive — "Living Brain" Navigation: Design Spec

**Date:** 2026-06-04
**Status:** Approved direction, pre-implementation
**Project:** `brain-thrive` (Next.js 15 · React 19 · GSAP · Lenis · Tailwind v4)

---

## 1. Vision

A scroll-driven 3D brain that doubles as site navigation. The user lands on a
translucent brain with neurons flashing/pulsing. As they scroll, a cinematic
camera move carries them toward and *into* the neural web. Along the way, 3–5
glowing regions surface BrainThrive's services and act as **navigation
destinations** — clicking a region flies the camera there and reveals that
section's content. The experience feels premium and cinematic (Apple-page feel,
Awwwards-grade visuals) and runs smoothly on both phones and desktops.

This is a **medical practice site** that must rank on Google and meet WCAG 2.1
AA. The 3D is progressive enhancement layered over a fully functional, crawlable
HTML site — never a gate in front of content.

## 2. Decisions Locked (from brainstorming)

| # | Decision | Choice |
|---|----------|--------|
| Render approach | A/B/C/D | **D — Hybrid:** pre-rendered cinematic scrub for heavy moves + live WebGL for the interactive interior |
| Site relationship | Hero / Hub / Full-immersive | **B — Persistent brain as nav hub** |
| Presence model | B1/B2/B3 | **B3 — Adaptive:** full-screen hub on desktop, lighter docked/pre-rendered on mobile |
| Art direction | Realistic / Network / Shell+core | **Glowing neural-web aesthetic** (Awwwards vibe); **Apple** page feel |
| Region stops | count | **3–5 stops**, mapped to real services (see §6) |
| Brain asset | source | **Reuse the existing brain video/frames** already in the project |
| Visual quality (v1) | ship now / re-render | **Ship v1 with existing 960×534 frames;** higher-res render is a later upgrade |
| "Inside the web" | R3F / new render / fake / none | **Live React Three Fiber neuron web**, handed off from the video |
| Build mode | in-house / handoff | **Built incrementally in this repo** |

## 3. Current State (what already exists)

The core technique is **already built and working** in
`src/components/BrainVideoSection.tsx`:

- 121 JPG frames (`public/videos/frames/frame_001.jpg` … `frame_121.jpg`,
  960×534, ~4.7 MB total) plus source `public/videos/brain.mp4` (7.2 MB).
- Frames drawn to a `<canvas>` and **scrubbed by GSAP ScrollTrigger** across a
  `380vh` sticky section.
- **DPR clamped** to ≤2; **`prefers-reduced-motion`** honored; **separate
  mobile vs desktop** paths (mobile auto-plays a slowed timeline on enter;
  desktop scrubs on scroll).
- A 3-beat narrative already authored: **Chaos → Measure (qEEG) → Calm (PBM)**,
  with brand-colored tint transitions (red → purple → teal) and per-beat copy.
- The brain visual is on-brand: translucent brain, EEG electrodes, glowing
  central electrical activity.

**Gap vs. the vision:** it is a linear, non-interactive page *section*. It does
not (yet) act as a persistent nav hub, has no clickable/navigable regions, no
live interactive neuron layer, and no "fly inside the web" interior. The brain
video is an external orbit view only.

## 4. Target Experience

**Desktop (full power):**
1. Full-screen dark scene; translucent brain, neurons pulsing.
2. Scroll → cinematic fly-in (existing frame-scrub) toward the brain.
3. At the hand-off point, the canvas dissolves into a **live R3F neuron web**;
   the camera is now "inside."
4. 3–5 glowing region nodes are visible/clickable. Clicking one flies the camera
   to it and reveals that section's content panel. A persistent "zoom out"
   returns to the whole brain.
5. The brain remains the primary navigation surface for the session.

**Mobile (adaptive, B3):**
- Heavy fly-in plays as the pre-rendered scrub (battery-safe), R3F runs a
  reduced particle count or is skipped on low-end devices.
- A **docked mini-brain** acts as the nav affordance on inner content.
- `prefers-reduced-motion` → static key frame + instant transitions, full copy
  shown without animation (already implemented for the section).

## 5. Architecture

**The hybrid hand-off (one asset chain, graceful degradation):**

```
[Cinematic fly-in]            [Hand-off]            [Live interior]
frame-scrub on <canvas>  ──▶  crossfade/dissolve ──▶  R3F neuron web
(GSAP ScrollTrigger)          at scroll progress      (instanced particles)
        │                                                    │
        └── also serves as: low-end fallback, reduced-motion fallback,
            and the mobile primary experience
```

- **Frame-scrub layer** — evolve the existing `BrainVideoSection` canvas logic
  into a reusable hook so it can drive both the hero and the docked mini-brain.
- **Live layer** — a new R3F `<Canvas>` (client-only, `dynamic(..., {ssr:false})`)
  mounting an **instanced** glowing-neuron particle system + synapse lines, with
  drei `PerformanceMonitor` / `AdaptiveDpr` driving quality tiers and
  `frameloop="demand"` to conserve battery on the persistent hub.
- **Adaptive controller** — a single hook decides device tier (capability +
  viewport + reduced-motion + battery/low-power) and selects: full live hub /
  scrub-only / docked-mini. All three render the **same region/content model**.
- **Routing** — each region is a **real, route-addressable URL** (App Router
  route or hash) with server-rendered title/meta/content and structured data.
  The 3D layer augments/hijacks those links; it never owns the content.

## 6. Region & Content Model

3–5 stops, color-coded to the existing design system, mapped to real
BrainThrive content (`data/` + `public/data/treatments/`):

| Region | Color | Maps to | Route |
|--------|-------|---------|-------|
| Cognitive / Neurology | 🟣 purple | Memory & Cognitive, ADHD & Autism | `/conditions#cognitive` |
| Photobiomodulation | 🔵 blue | PBM therapy | `/services#pbm` |
| Brain Mapping / Diagnostics | 🟢 teal | qEEG, Brain Gauge cortical metrics | `/services#qeeg` |
| TBI & Concussion | 🟣/🟢 | TBI & concussion recovery | `/conditions#tbi` |
| Book an assessment | ⭐ accent | Conversion CTA | `/contact` |

Regions are defined in a single typed data module (e.g. `src/lib/brain-regions.ts`)
consumed by the 3D layer, the docked mini-brain, AND the semantic HTML fallback
`<nav>` — one source of truth.

## 7. Toolchain

| Layer | Tool | Role | Status |
|-------|------|------|--------|
| Framework | Next.js 15 + React 19 | App Router, SSR for SEO | in repo |
| Smooth scroll | Lenis | `autoRaf:false`, single GSAP RAF | in repo |
| Scroll choreography | GSAP + ScrollTrigger | frame-scrub + camera timelines | in repo |
| Real-time 3D | **React Three Fiber v9** (+ @react-three/drei) | live neuron web (v9 required for React 19) | **add** |
| Glow/FX | **@react-three/postprocessing** (bloom/DoF) | gated behind perf tier | **add** |
| Camera authoring (optional) | Theatre.js | author camera paths; GSAP stays the runtime driver | optional |
| Cinematic source | existing `brain.mp4` / frames | the fly-in (v1) | in repo |
| Future hi-res render | Blender | upgraded fly-in incl. true interior shot | later |
| Model/particle assets | glTF-Transform (Meshopt + KTX2) → gltfjsx | only if a GLB is introduced | as needed |
| AI: look-dev | **Nano Banana** (Gemini image) / Midjourney | concept art + neural textures to lock the look | as needed |
| AI: cinematic polish | Kling / Runway / Luma | *enhance* a Blender render (not replace frame-accurate scrub) | later |
| AI: draft mesh | Meshy / Tripo / Rodin | optional draft brain mesh, cleaned in Blender | later |

**Explicitly not used:** Spline as a production runtime (CPU/perf/control limits
for a persistent mobile medical nav); WebGPU-only approaches (too new for broad
device support); AI-generated meshes or Theatre.js as *load-bearing* dependencies.

## 8. Accessibility / SEO / Performance Guardrails (non-negotiable)

- **Real semantic `<nav>`** with crawlable `<a href>` to every region; 3D
  augments it. Works with JS off / WebGL unavailable.
- **Route-addressable sections** with server-rendered `<title>`, meta, content,
  and `MedicalOrganization` / `Physician` structured data. No clinical content
  trapped in `<canvas>`.
- **`prefers-reduced-motion`** disables fly-through/auto-motion (already done for
  the section; extend to the hub) — satisfies WCAG 2.1 SC 2.3.3.
- **Canvas `aria-hidden`**, full keyboard nav with visible focus, skip links.
- **Performance = SEO:** keep heavy 3D out of the LCP path (lazy-load after first
  paint); DPR `[1,2]`; `frameloop="demand"`; pause render when offscreen/tab
  hidden; instancing for neurons; `PerformanceMonitor`-driven quality tiers;
  fall back to the scrub on low-end devices.

## 9. Build Sequence (phases)

Each phase ships something demonstrable. Built on the existing component, not
from scratch.

1. **Refactor foundation** — extract the canvas frame-scrub from
   `BrainVideoSection` into a reusable hook (`useBrainFrameScrub`) + a typed
   `brain-regions.ts` model + a semantic fallback `<nav>`. No visible change;
   sets up reuse. *(verify: build/lint pass, section still works)*
2. **Live R3F neuron web** — add the client-only R3F `<Canvas>` with an instanced
   glowing-neuron particle system + bloom, performance-tiered. Standalone first.
   *(verify: 60fps desktop, graceful mobile tier)*
3. **Hand-off** — crossfade the frame-scrub into the live R3F web at the scroll
   hand-off point; camera "arrives" inside. *(verify: seamless transition, no jank)*
4. **Navigable regions** — 3–5 glowing region nodes become clickable; clicking
   flies the camera + reveals the route-addressable section; "zoom out" returns.
   *(verify: deep-links work, URLs update, back/forward work)*
5. **B3 adaptive hub + docked mini-brain** — promote to persistent nav; device
   tiering; docked mini-brain on inner pages. *(verify: phone perf/battery, parity)*
6. **Guardrails + polish** — a11y/SEO pass, reduced-motion, focus management,
   structured data, Core Web Vitals tuning. *(verify: Lighthouse, axe, keyboard)*

## 10. Future Upgrades (out of scope for v1)

- **Higher-resolution brain render** — re-render in Blender (or AI-upscale the
  current frames) for crisp full-screen fidelity; optionally a true "fly inside"
  cinematic to complement the R3F interior.
- **Nano Banana concept-art pass** to lock an upgraded aesthetic before re-render.
- AI cinematic stylization (Kling/Runway/Luma) of the upgraded render.

## 11. Risks & Mitigations

- **Full-screen softness of 960×534 frames** → accepted for v1; CSS vignette/
  grain + R3F overlay mask perceived softness; hi-res render queued as upgrade.
- **Persistent 3D battery drain on mobile** → `frameloop="demand"`, offscreen
  pause, docked-mini/scrub fallback on low-power devices.
- **SEO regression from immersive nav** → semantic nav + SSR content + route
  addressability enforced from Phase 1, not retrofitted.
- **R3F v9 / Next 15 SSR pitfalls** → render R3F only in client components via
  `dynamic(..., {ssr:false})`; single GSAP RAF drives Lenis (`autoRaf:false`).
