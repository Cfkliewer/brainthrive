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
