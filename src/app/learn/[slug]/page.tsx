import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

interface ArticleData {
  title: string;
  description: string;
  content: React.ReactNode;
}

const articles: Record<string, ArticleData> = {
  'how-image-conversion-works': {
    title: 'How Image Conversion Works',
    description: 'What image formats are, why you would convert between them, and what happens when a file changes format.',
    content: (
      <>
        <h2>What is an image format?</h2>
        <p>
          An image format is simply a way of storing visual information in a file. Different formats store that
          information differently, which affects file size, quality, and what features are supported (like transparency
          or animation).
        </p>
        <p>
          Think of it like languages. A photograph can be described in English or Spanish. The content is the same,
          but the representation is different. Some languages are more compact for certain ideas, and some have words
          that others lack.
        </p>

        <h2>Why convert between formats?</h2>
        <p>
          Different situations call for different formats. A photo on a website should be WebP for fast loading.
          A logo needs PNG for clean transparency. A favicon must be ICO for browsers to recognize it. Converting
          lets you use the right format for each job.
        </p>

        <h2>What happens during conversion?</h2>
        <p>
          When Squeeze converts an image, it reads the pixel data from the source file, then writes it out in the
          new format. If the new format supports fewer features (for example, JPG does not support transparency),
          Squeeze handles the difference automatically. You can configure how this works in Settings.
        </p>

        <h2>Lossy vs. lossless</h2>
        <p>
          <strong>Lossless</strong> means the image looks exactly the same after conversion. PNG to PNG is always
          lossless. <strong>Lossy</strong> means some detail is removed to make the file smaller. JPG and WebP
          can be lossy. The quality slider in Settings controls how much detail is preserved. At 85% or higher,
          the difference is usually invisible to the human eye.
        </p>
      </>
    ),
  },
  'how-image-compression-works': {
    title: 'How Image Compression Works',
    description: 'What happens when a file gets smaller, why quality sometimes changes, and how Squeeze finds the right balance.',
    content: (
      <>
        <h2>What is compression?</h2>
        <p>
          Compression makes a file smaller while keeping it usable. Every image file contains pixel data, metadata
          (like camera settings and GPS location), and structural overhead. Compression reduces some or all of these.
        </p>

        <h2>How Squeeze compresses images</h2>
        <p>
          Squeeze uses a multi-step approach. First, it strips unnecessary metadata that inflates file size without
          affecting how the image looks. Then, it optimizes how pixel data is encoded. For lossy formats like JPG
          and WebP, it carefully reduces detail in areas where your eyes are least sensitive, preserving edges
          and important features.
        </p>

        <h2>The quality measurement</h2>
        <p>
          Squeeze measures the visual similarity between the original and compressed image using a perceptual
          quality score. A score of 99% means the compressed version is nearly indistinguishable from the original.
          This score appears next to each processed file so you can verify the result yourself.
        </p>

        <h2>What the quality slider does</h2>
        <p>
          The quality slider in Settings controls the tradeoff between file size and visual fidelity.
          At 100%, the file is as close to the original as possible. At lower values, the file gets smaller
          but may show subtle differences. The default of 85% gives a good balance for most uses.
        </p>
      </>
    ),
  },
  'your-data-stays-private': {
    title: 'Your Data Stays Private',
    description: 'How Squeeze processes everything on your device without uploading anything to a server.',
    content: (
      <>
        <h2>Nothing leaves your device</h2>
        <p>
          When you drop an image into Squeeze, it is processed entirely by your browser on your own computer.
          The image data never travels over the internet. There is no upload, no cloud processing, and no server
          that ever sees your files.
        </p>

        <h2>How this is possible</h2>
        <p>
          Modern browsers include powerful image processing capabilities. Squeeze uses these built-in browser
          features (Canvas API and Web Workers) to read, convert, and compress images directly on your device.
          The conversion engine runs as a background thread in your browser, separate from the main page.
        </p>

        <h2>What this means for you</h2>
        <p>
          Your images stay exactly where they are. Sensitive documents, personal photos, and confidential
          designs are processed without any privacy risk. You can even use Squeeze while offline once the
          page has loaded.
        </p>

        <h2>No account required</h2>
        <p>
          Because there is no server-side processing, there is no need for user accounts, logins, or
          authentication. You open the page and start converting. Nothing is tracked back to you.
        </p>
      </>
    ),
  },
  'what-happens-to-your-data': {
    title: 'What Happens to Your Data',
    description: 'Full transparency on what data we collect, what we do with it, and what we never touch.',
    content: (
      <>
        <h2>Your images: never collected</h2>
        <p>
          Squeeze never receives, stores, or processes your image files on any server. All image processing
          happens in your browser. We have no technical ability to access your images even if we wanted to.
        </p>

        <h2>Analytics: minimal and anonymous</h2>
        <p>
          We may collect basic, anonymous usage statistics (such as which formats are most popular and how
          many conversions are performed) to improve the product. This data is aggregate and cannot be
          traced to individual users or sessions.
        </p>

        <h2>Advertising</h2>
        <p>
          Squeeze may display advertisements through third-party ad networks. These networks may use cookies
          to show relevant ads. You can manage cookie preferences in your browser settings. Ad networks never
          have access to your image files.
        </p>

        <h2>Full policy</h2>
        <p>
          For the complete legal privacy policy, visit the{' '}
          <a href="/privacy" className="text-zinc-300 underline underline-offset-2 hover:text-white transition-colors">
            Privacy Policy
          </a>{' '}
          page.
        </p>
      </>
    ),
  },
  'choosing-the-right-format': {
    title: 'Choosing the Right Format',
    description: 'A practical guide to when you should use JPG, PNG, WebP, SVG, or ICO.',
    content: (
      <>
        <h2>Quick reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 pr-4 font-medium text-zinc-300">Format</th>
                <th className="text-left py-3 pr-4 font-medium text-zinc-300">Best for</th>
                <th className="text-left py-3 font-medium text-zinc-300">Transparency</th>
              </tr>
            </thead>
            <tbody className="text-[var(--text-secondary)]">
              <tr className="border-b border-white/[0.04]">
                <td className="py-3 pr-4 font-medium text-zinc-300">JPG</td>
                <td className="py-3 pr-4">Photographs, social media images</td>
                <td className="py-3">No</td>
              </tr>
              <tr className="border-b border-white/[0.04]">
                <td className="py-3 pr-4 font-medium text-zinc-300">PNG</td>
                <td className="py-3 pr-4">Logos, screenshots, images needing transparency</td>
                <td className="py-3">Yes</td>
              </tr>
              <tr className="border-b border-white/[0.04]">
                <td className="py-3 pr-4 font-medium text-zinc-300">WebP</td>
                <td className="py-3 pr-4">Web images (best quality-to-size ratio)</td>
                <td className="py-3">Yes</td>
              </tr>
              <tr className="border-b border-white/[0.04]">
                <td className="py-3 pr-4 font-medium text-zinc-300">SVG</td>
                <td className="py-3 pr-4">Logos, icons, illustrations that scale</td>
                <td className="py-3">Yes</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-zinc-300">ICO</td>
                <td className="py-3 pr-4">Website favicons (browser tab icons)</td>
                <td className="py-3">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>When to use JPG</h2>
        <p>
          JPG is the universal format for photographs. It produces small files with good visual quality.
          Use it when the image is a photo and you do not need transparency. Almost every device and
          platform supports JPG.
        </p>

        <h2>When to use PNG</h2>
        <p>
          PNG is lossless and supports transparency. Use it for logos, icons, screenshots, or any image
          where you need a transparent background. PNG files are larger than JPG, so avoid it for large
          photographs where transparency is not needed.
        </p>

        <h2>When to use WebP</h2>
        <p>
          WebP offers the best of both worlds: small file sizes like JPG with transparency support like PNG.
          It is the recommended format for web images. All modern browsers support it. Use it as your default
          choice for websites.
        </p>

        <h2>When to use SVG</h2>
        <p>
          SVG is a vector format, meaning it scales to any size without losing quality. Use it for logos,
          icons, and illustrations. SVG files are often tiny because they store shapes mathematically rather
          than as pixels. Note: SVG is not suitable for photographs.
        </p>

        <h2>When to use ICO</h2>
        <p>
          ICO is the standard format for website favicons (the small icon in a browser tab). It bundles
          multiple sizes into one file. Use Squeeze to convert any image to a proper multi-size ICO file
          for your website.
        </p>
      </>
    ),
  },
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return { title: 'Not Found' };
  return {
    title: `${article.title} - Squeeze`,
    description: article.description,
  };
}

export default async function LearnArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-transparent text-zinc-100">
      <Navbar />

      <main className="relative z-10 flex-1">
        <article className="mx-auto max-w-2xl px-4 sm:px-6 pt-12 sm:pt-20 pb-20">
          {/* Back link */}
          <Link
            href="/learn"
            className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
          >
            &larr; All articles
          </Link>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            {article.title}
          </h1>
          <p className="mt-3 text-[15px] text-[var(--text-secondary)] leading-relaxed">
            {article.description}
          </p>

          {/* Article Content */}
          <div className="mt-10 prose-squeeze">
            {article.content}
          </div>

          {/* Bottom CTA */}
          <div className="mt-14 pt-8 border-t border-white/[0.06]">
            <p className="text-sm text-[var(--text-secondary)]">
              Ready to convert?{' '}
              <Link href="/" className="text-zinc-300 underline underline-offset-2 hover:text-white transition-colors">
                Start here
              </Link>
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
