"use client";

import { useEffect } from "react";
import type { VersionId } from "@/lib/content/types";

/**
 * Sets data-version on <body> so the [data-version] theming blocks in
 * globals.css apply to the whole page (background, scrollbar, selection).
 * Renders nothing.
 */
export default function SetBodyVersion({ version }: { version: VersionId }) {
  useEffect(() => {
    document.body.dataset.version = version;
    return () => {
      delete document.body.dataset.version;
    };
  }, [version]);

  return null;
}
