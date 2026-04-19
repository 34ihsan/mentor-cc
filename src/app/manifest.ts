import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'StarEducation - Yurtdışı Eğitim Danışmanlığı',
    short_name: 'StarEducation',
    description: 'Yurtdışı üniversite, dil okulu ve yüksek lisans başvurularında profesyonel danışmanlık.',
    start_url: '/tr',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1a1a1a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16 32x32 48x48',
        type: 'image/x-icon',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    lang: 'tr',
    dir: 'ltr',
    orientation: 'portrait',
    prefer_related_applications: false,
    categories: ['education', 'business'],
  };
}
