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
