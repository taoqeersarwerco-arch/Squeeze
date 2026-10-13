'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DeveloperCodePlayground,
  DeveloperApiTester,
  DeveloperConsole,
} from '@/components';
import { ApiLogEntry } from './DeveloperApiTester';
import {
  Cpu,
  Server,
  ShieldCheck,
  Zap,
  Lock,
  FileCode,
  ExternalLink,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export function DeveloperHubClient() {
  const [apiKey, setApiKey] = useState<string>('');
  const [project, setProject] = useState<string>('');
  const [integrationMode, setIntegrationMode] = useState<'browser' | 'rest'>('browser');
  const [logs, setLogs] = useState<ApiLogEntry[]>([
    {
      id: 'init_1',
      timestamp: '14:28:10',
      endpoint: '/v1/convert',
      method: 'POST',
      fromFormat: 'PNG',
      toFormat: 'WEBP',
      latencyMs: 24,
      ssimScore: 0.985,
      savingsPercent: 78,
      status: 200,
    },
    {
      id: 'init_2',
      timestamp: '14:45:32',
      endpoint: '/v1/convert',
      method: 'POST',
      fromFormat: 'JPG',
      toFormat: 'WEBP',
      latencyMs: 19,
      ssimScore: 0.972,
      savingsPercent: 46,
      status: 200,
    },
  ]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Initialize from localStorage asynchronously
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedKey = localStorage.getItem('squeeze_developer_key');
        const savedProject = localStorage.getItem('squeeze_developer_project');
        if (savedKey) setApiKey(savedKey);
        if (savedProject) setProject(savedProject);
      } catch {
        // Ignore localStorage access issues
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleApiKeyGenerated = (newKey: string, newProject: string) => {
    setApiKey(newKey);
    setProject(newProject);
    try {
      localStorage.setItem('squeeze_developer_key', newKey);
      localStorage.setItem('squeeze_developer_project', newProject);
    } catch {
      // Ignore
    }
  };

  const handleApiKeyRevoked = () => {
    setApiKey('');
    setProject('');
    try {
      localStorage.removeItem('squeeze_developer_key');
      localStorage.removeItem('squeeze_developer_project');
    } catch {
      // Ignore
    }
  };

  const handleLogRequest = (entry: ApiLogEntry) => {
    setLogs((prev) => [entry, ...prev.slice(0, 24)]);
  };

  const faqs = [
    {
      q: 'How does the Client-Side SDK differ from the Cloud REST API?',
      a: 'The Browser SDK (@squeeze/browser) executes 100% in the client’s browser via dedicated Web Workers and OffscreenCanvas. No image bytes ever touch a remote server, ensuring zero egress costs, zero latency overhead, and complete privacy compliance (GDPR/HIPAA). The Cloud REST API provides headless server-to-server endpoints for Node.js, Python, Go, and automated background batch microservices.',
    },
    {
      q: 'Are images uploaded to any server when using the Browser SDK?',
      a: 'Never. In client SDK mode, image decoding, quantization, compression, and EXIF stripping are executed entirely inside the user’s local browser memory threads. Images remain completely isolated to the client device.',
    },
    {
      q: 'What is SSIM and how does Squeeze protect image fidelity?',
      a: 'Structural Similarity Index Measure (SSIM) is an advanced perceptual quality metric assessing structural information, luminance, and contrast against the original source image. Squeeze uses an iterative binary search loop that dynamically caps compression to guarantee an SSIM score >= 0.94 (human indistinguishable), preventing harsh pixelation and banding.',
    },
    {
      q: 'What rate limits apply to the Free Sandbox tier?',
      a: 'The Free Sandbox tier provides 100 API requests per rolling hour per key with a 50MB file size limit. If you exceed this quota, the API responds with HTTP 429 Too Many Requests and an X-RateLimit-Reset timestamp header. Developer Pro and Enterprise tiers provide up to unlimited requests.',
    },
    {
      q: 'Can Squeeze convert transparent PNGs into JPGs without black backgrounds?',
      a: 'Yes! The API and SDK accept a matteColor parameter (defaulting to #FFFFFF). Squeeze composites transparent alpha layers cleanly over the designated matte hex code before encoding to 24-bit JPEG, preventing unsightly black borders.',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* ─── Hero Section ─── */}
      <section className="text-center sm:text-left max-w-4xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Developer Hub &bull; Web Worker SDK &amp; Cloud API v1</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.15]">
          Programmatic Image Processing.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            Client-Side or Headless.
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
          Integrate lightning-fast image conversion, SSIM-guaranteed compression, and vector tracing into your applications. Free sandbox key with 100 req/hr active immediately.
        </p>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
          {[
            { title: 'Off-Thread Web Workers', desc: '0ms Main Thread Lag', icon: Cpu },
            { title: 'Zero Cloud Uploads', desc: 'Strict Client-Side Privacy', icon: ShieldCheck },
            { title: 'SSIM Guard Engine', desc: 'Lossless Perceptual Fidelity', icon: Zap },
            { title: 'Multi-Language SDKs', desc: 'cURL, TS, Python, Go, Rust', icon: FileCode },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-left"
                style={{ boxShadow: 'var(--glass-inset)' }}
              >
                <Icon className="h-4 w-4 text-emerald-400 mb-2" />
                <p className="text-xs font-bold text-white">{item.title}</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Dual Integration Architecture Switcher ─── */}
      <section className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Architecture Selection
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Choose Your Integration Paradigm
            </h2>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setIntegrationMode('browser')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                integrationMode === 'browser'
                  ? 'bg-white text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Cpu className="h-3.5 w-3.5" />
              <span>Browser Worker SDK</span>
            </button>
            <button
              type="button"
              onClick={() => setIntegrationMode('rest')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                integrationMode === 'rest'
                  ? 'bg-white text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Server className="h-3.5 w-3.5" />
              <span>Headless Cloud API</span>
            </button>
          </div>
        </div>

        {/* Paradigm Comparison Card */}
        <div
          className="mt-6 rounded-2xl border border-white/[0.10] bg-white/[0.02] p-6 sm:p-7 grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{ boxShadow: 'var(--glass-inset)' }}
        >
          <div className={`space-y-3 p-4 rounded-xl border transition ${
            integrationMode === 'browser'
              ? 'border-emerald-500/40 bg-emerald-950/10'
              : 'border-white/[0.06] bg-black/20 opacity-70'
          }`}>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase">
                <Cpu className="h-4 w-4" /> Client SDK (@squeeze/browser)
              </span>
              {integrationMode === 'browser' && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                  Selected
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-white">Client-Side Zero-Egress Engine</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Ideal for client apps, SaaS portals, and frontends where privacy and server hosting costs matter. Process multi-gigabyte queues directly on client cores without server load.
            </p>
            <ul className="text-xs text-zinc-300 space-y-1.5 pt-2 border-t border-white/[0.06]">
              <li className="flex items-center gap-2 text-emerald-400 font-medium">
                ✓ 100% GDPR, HIPAA, and SOC-2 compliant
              </li>
              <li>✓ Zero bandwidth egress charges</li>
              <li>✓ Instant zero-latency local pipeline</li>
              <li>✓ Offline &amp; PWA operational mode</li>
            </ul>
          </div>

          <div className={`space-y-3 p-4 rounded-xl border transition ${
            integrationMode === 'rest'
              ? 'border-emerald-500/40 bg-emerald-950/10'
              : 'border-white/[0.06] bg-black/20 opacity-70'
          }`}>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase">
                <Server className="h-4 w-4" /> Cloud REST API (/v1)
              </span>
              {integrationMode === 'rest' && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400">
                  Selected
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-white">Headless Microservice Endpoints</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Standard RESTful multipart HTTP endpoints for automated server workflows, CI/CD pipelines, backend microservices, and mobile native apps (iOS / Android).
            </p>
            <ul className="text-xs text-zinc-300 space-y-1.5 pt-2 border-t border-white/[0.06]">
              <li>✓ Works across any language (cURL, Python, Go, Rust)</li>
              <li>✓ Headless server-to-server webhook callbacks</li>
              <li>✓ Automated EXIF strip and SSIM thresholding</li>
              <li>✓ Base64 or stream response buffering</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── LIVE DEVELOPER CONSOLE ─── */}
      <section className="max-w-4xl mx-auto">
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Control Center
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Developer Console &amp; Key Management
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Provision instant API keys, monitor hourly quota, configure Webhooks, and inspect real-time request logs.
          </p>
        </div>

        <DeveloperConsole
          apiKey={apiKey}
          project={project}
          onApiKeyGenerated={handleApiKeyGenerated}
          onApiKeyRevoked={handleApiKeyRevoked}
          logs={logs}
        />
      </section>

      {/* ─── INTERACTIVE SANDBOX & TESTER ─── */}
      <section className="max-w-4xl mx-auto">
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Live Simulator
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            In-Browser API Sandbox &amp; Request Tester
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Test parameters directly in your browser. Simulated requests immediately trigger live telemetry in the Developer Console log above.
          </p>
        </div>

        <DeveloperApiTester apiKey={apiKey} onLogRequest={handleLogRequest} />
      </section>

      {/* ─── MULTI-LANGUAGE CODE PLAYGROUND ─── */}
      <section className="max-w-4xl mx-auto">
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Code Integration
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Interactive Multi-Language Code Explorer
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Copy production-ready integration snippets with your active API key automatically injected.
          </p>
        </div>

        <DeveloperCodePlayground apiKey={apiKey} />
      </section>

      {/* ─── Web Worker Pipeline Architecture Diagram ─── */}
      <section className="max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            System Design
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Off-Thread Web Worker Pipeline Architecture
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            How Squeeze isolates heavy pixel math from your main browser UI thread for 60 FPS performance.
          </p>
        </div>

        <div
          className="rounded-2xl border border-white/[0.10] bg-white/[0.02] p-6 sm:p-8 space-y-8"
          style={{ boxShadow: 'var(--glass-inset)' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Buffer Ingestion',
                sub: 'ArrayBuffer / Stream',
                desc: 'Raw binary read into memory without freezing the UI event loop via FileReaderSync.',
              },
              {
                step: '02',
                title: 'OffscreenCanvas',
                sub: 'Parallel Worker Threads',
                desc: 'Images rendered and rescaled off-thread across available navigator.hardwareConcurrency cores.',
              },
              {
                step: '03',
                title: 'Perceptual SSIM Guard',
                sub: 'Iterative Quality Search',
                desc: 'Compares pixel luminance variance to ensure output SSIM >= target before serialization.',
              },
              {
                step: '04',
                title: 'Blob Synthesis & Strip',
                sub: 'Sanitized Output',
                desc: 'EXIF/GPS metadata stripped, quantized into WebP/PNG/JPG/SVG/ICO, and emitted as Blob.',
              },
            ].map((node) => (
              <div
                key={node.step}
                className="relative rounded-xl border border-white/[0.08] bg-black/40 p-5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-400">{node.step}</span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">{node.sub}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{node.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{node.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs text-zinc-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Lock className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>
                Zero byte transmission guarantee: Client SDK operations never perform an outbound HTTP POST for images.
              </span>
            </div>
            <Link
              href="/privacy"
              className="text-zinc-200 underline underline-offset-2 hover:text-white transition flex-shrink-0 text-xs"
            >
              Read Security Whitepaper &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Full API Reference & Parameter Matrices ─── */}
      <section className="max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            API Specification
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            HTTP Endpoint Reference &amp; Parameter Matrix
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Complete multipart/form-data schemas and HTTP status code definitions.
          </p>
        </div>

        <div className="space-y-6">
          {/* Endpoint 1: /v1/convert */}
          <div
            className="rounded-2xl border border-white/[0.10] bg-white/[0.02] overflow-hidden"
            style={{ boxShadow: 'var(--glass-inset)' }}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-white/[0.02]">
              <div className="flex items-center gap-2.5 font-mono text-xs">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">POST</span>
                <span className="text-white font-bold">/v1/convert</span>
              </div>
              <span className="text-[11px] text-zinc-400">Content-Type: multipart/form-data</span>
            </div>

            <div className="p-5 sm:p-6 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/[0.08] text-zinc-500 text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="pb-3 pr-4">Parameter</th>
                    <th className="pb-3 pr-4">Type</th>
                    <th className="pb-3 pr-4">Required</th>
                    <th className="pb-3 pr-4">Default</th>
                    <th className="pb-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-zinc-300 font-mono text-[11px]">
                  <tr>
                    <td className="py-2.5 pr-4 text-emerald-400 font-bold">file</td>
                    <td className="py-2.5 pr-4 text-zinc-400">Binary File</td>
                    <td className="py-2.5 pr-4 text-rose-400 font-semibold">Yes</td>
                    <td className="py-2.5 pr-4 text-zinc-500">-</td>
                    <td className="py-2.5 font-sans text-zinc-400">The source image binary (PNG, JPG, WebP, SVG).</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-emerald-400 font-bold">format</td>
                    <td className="py-2.5 pr-4 text-zinc-400">string</td>
                    <td className="py-2.5 pr-4 text-rose-400 font-semibold">Yes</td>
                    <td className="py-2.5 pr-4 text-zinc-500">-</td>
                    <td className="py-2.5 font-sans text-zinc-400">Target format: webp | png | jpg | ico | svg.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-emerald-400 font-bold">quality</td>
                    <td className="py-2.5 pr-4 text-zinc-400">integer</td>
                    <td className="py-2.5 pr-4 text-zinc-500">No</td>
                    <td className="py-2.5 pr-4 text-zinc-300">85</td>
                    <td className="py-2.5 font-sans text-zinc-400">Compression quality scalar between 1 and 100.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-emerald-400 font-bold">targetSsim</td>
                    <td className="py-2.5 pr-4 text-zinc-400">float</td>
                    <td className="py-2.5 pr-4 text-zinc-500">No</td>
                    <td className="py-2.5 pr-4 text-zinc-300">0.95</td>
                    <td className="py-2.5 font-sans text-zinc-400">Minimum allowable perceptual structural similarity.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-emerald-400 font-bold">stripExif</td>
                    <td className="py-2.5 pr-4 text-zinc-400">boolean</td>
                    <td className="py-2.5 pr-4 text-zinc-500">No</td>
                    <td className="py-2.5 pr-4 text-zinc-300">true</td>
                    <td className="py-2.5 font-sans text-zinc-400">Remove camera geolocation and device metadata.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-emerald-400 font-bold">matteColor</td>
                    <td className="py-2.5 pr-4 text-zinc-400">hex string</td>
                    <td className="py-2.5 pr-4 text-zinc-500">No</td>
                    <td className="py-2.5 pr-4 text-zinc-300">#FFFFFF</td>
                    <td className="py-2.5 font-sans text-zinc-400">Background fill color for transparent PNG to JPG conversions.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Endpoint 2: /v1/compress */}
          <div
            className="rounded-2xl border border-white/[0.10] bg-white/[0.02] overflow-hidden"
            style={{ boxShadow: 'var(--glass-inset)' }}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-white/[0.02]">
              <div className="flex items-center gap-2.5 font-mono text-xs">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">POST</span>
                <span className="text-white font-bold">/v1/compress</span>
              </div>
              <span className="text-[11px] text-zinc-400">Direct byte size squashing</span>
            </div>

            <div className="p-5 sm:p-6 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/[0.08] text-zinc-500 text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="pb-3 pr-4">Parameter</th>
                    <th className="pb-3 pr-4">Type</th>
                    <th className="pb-3 pr-4">Required</th>
                    <th className="pb-3 pr-4">Default</th>
                    <th className="pb-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-zinc-300 font-mono text-[11px]">
                  <tr>
                    <td className="py-2.5 pr-4 text-emerald-400 font-bold">file</td>
                    <td className="py-2.5 pr-4 text-zinc-400">Binary File</td>
                    <td className="py-2.5 pr-4 text-rose-400 font-semibold">Yes</td>
                    <td className="py-2.5 pr-4 text-zinc-500">-</td>
                    <td className="py-2.5 font-sans text-zinc-400">Source image file to compress without format change.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-emerald-400 font-bold">targetSizeKb</td>
                    <td className="py-2.5 pr-4 text-zinc-400">integer</td>
                    <td className="py-2.5 pr-4 text-zinc-500">No</td>
                    <td className="py-2.5 pr-4 text-zinc-500">null</td>
                    <td className="py-2.5 font-sans text-zinc-400">Explicit target ceiling in kilobytes (e.g. 200 for 200KB limit).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Status Codes Table */}
          <div
            className="rounded-2xl border border-white/[0.10] bg-white/[0.02] overflow-hidden"
            style={{ boxShadow: 'var(--glass-inset)' }}
          >
            <div className="px-5 py-3.5 border-b border-white/[0.08] bg-white/[0.02]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Standard HTTP Error &amp; Status Code Contract
              </h4>
            </div>

            <div className="p-5 sm:p-6 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/[0.08] text-zinc-500 text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="pb-3 pr-4">Code</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3">Description &amp; Remediation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-zinc-300 font-mono text-[11px]">
                  <tr>
                    <td className="py-2.5 pr-4 text-emerald-400 font-bold">200</td>
                    <td className="py-2.5 pr-4 text-zinc-300">OK</td>
                    <td className="py-2.5 font-sans text-zinc-400">Conversion succeeded. Payload includes downloadUrl, ssimScore, and latencyMs.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-amber-400 font-bold">400</td>
                    <td className="py-2.5 pr-4 text-zinc-300">Bad Request</td>
                    <td className="py-2.5 font-sans text-zinc-400">Missing multipart fields or unsupported file MIME type.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-amber-400 font-bold">401</td>
                    <td className="py-2.5 pr-4 text-zinc-300">Unauthorized</td>
                    <td className="py-2.5 font-sans text-zinc-400">Missing or invalid Authorization: Bearer token header.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-amber-400 font-bold">413</td>
                    <td className="py-2.5 pr-4 text-zinc-300">Payload Too Large</td>
                    <td className="py-2.5 font-sans text-zinc-400">File size exceeds tier ceiling (50MB free, 250MB pro).</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-rose-400 font-bold">429</td>
                    <td className="py-2.5 pr-4 text-zinc-300">Too Many Requests</td>
                    <td className="py-2.5 font-sans text-zinc-400">Hourly quota reached. Inspect X-RateLimit-Reset header for backoff duration.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Developer FAQ Accordion ─── */}
      <section className="max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Developer Knowledge Base
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-semibold text-white hover:bg-white/[0.02] transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs text-zinc-400 leading-relaxed border-t border-white/[0.04] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="max-w-4xl mx-auto rounded-2xl border border-white/[0.12] bg-gradient-to-br from-emerald-950/20 via-black to-zinc-950 p-8 sm:p-10 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">
          Ready to supercharge your image infrastructure?
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
          Need higher quotas or on-premise container deployment? Our architecture engineers are available for custom enterprise consultations.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-white text-zinc-950 px-5 py-2.5 text-xs font-bold hover:bg-zinc-100 transition shadow-sm"
          >
            <span>Open Browser Converter UI</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <a
            href="mailto:contact@trysqueeze.online?subject=Developer%20API%20Architecture%20Inquiry"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/20 transition"
          >
            <span>Contact Architecture Team</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
}
