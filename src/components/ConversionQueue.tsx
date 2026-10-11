'use client';

import React from 'react';
import { ImageItem, SupportedFormat } from '@/lib/types';
import { FORMATS } from '@/lib/constants';
import { formatBytes, formatFileName } from '@/lib/engine';
import { Download, Trash2, SplitSquareVertical, Loader2, AlertCircle, Sparkles } from 'lucide-react';

interface ConversionQueueProps {
  items: ImageItem[];
  onRemoveItem: (id: string) => void;
  onUpdateTargetFormat: (id: string, format: SupportedFormat) => void;
  onOpenCompare: (item: ImageItem) => void;
  slugifyNames: boolean;
}

export function ConversionQueue({
  items,
  onRemoveItem,
  onUpdateTargetFormat,
  onOpenCompare,
  slugifyNames,
}: ConversionQueueProps) {
  if (items.length === 0) return null;

  return (
    <div className="w-full space-y-3">
      {/* Queue Header */}
      <div className="flex items-center justify-between px-2 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Conversion Queue
          </span>
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-300 border border-white/10">
            {items.length} file{items.length > 1 ? 's' : ''}
          </span>
        </div>
        <span className="text-[11px] text-zinc-400 hidden sm:inline">
          Click any thumbnail to inspect pixel differences
        </span>
      </div>

      {/* Queue Cards */}
      <div className="space-y-2.5">
        {items.map((item) => {
          const isDone = item.status === 'done' && item.outBlob;
          const isProcessing = item.status === 'processing';
          const isError = item.status === 'error';
          const savedBytes = isDone ? item.file.size - item.outSize : 0;
          const savedPercent = isDone && item.file.size > 0 ? Math.round((savedBytes / item.file.size) * 100) : 0;
          const ratio = isDone && item.outSize > 0 ? (item.file.size / item.outSize).toFixed(1) : null;
          const outFileName = formatFileName(item.file.name, item.targetFormat, slugifyNames);

          return (
            <div
              key={item.id}
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl shadow-lg hover:border-white/20 transition-all duration-200"
            >
              {/* Left Section: Double-Bezel Thumbnail & Metadata */}
              <div className="flex items-center gap-3.5 min-w-0">
                <button
                  type="button"
                  onClick={() => isDone && onOpenCompare(item)}
                  disabled={!isDone}
                  title="Click to compare before/after"
                  className={`relative flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/40 transition-all duration-200 ${
                    isDone ? 'cursor-pointer hover:ring-2 hover:ring-indigo-500/60 hover:scale-105' : 'cursor-default'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.origUrl}
                    alt={item.file.name}
                    className="h-full w-full object-cover"
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs">
                      <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
                    </div>
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p
                      className="truncate text-sm font-semibold text-white"
                      title={item.file.name}
                    >
                      {item.file.name}
                    </p>
                    <span className="rounded-md bg-white/5 border border-white/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-zinc-300">
                      {item.sourceFormat}
                    </span>
                  </div>

                  {/* Size reduction and stats line */}
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-400 tabular-nums">
                    <span>{formatBytes(item.file.size)}</span>

                    {isDone && (
                      <>
                        <span className="text-zinc-400">&rarr;</span>
                        <span className="font-semibold text-white">
                          {formatBytes(item.outSize)}
                        </span>

                        {savedPercent > 0 ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-400">
                            -{savedPercent}% ({ratio}&times; smaller)
                          </span>
                        ) : (
                          <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] text-zinc-400">
                            Lossless container
                          </span>
                        )}

                        {item.ssim !== null && item.ssim !== undefined && (
                          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-indigo-300/80">
                            <Sparkles className="h-3 w-3 text-indigo-400" />
                            SSIM {(item.ssim * 100).toFixed(1)}%
                          </span>
                        )}
                      </>
                    )}

                    {isProcessing && (
                      <span className="text-indigo-400 flex items-center gap-1.5 font-medium">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Compressing…
                      </span>
                    )}

                    {isError && (
                      <span className="text-rose-400 flex items-center gap-1 font-medium">
                        <AlertCircle className="h-3.5 w-3.5" /> {item.error || 'Failed'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Section: Target Format Dropdown & Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                {/* Target Format Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400 hidden sm:inline">To:</span>
                  <select
                    value={item.targetFormat}
                    onChange={(e) => onUpdateTargetFormat(item.id, e.target.value as SupportedFormat)}
                    disabled={isProcessing}
                    className="rounded-xl border border-white/10 bg-zinc-800/80 px-3 py-1.5 text-xs font-bold uppercase text-white hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition"
                  >
                    {Object.values(FORMATS).map((fmt) => (
                      <option key={fmt.id} value={fmt.id} className="bg-zinc-900 text-white">
                        {fmt.id.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Compare Button */}
                  <button
                    type="button"
                    onClick={() => onOpenCompare(item)}
                    disabled={!isDone}
                    title="Compare before & after"
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white disabled:opacity-30 transition cursor-pointer"
                  >
                    <SplitSquareVertical className="h-4 w-4" />
                  </button>

                  {/* Direct Download Button */}
                  {isDone && item.outUrl && (
                    <a
                      href={item.outUrl}
                      download={outFileName}
                      title={`Download ${outFileName}`}
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600/90 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 hover:scale-105 transition cursor-pointer"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  )}

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    title="Remove item"
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:bg-rose-500/10 hover:border-rose-500/20 hover:text-rose-400 transition cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
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
