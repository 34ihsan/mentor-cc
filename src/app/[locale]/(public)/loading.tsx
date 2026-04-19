import React from 'react';

export default function Loading() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 relative mb-8">
                <div className="absolute inset-0 border-2 border-gold/10 rounded-full"></div>
                <div className="absolute inset-0 border-2 border-t-gold rounded-full animate-spin"></div>
            </div>
            <div className="space-y-4 max-w-xs">
                <h2 className="text-2xl font-serif font-bold text-navy italic">
                    Star <span className="gold-text not-italic">Beratung</span>
                </h2>
                <div className="h-1 bg-gold/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gold w-1/3 animate-progress origin-left"></div>
                </div>
                <p className="text-slate text-xs uppercase tracking-[0.2em] font-bold opacity-50">
                    Geleceğiniz Hazırlanıyor...
                </p>
            </div>
        </div>
    );
}
