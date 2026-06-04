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
