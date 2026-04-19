import React from 'react';
import Image from 'next/image';
import { Sparkles, Heart, Rocket } from 'lucide-react';
import { Metadata } from 'next';
import CareerClient from '@/components/public/CareerClient';
import { getTranslations } from 'next-intl/server';
import SafeHTMLContent from '@/components/public/SafeHTMLContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Career' });
    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function Career({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Career' });

    const benefits = [
        {
            title: t('benefits.global.title'),
            desc: t('benefits.global.desc'),
            icon: <Sparkles className="w-6 h-6" />
        },
        {
            title: t('benefits.development.title'),
            desc: t('benefits.development.desc'),
            icon: <Rocket className="w-6 h-6" />
        },
        {
            title: t('benefits.culture.title'),
            desc: t('benefits.culture.desc'),
            icon: <Heart className="w-6 h-6" />
        }
    ];

    const openings = t.raw('openings');

    return (
        <main className="min-h-screen bg-background text-navy">
            {/* Hero Section */}
            <div className="relative pt-48 pb-32 bg-slate-50 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10">
                    <Image
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000"
                        alt="Kariyer"
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/50 to-transparent" />
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="section-label !justify-center mb-8">
                        {t('hero.label')}
                    </div>
                    <SafeHTMLContent 
                        as="h1" 
                        className="text-5xl md:text-8xl font-serif font-bold text-navy mb-10 italic"
                        html={t.raw('hero.title')}
                    />
                    <p className="text-slate-600 text-xl max-w-3xl mx-auto font-sans italic">
                        {t('hero.subtitle')}
                    </p>
                </div>
            </div>

            {/* Why StarEducation? */}
            <section className="py-40 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-4xl mx-auto mb-24">
                        <span className="section-label !justify-center mb-8">{t('culture.label')}</span>
                        <SafeHTMLContent 
                            as="h2" 
                            className="text-4xl md:text-6xl font-serif font-bold text-navy mb-10 italic"
                            html={t.raw('culture.title')}
                        />
                        <p className="text-slate-500 text-lg italic leading-relaxed">
                            {t('culture.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="p-16 border border-gold/10 bg-slate-50/50 group hover:bg-white hover:shadow-2xl hover:border-gold/30 transition-all duration-700">
                                <div className="w-16 h-16 bg-white shadow-xl flex items-center justify-center text-gold mb-10 group-hover:bg-gold group-hover:text-white transition-all duration-500">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-navy mb-6 italic">{benefit.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed italic">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Current Openings - Interactive Client Component */}
            <CareerClient openings={openings} />
        </main>
    );
}
