import { FormatMeta, SupportedFormat, ConversionSettings } from './types';

export const FORMATS: Record<SupportedFormat, FormatMeta> = {
  jpg: {
    id: 'jpg',
    name: 'JPEG / JPG',
    ext: '.jpg',
    mime: 'image/jpeg',
    desc: 'Joint Photographic Experts Group. High photographic compression.',
    supportsTransparency: false,
    isVector: false,
    color: '#3B82F6',
  },
  png: {
    id: 'png',
    name: 'PNG',
    ext: '.png',
    mime: 'image/png',
    desc: 'Portable Network Graphics. Lossless compression with alpha channel.',
    supportsTransparency: true,
    isVector: false,
    color: '#10B981',
  },
  webp: {
    id: 'webp',
    name: 'WebP',
    ext: '.webp',
    mime: 'image/webp',
    desc: 'Modern Google format. Up to 30% smaller than JPEG with transparency.',
    supportsTransparency: true,
    isVector: false,
    color: '#8B5CF6',
  },
  ico: {
    id: 'ico',
    name: 'ICO',
    ext: '.ico',
    mime: 'image/x-icon',
    desc: 'Windows Icon resource. Multi-resolution package for favicons & desktop.',
    supportsTransparency: true,
    isVector: false,
    color: '#F59E0B',
  },
  svg: {
    id: 'svg',
    name: 'SVG',
    ext: '.svg',
    mime: 'image/svg+xml',
    desc: 'Scalable Vector Graphics. Infinite resolution XML vector math.',
    supportsTransparency: true,
    isVector: true,
    color: '#EC4899',
  },
};

export const DEFAULT_SETTINGS: ConversionSettings = {
  targetFormat: 'webp',
  goal: 'quality',
  targetRatio: 5,
  targetQuality: 0.85,
  targetSsim: 0.95,
  maxEdge: 0,
  matteColor: '#FFFFFF',
  icoSizes: [16, 32, 48, 64, 128, 256],
  svgTraceDetail: 'medium',
  slugifyNames: true,
};

export const SEO_CONVERSION_PAIRS = [
  { from: 'png', to: 'ico', title: 'Convert PNG to ICO Favicon', desc: 'Create high-resolution Windows ICO and browser favicons from PNG with alpha transparency.' },
  { from: 'jpg', to: 'png', title: 'Convert JPG to PNG', desc: 'Convert JPEG photos to lossless PNG format with zero compression artifacts.' },
  { from: 'png', to: 'jpg', title: 'Convert PNG to JPG', desc: 'Convert transparent or heavy PNG files to optimized JPEG for web and social media.' },
  { from: 'svg', to: 'png', title: 'Convert SVG to PNG', desc: 'Rasterize vector SVG graphics into crisp, high-DPI transparent PNG images.' },
  { from: 'png', to: 'svg', title: 'Convert PNG to SVG Vector', desc: 'Vectorize raster PNG logos, icons, and illustrations into scalable SVG vector paths.' },
  { from: 'webp', to: 'jpg', title: 'Convert WebP to JPG', desc: 'Convert modern WebP images to universally supported JPEG format.' },
  { from: 'webp', to: 'png', title: 'Convert WebP to PNG', desc: 'Convert WebP images to lossless PNG with complete transparency support.' },
  { from: 'jpg', to: 'webp', title: 'Convert JPG to WebP', desc: 'Squeeze JPEG images up to 80% smaller into WebP format without losing visual clarity.' },
  { from: 'png', to: 'webp', title: 'Convert PNG to WebP', desc: 'Reduce transparent PNG file sizes dramatically with next-gen WebP compression.' },
  { from: 'svg', to: 'ico', title: 'Convert SVG to ICO Favicon', desc: 'Turn vector SVG brand logos into multi-resolution favicon.ico files instantly.' },
  { from: 'ico', to: 'png', title: 'Convert ICO to PNG', desc: 'Extract crisp PNG icons from Windows ICO and website favicon files.' },
  { from: 'jpg', to: 'ico', title: 'Convert JPG to ICO', desc: 'Convert JPG images and avatars into standard Windows ICO favicons.' },
  { from: 'jpg', to: 'svg', title: 'Convert JPG to SVG Vector', desc: 'Trace raster JPG photographs and artwork into vector SVG paths.' },
  { from: 'svg', to: 'jpg', title: 'Convert SVG to JPG', desc: 'Export scalable vector graphics to universal JPEG with clean background rendering.' },
  { from: 'svg', to: 'webp', title: 'Convert SVG to WebP', desc: 'Render SVG vectors into super-compressed WebP format for high-speed websites.' },
] as const;

export const SEO_COMPRESS_FORMATS = [
  { format: 'jpg', name: 'JPEG', title: 'Compress JPG Images Online', desc: 'Losslessly reduce JPEG file sizes with perceptual SSIM quality protection.' },
  { format: 'png', name: 'PNG', title: 'Compress PNG Images Online', desc: 'Compress transparent PNG assets and graphics without jagged edges.' },
  { format: 'webp', name: 'WebP', title: 'Compress WebP Images Online', desc: 'Optimize WebP images for web performance and speed up your page loads.' },
] as const;
