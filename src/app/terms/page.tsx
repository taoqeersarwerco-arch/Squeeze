import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Squeeze',
  description: 'Terms of Service and usage conditions for Squeeze image optimizer.',
};

export default function TermsPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#090B0E] text-zinc-100">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-white/10 bg-zinc-900/60 backdrop-blur-2xl p-6 sm:p-12 shadow-2xl space-y-7 text-sm leading-relaxed text-zinc-300">
          <div className="border-b border-white/10 pb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Terms of Service
            </h1>
            <p className="text-xs text-zinc-400 mt-1">Effective Date: October 2026</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using Squeeze (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue use of the site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">
              2. Permitted Use & Ownership
            </h2>
            <p>
              Squeeze is provided free of charge for personal and commercial image conversion and optimization. Because files are converted entirely client-side, you retain 100% intellectual property ownership of all images processed through our interface.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">
              3. Disclaimer of Warranty
            </h2>
            <p>
              The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. Squeeze does not warrant that conversions will be error-free or uninterrupted.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">
              4. Modifications
            </h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of Squeeze signifies acceptance of revised terms.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
