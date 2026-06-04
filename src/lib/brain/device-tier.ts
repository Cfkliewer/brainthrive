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
