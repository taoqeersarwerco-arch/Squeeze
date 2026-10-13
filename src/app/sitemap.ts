import { MetadataRoute } from 'next';
import { SEO_CONVERSION_PAIRS, SEO_COMPRESS_FORMATS } from '@/lib/constants';
import { ALL_ARTICLES } from '@/lib/articles';

const BASE_URL = 'https://www.trysqueeze.online';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    '',
    '/learn',
    '/developers',
    '/about',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: (route === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const conversionRoutes = SEO_CONVERSION_PAIRS.map((pair) => ({
    url: `${BASE_URL}/convert/${pair.from}-to-${pair.to}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const compressionRoutes = SEO_COMPRESS_FORMATS.map((cf) => ({
    url: `${BASE_URL}/compress/${cf.format}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const learnRoutes = ALL_ARTICLES.map((article) => ({
    url: `${BASE_URL}/learn/${article.slug}`,
    lastModified: new Date(article.modifiedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...conversionRoutes, ...compressionRoutes, ...learnRoutes];
}
