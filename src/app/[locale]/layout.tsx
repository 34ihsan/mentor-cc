import type { Metadata } from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {Inter, Plus_Jakarta_Sans} from 'next/font/google';
import {Providers} from "@/components/Providers";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import "../globals.css";
import { getTranslations } from 'next-intl/server';
import { validateProductionEnv } from '@/lib/utils';
import { SystemStabilityManager } from '@/lib/stability';

// Run predictive checks
validateProductionEnv();

// Initialize stability manager and port scrubber
if (typeof window !== 'undefined') {
  SystemStabilityManager.getInstance().init();
  
  // Anti-Port Leakage: If in production and port 3000 is detected, redirect to clean URL
  if (window.location.port === '3000' && !window.location.hostname.includes('localhost')) {
    const cleanUrl = window.location.protocol + '//' + window.location.hostname + window.location.pathname + window.location.search + window.location.hash;
    window.location.replace(cleanUrl);
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mentor-cc.com';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO' });

  return {
    metadataBase: new URL(BASE_URL),
    applicationName: 'Mentor Career Consulting',
    title: {
      default: t('title'),
      template: t('template'),
    },
    description: t('description'),
    keywords: t('keywords').split(',').map((k) => k.trim()),
    authors: [{ name: "Mentor Career Consulting", url: BASE_URL }],
    creator: "Mentor Career Consulting",
    publisher: "Mentor Career Consulting",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'tr': '/tr',
        'en': '/en',
        'de': '/de',
        'x-default': '/tr',
      },
    },
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
      type: 'website',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      url: `${BASE_URL}/${locale}`,
      siteName: 'Mentor Career Consulting',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Mentor Career Consulting — International Education Consulting',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      images: ['/images/og-image.jpg'],
      creator: '@mentorcareer',
      site: '@mentorcareer',
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || '',
    },
    icons: {
      icon: '/images/MentorCareer.png',
      apple: '/images/MentorCareer.png',
    },
  };
}

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={`${inter.variable} ${plusJakartaSans.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <OrganizationSchema locale={locale} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://media.istockphoto.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://media.istockphoto.com" />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
