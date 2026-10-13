import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar, Footer } from '@/components';
import { ShieldCheck, Lock, EyeOff, Server, Database, KeyRound, Cookie, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Browser Zero-Upload Engine & API Privacy | Squeeze',
  description:
    'Squeeze browser converter operates on a zero-upload model where image conversions run locally in client memory. Learn about our in-browser engine, EXIF sanitization, and developer API privacy.',
  alternates: {
    canonical: 'https://www.trysqueeze.online/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Squeeze Browser Engine & Data Protection',
    description:
      'Browser image conversions run 100% locally in client memory with zero file uploads. Full privacy, EXIF stripping, and API transit disclosures for web users and developers.',
    url: 'https://www.trysqueeze.online/privacy',
    siteName: 'Squeeze',
    images: [
      {
        url: 'https://www.trysqueeze.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Squeeze Privacy Policy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function PrivacyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Squeeze Privacy Policy',
    description:
      'Official privacy policy detailing zero-upload browser conversion architecture, EXIF metadata sanitization, and ephemeral API transit data practices for Squeeze.',
    url: 'https://www.trysqueeze.online/privacy',
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
            <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400 mb-4">
              <ShieldCheck className="h-4 w-4" /> Zero-Upload Privacy Architecture
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Privacy Policy
            </h1>
            <p className="text-xs text-zinc-400 mt-2">
              Last Updated &amp; Effective: October 13, 2026 &bull; Domain: <strong className="text-zinc-200">trysqueeze.online</strong>
            </p>
          </header>

          {/* Quick Summary Highlights */}
          <div className="rounded-xl border border-white/[0.08] bg-black/40 p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" /> 100% Client-Side
              </span>
              <p className="text-zinc-400">
                Images never leave your browser for converter tools. Zero remote uploads.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <EyeOff className="h-3.5 w-3.5" /> Zero File Retention
              </span>
              <p className="text-zinc-400">
                No database or cloud storage of user graphic files. In-memory data released upon session close.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" /> EXIF Sanitization
              </span>
              <p className="text-zinc-400">
                Optional client-side removal of camera metadata and GPS coordinates.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-400" /> 1. The Zero-Upload Client-Side Architecture
            </h2>
            <p>
              At <strong>Squeeze</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;the Service&quot;), privacy is not merely a policy statement—it is the foundational technical architecture upon which our platform was designed.
            </p>
            <p>
              Traditional online image converters upload your confidential images to remote cloud servers, process them remotely, store them temporarily on disk, and expose you to server-side data leaks and unauthorized data scraping.
            </p>
            <p className="text-zinc-200 font-medium">
              Squeeze operates on a strict zero-upload model for all web converter utilities:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>
                <strong>Off-Thread Web Workers:</strong> Your source images are read directly into your device&apos;s local RAM via standard browser APIs (`FileReader`, `OffscreenCanvas`, Web Workers, and WebAssembly).
              </li>
              <li>
                <strong>Zero Server Transmission:</strong> During image conversion, resizing, and compression in the web app, <em>zero image bytes are transmitted over the network</em>. You can verify this at any time by disconnecting your internet connection or inspecting your browser&apos;s Network Developer Tools.
              </li>
              <li>
                <strong>Release of Memory References:</strong> Once you download your converted image or navigate away, in-memory object references and Canvas buffer allocations are released for standard browser garbage collection, without persistent local caching by Squeeze.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <EyeOff className="h-4 w-4 text-emerald-400" /> 2. Information Handled During Browser Conversion
            </h2>
            <p>
              When utilizing our web-based image conversion tools, Squeeze <strong>does not receive, collect, inspect, monetize, or store</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>The photographic or graphic contents of your files.</li>
              <li>Personal photographs, family images, private documents, or commercial artwork.</li>
              <li>Embedded geolocation data, camera serial numbers, or facial biometric features.</li>
              <li>User passwords, credit card credentials, or mandatory personal account profiles.</li>
            </ul>
            <p className="text-xs text-zinc-400 mt-2">
              <em>Note on Cloud REST API:</em> If you explicitly choose our programmatic Cloud REST API instead of the browser converter, file bytes are transmitted ephemerally in transit solely to execute the requested conversion and are never stored or retained beyond the immediate response (see Section 4).
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-emerald-400" /> 3. Developer Hub &amp; API Key Registration Data
            </h2>
            <p>
              If you utilize our <Link href="/developers" className="text-white underline underline-offset-2 hover:text-emerald-400 transition">Developer Hub</Link> to provision programmatic API keys:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>
                <strong>Developer Contact Information:</strong> When you generate a live API key via `/api/developers/request`, we record your provided email address and application project name.
              </li>
              <li>
                <strong>Purpose of Processing:</strong> This information is collected solely to authenticate programmatic API requests, enforce hourly rate limits (e.g. 100 requests per rolling hour), prevent denial-of-service abuse, and communicate critical breaking API schema changes.
              </li>
              <li>
                <strong>No Third-Party Sharing:</strong> We do not sell, rent, or lease developer email directories to advertisers or marketing aggregators.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Server className="h-4 w-4 text-emerald-400" /> 4. Cloud REST API In-Flight Processing (Ephemeral Transit)
            </h2>
            <p>
              For enterprise and backend developers who explicitly choose our headless <strong>Cloud REST API</strong> (`https://api.trysqueeze.online/v1/convert`):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>
                <strong>Ephemeral Execution:</strong> Image payloads sent to our REST endpoint are received in volatile system memory, quantized, converted, and streamed directly back to your client.
              </li>
              <li>
                <strong>Zero Permanent Storage:</strong> Images processed through the REST API are never written to permanent disk storage, databases, or training datasets for machine learning models.
              </li>
              <li>
                <strong>Webhooks:</strong> When configured by the developer, automated webhook delivery notifications contain metadata and temporary download tokens that expire automatically.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Database className="h-4 w-4 text-emerald-400" /> 5. Local Storage Inventory &amp; Client State
            </h2>
            <p>
              Squeeze utilizes your browser&apos;s local storage (`localStorage`) to preserve your workflow preferences without requiring cloud user accounts:
            </p>
            <div className="rounded-xl border border-white/[0.08] bg-black/40 overflow-x-auto my-3">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/[0.08] text-zinc-400 uppercase text-[11px] bg-white/[0.02]">
                  <tr>
                    <th className="py-2.5 px-4">Key Identifier</th>
                    <th className="py-2.5 px-4">Purpose</th>
                    <th className="py-2.5 px-4">Storage Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-zinc-300 font-mono text-[11px]">
                  <tr>
                    <td className="py-2.5 px-4 text-emerald-400">squeeze_developer_key</td>
                    <td className="py-2.5 px-4 font-sans text-zinc-400">Saves your active developer sandbox API key for pre-populating code snippets.</td>
                    <td className="py-2.5 px-4">Client Browser</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-emerald-400">squeeze_developer_project</td>
                    <td className="py-2.5 px-4 font-sans text-zinc-400">Saves the registered application/project label for your sandbox environment.</td>
                    <td className="py-2.5 px-4">Client Browser</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-emerald-400">squeeze_settings</td>
                    <td className="py-2.5 px-4 font-sans text-zinc-400">Stores global preferences (default quality, SSIM guard threshold, EXIF stripping toggle).</td>
                    <td className="py-2.5 px-4">Client Browser</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-zinc-400">
              You can clear these preferences at any time by clearing your browser cookies and site storage for `trysqueeze.online`.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Cookie className="h-4 w-4 text-emerald-400" /> 6. Cookies, Analytics &amp; Advertising
            </h2>
            <p>
              To maintain Squeeze as a 100% free resource for users worldwide, we may display unobtrusive third-party advertisements (such as Google AdSense).
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>
                <strong>Third-Party Ad Cookies:</strong> Google and third-party advertising vendors use cookies to serve ads based on your prior visits to this website or other websites on the internet.
              </li>
              <li>
                <strong>Opt-Out Controls:</strong> You may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-200 underline underline-offset-2 hover:text-white"
                >
                  Google Ads Settings
                </a>{' '}
                or via the Network Advertising Initiative opt-out portal at{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-200 underline underline-offset-2 hover:text-white"
                >
                  aboutads.info
                </a>.
              </li>
              <li>
                <strong>Essential Infrastructure Logs:</strong> When accessing our website, standard web server logs (including your IP address, browser user-agent, and HTTP request headers) are processed temporarily by our hosting infrastructure (Vercel) to maintain network security and defend against DDoS attacks.
              </li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-400" /> 7. Privacy Rights Under GDPR, UK GDPR &amp; CCPA/CPRA
            </h2>
            <p>
              Regardless of your geographic location, we respect your comprehensive privacy rights:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>
                <strong>Right to Access &amp; Portability:</strong> Since we do not retain your image content, there is no private media stored on our servers to export.
              </li>
              <li>
                <strong>Right to Erasure (Right to be Forgotten):</strong> Registered developers can request complete deletion of their email and API key records at any time by contacting us.
              </li>
              <li>
                <strong>Do Not Sell My Personal Information:</strong> Squeeze does not sell, barter, or transfer personal information to data brokers.
              </li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> 8. Children&apos;s Privacy (COPPA Compliance)
            </h2>
            <p className="text-zinc-400">
              Squeeze does not knowingly solicit or collect personal identifiable information from children under the age of 13. Because our service requires no account registration and processes images entirely on the client&apos;s hardware, it is safe for educational and general audiences.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3 border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-bold text-white">9. Contact Our Data Protection Team</h2>
            <p className="text-zinc-400">
              If you have any questions, security disclosures, or privacy inquiries regarding this Privacy Policy or our client-side architecture, please contact our team directly:
            </p>
            <div className="rounded-xl border border-white/[0.08] bg-black/40 p-4 text-xs font-mono space-y-1">
              <p><span className="text-zinc-500">Email:</span> <a href="mailto:contact@trysqueeze.online" className="text-emerald-400 underline underline-offset-2">contact@trysqueeze.online</a></p>
              <p><span className="text-zinc-500">Service:</span> Squeeze Digital Engine</p>
              <p><span className="text-zinc-500">Website:</span> <a href="https://www.trysqueeze.online" className="text-zinc-300">https://www.trysqueeze.online</a></p>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
