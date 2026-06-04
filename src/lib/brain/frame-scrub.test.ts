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
