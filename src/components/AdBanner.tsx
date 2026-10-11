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
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
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
      className={`mx-auto flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/30 transition-all ${slotDimensions} ${className}`}
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
          <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
            Sponsored Advertisement
          </span>
          <span className="text-[11px] text-zinc-400/80 mt-0.5">
            Non-intrusive ad zone (CLS Protected)
          </span>
        </div>
      )}
    </div>
  );
}
