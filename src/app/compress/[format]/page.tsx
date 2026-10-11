import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SEO_COMPRESS_FORMATS, FORMATS } from '@/lib/constants';
import { SupportedFormat } from '@/lib/types';
import { ImageConverterApp } from '@/components/ImageConverterApp';

interface PageProps {
  params: Promise<{ format: string }>;
}

export async function generateStaticParams() {
  return SEO_COMPRESS_FORMATS.map((f) => ({
    format: f.format,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { format } = await params;
  const match = SEO_COMPRESS_FORMATS.find((f) => f.format === format);

  if (!match) {
    return { title: 'Compress Images | Squeeze' };
  }

  return {
    title: `${match.title} - Free & Lossless | Squeeze`,
    description: `${match.desc} Reduce image sizes up to 90% without losing visual clarity. 100% in-browser privacy.`,
    keywords: [
      `compress ${match.format}`,
      `reduce ${match.format} size`,
      `compress ${match.name} without losing quality`,
      `free ${match.format} compressor`,
    ],
  };
}

export default async function CompressFormatPage({ params }: PageProps) {
  const { format } = await params;
  const match = SEO_COMPRESS_FORMATS.find((f) => f.format === format);

  if (!match) {
    notFound();
  }

  const fmtMeta = FORMATS[match.format as SupportedFormat];

  return (
    <div>
      <ImageConverterApp
        initialTargetFormat={match.format as SupportedFormat}
        pageTitle={match.title}
        pageSubtitle={match.desc}
      />

      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12 border-t border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
          Why Compress {fmtMeta.name} with Squeeze?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Perceptual SSIM Optimization
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Traditional compressors simply lower JPEG quality factors indiscriminately, resulting in blurry details and visible block artifacts. Squeeze employs structural similarity comparisons to remove only invisible high-frequency noise.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Instant In-Browser Processing
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Never wait in a queue for cloud servers to convert your images. All compression algorithms execute using the hardware power of your own machine.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
