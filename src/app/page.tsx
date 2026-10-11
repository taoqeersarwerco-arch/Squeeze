import React from 'react';
import { ImageConverterApp } from '@/components/ImageConverterApp';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Squeeze',
    url: 'https://squeeze.app',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Free in-browser image converter and perceptual compressor. Convert between JPG, PNG, ICO, SVG, and WebP with zero quality loss and complete offline privacy.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ImageConverterApp />
    </>
  );
}
