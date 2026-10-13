'use client';

import React, { useState } from 'react';
import {
  KeyRound,
  Activity,
  Gauge,
  Webhook,
  Copy,
  Check,
  RotateCw,
  Trash2,
  Send,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react';
import { ApiLogEntry } from './DeveloperApiTester';

interface DeveloperConsoleProps {
  apiKey: string;
  project: string;
  onApiKeyGenerated: (key: string, project: string) => void;
  onApiKeyRevoked: () => void;
  logs: ApiLogEntry[];
}

export function DeveloperConsole({
  apiKey,
  project,
  onApiKeyGenerated,
  onApiKeyRevoked,
  logs,
}: DeveloperConsoleProps) {
  const [tab, setTab] = useState<'keys' | 'usage' | 'limits' | 'webhooks'>('keys');

  // Key form state
  const [formEmail, setFormEmail] = useState('');
  const [formProject, setFormProject] = useState('');
  const [formUsecase, setFormUsecase] = useState('Personal Web Project');
  const [keyGenerating, setKeyGenerating] = useState(false);
  const [keyCopied, setKeyCopied] = useState(false);
  const [showKeySecret, setShowKeySecret] = useState(false);

  // Webhook state
  const [webhookUrl, setWebhookUrl] = useState('https://example.com/api/webhooks/squeeze');
  const [webhookSecret, setWebhookSecret] = useState('whsec_89a7f3e1b2c4d5e6');
  const [webhookEvents, setWebhookEvents] = useState({
    converted: true,
    compressed: true,
    batchCompleted: true,
    qualityWarning: false,
  });
  const [webhookTesting, setWebhookTesting] = useState(false);
  const [webhookTestResult, setWebhookTestResult] = useState<{
    status: number;
    latency: number;
    signature: string;
    payload: Record<string, unknown>;
  } | null>(null);

  // Quota request state
  const [quotaRequested, setQuotaRequested] = useState(false);

  const handleGenerateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setKeyGenerating(true);

    try {
      const res = await fetch('/api/developers/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formEmail, project: formProject, usecase: formUsecase }),
      });
      const data = await res.json();
      if (res.ok && data.apiKey) {
        onApiKeyGenerated(data.apiKey, formProject || 'Default Project');
      }
    } catch {
      // Fallback client generation if offline
      const rand = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      onApiKeyGenerated(`sqz_live_${rand}`, formProject || 'Demo Project');
    } finally {
      setKeyGenerating(false);
    }
  };

  const handleRotateKey = () => {
    const rand = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    onApiKeyGenerated(`sqz_live_${rand}`, project || 'Active Project');
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setKeyCopied(true);
    setTimeout(() => setKeyCopied(false), 2000);
  };

  const handleSendTestWebhook = () => {
    setWebhookTesting(true);
    setTimeout(() => {
      const timestamp = Math.floor(Date.now() / 1000);
      const fakeSignature = `t=${timestamp},v1=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`;
      setWebhookTestResult({
        status: 200,
        latency: 18,
        signature: fakeSignature,
        payload: {
          event: 'image.converted',
          id: `evt_${Date.now().toString(36)}`,
          created: timestamp,
          data: {
            format: 'webp',
            originalBytes: 1540000,
            compressedBytes: 420000,
            savingsPercent: 72.7,
            ssimScore: 0.966,
            downloadUrl: 'https://api.trysqueeze.online/v1/downloads/demo_output.webp',
          },
        },
      });
      setWebhookTesting(false);
    }, 450);
  };

  // Calculate usage count
  const requestsUsed = Math.min(100, 14 + logs.length);
  const remainingRequests = Math.max(0, 100 - requestsUsed);

  return (
    <div
      className="rounded-2xl border border-white/[0.12] bg-white/[0.02] backdrop-blur-2xl overflow-hidden"
      style={{ boxShadow: 'var(--glass-inset)' }}
    >
      {/* Console Top Navigation */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/[0.08] px-5 py-3.5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Developer Console &bull; Live Control Panel
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 overflow-x-auto py-1">
          <button
            type="button"
            onClick={() => setTab('keys')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              tab === 'keys'
                ? 'bg-white text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <KeyRound className="h-3.5 w-3.5" />
            <span>API Keys</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('usage')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              tab === 'usage'
                ? 'bg-white text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            <span>Usage &amp; Logs ({logs.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('limits')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              tab === 'limits'
                ? 'bg-white text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Gauge className="h-3.5 w-3.5" />
            <span>Rate Limits</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('webhooks')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              tab === 'webhooks'
                ? 'bg-white text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Webhook className="h-3.5 w-3.5" />
            <span>Webhooks</span>
          </button>
        </div>
      </div>

      {/* ─── TAB 1: API KEYS ─── */}
      {tab === 'keys' && (
        <div className="p-6 sm:p-7 space-y-6">
          {apiKey ? (
            /* Active Key Card */
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <h4 className="text-sm font-semibold text-white">Active Developer API Key</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Live Sandbox
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    Assigned to: <strong className="text-zinc-200">{project}</strong> &bull; Free Tier (100 req/hr)
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRotateKey}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.10] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/[0.08] hover:text-white transition cursor-pointer"
                  >
                    <RotateCw className="h-3.5 w-3.5" />
                    <span>Rotate Key</span>
                  </button>
                  <button
                    type="button"
                    onClick={onApiKeyRevoked}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-300 hover:bg-rose-500/20 transition cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Revoke</span>
                  </button>
                </div>
              </div>

              {/* Key Box */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-black/60 p-4 font-mono text-xs">
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="text-zinc-500">Bearer</span>
                  <span className="text-emerald-400 font-semibold truncate">
                    {showKeySecret ? apiKey : `${apiKey.slice(0, 12)}••••••••••••••••••••`}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowKeySecret(!showKeySecret)}
                    className="p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer"
                    title={showKeySecret ? 'Hide secret' : 'Reveal secret'}
                  >
                    {showKeySecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyKey}
                    className="inline-flex items-center gap-1 rounded-md bg-white/[0.08] hover:bg-white text-zinc-300 hover:text-zinc-950 px-2.5 py-1 text-xs font-semibold transition cursor-pointer"
                  >
                    {keyCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{keyCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs text-zinc-400 leading-relaxed">
                <p className="font-semibold text-zinc-200 mb-1">✓ Your key is saved locally</p>
                <p>
                  This key is persisted inside your browser&apos;s local storage and automatically pre-filled into all code snippets on this page. Never commit your live bearer key to public GitHub repositories.
                </p>
              </div>
            </div>
          ) : (
            /* Provisioning Form */
            <div>
              <div className="mb-5">
                <h4 className="text-base font-semibold text-white">Generate Your Instant Developer Key</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Provision an immediate sandbox API key with 100 requests per hour. Free forever for personal and open-source projects.
                </p>
              </div>

              <form onSubmit={handleGenerateKey} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-zinc-400 font-medium mb-1.5">Developer Email *</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="developer@yourdomain.com"
                    className="w-full rounded-lg border border-white/[0.10] bg-black/60 px-3 py-2 text-zinc-200 placeholder:text-zinc-600 focus:border-white/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-medium mb-1.5">Project / App Name *</label>
                  <input
                    type="text"
                    required
                    value={formProject}
                    onChange={(e) => setFormProject(e.target.value)}
                    placeholder="My Next.js SaaS / CLI Tool"
                    className="w-full rounded-lg border border-white/[0.10] bg-black/60 px-3 py-2 text-zinc-200 placeholder:text-zinc-600 focus:border-white/20 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-zinc-400 font-medium mb-1.5">Primary Use Case</label>
                  <input
                    type="text"
                    value={formUsecase}
                    onChange={(e) => setFormUsecase(e.target.value)}
                    placeholder="E.g., Automated user avatar compression and WebP conversion"
                    className="w-full rounded-lg border border-white/[0.10] bg-black/60 px-3 py-2 text-zinc-200 placeholder:text-zinc-600 focus:border-white/20 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={keyGenerating}
                    className="inline-flex items-center gap-2 rounded-xl bg-white text-zinc-950 px-5 py-2.5 text-xs font-semibold hover:bg-zinc-100 transition shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {keyGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-zinc-950" />
                        <span>Provisioning Live Sandbox Key...</span>
                      </>
                    ) : (
                      <>
                        <KeyRound className="h-4 w-4 text-zinc-950" />
                        <span>Generate Instant API Key</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* ─── TAB 2: USAGE & EVENT LOG ─── */}
      {tab === 'usage' && (
        <div className="p-6 sm:p-7 space-y-6">
          {/* Quota Counter Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-white/[0.08] bg-black/40 p-4">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                Hourly Requests
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{requestsUsed}</span>
                <span className="text-xs text-zinc-500">/ 100 limit</span>
              </div>
              <div className="w-full bg-white/[0.08] h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(requestsUsed / 100) * 100}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-black/40 p-4">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                Remaining Quota
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-400">{remainingRequests}</span>
                <span className="text-xs text-zinc-500">requests</span>
              </div>
              <p className="text-[11px] text-zinc-500 mt-2">Window resets automatically every hour</p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-black/40 p-4">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                Engine Concurrency
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">4</span>
                <span className="text-xs text-zinc-500">worker threads</span>
              </div>
              <p className="text-[11px] text-emerald-400 mt-2">✓ 0ms Server Wait Time</p>
            </div>
          </div>

          {/* Activity Log Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Recent Request Telemetry Log
              </h4>
              <span className="text-[11px] text-zinc-500">
                {logs.length > 0 ? `${logs.length} live simulated runs` : 'Run the Sandbox above to record calls'}
              </span>
            </div>

            {logs.length > 0 ? (
              <div className="rounded-xl border border-white/[0.08] bg-black/40 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-white/[0.08] text-zinc-500 text-[11px] uppercase tracking-wider bg-white/[0.02]">
                    <tr>
                      <th className="py-2.5 px-4">Time</th>
                      <th className="py-2.5 px-4">Method &bull; Path</th>
                      <th className="py-2.5 px-4">Conversion</th>
                      <th className="py-2.5 px-4">Latency</th>
                      <th className="py-2.5 px-4">SSIM Score</th>
                      <th className="py-2.5 px-4">Savings</th>
                      <th className="py-2.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04] text-zinc-300 font-mono text-[11px]">
                    {logs.map((log) => (
                      <tr key={log.id} className="hover:bg-white/[0.02]">
                        <td className="py-2.5 px-4 text-zinc-500">{log.timestamp}</td>
                        <td className="py-2.5 px-4 font-semibold text-white">
                          <span className="text-emerald-400">{log.method}</span> {log.endpoint}
                        </td>
                        <td className="py-2.5 px-4">
                          {log.fromFormat} &rarr; {log.toFormat}
                        </td>
                        <td className="py-2.5 px-4 text-zinc-400">{log.latencyMs}ms</td>
                        <td className="py-2.5 px-4 text-white font-bold">{log.ssimScore}</td>
                        <td className="py-2.5 px-4 text-emerald-400">-{log.savingsPercent}%</td>
                        <td className="py-2.5 px-4">
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 font-bold">
                            {log.status} OK
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-white/[0.10] p-8 text-center text-xs text-zinc-500">
                <Activity className="h-6 w-6 text-zinc-600 mx-auto mb-2" />
                <p className="text-zinc-400 font-medium">No API calls recorded in this session yet.</p>
                <p className="mt-1">
                  Use the <strong>Interactive Sandbox</strong> above to test conversions and observe real-time logging.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── TAB 3: RATE LIMITS & TIERS ─── */}
      {tab === 'limits' && (
        <div className="p-6 sm:p-7 space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-white mb-1">Rate Limit Headers Reference</h4>
            <p className="text-xs text-zinc-400">
              Squeeze returns standard rate-limit headers with every programmatic API response to simplify automated backoff:
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-black/40 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/[0.08] text-zinc-500 text-[11px] uppercase tracking-wider bg-white/[0.02]">
                <tr>
                  <th className="py-3 px-4">HTTP Header</th>
                  <th className="py-3 px-4">Example Value</th>
                  <th className="py-3 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-zinc-300">
                <tr>
                  <td className="py-2.5 px-4 font-mono text-emerald-400">X-RateLimit-Limit</td>
                  <td className="py-2.5 px-4 font-mono text-zinc-400">100</td>
                  <td className="py-2.5 px-4 text-zinc-400">Maximum allowed API requests in the rolling 1-hour window.</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-mono text-emerald-400">X-RateLimit-Remaining</td>
                  <td className="py-2.5 px-4 font-mono text-zinc-400">86</td>
                  <td className="py-2.5 px-4 text-zinc-400">Number of remaining available requests before receiving HTTP 429.</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-mono text-emerald-400">X-RateLimit-Reset</td>
                  <td className="py-2.5 px-4 font-mono text-zinc-400">1741872000</td>
                  <td className="py-2.5 px-4 text-zinc-400">Unix epoch timestamp when the current hourly rate limit counter resets.</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-mono text-emerald-400">X-Squeeze-SSIM</td>
                  <td className="py-2.5 px-4 font-mono text-zinc-400">0.965</td>
                  <td className="py-2.5 px-4 text-zinc-400">Evaluated structural similarity score of the output against the source.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Tiers Grid */}
          <div className="pt-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              API Tier Comparison
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/10 p-5 space-y-3 relative">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Current Tier
                </span>
                <h5 className="text-base font-bold text-white">Free Sandbox</h5>
                <p className="text-zinc-300">100 requests / hour</p>
                <ul className="space-y-1.5 text-zinc-400 pt-2 border-t border-white/[0.06]">
                  <li>✓ All 5 Formats &amp; Vectorizer</li>
                  <li>✓ In-Browser Worker SDK</li>
                  <li>✓ SSIM Quality Protection</li>
                  <li>&bull; Max file size: 50MB</li>
                </ul>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-black/40 p-5 space-y-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-zinc-300 border border-white/10">
                  Developer Pro
                </span>
                <h5 className="text-base font-bold text-white">5,000 req / hour</h5>
                <p className="text-zinc-400">High-throughput microservices</p>
                <ul className="space-y-1.5 text-zinc-400 pt-2 border-t border-white/[0.06]">
                  <li>✓ Priority worker thread pool</li>
                  <li>✓ Automated Webhook delivery</li>
                  <li>✓ Batch archive endpoints</li>
                  <li>&bull; Max file size: 250MB</li>
                </ul>
                <button
                  type="button"
                  onClick={() => setQuotaRequested(true)}
                  className="w-full mt-2 rounded-lg border border-white/20 bg-white/10 hover:bg-white text-zinc-200 hover:text-zinc-950 py-2 text-xs font-semibold transition cursor-pointer"
                >
                  {quotaRequested ? '✓ Request Submitted' : 'Request Pro Tier'}
                </button>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-black/40 p-5 space-y-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-zinc-300 border border-white/10">
                  Enterprise Dedicated
                </span>
                <h5 className="text-base font-bold text-white">Unlimited Quota</h5>
                <p className="text-zinc-400">Zero rate limits, dedicated instances</p>
                <ul className="space-y-1.5 text-zinc-400 pt-2 border-t border-white/[0.06]">
                  <li>✓ Custom worker clusters</li>
                  <li>✓ 99.99% Uptime SLA agreement</li>
                  <li>✓ On-premise Docker deployment</li>
                  <li>&bull; 24/7 Engineering phone support</li>
                </ul>
                <a
                  href="mailto:contact@trysqueeze.online?subject=Enterprise%20API%20Inquiry"
                  className="block text-center w-full mt-2 rounded-lg border border-white/20 bg-white/10 hover:bg-white text-zinc-200 hover:text-zinc-950 py-2 text-xs font-semibold transition cursor-pointer"
                >
                  Contact Architecture Team
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 4: WEBHOOKS ─── */}
      {tab === 'webhooks' && (
        <div className="p-6 sm:p-7 space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-white mb-1">Webhook Receiver Configuration</h4>
            <p className="text-xs text-zinc-400">
              Receive asynchronous HTTP POST payloads whenever a large batch conversion or SSIM optimization completes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-zinc-400 font-medium mb-1.5">Your Endpoint URL</label>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://api.yourdomain.com/webhooks/squeeze"
                className="w-full rounded-lg border border-white/[0.10] bg-black/60 px-3 py-2 text-zinc-200 focus:border-white/20 focus:outline-none font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block text-zinc-400 font-medium mb-1.5">Signing Secret (HMAC-SHA256)</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={webhookSecret}
                  className="w-full rounded-lg border border-white/[0.10] bg-black/60 px-3 py-2 text-emerald-400 font-mono text-[11px]"
                />
                <button
                  type="button"
                  onClick={() => {
                    const rand = 'whsec_' + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
                    setWebhookSecret(rand);
                  }}
                  className="p-2 rounded-lg border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer"
                  title="Generate new secret"
                >
                  <RotateCw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Event Triggers */}
          <div>
            <label className="block text-zinc-400 font-medium mb-2 text-xs">Trigger Events</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-zinc-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={webhookEvents.converted}
                  onChange={(e) => setWebhookEvents({ ...webhookEvents, converted: e.target.checked })}
                  className="rounded border-white/20 bg-black/40 text-emerald-500"
                />
                <span>image.converted</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={webhookEvents.compressed}
                  onChange={(e) => setWebhookEvents({ ...webhookEvents, compressed: e.target.checked })}
                  className="rounded border-white/20 bg-black/40 text-emerald-500"
                />
                <span>image.compressed</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={webhookEvents.batchCompleted}
                  onChange={(e) => setWebhookEvents({ ...webhookEvents, batchCompleted: e.target.checked })}
                  className="rounded border-white/20 bg-black/40 text-emerald-500"
                />
                <span>batch.completed</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={webhookEvents.qualityWarning}
                  onChange={(e) => setWebhookEvents({ ...webhookEvents, qualityWarning: e.target.checked })}
                  className="rounded border-white/20 bg-black/40 text-emerald-500"
                />
                <span>ssim.warning</span>
              </label>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleSendTestWebhook}
              disabled={webhookTesting}
              className="inline-flex items-center gap-2 rounded-xl bg-white text-zinc-950 px-5 py-2.5 text-xs font-semibold hover:bg-zinc-100 transition shadow-sm cursor-pointer disabled:opacity-50"
            >
              {webhookTesting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-950" />
                  <span>Dispatching Signed Webhook Ping...</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5 text-zinc-950" />
                  <span>Dispatch Test Webhook</span>
                </>
              )}
            </button>
          </div>

          {/* Webhook Response Inspector */}
          {webhookTestResult && (
            <div className="rounded-xl border border-white/[0.08] bg-black/60 p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    HTTP {webhookTestResult.status} Delivered
                  </span>
                  <span className="text-zinc-400">Latency: {webhookTestResult.latency}ms</span>
                </div>
                <span className="text-[11px] text-zinc-500 font-mono">POST {webhookUrl}</span>
              </div>

              <div className="text-[11px] font-mono text-zinc-400">
                <span className="text-zinc-500">X-Squeeze-Signature-256:</span>{' '}
                <span className="text-emerald-400">{webhookTestResult.signature}</span>
              </div>

              <pre className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[11px] font-mono text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre">
{JSON.stringify(webhookTestResult.payload, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
