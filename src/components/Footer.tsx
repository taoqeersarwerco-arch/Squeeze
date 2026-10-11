'use client';

import React from 'react';
import Link from 'next/link';
import { SEO_COMPRESS_FORMATS } from '@/lib/constants';
import { ShieldCheck, Zap, Lock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-zinc-950/90 pt-16 pb-20 text-xs text-zinc-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top 3 Trust Value Props in Double-Bezel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pb-12 border-b border-white/10">
          <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-4.5 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 flex-shrink-0">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">100% Client-Side Privacy</p>
              <p className="mt-1 leading-relaxed text-zinc-400 text-xs">Zero network uploads. Images remain strictly on your local machine.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-4.5 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/15 border border-indigo-500/25 text-indigo-400 flex-shrink-0">
              <Zap className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Instant Parallel Compute</p>
              <p className="mt-1 leading-relaxed text-zinc-400 text-xs">Powered by multi-threaded Web Workers and OffscreenCanvas hardware acceleration.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-4.5 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-500/25 text-violet-400 flex-shrink-0">
              <Lock className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Zero Paywalls & Limits</p>
              <p className="mt-1 leading-relaxed text-zinc-400 text-xs">No account registration or file size artificial gates. Unlimited batch conversions.</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/10">
          {/* Col 1: Popular Converters */}
          <div>
            <p className="font-bold text-white uppercase tracking-wider text-[11px] mb-3.5">
              Popular Converters
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/convert/png-to-ico" className="hover:text-indigo-400 transition-colors">
                  PNG to ICO Favicon
                </Link>
              </li>
              <li>
                <Link href="/convert/svg-to-png" className="hover:text-indigo-400 transition-colors">
                  SVG to Transparent PNG
                </Link>
              </li>
              <li>
                <Link href="/convert/jpg-to-webp" className="hover:text-indigo-400 transition-colors">
                  JPG to WebP
                </Link>
              </li>
              <li>
                <Link href="/convert/png-to-svg" className="hover:text-indigo-400 transition-colors">
                  PNG to SVG Vector
                </Link>
              </li>
              <li>
                <Link href="/convert/webp-to-jpg" className="hover:text-indigo-400 transition-colors">
                  WebP to JPG
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Compressors */}
          <div>
            <p className="font-bold text-white uppercase tracking-wider text-[11px] mb-3.5">
              Lossless Compression
            </p>
            <ul className="space-y-2.5">
              {SEO_COMPRESS_FORMATS.map((cf) => (
                <li key={cf.format}>
                  <Link href={`/compress/${cf.format}`} className="hover:text-indigo-400 transition-colors">
                    Compress {cf.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: More Conversions */}
          <div>
            <p className="font-bold text-white uppercase tracking-wider text-[11px] mb-3.5">
              Icon & Vector Tools
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/convert/svg-to-ico" className="hover:text-indigo-400 transition-colors">
                  SVG to ICO
                </Link>
              </li>
              <li>
                <Link href="/convert/ico-to-png" className="hover:text-indigo-400 transition-colors">
                  ICO to PNG
                </Link>
              </li>
              <li>
                <Link href="/convert/jpg-to-ico" className="hover:text-indigo-400 transition-colors">
                  JPG to ICO
                </Link>
              </li>
              <li>
                <Link href="/convert/png-to-jpg" className="hover:text-indigo-400 transition-colors">
                  PNG to JPG
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & About */}
          <div>
            <p className="font-bold text-white uppercase tracking-wider text-[11px] mb-3.5">
              Architecture & Legal
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/privacy" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition-colors">
                  About Technology
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400">
          <p>&copy; 2026 Squeeze. Engineered with precision. 100% In-Browser Image Engine.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Offline Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
