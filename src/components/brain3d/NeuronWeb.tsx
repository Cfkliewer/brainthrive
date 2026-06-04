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
    geo.computeBoundingSphere(); // so the line set isn't incorrectly frustum-culled
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
      <instancedMesh ref={meshRef} frustumCulled={false} args={[undefined, undefined, graph.nodes.length]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </instancedMesh>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.18} toneMapped={false} />
      </lineSegments>
    </group>
  );
}
