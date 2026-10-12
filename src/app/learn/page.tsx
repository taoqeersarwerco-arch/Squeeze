import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Learn - Squeeze',
  description: 'Understand how image conversion and compression work, learn about data privacy, and choose the right format for your needs.',
};

const articles = [
  {
    slug: 'how-image-conversion-works',
    title: 'How Image Conversion Works',
    description: 'What image formats are, why you would convert between them, and what happens when a file changes format.',
    readTime: '4 min read',
  },
  {
    slug: 'how-image-compression-works',
    title: 'How Image Compression Works',
    description: 'What happens when a file gets smaller, why quality sometimes changes, and how Squeeze finds the right balance.',
    readTime: '5 min read',
  },
  {
    slug: 'your-data-stays-private',
    title: 'Your Data Stays Private',
    description: 'How Squeeze processes everything on your device without uploading anything to a server.',
    readTime: '3 min read',
  },
  {
    slug: 'what-happens-to-your-data',
    title: 'What Happens to Your Data',
    description: 'Full transparency on what data we collect, what we do with it, and what we never touch.',
    readTime: '3 min read',
  },
  {
    slug: 'choosing-the-right-format',
    title: 'Choosing the Right Format',
    description: 'A practical guide to when you should use JPG, PNG, WebP, SVG, or ICO.',
    readTime: '4 min read',
  },
];

export default function LearnPage() {
  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-transparent text-zinc-100">
      <Navbar />

      <main className="relative z-10 flex-1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-12 sm:pt-20 pb-20">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Learn
            </h1>
            <p className="mt-3 text-[15px] text-[var(--text-secondary)] max-w-lg leading-relaxed">
              Short, clear guides on how image conversion works, how your data is handled, and which format to choose.
            </p>
          </div>

          {/* Article Grid */}
          <div className="space-y-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/learn/${article.slug}`}
                className="group block rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-150"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-base font-medium text-white group-hover:text-zinc-100">
                      {article.title}
                    </h2>
                    <p className="mt-1.5 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {article.description}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-[11px] font-medium text-zinc-600 mt-0.5">
                    {article.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 pt-8 border-t border-white/[0.06] text-center">
            <p className="text-sm text-[var(--text-secondary)]">
              Ready to get started?
            </p>
            <Link
              href="/"
              className="inline-block mt-3 rounded-lg bg-white text-zinc-900 px-5 py-2 text-sm font-semibold hover:bg-zinc-100 transition"
            >
              Open Squeeze
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
