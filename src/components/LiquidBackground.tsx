'use client';

import React, { useEffect, useRef } from 'react';

export function LiquidBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let currentX = targetX;
    let currentY = targetY;

    // Track scroll with passive listener and direct style update (0 react re-renders)
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollY = window.scrollY || window.pageYOffset;
      containerRef.current.style.setProperty('--scroll-y', `${scrollY}px`);
    };

    // Smooth lerp pointer follow
    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animatePointer = () => {
      // Lerp smoothing (0.08 speed for elegant fluid resistance)
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${currentX - 300}px, ${currentY - 300}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animatePointer);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    animationFrameId = requestAnimationFrame(animatePointer);

    // Initial trigger
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      style={{
        // Default scroll variable
        ['--scroll-y' as string]: '0px',
      }}
    >
      {/* ─── Layer 1: Ambient Liquid Plasma Orbs (Slow Parallax: 0.12x) ─── */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: 'translate3d(0, calc(var(--scroll-y) * -0.12), 0)',
        }}
      >
        {/* Indigo / Sapphire Primary Bloom */}
        <div
          className="absolute -top-[10%] left-[15%] w-[650px] h-[650px] rounded-full blur-[140px] opacity-40 animate-liquid-drift-1"
          style={{
            background: 'radial-gradient(circle, rgba(79, 70, 229, 0.45) 0%, rgba(37, 99, 235, 0.25) 50%, transparent 75%)',
          }}
        />

        {/* Violet / Plum Secondary Atmospheric Bloom */}
        <div
          className="absolute top-[20%] -right-[5%] w-[550px] h-[550px] rounded-full blur-[130px] opacity-35 animate-liquid-drift-2"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.40) 0%, rgba(99, 102, 241, 0.20) 55%, transparent 75%)',
          }}
        />

        {/* Cyan / Arctic Cold Bloom */}
        <div
          className="absolute top-[60%] left-[5%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-25 animate-liquid-drift-3"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.35) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 75%)',
          }}
        />
      </div>

      {/* ─── Layer 2: Mid Parallax Celestial Grid & Milled Orbital Rings (Parallax: 0.28x) ─── */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: 'translate3d(0, calc(var(--scroll-y) * -0.28), 0)',
        }}
      >
        {/* Perspective Optical Grid with Vignette Mask */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255, 255, 255, 0.20) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            maskImage:
              'radial-gradient(ellipse 70% 60% at 50% 35%, #000 30%, transparent 90%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 60% at 50% 35%, #000 30%, transparent 90%)',
          }}
        />

        {/* Floating Geometric Milled Glass Ring (Top Right) */}
        <div
          className="absolute top-[12%] right-[10%] w-[480px] h-[480px] rounded-full border border-white/[0.06] opacity-60 animate-orbit-slow"
          style={{
            boxShadow: 'inset 0 0 40px rgba(255, 255, 255, 0.02), 0 0 60px rgba(99, 102, 241, 0.08)',
          }}
        >
          {/* Inner concentric dashed glass ring */}
          <div className="absolute inset-8 rounded-full border border-dashed border-white/[0.04]" />
        </div>

        {/* Floating Geometric Milled Glass Ring (Bottom Left) */}
        <div
          className="absolute top-[55%] -left-[5%] w-[580px] h-[580px] rounded-full border border-white/[0.05] opacity-50 animate-orbit-reverse"
          style={{
            boxShadow: 'inset 0 0 50px rgba(255, 255, 255, 0.02), 0 0 70px rgba(6, 182, 212, 0.06)',
          }}
        >
          <div className="absolute inset-12 rounded-full border border-dashed border-white/[0.03]" />
        </div>
      </div>

      {/* ─── Layer 3: Interactive Pointer Spotlight ─── */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none will-change-transform opacity-60 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.07) 0%, rgba(129, 140, 248, 0.03) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* ─── Layer 4: Tactile Frosted Noise Layer ─── */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette floor falloff */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)]/80 pointer-events-none" />
    </div>
  );
}
