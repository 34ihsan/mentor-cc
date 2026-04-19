'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, GraduationCap, ArrowRight } from 'lucide-react';
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

    return (
        <section className="section-padding bg-zinc-50/30">
            <div className="container-content">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {testimonials.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.98, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.1, ease: [0.65, 0, 0.35, 1] }}
                            className="premium-card p-10 md:p-12 relative group overflow-hidden flex flex-col"
                        >
                            <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000">
                                <Quote size={80} className="text-secondary" />
                            </div>
                            
                            <div className="flex items-center gap-6 mb-10">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-zinc-50 p-1 relative shadow-inner group-hover:scale-105 transition-transform duration-1000">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-1000"
                                        sizes="80px"
                                    />
                                </div>
                                <div className="space-y-1.5 text-left">
                                    <h4 className="text-2xl font-serif font-bold text-primary italic tracking-tight">{item.name}</h4>
                                    <div className="text-[9px] uppercase tracking-[0.4em] text-secondary font-black bg-secondary/5 px-4 py-1.5 rounded-full inline-block">
                                        {t('classOf', { year: item.year })}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8 space-y-3">
                                <div className="flex items-center gap-3 text-zinc-400 text-[10px] uppercase tracking-[0.3em] font-bold">
                                    <GraduationCap size={14} className="text-secondary/60" /> 
                                    <span className="truncate">{item.university}</span>
                                </div>
                                <div className="text-primary font-bold text-xs tracking-widest italic flex items-center gap-3">
                                    <div className="w-6 h-[1px] bg-secondary/30" />
                                    {item.program}
                                </div>
                            </div>

                            <div className="relative mb-10">
                                <span className="absolute -left-4 -top-2 text-secondary/10 font-serif text-4xl">&ldquo;</span>
                                <p className="text-zinc-500 font-serif italic leading-relaxed text-[15px] relative z-10">
                                    {item.quote}
                                </p>
                            </div>
                            
                            <div className="mt-auto flex items-center justify-between border-t border-zinc-50 pt-8">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <Star 
                                            key={star} 
                                            size={10} 
                                            className="fill-secondary text-secondary transition-transform duration-500 group-hover:scale-125" 
                                            style={{ transitionDelay: `${star * 40}ms` }}
                                        />
                                    ))}
                                </div>
                                <div className="w-9 h-9 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-300 group-hover:text-secondary group-hover:bg-secondary/5 transition-all duration-700">
                                    <ArrowRight size={14} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
