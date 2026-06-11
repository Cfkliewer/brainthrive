"use client";

import { useEffect, useLayoutEffect } from "react";
import type { VersionId } from "@/lib/content/types";

// useLayoutEffect warns during SSR; the server pass renders the inline
// script below instead, so falling back to useEffect there is harmless.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Sets data-version on <body> so the [data-version] theming blocks in
 * globals.css apply to the whole page (background, scrollbar, selection).
 *
 * Each version layout renders this exactly once. It covers both paint paths:
 * - SSR/hard load: the rendered inline <script> runs during HTML parsing,
 *   before first paint, so light versions never flash the dark default body.
 * - Client-side navigation: useLayoutEffect swaps the attribute before the
 *   next paint, so version hops never paint a frame in the old theme.
 *
 * The layout effect cleanup removes the attribute on unmount.
 */
export default function SetBodyVersion({ version }: { version: VersionId }) {
  useIsomorphicLayoutEffect(() => {
    document.body.dataset.version = version;
    return () => {
      delete document.body.dataset.version;
    };
  }, [version]);

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.body.dataset.version=${JSON.stringify(version)}`,
      }}
    />
  );
}
