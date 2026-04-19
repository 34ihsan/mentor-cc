import React from 'react';
import { getTranslations } from 'next-intl/server';
import InteractiveWorldMap from '@/components/public/InteractiveWorldMap';
import MotionWrapper from '@/components/public/MotionWrapper';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowRight, Globe, Compass, ShieldCheck } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('CountriesHub');
    return {
        title: t('title'),
        description: t('description')
    };
}

export default async function CountriesHubPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('CountriesHub');
    const sdT = await getTranslations('ServiceDetail');

    const countries = [
        { slug: 'ingiltere', name: 'Birleşik Krallık', image: '/images/hero/uk-hero.png', partners: '450+' },
        { slug: 'usa', name: 'ABD', image: '/images/hero/usa-hero.png', partners: '320+' },
        { slug: 'kanada', name: 'Kanada', image: '/images/hero/canada-hero.png', partners: '180+' },
        { slug: 'almanya', name: 'Almanya', image: '/images/hero/germany-hero.png', partners: '120+' },
        { slug: 'irlanda', name: 'İrlanda', image: '/images/hero/ireland-hero.png', partners: '90+' },
        { slug: 'polonya', name: 'Polonya', image: '/images/hero/poland-hero.png', partners: '60+' },
        { slug: 'isvicre', name: 'İsviçre', image: '/images/hero/switzerland-hero.png', partners: '40+' },
        { slug: 'avustralya', name: 'Avustralya', image: '/images/hero/australia-hero.png', partners: '85+' },
    ];

    return (
        <div className="bg-zinc-50 min-h-screen selection:bg-gold/30 selection:text-navy">


            {/* Premium Header */}
            <section className="relative pt-48 pb-32 bg-navy overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <Image 
                        src="/images/hero/home-hero.png" 
                        alt="Global Network" 
                        fill 
                        className="object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/80 to-zinc-50" />
                </div>
                
                <div className="container-content relative z-10 text-center">
                    <MotionWrapper>
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-gold/10 border border-gold/20 backdrop-blur-md rounded-full mb-8">
                            <Globe size={14} className="text-gold" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold/90">{t('label')}</span>
                        </div>
                        <h1 className="text-fluid-h1 font-serif font-bold text-white mb-8 tracking-tighter italic">
                           {t('title')}
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 font-serif italic max-w-3xl mx-auto leading-relaxed border-l-2 border-gold/30 pl-10 py-2 inline-block">
                           {t('description')}
                        </p>
                    </MotionWrapper>
                </div>
            </section>

            {/* Interactive Section */}
            <section className="py-24 -mt-24 container-content relative z-20">
                <MotionWrapper delay={0.2}>
                    <InteractiveWorldMap />
                </MotionWrapper>
            </section>

            {/* Grid Detail Section */}
            <section className="py-32 bg-zinc-50">
                <div className="container-content">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
                        <div className="max-w-2xl">
                            <span className="section-label">{t('label')}</span>
                            <h2 className="text-fluid-h2 font-serif font-bold text-navy italic tracking-tight">{t('strategicHeader')}</h2>
                        </div>
                        <p className="text-zinc-500 font-serif italic text-lg max-w-sm border-r-2 border-gold/20 pr-8 text-right">
                           {t('strategicDesc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        {countries.map((country, idx) => (
                            <MotionWrapper key={country.slug} delay={idx * 0.1}>
                                <div className="premium-card group h-[500px] overflow-hidden rounded-[3rem] relative shadow-institutional border border-zinc-100 hover:-translate-y-2 transition-all duration-1000">
                                    <Image 
                                        src={country.image} 
                                        alt={country.name} 
                                        fill 
                                        className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3000ms]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-1000" />
                                    
                                    <div className="absolute inset-x-0 bottom-0 p-12 translate-y-8 group-hover:translate-y-0 transition-transform duration-1000">
                                        <div className="w-12 h-[2px] bg-gold mb-8 opacity-40 group-hover:w-full group-hover:opacity-100 transition-all duration-1000" />
                                        <h3 className="text-4xl font-serif font-bold text-white mb-4 italic tracking-tight">{country.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] text-zinc-300 font-black uppercase tracking-[0.2em]">{country.partners} PARTNERS</span>
                                            <div className="flex items-center gap-2 text-gold text-[10px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-100">
                                                KEŞFET <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="absolute top-8 right-8 z-20">
                                         <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/5 flex items-center justify-center text-gold/60">
                                              <ShieldCheck size={20} />
                                         </div>
                                    </div>
                                </div>
                            </MotionWrapper>
                        ))}
                    </div>
                </div>
            </section>

            {/* Institutional Trust Banner */}
            <section className="py-24 bg-white border-y border-zinc-100">
                <div className="container-content grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="flex items-start gap-8">
                         <div className="w-16 h-16 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-gold shrink-0">
                             <ShieldCheck size={28} />
                         </div>
                         <div>
                             <h4 className="text-lg font-serif font-bold text-navy mb-2 italic uppercase tracking-wider">Lokal Akreditasyon</h4>
                             <p className="text-zinc-500 text-sm font-serif italic leading-relaxed opacity-80">Her bölgede en az 3 resmi kurum tarafından onaylanmış partner yapısı.</p>
                         </div>
                    </div>
                    <div className="flex items-start gap-8">
                         <div className="w-16 h-16 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-gold shrink-0">
                             <Compass size={28} />
                         </div>
                         <div>
                             <h4 className="text-lg font-serif font-bold text-navy mb-2 italic uppercase tracking-wider">Global Vizyon</h4>
                             <p className="text-zinc-500 text-sm font-serif italic leading-relaxed opacity-80">Dünyanın en prestijli 1500+ eğitim kurumu ile doğrudan bağlantı.</p>
                         </div>
                    </div>
                    <div className="flex items-start gap-8">
                         <div className="w-16 h-16 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-gold shrink-0">
                             <Globe size={28} />
                         </div>
                         <div>
                             <h4 className="text-lg font-serif font-bold text-navy mb-2 italic uppercase tracking-wider">Hukuki Destek</h4>
                             <p className="text-zinc-500 text-sm font-serif italic leading-relaxed opacity-80">Vize ve denklik süreçlerinde her ülkeye özel uzman hukuk danışmanlığı.</p>
                         </div>
                    </div>
                </div>
            </section>


        </div>
    );
}
