import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DeveloperRequestForm } from '@/components/DeveloperRequestForm';

export const metadata: Metadata = {
  title: 'Developers - Squeeze',
  description: 'Build with the Squeeze image processing engine. Request a free API key for your project.',
};

export default function DevelopersPage() {
  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-transparent text-zinc-100">
      <Navbar />

      <main className="relative z-10 flex-1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-12 sm:pt-20 pb-20">
          {/* Hero */}
          <div className="mb-14">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Build with Squeeze
            </h1>
            <p className="mt-3 text-[15px] text-[var(--text-secondary)] max-w-lg leading-relaxed">
              Use the Squeeze engine in your own projects. Image conversion and compression via a simple API.
              Free for personal projects.
            </p>
          </div>

          {/* What you get */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-4">What you get</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: 'Formats', detail: 'JPG, PNG, WebP, SVG, ICO' },
                { label: 'Compression', detail: 'Automatic quality optimization' },
                { label: 'Rate limit', detail: '100 requests per hour (free tier)' },
                { label: 'Response', detail: 'JSON with base64 or binary output' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                >
                  <p className="text-sm font-medium text-zinc-300">{item.label}</p>
                  <p className="mt-1 text-xs text-zinc-500">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Start */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-4">Quick start</h2>
            <div
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 overflow-x-auto"
              style={{ boxShadow: 'var(--glass-inset)' }}
            >
              <pre className="text-[13px] font-mono text-zinc-400 leading-relaxed whitespace-pre">
{`curl -X POST https://api.squeeze.app/v1/convert \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@photo.jpg" \\
  -F "format=webp" \\
  -F "quality=85"`}
              </pre>
            </div>
            <div
              className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 overflow-x-auto"
              style={{ boxShadow: 'var(--glass-inset)' }}
            >
              <p className="text-xs font-medium text-zinc-500 mb-2">JavaScript</p>
              <pre className="text-[13px] font-mono text-zinc-400 leading-relaxed whitespace-pre">
{`const form = new FormData();
form.append('file', imageFile);
form.append('format', 'webp');
form.append('quality', '85');

const res = await fetch('https://api.squeeze.app/v1/convert', {
  method: 'POST',
  headers: { Authorization: 'Bearer YOUR_API_KEY' },
  body: form,
});

const blob = await res.blob();`}
              </pre>
            </div>
          </section>

          {/* Request Access */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-4">Request access</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              We are onboarding developers in batches. Submit your details below and we will send you an API key.
              Free forever for personal projects.
            </p>

            <DeveloperRequestForm />
          </section>

          {/* Coming Soon */}
          <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <p className="text-sm font-medium text-zinc-400">Coming soon</p>
            <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
              Usage dashboard, live key generation, rate limit management, and webhook support.
              Request access above to be first in line.
            </p>
          </section>

          {/* Bottom CTA */}
          <div className="mt-12 pt-8 border-t border-white/[0.06] text-center">
            <p className="text-sm text-[var(--text-secondary)]">
              Just need to convert some images?{' '}
              <Link href="/" className="text-zinc-300 underline underline-offset-2 hover:text-white transition-colors">
                Use the converter
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
