import type { Metadata } from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {Outfit, Playfair_Display} from 'next/font/google';
import {Providers} from "@/components/Providers";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import "../globals.css";
import { getTranslations } from 'next-intl/server';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://72.62.94.83:3005';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO' });

  return {
    metadataBase: new URL(BASE_URL),
    applicationName: 'StarEducation',
    title: {
      default: t('title'),
      template: t('template'),
    },
    description: t('description'),
    keywords: t('keywords').split(',').map((k) => k.trim()),
    authors: [{ name: "StarEducation", url: BASE_URL }],
    creator: "StarEducation",
    publisher: "StarEducation",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'tr': '/tr',
        'en': '/en',
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
      siteName: 'StarEducation',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'StarEducation — Yurtdışı Eğitim Danışmanlığı',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      images: ['/images/og-image.jpg'],
      creator: '@stareducation',
      site: '@stareducation',
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || '',
    },
    icons: {
      icon: [
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
  };
}

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-outfit',
});

const playwright = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-playwright',
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
    <html lang={locale} className={`${outfit.variable} ${playwright.variable}`} suppressHydrationWarning>
      <head>
        <OrganizationSchema locale={locale} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
