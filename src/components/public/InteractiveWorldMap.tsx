"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Globe, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { useTranslations } from 'next-intl';

const COUNTRIES = [
    { id: 'gb', name: 'Birleşik Krallık', pos: { top: '22%', left: '46%' }, partners: '450+', badge: 'Premium Partner' },
    { id: 'us', name: 'Amerika Birleşik Devletleri', pos: { top: '35%', left: '20%' }, partners: '320+', badge: 'Global Excellence' },
    { id: 'ca', name: 'Kanada', pos: { top: '25%', left: '18%' }, partners: '180+', badge: 'Ivy Standard' },
    { id: 'de', name: 'Almanya', pos: { top: '25%', left: '50%' }, partners: '120+', badge: 'Technical Leader' },
    { id: 'ie', name: 'İrlanda', pos: { top: '24%', left: '44%' }, partners: '90+', badge: 'Innovation Hub' },
    { id: 'pl', name: 'Polonya', pos: { top: '26%', left: '53%' }, partners: '60+', badge: 'Academic Growth' },
    { id: 'ch', name: 'İsviçre', pos: { top: '30%', left: '50%' }, partners: '40+', badge: 'Elite Hospitality' },
    { id: 'au', name: 'Avustralya', pos: { top: '75%', left: '85%' }, partners: '85+', badge: 'Global Horizon' },
    { id: 'mt', name: 'Malta', pos: { top: '35%', left: '52%' }, partners: '50+', badge: 'Mediterranean Learning' },
];

export default function InteractiveWorldMap() {
    const t = useTranslations('CountriesHub');
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <div className="relative w-full aspect-[2/1] bg-navy/95 rounded-[3rem] overflow-hidden border border-white/5 shadow-institutional p-8 md:p-16">
            {/* Background Map Decoration (Network Connection Lines) */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                 <svg viewBox="0 0 1000 500" className="w-full h-full text-gold/30 fill-none stroke-current" preserveAspectRatio="none">
                     {/* UK to US */}
                     <motion.path d="M 460,110 Q 330,50 200,175" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }} />
                     {/* UK to CA */}
                     <motion.path d="M 460,110 Q 320,40 180,125" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }} />
                     {/* UK to AU */}
                     <motion.path d="M 460,110 Q 700,200 850,375" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut", delay: 0.4 }} />
                     {/* UK to DE */}
                     <motion.path d="M 460,110 Q 480,90 500,125" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }} />
                     {/* UK to PL */}
                     <motion.path d="M 460,110 Q 500,80 530,130" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }} />
                     {/* UK to MT */}
                     <motion.path d="M 460,110 Q 500,150 520,175" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 1.0 }} />
                 </svg>
            </div>

            {/* Grid Pattern overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('/noise.svg')] bg-repeat" />
            
            <div className="relative z-10 w-full h-full">
                {/* Dots / Markers */}
                {COUNTRIES.map((country) => (
                    <div 
                        key={country.id}
                        className="absolute"
                        style={{ top: country.pos.top, left: country.pos.left }}
                        onMouseEnter={() => setHovered(country.id)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <div className="relative cursor-pointer group">
                            {/* Pulse Effect */}
                            <div className="absolute inset-0 w-4 h-4 -m-1 rounded-full bg-gold/40 animate-ping opacity-75" />
                            <div className={`w-2 h-2 rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(180,148,62,1)] ${
                                hovered === country.id ? 'bg-white scale-150' : 'bg-gold scale-100'
                            }`} />
                            
                            {/* Label (Desktop) */}
                            <AnimatePresence>
                                {hovered === country.id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 w-64"
                                    >
                                        <div className="glass-card p-6 border border-gold/30 shadow-2xl overflow-hidden relative group">
                                            {/* Glow effect */}
                                            <div className="absolute -top-10 -right-10 w-24 h-24 bg-gold/10 blur-2xl rounded-full" />
                                            
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold">
                                                    <Globe size={16} />
                                                </div>
                                                <h4 className="font-serif font-bold text-white italic tracking-tight">{country.name}</h4>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-black uppercase tracking-widest">
                                                    <span>Partners</span>
                                                    <span className="text-gold">{country.partners}</span>
                                                </div>
                                                <div className="h-[1px] w-full bg-white/10" />
                                                <div className="flex items-center gap-2 text-[9px] text-gold/80 italic font-medium">
                                                    <ShieldCheck size={10} /> {country.badge}
                                                </div>
                                            </div>
                                            
                                            <div className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-white/50 group-hover:text-gold transition-colors">
                                                Detayları Gör <ArrowRight size={10} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend / Overlay */}
            <div className="absolute bottom-10 left-10 z-20 hidden md:block">
                <div className="flex items-center gap-8 px-8 py-5 glass-card border-l-4 border-l-gold shadow-2xl">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold/60 mb-1">Global Network</span>
                        <span className="text-xl font-serif font-bold text-white italic tracking-tight">Kurumsal Rotalar</span>
                    </div>
                    <div className="h-10 w-[1px] bg-white/10" />
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold">
                             <Award size={18} />
                        </div>
                        <span className="text-sm font-sans font-medium text-zinc-400">9 Stratejik Bölge</span>
                    </div>
                </div>
            </div>
            
            {/* Watermark/Label */}
            <div className="absolute top-10 right-10 z-20 opacity-20 hidden lg:block">
                 <span className="text-4xl font-serif font-black italic tracking-tighter text-white uppercase opacity-10">Institutional Geodata</span>
            </div>
        </div>
    );
}
