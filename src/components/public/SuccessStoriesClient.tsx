'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, GraduationCap, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface Testimonial {
    name: string;
    university: string;
    program: string;
    image: string;
    quote: string;
    year: string;
}

export default function SuccessStoriesClient({ testimonials }: { testimonials: Testimonial[] }) {
    const t = useTranslations('SuccessStories');
    const [active, setActive] = useState(0);

    if (!testimonials || testimonials.length === 0) return null;

    const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
    const next = () => setActive((a) => (a + 1) % testimonials.length);

    const current = testimonials[active];

    return (
        <section className="section-padding bg-primary relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-secondary/[0.04] rounded-full translate-x-1/4 translate-y-1/4" />
                {/* Fine grid texture */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                        backgroundSize: '80px 80px'
                    }}
                />
            </div>

            <div className="container-content relative z-10">
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20">
                    <div className="space-y-6 max-w-2xl">
                        <span className="inline-flex items-center gap-3 text-secondary font-bold tracking-[0.3em] uppercase text-xs">
                            <span className="w-8 h-[2px] bg-secondary opacity-40" />
                            {t('heroLabel')}
                        </span>
                        <h2
                            className="text-fluid-h2 font-serif font-bold text-white italic leading-tight"
                            dangerouslySetInnerHTML={{ __html: t.raw('heroTitle') }}
                        />
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center gap-4">
                        <span className="text-zinc-600 font-serif italic text-lg mr-4">
                            <span className="text-secondary">{String(active + 1).padStart(2, '0')}</span>
                            &nbsp;/&nbsp;
                            {String(testimonials.length).padStart(2, '0')}
                        </span>
                        <button
                            onClick={prev}
                            className="w-14 h-14 flex items-center justify-center border border-white/10 text-white/40 hover:border-secondary hover:text-secondary transition-all duration-500 group"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <button
                            onClick={next}
                            className="w-16 h-16 bg-secondary text-white flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-500 group shadow-xl"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Main Testimonial — Large Featured Display */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-white/8 overflow-hidden mb-16"
                    >
                        {/* Image Panel */}
                        <div className="lg:col-span-2 relative min-h-[350px] lg:min-h-[500px] bg-zinc-900 overflow-hidden">
                            <Image
                                src={current.image || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800"}
                                alt={current.name}
                                fill
                                className="object-cover opacity-60 grayscale-[20%]"
                                sizes="(max-width: 1024px) 100vw, 40vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />

                            {/* Year Badge */}
                            <div className="absolute top-8 left-8">
                                <div className="bg-secondary/20 backdrop-blur-sm border border-secondary/30 px-5 py-2.5">
                                    <span className="text-secondary text-[10px] font-black uppercase tracking-[0.4em]">
                                        {t('classOf', { year: current.year })}
                                    </span>
                                </div>
                            </div>

                            {/* Name on image (mobile) */}
                            <div className="absolute bottom-8 left-8 lg:hidden">
                                <h3 className="text-2xl font-serif font-bold text-white italic">{current.name}</h3>
                            </div>
                        </div>

                        {/* Content Panel */}
                        <div className="lg:col-span-3 bg-white/[0.03] backdrop-blur-sm p-10 lg:p-16 flex flex-col justify-between border-l border-white/8">
                            {/* Large decorative quote */}
                            <div className="absolute top-8 right-12 opacity-[0.04] select-none">
                                <Quote size={120} className="text-secondary" />
                            </div>

                            <div className="space-y-8 relative z-10">
                                {/* Stars */}
                                <div className="flex gap-1.5">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} size={14} className="fill-secondary text-secondary" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-zinc-300 font-serif italic text-xl lg:text-2xl leading-relaxed">
                                    &ldquo;{current.quote}&rdquo;
                                </p>

                                <div className="w-16 h-[1px] bg-secondary/40" />

                                {/* Name & Details */}
                                <div className="space-y-4">
                                    <h3 className="hidden lg:block text-3xl font-serif font-bold text-white italic">
                                        {current.name}
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 text-secondary/80 text-[10px] uppercase tracking-[0.35em] font-black">
                                            <GraduationCap size={14} />
                                            <span>{current.university}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-zinc-500 text-[10px] uppercase tracking-[0.25em] font-bold">
                                            <div className="w-5 h-[1px] bg-zinc-600" />
                                            <span>{current.program}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Thumbnail Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {testimonials.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`group relative h-20 overflow-hidden border transition-all duration-500 ${
                                i === active
                                    ? 'border-secondary shadow-lg shadow-secondary/20'
                                    : 'border-white/10 opacity-40 hover:opacity-70 hover:border-white/30'
                            }`}
                        >
                            <Image
                                src={item.image || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300"}
                                alt={item.name}
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                sizes="200px"
                            />
                            <div className="absolute inset-0 bg-primary/40" />
                            <div className="absolute bottom-2 left-2 right-2">
                                <p className="text-white text-[8px] font-black uppercase tracking-wider truncate">{item.name}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
