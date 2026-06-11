import AnimationProvider from "@/components/AnimationProvider";

/**
 * Layout for the original site (/, /services, /brain-lab).
 * Mounts the global AnimationProvider (Lenis + GSAP/ScrollTrigger defaults)
 * exactly as the root layout did before the (root) route group was introduced.
 * The /v1, /v2, /v3 subtrees mount their own parameterized provider instead.
 */
export default function RootGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AnimationProvider>{children}</AnimationProvider>;
}
