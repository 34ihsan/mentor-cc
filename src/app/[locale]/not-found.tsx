import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';

export default async function NotFound() {
  const locale = await getLocale();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <h2 className="text-4xl font-bold mb-4">404</h2>
      <p className="text-xl text-zinc-600 mb-8">Sayfa bulunamadı / Page not found</p>
      <Link 
        href={`/${locale}`}
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        Ana Sayfaya Dön / Return Home
      </Link>
    </div>
  );
}
