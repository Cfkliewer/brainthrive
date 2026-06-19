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
