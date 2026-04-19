import React from 'react';
import Image from 'next/image';
import { Award, Globe, CheckCircle2, GraduationCap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import SuccessStoriesClient from '@/components/public/SuccessStoriesClient';
import { getTranslations } from 'next-intl/server';

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'SuccessStories' });
    return {
        title: t('metaTitle'),
        description: t('metaDesc'),
    };
}

export default async function SuccessStories({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'SuccessStories' });

    const rawTestimonials = t.raw('testimonials');
    const testimonialsArr = Array.isArray(rawTestimonials) ? rawTestimonials : [];

    const testimonials = testimonialsArr.map((test, i) => ({
        ...test,
        image: [
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400",
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400"
        ][i] || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400"
    }));

    const statsData = [
        { key: 'acceptance', icon: <CheckCircle2 className="w-6 h-6" /> },
        { key: 'scholarship', icon: <Award className="w-6 h-6" /> },
        { key: 'alumni', icon: <GraduationCap className="w-6 h-6" /> },
        { key: 'partners', icon: <Globe className="w-6 h-6" /> }
    ];

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative pt-60 pb-40 bg-zinc-50 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10">
                    <Image
                        src="https://images.unsplash.com/photo-1523050335392-4945e3518227?q=80&w=2000"
                        alt={t('heroLabel')}
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-50/50 to-transparent" />
                </div>

                <div className="container-content relative z-10 text-center">
                    <div className="section-label !justify-center mb-10">
                        {t('heroLabel')}
                    </div>
                    <h1 className="text-fluid-h1 font-serif font-bold text-primary mb-10 italic">
                        {t.rich('heroTitle', {
                            span: (chunks) => <span className="text-secondary not-italic">{chunks}</span>
                        })}
                    </h1>
                    <p className="text-zinc-600 text-xl max-w-3xl mx-auto font-sans italic leading-relaxed">
                        {t('heroSubtitle')}
                    </p>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-white border-y border-zinc-100 py-20">
                <div className="container-content">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20">
                        {statsData.map((stat, i) => (
                            <div key={i} className="text-center group">
                                <div className="text-secondary mb-6 flex justify-center group-hover:scale-110 transition-transform duration-700">{stat.icon}</div>
                                <div className="text-5xl font-serif font-bold text-primary mb-3">{t(`stats.${stat.key}.value`)}</div>
                                <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400">{t(`stats.${stat.key}.label`)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials Grid - Interactive Client Component */}
            <SuccessStoriesClient testimonials={testimonials} />

            {/* University Gallery Section */}
            <section className="section-padding bg-white">
                <div className="container-content text-center">
                    <span className="section-label !justify-center mb-10">{t('galleryLabel')}</span>
                    <h2 className="text-fluid-h2 font-serif font-bold text-primary mb-24 italic">
                        {t.rich('galleryTitle', {
                            span: (chunks) => <span className="text-secondary not-italic">{chunks}</span>
                        })}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
                        {['Oxford', 'Harvard', 'MIT', 'Stanford', 'LSE', 'ETH Zurich'].map(univ => (
                            <div key={univ} className="text-xl font-serif font-black italic tracking-tighter text-primary hover:text-secondary transition-colors cursor-default">
                                {univ}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-zinc-50 border-t border-secondary/10 relative overflow-hidden">
                <div className="container-content relative z-10 text-center">
                    <h2 className="text-fluid-h2 font-serif font-bold text-primary mb-12 italic">
                        {t.rich('ctaTitle', {
                            span: (chunks) => <span className="text-secondary not-italic">{chunks}</span>
                        })}
                    </h2>
                    <p className="text-zinc-600 mb-16 text-xl italic max-w-2xl mx-auto leading-relaxed">{t('ctaDesc')}</p>
                    <Link href={`/${locale}/iletisim`} className="btn-gold !px-16 !py-6 text-[10px] tracking-[0.5em] inline-flex items-center gap-6 group">
                        {t('ctaBtn')} <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-700" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
