'use client';

import React from 'react';
import { ConversionSettings, SupportedFormat, CompressionGoal } from '@/lib/types';
import { FORMATS } from '@/lib/constants';
import { X, Sliders, Check } from 'lucide-react';

interface GlobalSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ConversionSettings;
  onUpdateSettings: (newSettings: ConversionSettings) => void;
  onReapply: () => void;
  hasItems: boolean;
}

export function GlobalSettingsModal({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onReapply,
  hasItems,
}: GlobalSettingsModalProps) {
  if (!isOpen) return null;

  const update = (partial: Partial<ConversionSettings>) => {
    onUpdateSettings({ ...settings, ...partial });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-lg rounded-[2rem] border border-white/15 bg-zinc-900/95 shadow-2xl shadow-black/80 p-6 sm:p-7">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Sliders className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white">
              Engine Parameters
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="space-y-5 pt-5 text-sm">
          {/* Default Target Format */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2">
              Default Target Format
            </label>
            <div className="grid grid-cols-5 gap-2">
              {Object.values(FORMATS).map((fmt) => (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => update({ targetFormat: fmt.id })}
                  className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border text-xs font-bold uppercase transition cursor-pointer ${
                    settings.targetFormat === fmt.id
                      ? 'border-indigo-500 bg-indigo-500/20 text-white shadow-md shadow-indigo-500/20'
                      : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span>{fmt.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Goal Selector */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2">
              Compression Algorithm Priority
            </label>
            <div className="grid grid-cols-2 rounded-xl bg-white/5 border border-white/10 p-1">
              <button
                type="button"
                onClick={() => update({ goal: 'quality' })}
                className={`py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  settings.goal === 'quality'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Target Quality (SSIM)
              </button>
              <button
                type="button"
                onClick={() => update({ goal: 'size' })}
                className={`py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  settings.goal === 'size'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Target File Shrink Ratio
              </button>
            </div>
          </div>

          {/* Sliders depending on goal */}
          {settings.goal === 'quality' ? (
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-medium text-zinc-300">Perceptual Quality Level</span>
                <span className="font-bold text-indigo-400 tabular-nums">
                  {Math.round(settings.targetQuality * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.3"
                max="1.0"
                step="0.05"
                value={settings.targetQuality}
                onChange={(e) => update({ targetQuality: parseFloat(e.target.value) })}
                className="w-full accent-indigo-500"
              />
              <p className="text-[11px] text-zinc-500 mt-1">
                85% provides optimal visual preservation while eliminating redundant byte bloat.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-medium text-zinc-300">Shrink Ratio Target</span>
                <span className="font-bold text-indigo-400 tabular-nums">
                  {settings.targetRatio}&times; smaller
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="25"
                step="1"
                value={settings.targetRatio}
                onChange={(e) => update({ targetRatio: parseInt(e.target.value, 10) })}
                className="w-full accent-indigo-500"
              />
            </div>
          )}

          {/* Max Edge Dimensions */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2">
              Maximum Edge (Downscaling Limit)
            </label>
            <select
              value={settings.maxEdge}
              onChange={(e) => update({ maxEdge: parseInt(e.target.value, 10) })}
              className="w-full rounded-xl border border-white/10 bg-zinc-800 px-3.5 py-2 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="0">Keep original resolution (No downscaling)</option>
              <option value="2560">Cap longest edge to 2560 px (WordPress / 4K)</option>
              <option value="1920">Cap longest edge to 1920 px (Full HD)</option>
              <option value="1280">Cap longest edge to 1280 px (Web standard)</option>
              <option value="800">Cap longest edge to 800 px (Thumbnail)</option>
            </select>
          </div>

          {/* Matte color for transparency -> JPG */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2">
              Alpha Matte Background (for JPG conversion)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.matteColor}
                onChange={(e) => update({ matteColor: e.target.value })}
                className="h-8 w-12 rounded cursor-pointer border border-white/15 bg-transparent"
              />
              <span className="text-xs text-zinc-400 font-mono">
                {settings.matteColor.toUpperCase()}
              </span>
              <span className="text-xs text-zinc-500">
                (Fills transparency when converting to JPEG)
              </span>
            </div>
          </div>

          {/* Web-friendly names */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={settings.slugifyNames}
              onChange={(e) => update({ slugifyNames: e.target.checked })}
              className="rounded border-white/20 bg-zinc-800 text-indigo-500 focus:ring-indigo-500"
            />
            <span className="text-xs font-medium text-zinc-300">
              Web-safe slugified filenames (e.g., <code className="font-mono text-indigo-400">clean-asset.webp</code>)
            </span>
          </label>
        </div>

        {/* Footer Actions */}
        <div className="mt-7 pt-4 border-t border-white/10 flex items-center justify-between">
          {hasItems ? (
            <button
              type="button"
              onClick={() => {
                onReapply();
                onClose();
              }}
              className="rounded-full border border-white/15 bg-white/10 text-white px-4 py-2 text-xs font-semibold hover:bg-white/15 transition cursor-pointer"
            >
              Reapply to Current Files
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-2 text-xs font-bold hover:from-indigo-500 hover:to-violet-500 transition shadow-md shadow-indigo-600/30 cursor-pointer"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
}
