import React from 'react';
import { ImageConverterApp } from '@/components/ImageConverterApp';
import { generateRootSchema } from '@/lib/schema';

export default function HomePage() {
  const jsonLd = generateRootSchema();

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
