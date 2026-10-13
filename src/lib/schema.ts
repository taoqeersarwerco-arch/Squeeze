/**
 * Squeeze Unified Schema.org Knowledge Graph Generator
 * Creates interconnected, valid JSON-LD graphs for WebSite, Organization,
 * WebApplication, BreadcrumbList, HowTo, and FAQPage.
 */

export const BASE_URL = 'https://www.trysqueeze.online';

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

export interface HowToStepItem {
  name: string;
  text: string;
}

export interface FaqItemSchema {
  question: string;
  answer: string;
}

export interface ToolSchemaParams {
  name: string;
  description: string;
  url: string;
  inputFormat: string;
  outputFormat: string;
  breadcrumbs: BreadcrumbItem[];
  howToSteps?: HowToStepItem[];
  faqs?: FaqItemSchema[];
}

/**
 * Generate sitewide root entity graph for the Homepage
 */
export function generateRootSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: 'Squeeze',
        alternateName: ['Squeeze Image Engine', 'TrySqueeze', 'Squeeze App'],
        description:
          'Private, zero-upload in-browser image conversion and perceptual compression engine.',
        publisher: {
          '@id': `${BASE_URL}/#organization`,
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'Squeeze',
        url: BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/favicon.ico`,
        },
        description:
          'Privacy-focused developer tooling providing client-side image processing engines.',
      },
      {
        '@type': 'WebApplication',
        '@id': `${BASE_URL}/#app`,
        name: 'Squeeze Image Converter & Compressor',
        url: BASE_URL,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All (Modern Web Browsers)',
        browserRequirements: 'Requires modern browser with HTML5 Canvas and Web Worker support',
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        featureList: [
          '100% Client-Side Processing',
          'Zero Server File Uploads',
          'Multi-threaded Web Worker Queue',
          'Perceptual SSIM Image Quality Optimization',
          'Binary Windows ICO Container Packing (16-256px)',
          'Raster-to-SVG Marching Squares Vectorizer',
          'Batch Processing with Instant ZIP Export',
        ],
        publisher: {
          '@id': `${BASE_URL}/#organization`,
        },
      },
    ],
  };
}

/**
 * Generate structured entity graph for programmatic tool pages (convert & compress)
 */
export function generateToolPageSchema({
  name,
  description,
  url,
  inputFormat,
  outputFormat,
  breadcrumbs,
  howToSteps,
  faqs,
}: ToolSchemaParams) {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Squeeze',
      url: BASE_URL,
    },
    {
      '@type': 'WebApplication',
      '@id': `${url}#app`,
      name,
      description,
      url,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All (Modern Web Browsers)',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        '100% In-Browser Execution',
        'Zero File Upload',
        `Converts ${inputFormat.toUpperCase()} to ${outputFormat.toUpperCase()}`,
        'High-Fidelity Alpha Transparency Handling',
        'Multi-Threaded Worker Speed',
      ],
      publisher: {
        '@id': `${BASE_URL}/#organization`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        ...(crumb.url ? { item: crumb.url } : {}),
      })),
    },
  ];

  if (howToSteps && howToSteps.length > 0) {
    graph.push({
      '@type': 'HowTo',
      '@id': `${url}#howto`,
      name: `How to convert ${inputFormat.toUpperCase()} to ${outputFormat.toUpperCase()} Online`,
      description: `Step-by-step instructions for converting ${inputFormat.toUpperCase()} images into ${outputFormat.toUpperCase()} with Squeeze.`,
      step: howToSteps.map((s, idx) => ({
        '@type': 'HowToStep',
        position: idx + 1,
        name: s.name,
        text: s.text,
      })),
    });
  }

  if (faqs && faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
