'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface Branch {
    country: string;
    city: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    image: string;
    isComingSoon: boolean;
}

export default function BranchesClient({ branches }: { branches: Branch[] }) {
    const t = useTranslations('Branches');

    return (
        <section className="section-padding bg-zinc-50/30">
            <div className="container-content">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {branches.map((branch, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.1, ease: [0.65, 0, 0.35, 1] }}
                            className="premium-card relative group overflow-hidden flex flex-col"
                        >
                            {/* Country Image */}
                            <div className="relative h-64 overflow-hidden">
                                <Image 
                                    src={branch.image}
                                    alt={branch.city}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                />
                                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-1000" />
                                
                                {branch.isComingSoon && (
                                    <div className="absolute top-6 right-6 z-10">
                                        <span className="bg-secondary text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl">
                                            {t('yakinda')}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="p-10 flex-grow flex flex-col">
                                <div className="mb-8">
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-secondary mb-3 block">
                                        {branch.country}
                                    </span>
                                    <h2 className="text-3xl font-serif font-bold text-primary italic tracking-tight">{branch.city}</h2>
                                </div>
                                
                                <div className="space-y-6 mb-10 flex-grow">
                                    <div className="flex items-start gap-4 group/info">
                                        <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover/info:text-secondary group-hover/info:border-secondary/20 transition-all duration-500">
                                            <MapPin className="w-3.5 h-3.5" />
                                        </div>
                                        <p className="text-zinc-500 text-sm leading-relaxed font-sans">{branch.address}</p>
                                    </div>

                                    {/* Branch phone number display removed */}

                                    <div className="flex items-center gap-4 group/info">
                                        <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover/info:text-secondary transition-all">
                                            <Mail className="w-3.5 h-3.5" />
                                        </div>
                                        <a href={`mailto:${branch.email}`} className="text-primary font-bold tracking-wider text-sm hover:text-secondary transition-colors duration-300 break-all">{branch.email}</a>
                                    </div>

                                    <div className="flex items-center gap-4 group/info">
                                        <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover/info:text-secondary transition-all">
                                            <Clock className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">{branch.hours}</span>
                                    </div>
                                </div>

                                <div className="mt-auto pt-8 border-t border-zinc-50">
                                    <Link 
                                        href="/iletisim" 
                                        className="flex items-center justify-between text-[9px] uppercase tracking-[0.3em] font-bold text-secondary hover:text-primary transition-colors duration-500 group/link"
                                    >
                                        <span className="flex items-center gap-3">
                                            {t('randevu')} <ExternalLink size={11} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                        </span>
                                        <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform duration-700 ease-in-out" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
