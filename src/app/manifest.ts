import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Squeeze - In-Browser Image Converter & Compressor',
    short_name: 'Squeeze',
    description:
      'Private, zero-upload in-browser image conversion and perceptual compression engine.',
    start_url: '/',
    display: 'standalone',
    background_color: '#08090B',
    theme_color: '#08090B',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
