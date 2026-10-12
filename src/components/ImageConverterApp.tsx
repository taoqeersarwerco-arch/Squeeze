'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ImageItem, SupportedFormat, ConversionSettings } from '@/lib/types';
import { DEFAULT_SETTINGS, FORMATS } from '@/lib/constants';
import { detectFormat, getEngine } from '@/lib/engine';
import { Navbar } from './Navbar';
import { DropZone } from './DropZone';
import { ConversionQueue } from './ConversionQueue';
import { GlobalSettingsModal } from './GlobalSettingsModal';
import { BatchDock } from './BatchDock';
import { AdBanner } from './AdBanner';
import { FaqSection } from './FaqSection';
import { Footer } from './Footer';
import { ConversionHubGrid } from './ConversionHubGrid';

interface ImageConverterAppProps {
  initialTargetFormat?: SupportedFormat;
  initialSourceFormat?: SupportedFormat;
  pageTitle?: string;
  pageSubtitle?: string;
  children?: React.ReactNode;
}

export function ImageConverterApp({
  initialTargetFormat,
  pageTitle,
  pageSubtitle,
  children,
}: ImageConverterAppProps) {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [settings, setSettings] = useState<ConversionSettings>(() => ({
    ...DEFAULT_SETTINGS,
    targetFormat: initialTargetFormat || DEFAULT_SETTINGS.targetFormat,
  }));
  const [prevTargetFormat, setPrevTargetFormat] = useState(initialTargetFormat);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const activeUrlsRef = useRef<Set<string>>(new Set());

  // Adjust target format during render if prop changes (React recommended pattern)
  if (initialTargetFormat !== prevTargetFormat) {
    setPrevTargetFormat(initialTargetFormat);
    setSettings((prev) => ({
      ...prev,
      targetFormat: initialTargetFormat || DEFAULT_SETTINGS.targetFormat,
    }));
  }

  // Clean up object URLs on component unmount ONLY
  useEffect(() => {
    const urls = activeUrlsRef.current;
    return () => {
      urls.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {
          // Ignore
        }
      });
      urls.clear();
    };
  }, []);

  // Process a single item
  const processItem = useCallback(
    async (item: ImageItem, activeSettings: ConversionSettings) => {
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, status: 'processing', error: undefined } : i
        )
      );

      try {
        const engine = getEngine();
        const res = await engine.runJob(
          item.file,
          item.sourceFormat,
          activeSettings,
          item.id
        );

        if (!res.success || !res.outBlobData) {
          throw new Error(res.error || 'Conversion failed.');
        }

        let outBlob = new Blob([res.outBlobData], { type: res.outMime || 'application/octet-stream' });
        let outSize = res.outSize || outBlob.size;

        // Smart Same-Format Bloat Guard:
        // If the source format matches the target format, no dimension resizing occurred,
        // and browser canvas re-encode produced a larger file than the original (e.g. uncompressed PNG),
        // preserve the original file bytes with 100% fidelity to prevent accidental size inflation.
        const noResize = !activeSettings.maxEdge || activeSettings.maxEdge <= 0;
        const isSameFormat = item.sourceFormat === activeSettings.targetFormat;
        if (isSameFormat && noResize && outSize > item.file.size) {
          outBlob = item.file;
          outSize = item.file.size;
        }

        const outUrl = URL.createObjectURL(outBlob);
        activeUrlsRef.current.add(outUrl);

        setItems((prev) =>
          prev.map((i) => {
            if (i.id !== item.id) return i;
            if (i.outUrl && i.outUrl !== outUrl) {
              try {
                URL.revokeObjectURL(i.outUrl);
                activeUrlsRef.current.delete(i.outUrl);
              } catch {}
            }
            return {
              ...i,
              status: 'done',
              progress: 100,
              outBlob,
              outUrl,
              outSize: res.outSize || outBlob.size,
              outWidth: res.outWidth || 0,
              outHeight: res.outHeight || 0,
              origWidth: res.srcWidth || 0,
              origHeight: res.srcHeight || 0,
              ssim: res.ssim ?? null,
              qualityUsed: res.qualityUsed ?? null,
            };
          })
        );
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed';
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, status: 'error', error: errorMessage }
              : i
          )
        );
      }
    },
    []
  );

  // Add new files from DropZone / paste
  const handleFilesSelected = useCallback(
    (files: File[]) => {
      const newItems: ImageItem[] = [];

      files.forEach((file) => {
        const sourceFmt = detectFormat(file);
        if (!sourceFmt) return;

        const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        const origUrl = URL.createObjectURL(file);
        activeUrlsRef.current.add(origUrl);

        // Prioritize explicit route target format, otherwise active settings format
        const targetFmt = initialTargetFormat || settings.targetFormat;

        const item: ImageItem = {
          id,
          file,
          sourceFormat: sourceFmt,
          targetFormat: targetFmt,
          status: 'pending',
          progress: 0,
          origUrl,
          origWidth: 0,
          origHeight: 0,
          outBlob: null,
          outUrl: null,
          outSize: 0,
          outWidth: 0,
          outHeight: 0,
          ssim: null,
          qualityUsed: null,
        };

        newItems.push(item);
      });

      if (newItems.length > 0) {
        setItems((prev) => [...prev, ...newItems]);
        newItems.forEach((item) => {
          processItem(item, { ...settings, targetFormat: item.targetFormat });
        });
      }
    },
    [settings, processItem]
  );

  // Remove single item
  const handleRemoveItem = useCallback((id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) {
        if (target.origUrl) {
          try {
            URL.revokeObjectURL(target.origUrl);
            activeUrlsRef.current.delete(target.origUrl);
          } catch {}
        }
        if (target.outUrl) {
          try {
            URL.revokeObjectURL(target.outUrl);
            activeUrlsRef.current.delete(target.outUrl);
          } catch {}
        }
      }
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  // Update target format for single item
  const handleUpdateTargetFormat = useCallback(
    (id: string, newFormat: SupportedFormat) => {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, targetFormat: newFormat } : i))
      );
      const targetItem = items.find((i) => i.id === id);
      if (targetItem) {
        processItem(targetItem, { ...settings, targetFormat: newFormat });
      }
    },
    [items, settings, processItem]
  );

  // Reapply settings to all items
  const handleReapply = useCallback(
    (customSettings?: ConversionSettings) => {
      const active = customSettings || settings;
      items.forEach((item) => {
        processItem(item, { ...active, targetFormat: item.targetFormat });
      });
    },
    [items, settings, processItem]
  );

  // Reset to default settings
  const handleResetDefaults = useCallback(() => {
    const reset: ConversionSettings = {
      ...DEFAULT_SETTINGS,
      targetFormat: initialTargetFormat || DEFAULT_SETTINGS.targetFormat,
    };
    setSettings(reset);
    if (items.length > 0) {
      items.forEach((item) => {
        processItem(item, { ...reset, targetFormat: item.targetFormat });
      });
    }
  }, [initialTargetFormat, items, processItem]);

  // Clear all items
  const handleClearAll = useCallback(() => {
    activeUrlsRef.current.forEach((url) => {
      try {
        URL.revokeObjectURL(url);
      } catch {}
    });
    activeUrlsRef.current.clear();
    setItems([]);
  }, []);

  const hasItems = items.length > 0;

  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-transparent text-zinc-100 overflow-x-hidden">
      {/* Navbar */}
      <Navbar onOpenSettings={() => setIsSettingsOpen(true)} />

      <main className="relative z-10 flex-1 pb-36">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-8 sm:pt-14 space-y-8">
          {/* Hero Header */}
          <div className="text-center max-w-2xl mx-auto pt-4 pb-2">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.15] text-white">
              {pageTitle || 'Convert and Compress Images'}
            </h1>

            <p className="mt-4 text-[15px] text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
              {pageSubtitle ||
                'Private, instant, and runs entirely in your browser. Supports JPG, PNG, WebP, SVG, and ICO.'}
            </p>
          </div>

          {/* Quick Format Selector OR Dedicated Pair Route Badge */}
          {initialTargetFormat ? (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-zinc-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Target output: <strong className="font-semibold text-white uppercase">{settings.targetFormat}</strong>
              </span>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1.5 text-zinc-400 hover:text-white hover:border-white/[0.14] transition cursor-pointer"
              >
                <span>Tune Quality & Settings</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              <span className="text-[11px] font-medium text-zinc-500 mr-1 hidden sm:inline">
                Convert to:
              </span>
              {Object.values(FORMATS).map((fmt) => {
                const isSelected = settings.targetFormat === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => {
                      const newFmt = fmt.id;
                      setSettings((prev) => ({ ...prev, targetFormat: newFmt }));
                      setItems((prev) => prev.map((item) => ({ ...item, targetFormat: newFmt })));
                      if (items.length > 0) {
                        items.forEach((item) => {
                          processItem(item, { ...settings, targetFormat: newFmt });
                        });
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition cursor-pointer border ${
                      isSelected
                        ? 'border-white/25 bg-white text-zinc-900 shadow-md'
                        : 'border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.14]'
                    }`}
                  >
                    {fmt.id}
                  </button>
                );
              })}
            </div>
          )}

          {/* Active Custom Settings Bar */}
          {(() => {
            const isCustom =
              settings.goal !== DEFAULT_SETTINGS.goal ||
              settings.targetRatio !== DEFAULT_SETTINGS.targetRatio ||
              settings.targetQuality !== DEFAULT_SETTINGS.targetQuality ||
              settings.targetSsim !== DEFAULT_SETTINGS.targetSsim ||
              settings.maxEdge !== DEFAULT_SETTINGS.maxEdge ||
              settings.matteColor !== DEFAULT_SETTINGS.matteColor ||
              settings.slugifyNames !== DEFAULT_SETTINGS.slugifyNames;

            if (!isCustom) return null;

            return (
              <div className="flex items-center justify-between gap-3 px-4 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>
                    Custom settings active: {settings.goal === 'quality' ? 'Quality-first' : `${settings.targetRatio}x compression`}
                    {settings.maxEdge > 0 && ` • Max ${settings.maxEdge}px`}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSettingsOpen(true)}
                    className="text-zinc-400 hover:text-white transition cursor-pointer underline underline-offset-2"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={handleResetDefaults}
                    className="text-zinc-500 hover:text-zinc-300 transition cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>
            );
          })()}

          {/* DropZone */}
          <DropZone
            onFilesSelected={handleFilesSelected}
            hasItems={hasItems}
            presetTargetFormat={initialTargetFormat}
          />

          {/* Active Conversion Queue */}
          {hasItems && (
            <div className="pt-2">
              <ConversionQueue
                items={items}
                onRemoveItem={handleRemoveItem}
                onUpdateTargetFormat={handleUpdateTargetFormat}
                slugifyNames={settings.slugifyNames}
              />
            </div>
          )}

          {/* Below-fold Ad Slot */}
          <AdBanner slot="infeed" className="my-6" />

          {/* All Conversion & Compression Options Grid */}
          <ConversionHubGrid
            currentTargetFormat={settings.targetFormat}
            onSelectFormat={(newFormat) => {
              setSettings((prev) => ({ ...prev, targetFormat: newFormat }));
              setItems((prev) => prev.map((item) => ({ ...item, targetFormat: newFormat })));
              if (items.length > 0) {
                items.forEach((item) => {
                  processItem(item, { ...settings, targetFormat: newFormat });
                });
              }
            }}
          />

          {/* Page-Specific Content / How-To Guides */}
          {children}

          {/* FAQ Section with JSON-LD Schema */}
          <FaqSection />
        </div>
      </main>

      {/* Floating Batch Dock */}
      <BatchDock
        items={items}
        onClearAll={handleClearAll}
        slugifyNames={settings.slugifyNames}
      />

      {/* Global Settings Modal */}
      <GlobalSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(s) => setSettings(s)}
        onReapply={handleReapply}
        onResetDefaults={handleResetDefaults}
        hasItems={hasItems}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
