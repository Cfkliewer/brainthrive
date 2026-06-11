"use client";

import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

export interface DisclosureTriggerProps {
  ref: React.RefCallback<HTMLButtonElement>;
  "aria-expanded": boolean;
  "aria-controls": string;
  onClick: () => void;
}

export interface DisclosurePanelProps {
  id: string;
  hidden: boolean;
}

export interface Disclosure<T extends HTMLElement = HTMLElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  /** Spread onto the trigger <button>. */
  triggerProps: DisclosureTriggerProps;
  /** Spread onto the dropdown panel element. */
  panelProps: DisclosurePanelProps;
  /** Attach to the wrapper containing both trigger and panel. */
  containerRef: React.RefObject<T | null>;
}

/**
 * Headless accessible disclosure state for nav dropdowns.
 * Handles aria-expanded/aria-controls wiring and closes on:
 * - Escape (returns focus to the trigger)
 * - click outside the container
 * - focus leaving the container
 * - client-side route change (nav lives in a persistent layout)
 *
 * Type parameter T is the container element type, so
 * `useDisclosure<HTMLDivElement>()` attaches to `<div ref={...}>`
 * without casts.
 */
export function useDisclosure<
  T extends HTMLElement = HTMLElement,
>(): Disclosure<T> {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<T | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelId = useId();
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  // Close when the route changes (skip the initial mount).
  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      setOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const container = containerRef.current;
      if (container && !container.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      const container = containerRef.current;
      if (container && !container.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("focusin", handleFocusIn);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [open]);

  const setTriggerRef = useCallback((node: HTMLButtonElement | null) => {
    triggerRef.current = node;
  }, []);

  return {
    open,
    setOpen,
    triggerProps: {
      ref: setTriggerRef,
      "aria-expanded": open,
      "aria-controls": panelId,
      onClick: () => setOpen((prev) => !prev),
    },
    panelProps: {
      id: panelId,
      hidden: !open,
    },
    containerRef,
  };
}
