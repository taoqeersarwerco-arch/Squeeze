'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ImageItem } from '@/lib/types';
import { formatBytes, formatFileName } from '@/lib/engine';
import { getSsimLabel } from '@/lib/ssim';
import { X, ZoomIn, Download, Sparkles, Check, ArrowRight } from 'lucide-react';

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

  // Self-healing Blob URL states
  const [origSrc, setOrigSrc] = useState<string>('');
  const [outSrc, setOutSrc] = useState<string>('');

  useEffect(() => {
    if (item?.origUrl) {
      setOrigSrc(item.origUrl);
    } else if (item?.file) {
      try {
        setOrigSrc(URL.createObjectURL(item.file));
      } catch {}
    }
    if (item?.outUrl) {
      setOutSrc(item.outUrl);
    } else if (item?.outBlob) {
      try {
        setOutSrc(URL.createObjectURL(item.outBlob));
      } catch {}
    }
  }, [item]);

  const handleOrigError = useCallback(() => {
    if (item?.file) {
      try {
        const fresh = URL.createObjectURL(item.file);
        setOrigSrc(fresh);
      } catch {}
    }
  }, [item?.file]);

  const handleOutError = useCallback(() => {
    if (item?.outBlob) {
      try {
        const fresh = URL.createObjectURL(item.outBlob);
        setOutSrc(fresh);
      } catch {}
    }
  }, [item?.outBlob]);

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

  const width = item.origWidth || item.outWidth || 800;
  const height = item.origHeight || item.outHeight || 600;
  const aspectRatio = `${width} / ${height}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/15 bg-zinc-900/90 shadow-2xl shadow-black/80">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="min-w-0 pr-4">
            <h3 className="truncate text-base font-bold text-white flex items-center gap-2.5">
              <span>{item.file.name}</span>
              <span className="rounded-full bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-0.5 text-xs font-semibold text-indigo-400">
                {item.sourceFormat.toUpperCase()} &rarr; {item.targetFormat.toUpperCase()}
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isZoomed}
                onChange={(e) => setIsZoomed(e.target.checked)}
                className="rounded border-white/20 bg-zinc-800 text-indigo-500 focus:ring-indigo-500"
              />
              <ZoomIn className="h-3.5 w-3.5 text-zinc-400" />
              100% Zoom
            </label>

            <button
              onClick={onClose}
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition cursor-pointer"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Interactive Split Viewer Stage */}
        <div className="relative min-h-[340px] sm:min-h-[460px] max-h-[64vh] overflow-hidden bg-black/60 p-4 sm:p-6 flex items-center justify-center">
          <div
            ref={stageRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`relative mx-auto select-none cursor-ew-resize overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/80 shadow-2xl flex items-center justify-center ${
              isZoomed ? 'w-auto' : 'w-full max-w-2xl'
            }`}
            style={{
              touchAction: 'none',
              aspectRatio,
              maxHeight: '54vh',
              maxWidth: '100%',
            }}
          >
            {/* Image A: Original */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={origSrc || item.origUrl}
              alt="Original"
              onError={handleOrigError}
              className={`block w-full h-full object-contain pointer-events-none select-none ${
                isZoomed ? 'rendering-pixelated scale-125' : ''
              }`}
            />

            {/* Image B: Converted (Clipped) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
              style={{ clipPath: `inset(0 0 0 ${dividerPos}%)` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={outSrc || item.outUrl}
                alt="Converted"
                onError={handleOutError}
                className={`block w-full h-full object-contain pointer-events-none select-none ${
                  isZoomed ? 'rendering-pixelated scale-125' : ''
                }`}
              />
            </div>

            {/* Glowing Split Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_14px_rgba(255,255,255,0.8)] pointer-events-none z-10"
              style={{ left: `${dividerPos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-950 shadow-2xl border border-white">
                <span className="text-xs font-black tracking-tighter">&harr;</span>
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute top-3 left-3 z-10 rounded-full bg-black/75 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white border border-white/15 pointer-events-none shadow-lg">
              Original ({item.sourceFormat.toUpperCase()})
            </div>
            <div className="absolute top-3 right-3 z-10 rounded-full bg-indigo-600/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white border border-indigo-400/30 pointer-events-none shadow-lg">
              Squeezed ({item.targetFormat.toUpperCase()})
            </div>
          </div>
        </div>

        {/* Divider Position Range Slider */}
        <div className="px-6 pt-4">
          <input
            type="range"
            min="0"
            max="100"
            step="0.5"
            value={dividerPos}
            onChange={(e) => setDividerPos(parseFloat(e.target.value))}
            className="w-full accent-indigo-500 cursor-ew-resize"
            aria-label="Divider position"
          />
        </div>

        {/* Technical Inspection & HUD Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 border-t border-white/10 text-xs">
          <div>
            <p className="text-zinc-400">File Weight</p>
            <p className="font-semibold text-white text-sm mt-0.5 tabular-nums">
              {formatBytes(item.file.size)} &rarr; {formatBytes(item.outSize)}
            </p>
            <p className="text-emerald-400 font-medium mt-0.5">
              {savedPercent > 0 ? `${savedPercent}% reduction` : 'Lossless container'}
            </p>
          </div>

          <div>
            <p className="text-zinc-400">Resolution</p>
            <p className="font-semibold text-white text-sm mt-0.5 tabular-nums">
              {item.outWidth > 0 ? `${item.outWidth} × ${item.outHeight} px` : 'Scalable vector'}
            </p>
            <p className="text-zinc-400 mt-0.5">
              {item.origWidth && item.outWidth !== item.origWidth ? 'Rescaled' : 'Full native resolution'}
            </p>
          </div>

          <div>
            <p className="text-zinc-400">Perceptual Fidelity</p>
            <p className="font-semibold text-white text-sm mt-0.5 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              {item.ssim !== null ? `${(item.ssim * 100).toFixed(1)}% SSIM` : '100%'}
            </p>
            <p className="text-zinc-400 mt-0.5">
              {ssimInfo ? ssimInfo.label : 'Lossless structure'}
            </p>
          </div>

          <div className="flex flex-col justify-end">
            <a
              href={item.outUrl}
              download={outName}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-violet-500 transition cursor-pointer"
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
