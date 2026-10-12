import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SEO_CONVERSION_PAIRS, FORMATS } from '@/lib/constants';
import { SupportedFormat } from '@/lib/types';
import { ImageConverterApp } from '@/components/ImageConverterApp';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ pair: string }>;
}

export async function generateStaticParams() {
  return SEO_CONVERSION_PAIRS.map((pair) => ({
    pair: `${pair.from}-to-${pair.to}`,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pair } = await params;
  const match = SEO_CONVERSION_PAIRS.find((p) => `${p.from}-to-${p.to}` === pair);

  if (!match) {
    return { title: 'Convert Images | Squeeze' };
  }

  const fromFmt = FORMATS[match.from as SupportedFormat]?.name || match.from.toUpperCase();
  const toFmt = FORMATS[match.to as SupportedFormat]?.name || match.to.toUpperCase();

  return {
    title: `${match.title} - Free & Online | Squeeze`,
    description: `${match.desc} 100% in-browser conversion with zero quality loss and instant download.`,
    keywords: [
      `convert ${match.from} to ${match.to}`,
      `${match.from} to ${match.to} converter`,
      `free ${match.from} to ${match.to}`,
      `${match.from} to ${match.to} online`,
    ],
  };
}

export default async function ConvertPairPage({ params }: PageProps) {
  const { pair } = await params;
  const match = SEO_CONVERSION_PAIRS.find((p) => `${p.from}-to-${p.to}` === pair);

  if (!match) {
    notFound();
  }

  const fromFmt = FORMATS[match.from as SupportedFormat];
  const toFmt = FORMATS[match.to as SupportedFormat];

  return (
    <ImageConverterApp
      initialSourceFormat={match.from as SupportedFormat}
      initialTargetFormat={match.to as SupportedFormat}
      pageTitle={match.title}
      pageSubtitle={match.desc}
    >
      {/* SEO Educational & Crawlable Content Section */}
      <section className="pt-6 text-zinc-300">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          How to Convert {fromFmt.name} to {toFmt.name} Online
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div
            className="rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-5"
            style={{ boxShadow: 'var(--glass-inset)' }}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06] border border-white/[0.10] font-semibold text-white mb-3 text-xs">
              1
            </span>
            <h3 className="font-semibold text-white mb-1 text-sm">
              Upload {fromFmt.name} Files
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Drag and drop your {match.from.toUpperCase()} files into the box above or paste directly with Ctrl+V.
            </p>
          </div>

          <div
            className="rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-5"
            style={{ boxShadow: 'var(--glass-inset)' }}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06] border border-white/[0.10] font-semibold text-white mb-3 text-xs">
              2
            </span>
            <h3 className="font-semibold text-white mb-1 text-sm">
              Instant Conversion
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Your browser converts the image into {toFmt.name} locally, keeping visual clarity while optimizing file weight.
            </p>
          </div>

          <div
            className="rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-5"
            style={{ boxShadow: 'var(--glass-inset)' }}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06] border border-white/[0.10] font-semibold text-white mb-3 text-xs">
              3
            </span>
            <h3 className="font-semibold text-white mb-1 text-sm">
              Save and Download
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Download your file immediately or download all converted images together in a clean ZIP file.
            </p>
          </div>
        </div>

        {/* Format Comparison Breakdown */}
        <div
          className="rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6"
          style={{ boxShadow: 'var(--glass-inset)' }}
        >
          <h3 className="font-semibold text-sm text-white mb-4">
            {fromFmt.name} vs {toFmt.name}: Key Differences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
            <div>
              <p className="font-medium text-zinc-300 mb-1">
                About {fromFmt.name} ({fromFmt.ext})
              </p>
              <p className="text-[var(--text-secondary)]">{fromFmt.desc}</p>
            </div>
            <div>
              <p className="font-medium text-zinc-300 mb-1">
                About {toFmt.name} ({toFmt.ext})
              </p>
              <p className="text-[var(--text-secondary)]">{toFmt.desc}</p>
            </div>
          </div>
        </div>
      </section>
    </ImageConverterApp>
  );
}
