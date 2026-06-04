# Living Brain Navigation — Phase 1–2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lay the testable foundation for the navigable "living brain" and stand up a standalone real-time React Three Fiber neuron web, without disturbing the working `BrainVideoSection` scrub.

**Architecture:** Extract the existing canvas frame-scrub into a reusable, unit-tested hook; introduce one typed source-of-truth for brain regions that feeds both 3D and a semantic fallback `<nav>`; then build a performance-tiered R3F neuron web on an isolated `/brain-lab` route so it can be developed and verified in isolation before being wired into the hub (Phase 3+).

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, GSAP + ScrollTrigger, Lenis, Tailwind v4, React Three Fiber v9 + @react-three/drei + @react-three/postprocessing, Vitest + React Testing Library (new).

**Scope note:** This plan covers spec Phases 1–2 only (`docs/superpowers/specs/2026-06-04-living-brain-navigation-design.md`). Phases 3–6 (hand-off, navigable regions, B3 adaptive hub, guardrails) are planned in a follow-up once the hook and particle APIs below are real, to avoid speculative code.

---

## File Structure

**Create:**
- `vitest.config.ts` — test runner config (jsdom, `@/` alias)
- `vitest.setup.ts` — jest-dom matchers + matchMedia mock
- `src/lib/brain/regions.ts` — typed region model (single source of truth)
- `src/lib/brain/regions.test.ts`
- `src/lib/brain/frame-scrub.ts` — pure frame-index math + frame src helper
- `src/lib/brain/frame-scrub.test.ts`
- `src/lib/brain/neuron-graph.ts` — deterministic neuron node/edge generator
- `src/lib/brain/neuron-graph.test.ts`
- `src/lib/brain/device-tier.ts` — pure quality-tier resolver
- `src/lib/brain/device-tier.test.ts`
- `src/hooks/useBrainFrameScrub.ts` — reusable canvas scrub hook
- `src/hooks/useDeviceTier.ts` — React wrapper around `device-tier.ts`
- `src/components/BrainNav.tsx` — semantic fallback nav
- `src/components/BrainNav.test.tsx`
- `src/components/brain3d/NeuronWeb.tsx` — R3F scene contents
- `src/components/brain3d/NeuronWebCanvas.tsx` — client-only `<Canvas>` wrapper
- `src/app/brain-lab/page.tsx` — isolated dev/verify route

**Modify:**
- `package.json` — add test scripts + dev deps
- `src/components/BrainVideoSection.tsx` — consume `frame-scrub.ts` helpers (behavior-preserving)

---

## Phase 1 — Foundation

### Task 1: Set up Vitest + React Testing Library

**Files:**
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Modify: `package.json`

- [ ] **Step 1: Install dev dependencies**

Run:
```bash
npm install -D vitest@^3 @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event vite-tsconfig-paths
```
Expected: installs without peer-dependency errors (React 19 is supported by @testing-library/react ^16).

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
```

- [ ] **Step 3: Create `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom has no matchMedia; components read it for reduced-motion / mobile.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});
```

- [ ] **Step 4: Add test scripts to `package.json`**

Add to the `"scripts"` object:
```json
    "test": "vitest run",
    "test:watch": "vitest"
```

- [ ] **Step 5: Verify the runner boots (no tests yet)**

Run: `npm test`
Expected: Vitest runs and reports "No test files found" (exit 0) — confirms config loads.

- [ ] **Step 6: Commit**

```bash
git add vitest.config.ts vitest.setup.ts package.json package-lock.json
git commit -m "test: add Vitest + React Testing Library setup"
```

---

### Task 2: Typed brain-region model

**Files:**
- Create: `src/lib/brain/regions.ts`, `src/lib/brain/regions.test.ts`

- [ ] **Step 1: Write the failing test**

`src/lib/brain/regions.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { BRAIN_REGIONS, getRegion } from "./regions";

