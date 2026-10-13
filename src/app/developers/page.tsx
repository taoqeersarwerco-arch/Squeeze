import React from 'react';
import type { Metadata } from 'next';
import { Navbar, Footer, DeveloperHubClient } from '@/components';

export const metadata: Metadata = {
  title: 'Client-Side Image Processing API & Sandbox | Squeeze Developers',
  description:
    'Build with the Squeeze engine. Client-side Web Worker SDK and Headless Cloud REST API with zero-upload privacy, perceptual SSIM guarantees, and instant free API keys.',
  alternates: {
    canonical: 'https://www.trysqueeze.online/developers',
  },
  openGraph: {
    title: 'Squeeze Developer Hub & Interactive API Sandbox',
    description:
      'Integrate client-side Web Worker image conversion or headless Cloud REST API. Instant free sandbox keys, multi-language code snippets, and live telemetry.',
    url: 'https://www.trysqueeze.online/developers',
    siteName: 'Squeeze',
    images: [
      {
        url: 'https://www.trysqueeze.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Squeeze Developer API & Sandbox',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Squeeze Developer Hub & Interactive API Sandbox',
    description:
      'Client-side image processing SDK and headless cloud API with zero server uploads, live telemetry, and instant API key generation.',
  },
};

export default function DevelopersPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebAPI',
        name: 'Squeeze Image Processing Engine API',
        description:
          'Programmatic client-side Web Worker SDK and REST API for high-speed image conversion (PNG, JPG, WebP, SVG, ICO), perceptual SSIM preservation, and metadata stripping.',
        documentation: 'https://www.trysqueeze.online/developers',
        provider: {
          '@type': 'Organization',
          name: 'Squeeze',
          url: 'https://www.trysqueeze.online',
        },
        termsOfService: 'https://www.trysqueeze.online/terms',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.trysqueeze.online',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Developers',
            item: 'https://www.trysqueeze.online/developers',
          },
        ],
      },
    ],
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-transparent text-zinc-100">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="relative z-10 flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 sm:pt-16">
          <DeveloperHubClient />
        </div>
      </main>

      <Footer />
    </div>
  );
}
