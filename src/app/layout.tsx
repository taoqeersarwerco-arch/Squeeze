import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
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
  metadataBase: new URL('https://www.trysqueeze.online'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Free Image Converter & Compressor (100% In-Browser) | Squeeze',
    template: '%s | Squeeze',
  },
  description:
    'Convert and compress JPG, PNG, WebP, SVG, and ICO images 100% in your browser. Zero file uploads, complete privacy, instant downloads, and $0 cost.',
  keywords: [
    'free image converter online',
    'in-browser image compressor',
    'private image converter no upload',
    'convert png to webp',
    'png to ico favicon generator',
    'jpg to webp converter',
    'lossless image compressor',
    'client side image optimization',
  ],
  authors: [{ name: 'Squeeze' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Free Image Converter & Compressor (100% In-Browser) | Squeeze',
    description:
      'Convert and compress JPG, PNG, WebP, SVG, and ICO images 100% in your browser. Zero file uploads, complete privacy, and instant downloads.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Squeeze',
    url: 'https://www.trysqueeze.online',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image Converter & Compressor (100% In-Browser) | Squeeze',
    description:
      'Convert and compress JPG, PNG, WebP, SVG, and ICO images 100% in your browser. Zero file uploads, complete privacy, and instant downloads.',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col font-sans bg-[#08090B] text-zinc-100 overflow-x-hidden">
        {adClientId && (
          <Script
            id="adsbygoogle-init"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClientId}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
        <LiquidBackground />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
