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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-lg rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Sliders className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Conversion & Compression Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="space-y-5 pt-5 text-sm">
          {/* Default Target Format */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Default Target Format
            </label>
            <div className="grid grid-cols-5 gap-2">
              {Object.values(FORMATS).map((fmt) => (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => update({ targetFormat: fmt.id })}
                  className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border text-xs font-bold uppercase transition ${
                    settings.targetFormat === fmt.id
                      ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
                  }`}
                >
                  <span>{fmt.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Goal Selector */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Compression Priority
            </label>
            <div className="grid grid-cols-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 p-1">
              <button
                type="button"
                onClick={() => update({ goal: 'quality' })}
                className={`py-2 rounded-lg text-xs font-semibold transition ${
                  settings.goal === 'quality'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                Target Quality (SSIM)
              </button>
              <button
                type="button"
                onClick={() => update({ goal: 'size' })}
                className={`py-2 rounded-lg text-xs font-semibold transition ${
                  settings.goal === 'size'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                Target File Ratio
              </button>
            </div>
          </div>

          {/* Sliders depending on goal */}
          {settings.goal === 'quality' ? (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Visual Quality Level</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
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
                className="w-full accent-indigo-600"
              />
              <p className="text-[11px] text-zinc-400 mt-1">
                85% provides optimal visual preservation while eliminating invisible file weight.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Shrink Ratio Target</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
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
                className="w-full accent-indigo-600"
              />
            </div>
          )}

          {/* Max Edge Dimensions */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Maximum Dimension (Downscaling)
            </label>
            <select
              value={settings.maxEdge}
              onChange={(e) => update({ maxEdge: parseInt(e.target.value, 10) })}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Background Color (for JPG conversion)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.matteColor}
                onChange={(e) => update({ matteColor: e.target.value })}
                className="h-8 w-12 rounded cursor-pointer border border-zinc-200 dark:border-zinc-700"
              />
              <span className="text-xs text-zinc-500 font-mono">
                {settings.matteColor.toUpperCase()}
              </span>
              <span className="text-xs text-zinc-400">
                (Fills transparent areas when converting PNG/SVG to JPG)
              </span>
            </div>
          </div>

          {/* Web-friendly names */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={settings.slugifyNames}
              onChange={(e) => update({ slugifyNames: e.target.checked })}
              className="rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Web-friendly filenames (e.g. <code className="font-mono text-indigo-600">my-photo.webp</code>)
            </span>
          </label>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          {hasItems ? (
            <button
              type="button"
              onClick={() => {
                onReapply();
                onClose();
              }}
              className="rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 text-xs font-semibold hover:bg-zinc-800 transition"
            >
              Reapply to Current Files
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-indigo-600 text-white px-5 py-2 text-xs font-semibold hover:bg-indigo-500 transition shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
