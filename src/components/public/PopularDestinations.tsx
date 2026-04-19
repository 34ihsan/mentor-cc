"use client";

import React, { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowUpRight, MapPin } from 'lucide-react';
import MotionWrapper from './MotionWrapper';
import { cn } from '@/lib/utils';

interface Country {
    id: string;
    name: string;
    slug: string;
    image?: string;
}

const defaultImages: Record<string, string> = {
    'almanya': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b',
    'ingiltere': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
    'amerika': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200',
    'kanada': 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce',
    'avustralya': 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
    'irlanda': 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e', // Updated stable URL
    'hollanda': 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4',
    'isvicre': 'https://images.unsplash.com/photo-1531310197839-ccf54634509e',
    'polonya': 'https://images.unsplash.com/photo-1519197924294-4ba991a11128',
    'belcika': 'https://images.unsplash.com/photo-1491557348962-5447106edccb',
};

export default function PopularDestinations({ featuredNames }: { featuredNames?: string[] }) {
    const t = useTranslations('HomePage.Destinations');
    const commonT = useTranslations('Common');
    const params = useParams();
    const locale = params?.locale as string;
    
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
        <div className="container-content">
            {/* Destinations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {countries.map((country, idx) => (
                    <MotionWrapper key={country.id} delay={0.1 * idx}>
                        <Link
                            href={`/rotalar/${country.slug}`}
                            className={cn(
                                "group relative h-[550px] overflow-hidden border border-white/10 shadow-neon transition-all duration-1000 hover:-translate-y-4",
                                idx % 2 === 0 ? "asymmetric-bold" : "asymmetric-reverse"
                            )}
                        >
                            {/* Background Image Container */}
                            <div className="absolute inset-0 z-0 bg-primary">
                                <Image
                                    src={country.image || defaultImages[country.slug] || "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200"}
                                    alt={country.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-60"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                                {/* Contrast Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 z-10 p-12 flex flex-col justify-end text-white">
                                <div className="space-y-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-12 h-[1px] bg-secondary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-1000" />
                                        <span className="text-[10px] font-black text-secondary tracking-[0.4em] uppercase">GATEWAY</span>
                                    </div>
                                    <h3 className="text-4xl font-serif font-bold italic leading-tight group-hover:text-secondary transition-colors duration-500">
                                        {country.name}
                                    </h3>
                                    <div className="h-[2px] w-16 bg-white/10 transition-all duration-700 group-hover:w-full group-hover:bg-secondary/40" />
                                    <div className="flex items-center gap-4 text-[10px] font-black tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-700 text-secondary">
                                        {t('viewDetail')} <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Top Accent Icon */}
                            <div className="absolute top-10 right-10 w-14 h-14 rounded-full bg-secondary/10 backdrop-blur-md border border-secondary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-1000 transform scale-50 group-hover:scale-100">
                                <ArrowUpRight className="text-secondary" size={24} />
                            </div>
                        </Link>
                    </MotionWrapper>
                ))}
            </div>
            
            {/* View All Button */}
            <div className="text-center pt-24 pb-12">
                <MotionWrapper delay={0.4}>
                    <Link 
                        href="/rotalar"
                        className="group inline-flex items-center gap-8 px-16 py-7 bg-white/5 border border-white/10 hover:border-secondary hover:bg-secondary hover:text-primary text-secondary rounded-2xl transition-all duration-700 hover:shadow-neon hover:-translate-y-2 uppercase tracking-[0.6em] font-black text-xs asymmetric-reverse"
                    >
                        <span>{t('viewDestinations')}</span>
                        <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </MotionWrapper>
            </div>
        </div>
    );
}
