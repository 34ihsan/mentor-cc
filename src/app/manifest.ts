import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mentor Career - Yurtdışı Eğitim Danışmanlığı',
    short_name: 'Mentor Career',
    description: 'Yurtdışı üniversite, dil okulu ve yüksek lisans başvurularında profesyonel danışmanlık.',
    start_url: '/tr',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1a1a1a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/images/MentorCareer.png',
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
