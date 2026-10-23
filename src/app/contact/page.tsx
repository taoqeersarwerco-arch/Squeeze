import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar, Footer } from '@/components';
import { GithubIcon } from '@/components/SocialIcons';
import {
  Mail,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Lock,
  Terminal,
  HelpCircle,
  FileCode2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Squeeze & Developer Support | Open Source Project',
  description:
    'Get in touch with the Squeeze maintainers. Direct email support, bug reporting via GitHub Issues, npm package documentation, and security disclosures.',
  alternates: {
    canonical: 'https://www.trysqueeze.online/contact',
  },
  openGraph: {
    title: 'Contact Squeeze | Project Maintainers & Developer Support',
    description:
      'Official contact details for Squeeze, the 100% in-browser, open-source image engine. Email support, security disclosures, and GitHub community channels.',
    url: 'https://www.trysqueeze.online/contact',
    siteName: 'Squeeze',
    images: [
      {
        url: 'https://www.trysqueeze.online/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Contact Squeeze Maintainers',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Squeeze & Developer Support',
    description:
      'Direct contact channels for Squeeze. Reach out for technical support, feature requests, or security disclosures.',
  },
};

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Squeeze Support & Maintainers',
    url: 'https://www.trysqueeze.online/contact',
    description:
      'Official contact channels, technical support, open-source issue tracker, and project maintainer verification for Squeeze.',
    mainEntity: {
      '@type': 'Organization',
      name: 'Squeeze',
      url: 'https://www.trysqueeze.online',
      email: 'contact@trysqueeze.online',
      sameAs: [
        'https://github.com/taoqeersarwerco-arch/Squeeze',
        'https://www.npmjs.com/package/trysqueeze',
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'contact@trysqueeze.online',
          url: 'https://www.trysqueeze.online/contact',
          availableLanguage: ['English'],
        },
        {
          '@type': 'ContactPoint',
          contactType: 'technical support',
          url: 'https://github.com/taoqeersarwerco-arch/Squeeze/issues',
        },
      ],
    },
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-transparent text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="relative z-10 flex-1 py-12 sm:py-20 px-4 sm:px-6">
        <article
          className="mx-auto max-w-4xl rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl p-6 sm:p-12 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.7)] space-y-10 text-sm leading-relaxed text-zinc-300"
          style={{ boxShadow: 'var(--glass-inset)' }}
        >
          {/* Header */}
          <header className="space-y-4 pb-8 border-b border-white/[0.08]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Verified Open-Source Developer Project</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Contact &amp; Maintainer Channels
            </h1>
            <p className="text-base text-zinc-400 max-w-2xl leading-normal">
              Have questions about image processing, found a bug, or need integration assistance? Squeeze is an open-source initiative maintained by independent developers. We respond to all inquiries within 24–48 hours.
            </p>
          </header>

          {/* Quick Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email Card */}
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">Direct Email Inquiries</h2>
                  <p className="text-xs text-zinc-400">General support, feedback, and privacy questions</p>
                </div>
              </div>
              <p className="text-xs text-zinc-400 pt-2">
                Send your inquiry directly to our primary project inbox:
              </p>
              <a
                href="mailto:contact@trysqueeze.online"
                className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors underline underline-offset-4"
              >
                <span>contact@trysqueeze.online</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* GitHub Card */}
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04] text-white">
                  <GithubIcon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">GitHub Issues &amp; Code</h2>
                  <p className="text-xs text-zinc-400">Bug reports, feature suggestions, &amp; code contributions</p>
                </div>
              </div>
              <p className="text-xs text-zinc-400 pt-2">
                Publicly track, audit, and contribute to the Squeeze engine:
              </p>
              <a
                href="https://github.com/taoqeersarwerco-arch/Squeeze/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-zinc-200 transition-colors underline underline-offset-4"
              >
                <span>github.com/taoqeersarwerco-arch/Squeeze</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Project Identity & Transparency Declaration */}
          <section className="space-y-4 pt-4 border-t border-white/[0.08]">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-400" />
              <span>Project Identity &amp; Non-Commercial Disclosure</span>
            </h2>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-5 space-y-3 text-xs text-zinc-400 leading-relaxed">
              <p>
                <strong className="text-zinc-200 font-medium">Not an E-Commerce Webshop:</strong> Squeeze (
                <span className="text-zinc-300">trysqueeze.online</span>) is a 100% free, browser-based utility application and developer engine. We do not sell physical goods, process financial transactions, store credit card data, or require subscription memberships.
              </p>
              <p>
                <strong className="text-zinc-200 font-medium">Zero-Upload Privacy Architecture:</strong> Unlike legacy online conversion websites that upload your files to remote servers, Squeeze processes 100% of images locally within your browser using client-side Web Workers and HTML5 Canvas. Your private photos never leave your device.
              </p>
              <p>
                <strong className="text-zinc-200 font-medium">Open-Source Auditing:</strong> Squeeze is licensed under the MIT License. The entire source code is openly hosted on GitHub, and the core processing library is published publicly on npm under <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-emerald-300">trysqueeze</code>.
              </p>
            </div>
          </section>

          {/* Developer Resources & Ecosystem */}
          <section className="space-y-4 pt-4 border-t border-white/[0.08]">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span>Developer &amp; Verification Resources</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <Link
                href="/about"
                className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-emerald-400">
                  <span>Architecture &amp; Mission</span>
                  <ExternalLink className="h-3 w-3" />
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">Read about our in-browser engine architecture.</p>
              </Link>

              <Link
                href="/security"
                className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-emerald-400">
                  <span>Security Guarantee</span>
                  <ExternalLink className="h-3 w-3" />
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">Mathematical zero-upload and memory safety proof.</p>
              </Link>

              <a
                href="https://www.npmjs.com/package/trysqueeze"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-emerald-400">
                  <span>npm Package Registry</span>
                  <ExternalLink className="h-3 w-3" />
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">Inspect and install trysqueeze on npm.</p>
              </a>
            </div>
          </section>

          {/* FAQ Snippet */}
          <section className="space-y-4 pt-4 border-t border-white/[0.08]">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-emerald-400" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="space-y-3 text-xs">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1.5">
                <p className="font-semibold text-zinc-200">How do I report a security vulnerability or bug?</p>
                <p className="text-zinc-400 leading-relaxed">
                  For vulnerability disclosures, please email <a href="mailto:contact@trysqueeze.online" className="text-emerald-400 underline">contact@trysqueeze.online</a> with subject &quot;Security Disclosure&quot;. For standard bug reports and feature requests, please open an issue on our <a href="https://github.com/taoqeersarwerco-arch/Squeeze/issues" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">GitHub Issue Tracker</a>.
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1.5">
                <p className="font-semibold text-zinc-200">Is Squeeze completely free to use?</p>
                <p className="text-zinc-400 leading-relaxed">
                  Yes, 100%. Squeeze is free for personal, educational, and commercial image conversion. Because computing occurs locally on your browser hardware via Web Workers, there are no server compute overheads passed on to users.
                </p>
              </div>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
