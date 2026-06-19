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
