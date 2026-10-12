import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Squeeze',
  description: 'Squeeze is built on a 100% client-side privacy model. Your image files are never uploaded, collected, or shared.',
};

export default function PrivacyPage() {
  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-transparent text-zinc-100">
      <Navbar />

      <main className="relative z-10 flex-1 py-12 sm:py-16 px-4 sm:px-6">
        <div
          className="mx-auto max-w-3xl rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl p-6 sm:p-10 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.7)] space-y-7 text-sm leading-relaxed text-zinc-300"
          style={{ boxShadow: 'var(--glass-inset)' }}
        >
          <div className="border-b border-white/[0.06] pb-6">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 text-xs font-medium text-zinc-300 mb-3">
              <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" /> Client-Side Privacy
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Privacy Policy
            </h1>
            <p className="text-xs text-zinc-500 mt-1">Last updated: October 2026</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Lock className="h-4 w-4 text-zinc-400" /> 1. In-Browser Local Processing
            </h2>
            <p>
              At <strong>Squeeze</strong>, your privacy is our primary priority. Unlike traditional converter websites that upload your files to remote servers, Squeeze processes <strong>100% of your images locally in your browser</strong> using built-in browser technologies.
            </p>
            <p className="text-[var(--text-secondary)]">
              Your files never leave your device. We do not transmit, inspect, store, or copy your images anywhere.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <EyeOff className="h-4 w-4 text-zinc-400" /> 2. Personal Data & Accounts
            </h2>
            <p>
              We do not require user account registration, email addresses, or payment details to use the converter. We do not sell, rent, or monetize your personal information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white">
              3. Advertising & Cookies
            </h2>
            <p className="text-[var(--text-secondary)]">
              To keep Squeeze free for all users worldwide, we may display unobtrusive third-party advertisements (such as Google AdSense). Third-party vendors may use cookies to serve ads based on prior visits. You can manage personalized advertising preferences in your browser or through Google Ads Settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white">
              4. Contact
            </h2>
            <p className="text-[var(--text-secondary)]">
              If you have any questions or feedback regarding our privacy approach, please reach out to us at{' '}
              <a href="mailto:support@squeeze.app" className="text-zinc-200 underline underline-offset-2 hover:text-white transition">
                support@squeeze.app
              </a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
