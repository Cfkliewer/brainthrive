import Link from "next/link";
import { BRAIN_REGIONS } from "@/lib/brain/regions";

/** Server-rendered, crawlable, keyboard-accessible navigation.
 *  Works with JS off / WebGL unavailable. The 3D hub augments this; it never replaces it. */
export default function BrainNav({ className = "" }: { className?: string }) {
  return (
    <nav aria-label="Brain navigation" className={className}>
      <ul className="flex flex-wrap gap-4">
        {BRAIN_REGIONS.map((region) => (
          <li key={region.id}>
            <Link
              href={region.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/90 transition hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35F3E6]"
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: region.color }}
              />
              {region.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
