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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const activeUrlsRef = useRef<Set<string>>(new Set());

  // Keep target format aligned if initial prop changes
  useEffect(() => {
    if (initialTargetFormat) {
      setSettings((prev) => ({ ...prev, targetFormat: initialTargetFormat }));
    }
  }, [initialTargetFormat]);

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

        const outBlob = new Blob([res.outBlobData], { type: res.outMime || 'application/octet-stream' });
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
        activeUrlsRef.current.add(origUrl);

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
  const handleReapply = useCallback(() => {
    items.forEach((item) => {
      processItem(item, settings);
    });
  }, [items, settings, processItem]);

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
        hasItems={hasItems}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
