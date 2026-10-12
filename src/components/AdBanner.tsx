'use client';

import React, { useEffect } from 'react';

interface AdBannerProps {
  slot: 'leaderboard' | 'rectangle' | 'infeed';
  className?: string;
}

export function AdBanner({ slot, className = '' }: AdBannerProps) {
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (adClientId && typeof window !== 'undefined') {
      try {
        // @ts-expect-error Google Adsense global push array
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // Ignored
      }
    }
  }, [adClientId]);

  // Dimensions to prevent Cumulative Layout Shift (CLS)
  const slotDimensions = {
    leaderboard: 'min-h-[90px] max-w-[728px] w-full',
    rectangle: 'min-h-[250px] w-full max-w-[300px]',
    infeed: 'min-h-[100px] w-full max-w-full',
  }[slot];

  return (
    <div
      className={`mx-auto flex flex-col items-center justify-center overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.01] transition-all ${slotDimensions} ${className}`}
      aria-label="Advertisement"
    >
      {adClientId ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adClientId}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-3 text-center">
          <span className="text-[10px] font-medium tracking-wider uppercase text-zinc-600">
            Ad
          </span>
        </div>
      )}
    </div>
  );
}
