'use client';

import React from 'react';
import Link from 'next/link';
import { SEO_COMPRESS_FORMATS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.06] bg-black/40 backdrop-blur-md pt-14 pb-16 text-xs text-zinc-500">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Trust Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-10 border-b border-white/[0.06]">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="font-medium text-zinc-300 text-sm">Private by design</p>
            <p className="mt-1 text-zinc-500 text-xs leading-relaxed">Images are processed on your device. Nothing is uploaded or stored.</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="font-medium text-zinc-300 text-sm">Fast processing</p>
            <p className="mt-1 text-zinc-500 text-xs leading-relaxed">Runs on your browser&apos;s built-in capabilities. Multiple images at once.</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="font-medium text-zinc-300 text-sm">Completely free</p>
            <p className="mt-1 text-zinc-500 text-xs leading-relaxed">No account needed. No file size limits. No watermarks.</p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-white/[0.06]">
          {/* Col 1: Popular Converters */}
          <div>
            <p className="font-medium text-zinc-400 text-[11px] uppercase tracking-wider mb-3">
              Converters
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/convert/png-to-ico" className="hover:text-zinc-200 transition-colors">
                  PNG to ICO
                </Link>
              </li>
              <li>
                <Link href="/convert/svg-to-png" className="hover:text-zinc-200 transition-colors">
                  SVG to PNG
                </Link>
              </li>
              <li>
                <Link href="/convert/jpg-to-webp" className="hover:text-zinc-200 transition-colors">
                  JPG to WebP
                </Link>
              </li>
              <li>
                <Link href="/convert/png-to-svg" className="hover:text-zinc-200 transition-colors">
                  PNG to SVG
                </Link>
              </li>
              <li>
                <Link href="/convert/webp-to-jpg" className="hover:text-zinc-200 transition-colors">
                  WebP to JPG
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Compressors */}
          <div>
            <p className="font-medium text-zinc-400 text-[11px] uppercase tracking-wider mb-3">
              Compression
            </p>
            <ul className="space-y-2">
              {SEO_COMPRESS_FORMATS.map((cf) => (
                <li key={cf.format}>
                  <Link href={`/compress/${cf.format}`} className="hover:text-zinc-200 transition-colors">
                    Compress {cf.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Resources & Guides */}
          <div>
            <p className="font-medium text-zinc-400 text-[11px] uppercase tracking-wider mb-3">
              Guides &amp; Specs
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/learn" className="hover:text-zinc-200 transition-colors">
                  Learn Hub
                </Link>
              </li>
              <li>
                <Link href="/learn/what-is-webp" className="hover:text-zinc-200 transition-colors">
                  What is WebP?
                </Link>
              </li>
              <li>
                <Link href="/learn/what-is-png" className="hover:text-zinc-200 transition-colors">
                  What is PNG?
                </Link>
              </li>
              <li>
                <Link href="/learn/what-is-ico" className="hover:text-zinc-200 transition-colors">
                  Favicon.ico Guide
                </Link>
              </li>
              <li>
                <Link href="/learn/what-is-ssim-image-quality" className="hover:text-zinc-200 transition-colors">
                  SSIM Compression
                </Link>
              </li>
              <li>
                <Link href="/developers" className="hover:text-zinc-200 transition-colors">
                  Developers &amp; API
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-zinc-200 transition-colors">
                  About Squeeze
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div>
            <p className="font-medium text-zinc-400 text-[11px] uppercase tracking-wider mb-3">
              Legal
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-zinc-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-zinc-200 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-600">
          <p>&copy; 2026 Squeeze</p>
        </div>
      </div>
    </footer>
  );
}
