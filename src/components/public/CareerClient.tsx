'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, UserPlus, MapPin, Clock } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface Opening {
    title: string;
    location: string;
    type: string;
    category: string;
}

export default function CareerClient({ openings }: { openings: Opening[] }) {
    const t = useTranslations('Career.positions');

    return (
        <section className="py-32 bg-zinc-50/50 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-8">
                             <div className="w-12 h-[1px] bg-secondary/30" />
                             <span className="text-[10px] uppercase tracking-[0.4em] font-black text-secondary">{t('label')}</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-serif font-bold text-primary italic tracking-tight leading-tight">
                            <span dangerouslySetInnerHTML={{ __html: t.raw('title') }} />
                        </h2>
                    </div>
                    <p className="text-zinc-400 text-[13px] italic font-serif max-w-sm border-l border-zinc-200 pl-8 leading-relaxed">
                        {t('desc')}
                    </p>
                </div>

                <div className="space-y-4">
                    {openings.map((job, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: i * 0.1, ease: [0.65, 0, 0.35, 1] }}
                            className="bg-white p-10 md:p-14 border border-zinc-50 flex flex-col md:flex-row md:items-center justify-between gap-10 group hover:border-secondary/20 transition-all duration-1000 shadow-premium hover:shadow-2xl rounded-[3rem] relative overflow-hidden"
                        >
                            <div className="space-y-6 flex-grow">
                                <div className="flex flex-wrap items-center gap-4">
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-secondary bg-secondary/5 px-4 py-1.5 rounded-full border border-secondary/10 shadow-sm transition-all duration-700 group-hover:bg-secondary group-hover:text-white group-hover:border-secondary/50">
                                        {job.category}
                                    </span>
                                    <span className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-300 flex items-center gap-2 group-hover:text-zinc-400 transition-colors">
                                        <Clock size={12} strokeWidth={3} /> {job.type}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-serif font-bold text-primary italic group-hover:text-secondary transition-all duration-1000 tracking-tight">{job.title}</h3>
                                    <div className="flex items-center gap-3 text-zinc-400 text-[11px] font-black uppercase tracking-[0.2em] mt-3">
                                        <MapPin size={14} className="text-secondary/50" strokeWidth={3} /> {job.location}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-6">
                                <Link 
                                    href="/iletisim" 
                                    className="btn-primary !py-5 !px-10 text-[10px] tracking-[0.3em] gap-4"
                                >
                                    {t('apply')} <ArrowRight size={14} className="transition-transform group-hover:translate-x-2" />
                                </Link>
                            </div>

                            {/* Background Visual Accent */}
                            <div className="absolute right-0 top-0 w-24 h-full bg-zinc-50/50 -skew-x-12 translate-x-12 group-hover:translate-x-6 transition-transform duration-1000 opacity-0 group-hover:opacity-100" />
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
                    className="mt-24 p-20 bg-zinc-950 text-center rounded-[4rem] border border-zinc-900 relative overflow-hidden group shadow-2xl"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                    
                    <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-[2rem] flex items-center justify-center mx-auto mb-10 text-secondary shadow-2xl group-hover:scale-110 rotate-6 group-hover:rotate-0 transition-all duration-1000">
                        <UserPlus size={32} strokeWidth={1.5} />
                    </div>
                    
                    <h4 className="text-3xl font-serif font-bold text-white mb-6 italic tracking-tight">{t('generalTitle')}</h4>
                    <p className="text-zinc-400 mb-12 max-w-xl mx-auto italic font-serif leading-relaxed text-lg">{t('generalDesc')}</p>
                    
                    <div className="relative inline-block">
                        <a 
                            href="mailto:info@stareducon.co.uk" 
                            className="text-secondary font-black tracking-[0.4em] uppercase text-xs pb-3 border-b-2 border-secondary/20 hover:border-secondary transition-all duration-700 block"
                        >
                            info@stareducon.co.uk
                        </a>
                    </div>
                </motion.div>
            </div>
            
            <div className="absolute left-0 bottom-0 w-96 h-96 bg-secondary/5 blur-[120px] pointer-events-none" />
        </section>
    );
}
