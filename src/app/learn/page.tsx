import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ALL_ARTICLES } from '@/lib/articles';
import { ShieldCheck, BookOpen, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Image Conversion & Compression Guides | Squeeze Learn Hub',
  description:
    'In-depth technical guides on raster format anatomies, Deflate & DCT mathematics, platform upload restrictions, and client-side zero-upload privacy.',
  alternates: {
    canonical: 'https://www.trysqueeze.online/learn',
  },
  openGraph: {
    title: 'Squeeze Learn Hub • Digital Image Engineering Guides',
    description:
      'Master the engineering behind modern image formats, lossless Deflate, DCT quantization, and zero-upload client privacy.',
    url: 'https://www.trysqueeze.online/learn',
    type: 'website',
    images: [
      {
        url: 'https://www.trysqueeze.online/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Squeeze Learn Hub',
      },
    ],
  },
};

const CATEGORIES = [
  'Format Fundamentals',
  'Platform Requirements',
  'Compression Science',
  'Web Performance & Engineering',
  'Privacy & Architecture',
] as const;

export default function LearnPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://www.trysqueeze.online/learn#collection',
    url: 'https://www.trysqueeze.online/learn',
    name: 'Squeeze Image Engineering Learn Hub',
    description:
      'Educational guide library covering image format specifications, compression algorithms, and client-side web media best practices.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: ALL_ARTICLES.map((art, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://www.trysqueeze.online/learn/${art.slug}`,
        name: art.title,
      })),
    },
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-transparent text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />

      <main className="relative z-10 flex-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-12 sm:pt-20 pb-20">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Technical Knowledge Base</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Image Engineering Hub
            </h1>
            <p className="mt-3.5 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              Exhaustive, engineering-first guides on how modern raster and vector image formats work under the hood, why platforms restrict file types, and how to optimize digital media with zero-upload privacy.
            </p>
          </div>

          {/* AEO / GEO Answer Island */}
          <div
            className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-5 sm:p-6 backdrop-blur-xl relative overflow-hidden mb-12"
            style={{ boxShadow: 'var(--glass-inset)' }}
          >
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="h-4 w-4" />
              <span>AEO Overview • Digital Image Processing</span>
            </div>
            <p className="text-sm sm:text-[15px] text-zinc-200 leading-relaxed font-normal m-0">
              Digital image processing balances three competing demands: <strong>visual fidelity</strong>, <strong>byte payload size</strong>, and <strong>decoding speed</strong>. Modern formats like WebP and SVG resolve historical trade-offs through intra-frame prediction and mathematical vector coordinates, enabling websites to achieve sub-second load times while preserving crisp details across Retina displays.
            </p>
          </div>

          {/* Grouped Articles by Category */}
          <div className="space-y-12">
            {CATEGORIES.map((cat) => {
              const catArticles = ALL_ARTICLES.filter((a) => a.category === cat);
              if (catArticles.length === 0) return null;

              return (
                <section key={cat}>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {cat}
                    </h2>
                    <span className="text-xs text-zinc-500 font-medium">
                      {catArticles.length} {catArticles.length === 1 ? 'article' : 'articles'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {catArticles.map((article) => (
                      <Link
                        key={article.slug}
                        href={`/learn/${article.slug}`}
                        className="group flex flex-col justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-200"
                        style={{ boxShadow: 'var(--glass-inset)' }}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                              {article.category}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500">
                              <Clock className="h-3 w-3" />
                              {article.readTime}
                            </span>
                          </div>
                          <h3 className="text-base font-semibold text-zinc-100 group-hover:text-white leading-snug">
                            {article.title}
                          </h3>
                          <p className="mt-2 text-xs text-zinc-400 leading-relaxed line-clamp-3">
                            {article.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs font-medium text-emerald-400 group-hover:text-emerald-300">
                          <span>Read full guide</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* CTA Box */}
          <div
            className="mt-16 rounded-2xl border border-white/[0.10] bg-white/[0.02] p-6 sm:p-8 text-center backdrop-blur-xl"
            style={{ boxShadow: 'var(--glass-inset)' }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Ready to process images with complete privacy?
            </h2>
            <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed mb-6">
              Convert between WebP, PNG, JPG, SVG, and ICO entirely in your device&apos;s browser memory. Zero file uploads, zero server queues.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-zinc-900 px-6 py-2.5 text-sm font-semibold hover:bg-zinc-100 transition shadow-lg shadow-white/5"
            >
              <span>Launch Squeeze Converter</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
