'use client';

import React from 'react';
import { ImageItem, SupportedFormat } from '@/lib/types';
import { FORMATS } from '@/lib/constants';
import { formatBytes, formatFileName } from '@/lib/engine';
import { Download, Trash2, Loader2, AlertCircle } from 'lucide-react';

interface ConversionQueueProps {
  items: ImageItem[];
  onRemoveItem: (id: string) => void;
  onUpdateTargetFormat: (id: string, format: SupportedFormat) => void;
  slugifyNames: boolean;
}

export function ConversionQueue({
  items,
  onRemoveItem,
  onUpdateTargetFormat,
  slugifyNames,
}: ConversionQueueProps) {
  if (items.length === 0) return null;

  return (
    <div className="w-full space-y-3">
      {/* Queue Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[var(--text-secondary)]">
            Results
          </span>
          <span className="rounded-md bg-white/[0.05] px-2 py-0.5 text-[11px] font-medium text-zinc-400 border border-white/[0.06]">
            {items.length} file{items.length > 1 ? 's' : ''}
          </span>
        </div>
        <span className="text-[11px] text-zinc-500 hidden sm:inline">
          Processed locally in your browser
        </span>
      </div>

      {/* Queue Cards */}
      <div className="space-y-2">
        {items.map((item) => {
          const isDone = item.status === 'done' && item.outBlob;
          const isProcessing = item.status === 'processing';
          const isError = item.status === 'error';
          const origSize = item.file.size;
          const outSize = item.outSize;
          const isSmaller = isDone && outSize < origSize;
          const isLarger = isDone && outSize > origSize;
          const isIdentical = isDone && outSize === origSize;
          const diffBytes = Math.abs(origSize - outSize);
          const deltaPercent = origSize > 0 ? Math.round((diffBytes / origSize) * 100) : 0;
          const outFileName = formatFileName(item.file.name, item.targetFormat, slugifyNames);

          return (
            <div
              key={item.id}
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl hover:border-white/[0.12] transition-all duration-150"
              style={{ boxShadow: 'var(--glass-inset)' }}
            >
              {/* Left Section: Thumbnail & Metadata */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-black/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.origUrl}
                    alt={item.file.name}
                    className="h-full w-full object-cover"
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p
                      className="truncate text-sm font-medium text-white"
                      title={item.file.name}
                    >
                      {item.file.name}
                    </p>
                    <span className="rounded bg-white/[0.05] border border-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium uppercase text-zinc-500">
                      {item.sourceFormat}
                    </span>
                  </div>

                  {/* Size and stats */}
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-500 tabular-nums">
                    <span>{formatBytes(item.file.size)}</span>

                    {isDone && (
                      <>
                        <span className="text-zinc-600">&rarr;</span>
                        <span className="font-medium text-zinc-300">
                          {formatBytes(item.outSize)}
                        </span>

                        {isSmaller ? (
                          <span className="inline-flex items-center rounded-md bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 text-[11px] font-medium text-emerald-400">
                            &darr; {deltaPercent}% smaller
                          </span>
                        ) : isLarger ? (
                          <span
                            className="inline-flex items-center rounded-md bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 text-[11px] font-medium text-amber-300"
                            title="Format re-encode resulted in a larger file (typical when converting to uncompressed PNG)"
                          >
                            &uarr; +{deltaPercent}% larger
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-md bg-white/[0.04] border border-white/[0.08] px-1.5 py-0.5 text-[10px] text-zinc-300 font-medium">
                            Original size
                          </span>
                        )}

                        {item.ssim !== null && item.ssim !== undefined && (
                          <span className="hidden sm:inline text-[11px] text-zinc-400">
                            SSIM: {(item.ssim * 100).toFixed(1)}%
                          </span>
                        )}
                      </>
                    )}

                    {isProcessing && (
                      <span className="text-zinc-400 flex items-center gap-1.5 font-medium">
                        <Loader2 className="h-3 w-3 animate-spin" /> Converting...
                      </span>
                    )}

                    {isError && (
                      <span className="text-red-400/80 flex items-center gap-1 font-medium">
                        <AlertCircle className="h-3 w-3" /> This file could not be processed. Try a different format.
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Section: Target Format & Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.05]">
                {/* Target Format Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-zinc-500 hidden sm:inline">Save as:</span>
                  <select
                    value={item.targetFormat}
                    onChange={(e) => onUpdateTargetFormat(item.id, e.target.value as SupportedFormat)}
                    disabled={isProcessing}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-xs font-medium uppercase text-zinc-300 hover:border-white/[0.14] focus:outline-none focus:ring-1 focus:ring-white/20 cursor-pointer transition"
                  >
                    {Object.values(FORMATS).map((fmt) => (
                      <option key={fmt.id} value={fmt.id} className="bg-zinc-900 text-white">
                        {fmt.id.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Download Button */}
                  {isDone && item.outUrl && (
                    <a
                      href={item.outUrl}
                      download={outFileName}
                      title={`Download ${outFileName}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white text-zinc-900 px-3 py-1.5 text-xs font-semibold hover:bg-zinc-100 transition-colors cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </a>
                  )}

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    title="Remove"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-zinc-500 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
