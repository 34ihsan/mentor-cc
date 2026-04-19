"use client";

import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Quote, Star } from 'lucide-react';
import SafeHTMLContent from './SafeHTMLContent';

const images = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
];

export default function Testimonials() {
    const t = useTranslations('Testimonials');
    const [emblaRef] = useEmblaCarousel(
        { loop: true, align: 'start' },
        [Autoplay({ delay: 5000 })]
    );

    return (
        <section className="section-padding bg-zinc-50 border-y border-zinc-100">
            <div className="container mx-auto px-6">

                {/* Section header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="section-label !justify-center">
                        {t('label')}
                    </span>
                    <SafeHTMLContent 
                        as="h2" 
                        className="text-fluid-h2 font-serif font-bold italic tracking-tight text-primary mb-6 leading-tight"
                        html={t.raw('title')}
                    />
                    <p className="text-zinc-600 text-lg leading-relaxed max-w-xl mx-auto">
                        {t.rich('description', {
                            accent: (chunks) => (
                                <span className="text-secondary italic font-semibold font-serif">
                                    {chunks}
                                </span>
                            ),
                        })}
                    </p>
                </div>

                {/* Carousel */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-8 pb-4">
                        {[0, 1, 2, 3].map((idx) => {
                            const name    = t(`items.${idx}.name`);
                            const program = t(`items.${idx}.program`);
                            const text    = t(`items.${idx}.text`);

                            return (
                                <div
                                    key={idx}
                                    className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-8 min-w-0"
                                >
                                    <div className="premium-card p-10 relative flex flex-col h-full group">
                                        {/* Decorative quote */}
                                        <Quote className="absolute top-8 right-8 w-10 h-10 text-secondary/10 group-hover:text-secondary/20 transition-colors duration-700" />

                                        {/* Stars */}
                                        <div className="flex items-center gap-1 text-secondary mb-6">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                            ))}
                                        </div>

                                        {/* Quote text */}
                                        <SafeHTMLContent 
                                            as="p"
                                            className="text-zinc-700 mb-10 font-serif italic text-base leading-relaxed flex-grow"
                                            html={`&ldquo;${t.raw(`items.${idx}.text`)}&rdquo;`}
                                        />

                                        {/* Author */}
                                        <div className="flex items-center gap-5 pt-8 border-t border-zinc-100">
                                            <div className="relative shrink-0">
                                                <Image
                                                    src={images[idx]}
                                                    alt={name}
                                                    width={56}
                                                    height={56}
                                                    className="w-14 h-14 object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700"
                                                />
                                                {/* Gold ring on hover */}
                                                <span className="absolute inset-0 rounded-full border border-secondary/0 group-hover:border-secondary/30 transition-colors duration-500 -m-0.5" />
                                            </div>
                                            <div>
                                                <p className="font-serif font-bold italic text-primary text-base leading-tight">
                                                    {name}
                                                </p>
                                                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary mt-1">
                                                    {program}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
