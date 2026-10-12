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
    <ImageConverterApp
      initialTargetFormat={match.format as SupportedFormat}
      pageTitle={match.title}
      pageSubtitle={match.desc}
    >
      <section className="pt-6 text-zinc-300">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          Why Compress {fmtMeta.name} with Squeeze?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm leading-relaxed">
          <div
            className="rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-5 sm:p-6"
            style={{ boxShadow: 'var(--glass-inset)' }}
          >
            <h3 className="font-semibold text-white mb-2 text-sm">
              Smart Quality Preservation
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Standard tools lower quality indiscriminately, creating noticeable blur. Squeeze preserves critical edge details and color balance while removing data your eyes cannot detect.
            </p>
          </div>

          <div
            className="rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-5 sm:p-6"
            style={{ boxShadow: 'var(--glass-inset)' }}
          >
            <h3 className="font-semibold text-white mb-2 text-sm">
              100% In-Browser Privacy
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Never wait in a queue or upload personal photos to unfamiliar servers. All compression happens locally on your computer or phone.
            </p>
          </div>
        </div>
      </section>
    </ImageConverterApp>
  );
}
