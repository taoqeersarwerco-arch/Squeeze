'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ImageItem, SupportedFormat, ConversionSettings } from '@/lib/types';
import { DEFAULT_SETTINGS, FORMATS } from '@/lib/constants';
import { detectFormat, getEngine } from '@/lib/engine';
import { Navbar } from './Navbar';
import { DropZone } from './DropZone';
import { ConversionQueue } from './ConversionQueue';
import { CompareModal } from './CompareModal';
import { GlobalSettingsModal } from './GlobalSettingsModal';
import { BatchDock } from './BatchDock';
import { AdBanner } from './AdBanner';
import { FaqSection } from './FaqSection';
import { Footer } from './Footer';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface ImageConverterAppProps {
  initialTargetFormat?: SupportedFormat;
  initialSourceFormat?: SupportedFormat;
  pageTitle?: string;
  pageSubtitle?: string;
  children?: React.ReactNode;
}

export function ImageConverterApp({
  initialTargetFormat,
  initialSourceFormat,
  pageTitle,
  pageSubtitle,
  children,
}: ImageConverterAppProps) {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [settings, setSettings] = useState<ConversionSettings>(() => ({
    ...DEFAULT_SETTINGS,
    targetFormat: initialTargetFormat || DEFAULT_SETTINGS.targetFormat,
  }));
  const [compareItem, setCompareItem] = useState<ImageItem | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Keep target format aligned if initial prop changes
  useEffect(() => {
    if (initialTargetFormat) {
      setSettings((prev) => ({ ...prev, targetFormat: initialTargetFormat }));
    }
  }, [initialTargetFormat]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      items.forEach((item) => {
        if (item.origUrl) URL.revokeObjectURL(item.origUrl);
        if (item.outUrl) URL.revokeObjectURL(item.outUrl);
      });
    };
  }, [items]);

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

        const outBlob = new Blob([res.outBlobData], { type: res.outMime || 'application/octet-stream' });
        const outUrl = URL.createObjectURL(outBlob);

        setItems((prev) =>
          prev.map((i) => {
            if (i.id !== item.id) return i;
            if (i.outUrl) URL.revokeObjectURL(i.outUrl);
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
      } catch (err: any) {
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, status: 'error', error: err?.message || 'Failed' }
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

        let targetFmt = settings.targetFormat;
        if (sourceFmt === targetFmt) {
          targetFmt = sourceFmt === 'webp' ? 'png' : 'webp';
        }

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
        if (target.origUrl) URL.revokeObjectURL(target.origUrl);
        if (target.outUrl) URL.revokeObjectURL(target.outUrl);
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
  const handleReapply = useCallback(() => {
    items.forEach((item) => {
      processItem(item, settings);
    });
  }, [items, settings, processItem]);

  // Clear all items
  const handleClearAll = useCallback(() => {
    items.forEach((item) => {
      if (item.origUrl) URL.revokeObjectURL(item.origUrl);
      if (item.outUrl) URL.revokeObjectURL(item.outUrl);
    });
    setItems([]);
  }, [items]);

  const hasItems = items.length > 0;

  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-[#090B0E] text-zinc-100 overflow-x-hidden">
      {/* Background Subtle Grid Pattern */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid-pattern opacity-40" />

      {/* Fluid Floating Island Navbar */}
      <Navbar onOpenSettings={() => setIsSettingsOpen(true)} />

      <main className="relative z-10 flex-1 pb-36">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-6 sm:pt-10 space-y-7">
          {/* Top Leaderboard Ad Slot (CLS-safe) */}
          <AdBanner slot="leaderboard" />

          {/* Hero Header with Agency Macro-Whitespace */}
          <div className="text-center max-w-3xl mx-auto pt-4 pb-2">
            {/* Microscopic Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-300 shadow-lg mb-4">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>Client-Side Neural Engine</span>
            </div>

            {/* Massive Heading */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-white">
              {pageTitle ? (
                pageTitle
              ) : (
                <>
                  Convert & Squeeze Images{' '}
                  <span className="block mt-1 bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent">
                    Without Quality Loss
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
              {pageSubtitle ||
                'Any-to-any conversion between JPG, PNG, ICO, SVG, and WebP. Automated perceptual SSIM compression executed 100% locally in your browser.'}
            </p>
          </div>

          {/* Double-Bezel DropZone */}
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
                onOpenCompare={(item) => setCompareItem(item)}
                slugifyNames={settings.slugifyNames}
              />
            </div>
          )}

          {/* Mid-Page In-Feed Ad Banner */}
          <AdBanner slot="infeed" className="my-8" />

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

      {/* Cinematic Split Comparison Dialog */}
      <CompareModal
        item={compareItem}
        onClose={() => setCompareItem(null)}
        slugifyNames={settings.slugifyNames}
      />

      {/* Global Settings Modal */}
      <GlobalSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(s) => setSettings(s)}
        onReapply={handleReapply}
        hasItems={hasItems}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
