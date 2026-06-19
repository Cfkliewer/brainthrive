/** The cinematic brain fly-in is a pre-rendered JPG sequence in /public/videos/frames. */
export const BRAIN_FRAME_COUNT = 121;

/** 1-based, zero-padded frame path for a 0-based index. */
export function frameSrc(index: number): string {
  return `/videos/frames/frame_${String(index + 1).padStart(3, "0")}.jpg`;
}

/** Map a scroll progress (0..1, may overshoot) to a clamped 0-based frame index. */
export function frameForProgress(progress: number, frameCount: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  return Math.round(clamped * (frameCount - 1));
}
