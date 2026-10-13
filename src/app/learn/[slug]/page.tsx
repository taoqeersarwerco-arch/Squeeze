import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ALL_ARTICLES, getArticleBySlug } from '@/lib/articles';
import { ShieldCheck, ArrowRight, Clock, Calendar, ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article Not Found | Squeeze' };
  }

  const url = `https://www.trysqueeze.online/learn/${slug}`;

  return {
    title: article.seoTitle,
    description: article.description,
    keywords: article.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.modifiedAt,
      authors: [article.author],
      tags: article.keywords,
      images: [
        {
          url: 'https://www.trysqueeze.online/opengraph-image',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  };
}

export default async function LearnArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const url = `https://www.trysqueeze.online/learn/${slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${url}#article`,
        headline: article.title,
        description: article.description,
        url,
        inLanguage: 'en-US',
        datePublished: article.publishedAt,
        dateModified: article.modifiedAt,
        author: {
          '@type': 'Organization',
          name: article.author,
          url: 'https://www.trysqueeze.online',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Squeeze',
          url: 'https://www.trysqueeze.online',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.trysqueeze.online/favicon.ico',
          },
        },
        keywords: article.keywords.join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.trysqueeze.online',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Learn Hub',
            item: 'https://www.trysqueeze.online/learn',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
          },
        ],
      },
    ],
  };

  // Select 3 related articles from the catalog
  const relatedArticles = ALL_ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-transparent text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />

      <main className="relative z-10 flex-1">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 pt-12 sm:pt-20 pb-20">
          {/* Back link */}
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to All Learning Guides</span>
          </Link>

          {/* Article Header Metadata */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-zinc-400 mb-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {article.category}
            </span>
            <span>&bull;</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-zinc-500" />
              {article.readTime}
            </span>
            <span>&bull;</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-zinc-500" />
              Updated Oct 2026
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            {article.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {article.description}
          </p>

          {/* Author Byline */}
          <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/[0.06] text-xs text-zinc-400">
            <div className="h-7 w-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              S
            </div>
            <div>
              <span className="text-zinc-200 font-medium">{article.author}</span>
              <p className="text-[11px] text-zinc-500">Zero-Upload Client Architecture Research</p>
            </div>
          </div>

          {/* Article Content */}
          <div className="mt-8 prose-squeeze">
            {article.content}
          </div>

          {/* In-Browser Tool Promotion Banner */}
          <div
            className="mt-14 rounded-2xl border border-white/[0.10] bg-white/[0.02] p-6 sm:p-7 backdrop-blur-xl"
            style={{ boxShadow: 'var(--glass-inset)' }}
          >
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Squeeze Image Engine</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Ready to convert or compress images with 100% privacy?
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed mb-5">
              Experience zero server uploads. All WebP, PNG, JPG, SVG, and multi-resolution ICO conversions run entirely inside your browser using sandboxed Web Workers.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-zinc-900 hover:bg-zinc-100 transition shadow-sm"
              >
                <span>Launch In-Browser Converter</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/convert/png-to-webp"
                className="inline-flex items-center gap-1 rounded-lg border border-white/[0.12] bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-zinc-300 hover:bg-white/[0.08] hover:text-white transition"
              >
                PNG to WebP
              </Link>
              <Link
                href="/convert/png-to-ico"
                className="inline-flex items-center gap-1 rounded-lg border border-white/[0.12] bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-zinc-300 hover:bg-white/[0.08] hover:text-white transition"
              >
                PNG to ICO
              </Link>
              <Link
                href="/compress/webp"
                className="inline-flex items-center gap-1 rounded-lg border border-white/[0.12] bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-zinc-300 hover:bg-white/[0.08] hover:text-white transition"
              >
                Compress WebP
              </Link>
            </div>
          </div>

          {/* Related Guides Section */}
          <div className="mt-12 pt-8 border-t border-white/[0.06]">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4">
              Explore Related Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/learn/${rel.slug}`}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-white/[0.12] hover:bg-white/[0.04] transition group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                      {rel.category}
                    </span>
                    <h4 className="text-xs font-medium text-zinc-200 group-hover:text-white leading-snug">
                      {rel.title}
                    </h4>
                  </div>
                  <span className="text-[10px] text-zinc-500 mt-3 block">
                    {rel.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
