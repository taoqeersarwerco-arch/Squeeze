import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { SEO_COMPRESS_FORMATS, FORMATS } from '@/lib/constants';
import { SupportedFormat } from '@/lib/types';
import { ImageConverterApp } from '@/components/ImageConverterApp';
import { generateToolPageSchema, BASE_URL } from '@/lib/schema';
import { ShieldCheck, ArrowRight, Gauge } from 'lucide-react';

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

  const fmtMeta = FORMATS[match.format as SupportedFormat];
  const url = `${BASE_URL}/compress/${format}`;
  const title = `Compress ${fmtMeta.name} Images Online (Lossless & Free)`;
  const description = `Reduce ${fmtMeta.name} file size up to 80% with perceptual SSIM quality protection. 100% in-browser compression—your files never leave your device.`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    keywords: [
      `compress ${match.format}`,
      `reduce ${match.format} file size`,
      `compress ${match.name} without losing quality`,
      `free online ${match.format} compressor`,
      `private ${match.format} compression`,
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

export default async function CompressFormatPage({ params }: PageProps) {
  const { format } = await params;
  const match = SEO_COMPRESS_FORMATS.find((f) => f.format === format);

  if (!match) {
    notFound();
  }

  const fmtMeta = FORMATS[match.format as SupportedFormat];
  const pageUrl = `${BASE_URL}/compress/${format}`;

  const schema = generateToolPageSchema({
    name: `Squeeze ${fmtMeta.name} Image Compressor`,
    description: `Compress and optimize ${fmtMeta.name} images online with 100% in-browser privacy and SSIM quality preservation.`,
    url: pageUrl,
    inputFormat: match.format,
    outputFormat: match.format,
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Compression Tools', url: `${BASE_URL}/#compress` },
      { name: `Compress ${fmtMeta.name}` },
    ],
    howToSteps: [
      {
        name: `Upload ${fmtMeta.name} Images`,
        text: `Drag and drop your ${fmtMeta.ext} files into the uploader or paste directly from your clipboard.`,
      },
      {
        name: 'In-Browser Compression Engine',
        text: `Squeeze compresses your ${fmtMeta.name} locally in browser memory, running SSIM algorithms to remove redundant data while preserving visual fidelity.`,
      },
      {
        name: 'Download Optimized Images',
        text: `Save your lighter ${fmtMeta.name} files immediately or download all items in a single ZIP archive.`,
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
        initialTargetFormat={match.format as SupportedFormat}
        pageTitle={`Compress ${fmtMeta.name} Images`}
        pageSubtitle={`Reduce ${fmtMeta.name} file sizes up to 80% with perceptual SSIM quality protection. Runs 100% in your browser.`}
      >
        <section className="pt-8 text-zinc-300 space-y-10">
          {/* AEO / GEO Answer Island */}
          <div
            className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-5 sm:p-6 backdrop-blur-xl relative overflow-hidden"
            style={{ boxShadow: 'var(--glass-inset)' }}
          >
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="h-4 w-4" />
              <span>AEO Answer Island • Compression Summary</span>
            </div>
            <p className="text-sm sm:text-[15px] text-zinc-200 leading-relaxed font-normal">
              <strong>{fmtMeta.name} Compression:</strong> Squeeze reduces {fmtMeta.name} file weight entirely inside your browser using HTML5 Canvas and mathematical SSIM (Structural Similarity Index Measure) scoring. Files are never uploaded to remote servers or stored in third-party databases. By targeting an SSIM threshold &ge; 0.95, Squeeze removes invisible high-frequency pixel redundancy while retaining razor-sharp edges and color fidelity.
            </p>
          </div>

          {/* Technical Specification Matrix */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Compression Technical Matrix
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
                    <td className="py-3 px-4 sm:px-6 font-medium text-white">Execution Environment</td>
                    <td className="py-3 px-4 sm:px-6 text-zinc-400">Client-Side (HTML5 Canvas & Web Workers)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium text-white">Privacy Standard</td>
                    <td className="py-3 px-4 sm:px-6 text-emerald-400">Zero Server Upload (0 bytes transmitted)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium text-white">Target Format</td>
                    <td className="py-3 px-4 sm:px-6 text-zinc-400">{fmtMeta.name} ({fmtMeta.ext})</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium text-white">Quality Guard Metric</td>
                    <td className="py-3 px-4 sm:px-6 text-zinc-400">Mathematical SSIM (Perceptual Structural Similarity)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium text-white">Transparency Preservation</td>
                    <td className="py-3 px-4 sm:px-6 text-zinc-400">
                      {fmtMeta.supportsTransparency ? 'Supported (Alpha channel preserved)' : 'N/A (Filled with matte background)'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium text-white">Batch Export</td>
                    <td className="py-3 px-4 sm:px-6 text-zinc-400">Multi-threaded queue with instant ZIP archive packaging</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium text-white">Cost & Rate Limits</td>
                    <td className="py-3 px-4 sm:px-6 text-zinc-400">100% Free ($0) • No caps or subscriptions</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Advantages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm leading-relaxed">
            <div
              className="rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-5 sm:p-6"
              style={{ boxShadow: 'var(--glass-inset)' }}
            >
              <div className="flex items-center gap-2.5 text-white font-semibold text-sm mb-2">
                <Gauge className="h-4 w-4 text-emerald-400" />
                <span>Perceptual SSIM Quality Control</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Standard compressors lower quality arbitrarily, resulting in blurry details and blocky artifacts. Squeeze calculates mathematical SSIM scores against your original image, discovering the optimal compression sweet spot where visual differences remain undetectable to the human eye.
              </p>
            </div>

            <div
              className="rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-5 sm:p-6"
              style={{ boxShadow: 'var(--glass-inset)' }}
            >
              <div className="flex items-center gap-2.5 text-white font-semibold text-sm mb-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Never upload personal photos, receipts, or confidential client artwork to remote servers. All image compression occurs locally in your device&apos;s memory via sandboxed Web Workers.
              </p>
            </div>
          </div>

          {/* Link to Learn Hub */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Curious how image compression works mathematically?</h3>
              <p className="text-xs text-zinc-400 mt-1">Read our deep-dive guide on lossy vs. lossless algorithms, DCT quantization, and SSIM metrics.</p>
            </div>
            <Link
              href="/learn/how-image-compression-works"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.12] bg-white/[0.06] px-4 py-2 text-xs font-semibold text-white hover:bg-white/[0.10] transition flex-shrink-0"
            >
              <span>Read the Guide</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </ImageConverterApp>
    </>
  );
}
