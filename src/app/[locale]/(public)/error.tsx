'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCcw, Home, AlertCircle } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Public route error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
            <div className="w-24 h-24 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-red-500/5">
                <AlertCircle size={48} strokeWidth={1.5} />
            </div>
            
            <div className="max-w-md space-y-6">
                <h1 className="text-4xl font-serif font-bold text-navy italic">
                    Bir Şeyler <span className="text-red-500 not-italic">Yanlış Gitti</span>
                </h1>
                <p className="text-slate text-lg leading-relaxed">
                    Sayfayı yüklerken teknik bir sorunla karşılaştık. Lütfen tekrar deneyin veya ana sayfaya dönün.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                    <button
                        onClick={() => reset()}
                        className="w-full sm:w-auto bg-navy text-white px-8 py-4 flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-xs hover:bg-navy-mid transition-all shadow-lg"
                    >
                        <RefreshCcw size={16} /> Tekrar Dene
                    </button>
                    <Link
                        href="/"
                        className="w-full sm:w-auto border-2 border-navy text-navy px-8 py-4 flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-xs hover:bg-navy hover:text-white transition-all"
                    >
                        <Home size={16} /> Ana Sayfaya Dön
                    </Link>
                </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-gold/10 text-slate/40 text-[10px] uppercase tracking-widest font-bold">
                Hata Kodu: {error.digest || 'UNKNOWN'}
            </div>
        </div>
    );
}
