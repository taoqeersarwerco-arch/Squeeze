'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ImageItem } from '@/lib/types';
import { formatBytes, formatFileName } from '@/lib/engine';
import { getSsimLabel } from '@/lib/ssim';
import { X, ZoomIn, Download, Check, Sparkles } from 'lucide-react';

interface CompareModalProps {
  item: ImageItem | null;
  onClose: () => void;
  slugifyNames: boolean;
}

export function CompareModal({ item, onClose, slugifyNames }: CompareModalProps) {
  const [dividerPos, setDividerPos] = useState(50);
  const [isZoomed, setIsZoomed] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const updateDividerFromClientX = useCallback((clientX: number) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setDividerPos(Math.max(0, Math.min(100, pos)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateDividerFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) {
      updateDividerFromClientX(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (e) {
      // Ignored
    }
  };

  if (!item || !item.outUrl) return null;

  const ssimInfo = item.ssim !== null && item.ssim !== undefined ? getSsimLabel(item.ssim) : null;
  const outName = formatFileName(item.file.name, item.targetFormat, slugifyNames);
  const savedBytes = item.file.size - item.outSize;
  const savedPercent = item.file.size > 0 ? Math.round((savedBytes / item.file.size) * 100) : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-150"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
          <div className="min-w-0 pr-4">
            <h3 className="truncate text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <span>{item.file.name}</span>
              <span className="rounded-md bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                {item.sourceFormat.toUpperCase()} &rarr; {item.targetFormat.toUpperCase()}
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isZoomed}
                onChange={(e) => setIsZoomed(e.target.checked)}
                className="rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
              />
              <ZoomIn className="h-3.5 w-3.5" />
              100% Zoom
            </label>

            <button
              onClick={onClose}
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Interactive Split Viewer Stage */}
        <div className="relative max-h-[58vh] overflow-auto bg-zinc-100 dark:bg-zinc-950/70 p-4 flex items-center justify-center">
          <div
            ref={stageRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`relative mx-auto select-none cursor-ew-resize overflow-hidden rounded-xl border border-zinc-300/60 dark:border-zinc-800 shadow-md ${
              isZoomed ? 'w-auto' : 'w-full max-w-2xl'
            }`}
            style={{ touchAction: 'none' }}
          >
            {/* Image A: Original */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.origUrl}
              alt="Original"
              className={`block w-full h-auto pointer-events-none ${isZoomed ? 'rendering-pixelated' : ''}`}
            />

            {/* Image B: Converted (Clipped) */}
            <div
              className="absolute inset-0 h-full pointer-events-none"
              style={{ clipPath: `inset(0 0 0 ${dividerPos}%)` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.outUrl}
                alt="Converted"
                className={`block w-full h-auto pointer-events-none ${isZoomed ? 'rendering-pixelated' : ''}`}
              />
            </div>

            {/* Split Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)] pointer-events-none"
              style={{ left: `${dividerPos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-zinc-900 shadow-lg border border-zinc-200">
                <span className="text-[10px] font-bold">&harr;</span>
              </div>
            </div>

            {/* Floating Labels */}
            <div className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-xs px-2.5 py-1 text-[11px] font-bold text-white pointer-events-none">
              Original ({item.sourceFormat.toUpperCase()})
            </div>
            <div className="absolute top-3 right-3 rounded-full bg-indigo-600/80 backdrop-blur-xs px-2.5 py-1 text-[11px] font-bold text-white pointer-events-none">
              Squeezed ({item.targetFormat.toUpperCase()})
            </div>
          </div>
        </div>

        {/* Divider Position Range Slider */}
        <div className="px-6 pt-3">
          <input
            type="range"
            min="0"
            max="100"
            step="0.5"
            value={dividerPos}
            onChange={(e) => setDividerPos(parseFloat(e.target.value))}
            className="w-full accent-indigo-600 cursor-ew-resize"
            aria-label="Divider position"
          />
        </div>

        {/* Technical Inspection & Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 border-t border-zinc-200 dark:border-zinc-800 text-xs">
          <div>
            <p className="text-zinc-400">File Size</p>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mt-0.5">
              {formatBytes(item.file.size)} &rarr; {formatBytes(item.outSize)}
            </p>
            <p className="text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
              {savedPercent > 0 ? `${savedPercent}% reduction` : 'Lossless structure'}
            </p>
          </div>

          <div>
            <p className="text-zinc-400">Dimensions</p>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mt-0.5">
              {item.outWidth > 0 ? `${item.outWidth} &times; ${item.outHeight} px` : 'Scalable vector'}
            </p>
            <p className="text-zinc-500 mt-0.5">
              {item.origWidth && item.outWidth !== item.origWidth ? 'Rescaled' : 'Full resolution'}
            </p>
          </div>

          <div>
            <p className="text-zinc-400">Perceptual Quality (SSIM)</p>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mt-0.5 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-500" />
              {item.ssim !== null ? `${(item.ssim * 100).toFixed(1)}%` : '100%'}
            </p>
            <p className="text-zinc-500 mt-0.5">
              {ssimInfo ? ssimInfo.label : 'Lossless format'}
            </p>
          </div>

          <div className="flex flex-col justify-end">
            <a
              href={item.outUrl}
              download={outName}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition"
            >
              <Download className="h-3.5 w-3.5" />
              Download {item.targetFormat.toUpperCase()}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
