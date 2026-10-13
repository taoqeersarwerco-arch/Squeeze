'use client';

import React, { useEffect } from 'react';

interface AdBannerProps {
  slot: 'leaderboard' | 'rectangle' | 'infeed';
  className?: string;
}

/**
 * AdBanner component for Google AdSense monetization.
 * 
 * Inactive / Zero-UI mode:
 * When NEXT_PUBLIC_ADSENSE_CLIENT_ID is not configured, this component
 * returns null so that no empty boxes, borders, or placeholders appear in the UI.
 * 
 * Instant Future Activation:
 * As soon as an approved Google AdSense publisher ID is provided in
 * NEXT_PUBLIC_ADSENSE_CLIENT_ID (e.g. ca-pub-XXXXXXXXXXXXXXXX), ads activate
 * across all existing slots seamlessly with zero layout disruption.
 */
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

  // Do not render any placeholder or container when AdSense is not configured
  if (!adClientId) {
    return null;
  }

  // Dimensions to prevent Cumulative Layout Shift (CLS) once ads are active
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
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClientId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
