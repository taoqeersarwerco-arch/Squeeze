import { MetadataRoute } from 'next';
import { SEO_CONVERSION_PAIRS, SEO_COMPRESS_FORMATS } from '@/lib/constants';

const BASE_URL = 'https://trysqueeze.online';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/learn',
    '/developers',
    '/about',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date('2026-10-12'),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const conversionRoutes = SEO_CONVERSION_PAIRS.map((pair) => ({
    url: `${BASE_URL}/convert/${pair.from}-to-${pair.to}`,
    lastModified: new Date('2026-10-12'),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const compressionRoutes = SEO_COMPRESS_FORMATS.map((cf) => ({
    url: `${BASE_URL}/compress/${cf.format}`,
    lastModified: new Date('2026-10-12'),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const learnRoutes = [
    'how-image-conversion-works',
    'how-image-compression-works',
    'your-data-stays-private',
    'what-happens-to-your-data',
    'choosing-the-right-format',
  ].map((slug) => ({
    url: `${BASE_URL}/learn/${slug}`,
    lastModified: new Date('2026-10-12'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...conversionRoutes, ...compressionRoutes, ...learnRoutes];
}
