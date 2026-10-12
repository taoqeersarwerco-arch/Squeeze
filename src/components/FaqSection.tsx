'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Are my images uploaded anywhere?',
    answer:
      'No. Everything runs in your browser on your own device. Your images are never sent to a server, never stored, and never seen by anyone else. The conversion engine runs locally using your browser\'s built-in capabilities.',
  },
  {
    question: 'How does Squeeze make files smaller without losing quality?',
    answer:
      'Squeeze removes unnecessary data from your images (like hidden metadata and redundant color information) while carefully preserving the parts your eyes actually notice. It uses a quality measurement system to make sure the compressed version looks nearly identical to the original.',
  },
  {
    question: 'Can I create favicon.ico files for my website?',
    answer:
      'Yes. Choose ICO as the output format and Squeeze will generate a proper multi-size icon file containing 16x16, 32x32, 48x48, 64x64, 128x128, and 256x256 versions, all with transparency support.',
  },
  {
    question: 'What happens to transparency when I convert to JPG?',
    answer:
      'JPG doesn\'t support transparency, so Squeeze fills transparent areas with a background color. You can choose the color in Settings (white by default). This prevents the common "black box" problem.',
  },
  {
    question: 'Is there a limit on how many images I can process?',
    answer:
      'No limits. Since everything runs on your device, you can convert as many images as you want and download them all in a single ZIP file.',
  },
  {
    question: 'Which image format should I use?',
    answer:
      'JPG is best for photographs. PNG is best when you need transparency (logos, icons). WebP gives you the best balance of quality and small file size for the web. SVG is ideal for logos and illustrations that need to scale to any size. ICO is specifically for website favicons.',
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
    <section className="mx-auto w-full max-w-3xl py-16 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Common questions
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Quick answers about how Squeeze works.
        </p>
      </div>

      <div className="space-y-1.5">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all duration-150 hover:border-white/[0.10]"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="flex w-full items-center justify-between p-4 text-left text-sm font-medium text-zinc-200 hover:text-white transition cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 flex-shrink-0 text-zinc-500 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-zinc-300' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-0 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-white/[0.04]">
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
