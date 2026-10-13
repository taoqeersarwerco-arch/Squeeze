'use client';

import React, { useState } from 'react';
import { Play, Loader2, Sliders } from 'lucide-react';

export interface ApiLogEntry {
  id: string;
  timestamp: string;
  endpoint: string;
  method: string;
  fromFormat: string;
  toFormat: string;
  latencyMs: number;
  ssimScore: number;
  savingsPercent: number;
  status: number;
}

interface DeveloperApiTesterProps {
  apiKey?: string;
  onLogRequest?: (entry: ApiLogEntry) => void;
}

export function DeveloperApiTester({ apiKey, onLogRequest }: DeveloperApiTesterProps) {
  const [fromFormat, setFromFormat] = useState('png');
  const [toFormat, setToFormat] = useState('webp');
  const [quality, setQuality] = useState(85);
  const [stripExif, setStripExif] = useState(true);
  const [matteColor, setMatteColor] = useState('#FFFFFF');
  const [maxEdge, setMaxEdge] = useState('2048');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    status: number;
    latencyMs: number;
    originalBytes: number;
    compressedBytes: number;
    savingsPercent: number;
    ssimScore: number;
    headers: Record<string, string>;
  } | null>(null);

  const handleSimulate = () => {
    setLoading(true);

    setTimeout(() => {
      // Calculate realistic metrics based on format and quality
      const baseOriginal = fromFormat === 'png' ? 2450000 : 1850000;
      let savings = 68;
      if (fromFormat === 'png' && toFormat === 'webp') savings = 72;
      else if (fromFormat === 'jpg' && toFormat === 'webp') savings = 34;
      else if (fromFormat === 'png' && toFormat === 'jpg') savings = 76;
      else if (toFormat === 'ico') savings = 45;
      else if (toFormat === 'svg') savings = 82;

      // Quality adjustment
      savings = Math.min(92, Math.max(20, Math.round(savings * (1 - (quality - 50) / 150))));

      const compressedBytes = Math.round(baseOriginal * (1 - savings / 100));
      const ssim = Number((0.94 + (quality / 100) * 0.055).toFixed(3));
      const latency = Math.floor(Math.random() * 16) + 22; // 22-38ms

      const simulatedEntry: ApiLogEntry = {
        id: `req_${Date.now().toString(36)}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        endpoint: '/v1/convert',
        method: 'POST',
        fromFormat: fromFormat.toUpperCase(),
        toFormat: toFormat.toUpperCase(),
        latencyMs: latency,
        ssimScore: ssim,
        savingsPercent: savings,
        status: 200,
      };

      setResult({
        status: 200,
        latencyMs: latency,
        originalBytes: baseOriginal,
        compressedBytes,
        savingsPercent: savings,
        ssimScore: ssim,
        headers: {
          'content-type': `image/${toFormat === 'ico' ? 'x-icon' : toFormat === 'svg' ? 'svg+xml' : toFormat}`,
          'x-squeeze-ssim': ssim.toString(),
          'x-squeeze-latency-ms': latency.toString(),
          'x-ratelimit-limit': '100',
          'x-ratelimit-remaining': '92',
          'x-ratelimit-reset': (Math.floor(Date.now() / 1000) + 2400).toString(),
        },
      });

      setLoading(false);

      if (onLogRequest) {
        onLogRequest(simulatedEntry);
      }
    }, 380);
  };

  return (
    <div
      className="rounded-2xl border border-white/[0.10] bg-white/[0.02] backdrop-blur-2xl p-6 sm:p-7 space-y-6"
      style={{ boxShadow: 'var(--glass-inset)' }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <Sliders className="h-4 w-4" />
            <span>Interactive Sandbox &amp; Request Tester</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            Simulate API Request In-Browser
          </h3>
        </div>

        <span className="text-[11px] font-mono text-zinc-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-md self-start sm:self-auto">
          Auth: {apiKey ? 'Bearer sqz_live_***' : 'Sandbox Demo Mode'}
        </span>
      </div>

      {/* Control Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div>
          <label className="block text-zinc-400 font-medium mb-1.5">Source Format</label>
          <select
            value={fromFormat}
            onChange={(e) => setFromFormat(e.target.value)}
            className="w-full rounded-lg border border-white/[0.10] bg-black/60 px-3 py-2 text-zinc-200 focus:border-white/20 focus:outline-none"
          >
            <option value="png">PNG (Portable Network Graphics)</option>
            <option value="jpg">JPG (Joint Photographic)</option>
            <option value="webp">WebP (Google Modern)</option>
            <option value="svg">SVG (Scalable Vector)</option>
          </select>
        </div>

        <div>
          <label className="block text-zinc-400 font-medium mb-1.5">Target Format</label>
          <select
            value={toFormat}
            onChange={(e) => setToFormat(e.target.value)}
            className="w-full rounded-lg border border-white/[0.10] bg-black/60 px-3 py-2 text-zinc-200 focus:border-white/20 focus:outline-none"
          >
            <option value="webp">WebP (High-Compression)</option>
            <option value="png">PNG (Lossless 32-bit)</option>
            <option value="jpg">JPG (24-bit Photo)</option>
            <option value="ico">ICO (Multi-Res 16-256px)</option>
            <option value="svg">SVG (Vector Traced)</option>
          </select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-zinc-400 font-medium">Quality ({quality}%)</label>
            <span className="text-[11px] text-emerald-400 font-mono">
              Target SSIM &ge; {(0.94 + (quality / 100) * 0.055).toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="40"
            max="100"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full h-1.5 bg-white/[0.10] rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
        </div>

        <div>
          <label className="block text-zinc-400 font-medium mb-1.5">Max Edge Rescaling</label>
          <select
            value={maxEdge}
            onChange={(e) => setMaxEdge(e.target.value)}
            className="w-full rounded-lg border border-white/[0.10] bg-black/60 px-3 py-2 text-zinc-200 focus:border-white/20 focus:outline-none"
          >
            <option value="original">Original Dimensions (100%)</option>
            <option value="2048">2,048 px (Web Standard)</option>
            <option value="1920">1,920 px (Full HD)</option>
            <option value="1080">1,080 px (Social Media)</option>
          </select>
        </div>
      </div>

      {/* Advanced Toggles */}
      <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-zinc-400">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={stripExif}
            onChange={(e) => setStripExif(e.target.checked)}
            className="rounded border-white/20 bg-black/40 text-emerald-500 focus:ring-0"
          />
          <span>Strip GPS &amp; Camera EXIF Metadata</span>
        </label>

        {toFormat === 'jpg' && (
          <div className="flex items-center gap-2">
            <span>Matte Background:</span>
            <input
              type="color"
              value={matteColor}
              onChange={(e) => setMatteColor(e.target.value)}
              className="h-5 w-6 rounded border border-white/10 bg-transparent cursor-pointer"
            />
            <span className="font-mono text-[11px] text-zinc-300">{matteColor}</span>
          </div>
        )}
      </div>

      {/* Trigger Button */}
      <div>
        <button
          type="button"
          onClick={handleSimulate}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-white text-zinc-950 px-5 py-2.5 text-xs font-semibold hover:bg-zinc-100 transition shadow-sm cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-zinc-950" />
              <span>Simulating Execution via Web Workers...</span>
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5 fill-zinc-950 text-zinc-950" />
              <span>Execute Simulated API Request</span>
            </>
          )}
        </button>
      </div>

      {/* Output Inspector */}
      {result && (
        <div className="rounded-xl border border-white/[0.08] bg-black/60 p-4 sm:p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.06] text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                HTTP {result.status} OK
              </span>
              <span className="text-zinc-400">Latency: <strong className="text-white">{result.latencyMs}ms</strong></span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-zinc-400">
                Byte Reduction: <strong className="text-emerald-400">-{result.savingsPercent}%</strong>
              </span>
              <span className="text-zinc-400">
                SSIM: <strong className="text-white">{result.ssimScore}</strong>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* Headers */}
            <div>
              <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold mb-2">
                Response Headers
              </p>
              <div className="rounded-lg bg-white/[0.02] border border-white/[0.04] p-3 space-y-1 text-zinc-400 text-[11px]">
                {Object.entries(result.headers).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-zinc-500">{key}:</span> <span className="text-zinc-300">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* JSON Payload */}
            <div>
              <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold mb-2">
                JSON Response Payload
              </p>
              <pre className="rounded-lg bg-white/[0.02] border border-white/[0.04] p-3 text-zinc-300 text-[11px] leading-relaxed overflow-x-auto whitespace-pre">
{JSON.stringify(
  {
    status: 'success',
    format: toFormat,
    originalBytes: result.originalBytes,
    compressedBytes: result.compressedBytes,
    savingsPercent: result.savingsPercent,
    ssimScore: result.ssimScore,
    latencyMs: result.latencyMs,
    metadata: {
      exifStripped: stripExif,
      matteApplied: toFormat === 'jpg' ? matteColor : null,
      maxEdgeCap: maxEdge,
    },
  },
  null,
  2
)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
