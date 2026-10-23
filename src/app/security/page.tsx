import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar, Footer } from '@/components';
import { GithubIcon } from '@/components/SocialIcons';
import {
  ShieldCheck,
  Lock,
  Cpu,
  EyeOff,
  ServerOff,
  CheckCircle2,
  FileCode,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Security & Zero-Upload Privacy Guarantee | Squeeze',
  description:
    'Detailed technical verification of Squeeze client-side security architecture. Zero server file uploads, EXIF sanitization, open-source code auditing, and data harvesting immunity.',
  alternates: {
    canonical: 'https://www.trysqueeze.online/security',
  },
  openGraph: {
    title: 'Security & Zero-Upload Guarantee | Squeeze Architecture',
    description:
      'Proof of 100% client-side execution. Your files never touch a server, preventing data harvesting. Verified open source on GitHub and npm.',
    url: 'https://www.trysqueeze.online/security',
    siteName: 'Squeeze',
    images: [
      {
        url: 'https://www.trysqueeze.online/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Squeeze Security & Zero-Upload Architecture',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security & Zero-Upload Guarantee | Squeeze',
    description:
      'Why Squeeze is immune to data harvesting: 100% client-side in-browser WebAssembly and Web Worker processing.',
  },
};

export default function SecurityPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Squeeze Security & Zero-Upload Guarantee',
    url: 'https://www.trysqueeze.online/security',
    description:
      'Technical architecture specifications proving zero server file uploads, complete user privacy, EXIF metadata stripping, and open-source verification.',
    publisher: {
      '@type': 'Organization',
      name: 'Squeeze',
      url: 'https://www.trysqueeze.online',
      sameAs: [
        'https://github.com/taoqeersarwerco-arch/Squeeze',
        'https://www.npmjs.com/package/trysqueeze',
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
          className="mx-auto max-w-4xl rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl p-6 sm:p-12 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.7)] space-y-12 text-sm leading-relaxed text-zinc-300"
          style={{ boxShadow: 'var(--glass-inset)' }}
        >
          {/* Header */}
          <header className="space-y-4 pb-8 border-b border-white/[0.08]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Cryptographic &amp; Architectural Security Guarantee</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Zero-Upload Security &amp; Trust Model
            </h1>
            <p className="text-base text-zinc-400 max-w-2xl leading-normal">
              Most online conversion utilities carry data harvesting risks because they upload your sensitive images to remote backend servers. Squeeze was built on the opposite principle: <strong>100% client-side computing</strong> where images never leave your computer.
            </p>
          </header>

          {/* Pillars of Squeeze Security */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
              <Lock className="h-5 w-5 text-emerald-400" />
              <span>How Squeeze Protects Your Privacy &amp; Data</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <ServerOff className="h-4 w-4 text-emerald-400" />
                  <span>Zero Server File Uploads</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  When you drag-and-drop an image into Squeeze, no HTTP POST request sends the binary data to any remote cloud. Processing occurs in your browser&apos;s isolated memory space via standard Web APIs.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Cpu className="h-4 w-4 text-emerald-400" />
                  <span>Multi-Threaded Web Workers</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Conversions, SSIM perceptual computations, and raster tracing run inside background Web Workers that execute on your local CPU threads. No cloud computing or external servers are involved.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <EyeOff className="h-4 w-4 text-emerald-400" />
                  <span>EXIF Metadata Sanitization</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Camera images often embed sensitive metadata including GPS coordinates, camera serial numbers, and personal timestamps. Squeeze strips all tracking EXIF headers during conversion by default.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <FileCode className="h-4 w-4 text-emerald-400" />
                  <span>Public Open-Source Auditing</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  You don&apos;t have to take our word for it. Every single line of code is open-source under the MIT license. Anyone can inspect network requests in Chrome DevTools to confirm zero outgoing file traffic.
                </p>
              </div>
            </div>
          </section>

          {/* Verification via Browser DevTools */}
          <section className="space-y-4 pt-4 border-t border-white/[0.08]">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Verify It Yourself in 10 Seconds</span>
            </h2>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-5 space-y-3 text-xs text-zinc-300">
              <p className="leading-relaxed">
                Security by verification, not security by obscurity. You can independently confirm our zero-upload guarantee using standard browser Developer Tools:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-zinc-400">
                <li>Press <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-white">F12</kbd> (or right click and select <em>Inspect</em>) and navigate to the <strong>Network</strong> tab.</li>
                <li>Filter by <strong>Fetch/XHR</strong>.</li>
                <li>Drag any image file into Squeeze and perform a conversion or compression.</li>
                <li>
                  <strong className="text-emerald-400">Result:</strong> You will observe <span className="text-white">zero outbound requests</span> containing your image data. The file size transferred over the network is exactly <span className="text-white">0 bytes</span>.
                </li>
              </ol>
            </div>
          </section>

          {/* Open Source & npm Registry Badges */}
          <section className="space-y-4 pt-4 border-t border-white/[0.08]">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-emerald-400" />
              <span>Independent Entity &amp; Package Verification</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://github.com/taoqeersarwerco-arch/Squeeze"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.14] transition-all group"
              >
                <div className="flex items-center justify-between text-sm font-semibold text-white group-hover:text-emerald-400">
                  <div className="flex items-center gap-2">
                    <GithubIcon className="h-4 w-4" />
                    <span>GitHub Open Source Repo</span>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5" />
                </div>
                <p className="text-xs text-zinc-400 mt-2">
                  Inspect the source code, open issues, or review our Web Worker conversion scripts on GitHub.
                </p>
              </a>

              <a
                href="https://www.npmjs.com/package/trysqueeze"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.14] transition-all group"
              >
                <div className="flex items-center justify-between text-sm font-semibold text-white group-hover:text-emerald-400">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-emerald-400 font-bold">npm</span>
                    <span>trysqueeze Package</span>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5" />
                </div>
                <p className="text-xs text-zinc-400 mt-2">
                  Audited standalone TypeScript engine published to the official npm registry for Node &amp; web projects.
                </p>
              </a>
            </div>
          </section>

          {/* Contact & Reporting */}
          <footer className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-zinc-500">
              Discovered a vulnerability or have a technical security inquiry?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold transition"
            >
              <span>Contact Security Maintainer</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}
