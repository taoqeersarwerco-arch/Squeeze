'use client';

import React from 'react';
import { ConversionSettings } from '@/lib/types';
import { FORMATS } from '@/lib/constants';
import { X, Sliders } from 'lucide-react';

interface GlobalSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ConversionSettings;
  onUpdateSettings: (newSettings: ConversionSettings) => void;
  onReapply: (customSettings?: ConversionSettings) => void;
  onResetDefaults?: () => void;
  hasItems: boolean;
}

export function GlobalSettingsModal({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onReapply,
  onResetDefaults,
  hasItems,
}: GlobalSettingsModalProps) {
  if (!isOpen) return null;

  const update = (partial: Partial<ConversionSettings>) => {
    onUpdateSettings({ ...settings, ...partial });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl p-4 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-zinc-950/95 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] p-6 sm:p-7"
        style={{ boxShadow: 'var(--glass-inset), 0 32px 64px -16px rgba(0,0,0,0.8)' }}
      >
        {/* Specular edge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent rounded-full" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-zinc-400">
              <Sliders className="h-4 w-4" />
            </div>
            <h3 className="text-base font-semibold text-white">
              Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-zinc-500 hover:bg-white/[0.08] hover:text-white transition cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="space-y-5 pt-5 text-sm">
          {/* Default Target Format */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-2">
              Save images as
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {Object.values(FORMATS).map((fmt) => (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => update({ targetFormat: fmt.id })}
                  className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-lg border text-xs font-medium uppercase transition cursor-pointer ${
                    settings.targetFormat === fmt.id
                      ? 'border-white/20 bg-white/[0.08] text-white'
                      : 'border-white/[0.06] bg-white/[0.02] text-zinc-500 hover:border-white/[0.12] hover:text-zinc-300'
                  }`}
                >
                  <span>{fmt.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Goal Selector */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-2">
              Optimize for
            </label>
            <div className="grid grid-cols-2 rounded-lg bg-white/[0.03] border border-white/[0.06] p-1">
              <button
                type="button"
                onClick={() => update({ goal: 'quality' })}
                className={`py-2 rounded-md text-xs font-medium transition cursor-pointer ${
                  settings.goal === 'quality'
                    ? 'bg-white/[0.08] text-white'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Best quality
              </button>
              <button
                type="button"
                onClick={() => update({ goal: 'size' })}
                className={`py-2 rounded-md text-xs font-medium transition cursor-pointer ${
                  settings.goal === 'size'
                    ? 'bg-white/[0.08] text-white'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Smallest file
              </button>
            </div>
          </div>

          {/* Sliders depending on goal */}
          {settings.goal === 'quality' ? (
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="font-medium text-zinc-400">Quality</span>
                <span className="font-semibold text-zinc-300 tabular-nums">
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
                className="w-full"
              />
              <p className="text-[11px] text-zinc-600 mt-1.5">
                Higher values keep more detail but produce larger files. 85% is a good default.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="font-medium text-zinc-400">Size reduction</span>
                <span className="font-semibold text-zinc-300 tabular-nums">
                  {settings.targetRatio}x smaller
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="25"
                step="1"
                value={settings.targetRatio}
                onChange={(e) => update({ targetRatio: parseInt(e.target.value, 10) })}
                className="w-full"
              />
              <p className="text-[11px] text-zinc-600 mt-1.5">
                Higher values make files much smaller but may reduce image sharpness.
              </p>
            </div>
          )}

          {/* Max Edge Dimensions */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-2">
              Maximum image size
            </label>
            <select
              value={settings.maxEdge}
              onChange={(e) => update({ maxEdge: parseInt(e.target.value, 10) })}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs font-medium text-zinc-300 focus:outline-none focus:ring-1 focus:ring-white/20 cursor-pointer"
            >
              <option value="0">Keep original size</option>
              <option value="2560">Up to 2560px (4K displays)</option>
              <option value="1920">Up to 1920px (Full HD)</option>
              <option value="1280">Up to 1280px (Web standard)</option>
              <option value="800">Up to 800px (Thumbnails)</option>
            </select>
            <p className="text-[11px] text-zinc-600 mt-1.5">
              Scales down images larger than this. Smaller images are kept as-is.
            </p>
          </div>

          {/* Matte color for transparency -> JPG */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-2">
              Background color for JPG
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.matteColor}
                onChange={(e) => update({ matteColor: e.target.value })}
                className="h-8 w-10 rounded cursor-pointer border border-white/[0.10] bg-transparent"
              />
              <span className="text-xs text-zinc-500 font-mono">
                {settings.matteColor.toUpperCase()}
              </span>
            </div>
            <p className="text-[11px] text-zinc-600 mt-1.5">
              When converting transparent images to JPG, this color fills the transparent areas.
            </p>
          </div>

          {/* Web-friendly names */}
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={settings.slugifyNames}
              onChange={(e) => update({ slugifyNames: e.target.checked })}
              className="rounded border-white/20 bg-white/[0.04] text-white focus:ring-white/20"
            />
            <div>
              <span className="text-xs font-medium text-zinc-300">
                Clean filenames for web
              </span>
              <p className="text-[11px] text-zinc-600">
                Removes spaces and special characters (e.g., <code className="font-mono text-zinc-400">my-photo.webp</code>)
              </p>
            </div>
          </label>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
          {onResetDefaults ? (
            <button
              type="button"
              onClick={onResetDefaults}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition cursor-pointer"
            >
              Reset to defaults
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/[0.08] bg-white/[0.04] text-zinc-400 px-3.5 py-2 text-xs font-medium hover:bg-white/[0.08] hover:text-white transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => {
                if (hasItems) {
                  onReapply(settings);
                }
                onClose();
              }}
              className="rounded-lg bg-white text-zinc-900 px-4 py-2 text-xs font-semibold hover:bg-zinc-100 transition cursor-pointer shadow-md"
            >
              {hasItems ? 'Apply & Re-convert' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
