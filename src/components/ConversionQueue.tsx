'use client';

import React from 'react';
import { ImageItem, SupportedFormat } from '@/lib/types';
import { FORMATS } from '@/lib/constants';
import { formatBytes, formatFileName } from '@/lib/engine';
import { Download, Trash2, SplitSquareVertical, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

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
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>Files in Queue</span>
          <span className="rounded-full bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 text-xs text-zinc-700 dark:text-zinc-300">
            {items.length}
          </span>
        </h3>
        <span className="text-xs text-zinc-500">
          Tip: Click any thumbnail to preview & compare quality
        </span>
      </div>

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
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 shadow-sm hover:shadow-md transition-all"
            >
              {/* Left Section: Thumbnail & Metadata */}
              <div className="flex items-center gap-3.5 min-w-0">
                <button
                  type="button"
                  onClick={() => isDone && onOpenCompare(item)}
                  disabled={!isDone}
                  title="Click to compare before/after"
                  className={`relative flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 transition ${
                    isDone ? 'cursor-pointer hover:ring-2 hover:ring-indigo-500' : 'cursor-default'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.origUrl}
                    alt={item.file.name}
                    className="h-full w-full object-cover"
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs">
                      <Loader2 className="h-5 w-5 animate-spin text-white" />
                    </div>
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p
                      className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100"
                      title={item.file.name}
                    >
                      {item.file.name}
                    </p>
                    <span className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] font-bold uppercase text-zinc-600 dark:text-zinc-400">
                      {item.sourceFormat}
                    </span>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <span>{formatBytes(item.file.size)}</span>

                    {isDone && (
                      <>
                        <span>&rarr;</span>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {formatBytes(item.outSize)}
                        </span>

                        {savedPercent > 0 ? (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40">
                            -{savedPercent}% ({ratio}x smaller)
                          </span>
                        ) : (
                          <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-500">
                            Lossless container
                          </span>
                        )}

                        {item.ssim !== null && item.ssim !== undefined && (
                          <span className="text-[11px] text-zinc-400">
                            SSIM {(item.ssim * 100).toFixed(1)}%
                          </span>
                        )}
                      </>
                    )}

                    {isProcessing && (
                      <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        <Loader2 className="h-3 w-3 animate-spin" /> Compressing…
                      </span>
                    )}

                    {isError && (
                      <span className="text-red-500 flex items-center gap-1 font-medium">
                        <AlertCircle className="h-3 w-3" /> {item.error || 'Failed'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Section: Target Format, Compare, Download, Delete */}
              <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800">
                {/* Target Format Dropdown */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-zinc-400 hidden sm:inline">To:</span>
                  <select
                    value={item.targetFormat}
                    onChange={(e) => onUpdateTargetFormat(item.id, e.target.value as SupportedFormat)}
                    disabled={isProcessing}
                    className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/90 px-2.5 py-1.5 text-xs font-semibold uppercase text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {Object.values(FORMATS).map((fmt) => (
                      <option key={fmt.id} value={fmt.id}>
                        {fmt.id.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1">
                  {/* Compare Button */}
                  <button
                    type="button"
                    onClick={() => onOpenCompare(item)}
                    disabled={!isDone}
                    title="Compare original vs converted"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 disabled:opacity-30 transition"
                  >
                    <SplitSquareVertical className="h-4 w-4" />
                  </button>

                  {/* Single Download Link */}
                  {isDone && item.outUrl && (
                    <a
                      href={item.outUrl}
                      download={outFileName}
                      title={`Download ${outFileName}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:scale-105 transition"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  )}

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    title="Remove from queue"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-500 transition"
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
