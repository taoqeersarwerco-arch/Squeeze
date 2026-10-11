'use client';

import React, { useState } from 'react';
import { ImageItem } from '@/lib/types';
import { formatBytes, formatFileName } from '@/lib/engine';
import JSZip from 'jszip';
import { Download, Trash2, Loader2, Sparkles, Archive, ArrowUpRight } from 'lucide-react';

interface BatchDockProps {
  items: ImageItem[];
  onClearAll: () => void;
  slugifyNames: boolean;
}

export function BatchDock({ items, onClearAll, slugifyNames }: BatchDockProps) {
  const [isZipping, setIsZipping] = useState(false);

  if (items.length === 0) return null;

  const doneItems = items.filter((i) => i.status === 'done' && i.outBlob);
  const pendingCount = items.filter((i) => i.status === 'processing' || i.status === 'pending').length;

  const origTotal = doneItems.reduce((acc, i) => acc + i.file.size, 0);
  const outTotal = doneItems.reduce((acc, i) => acc + i.outSize, 0);
  const savedTotal = origTotal - outTotal;
  const savedPercent = origTotal > 0 ? Math.round((savedTotal / origTotal) * 100) : 0;

  const handleDownloadAll = async () => {
    if (doneItems.length === 0) return;

    if (doneItems.length === 1) {
      // Single item direct download
      const item = doneItems[0];
      const link = document.createElement('a');
      link.href = item.outUrl!;
      link.download = formatFileName(item.file.name, item.targetFormat, slugifyNames);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    try {
      setIsZipping(true);
      const zip = new JSZip();
      const usedNames = new Set<string>();

      for (const item of doneItems) {
        let name = formatFileName(item.file.name, item.targetFormat, slugifyNames);
        const dotIdx = name.lastIndexOf('.');
        const base = dotIdx !== -1 ? name.slice(0, dotIdx) : name;
        const ext = dotIdx !== -1 ? name.slice(dotIdx) : '';

        let suffix = 1;
        while (usedNames.has(name)) {
          name = `${base}-${suffix++}${ext}`;
        }
        usedNames.add(name);

        zip.file(name, item.outBlob!);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipBlob);
      link.download = `squeeze-images-${new Date().toISOString().slice(0, 10)}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(link.href), 10000);
    } catch (e) {
      console.error('Failed to generate ZIP archive', e);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <aside aria-label="Batch Actions" className="fixed bottom-6 left-0 right-0 z-40 px-4 pointer-events-none">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-full border border-white/15 bg-zinc-950/85 backdrop-blur-2xl p-2 sm:p-2.5 sm:px-4 shadow-2xl shadow-black/90 pointer-events-auto">
        {/* Left: Summary Stats Pill */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400">
            <Sparkles className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-bold text-white truncate tabular-nums">
              {pendingCount > 0 ? (
                <span className="flex items-center gap-1.5 text-indigo-400">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Processing {doneItems.length + 1} of {items.length}…
                </span>
              ) : doneItems.length > 0 ? (
                <>
                  Saved {formatBytes(savedTotal)} ({savedPercent}%) across {doneItems.length} files
                </>
              ) : (
                'Processing queue…'
              )}
            </p>
            <p className="text-[11px] text-zinc-400 truncate tabular-nums hidden sm:block">
              {doneItems.length > 0
                ? `${formatBytes(origTotal)} → ${formatBytes(outTotal)} final weight`
                : 'Waiting for conversions to finish'}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClearAll}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-300 hover:bg-white/10 hover:text-white transition cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          {/* Button-in-Button Batch Download */}
          <button
            type="button"
            onClick={handleDownloadAll}
            disabled={doneItems.length === 0 || isZipping}
            className="group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 pl-4 sm:pl-5 pr-1.5 py-1.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <span>
              {isZipping ? (
                'Archiving…'
              ) : doneItems.length === 1 ? (
                'Download File'
              ) : (
                <>Download All ({doneItems.length})</>
              )}
            </span>

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white shadow-inner group-hover:scale-105 transition-transform">
              {isZipping ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : doneItems.length === 1 ? (
                <Download className="h-3.5 w-3.5" />
              ) : (
                <Archive className="h-3.5 w-3.5" />
              )}
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}
