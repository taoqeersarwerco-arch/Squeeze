'use client';

import React from 'react';

interface SqueezeLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  variant?: 'mark' | 'badge';
}

/**
 * Squeeze Brand Logo Mark
 * The Caliper Monogram: Precision compression brackets squeezing a high-speed geometric 'S'.
 */
export function SqueezeLogo({
  size = 20,
  variant = 'mark',
  className = '',
  ...props
}: SqueezeLogoProps) {
  const svgContent = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Squeeze Logo"
      {...props}
    >
      {/* Left Caliper Bracket */}
      <path
        d="M7 4.5H5C4.17157 4.5 3.5 5.17157 3.5 6V18C3.5 18.8284 4.17157 19.5 5 19.5H7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right Caliper Bracket */}
      <path
        d="M17 4.5H19C19.8284 4.5 20.5 5.17157 20.5 6V18C20.5 18.8284 19.8284 19.5 19 19.5H17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Center Compression Monogram 'S' */}
      <path
        d="M14.75 8.25C14.75 6.75 13.55 5.5 11.9 5.5C10.15 5.5 9 6.7 9 8.2C9 11.25 15 10.85 15 15.5C15 17.2 13.6 18.5 11.85 18.5C9.85 18.5 8.85 17.15 8.85 15.5"
        stroke="currentColor"
        strokeWidth="2.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Center Precision Sparkle Core (micro-indicator of zero-loss compression) */}
      <circle
        cx="12"
        cy="12"
        r="0.85"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );

  if (variant === 'badge') {
    return (
      <div
        className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.04] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl group-hover:border-white/25 group-hover:bg-white/[0.08] transition-all"
        style={{ boxShadow: 'var(--glass-inset)' }}
      >
        {svgContent}
      </div>
    );
  }

  return svgContent;
}
