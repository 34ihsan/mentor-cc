import React from 'react';
import Image from 'next/image';
import { Sparkles, Heart, Rocket, Target, Map, Users, BarChart3, ArrowRightCircle } from 'lucide-react';
import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import SafeHTMLContent from '@/components/public/SafeHTMLContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Career.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function CareerPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Career' });

    const sections = [
        {
            key: 'intro',
            icon: Sparkles,
            label: t('hero.label')
        },
        {
            key: 'whySelfDiscovery',
            icon: Heart,
            label: t('sections.whySelfDiscovery.title')
        },
        {
            key: 'strengthsAndWeaknesses',
            icon: BarChart3,
            label: t('sections.strengthsAndWeaknesses.title')
        },
        {
            key: 'roadmap',
            icon: Map,
            label: t('sections.roadmap.title')
        },
        {
            key: 'whoIsItFor',
            icon: Users,
            label: t('sections.whoIsItFor.title')
        },
        {
            key: 'goals',
            icon: Target,
            label: t('sections.goals.title')
        },
        {
            key: 'benefits',
            icon: Rocket,
            label: t('sections.benefits.title')
        },
        {
            key: 'howToDiscover',
            icon: Sparkles,
            label: t('sections.howToDiscover.title')
        },
        {
            key: 'moveForward',
            icon: ArrowRightCircle,
            label: t('sections.moveForward.title')
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#fdfcfb] to-white">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
                    <Image
                        src="/images/decoration/pattern.svg"
                        alt="Background Pattern"
                        fill
                        className="object-cover"
                    />
                </div>
                
                <div className="container px-4 mx-auto relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-[#B8860B] uppercase bg-[#B8860B]/5 rounded-full border border-[#B8860B]/10">
                            {t('hero.label')}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-8 leading-tight">
                            <SafeHTMLContent html={t.raw('hero.title')} />
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                            {t('hero.subtitle')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Dynamic Sections */}
            <section className="py-24 relative overflow-hidden">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col gap-24 max-w-5xl mx-auto">
                        {sections.map((section, index) => (
                            <div 
                                key={section.key} 
                                className={`flex flex-col md:flex-row gap-12 items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="flex-1 w-full text-center md:text-left">
                                    <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#B8860B]/10 text-[#B8860B]">
                                        <section.icon className="w-7 h-7" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6">
                                        {t(`sections.${section.key}.title`)}
                                    </h2>
                                    <div className="text-lg text-gray-600 leading-relaxed whitespace-pre-line space-y-4">
                                        <SafeHTMLContent html={t.raw(`sections.${section.key}.content`)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#B8860B] rounded-full blur-[120px]" />
                </div>
                
                <div className="container px-4 mx-auto relative z-10">
                    <div className="max-w-4xl mx-auto text-center px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                            {t('sections.footer')}
                        </h2>
                        <Link 
                            href="/iletisim"
                            className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white transition-all duration-300 rounded-full bg-[#B8860B] hover:bg-[#967109] hover:scale-105 active:scale-95 shadow-xl shadow-[#B8860B]/20"
                        >
                            {t('cta')}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
