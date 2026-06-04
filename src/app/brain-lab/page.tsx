"use client";

import dynamic from "next/dynamic";
import BrainNav from "@/components/BrainNav";

// R3F touches WebGL/window — must be client-only (no SSR). ssr:false requires a Client Component in Next 15.
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
