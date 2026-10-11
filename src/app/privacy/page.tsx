import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Squeeze',
  description: 'Squeeze is built on a 100% client-side privacy model. Your image files are never uploaded, collected, or shared.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm space-y-6 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 mb-2">
              <ShieldCheck className="h-3.5 w-3.5" /> Zero Data Collection
            </span>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
              Privacy Policy
            </h1>
            <p className="text-xs text-zinc-400 mt-1">Last updated: October 2026</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-500" /> 1. In-Browser Local Processing
            </h2>
            <p>
              At <strong>Squeeze</strong>, your privacy is our foundational architecture. Unlike traditional online conversion platforms that upload your sensitive images to remote cloud servers, Squeeze processes <strong>100% of your images locally in your browser</strong> using HTML5 Canvas, Web Workers, and WebAssembly.
            </p>
            <p>
              Your images, documents, and graphics never leave your local device. We do not transmit, inspect, store, or create backups of your files on any remote server.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <EyeOff className="h-4 w-4 text-emerald-500" /> 2. Personal Data & Analytics
            </h2>
            <p>
              We do not require user account registration, email addresses, or payment information. We do not sell, rent, or monetize your personal information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              3. Advertising & Cookies
            </h2>
            <p>
              To keep Squeeze free for all users worldwide, we may display third-party advertisements (such as Google AdSense). Third-party vendors, including Google, use cookies to serve ads based on prior visits to this website or other websites. You may opt out of personalized advertising by visiting Google Ads Settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              4. Contact
            </h2>
            <p>
              If you have any questions or feedback regarding our privacy practices, please contact us at support@squeeze.app.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
