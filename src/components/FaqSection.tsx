'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

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
    <section className="mx-auto w-full max-w-4xl py-16 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-300 mb-3 shadow-md">
          <HelpCircle className="h-3.5 w-3.5 text-indigo-400" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          Everything You Need to Know
        </h2>
        <p className="mt-2.5 text-sm text-zinc-400 max-w-lg mx-auto">
          Fast, transparent, and private image processing directly in your browser.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl overflow-hidden transition-all duration-200 hover:border-white/20 shadow-md"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-white hover:text-indigo-400 transition cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 flex-shrink-0 text-zinc-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-indigo-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 mt-1">
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
