"use client";

import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

interface HeroSlide {
    id: string;
    title: string;
    title_en?: string | null;
    title_de?: string | null;
    subtitle: string;
    subtitle_en?: string | null;
    subtitle_de?: string | null;
    imageUrl: string;
    link?: string;
    imageSettings?: string; // JSON string
}

export default function HeroSlider({ context = "home" }: { context?: string }) {
    const t = useTranslations('Hero');
    const params = useParams();
    const locale = params ? params.locale as string : "tr";
    
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [loading, setLoading] = useState(true);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 100 }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const getDefaultSlides = useCallback((locale: string): HeroSlide[] => {
        const isTr = locale === 'tr';
        
        return [
            { 
                id: 'd1', 
                title: isTr ? "Global Başarıya Giden En Prestijli Yol" : "The Most Prestigious Path to Global Success",
                title_en: "The Most Prestigious Path to Global Success",
                subtitle: isTr ? "Dünyanın en iyi üniversitelerinde lisans eğitimi ile geleceğinizi bugünden şekillendirin. Sınırları aşan bir kariyer sizi bekliyor." : "Shape your future today with undergraduate education at the world's best universities. A career beyond borders awaits you.",
                subtitle_en: "Shape your future today with undergraduate education at the world's best universities. A career beyond borders awaits you.",
                imageUrl: '/images/hero/university_hero.png', 
                link: '/yurtdisi-universite', 
                imageSettings: JSON.stringify({ textPosition: 'left' }) 
            },
            { 
                id: 'd2', 
                title: isTr ? "Kariyerinizde Dev Bir Adım Atın" : "Take a Giant Leap in Your Career",
                title_en: "Take a Giant Leap in Your Career",
                subtitle: isTr ? "Global iş dünyasında fark yaratacak prestijli yüksek lisans programları. Uzmanlığınızı uluslararası arenaya taşıyın." : "Prestigious postgraduate programs that will make a difference in the global business world. Take your expertise to the international arena.",
                subtitle_en: "Prestigious postgraduate programs that will make a difference in the global business world. Take your expertise to the international arena.",
                imageUrl: '/images/hero/master_hero.png', 
                link: '/yurtdisi-yuksek-lisans', 
                imageSettings: JSON.stringify({ textPosition: 'right' }) 
            },
            { 
                id: 'd3', 
                title: isTr ? "Geleceğin Liderleri Burada Yetişiyor" : "Where the Leaders of the Future Are Raised",
                title_en: "Where the Leaders of the Future Are Raised",
                subtitle: isTr ? "Uluslararası standartlarda lise eğitimi ile erken yaşta global vizyon kazanın. Çocuğunuzun geleceğine en değerli yatırımı yapın." : "Gain a global vision at an early age with high school education at international standards. Make the most valuable investment in your child's future.",
                subtitle_en: "Gain a global vision at an early age with high school education at international standards. Make the most valuable investment in your child's future.",
                imageUrl: '/images/hero/highschool_hero.png', 
                link: '/yurtdisi-lise', 
                imageSettings: JSON.stringify({ textPosition: 'center' }) 
            },
            { 
                id: 'd4', 
                title: isTr ? "Unutulmaz Bir Yaz, Sonsuz Bir Deneyim" : "An Unforgettable Summer, Endless Experience",
                title_en: "An Unforgettable Summer, Endless Experience",
                subtitle: isTr ? "Eğlence ve eğitimi birleştiren global yaz kampları. Yeni kültürler tanıyın, yeni diller keşfedin ve ömür boyu sürecek dostluklar kurun." : "Global summer camps combining fun and education. Get to know new cultures, discover new languages, and build lifelong friendships.",
                subtitle_en: "Global summer camps combining fun and education. Get to know new cultures, discover new languages, and build lifelong friendships.",
                imageUrl: '/images/hero/summer_hero.png', 
                link: '/yurtdisi-yaz-okullari', 
                imageSettings: JSON.stringify({ textPosition: 'right' }) 
            },
            { 
                id: 'd5', 
                title: isTr ? "Dünyanın Dili Sizin Diliniz Olsun" : "Let the Language of the World Be Your Language",
                title_en: "Let the Language of the World Be Your Language",
                subtitle: isTr ? "Dili yerinde, en iyi okullarda ve profesyonel eğitmenlerle öğrenin. İletişim kurun, dünyayla bağınızı güçlendirin." : "Learn the language on-site at the best schools with professional instructors. Communicate and strengthen your connection with the world.",
                subtitle_en: "Learn the language on-site at the best schools with professional instructors. Communicate and strengthen your connection with the world.",
                imageUrl: '/images/hero/language_hero.png', 
                link: '/yurtdisi-dil-okullari', 
                imageSettings: JSON.stringify({ textPosition: 'left' }) 
            },
            { 
                id: 'd6', 
                title: isTr ? "Sınav Başarısı İçin Profesyonel Rehberlik" : "Professional Guidance for Exam Success",
                title_en: "Professional Guidance for Exam Success",
                subtitle: isTr ? "IELTS, TOEFL, SAT ve GRE yolculuğunuzda yanınızdayız. Hedeflediğiniz skorlara uzman desteğiyle güvenle ulaşın." : "We are with you in your IELTS, TOEFL, SAT, and GRE journey. Reach your target scores safely with expert support.",
                subtitle_en: "We are with you in your IELTS, TOEFL, SAT, and GRE journey. Reach your target scores safely with expert support.",
                imageUrl: '/images/hero/exams_hero.png', 
                link: '/programlar', 
                imageSettings: JSON.stringify({ textPosition: 'left' }) 
            },
            { 
                id: 'd7', 
                title: isTr ? "Global İş Dünyasına Hazır Mısınız?" : "Are You Ready for the Global Business World?",
                title_en: "Are You Ready for the Global Business World?",
                subtitle: isTr ? "Mesleki denklik süreçlerinden kariyer planlamasına kadar profesyonel danışmanlık. Diplomanızı dünyaya tanıtın." : "Professional consultancy from professional equivalence processes to career planning. Introduce your diploma to the world.",
                subtitle_en: "Professional consultancy from professional equivalence processes to career planning. Introduce your diploma to the world.",
                imageUrl: '/images/hero/career_hero.png', 
                link: '/kariyer', 
                imageSettings: JSON.stringify({ textPosition: 'right' }) 
            }
        ];
    }, []);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const res = await fetch(`/api/hero?context=${context}&locale=${locale}`);
                if (res.ok) {
                    const data = await res.json();
                    setSlides(data?.length > 0 ? data : getDefaultSlides(locale));
                } else {
                    setSlides(getDefaultSlides(locale));
                }
            } catch (error) {
                setSlides(getDefaultSlides(locale));
            } finally {
                setLoading(false);
            }
        };
        fetchSlides();
    }, [context, locale, getDefaultSlides]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
    }, [emblaApi, onSelect]);

    if (loading) return <div className="w-full h-[85vh] bg-zinc-100 animate-pulse" />;
    if (slides.length === 0) return null;

    const currentSlide = slides[selectedIndex];
    const localizedTitle = locale === 'en' ? currentSlide?.title_en : currentSlide?.title;
    const localizedSubtitle = locale === 'en' ? currentSlide?.subtitle_en : currentSlide?.subtitle;

    const settings = (() => {
        try {
            return JSON.parse(currentSlide?.imageSettings || '{}');
        } catch {
            return {};
        }
    })();

    return (
        <div className="relative w-full h-[70vh] md:h-[90vh] min-h-[500px] md:min-h-[750px] overflow-hidden bg-zinc-950 group">
            {/* Soft Ambient Background Layer (Optimized for maximum brightness & clarity) */}
            <div className="absolute inset-0 z-10 bg-zinc-950/5 pointer-events-none" />
            <div className="absolute inset-0 z-12 bg-gradient-to-b from-zinc-950/5 via-transparent to-zinc-950/30 pointer-events-none" />

            <div className="h-full overflow-hidden" ref={emblaRef}>
                <div className="flex h-full">
                    {slides.map((slide, idx) => {
                        const slideSettings = (() => {
                            try {
                                return slide.imageSettings ? JSON.parse(slide.imageSettings) : {};
                            } catch {
                                return {};
                            }
                        })();

                        const overlayColor = slideSettings.overlayColor || "#0B1751";
                        const overlayOpacity = slideSettings.overlayOpacity !== undefined 
                            ? slideSettings.overlayOpacity / 100 
                            : 0.35; // Default to a clean, bright 35% opacity instead of 80%

                        return (
                            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 h-full overflow-hidden">
                                <motion.div 
                                    className="absolute inset-0 w-full h-full"
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: selectedIndex === idx ? 1 : 1.1 }}
                                    transition={{ duration: 10, ease: "linear" }}
                                >
                                    <Image
                                        src={slide.imageUrl}
                                        alt={slide.title}
                                        fill
                                        priority={idx === 0}
                                        className={`opacity-95 transition-opacity duration-500 ${
                                            slideSettings.size === 'contain' ? 'object-contain' : 'object-cover'
                                        }`}
                                        style={{
                                            objectPosition: slideSettings.position || 'center'
                                        }}
                                        sizes="100vw"
                                    />
                                </motion.div>

                                {/* Dynamic, fully controllable slide overlay */}
                                <div 
                                    className="absolute inset-0 z-10 transition-all duration-700 pointer-events-none"
                                    style={{
                                        backgroundColor: overlayColor,
                                        opacity: overlayOpacity
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Premium Content Layer */}
            <div className={`absolute inset-0 z-20 flex px-6 md:px-32 pointer-events-none ${
                settings.textVerticalAlign === 'top' ? 'items-start pt-32 md:pt-48' : settings.textVerticalAlign === 'bottom' ? 'items-end pb-32 md:pb-48' : 'items-center'
            } ${
                settings.textPosition === 'right' ? 'justify-end text-right' : settings.textPosition === 'center' ? 'justify-center text-center' : 'justify-start text-left'
            }`}>
                <div className="max-w-5xl pointer-events-auto">
                    <AnimatePresence>
                        <motion.div
                            key={`content-${selectedIndex}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className={`section-label mb-6 md:mb-8 ${settings.textPosition === 'center' ? '!justify-center' : settings.textPosition === 'right' ? '!justify-end after:content-[""] after:w-8 after:h-[2px] after:bg-secondary after:opacity-40 before:hidden' : ''}`}>
                                <Sparkles size={14} className="text-secondary/60 animate-pulse" /> {t('label')}
                            </div>

                            <h1 className="text-fluid-h1 font-serif font-bold text-white mb-6 md:mb-10 leading-[1.05] tracking-tight drop-shadow-2xl italic">
                                {localizedTitle || currentSlide?.title || ""}
                            </h1>

                            <div className={`mb-10 md:mb-16 max-w-2xl ${
                                settings.textPosition === 'right' ? 'ml-auto border-r-2 pr-6 md:pr-10 border-secondary/30' : 
                                settings.textPosition === 'center' ? 'mx-auto' : 
                                'mr-auto border-l-2 pl-6 md:pl-10 border-secondary/30'
                            }`}>
                                <p className="text-lg md:text-2xl text-zinc-200/90 font-sans leading-relaxed">
                                    {localizedSubtitle || currentSlide?.subtitle || ""}
                                </p>
                            </div>

                            <div className={`flex flex-wrap items-center gap-4 md:gap-8 ${
                                settings.textPosition === 'right' ? 'justify-end' : settings.textPosition === 'center' ? 'justify-center' : 'justify-start'
                            }`}>
                                <Link href={currentSlide?.link || "/iletisim#contact-form"} className="btn-secondary !px-10 md:!px-16 !py-4 md:!py-6 !text-[10px] md:!text-[11px] uppercase tracking-[0.4em] font-black flex items-center gap-3 md:gap-4 group/btn shadow-2xl pointer-events-auto">
                                    {t('viewDetails')} 
                                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover/btn:translate-x-2" />
                                </Link>
                                <Link href={currentSlide?.link || "/iletisim"} className="px-10 md:px-16 py-4 md:py-6 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-white border border-white/40 hover:bg-white hover:text-primary transition-all duration-300 backdrop-blur-md hidden sm:flex pointer-events-auto">
                                    {t('contact')}
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Tech-Forward Navigation */}
            <div className="absolute bottom-8 md:bottom-16 left-6 right-6 md:left-32 md:right-32 z-30 flex items-center justify-between">
                <div className="flex items-center gap-6 md:gap-10">
                    <span className="text-secondary font-serif italic text-xl md:text-2xl font-bold">0{selectedIndex + 1}</span>
                    <div className="w-24 md:w-48 h-[1px] bg-white/20 relative">
                        <motion.div
                            className="absolute inset-x-0 h-[2px] bg-secondary"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: (selectedIndex + 1) / slides.length }}
                            transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
                            style={{ transformOrigin: 'left' }}
                        />
                    </div>
                    <span className="text-zinc-600 font-serif italic text-xl md:text-2xl font-bold">0{slides.length}</span>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <button 
                        onClick={() => emblaApi?.scrollPrev()} 
                        className="w-16 h-16 flex items-center justify-center text-white/50 border border-white/10 hover:border-secondary hover:text-secondary transition-all duration-700 group/prev"
                    >
                        <ChevronLeft className="w-7 h-7 transition-transform duration-500 group-hover/prev:-translate-x-2" />
                    </button>
                    <button 
                        onClick={() => emblaApi?.scrollNext()} 
                        className="w-20 h-20 bg-secondary text-white flex items-center justify-center hover:bg-white hover:text-primary shadow-2xl transition-all duration-700 group/next"
                    >
                        <ChevronRight className="w-9 h-9 transition-transform duration-500 group-hover/next:translate-x-2" />
                    </button>
                </div>
            </div>
        </div>
    );
}
