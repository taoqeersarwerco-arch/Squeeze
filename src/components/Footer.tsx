'use client';

import React from 'react';
import Link from 'next/link';
import { SEO_CONVERSION_PAIRS, SEO_COMPRESS_FORMATS } from '@/lib/constants';
import { ShieldCheck, Zap, Lock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/80 pt-12 pb-16 text-xs text-zinc-500 dark:text-zinc-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top 3 Trust Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">100% Client-Side Privacy</p>
              <p className="mt-1 leading-relaxed">No files ever leave your device or touch a server. Process confidential assets safely.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Zero Latency Processing</p>
              <p className="mt-1 leading-relaxed">Powered by HTML5 Web Workers and OffscreenCanvas for instant conversion speeds.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex-shrink-0">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Free Forever & Unlimited</p>
              <p className="mt-1 leading-relaxed">No signups, subscriptions, or file size paywalls. Convert batch photos in one click.</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-zinc-200 dark:border-zinc-800">
          {/* Col 1: Popular Converters */}
          <div>
            <p className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-[11px] mb-3">
              Popular Tools
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/convert/png-to-ico" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  PNG to ICO Favicon
                </Link>
              </li>
              <li>
                <Link href="/convert/svg-to-png" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  SVG to Transparent PNG
                </Link>
              </li>
              <li>
                <Link href="/convert/jpg-to-webp" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  JPG to WebP
                </Link>
              </li>
              <li>
                <Link href="/convert/png-to-svg" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  PNG to SVG Vector
                </Link>
              </li>
              <li>
                <Link href="/convert/webp-to-jpg" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  WebP to JPG
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Compressors */}
          <div>
            <p className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-[11px] mb-3">
              Compression Tools
            </p>
            <ul className="space-y-2">
              {SEO_COMPRESS_FORMATS.map((cf) => (
                <li key={cf.format}>
                  <Link href={`/compress/${cf.format}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                    Compress {cf.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: More Conversions */}
          <div>
            <p className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-[11px] mb-3">
              More Formats
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/convert/svg-to-ico" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  SVG to ICO
                </Link>
              </li>
              <li>
                <Link href="/convert/ico-to-png" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  ICO to PNG
                </Link>
              </li>
              <li>
                <Link href="/convert/jpg-to-ico" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  JPG to ICO
                </Link>
              </li>
              <li>
                <Link href="/convert/png-to-jpg" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  PNG to JPG
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & About (Required for AdSense) */}
          <div>
            <p className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-[11px] mb-3">
              About & Legal
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  About Technology
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400">
          <p>&copy; 2026 Squeeze. All rights reserved. 100% In-Browser Image Engine.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Offline Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
