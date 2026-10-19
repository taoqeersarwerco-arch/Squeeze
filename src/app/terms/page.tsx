import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar, Footer } from '@/components';
import { FileText, Shield, KeyRound, AlertTriangle, Scale, Cpu, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service, acceptable use guidelines, and Developer API agreements for Squeeze in-browser image conversion and perceptual compression engine.',
  alternates: {
    canonical: 'https://www.trysqueeze.online/terms',
  },
  openGraph: {
    title: 'Terms of Service | Squeeze Image Engine',
    description:
      'Official terms and usage conditions governing the Squeeze in-browser converter and programmatic Developer API.',
    url: 'https://www.trysqueeze.online/terms',
    siteName: 'Squeeze',
    images: [
      {
        url: 'https://www.trysqueeze.online/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Squeeze Terms of Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function TermsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Squeeze Terms of Service',
    description:
      'Official terms of service and developer API usage agreement for Squeeze.',
    url: 'https://www.trysqueeze.online/terms',
    publisher: {
      '@type': 'Organization',
      name: 'Squeeze',
      url: 'https://www.trysqueeze.online',
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
          <header className="border-b border-white/[0.08] pb-8">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-white/[0.04] border border-white/[0.08] px-3 py-1 text-xs font-semibold text-zinc-300 mb-4">
              <Scale className="h-4 w-4 text-emerald-400" /> Terms of Service &amp; Developer Agreement
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Terms of Service
            </h1>
            <p className="text-xs text-zinc-400 mt-2">
              Effective Date: October 13, 2026 &bull; Domain: <strong className="text-zinc-200">trysqueeze.online</strong>
            </p>
          </header>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-400" /> 1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or utilizing <strong>Squeeze</strong> (&quot;the Service,&quot; accessible at `https://www.trysqueeze.online`), its client-side image processing tools, or the programmatic Developer Hub and APIs, you agree to be bound by these Terms of Service.
            </p>
            <p className="text-zinc-400">
              If you do not agree to all provisions contained herein, you must immediately discontinue use of the website and all related services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="h-4 w-4 text-emerald-400" /> 2. Description of the Service
            </h2>
            <p>
              Squeeze provides high-performance graphic manipulation utilities, including format conversion between PNG, JPG, WebP, SVG, and ICO, multi-res icon creation, vector tracing, and perceptual SSIM-guided compression.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>
                <strong>Client-Side Engine:</strong> The web-based converter functions directly in the user&apos;s browser via Web Workers and HTML5 Canvas with zero remote server file uploads.
              </li>
              <li>
                <strong>Developer Hub &amp; APIs:</strong> The Service provides programmatic integration via the `@squeeze/browser` SDK and headless Cloud REST API endpoints (`/v1/convert`, `/v1/compress`).
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-400" /> 3. Intellectual Property &amp; User Content Rights
            </h2>
            <p className="text-zinc-200 font-medium">
              You retain whatever intellectual property rights, copyright, and title you already hold in the images and media you process through Squeeze. Squeeze claims zero ownership, title, or interest in your content.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>
                <strong>No Transfer of Ownership:</strong> Processing media through Squeeze does not transfer any intellectual property rights to Squeeze. Squeeze acquires no license to use, display, or distribute your images.
              </li>
              <li>
                <strong>User Authority &amp; Permissions:</strong> You represent and warrant that you hold all necessary rights, licenses, permissions, or legal authority to convert, compress, or process any files you submit to the Service.
              </li>
              <li>
                <strong>No Scraping or AI Model Training:</strong> Because our browser converter does not upload your files to our servers, your images are never stored, indexed, or used to train generative artificial intelligence or machine learning models.
              </li>
              <li>
                <strong>Squeeze Intellectual Property:</strong> The Squeeze website, logo, visual design, custom CSS, algorithmic workflows, and documentation are protected by copyright, trademark, and other applicable laws.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" /> 4. Acceptable Use Policy
            </h2>
            <p>
              You agree not to use the Service, its client tools, or programmatic APIs for any unlawful, malicious, or abusive activities, including but not limited to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>Processing, encoding, or transmitting child sexual abuse material (CSAM) or any non-consensual exploitative imagery.</li>
              <li>Attempting to inject malicious code, trojan horses, buffer overflow payloads, or malicious SVG script tags intended to compromise client browsers or remote systems.</li>
              <li>Executing automated denial-of-service (DoS) or distributed denial-of-service (DDoS) attacks against our infrastructure or domain.</li>
              <li>Circumventing, tampering with, or attempting to spoof rate limiting mechanisms or API key authorization systems.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-emerald-400" /> 5. Developer Hub &amp; Programmatic API Terms
            </h2>
            <p>
              Developers utilizing our <Link href="/developers" className="text-white underline underline-offset-2 hover:text-emerald-400 transition">Developer Hub</Link> and API endpoints are subject to the following additional terms:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>
                <strong>Free Sandbox Quota:</strong> Programmatic sandbox keys are limited to <strong>100 requests per rolling hour</strong> and a maximum payload size of <strong>50MB</strong> per file. Exceeding this quota will result in HTTP 429 Too Many Requests responses.
              </li>
              <li>
                <strong>Key Confidentiality:</strong> You are responsible for maintaining the confidentiality of your provisioned API bearer token (`sqz_live_...`). Do not commit keys to public source control repositories.
              </li>
              <li>
                <strong>Suspension &amp; Revocation:</strong> We reserve the right to suspend or revoke any API key immediately and without prior notice if we detect abusive request spikes, scrapers, or violations of this agreement.
              </li>
              <li>
                <strong>Commercial Usage:</strong> The Free Tier is intended for personal, open-source, and evaluation purposes. Commercial SaaS applications and high-throughput microservices require upgraded Developer Pro or Enterprise arrangements.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Globe className="h-4 w-4 text-emerald-400" /> 6. Disclaimer of Warranties
            </h2>
            <p className="text-zinc-400">
              THE SERVICE IS PROVIDED STRICTLY ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p className="text-zinc-400">
              Because image encoding relies upon client browser engines, WebAssembly runtimes, and local device hardware, Squeeze does not warrant that conversions will be completely error-free or uninterrupted across all operating systems and hardware configurations.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale className="h-4 w-4 text-emerald-400" /> 7. Limitation of Liability
            </h2>
            <p className="text-zinc-400">
              TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, IN NO EVENT SHALL SQUEEZE, ITS FOUNDERS, OPERATORS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES (INCLUDING LOSS OF PROFITS, DATA, USE, OR GOODWILL) ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE SERVICE, REGARDLESS OF THE LEGAL THEORY.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">8. Third-Party Advertisements &amp; Links</h2>
            <p className="text-zinc-400">
              The Service may feature third-party advertisements (such as Google AdSense) or links to external websites. Squeeze is not responsible for the content, privacy policies, or business practices of any third-party websites or ad networks.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">9. Modifications to the Terms</h2>
            <p className="text-zinc-400">
              We reserve the right to revise or replace these Terms of Service at any time. When material changes occur, we will update the &quot;Effective Date&quot; at the top of this document. Continued use of the platform after updates take effect constitutes your binding agreement to the revised terms.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3 border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-bold text-white">10. Contact Information</h2>
            <p className="text-zinc-400">
              For legal inquiries, copyright concerns, or developer enterprise consultations regarding these Terms:
            </p>
            <div className="rounded-xl border border-white/[0.08] bg-black/40 p-4 text-xs font-mono space-y-1">
              <p><span className="text-zinc-500">Legal Contact:</span> <a href="mailto:contact@trysqueeze.online" className="text-emerald-400 underline underline-offset-2">contact@trysqueeze.online</a></p>
              <p><span className="text-zinc-500">Official Website:</span> <a href="https://www.trysqueeze.online" className="text-zinc-300">https://www.trysqueeze.online</a></p>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
