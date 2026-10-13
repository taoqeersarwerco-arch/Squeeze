'use client';

import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud, Plus, ArrowUpRight } from 'lucide-react';
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

  // Compact add-more strip when items already exist
  if (hasItems) {
    return (
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`group relative flex items-center justify-between gap-4 p-2.5 rounded-xl border backdrop-blur-xl transition-all duration-200 cursor-pointer ${
          isDragOver
            ? 'border-white/20 bg-white/[0.06]'
            : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04]'
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
        <div className="flex items-center gap-3 px-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-zinc-400 group-hover:text-white transition-colors">
            <Plus className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              Add more images
            </p>
            <p className="text-xs text-[var(--text-secondary)]">
              Drop files or paste from clipboard
            </p>
          </div>
        </div>

        <button
          type="button"
          className="mr-1 inline-flex items-center gap-1.5 rounded-lg border border-white/[0.10] bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/[0.10] hover:text-white transition-all"
        >
          <span>Browse</span>
          <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
    );
  }

  // Full empty-state dropzone
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`group relative rounded-[2rem] p-[3px] transition-all duration-300 cursor-pointer ${
        isDragOver
          ? 'bg-white/[0.08]'
          : 'bg-white/[0.04] hover:bg-white/[0.06]'
      }`}
    >
      {/* Specular top edge */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent rounded-full" />

      {/* Inner glass pane */}
      <div
        className={`relative flex flex-col items-center justify-center p-10 sm:p-16 text-center rounded-[calc(2rem_-_3px)] border backdrop-blur-2xl transition-all duration-300 ${
          isDragOver
            ? 'border-white/[0.15] bg-white/[0.04]'
            : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.12]'
        }`}
        style={{ boxShadow: 'var(--glass-inset)' }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp,.ico,.svg,image/*"
          className="hidden"
          onChange={handleChange}
        />

        {/* Icon */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] group-hover:bg-white/[0.05] transition-all duration-200">
          <UploadCloud className="h-7 w-7 text-zinc-400 group-hover:text-zinc-200 transition-colors duration-200 stroke-[1.5]" />
        </div>

        {/* Headline */}
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-2">
          {presetTargetFormat ? (
            <>Drop images to convert to {presetTargetFormat.toUpperCase()}</>
          ) : (
            'Drop images here to convert'
          )}
        </h2>

        {/* Subtitle */}
        <p className="max-w-sm text-sm text-[var(--text-secondary)] mb-8 leading-relaxed">
          Your files never leave your device. Drag and drop, or paste with{' '}
          <kbd className="rounded border border-white/[0.10] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[11px] text-zinc-300">
            Ctrl+V
          </kbd>
        </p>

        {/* CTA Button */}
        <div className="inline-flex items-center gap-2.5 rounded-xl bg-white text-zinc-900 pl-5 pr-2 py-2 text-sm font-semibold shadow-lg group-hover:shadow-xl transition-all duration-200">
          <span>Select Images</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900/10">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Supported Formats */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-1.5">
          {Object.values(FORMATS).map((fmt) => (
            <span
              key={fmt.id}
              className="inline-flex items-center rounded-md px-2 py-1 text-[11px] font-medium text-zinc-500 bg-white/[0.03] border border-white/[0.06]"
            >
              {fmt.id.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
