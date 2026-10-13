import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { SEO_CONVERSION_PAIRS, FORMATS } from '@/lib/constants';
import { SupportedFormat } from '@/lib/types';
import { ImageConverterApp } from '@/components/ImageConverterApp';
import { generateToolPageSchema, BASE_URL } from '@/lib/schema';
import { ShieldCheck, ArrowRight } from 'lucide-react';

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

  const fromFmt = FORMATS[match.from as SupportedFormat];
  const toFmt = FORMATS[match.to as SupportedFormat];
  const url = `${BASE_URL}/convert/${pair}`;

  const title = `Convert ${fromFmt.name} to ${toFmt.name} Online (Free & Private)`;
  const description = `Convert ${fromFmt.name} to ${toFmt.name} instantly in your browser. 100% private with zero file uploads, full transparency preservation, and instant download.`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    keywords: [
      `convert ${match.from} to ${match.to}`,
      `${match.from} to ${match.to} converter`,
      `free ${match.from} to ${match.to} online`,
      `private ${match.from} to ${match.to}`,
      `in-browser ${match.from} to ${match.to}`,
    ],
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
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
  const pageUrl = `${BASE_URL}/convert/${pair}`;

  const schema = generateToolPageSchema({
    name: `Squeeze ${fromFmt.name} to ${toFmt.name} Converter`,
    description: `Convert ${fromFmt.name} to ${toFmt.name} online with 100% in-browser privacy and zero file uploads.`,
    url: pageUrl,
    inputFormat: match.from,
    outputFormat: match.to,
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Converters', url: `${BASE_URL}/#converters` },
      { name: `${fromFmt.name} to ${toFmt.name}` },
    ],
    howToSteps: [
      {
        name: `Select ${fromFmt.name} Images`,
        text: `Drag and drop your ${fromFmt.name} files into the box above or paste directly with Ctrl+V.`,
      },
      {
        name: 'In-Browser Local Processing',
        text: `Squeeze encodes your image into ${toFmt.name} locally in your browser memory using Web Workers. Zero bytes leave your device.`,
      },
      {
        name: 'Save and Download',
        text: `Download your converted ${toFmt.name} image immediately or export all files together in a clean ZIP archive.`,
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <ImageConverterApp
        initialSourceFormat={match.from as SupportedFormat}
        initialTargetFormat={match.to as SupportedFormat}
        pageTitle={`Convert ${fromFmt.name} to ${toFmt.name}`}
        pageSubtitle={`Convert ${fromFmt.name} files to ${toFmt.name} directly in your browser. 100% private, zero uploads, and instant processing.`}
      >
        <section className="pt-8 text-zinc-300 space-y-10">
          {/* AEO / GEO Answer Island */}
          <div
            className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-5 sm:p-6 backdrop-blur-xl relative overflow-hidden"
            style={{ boxShadow: 'var(--glass-inset)' }}
          >
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="h-4 w-4" />
              <span>AEO Answer Island • Quick Summary</span>
            </div>
            <p className="text-sm sm:text-[15px] text-zinc-200 leading-relaxed font-normal">
              <strong>{fromFmt.name} to {toFmt.name} Conversion:</strong> Squeeze converts {fromFmt.name} files into {toFmt.name} entirely on client-side hardware using HTML5 Canvas and off-thread Web Workers. Because processing executes 100% inside your browser, files are never uploaded to remote servers or stored on disks. Conversion preserves optimal color data and visual clarity while adapting to {toFmt.name}&apos;s encoding standards.
            </p>
          </div>

          {/* Technical Specification Matrix */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Technical Specification Matrix
            </h2>
            <div
              className="rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-x-auto"
              style={{ boxShadow: 'var(--glass-inset)' }}
            >
              <table className="w-full text-left text-xs sm:text-sm text-zinc-300">
                <thead className="border-b border-white/[0.08] bg-white/[0.02] text-zinc-400 font-semibold uppercase text-[11px]">
                  <tr>
                    <th className="py-3 px-4 sm:px-6">Technical Attribute</th>
                    <th className="py-3 px-4 sm:px-6">Specification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium text-white">Execution Model</td>
                    <td className="py-3 px-4 sm:px-6 text-zinc-400">100% Client-Side (HTML5 Canvas & Web Workers)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium text-white">Data Privacy</td>
                    <td className="py-3 px-4 sm:px-6 text-emerald-400">Zero Server Upload (0 bytes transmitted)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium text-white">Source Format</td>
                    <td className="py-3 px-4 sm:px-6 text-zinc-400">{fromFmt.name} ({fromFmt.ext})</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium text-white">Output Format</td>
                    <td className="py-3 px-4 sm:px-6 text-zinc-400">{toFmt.name} ({toFmt.ext})</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium text-white">Transparency Handling</td>
                    <td className="py-3 px-4 sm:px-6 text-zinc-400">
                      {toFmt.supportsTransparency
                        ? 'Full 8-bit alpha transparency channel preserved'
                        : 'Transparent pixels filled with custom matte color (white by default)'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium text-white">Batch Capability</td>
                    <td className="py-3 px-4 sm:px-6 text-zinc-400">Unlimited multi-threaded batch queue with ZIP export</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium text-white">Cost & Limits</td>
                    <td className="py-3 px-4 sm:px-6 text-zinc-400">100% Free ($0) • No account or signup required</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
              How to Convert {fromFmt.name} to {toFmt.name} Online
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-5"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] border border-white/[0.10] font-semibold text-white mb-3 text-xs">
                  1
                </div>
                <h3 className="font-semibold text-white mb-1.5 text-sm">
                  1. Select {fromFmt.name} Files
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Drag and drop your {fromFmt.ext} files into the uploader above, click Browse, or paste directly with Ctrl+V.
                </p>
              </div>

              <div
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-5"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] border border-white/[0.10] font-semibold text-white mb-3 text-xs">
                  2
                </div>
                <h3 className="font-semibold text-white mb-1.5 text-sm">
                  2. In-Browser Conversion
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  The local engine decodes pixel buffers and writes out {toFmt.name} files with SSIM quality optimization.
                </p>
              </div>

              <div
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-5"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] border border-white/[0.10] font-semibold text-white mb-3 text-xs">
                  3
                </div>
                <h3 className="font-semibold text-white mb-1.5 text-sm">
                  3. Instant Download
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Save your converted {toFmt.name} images individually or export everything in a single ZIP archive.
                </p>
              </div>
            </div>
          </div>

          {/* Deep Format Comparison */}
          <div
            className="rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6"
            style={{ boxShadow: 'var(--glass-inset)' }}
          >
            <h2 className="font-semibold text-base text-white mb-4">
              {fromFmt.name} vs. {toFmt.name}: Key Differences & Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
              <div>
                <p className="font-semibold text-zinc-200 mb-1.5">
                  About {fromFmt.name} ({fromFmt.ext})
                </p>
                <p className="text-[var(--text-secondary)] mb-3">{fromFmt.desc}</p>
                <p className="text-zinc-400">
                  <strong>Best for:</strong> {fromFmt.supportsTransparency ? 'Transparent logos, UI graphics, illustrations.' : 'High-fidelity photography, print, social media.'}
                </p>
              </div>
              <div>
                <p className="font-semibold text-zinc-200 mb-1.5">
                  About {toFmt.name} ({toFmt.ext})
                </p>
                <p className="text-[var(--text-secondary)] mb-3">{toFmt.desc}</p>
                <p className="text-zinc-400">
                  <strong>Best for:</strong> {toFmt.supportsTransparency ? 'Modern web publishing, responsive assets, favicons.' : 'Universal web compatibility, email attachments.'}
                </p>
              </div>
            </div>
          </div>

          {/* Educational Read-More Cards */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Want to understand the science behind image formats?</h3>
              <p className="text-xs text-zinc-400 mt-1">Read our technical guides on in-browser Web Workers, SSIM perceptual metrics, and format standards.</p>
            </div>
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.12] bg-white/[0.06] px-4 py-2 text-xs font-semibold text-white hover:bg-white/[0.10] transition flex-shrink-0"
            >
              <span>Explore Learn Hub</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </ImageConverterApp>
    </>
  );
}