describe("brain regions", () => {
  it("defines 3-5 stops", () => {
    expect(BRAIN_REGIONS.length).toBeGreaterThanOrEqual(3);
    expect(BRAIN_REGIONS.length).toBeLessThanOrEqual(5);
  });

  it("every region has a unique id and a routable href", () => {
    const ids = new Set(BRAIN_REGIONS.map((r) => r.id));
    expect(ids.size).toBe(BRAIN_REGIONS.length);
    for (const r of BRAIN_REGIONS) {
      expect(r.href).toMatch(/^\//);
      expect(r.label.length).toBeGreaterThan(0);
      expect(r.position).toHaveLength(3);
    }
  });

  it("getRegion returns by id and undefined for unknown", () => {
    expect(getRegion(BRAIN_REGIONS[0].id)?.id).toBe(BRAIN_REGIONS[0].id);
    expect(getRegion("nope")).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/brain/regions.test.ts`
Expected: FAIL — cannot find module `./regions`.

- [ ] **Step 3: Write the implementation**

`src/lib/brain/regions.ts`:
```ts
/** Single source of truth for brain navigation stops.
 *  Consumed by the 3D layer (positions/colors) AND the semantic <nav> (label/href). */
export type RegionId =
  | "cognitive"
  | "photobiomodulation"
  | "brain-mapping"
  | "tbi"
  | "assessment";

export interface BrainRegion {
  id: RegionId;
  label: string;
  /** Short description surfaced in the region panel. */
  summary: string;
  /** Route-addressable destination (must be server-rendered + crawlable). */
  href: string;
  /** Design-system hex used for the node glow + tint. */
  color: string;
  /** Normalized 3D anchor inside the brain volume, roughly [-1,1] per axis. */
  position: [number, number, number];
}

export const BRAIN_REGIONS: BrainRegion[] = [
  {
    id: "cognitive",
    label: "Cognitive & Neurology",
    summary: "Memory, cognition, ADHD & autism support.",
    href: "/conditions#cognitive",
    color: "#9333EA",
    position: [-0.55, 0.35, 0.2],
  },
  {
    id: "photobiomodulation",
    label: "Photobiomodulation",
    summary: "Light-based therapy that trains calmer brain rhythms.",
    href: "/services#pbm",
    color: "#2563EB",
    position: [0.5, 0.4, -0.1],
  },
  {
    id: "brain-mapping",
    label: "Brain Mapping & Diagnostics",
    summary: "qEEG and Brain Gauge cortical metrics.",
    href: "/services#qeeg",
    color: "#0D9488",
    position: [0.1, -0.1, 0.6],
  },
  {
    id: "tbi",
    label: "TBI & Concussion",
    summary: "Recovery support after brain injury.",
    href: "/conditions#tbi",
    color: "#5EEAD4",
    position: [-0.2, -0.45, -0.3],
  },
  {
    id: "assessment",
    label: "Book an Assessment",
    summary: "Start with a qEEG-guided evaluation.",
    href: "/contact",
    color: "#35F3E6",
    position: [0.0, 0.6, 0.35],
  },
];

export function getRegion(id: string): BrainRegion | undefined {
  return BRAIN_REGIONS.find((r) => r.id === id);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/brain/regions.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/brain/regions.ts src/lib/brain/regions.test.ts
git commit -m "feat: add typed brain-region model"
```

---

### Task 3: Extract frame-scrub math into a tested module + reuse it

**Files:**
- Create: `src/lib/brain/frame-scrub.ts`, `src/lib/brain/frame-scrub.test.ts`
- Modify: `src/components/BrainVideoSection.tsx` (lines 8-10 region — the `FRAME_COUNT`/`frameSrc` constants)

- [ ] **Step 1: Write the failing test**

`src/lib/brain/frame-scrub.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { frameSrc, frameForProgress, BRAIN_FRAME_COUNT } from "./frame-scrub";

describe("frame-scrub helpers", () => {
  it("formats frame paths with zero-padding (1-based)", () => {
    expect(frameSrc(0)).toBe("/videos/frames/frame_001.jpg");
    expect(frameSrc(120)).toBe("/videos/frames/frame_121.jpg");
  });

  it("maps scroll progress 0..1 to a clamped frame index", () => {
    expect(frameForProgress(0, BRAIN_FRAME_COUNT)).toBe(0);
    expect(frameForProgress(1, BRAIN_FRAME_COUNT)).toBe(BRAIN_FRAME_COUNT - 1);
    expect(frameForProgress(0.5, BRAIN_FRAME_COUNT)).toBe(
      Math.round(0.5 * (BRAIN_FRAME_COUNT - 1))
    );
  });

  it("clamps out-of-range progress", () => {
    expect(frameForProgress(-0.3, BRAIN_FRAME_COUNT)).toBe(0);
    expect(frameForProgress(1.7, BRAIN_FRAME_COUNT)).toBe(BRAIN_FRAME_COUNT - 1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/brain/frame-scrub.test.ts`
Expected: FAIL — cannot find module `./frame-scrub`.

- [ ] **Step 3: Write the implementation**

`src/lib/brain/frame-scrub.ts`:
```ts
/** The cinematic brain fly-in is a pre-rendered JPG sequence in /public/videos/frames. */
export const BRAIN_FRAME_COUNT = 121;

/** 1-based, zero-padded frame path for a 0-based index. */
export function frameSrc(index: number): string {
  return `/videos/frames/frame_${String(index + 1).padStart(3, "0")}.jpg`;
}

/** Map a scroll progress (0..1, may overshoot) to a clamped 0-based frame index. */
export function frameForProgress(progress: number, frameCount: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  return Math.round(clamped * (frameCount - 1));
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/brain/frame-scrub.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Refactor `BrainVideoSection.tsx` to use the shared helpers (behavior-preserving)**

In `src/components/BrainVideoSection.tsx`, replace the local constants (lines 8-10):
```tsx
const FRAME_COUNT = 121;
const frameSrc = (i: number) =>
  `/videos/frames/frame_${String(i + 1).padStart(3, "0")}.jpg`;
```
with an import (add near the other imports at the top of the file) and a local alias so the rest of the file is untouched:
```tsx
import { BRAIN_FRAME_COUNT, frameSrc } from "@/lib/brain/frame-scrub";

const FRAME_COUNT = BRAIN_FRAME_COUNT;
```
Leave every other line in the component exactly as-is.

- [ ] **Step 6: Verify the section still builds and renders**

Run: `npm run build`
Expected: build succeeds.
Then run `npm run dev`, open `http://localhost:3000`, scroll to the brain section, and confirm the frame-scrub + "From chaos → To calm" copy still animate as before.

- [ ] **Step 7: Commit**

```bash
git add src/lib/brain/frame-scrub.ts src/lib/brain/frame-scrub.test.ts src/components/BrainVideoSection.tsx
git commit -m "refactor: extract brain frame-scrub helpers and reuse in BrainVideoSection"
```

---

### Task 4: Semantic fallback `<nav>`

**Files:**
- Create: `src/components/BrainNav.tsx`, `src/components/BrainNav.test.tsx`

This nav is the crawlable, keyboard-accessible navigation that exists independent of WebGL (spec §8). The 3D layer will later augment it; it must work on its own.

- [ ] **Step 1: Write the failing test**

`src/components/BrainNav.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BrainNav from "./BrainNav";
import { BRAIN_REGIONS } from "@/lib/brain/regions";

describe("BrainNav", () => {
  it("renders a labelled navigation landmark", () => {
    render(<BrainNav />);
    expect(
      screen.getByRole("navigation", { name: /brain navigation/i })
    ).toBeInTheDocument();
  });

  it("renders one crawlable link per region with the correct href", () => {
    render(<BrainNav />);
    for (const region of BRAIN_REGIONS) {
      const link = screen.getByRole("link", { name: region.label });
      expect(link).toHaveAttribute("href", region.href);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/BrainNav.test.tsx`
Expected: FAIL — cannot find module `./BrainNav`.

- [ ] **Step 3: Write the implementation**

`src/components/BrainNav.tsx`:
```tsx
import Link from "next/link";
import { BRAIN_REGIONS } from "@/lib/brain/regions";

/** Server-rendered, crawlable, keyboard-accessible navigation.
 *  Works with JS off / WebGL unavailable. The 3D hub augments this; it never replaces it. */
export default function BrainNav({ className = "" }: { className?: string }) {
  return (
    <nav aria-label="Brain navigation" className={className}>
      <ul className="flex flex-wrap gap-4">
        {BRAIN_REGIONS.map((region) => (
          <li key={region.id}>
            <Link
              href={region.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/90 transition hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35F3E6]"
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: region.color }}
              />
              {region.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/BrainNav.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/BrainNav.tsx src/components/BrainNav.test.tsx
git commit -m "feat: add semantic crawlable BrainNav fallback"
```

---

## Phase 2 — Live R3F Neuron Web (standalone)

### Task 5: Install React Three Fiber stack

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install dependencies**

Run:
```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install -D @types/three
```
Expected: installs `@react-three/fiber@^9` (the React 19 line) and a compatible `three`. If npm reports a peer conflict against React 19, re-run the first command with `--legacy-peer-deps` and note it in the commit body.

- [ ] **Step 2: Verify build is unaffected**

Run: `npm run build`
Expected: build succeeds (no usage yet).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build: add react-three-fiber, drei, postprocessing"
```

---

### Task 6: Deterministic neuron-graph generator

**Files:**
- Create: `src/lib/brain/neuron-graph.ts`, `src/lib/brain/neuron-graph.test.ts`

Deterministic (seeded) so the layout is testable and stable across renders.

- [ ] **Step 1: Write the failing test**

`src/lib/brain/neuron-graph.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { generateNeuronGraph } from "./neuron-graph";

describe("generateNeuronGraph", () => {
  it("produces the requested node count", () => {
    const g = generateNeuronGraph({ count: 200, seed: 1 });
    expect(g.nodes).toHaveLength(200);
  });

  it("is deterministic for a given seed", () => {
    const a = generateNeuronGraph({ count: 50, seed: 7 });
    const b = generateNeuronGraph({ count: 50, seed: 7 });
    expect(a.nodes[10]).toEqual(b.nodes[10]);
    expect(a.edges).toEqual(b.edges);
  });

  it("keeps nodes within the unit-ish brain volume and links existing nodes", () => {
    const g = generateNeuronGraph({ count: 80, seed: 3 });
    for (const [x, y, z] of g.nodes) {
      expect(Math.hypot(x, y, z)).toBeLessThanOrEqual(1.5);
    }
    for (const [a, b] of g.edges) {
      expect(a).toBeGreaterThanOrEqual(0);
      expect(b).toBeLessThan(g.nodes.length);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/brain/neuron-graph.test.ts`
Expected: FAIL — cannot find module `./neuron-graph`.

- [ ] **Step 3: Write the implementation**

`src/lib/brain/neuron-graph.ts`:
```ts
export type Vec3 = [number, number, number];

export interface NeuronGraph {
  nodes: Vec3[];
  /** Index pairs into `nodes`. */
  edges: [number, number][];
}

export interface NeuronGraphOptions {
  count: number;
  seed: number;
  /** Max neighbor links per node. */
  linksPerNode?: number;
}

/** mulberry32 — tiny deterministic PRNG so layouts are stable & testable. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Scatter points in a brain-ish ellipsoid and connect nearest neighbors. */
export function generateNeuronGraph(opts: NeuronGraphOptions): NeuronGraph {
  const { count, seed, linksPerNode = 2 } = opts;
  const rand = mulberry32(seed);
  const nodes: Vec3[] = [];

  // Ellipsoid radii roughly matching a brain silhouette (wider than tall/deep).
  const RX = 1.0;
  const RY = 0.7;
  const RZ = 0.85;

  for (let i = 0; i < count; i++) {
    // Rejection-sample inside the unit sphere, then scale to the ellipsoid.
    let x = 0,
      y = 0,
      z = 0;
    do {
      x = rand() * 2 - 1;
      y = rand() * 2 - 1;
      z = rand() * 2 - 1;
    } while (x * x + y * y + z * z > 1);
    nodes.push([x * RX, y * RY, z * RZ]);
  }

  const edges: [number, number][] = [];
  const seen = new Set<string>();
  for (let i = 0; i < nodes.length; i++) {
    const dist = nodes
      .map((n, j) => ({ j, d: distance2(nodes[i], n) }))
      .filter((e) => e.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, linksPerNode);
    for (const { j } of dist) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([i, j]);
    }
  }

  return { nodes, edges };
}

function distance2(a: Vec3, b: Vec3): number {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  return dx * dx + dy * dy + dz * dz;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/brain/neuron-graph.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/brain/neuron-graph.ts src/lib/brain/neuron-graph.test.ts
git commit -m "feat: add deterministic neuron-graph generator"
```

---

### Task 7: Quality-tier resolver + hook

**Files:**
- Create: `src/lib/brain/device-tier.ts`, `src/lib/brain/device-tier.test.ts`, `src/hooks/useDeviceTier.ts`

- [ ] **Step 1: Write the failing test**

`src/lib/brain/device-tier.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { resolveTier, TIER_SETTINGS } from "./device-tier";

describe("resolveTier", () => {
  it("returns 'off' when reduced motion is requested", () => {
    expect(
      resolveTier({ cores: 16, deviceMemory: 16, isMobile: false, reducedMotion: true, saveData: false })
    ).toBe("off");
  });

  it("returns 'low' for weak mobile devices", () => {
    expect(
      resolveTier({ cores: 4, deviceMemory: 2, isMobile: true, reducedMotion: false, saveData: false })
    ).toBe("low");
  });

  it("returns 'high' for strong desktops", () => {
    expect(
      resolveTier({ cores: 12, deviceMemory: 16, isMobile: false, reducedMotion: false, saveData: false })
    ).toBe("high");
  });

  it("downgrades to 'low' when Save-Data is on", () => {
    expect(
      resolveTier({ cores: 12, deviceMemory: 16, isMobile: false, reducedMotion: false, saveData: true })
    ).toBe("low");
  });

  it("exposes particle counts + dpr per tier", () => {
    expect(TIER_SETTINGS.high.particleCount).toBeGreaterThan(TIER_SETTINGS.low.particleCount);
    expect(TIER_SETTINGS.off.particleCount).toBe(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/brain/device-tier.test.ts`
Expected: FAIL — cannot find module `./device-tier`.

- [ ] **Step 3: Write the implementation**

`src/lib/brain/device-tier.ts`:
```ts
export type Tier = "high" | "medium" | "low" | "off";

export interface DeviceSignals {
  cores: number;
  deviceMemory: number; // GB; 0 if unknown
  isMobile: boolean;
  reducedMotion: boolean;
  saveData: boolean;
}

export interface TierSetting {
  particleCount: number;
  dprMax: number;
  bloom: boolean;
}

export const TIER_SETTINGS: Record<Tier, TierSetting> = {
  high: { particleCount: 1400, dprMax: 2, bloom: true },
  medium: { particleCount: 800, dprMax: 1.75, bloom: true },
  low: { particleCount: 350, dprMax: 1.25, bloom: false },
  off: { particleCount: 0, dprMax: 1, bloom: false },
};

/** Pure decision so it can be unit-tested away from the browser. */
export function resolveTier(s: DeviceSignals): Tier {
  if (s.reducedMotion) return "off";
  if (s.saveData) return "low";

  if (s.isMobile) {
    if (s.cores <= 4 || (s.deviceMemory && s.deviceMemory <= 3)) return "low";
    return "medium";
  }

  if (s.cores >= 8 && (!s.deviceMemory || s.deviceMemory >= 8)) return "high";
  if (s.cores >= 4) return "medium";
  return "low";
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/brain/device-tier.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Add the React hook (no test — thin browser-signal wrapper)**

`src/hooks/useDeviceTier.ts`:
```ts
"use client";

import { useEffect, useState } from "react";
import { resolveTier, type Tier } from "@/lib/brain/device-tier";

/** Reads browser signals once on mount and resolves a render-quality tier.
 *  SSR-safe: returns "off" until mounted so nothing heavy renders on the server. */
export function useDeviceTier(): Tier {
  const [tier, setTier] = useState<Tier>("off");

  useEffect(() => {
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    setTier(
      resolveTier({
        cores: nav.hardwareConcurrency || 4,
        deviceMemory: nav.deviceMemory || 0,
        isMobile: window.matchMedia("(max-width: 768px)").matches,
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        saveData: Boolean(nav.connection?.saveData),
      })
    );
  }, []);

  return tier;
}
```

- [ ] **Step 6: Commit**

```bash
git add src/lib/brain/device-tier.ts src/lib/brain/device-tier.test.ts src/hooks/useDeviceTier.ts
git commit -m "feat: add device-tier resolver and useDeviceTier hook"
```

---

### Task 8: `NeuronWeb` R3F scene contents

**Files:**
- Create: `src/components/brain3d/NeuronWeb.tsx`

Visual component — verified by running, not unit tests. Uses one `instancedMesh` for nodes (one draw call) and a single `lineSegments` for edges, per spec §8 performance rules.

- [ ] **Step 1: Write the component**

`src/components/brain3d/NeuronWeb.tsx`:
```tsx
"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { generateNeuronGraph } from "@/lib/brain/neuron-graph";

interface NeuronWebProps {
  particleCount: number;
  color?: string;
}

export default function NeuronWeb({ particleCount, color = "#5EEAD4" }: NeuronWebProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const graph = useMemo(
    () => generateNeuronGraph({ count: particleCount, seed: 42 }),
    [particleCount]
  );

  // Edge geometry: flat [x,y,z, x,y,z, ...] for both endpoints of every edge.
  const lineGeometry = useMemo(() => {
    const positions = new Float32Array(graph.edges.length * 6);
    graph.edges.forEach(([a, b], i) => {
      const na = graph.nodes[a];
      const nb = graph.nodes[b];
      positions.set([na[0], na[1], na[2], nb[0], nb[1], nb[2]], i * 6);
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [graph]);

  // Per-instance random phase so nodes pulse out of sync.
  const phases = useMemo(
    () => graph.nodes.map((_, i) => (i * 1.6180339) % (Math.PI * 2)),
    [graph]
  );

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (mesh) {
      const t = state.clock.elapsedTime;
      graph.nodes.forEach((n, i) => {
        const pulse = 0.6 + 0.4 * Math.sin(t * 2 + phases[i]);
        dummy.position.set(n[0], n[1], n[2]);
        dummy.scale.setScalar(0.012 + 0.01 * pulse);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
    }
    if (groupRef.current) groupRef.current.rotation.y += 0.0015;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, graph.nodes.length]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </instancedMesh>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.18} toneMapped={false} />
      </lineSegments>
    </group>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/brain3d/NeuronWeb.tsx
git commit -m "feat: add instanced NeuronWeb R3F scene"
```

---

### Task 9: Client-only `<Canvas>` wrapper + `/brain-lab` verify route

**Files:**
- Create: `src/components/brain3d/NeuronWebCanvas.tsx`, `src/app/brain-lab/page.tsx`

- [ ] **Step 1: Write the canvas wrapper**

`src/components/brain3d/NeuronWebCanvas.tsx`:
```tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import { TIER_SETTINGS } from "@/lib/brain/device-tier";
import NeuronWeb from "./NeuronWeb";

export default function NeuronWebCanvas() {
  const tier = useDeviceTier();
  const settings = TIER_SETTINGS[tier];

  // Reduced-motion / off tier: render nothing heavy (the fallback nav carries navigation).
  if (settings.particleCount === 0) {
    return <div className="h-full w-full bg-[#001a3d]" aria-hidden="true" />;
  }

  return (
    <Canvas
      aria-hidden="true"
      dpr={[1, settings.dprMax]}
      camera={{ position: [0, 0, 3], fov: 50 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#001a3d"]} />
      <NeuronWeb particleCount={settings.particleCount} />
      {settings.bloom && (
        <EffectComposer>
          <Bloom intensity={1.2} luminanceThreshold={0.1} mipmapBlur />
        </EffectComposer>
      )}
    </Canvas>
  );
}
```

- [ ] **Step 2: Write the isolated verify route**

`src/app/brain-lab/page.tsx`:
```tsx
import dynamic from "next/dynamic";
import BrainNav from "@/components/BrainNav";

// R3F touches WebGL/window — must be client-only (no SSR).
const NeuronWebCanvas = dynamic(
  () => import("@/components/brain3d/NeuronWebCanvas"),
  { ssr: false }
);

export default function BrainLabPage() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#001a3d]">
      <div className="absolute inset-0">
        <NeuronWebCanvas />
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 p-6">
        <BrainNav />
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify it builds**

Run: `npm run build`
Expected: build succeeds; `/brain-lab` appears in the route list.

- [ ] **Step 4: Verify it renders and performs**

Run `npm run dev`, open `http://localhost:3000/brain-lab`. Confirm:
- A rotating glowing neuron web renders with bloom on desktop.
- Nodes pulse (scale in/out) out of sync.
- The `BrainNav` chips render over it and are keyboard-focusable (Tab).
- Throttle to a mobile preset in DevTools → reload → the scene still renders (lower particle count, no crash).
- Set OS "reduce motion" (or emulate `prefers-reduced-motion: reduce` in DevTools Rendering) → reload → the canvas is replaced by the flat background and the nav still works.

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: all suites PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/brain3d/NeuronWebCanvas.tsx src/app/brain-lab/page.tsx
git commit -m "feat: add client-only NeuronWeb canvas and /brain-lab verify route"
```

---

## Done criteria (Phases 1–2)

- `npm test` green: regions, frame-scrub, neuron-graph, device-tier, BrainNav.
- `BrainVideoSection` still scrubs exactly as before (now using shared helpers).
- `/brain-lab` shows a performant, tier-adaptive, bloom-lit neuron web with a working accessible fallback nav and correct reduced-motion behavior.
- Nothing wired into the homepage hub yet — that is Phase 3 (hand-off), planned next.

## Next (Phase 3+ — separate plan)
Hand-off crossfade (frame-scrub → NeuronWeb), camera fly-to-region on click with route updates, persistent B3 hub + docked mini-brain, full a11y/SEO/Core-Web-Vitals pass, and the optional hi-res render upgrade.
