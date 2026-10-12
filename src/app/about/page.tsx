import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Cpu, Zap, Shield, Image as ImageIcon } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Squeeze',
  description: 'How Squeeze converts and compresses images locally in your browser with zero data collection.',
};

export default function AboutPage() {
  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-[var(--background)] text-zinc-100">
      <Navbar />

      <main className="relative z-10 flex-1 py-12 sm:py-16 px-4 sm:px-6">
        <div
          className="mx-auto max-w-3xl rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl p-6 sm:p-10 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.7)] space-y-9 text-sm leading-relaxed text-zinc-300"
          style={{ boxShadow: 'var(--glass-inset)' }}
        >
          <div className="border-b border-white/[0.06] pb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              About Squeeze
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              A fast, privacy-first image converter that runs entirely in your browser.
            </p>
          </div>

          <section className="space-y-3.5">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-zinc-400" /> The Mission
            </h2>
            <p className="text-[var(--text-secondary)]">
              Most image conversion sites make you upload your photos to remote servers, wait in queue lines, and wonder where your images end up.
            </p>
            <p className="text-[var(--text-secondary)]">
              Squeeze was built to solve this. Using modern web standards, your computer or phone handles the entire conversion locally. Your images never leave your device, processing starts instantly, and no one else ever sees your work.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Cpu className="h-4 w-4 text-zinc-400" /> Technology Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div
                className="rounded-xl border border-white/[0.06] p-4 bg-white/[0.02]"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <p className="font-semibold text-white text-sm mb-1">Smart Quality Preservation</p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Measures visual similarity before and after compression to preserve edge sharpness and contrast where human eyes notice it most.
                </p>
              </div>

              <div
                className="rounded-xl border border-white/[0.06] p-4 bg-white/[0.02]"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <p className="font-semibold text-white text-sm mb-1">Multi-Resolution Favicon Packing</p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Bundles 16px, 32px, 48px, 64px, and 128px icon frames into a single genuine Windows .ico file for seamless favicon support.
                </p>
              </div>

              <div
                className="rounded-xl border border-white/[0.06] p-4 bg-white/[0.02]"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <p className="font-semibold text-white text-sm mb-1">Vector Shape Tracing</p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Traces bitmap image pixels into clean SVG vector path outlines for infinite scaling without pixelation.
                </p>
              </div>

              <div
                className="rounded-xl border border-white/[0.06] p-4 bg-white/[0.02]"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <p className="font-semibold text-white text-sm mb-1">Guaranteed Privacy</p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Zero files sent across the network. Works smoothly even if you disconnect from the internet after loading the page.
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
