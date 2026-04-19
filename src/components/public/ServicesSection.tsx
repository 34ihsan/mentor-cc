"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import SafeHTMLContent from '@/components/public/SafeHTMLContent';

interface Service {
    id: string;
    slug: string;
    title: string;
    image: string;
}

interface ServicesSectionProps {
    services: Service[];
    translations: {
        label: string;
        title: string;
        desc: string;
        viewService: string;
        serviceLabels: Record<string, string>;
    };
}

export default function ServicesSection({ services, translations }: ServicesSectionProps) {
    return (
        <section className="section-padding bg-white relative overflow-hidden border-y border-zinc-100">
            <div className="container-content relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-24 space-y-6">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-label justify-center !text-secondary !bg-secondary/10 !border-secondary/20 shadow-neon"
                    >
                        {translations.label}
                    </motion.span>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <SafeHTMLContent 
                            as="h2" 
                            className="text-fluid-h2 font-black text-primary italic uppercase tracking-tighter"
                            html={translations.title}
                        />
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <SafeHTMLContent 
                            as="p" 
                            className="text-zinc-500 text-lg font-bold italic max-w-2xl mx-auto"
                            html={translations.desc}
                        />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Link
                                href={service.slug === 'kariyer' ? '/career' : `/${service.slug}`}
                                className={`group relative h-[500px] block overflow-hidden border border-zinc-100 shadow-xl transition-all duration-700 hover:-translate-y-4 ${idx % 2 === 0 ? 'asymmetric-bold' : 'asymmetric-reverse'}`}
                            >
                                {/* Background Image with Parallax-esque effect */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={service.image}
                                        alt={translations.serviceLabels[service.slug] || service.title}
                                        fill
                                        className="object-cover transition-transform duration-[2000ms] group-hover:scale-110 grayscale group-hover:grayscale-0 contrast-[1.05]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent opacity-95 group-hover:opacity-60 transition-opacity" />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end">
                                    <div className="space-y-6">
                                        <div className="w-12 h-[2px] bg-secondary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />
                                        <h3 className="text-3xl font-black italic text-primary leading-tight group-hover:text-flare group-hover:drop-shadow-[0_0_15px_rgba(255,71,0,0.2)] transition-all duration-500 uppercase tracking-tighter">
                                            {translations.serviceLabels[service.slug] || service.title}
                                        </h3>
                                        <div className="flex items-center gap-4 text-[10px] font-black tracking-[0.4em] uppercase opacity-60 group-hover:opacity-100 transition-all duration-700 text-primary group-hover:text-secondary group-hover:translate-x-2">
                                            {translations.viewService} <ArrowRight size={18} />
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Glow */}
                                <div className="absolute inset-0 border-2 border-secondary/0 group-hover:border-secondary/20 transition-colors pointer-events-none" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid.svg')] opacity-[0.02] pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[150px] pointer-events-none" />
        </section>
    );
}
