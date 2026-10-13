'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SEO_CONVERSION_PAIRS, SEO_COMPRESS_FORMATS } from '@/lib/constants';
import { SupportedFormat } from '@/lib/types';
import { ArrowRight, Check, Zap, Layers } from 'lucide-react';

interface ConversionHubGridProps {
  currentTargetFormat?: SupportedFormat;
  onSelectFormat?: (targetFormat: SupportedFormat) => void;
}

export function ConversionHubGrid({
  currentTargetFormat,
  onSelectFormat,
}: ConversionHubGridProps) {
  const [tab, setTab] = useState<'convert' | 'compress'>('convert');

  const handleChoose = (targetFormat: SupportedFormat) => {
    if (onSelectFormat) {
      onSelectFormat(targetFormat);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-8 pb-4 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            All Conversion & Compression Tools
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)]">
            Choose an option below to immediately configure the converter or visit its dedicated tool.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center rounded-xl border border-white/[0.08] bg-white/[0.03] p-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setTab('convert')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              tab === 'convert'
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Convert ({SEO_CONVERSION_PAIRS.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('compress')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              tab === 'compress'
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Compress ({SEO_COMPRESS_FORMATS.length})</span>
          </button>
        </div>
      </div>

      {/* Grid Content */}
      {tab === 'convert' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SEO_CONVERSION_PAIRS.map((pair) => {
            const isCurrent = currentTargetFormat === pair.to;

            return (
              <div
                key={`${pair.from}-${pair.to}`}
                className={`group relative flex flex-col justify-between p-4 rounded-xl border backdrop-blur-xl transition-all duration-200 ${
                  isCurrent
                    ? 'border-white/25 bg-white/[0.06] shadow-[0_0_24px_rgba(255,255,255,0.06)]'
                    : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.16] hover:bg-white/[0.04]'
                }`}
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <div>
                  {/* Badges */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 font-mono text-xs">
                      <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 font-semibold uppercase text-zinc-300">
                        {pair.from}
                      </span>
                      <span className="text-zinc-500 font-bold">&rarr;</span>
                      <span className="rounded-md border border-white/[0.14] bg-white/[0.08] px-2 py-0.5 font-bold uppercase text-white">
                        {pair.to}
                      </span>
                    </div>

                    {isCurrent && (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-zinc-300 bg-white/[0.08] px-2 py-0.5 rounded-full">
                        <Check className="h-3 w-3" /> Selected
                      </span>
                    )}
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-sm font-semibold text-white mb-1">
                    {pair.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-4">
                    {pair.desc}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-white/[0.04]">
                  <button
                    type="button"
                    onClick={() => handleChoose(pair.to as SupportedFormat)}
                    className="flex-1 rounded-lg bg-white/[0.06] hover:bg-white text-zinc-300 hover:text-zinc-950 px-3 py-1.5 text-xs font-semibold transition cursor-pointer text-center"
                  >
                    Set to {pair.to.toUpperCase()}
                  </button>
                  <Link
                    href={`/convert/${pair.from}-to-${pair.to}`}
                    className="flex items-center justify-center h-8 w-8 rounded-lg border border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/[0.08] transition"
                    title={`Open ${pair.title} page`}
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {SEO_COMPRESS_FORMATS.map((cf) => {
            const isCurrent = currentTargetFormat === cf.format;

            return (
              <div
                key={cf.format}
                className={`group relative flex flex-col justify-between p-5 rounded-xl border backdrop-blur-xl transition-all duration-200 ${
                  isCurrent
                    ? 'border-white/25 bg-white/[0.06] shadow-[0_0_24px_rgba(255,255,255,0.06)]'
                    : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.16] hover:bg-white/[0.04]'
                }`}
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-md border border-white/[0.12] bg-white/[0.06] px-2.5 py-0.5 font-mono text-xs font-bold uppercase text-white">
                      {cf.format}
                    </span>
                    {isCurrent && (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-zinc-300 bg-white/[0.08] px-2 py-0.5 rounded-full">
                        <Check className="h-3 w-3" /> Selected
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-semibold text-white mb-1.5">
                    {cf.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                    {cf.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/[0.04]">
                  <button
                    type="button"
                    onClick={() => handleChoose(cf.format as SupportedFormat)}
                    className="flex-1 rounded-lg bg-white/[0.06] hover:bg-white text-zinc-300 hover:text-zinc-950 px-3 py-1.5 text-xs font-semibold transition cursor-pointer text-center"
                  >
                    Compress {cf.name}
                  </button>
                  <Link
                    href={`/compress/${cf.format}`}
                    className="flex items-center justify-center h-8 w-8 rounded-lg border border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/[0.08] transition"
                    title={`Open ${cf.title} page`}
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Featured Educational Guides Bar */}
      <div
        className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-xl"
        style={{ boxShadow: 'var(--glass-inset)' }}
      >
        <div className="space-y-0.5">
          <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-400">
            Image Engineering Knowledge Base
          </p>
          <p className="text-xs text-zinc-300">
            Learn format anatomies, Deflate &amp; DCT math, and platform upload rules in our in-depth guides.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/learn/what-is-webp"
            className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-zinc-300 hover:text-white hover:bg-white/[0.08] transition"
          >
            What is WebP?
          </Link>
          <Link
            href="/learn/what-is-png"
            className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-zinc-300 hover:text-white hover:bg-white/[0.08] transition"
          >
            What is PNG?
          </Link>
          <Link
            href="/learn/what-is-ico"
            className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-zinc-300 hover:text-white hover:bg-white/[0.08] transition"
          >
            Favicon.ico
          </Link>
          <Link
            href="/learn"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-white hover:text-zinc-300 ml-1 transition"
          >
            <span>All 28 Guides</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
