import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar, Footer } from '@/components';
import { GithubIcon } from '@/components/SocialIcons';
import {
  ShieldCheck,
  Zap,
  Cpu,
  Lock,
  Code2,
  BookOpen,
  Layers,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  FileCode,
  Archive,
  EyeOff,
  Gauge,
  Workflow,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Squeeze | 100% In-Browser Zero-Upload Image Engine',
  description:
    'Discover Squeeze: the privacy-first, zero-upload image conversion and perceptual compression engine. Learn about our client-side Web Worker architecture, SSIM optimization, and open-source mission.',
  alternates: {
    canonical: 'https://www.trysqueeze.online/about',
  },
  openGraph: {
    title: 'About Squeeze | The 100% In-Browser Image Engine',
    description:
      'Zero server uploads. 100% client-side Web Worker processing. Perceptual SSIM compression. Explore the engineering, privacy philosophy, and technology behind Squeeze.',
    url: 'https://www.trysqueeze.online/about',
    siteName: 'Squeeze',
    images: [
      {
        url: 'https://www.trysqueeze.online/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'About Squeeze - In-Browser Image Processing Engine',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Squeeze | 100% In-Browser Image Engine',
    description:
      'Learn how Squeeze processes 100% of image conversions and perceptual compressions locally in your browser with zero server file uploads.',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://www.trysqueeze.online/about#webpage',
        url: 'https://www.trysqueeze.online/about',
        name: 'About Squeeze Image Processing Engine',
        description:
          'Comprehensive architectural overview, zero-upload privacy model, perceptual SSIM engine, and technology specifications of Squeeze.',
        mainEntity: {
          '@id': 'https://www.trysqueeze.online/#organization',
        },
        breadcrumb: {
          '@id': 'https://www.trysqueeze.online/about#breadcrumb',
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://www.trysqueeze.online/#organization',
        name: 'Squeeze',
        url: 'https://www.trysqueeze.online',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.trysqueeze.online/favicon.ico',
        },
        sameAs: ['https://github.com/taoqeersarwerco-arch/Squeeze'],
        description:
          'Open-source developer initiative providing high-performance client-side image processing, perceptual compression, and developer tooling.',
        knowsAbout: [
          'Client-Side Image Processing',
          'Web Workers Architecture',
          'Structural Similarity Index (SSIM)',
          'Lossless and Lossy Compression',
          'Raster-to-SVG Vector Tracing',
          'Binary Windows ICO Packing',
          'EXIF Metadata Sanitization',
          'Zero-Trust Privacy Engineering',
        ],
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://www.trysqueeze.online/#app',
        name: 'Squeeze Image Converter & Compressor',
        url: 'https://www.trysqueeze.online',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All (Modern Web Browsers)',
        browserRequirements: 'Requires modern browser with HTML5 Canvas, OffscreenCanvas, and Web Worker support',
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.trysqueeze.online/about#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.trysqueeze.online',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About Squeeze',
            item: 'https://www.trysqueeze.online/about',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.trysqueeze.online/about#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Squeeze and how does it work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Squeeze is an open-source, privacy-first image conversion and compression engine that executes 100% inside your web browser. Utilizing HTML5 Canvas, OffscreenCanvas, and multi-threaded Web Workers, Squeeze processes files directly on your device CPU/GPU with zero server uploads.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does Squeeze ever upload my images to remote servers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Squeeze operates on a strict zero-upload architecture. Your image files are read directly into browser memory (ArrayBuffer/Blob), converted locally, and downloaded directly from memory. No image bytes are ever transmitted over the network.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does Squeeze compare to traditional cloud converters?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Unlike cloud services like CloudConvert or TinyPNG which require uploading your confidential files to remote servers and waiting in queues, Squeeze provides instantaneous local processing, zero bandwidth consumption, complete confidentiality, and zero daily usage caps.',
            },
          },
          {
            '@type': 'Question',
            name: 'What image formats does Squeeze support?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Squeeze supports bi-directional conversion and compression for PNG, JPG/JPEG, WebP, SVG, and ICO formats, including multi-resolution Windows favicon packing and bitmap-to-SVG vector contour tracing.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can Squeeze be used offline without an internet connection?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Once the web application is loaded in your browser, all image conversion algorithms, workers, and packaging scripts run locally. You can disconnect from the internet and continue converting and compressing images with zero disruption.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is Squeeze free and open-source?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Squeeze is completely free with no subscriptions, file size paywalls, or watermarks. The complete source code is publicly accessible on GitHub under the open-source MIT license.',
            },
          },
        ],
      },
    ],
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
          className="mx-auto max-w-4xl sm:max-w-5xl rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl p-6 sm:p-12 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.7)] space-y-12 sm:space-y-16 text-sm leading-relaxed text-zinc-300"
          style={{ boxShadow: 'var(--glass-inset)' }}
        >
          {/* Hero Header */}
          <header className="border-b border-white/[0.06] pb-8 sm:pb-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                100% Client-Side Engine
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-zinc-400">
                <Lock className="h-3.5 w-3.5" />
                Zero Server Uploads
              </span>
              <a
                href="https://github.com/taoqeersarwerco-arch/Squeeze"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-white hover:border-white/[0.16] transition"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                Open Source
              </a>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              About Squeeze
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed">
              Squeeze is a fast, privacy-first image converter and perceptual compressor that executes
              100% inside your browser. We built Squeeze to eliminate cloud queues, network bandwidth waste,
              and privacy risks for developers, designers, and creators worldwide.
            </p>

            {/* Quick Metrics Bar - Monochromatic Precision */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                <p className="text-xl sm:text-2xl font-bold text-white tabular-nums tracking-tight">0 B</p>
                <p className="text-[11px] text-zinc-500 uppercase tracking-wider mt-0.5">Uploaded</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                <p className="text-xl sm:text-2xl font-bold text-white tabular-nums tracking-tight">100%</p>
                <p className="text-[11px] text-zinc-500 uppercase tracking-wider mt-0.5">In-Browser</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                <p className="text-xl sm:text-2xl font-bold text-white tabular-nums tracking-tight">18+</p>
                <p className="text-[11px] text-zinc-500 uppercase tracking-wider mt-0.5">Tool Pairs</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                <p className="text-xl sm:text-2xl font-bold text-white tabular-nums tracking-tight">28+</p>
                <p className="text-[11px] text-zinc-500 uppercase tracking-wider mt-0.5">Learn Specs</p>
              </div>
              <div className="col-span-2 sm:col-span-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                <p className="text-xl sm:text-2xl font-bold text-white tabular-nums tracking-tight">0 ms</p>
                <p className="text-[11px] text-zinc-500 uppercase tracking-wider mt-0.5">Queue Wait</p>
              </div>
            </div>
          </header>

          {/* Section 1: Answer Island & Executive Summary (AEO / GEO target) */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-zinc-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                What is Squeeze?
              </h2>
            </div>

            <div
              className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6 text-zinc-200 leading-relaxed space-y-3"
              style={{ boxShadow: 'var(--glass-inset)' }}
            >
              <p className="text-base font-medium text-white">
                <strong>Squeeze</strong> is a free, open-source client-side image processing platform
                and developer engine that converts, compresses, packages, and vectorizes images entirely
                on the client device.
              </p>
              <p className="text-sm text-zinc-400">
                Unlike traditional online file converters that upload user files to remote servers,
                Squeeze executes all raster rendering, perceptual SSIM optimization, binary Windows ICO packing,
                and SVG vector tracing locally using modern web standards including HTML5 Canvas,
                OffscreenCanvas, and multi-threaded Web Workers. Zero file bytes are ever uploaded,
                stored, or transmitted across the internet.
              </p>
            </div>
          </section>

          {/* Section 2: The Mission & Why We Built Squeeze */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-zinc-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                The Mission: Rebuilding Image Processing for the Modern Web
              </h2>
            </div>

            <div className="space-y-3.5 text-zinc-300 text-sm leading-relaxed">
              <p>
                For over two decades, converting an image online meant accepting a flawed compromise:
                users had to upload their private photos, company logos, sensitive financial receipts,
                or confidential product mockups to unknown remote servers, wait in queue lines, and hope
                their data was purged responsibly.
              </p>
              <p>
                This architecture was understandable in 2005 when browsers lacked computational capabilities.
                Today, modern computers, smartphones, and tablets carry multi-core processors and GPU
                acceleration capable of processing tens of megapixels in milliseconds. Transferring megabytes
                across cellular networks just to compress a PNG or change a WebP into a JPG is an inefficient,
                environmentally wasteful, and security-compromising relic.
              </p>
              <p>
                <strong className="text-white">Squeeze was built to reset that standard.</strong> Our mission
                is simple: <em className="text-zinc-200">your images belong on your device</em>. We deliver
                maximum processing speed, zero-trust privacy, and studio-grade perceptual fidelity without
                charging subscription fees, demanding sign-ups, or placing watermarks on your work.
              </p>
            </div>
          </section>

          {/* Section 3: Technical Architecture & Core Innovations */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-zinc-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Under the Hood: How the Squeeze Engine Works
              </h2>
            </div>
            <p className="text-[var(--text-secondary)] text-sm">
              Squeeze combines multiple browser APIs and low-level algorithms into an integrated,
              high-throughput pipeline designed for speed, privacy, and visual accuracy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className="rounded-xl border border-white/[0.08] p-5 bg-white/[0.02] space-y-2.5"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Workflow className="h-4 w-4 text-zinc-400" />
                  <span>Multi-Threaded Web Worker Pipeline</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Image rasterization and compression execute on dedicated background Web Workers.
                  Heavy compute never blocks the main UI thread, ensuring butter-smooth 60 FPS scrolling
                  and instant user responsiveness even when processing 50+ images simultaneously.
                </p>
              </div>

              <div
                className="rounded-xl border border-white/[0.08] p-5 bg-white/[0.02] space-y-2.5"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Gauge className="h-4 w-4 text-zinc-400" />
                  <span>Perceptual SSIM Quality Preservation</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Our compression engine utilizes Structural Similarity Index (SSIM) delta metrics to
                  dynamically calibrate quantization matrices. It maximizes byte reduction while
                  safeguarding human-visible edge sharpness, luminance contrast, and smooth gradients.
                </p>
              </div>

              <div
                className="rounded-xl border border-white/[0.08] p-5 bg-white/[0.02] space-y-2.5"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Layers className="h-4 w-4 text-zinc-400" />
                  <span>Binary Windows ICO Struct Packing</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Generates true binary Windows `.ico` containers that bundle 16x16, 32x32, 48x48, 64x64,
                  128x128, and 256x256 pixel mipmaps with exact byte-level ICONDIR and ICONDIRENTRY headers,
                  providing flawless cross-browser favicon compatibility.
                </p>
              </div>

              <div
                className="rounded-xl border border-white/[0.08] p-5 bg-white/[0.02] space-y-2.5"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <FileCode className="h-4 w-4 text-zinc-400" />
                  <span>Marching-Squares Vector Shape Tracing</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Our bitmap-to-SVG vectorizer executes luminance boundary detection, marching-squares
                  contour tracing, and cubic Bézier curve optimization to turn raster bitmaps into
                  infinitely scalable SVG vector paths.
                </p>
              </div>

              <div
                className="rounded-xl border border-white/[0.08] p-5 bg-white/[0.02] space-y-2.5"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <EyeOff className="h-4 w-4 text-zinc-400" />
                  <span>EXIF Privacy Sanitization</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Camera and smartphone photos frequently leak sensitive metadata. Squeeze automatically
                  strips GPS latitude/longitude coordinates, camera serial numbers, device names, and
                  timestamp records from converted images before saving.
                </p>
              </div>

              <div
                className="rounded-xl border border-white/[0.08] p-5 bg-white/[0.02] space-y-2.5"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Archive className="h-4 w-4 text-zinc-400" />
                  <span>Streaming Client-Side ZIP Packaging</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Batch conversions bundle into a single compressed `.zip` archive on-the-fly using
                  in-memory Deflate compression. You can download dozens of converted assets in one
                  click with zero server bandwidth delay.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Architectural Comparison Table (Information Gain for SEO/LLMs) */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-zinc-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Architectural Comparison: Squeeze vs. Legacy Solutions
              </h2>
            </div>
            <p className="text-[var(--text-secondary)] text-sm">
              How Squeeze compares directly with cloud-based conversion utilities and heavy desktop software.
            </p>

            <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.02]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.03] text-zinc-300 font-semibold">
                    <th className="p-3.5 sm:p-4">Key Criteria</th>
                    <th className="p-3.5 sm:p-4 text-white font-bold">Squeeze (In-Browser)</th>
                    <th className="p-3.5 sm:p-4 text-zinc-400 font-medium">Legacy Cloud Converters</th>
                    <th className="p-3.5 sm:p-4 text-zinc-400 font-medium">Desktop Software</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-zinc-300">
                  <tr>
                    <td className="p-3.5 sm:p-4 font-medium text-white">Server File Uploads</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0" /> Zero (100% Local)
                    </td>
                    <td className="p-3.5 sm:p-4 text-zinc-400 flex items-center gap-1.5">
                      <XCircle className="h-4 w-4 shrink-0 text-zinc-500" /> Mandatory Upload
                    </td>
                    <td className="p-3.5 sm:p-4 text-zinc-300">Zero (Local)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-medium text-white">Privacy Guarantee</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-medium">Cryptographic / Zero-Trust</td>
                    <td className="p-3.5 sm:p-4 text-zinc-400">Cloud Storage Exposure</td>
                    <td className="p-3.5 sm:p-4 text-zinc-300">Local Only</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-medium text-white">Network Bandwidth Needed</td>
                    <td className="p-3.5 sm:p-4 text-white font-medium">0 MB (Zero Transfer)</td>
                    <td className="p-3.5 sm:p-4 text-zinc-400">2x File Size (Upload + Download)</td>
                    <td className="p-3.5 sm:p-4 text-zinc-300">0 MB</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-medium text-white">Processing Latency</td>
                    <td className="p-3.5 sm:p-4 text-white font-medium">Instant (Local CPU/GPU)</td>
                    <td className="p-3.5 sm:p-4 text-zinc-400">Upload Time + Queue Lag</td>
                    <td className="p-3.5 sm:p-4 text-zinc-300">Instant (Local)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-medium text-white">Installation &amp; Setup</td>
                    <td className="p-3.5 sm:p-4 text-white font-medium">Instant Web Access</td>
                    <td className="p-3.5 sm:p-4 text-zinc-300">Instant Web Access</td>
                    <td className="p-3.5 sm:p-4 text-zinc-400">Heavy GBs Download &amp; Install</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-medium text-white">Usage Limits &amp; Cost</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-medium">100% Free / Unlimited</td>
                    <td className="p-3.5 sm:p-4 text-zinc-400">Daily Caps / Subscriptions</td>
                    <td className="p-3.5 sm:p-4 text-zinc-400">Costly Monthly Licenses</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-medium text-white">Works Completely Offline</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-medium">Yes (PWA &amp; Cache Ready)</td>
                    <td className="p-3.5 sm:p-4 text-zinc-400">No (Requires Connection)</td>
                    <td className="p-3.5 sm:p-4 text-zinc-300">Yes</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-medium text-white">Open Source Code</td>
                    <td className="p-3.5 sm:p-4 text-white font-medium">Yes (MIT License on GitHub)</td>
                    <td className="p-3.5 sm:p-4 text-zinc-400">Proprietary / Closed</td>
                    <td className="p-3.5 sm:p-4 text-zinc-400">Proprietary / Closed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5: The Squeeze Ecosystem (Connecting Everything We Built) */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-zinc-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                The Squeeze Ecosystem
              </h2>
            </div>
            <p className="text-[var(--text-secondary)] text-sm">
              Squeeze is more than just a single conversion page. We have developed a complete ecosystem
              catering to end users, frontend engineers, backend architects, and performance researchers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/"
                className="group rounded-xl border border-white/[0.08] p-5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.14] transition space-y-2"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <div className="flex items-center justify-between text-white font-semibold text-sm">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                    <span>In-Browser Converter &amp; Batch Dock</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition" />
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Drag-and-drop batch image converter supporting PNG, JPG, WebP, SVG, and ICO with real-time
                  progress tracking, instant preview comparisons, and one-click ZIP packaging.
                </p>
              </Link>

              <Link
                href="/developers"
                className="group rounded-xl border border-white/[0.08] p-5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.14] transition space-y-2"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <div className="flex items-center justify-between text-white font-semibold text-sm">
                  <div className="flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                    <span>Developer Hub &amp; API Sandbox</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition" />
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Client-side Web Worker SDK and headless REST API specifications. Generate instant sandbox keys,
                  test multipart endpoints, and copy ready-to-run snippets in TypeScript, Python, cURL, and Go.
                </p>
              </Link>

              <Link
                href="/learn"
                className="group rounded-xl border border-white/[0.08] p-5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.14] transition space-y-2"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <div className="flex items-center justify-between text-white font-semibold text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                    <span>Engineering Knowledge Base (28+ Guides)</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition" />
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Comprehensive educational guides exploring image compression algorithms, WebP vs AVIF,
                  color spaces, chroma subsampling, favicon engineering, and web performance optimization.
                </p>
              </Link>

              <a
                href="https://github.com/taoqeersarwerco-arch/Squeeze"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/[0.08] p-5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.14] transition space-y-2"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <div className="flex items-center justify-between text-white font-semibold text-sm">
                  <div className="flex items-center gap-2">
                    <GithubIcon className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                    <span>Open-Source Repository on GitHub</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition" />
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Review the code, audit the Web Worker implementation, report issues, and contribute
                  new format encoders to our publicly licensed MIT repository.
                </p>
              </a>
            </div>
          </section>

          {/* Section 6: Supported Formats Matrix - Subtle Monochromatic Badges */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-zinc-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Supported Image Formats &amp; Capabilities
              </h2>
            </div>
            <p className="text-[var(--text-secondary)] text-sm">
              Squeeze provides specialized encoders and decoders tailored for the most popular web formats:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              <div
                className="rounded-xl border border-white/[0.06] p-4 bg-white/[0.02] space-y-1.5"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">PNG</span>
                  <span className="text-[10px] uppercase font-semibold text-zinc-300 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded">
                    Lossless
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Preserves pristine 8-bit alpha transparency and pixel-perfect edges. Ideal for logos, UI icons, and technical diagrams.
                </p>
              </div>

              <div
                className="rounded-xl border border-white/[0.06] p-4 bg-white/[0.02] space-y-1.5"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">JPG / JPEG</span>
                  <span className="text-[10px] uppercase font-semibold text-zinc-300 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded">
                    Lossy
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Discrete cosine transform (DCT) quantization optimized for photographs and complex scenery with zero alpha overhead.
                </p>
              </div>

              <div
                className="rounded-xl border border-white/[0.06] p-4 bg-white/[0.02] space-y-1.5"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">WebP</span>
                  <span className="text-[10px] uppercase font-semibold text-zinc-300 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded">
                    Modern Web
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Modern web standard delivering 25–34% smaller file sizes than PNG/JPEG while supporting full alpha transparency.
                </p>
              </div>

              <div
                className="rounded-xl border border-white/[0.06] p-4 bg-white/[0.02] space-y-1.5"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">SVG</span>
                  <span className="text-[10px] uppercase font-semibold text-zinc-300 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded">
                    Vector
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Infinitely scalable XML vector path geometries. Traced cleanly from raster bitmaps without pixelation on Retina displays.
                </p>
              </div>

              <div
                className="rounded-xl border border-white/[0.06] p-4 bg-white/[0.02] space-y-1.5"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">ICO</span>
                  <span className="text-[10px] uppercase font-semibold text-zinc-300 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded">
                    Favicon
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Multi-resolution binary Windows favicon bundles containing 16px, 32px, 48px, 64px, and 128px icon frames.
                </p>
              </div>

              <div
                className="rounded-xl border border-white/[0.06] p-4 bg-white/[0.02] space-y-1.5"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">ZIP</span>
                  <span className="text-[10px] uppercase font-semibold text-zinc-300 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded">
                    Archive
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Fast in-browser archive generator allowing you to download dozens of converted assets in a single bundle.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Frequently Asked Questions (FAQ Section) */}
          <section className="space-y-5">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-zinc-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3.5">
              <div
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-2"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <h3 className="font-semibold text-white text-sm">
                  How does Squeeze convert images without uploading them?
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  When you select or drop images into Squeeze, the browser reads your files into local RAM
                  using the HTML5 File API and FileReader. Our Web Worker scripts render the image data
                  onto an internal OffscreenCanvas, execute format transformations, and output raw binary
                  Blobs directly to your device storage. No network packets containing image pixels are ever created.
                </p>
              </div>

              <div
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-2"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <h3 className="font-semibold text-white text-sm">
                  Is Squeeze truly safe for sensitive, financial, or legal documents?
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Yes. Because files never leave your device, Squeeze eliminates third-party cloud data
                  retention, transit interception, and unauthorized inspection risks. Squeeze is fully
                  compatible with strict data sovereignty and confidentiality guidelines (GDPR, HIPAA, CCPA)
                  since no personal data processing occurs on external infrastructure.
                </p>
              </div>

              <div
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-2"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <h3 className="font-semibold text-white text-sm">
                  Why is Squeeze completely free without paywalls or file size restrictions?
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Traditional cloud converters incur massive server and bandwidth bills because they run
                  heavy CPU operations on cloud clusters for millions of users. Because Squeeze runs on
                  your device, we have virtually zero compute infrastructure overhead. This architectural
                  advantage allows us to provide an unrestricted, premium experience at zero cost.
                </p>
              </div>

              <div
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-2"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <h3 className="font-semibold text-white text-sm">
                  Can Squeeze work completely offline?
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Yes. Once the web application code is cached in your browser, all image conversion
                  algorithms, vector tracers, and worker scripts run locally. You can disconnect from Wi-Fi
                  or mobile data and continue converting and compressing images with zero disruption.
                </p>
              </div>

              <div
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-2"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <h3 className="font-semibold text-white text-sm">
                  How does Squeeze achieve high compression ratios without noticeable degradation?
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Squeeze uses perceptual Structural Similarity (SSIM) delta metrics rather than blunt linear
                  quantization. It analyzes image regions to identify high-frequency visual contours (edges,
                  text, sharp contrasts) and preserves them while aggressively compressing flat, uniform areas
                  where the human eye cannot detect minor changes.
                </p>
              </div>

              <div
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-2"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <h3 className="font-semibold text-white text-sm">
                  How can developers integrate Squeeze into their own projects?
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Developers can integrate our client-side Web Worker architecture into any React, Vue,
                  or vanilla web app, or connect to our headless Cloud REST API for server workflows. Visit our{' '}
                  <Link href="/developers" className="text-white underline underline-offset-2 hover:text-zinc-300">
                    Developer Hub
                  </Link>{' '}
                  for typed TypeScript definitions, API sandboxes, and copyable snippets.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8: Final Call to Action */}
          <section
            className="rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-6 sm:p-8 text-center space-y-4"
            style={{ boxShadow: 'var(--glass-inset)' }}
          >
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Ready to Experience Zero-Upload Image Processing?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
              Convert, compress, and package your images locally with maximum speed and guaranteed privacy.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-medium text-xs hover:bg-zinc-200 transition shadow-lg shadow-white/5"
              >
                <Zap className="h-4 w-4" />
                <span>Start Converting Images</span>
              </Link>
              <Link
                href="/developers"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] text-zinc-200 font-medium text-xs hover:bg-white/[0.08] hover:text-white transition"
              >
                <Code2 className="h-4 w-4" />
                <span>Developer Hub &amp; API</span>
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] text-zinc-200 font-medium text-xs hover:bg-white/[0.08] hover:text-white transition"
              >
                <BookOpen className="h-4 w-4" />
                <span>Learn Hub (28 Guides)</span>
              </Link>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
