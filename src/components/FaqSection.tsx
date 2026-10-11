'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Are my images uploaded to any remote server or stored anywhere?',
    answer:
      'Never. All conversion and compression operations are performed 100% locally on your computer inside your browser using HTML5 Canvas, Web Workers, and modern WebAssembly. Your photos, icons, and sensitive documents never leave your device.',
  },
  {
    question: 'How does Squeeze compress images without noticeable quality loss?',
    answer:
      'Squeeze uses the Structural Similarity Index Measure (SSIM), an advanced perceptual algorithm developed to measure image degradation. Instead of blindly degrading colors, Squeeze strips redundant EXIF metadata, uses adaptive quality stepping, and optimizes chroma subsampling to eliminate byte bloat while preserving crisp edges.',
  },
  {
    question: 'Can I generate standard favicon.ico files for my website?',
    answer:
      'Yes! When you select ICO as your target format, Squeeze automatically generates a genuine multi-resolution Windows Icon file containing 16x16, 32x32, 48x48, 64x64, 128x128, and 256x256 frames with 32-bit RGBA transparency support.',
  },
  {
    question: 'Can I convert SVG vector files to raster formats (PNG, JPG, WebP)?',
    answer:
      'Absolutely. You can drop SVG files and export them to crisp transparent PNGs, high-quality JPEGs, or WebP at full resolution.',
  },
  {
    question: 'What happens to transparency when converting PNG or SVG to JPG?',
    answer:
      'Because JPEG does not support alpha transparency, Squeeze lets you choose a background matte color (default is pure white #FFFFFF) so transparent areas blend cleanly without black box artifacts.',
  },
  {
    question: 'Is there a limit on how many images I can convert at once?',
    answer:
      'There is no artificial limit. Because all conversions run on your device with multi-core parallel Web Workers, you can process dozens of photos simultaneously and download them all in a single ZIP file.',
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // Generate FAQ JSON-LD Schema for Google Search
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="mx-auto w-full max-w-4xl py-12 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-3 border border-indigo-200/50 dark:border-indigo-800/40">
          <HelpCircle className="h-3.5 w-3.5" />
          Frequently Asked Questions
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          Everything You Need to Know
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Fast, transparent, and private image processing directly in your browser.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden transition-all shadow-xs"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 flex-shrink-0 text-zinc-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-0 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60 mt-1">
                  <p className="pt-3">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
