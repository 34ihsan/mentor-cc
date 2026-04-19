"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle2, ShieldCheck, Sparkles, ChevronRight, GraduationCap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const STEPS = [
    { id: '1', icon: Search, color: 'gold' },
    { id: '2', icon: CheckCircle2, color: 'gold' },
    { id: '3', icon: ShieldCheck, color: 'gold' },
    { id: '4', icon: Sparkles, color: 'gold' },
];

export default function ProcessTrackerPublic() {
    const t = useTranslations('HomePage.Methodology');
    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            {/* Desktop Interaction */}
            <div className="hidden lg:block relative py-24 bg-white backdrop-blur-3xl rounded-[4rem] border border-zinc-200 shadow-xl overflow-hidden">
                {/* Connecting Line - Light Flare */}
                <div className="absolute top-[170px] left-[15%] right-[15%] h-[2px] bg-zinc-100 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-secondary shadow-[0_0_20px_rgba(255,71,0,0.8)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%` }}
                        transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
                    />
                </div>

                <div className="relative flex justify-between px-24">
                    {STEPS.map((step, idx) => {
                        const Icon = step.icon;
                        const isActive = activeStep === idx;
                        const isPast = activeStep > idx;

                        return (
                            <div key={idx} className="flex flex-col items-center w-64 group">
                                <button
                                    onClick={() => setActiveStep(idx)}
                                    className={`relative w-28 h-28 flex items-center justify-center transition-all duration-700 z-10 asymmetric-bold ${
                                        isActive ? 'bg-secondary text-white shadow-neon scale-115 -translate-y-6' : 
                                        isPast ? 'bg-secondary/40 text-white' : 'bg-zinc-50 border border-zinc-200 text-zinc-300'
                                    } group-hover:scale-105 active:scale-95`}
                                >
                                    <Icon size={32} strokeWidth={2.5} className={isActive ? 'animate-pulse' : ''} />
                                    {isActive && (
                                        <motion.div 
                                            layoutId="flare-ring"
                                            className="absolute -inset-6 border-2 border-secondary/20 rounded-2xl opacity-50"
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                        />
                                    )}
                                    <span className={`absolute -top-12 text-[10px] font-black tracking-[0.4em] ${isActive ? 'text-secondary animate-pulse' : 'text-zinc-200'}`}>PHASE 0{idx + 1}</span>
                                </button>

                                <div className="mt-16 text-center">
                                    <h3 className={`text-4xl font-black uppercase tracking-tighter transition-all duration-700 mb-6 ${isActive ? 'text-primary' : 'text-zinc-100'}`}>
                                        {t(`steps.${step.id}.title`)}
                                    </h3>
                                    <AnimatePresence mode="wait">
                                        {isActive && (
                                            <motion.p
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.4 }}
                                                className="text-lg text-zinc-500 font-bold uppercase tracking-tight leading-tight max-w-[240px] mx-auto italic"
                                            >
                                                {t(`steps.${step.id}.desc`)}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 blur-[100px] pointer-events-none" />
            </div>

            {/* Mobile Stack - Premium Obsidian */}
            <div className="lg:hidden space-y-6">
                {STEPS.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                        <div key={idx} className="bg-white p-10 flex flex-col gap-8 relative overflow-hidden group asymmetric-reverse border border-zinc-100 shadow-xl">
                            <div className="absolute -top-10 -right-10 p-10 opacity-[0.05] text-secondary rotate-12">
                                <Icon size={160} />
                            </div>
                            <div className="w-20 h-20 bg-secondary text-white flex items-center justify-center shrink-0 shadow-neon asymmetric-bold">
                                <Icon size={32} strokeWidth={2.5} />
                            </div>
                            <div className="space-y-4 relative z-10">
                                <span className="text-secondary font-black text-[9px] tracking-[0.5em] uppercase">Phase 0{idx + 1}</span>
                                <h3 className="text-4xl font-black text-primary uppercase tracking-tighter leading-none">{t(`steps.${step.id}.title`)}</h3>
                                <p className="text-zinc-500 font-bold text-lg leading-snug tracking-tight italic">{t(`steps.${step.id}.desc`)}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Premium CTA Integration - Solar Flare Focus */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-24"
            >
                <Link href="/randevu" className="block focus:outline-none">
                    <div className="flex flex-col md:flex-row items-center gap-10 p-12 md:p-16 bg-white border border-zinc-100 rounded-[3rem] shadow-premium relative overflow-hidden group transition-all duration-700 hover:border-secondary asymmetric-bold">
                        <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="w-20 h-20 bg-zinc-50 border border-zinc-100 flex items-center justify-center text-secondary relative z-10 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                            <GraduationCap size={42} strokeWidth={2.5} />
                        </div>
                        <div className="text-center md:text-left relative z-10 flex-1">
                            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-400 mb-3">ACCELERATE GROWTH</p>
                            <p className="text-primary font-black uppercase tracking-tighter text-4xl md:text-5xl leading-none">
                                {t('ctaTitle') || 'Kariyer Planınızı Bugün Başlatın'}
                            </p>
                        </div>
                        <div className="w-16 h-16 bg-flare text-white flex items-center justify-center rounded-2xl group-hover:scale-110 transition-all duration-500 relative z-10 shadow-2xl">
                            <ChevronRight size={32} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </Link>
            </motion.div>
        </div>
    );
}
