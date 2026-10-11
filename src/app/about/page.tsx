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
    <div className="min-h-[100dvh] flex flex-col bg-[#090B0E] text-zinc-100">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-white/10 bg-zinc-900/60 backdrop-blur-2xl p-6 sm:p-12 shadow-2xl space-y-9 text-sm leading-relaxed text-zinc-300">
          <div className="border-b border-white/10 pb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              About Squeeze
            </h1>
            <p className="text-sm text-zinc-400 mt-2">
              Next-generation perceptual image compression engineered for absolute privacy and zero-latency performance.
            </p>
          </div>

          <section className="space-y-3.5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
              <Zap className="h-5 w-5 text-indigo-400" /> The Mission
            </h2>
            <p>
              Traditional image converter websites force you to upload your files to remote servers, wait in queue lines, and worry about whether your photos or sensitive graphics are being stored.
            </p>
            <p>
              Squeeze was built to eliminate this paradigm. By harnessing contemporary browser APIs&mdash;including <strong>OffscreenCanvas, multi-threaded Web Workers, and hardware thread concurrency</strong>&mdash;we deliver desktop-class image processing entirely within your browser.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
              <Cpu className="h-5 w-5 text-cyan-400" /> Core Engineering Foundations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 p-5 bg-white/5 backdrop-blur-md">
                <p className="font-bold text-white mb-1.5">SSIM Quality Metric</p>
                <p className="text-xs text-zinc-400">
                  Instead of standard lossy quantization, we measure Structural Similarity Index (SSIM) to protect edge sharpness and contrast.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 p-5 bg-white/5 backdrop-blur-md">
                <p className="font-bold text-white mb-1.5">True Multi-Res ICO Packing</p>
                <p className="text-xs text-zinc-400">
                  Binary encoder that bundles 16px, 32px, 48px, 64px, 128px, and 256px frames into a single genuine Windows favicon.ico.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 p-5 bg-white/5 backdrop-blur-md">
                <p className="font-bold text-white mb-1.5">Color-Quantized Vector Tracing</p>
                <p className="text-xs text-zinc-400">
                  Converts bitmap pixel matrices into mathematical SVG path contours for resolution-independent scalability.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 p-5 bg-white/5 backdrop-blur-md">
                <p className="font-bold text-white mb-1.5">Zero-Leak Privacy Guarantee</p>
                <p className="text-xs text-zinc-400">
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
