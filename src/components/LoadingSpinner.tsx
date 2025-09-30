"use client";

import { useRef, useEffect } from "react";
import { loadingPulse, prefersReducedMotion } from "@/lib/animations";
import { gsap } from "gsap";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

export default function LoadingSpinner({
  size = "md",
  message = "Loading...",
  className = ""
}: LoadingSpinnerProps) {
  const spinnerRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  useEffect(() => {
    if (!prefersReducedMotion() && spinnerRef.current && pulseRef.current) {
      // Subtle rotation animation
      gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 2,
        ease: "none",
        repeat: -1
      });

      // Subtle pulse animation
      loadingPulse(pulseRef.current);
    }
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div className="relative">
        <div
          ref={spinnerRef}
          className={`${sizeClasses[size]} border-2 border-brand-blue-200 border-t-brand-blue-600 rounded-full`}
        />
        <div
          ref={pulseRef}
          className={`absolute inset-0 ${sizeClasses[size]} border-2 border-brand-blue-400 rounded-full opacity-40`}
        />
      </div>
      {message && (
        <p className="text-medical-gray-600 text-sm font-medium medical-text-high-contrast">
          {message}
        </p>
      )}
    </div>
  );
}