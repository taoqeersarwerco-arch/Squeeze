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
    <div>
      <ImageConverterApp
        initialSourceFormat={match.from as SupportedFormat}
        initialTargetFormat={match.to as SupportedFormat}
        pageTitle={match.title}
        pageSubtitle={match.desc}
      />

      {/* SEO Educational & Crawlable Content Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12 border-t border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
          How to Convert {fromFmt.name} to {toFmt.name} Online
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 font-bold text-indigo-600 dark:text-indigo-400 mb-3 text-sm">
              1
            </span>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
              Upload {fromFmt.name} Files
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Drag and drop your {match.from.toUpperCase()} files into the drop box above or paste directly from your clipboard.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 font-bold text-indigo-600 dark:text-indigo-400 mb-3 text-sm">
              2
            </span>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
              Automated Squeeze
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Our local Web Worker engine transforms your image into {toFmt.name} while optimizing file weight and preserving structural fidelity.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 font-bold text-indigo-600 dark:text-indigo-400 mb-3 text-sm">
              3
            </span>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
              Compare & Download
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Use our split-screen slider to inspect pixel clarity before downloading your file or batch archive as a ZIP.
            </p>
          </div>
        </div>

        {/* Format Comparison Breakdown */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 overflow-hidden">
          <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 mb-3">
            {fromFmt.name} vs {toFmt.name}: Key Differences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
            <div>
              <p className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                About {fromFmt.name} ({fromFmt.ext})
              </p>
              <p className="text-zinc-500">{fromFmt.desc}</p>
            </div>
            <div>
              <p className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                About {toFmt.name} ({toFmt.ext})
              </p>
              <p className="text-zinc-500">{toFmt.desc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
