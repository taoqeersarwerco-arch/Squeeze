'use client';

import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud, Plus, ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { FORMATS } from '@/lib/constants';
import { SupportedFormat } from '@/lib/types';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  hasItems: boolean;
  presetTargetFormat?: SupportedFormat;
}

export function DropZone({ onFilesSelected, hasItems, presetTargetFormat }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global window drag & paste listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData?.files && e.clipboardData.files.length > 0) {
        onFilesSelected(Array.from(e.clipboardData.files));
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [onFilesSelected]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  if (hasItems) {
    return (
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`group relative flex items-center justify-between gap-4 p-2 rounded-2xl border transition-all duration-200 cursor-pointer ${
          isDragOver
            ? 'border-indigo-500 bg-indigo-500/15 shadow-lg shadow-indigo-500/20'
            : 'border-white/10 bg-zinc-900/40 hover:border-white/20 hover:bg-zinc-900/60'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp,.ico,.svg,image/*"
          className="hidden"
          onChange={handleChange}
        />
        <div className="flex items-center gap-3.5 px-3 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-105 transition-transform">
            <Plus className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              Add more photos or vectors
            </p>
            <p className="text-xs text-zinc-400">
              Drag & drop more files or paste directly from clipboard
            </p>
          </div>
        </div>

        <button
          type="button"
          className="mr-2 inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15 transition-all shadow-sm"
        >
          <span>Browse Files</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-zinc-300" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`group relative rounded-[2.5rem] p-2 transition-all duration-300 cursor-pointer ${
        isDragOver
          ? 'bg-gradient-to-b from-indigo-500/30 to-violet-500/20 shadow-2xl shadow-indigo-500/25 scale-[1.01]'
          : 'bg-gradient-to-b from-white/10 via-white/5 to-transparent shadow-xl hover:from-white/15'
      }`}
    >
      {/* Outer Shell Border Highlight */}
      <div
        className={`relative flex flex-col items-center justify-center p-8 sm:p-14 text-center rounded-[calc(2.5rem-0.5rem)] border backdrop-blur-2xl transition-all duration-300 ${
          isDragOver
            ? 'border-indigo-400/50 bg-zinc-950/80'
            : 'border-white/10 bg-zinc-950/70 hover:border-white/20'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp,.ico,.svg,image/*"
          className="hidden"
          onChange={handleChange}
        />

        {/* Ambient Top Glow Beacon */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50 blur-xs" />

        {/* Machined Hardware Icon Enclosure */}
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/15 shadow-inner group-hover:scale-105 transition-transform duration-300">
          <UploadCloud className="h-9 w-9 text-indigo-400 stroke-[1.75]" />
          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/90 text-white shadow-md border border-zinc-950">
            <Sparkles className="h-3 w-3" />
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 max-w-lg">
          {presetTargetFormat ? (
            <>
              Drop images to convert to{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent uppercase">
                {presetTargetFormat}
              </span>
            </>
          ) : (
            <>
              Drop images to <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">convert & squeeze</span>
            </>
          )}
        </h2>

        {/* Subtitle with Clipboard indicator */}
        <p className="max-w-md text-sm text-zinc-400 mb-8 leading-relaxed">
          Zero uploads. 100% in-browser compute. Drag & drop files, or paste from clipboard with{' '}
          <kbd className="rounded-md border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-zinc-300">
            Ctrl+V
          </kbd>
        </p>

        {/* Nested Button-in-Button CTA Architecture */}
        <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 pl-6 pr-2 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 group-hover:shadow-indigo-500/50 group-hover:from-indigo-500 group-hover:to-violet-500 transition-all duration-200">
          <span>Choose Files from Device</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white shadow-inner group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        {/* Formats Grid Pill */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mr-1 flex items-center gap-1">
            <Layers className="h-3 w-3" />
            Supports:
          </span>
          {Object.values(FORMATS).map((fmt) => (
            <span
              key={fmt.id}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-zinc-300 bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: fmt.color }}
              />
              {fmt.id.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
