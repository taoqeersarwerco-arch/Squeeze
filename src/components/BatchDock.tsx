'use client';

import React, { useState } from 'react';
import { ImageItem } from '@/lib/types';
import { formatBytes, formatFileName } from '@/lib/engine';
import JSZip from 'jszip';
import { Download, Trash2, Loader2, Sparkles, Archive } from 'lucide-react';

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
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200/90 dark:border-zinc-800/90 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md px-4 py-3 shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        {/* Left: Summary Stats */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Sparkles className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
              {pendingCount > 0 ? (
                <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Converting {doneItems.length + 1} of {items.length}…
                </span>
              ) : doneItems.length > 0 ? (
                <>
                  Saved {formatBytes(savedTotal)} ({savedPercent}%) across {doneItems.length} files
                </>
              ) : (
                'Processing queue…'
              )}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
              {doneItems.length > 0
                ? `${formatBytes(origTotal)} \u2192 ${formatBytes(outTotal)} total weight`
                : 'Waiting for files to finish'}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onClearAll}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Clear All</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadAll}
            disabled={doneItems.length === 0 || isZipping}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/25 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {isZipping ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Packaging ZIP…
              </>
            ) : doneItems.length === 1 ? (
              <>
                <Download className="h-4 w-4" />
                Download File
              </>
            ) : (
              <>
                <Archive className="h-4 w-4" />
                Download All ({doneItems.length})
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
