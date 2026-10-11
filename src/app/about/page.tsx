import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Cpu, Zap, Shield, Sparkles } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Technology | Squeeze',
  description: 'Learn how Squeeze uses in-browser Web Workers, SSIM perceptual metrics, and WebAssembly to optimize images at zero compute cost.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5">
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
              About Squeeze
            </h1>
            <p className="text-sm text-zinc-500 mt-2">
              Next-generation perceptual image compression engineered for absolute privacy and speed.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Zap className="h-5 w-5 text-indigo-500" /> The Mission
            </h2>
            <p>
              Traditional image converter websites force you to upload your files to remote servers, wait in queue lines, and worry about whether your photos or sensitive graphics are being stored.
            </p>
            <p>
              Squeeze was built to eliminate this paradigm. By harnessing contemporary browser APIs&mdash;including <strong>OffscreenCanvas, Web Workers, and multi-core thread concurrency</strong>&mdash;we deliver desktop-class image processing entirely within your browser.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Cpu className="h-5 w-5 text-blue-500" /> Core Engineering Foundations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-850">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">SSIM Quality Metric</p>
                <p className="text-xs text-zinc-500">
                  Instead of standard lossy quantization, we measure Structural Similarity Index (SSIM) to protect edge sharpness and contrast.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-850">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">True Multi-Res ICO Packing</p>
                <p className="text-xs text-zinc-500">
                  Binary encoder that bundles 16px, 32px, 48px, 64px, 128px, and 256px frames into a single genuine Windows favicon.ico.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-850">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Color-Quantized Vector Tracing</p>
                <p className="text-xs text-zinc-500">
                  Converts bitmap pixel matrices into mathematical SVG path contours for resolution-independent scalability.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-850">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Zero-Leak Privacy Guarantee</p>
                <p className="text-xs text-zinc-500">
                  Zero megabytes sent over the network. Works seamlessly even if you disconnect your WiFi once the page is loaded.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
