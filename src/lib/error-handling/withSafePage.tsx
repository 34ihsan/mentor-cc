import React from 'react';
import { AlertCircle, Clock, RotateCcw } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

interface FallbackProps {
    error: any;
    locale: string;
}

// Fallback UI shown when a page fails to render
async function DefaultFallback({ error, locale }: FallbackProps) {
    let t;
    try {
        t = await getTranslations({ locale, namespace: 'Common' });
    } catch (e) {
        // Fallback if translations fail
        t = (key: string) => {
            const fallbacks: any = {
                'systemMaintenance': 'Sistem Güncellemesi',
                'maintenanceDesc': 'Size daha iyi hizmet verebilmek için içeriklerimizi güncelliyoruz. Lütfen kısa bir süre sonra tekrar deneyin.',
                'backToHome': 'Ana Sayfaya Dön',
                'refresh': 'Sayfayı Yenile'
            };
            return fallbacks[key] || key;
        };
    }

    const isDev = process.env.NODE_ENV === 'development';

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-24 h-24 bg-secondary/10 text-secondary rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-secondary/5 relative">
                <Clock size={40} strokeWidth={1.5} className="relative z-10" />
                <div className="absolute inset-0 bg-secondary/20 blur-xl rounded-full" />
            </div>
            
            <div className="max-w-md space-y-6">
                <h1 className="text-4xl font-serif font-bold text-primary italic">
                    {t('systemMaintenance') || 'Sistem Güncellemesi'}
                </h1>
                <p className="text-zinc-500 text-lg leading-relaxed">
                    {t('maintenanceDesc') || 'Size daha iyi hizmet verebilmek için içeriklerimizi güncelliyoruz. Lütfen kısa bir süre sonra tekrar deneyin.'}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                    <Link
                        href="/"
                        className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-lg"
                    >
                        {t('backToHome') || 'Ana Sayfaya Dön'}
                    </Link>
                </div>
                
                {isDev && (
                    <div className="mt-12 p-6 bg-red-50 rounded-2xl text-left border border-red-100 overflow-auto max-w-2xl mx-auto">
                        <div className="flex items-center gap-2 text-red-600 font-bold mb-4">
                            <AlertCircle size={18} /> Geliştirici Hatası (Dev Only)
                        </div>
                        <p className="text-sm font-mono text-red-800 break-words whitespace-pre-wrap">
                            {error?.message || String(error)}
                        </p>
                        <p className="text-xs font-mono text-red-600 mt-4 opacity-70">
                            {error?.stack}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

/**
 * A Higher Order Component for Server Components.
 * Wraps page logic in a try/catch to prevent the entire layout from crashing.
 * If an error occurs, renders a graceful fallback UI.
 */
export function withSafePage<P extends { params: Promise<any> | any, searchParams?: any }>(
    PageComponent: (props: P) => Promise<React.ReactNode> | React.ReactNode,
    FallbackComponent: (props: FallbackProps) => Promise<React.ReactNode> | React.ReactNode = DefaultFallback
) {
    return async function SafePage(props: P) {
        let locale = 'tr';
        try {
            // Extract locale from params if possible
            const resolvedParams = props.params instanceof Promise ? await props.params : props.params;
            if (resolvedParams?.locale) {
                locale = resolvedParams.locale;
            }

            return await PageComponent(props);
        } catch (error) {
            console.error(`[SafePage Error] Failed to render page:`, error);
            
            return <FallbackComponent error={error} locale={locale} />;
        }
    };
}
