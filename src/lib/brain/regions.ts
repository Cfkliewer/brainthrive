/** Single source of truth for brain navigation stops.
 *  Consumed by the 3D layer (positions/colors) AND the semantic <nav> (label/href). */
export type RegionId =
  | "cognitive"
  | "photobiomodulation"
  | "brain-mapping"
  | "tbi"
  | "assessment";

export interface BrainRegion {
  id: RegionId;
  label: string;
  /** Short description surfaced in the region panel. */
  summary: string;
  /** Route-addressable destination (must be server-rendered + crawlable). */
  href: string;
  /** Design-system hex used for the node glow + tint. */
  color: string;
  /** Normalized 3D anchor inside the brain volume, roughly [-1,1] per axis. */
  position: [number, number, number];
}

export const BRAIN_REGIONS: BrainRegion[] = [
  {
    id: "cognitive",
    label: "Cognitive & Neurology",
    summary: "Memory, cognition, ADHD & autism support.",
    href: "/conditions#cognitive",
    color: "#9333EA",
    position: [-0.55, 0.35, 0.2],
  },
  {
    id: "photobiomodulation",
    label: "Photobiomodulation",
    summary: "Light-based therapy that trains calmer brain rhythms.",
    href: "/services#pbm",
    color: "#2563EB",
    position: [0.5, 0.4, -0.1],
  },
  {
    id: "brain-mapping",
    label: "Brain Mapping & Diagnostics",
    summary: "qEEG and Brain Gauge cortical metrics.",
    href: "/services#qeeg",
    color: "#0D9488",
    position: [0.1, -0.1, 0.6],
  },
  {
    id: "tbi",
    label: "TBI & Concussion",
    summary: "Recovery support after brain injury.",
    href: "/conditions#tbi",
    color: "#5EEAD4",
    position: [-0.2, -0.45, -0.3],
  },
  {
    id: "assessment",
    label: "Book an Assessment",
    summary: "Start with a qEEG-guided evaluation.",
    href: "/contact",
    color: "#35F3E6",
    position: [0.0, 0.6, 0.35],
  },
];

export function getRegion(id: string): BrainRegion | undefined {
  return BRAIN_REGIONS.find((r) => r.id === id);
}
