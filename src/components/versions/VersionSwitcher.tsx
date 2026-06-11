"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { VersionId } from "@/lib/content/types";

const VERSIONS: VersionId[] = ["v1", "v2", "v3"];

/**
 * Fixed bottom-right pill with 1/2/3 links for switching between the three
 * design versions while preserving the current subpath
 * (e.g. /v1/about -> /v3/about).
 */
export default function VersionSwitcher() {
  const pathname = usePathname() ?? "/";
  const match = pathname.match(/^\/(v[123])(\/.*)?$/);
  const activeVersion = match?.[1] as VersionId | undefined;
  const subpath = match?.[2] ?? "";

  return (
    <nav
      aria-label="Switch design version"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-1 rounded-full bg-[#001A3D]/90 p-1 shadow-lg ring-1 ring-white/15 backdrop-blur"
    >
      {VERSIONS.map((version) => {
        const isActive = version === activeVersion;
        return (
          <Link
            key={version}
            href={`/${version}${subpath}`}
            aria-current={isActive ? "page" : undefined}
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
              isActive
                ? "bg-[#35F3E6] text-[#001A3D]"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span className="sr-only">Design version </span>
            {version.slice(1)}
          </Link>
        );
      })}
    </nav>
  );
}
