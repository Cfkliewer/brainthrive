"use client";

import { usePageTransition } from "@/lib/animations";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export default function PageTransition({ children, className = "" }: PageTransitionProps) {
  const { pageRef } = usePageTransition();

  return (
    <div ref={pageRef} className={`page-transition-container ${className}`}>
      {children}
    </div>
  );
}