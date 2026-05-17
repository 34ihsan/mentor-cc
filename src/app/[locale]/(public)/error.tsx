'use client';

import React, { useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { Home, Wrench, RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const params = useParams();
    const locale = (params?.locale as string) || 'tr';
    
    // We try to use translations if available, otherwise fallback to static strings
    let t: any;
    try {
        t = useTranslations('Common');
    } catch (e) {
        t = (key: string) => {
            const fallbacks: Record<string, string> = {
                'systemMaintenance': 'Sistem Güncellemesi',
                'maintenanceDesc': 'Size daha iyi hizmet verebilmek için altyapı çalışmalarımız devam ediyor. Çok kısa bir süre sonra tüm servislerimiz aktif olacaktır.',
                'backToHome': 'Ana Sayfaya Dön',
                'refresh': 'Yeniden Dene'
            };
            return fallbacks[key] || key;
        };
    }

    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Public route caught error:', error);
    }, [error]);

    const isDev = process.env.NODE_ENV === 'development';

    return (
        <div className="min-h-[80vh] bg-zinc-50 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/[0.03] rounded-full blur-[100px] pointer-events-none" />
            
            <div className="w-24 h-24 bg-white border-2 border-zinc-100 text-secondary rounded-[2.5rem] flex items-center justify-center mb-10 shadow-2xl relative z-10 group transition-transform duration-700 hover:scale-105">
                <Wrench size={40} strokeWidth={1.5} className="group-hover:rotate-12 transition-transform duration-500" />
            </div>
            
            <div className="max-w-2xl space-y-8 relative z-10">
                <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">Mentor Career</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary italic leading-tight">
                        {t('systemMaintenance') || 'Sistem Güncellemesi'}
                    </h1>
                </div>
                
                <p className="text-zinc-500 text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
                    {t('maintenanceDesc') || 'Size daha iyi hizmet verebilmek için altyapı çalışmalarımız devam ediyor. Çok kısa bir süre sonra tüm servislerimiz aktif olacaktır.'}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <button
                        onClick={() => reset()}
                        className="w-full sm:w-auto bg-white border border-zinc-200 text-primary px-10 py-5 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-[10px] hover:border-secondary hover:text-secondary transition-all shadow-sm hover:shadow-xl"
                    >
                        <RefreshCcw size={16} /> {t('refresh') || 'Yeniden Dene'}
                    </button>
                    <Link
                        href="/"
                        className="w-full sm:w-auto bg-primary text-white px-10 py-5 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-[10px] hover:bg-navy-light transition-all shadow-xl hover:shadow-2xl"
                    >
                        <Home size={16} /> {t('backToHome') || 'Ana Sayfaya Dön'}
                    </Link>
                </div>

                {isDev && (
                    <div className="mt-16 p-6 bg-red-50 rounded-2xl text-left border border-red-100 max-w-2xl w-full mx-auto overflow-hidden">
                        <p className="text-xs font-black uppercase tracking-widest text-red-600 mb-2">Developer Error Log:</p>
                        <p className="text-sm font-mono text-red-800 break-words whitespace-pre-wrap">{error.message}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
