'use client';

import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud, Plus, Image as ImageIcon, Sparkles } from 'lucide-react';
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
        className={`relative flex items-center justify-between gap-4 p-4 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
          isDragOver
            ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 shadow-md'
            : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/60 hover:border-indigo-400 hover:bg-zinc-50 dark:hover:bg-zinc-850'
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
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Plus className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Add more images
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Drop any JPG, PNG, WEBP, ICO, or SVG files here
            </p>
          </div>
        </div>

        <button
          type="button"
          className="rounded-lg bg-zinc-900 dark:bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white transition"
        >
          Browse Files
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
      className={`group relative flex flex-col items-center justify-center p-8 sm:p-14 text-center rounded-3xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
        isDragOver
          ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/30 scale-[1.01] shadow-xl shadow-indigo-500/10'
          : 'border-zinc-300 dark:border-zinc-700/80 bg-white/70 dark:bg-zinc-900/40 hover:border-indigo-500/70 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/80 shadow-sm'
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

      {/* Decorative Cloud Icon */}
      <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-b from-indigo-50 to-indigo-100/60 dark:from-zinc-800 dark:to-zinc-900 border border-indigo-200/50 dark:border-zinc-700/60 shadow-inner group-hover:scale-105 transition-transform duration-200">
        <UploadCloud className="h-10 w-10 text-indigo-600 dark:text-indigo-400 stroke-[1.75]" />
        <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
        {presetTargetFormat ? (
          <>
            Drop images to convert to{' '}
            <span className="text-indigo-600 dark:text-indigo-400 uppercase">
              {presetTargetFormat}
            </span>
          </>
        ) : (
          'Drop images here to convert & compress'
        )}
      </h2>

      <p className="max-w-md text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
        Fast, offline, and 100% private. Files never leave your browser. Paste from clipboard (<kbd className="rounded border border-zinc-300 dark:border-zinc-700 px-1 py-0.5 text-xs font-mono">Ctrl+V</kbd>) or drag & drop.
      </p>

      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 hover:from-indigo-500 hover:to-blue-500 hover:shadow-lg transition-all"
      >
        <ImageIcon className="h-4 w-4" />
        Choose Images from Device
      </button>

      {/* Supported format badges */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mr-1">
          Supports:
        </span>
        {Object.values(FORMATS).map((fmt) => (
          <span
            key={fmt.id}
            className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60"
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
  );
}
