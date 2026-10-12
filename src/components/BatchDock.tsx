'use client';

import React, { useState } from 'react';
import { ImageItem } from '@/lib/types';
import { formatBytes, formatFileName } from '@/lib/engine';
import JSZip from 'jszip';
import { Download, Trash2, Loader2, Archive } from 'lucide-react';

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
  const isSmaller = outTotal < origTotal;
  const isLarger = outTotal > origTotal;
  const diffTotal = Math.abs(origTotal - outTotal);
  const deltaPercent = origTotal > 0 ? Math.round((diffTotal / origTotal) * 100) : 0;

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
    <aside aria-label="Batch Actions" className="fixed bottom-5 left-0 right-0 z-40 px-4 pointer-events-none">
      <div className="relative mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-zinc-950/90 backdrop-blur-2xl p-2.5 sm:px-4 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8)] pointer-events-auto">
        {/* Specular edge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent" />

        {/* Left: Summary */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-medium text-white truncate tabular-nums">
              {pendingCount > 0 ? (
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Converting {doneItems.length + 1} of {items.length}...
                </span>
              ) : doneItems.length > 0 ? (
                isSmaller ? (
                  <span className="text-emerald-400 font-semibold">
                    Saved {formatBytes(diffTotal)} ({deltaPercent}% smaller)
                  </span>
                ) : isLarger ? (
                  <span className="text-amber-300 font-semibold">
                    +{formatBytes(diffTotal)} (+{deltaPercent}% larger)
                  </span>
                ) : (
                  <span className="text-zinc-300 font-medium">
                    Original size preserved (0% change)
                  </span>
                )
              ) : (
                'Converting...'
              )}
            </p>
            <p className="text-[11px] text-zinc-500 truncate tabular-nums hidden sm:block">
              {doneItems.length > 0 ? (
                isSmaller ? (
                  `${formatBytes(origTotal)} down to ${formatBytes(outTotal)}`
                ) : isLarger ? (
                  `${formatBytes(origTotal)} up to ${formatBytes(outTotal)}`
                ) : (
                  `${formatBytes(origTotal)} (unchanged)`
                )
              ) : (
                'Processing your images'
              )}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClearAll}
            className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs font-medium text-zinc-400 hover:bg-white/[0.08] hover:text-white transition cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadAll}
            disabled={doneItems.length === 0 || isZipping}
            className="flex items-center gap-2 rounded-lg bg-white text-zinc-900 pl-4 pr-3 py-2 text-xs font-semibold hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <span>
              {isZipping ? (
                'Zipping...'
              ) : doneItems.length === 1 ? (
                'Download'
              ) : (
                <>Download All ({doneItems.length})</>
              )}
            </span>

            {isZipping ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : doneItems.length === 1 ? (
              <Download className="h-3.5 w-3.5" />
            ) : (
              <Archive className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
