"use client";

import React, { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowUpRight, MapPin } from 'lucide-react';
import MotionWrapper from './MotionWrapper';
import { cn } from '@/lib/utils';
import { countryMap } from '@/lib/mappings/countries';

interface Country {
    id: string;
    name: string;
    slug: string;
    image?: string;
}

export default function PopularDestinations({ featuredNames }: { featuredNames?: string[] }) {
    const t = useTranslations('HomePage.Destinations');
    const commonT = useTranslations('Common');
    const params = useParams();
    const locale = params ? params.locale as string : "tr";
    
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const baseUrl = featuredNames?.length
                    ? `/api/countries/popular?names=${featuredNames.join(',')}`
                    : "/api/countries/popular?featured=true";
                
                const url = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}locale=${locale}`;

                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    setCountries(data);
                }
            } catch (error) {
                console.error("Failed to fetch countries", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCountries();
    }, [featuredNames, locale]);

    if (loading) return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-[500px] bg-zinc-100 animate-pulse rounded-[2.5rem]" />
            ))}
        </div>
    );

    if (countries.length === 0) return (
        <div className="text-center py-24 bg-zinc-50 rounded-[3rem] border border-dashed border-zinc-200">
            <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.5em]">{commonT('soon')}</p>
        </div>
    );

    return (
        <section className="section-padding bg-white relative overflow-hidden">
            <div className="container-content space-y-24">
                {/* Section Header */}
                <div className="text-center max-w-4xl mx-auto px-6">
                    <MotionWrapper delay={0.1}>
                        <div className="inline-flex items-center gap-3 bg-zinc-100 px-6 py-2.5 rounded-full mb-8">
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                            <span className="text-[10px] font-black text-secondary uppercase tracking-[0.4em]">{t('label')}</span>
                        </div>
                    </MotionWrapper>
                    
                    <MotionWrapper delay={0.2}>
                        <h2 
                            className="text-fluid-h2 font-serif font-bold text-primary leading-[1.1] mb-10 italic"
                            dangerouslySetInnerHTML={{ __html: t.raw('title') }}
                        />
                    </MotionWrapper>
                    
                    <MotionWrapper delay={0.3}>
                        <p className="text-zinc-500 text-xl font-serif italic max-w-2xl mx-auto leading-relaxed">
                            {t('desc')}
                        </p>
                    </MotionWrapper>
                </div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {countries.map((country, idx) => (
                        <MotionWrapper key={country.id} delay={0.1 * idx}>
                            <Link
                                href={`/rotalar/${country.slug}`}
                                className="group relative h-[500px] overflow-hidden rounded-[2.5rem] border border-zinc-200/50 shadow-xl transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl"
                            >
                                {/* Background Image Container */}
                                <div className="absolute inset-0 z-0 bg-primary">
                                    <Image
                                        src={countryMap[country.slug]?.image || country.image || "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200"}
                                        alt={country.name}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                    {/* Contrast Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end text-white">
                                    <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-[1px] bg-secondary transition-all duration-700 group-hover:w-16" />
                                            <span className="text-[10px] font-black text-secondary tracking-[0.2em] uppercase">{t('rota')}</span>
                                        </div>
                                        <h3 className="text-3xl font-serif font-bold italic leading-tight group-hover:text-secondary transition-colors duration-500">
                                            {country.name}
                                        </h3>
                                        <div className="h-[2px] w-12 bg-secondary/50 transition-all duration-700 group-hover:w-full" />
                                        <div className="flex items-center gap-3 text-[10px] font-black tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-700 text-secondary">
                                            {t('viewDetails')} <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Top Accent Icon */}
                                <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 transform rotate-45 group-hover:rotate-0">
                                    <ArrowUpRight className="text-white" size={20} />
                                </div>
                            </Link>
                        </MotionWrapper>
                    ))}
                </div>
                
                {/* View All Button */}
                <div className="text-center pt-12">
                    <MotionWrapper delay={0.4}>
                        <Link 
                            href="/rotalar"
                            className="group inline-flex items-center gap-6 px-12 py-6 bg-primary hover:bg-zinc-900 text-white rounded-full transition-all duration-700 hover:shadow-2xl hover:-translate-y-1"
                        >
                            <span className="text-[11px] font-black uppercase tracking-[0.5em]">{t('viewDestinations')}</span>
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-secondary transition-colors duration-500">
                                <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-500" />
                            </div>
                        </Link>
                    </MotionWrapper>
                </div>
            </div>
        </section>
    );
}
