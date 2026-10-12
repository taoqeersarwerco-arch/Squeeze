import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Squeeze',
  description: 'Terms of Service and usage conditions for Squeeze image optimizer.',
};

export default function TermsPage() {
  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-[var(--background)] text-zinc-100">
      <Navbar />

      <main className="relative z-10 flex-1 py-12 sm:py-16 px-4 sm:px-6">
        <div
          className="mx-auto max-w-3xl rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl p-6 sm:p-10 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.7)] space-y-7 text-sm leading-relaxed text-zinc-300"
          style={{ boxShadow: 'var(--glass-inset)' }}
        >
          <div className="border-b border-white/[0.06] pb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Terms of Service
            </h1>
            <p className="text-xs text-zinc-500 mt-1">Effective Date: October 2026</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white">
              1. Acceptance of Terms
            </h2>
            <p className="text-[var(--text-secondary)]">
              By accessing and using Squeeze (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue use of the site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white">
              2. Permitted Use & Ownership
            </h2>
            <p className="text-[var(--text-secondary)]">
              Squeeze is provided free of charge for personal and commercial image conversion and optimization. Because files are converted entirely client-side, you retain 100% intellectual property ownership of all images processed through our interface.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white">
              3. Disclaimer of Warranty
            </h2>
            <p className="text-[var(--text-secondary)]">
              The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. Squeeze does not warrant that conversions will be completely error-free or uninterrupted across all hardware types.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white">
              4. Modifications
            </h2>
            <p className="text-[var(--text-secondary)]">
              We reserve the right to modify these terms at any time. Continued use of Squeeze signifies acceptance of revised terms.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
