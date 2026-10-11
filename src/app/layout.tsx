import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#4f46e5',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Squeeze - Free In-Browser Image Converter & Compressor',
  description:
    'Convert JPG, PNG, ICO, SVG, and WebP into each other and compress image files with zero quality loss. 100% private, client-side, fast and free.',
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
      'Convert JPG, PNG, ICO, SVG, and WebP into each other with perceptual SSIM quality protection. 100% client-side privacy.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Squeeze',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Squeeze - Free In-Browser Image Converter & Compressor',
    description:
      'Convert JPG, PNG, ICO, SVG, and WebP into each other and compress image files with zero quality loss.',
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
      <body className="min-h-full flex flex-col font-sans bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        {children}
      </body>
    </html>
  );
}
