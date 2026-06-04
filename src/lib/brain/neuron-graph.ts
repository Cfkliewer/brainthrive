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
