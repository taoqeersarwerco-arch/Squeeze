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
        <h2 className="text-xl sm:text-3xl font-extrabold text-white mb-6">
          How to Convert {fromFmt.name} to {toFmt.name} Online
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-5 shadow-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/15 border border-indigo-500/30 font-bold text-indigo-400 mb-3 text-sm">
              1
            </span>
            <h3 className="font-semibold text-white mb-1">
              Upload {fromFmt.name} Files
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Drag and drop your {match.from.toUpperCase()} files into the drop zone above or paste directly from your clipboard.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-5 shadow-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/15 border border-indigo-500/30 font-bold text-indigo-400 mb-3 text-sm">
              2
            </span>
            <h3 className="font-semibold text-white mb-1">
              Automated Squeeze
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Our local Web Worker engine transforms your image into {toFmt.name} while optimizing file weight and preserving structural fidelity.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-5 shadow-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/15 border border-indigo-500/30 font-bold text-indigo-400 mb-3 text-sm">
              3
            </span>
            <h3 className="font-semibold text-white mb-1">
              Compare & Download
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Use our split-screen slider to inspect pixel clarity before downloading your file or batch archive as a ZIP.
            </p>
          </div>
        </div>

        {/* Format Comparison Breakdown */}
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-6 overflow-hidden">
          <h3 className="font-bold text-base text-white mb-3">
            {fromFmt.name} vs {toFmt.name}: Key Differences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
            <div>
              <p className="font-semibold text-indigo-400 mb-1">
                About {fromFmt.name} ({fromFmt.ext})
              </p>
              <p className="text-zinc-400">{fromFmt.desc}</p>
            </div>
            <div>
              <p className="font-semibold text-indigo-400 mb-1">
                About {toFmt.name} ({toFmt.ext})
              </p>
              <p className="text-zinc-400">{toFmt.desc}</p>
            </div>
          </div>
        </div>
      </section>
    </ImageConverterApp>
  );
}
