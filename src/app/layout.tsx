import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { LiquidBackground } from '@/components/LiquidBackground';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#08090B',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://trysqueeze.online'),
  alternates: {
    canonical: '/',
  },
  title: 'Squeeze - Free In-Browser Image Converter & Compressor',
  description:
    'Convert and compress JPG, PNG, ICO, SVG, and WebP images instantly in your browser. 100% private, nothing is uploaded. Fast and free.',
  keywords: [
    'image converter',
    'compress images',
    'png to ico',
    'svg to png',
    'jpg to webp',
    'webp to jpg',
    'favicon generator',
    'lossless image compression',
    'in-browser image converter',
  ],
  authors: [{ name: 'Squeeze' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Squeeze - Free In-Browser Image Converter & Compressor',
    description:
      'Convert and compress JPG, PNG, ICO, SVG, and WebP images instantly in your browser. Private and free.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Squeeze',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Squeeze - Free In-Browser Image Converter & Compressor',
    description:
      'Convert and compress JPG, PNG, ICO, SVG, and WebP images instantly in your browser. Private and free.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col font-sans bg-[#08090B] text-zinc-100 overflow-x-hidden">
        <LiquidBackground />
        {children}
      </body>
    </html>
  );
}
