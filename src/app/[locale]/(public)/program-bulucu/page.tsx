import { Metadata } from 'next';
import SmartFinder from '@/components/public/SmartFinder';
import { Sparkles, Target, ShieldCheck, Zap } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import SafeHTMLContent from '@/components/public/SafeHTMLContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ProgramFinder' });
    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords'),
    };
}

export default async function ProgramFinderPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ProgramFinder' });

    return (
        <main className="min-h-screen pt-32 pb-20 bg-white overflow-hidden relative">
            {/* Abstract Background Decor */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-black uppercase tracking-widest border border-[var(--primary)]/20 shadow-sm">
                        <Sparkles size={14} className="animate-pulse" /> {t('heroBadge')}
                    </div>
                    <SafeHTMLContent 
                        as="h1" 
                        className="text-5xl md:text-7xl font-black tracking-tighter text-navy leading-[0.9]"
                        html={t.raw('heroTitle')}
                    />
                    <SafeHTMLContent 
                        as="p" 
                        className="text-xl text-slate-600 font-medium max-w-2xl mx-auto"
                        html={t.raw('heroSubtitle')}
                    />
                </div>

                {/* The Finder Component */}
                <div className="mb-24">
                    <SmartFinder />
                </div>

                {/* Trust Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="glass-card p-8 text-center space-y-4 border-gold/10 bg-white">
                        <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mx-auto">
                            <Target size={24} />
                        </div>
                        <h3 className="font-black text-navy uppercase tracking-wider text-sm">{t('trust.data.title')}</h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{t('trust.data.desc')}</p>
                    </div>
                    <div className="glass-card p-8 text-center space-y-4 border-gold/10 bg-white">
                        <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mx-auto">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="font-black text-navy uppercase tracking-wider text-sm">{t('trust.service.title')}</h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{t('trust.service.desc')}</p>
                    </div>
                    <div className="glass-card p-8 text-center space-y-4 border-gold/10 bg-white">
                        <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mx-auto">
                            <Zap size={24} />
                        </div>
                        <h3 className="font-black text-navy uppercase tracking-wider text-sm">{t('trust.speed.title')}</h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{t('trust.speed.desc')}</p>
                    </div>
                </div>

                {/* Visionary Footer Quote */}
                <div className="mt-32 text-center p-12 glass-card border-gold/20 bg-gradient-to-br from-white to-slate-50">
                    <blockquote className="text-2xl font-black italic text-navy tracking-tight">
                        {t('quote.text')}
                    </blockquote>
                    <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-gold">{t('quote.author')}</p>
                </div>
            </div>
        </main>
    );
}
