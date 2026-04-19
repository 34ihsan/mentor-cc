"use client";

import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Globe, Award, BookOpen } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import SafeHTMLContent from '@/components/public/SafeHTMLContent';

interface HeroSlide {
    id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    link: string;
    label: string;
    icon: React.ReactNode;
}

export default function HeroSlider({ context = "home" }: { context?: string }) {
    const t = useTranslations('Hero');
    const params = useParams();
    const locale = params?.locale as string;
    
    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        loop: true, 
        duration: 30,
        dragFree: false
    }, [Autoplay({ delay: 7000, stopOnInteraction: false })]);
    
    const [selectedIndex, setSelectedIndex] = useState(0);

    const slides: HeroSlide[] = [
        { 
            id: 'home', 
            title: t('title'), 
            subtitle: t('subtitle'), 
            imageUrl: '/images/hero/home-hero.png', 
            link: '/iletisim',
            label: t('label'),
            icon: <Globe size={16} />
        },
        { 
            id: 'university', 
            title: t('slider2.title'), 
            subtitle: t('slider2.subtitle'), 
            imageUrl: '/images/hero/university-hero.png', 
            link: '/ulkeler-hub',
            label: "Global Network",
            icon: <Award size={16} />
        },
        { 
            id: 'exams', 
            title: t('slider3.title'), 
            subtitle: t('slider3.subtitle'), 
            imageUrl: '/images/hero/exams-hero.png', 
            link: '/sinav-rehberi',
            label: "Akademik Strateji",
            icon: <BookOpen size={16} />
        }
    ];

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <section className="relative w-full h-[100vh] min-h-[850px] overflow-hidden bg-white group select-none">
            {/* Premium Overlays - Daylight Edition */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-white via-transparent to-white/40 pointer-events-none" />
            
            {/* Asymmetric Geometric Accent Layer (Background) */}
            <div className="absolute -left-20 top-0 w-[60%] h-full bg-secondary/5 -skew-x-12 z-10 pointer-events-none blur-[120px]" />
            <div className="absolute -right-20 bottom-0 w-[40%] h-[60%] bg-secondary/5 skew-x-12 z-10 pointer-events-none blur-[120px]" />

            {/* Grain Texture */}
            <div className="absolute inset-0 z-11 opacity-[0.03] pointer-events-none bg-[url('/noise.svg')] mix-blend-overlay" />

            <div className="h-full" ref={emblaRef}>
                <div className="flex h-full">
                    {slides.map((slide, idx) => (
                        <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 h-full overflow-hidden">
                            <motion.div 
                                className="absolute inset-0 w-full h-full"
                                initial={{ scale: 1.15 }}
                                animate={{ scale: selectedIndex === idx ? 1.02 : 1.15 }}
                                transition={{ duration: 10, ease: "linear" }}
                            >
                                <Image
                                    src={slide.imageUrl}
                                    alt={slide.title}
                                    fill
                                    priority={idx === 0}
                                    loading={idx === 0 ? "eager" : "lazy"}
                                    className={`object-cover transition-opacity duration-1000 contrast-[1.05] ${
                                        selectedIndex === idx ? 'opacity-80' : 'opacity-0'
                                    }`}
                                    sizes="100vw"
                                />
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Institutional Content Layer */}
            <div className="absolute inset-0 z-20 flex items-center px-6 md:px-24 lg:px-32 pointer-events-none">
                <div className="max-w-5xl w-full pointer-events-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`slide-${selectedIndex}`}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="inline-flex items-center gap-3 px-6 py-2 bg-white/80 border border-zinc-200 backdrop-blur-xl rounded-full mb-8 shadow-premium"
                            >
                                <span className="text-secondary animate-pulse">{slides[selectedIndex].icon}</span>
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                                    {slides[selectedIndex].label}
                                </span>
                            </motion.div>

                            <h1 className="text-fluid-h1 font-black text-primary mb-8 leading-[0.85] tracking-tighter text-balance uppercase">
                                {slides[selectedIndex].title.split('—').map((part, i) => (
                                    <React.Fragment key={i}>
                                        {i > 0 && <span className="block h-2 md:h-4" />}
                                        <SafeHTMLContent 
                                            as="span"
                                            className={i === 1 ? "text-flare block drop-shadow-[0_0_30px_rgba(255,71,0,0.15)]" : "block"}
                                            html={part}
                                        />
                                    </React.Fragment>
                                ))}
                            </h1>

                            <div className="mb-12 max-w-2xl border-l-[4px] border-secondary pl-8 py-6 bg-zinc-50/50 backdrop-blur-md rounded-r-[40px] shadow-sm border-t border-zinc-100 asymmetric-reverse">
                                <SafeHTMLContent 
                                    as="p"
                                    className="text-xl md:text-3xl text-zinc-500 leading-tight font-sans font-bold tracking-tight italic"
                                    html={slides[selectedIndex].subtitle}
                                />
                            </div>

                            <div className="flex flex-wrap items-center gap-6">
                                <Link 
                                    href={slides[selectedIndex].link} 
                                    className="group relative inline-flex items-center gap-6 bg-zinc-950 border border-secondary text-white px-12 py-6 rounded-2xl transition-all duration-500 shadow-neon active:scale-95 asymmetric-bold overflow-hidden"
                                >
                                    <span className="text-xs font-black uppercase tracking-[0.3em] relative z-10">{t('cta')}</span>
                                    <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2 relative z-10 text-secondary" />
                                    
                                    {/* Flare Background Effect */}
                                    <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-10 transition-opacity" />
                                </Link>
                                
                                <Link 
                                    href="/hakkimizda" 
                                    className="group px-10 py-6 text-xs font-black uppercase tracking-[0.3em] text-primary border border-zinc-200 hover:border-secondary transition-all duration-500 rounded-2xl flex items-center gap-3 hover:bg-zinc-50"
                                >
                                    {t('cta2')}
                                    <Sparkles size={14} className="text-secondary/60 group-hover:text-secondary group-hover:animate-pulse transition-all" />
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Premium Indicator & Navigation */}
            <div className="absolute bottom-12 left-6 right-6 md:left-24 md:right-24 z-30 flex items-end justify-between">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-6">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => emblaApi?.scrollTo(i)}
                                className="relative py-4 group"
                            >
                                <div className={`h-[3px] transition-all duration-700 rounded-full ${selectedIndex === i ? 'w-24 bg-secondary' : 'w-10 bg-zinc-200/50 group-hover:bg-zinc-300'}`} />
                                {selectedIndex === i && (
                                    <motion.div 
                                        layoutId="active-nav"
                                        className="absolute -top-6 left-0 text-secondary font-black text-sm"
                                    >
                                        0{i + 1}
                                    </motion.div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => emblaApi?.scrollPrev()} 
                        className="w-16 h-16 flex items-center justify-center text-zinc-300 border border-zinc-100 rounded-full hover:border-secondary hover:text-secondary transition-all duration-500 group/prev hover:bg-zinc-50"
                    >
                        <ChevronLeft className="w-8 h-8 transition-transform duration-500 group-hover/prev:-translate-x-1" />
                    </button>
                    <button 
                        onClick={() => emblaApi?.scrollNext()} 
                        className="w-16 h-16 flex items-center justify-center text-zinc-300 border border-zinc-100 rounded-full hover:border-secondary hover:text-secondary transition-all duration-500 group/next hover:bg-zinc-50"
                    >
                        <ChevronRight className="w-8 h-8 transition-transform duration-500 group-hover/next:translate-x-1" />
                    </button>
                </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 hidden lg:block">
                <motion.div 
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="w-[1px] h-16 bg-gradient-to-t from-secondary via-secondary/20 to-transparent" />
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-300 rotate-180 [writing-mode:vertical-lr]">SCROLL</span>
                </motion.div>
            </div>
        </section>
    );
}
