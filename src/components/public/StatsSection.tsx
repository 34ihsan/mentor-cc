"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SafeHTMLContent from './SafeHTMLContent';

interface Stat {
    value: string;
    label: string;
}

interface StatsSectionProps {
    stats: Stat[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
    return (
        <section className="py-24 bg-zinc-50 relative overflow-hidden border-t border-zinc-200">
            <div className="container-content relative z-20">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
                    {stats.map((stat, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative group text-center"
                        >
                            <div className="text-6xl md:text-7xl font-black text-flare drop-shadow-[0_0_15px_rgba(255,71,0,0.3)] mb-4 tracking-tighter italic">
                                {stat.value}
                            </div>
                            <SafeHTMLContent 
                                as="p"
                                className="text-zinc-500 uppercase text-[9px] font-black tracking-[0.4em] max-w-[120px] mx-auto leading-relaxed group-hover:text-zinc-300 transition-colors"
                                html={stat.label}
                            />
                            
                            {/* Bottom Accent */}
                            <div className="mt-8 w-8 h-[2px] bg-secondary/30 mx-auto group-hover:w-16 group-hover:bg-secondary transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
            
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[40%] h-full bg-secondary/5 blur-[120px] pointer-events-none skew-x-12" />
            <div className="absolute bottom-0 left-0 w-[30%] h-full bg-secondary/5 blur-[100px] pointer-events-none -skew-x-12" />
        </section>
    );
}
