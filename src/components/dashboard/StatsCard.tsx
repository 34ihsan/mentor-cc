"use client";

import { FileText, FileCheck, MessageSquare, CheckCircle, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
    label: string;
    value: string;
    trend: string;
    icon: string;
}

export default function StatsCard({ label, value, trend, icon }: StatsCardProps) {
    const IconMap: any = {
        file: FileText,
        docs: FileCheck,
        msg: MessageSquare,
        check: CheckCircle,
    };
    const Icon = IconMap[icon] || FileText;

    const isPositive = trend.includes('+') || trend.toLowerCase().includes('başarı') || trend.toLowerCase().includes('mükemmel');

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white/[0.03] backdrop-blur-xl p-10 flex flex-col justify-between relative overflow-hidden group h-full asymmetric-bold border border-white/5 shadow-premium-hover transition-all duration-1000"
        >
            {/* Background Accent - Aurora Neon */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-secondary/5 blur-[60px] rounded-full group-hover:bg-secondary/15 transition-all duration-1000" />
            
            <div className="flex items-center justify-between mb-12 relative z-10 font-mono">
                <div className="w-12 h-12 flex items-center justify-center bg-secondary/10 border border-secondary/20 rounded-2xl text-secondary group-hover:scale-110 group-hover:shadow-neon transition-all duration-1000 group-hover:rotate-6">
                    <Icon size={22} strokeWidth={2.5} />
                </div>
                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] ${isPositive
                    ? "bg-secondary text-primary shadow-neon"
                    : "bg-white/5 text-zinc-400 border border-white/10"
                    }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isPositive ? "bg-primary" : "bg-zinc-500"}`} />
                    {trend}
                </div>
            </div>

            <div className="relative z-10">
                <p className="text-[11px] font-black text-secondary uppercase tracking-[0.4em] mb-4 opacity-80 group-hover:opacity-100 transition-opacity">{label}</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-5xl font-serif font-bold italic text-white leading-none tabular-nums tracking-tighter">
                        {value}
                    </h3>
                </div>
                
                {/* Modern Indicator Bar */}
                <div className="mt-8 flex gap-2 h-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div 
                            key={i} 
                            className={`h-full flex-1 rounded-full transition-all duration-1000 ${
                                i <= 3 
                                ? "bg-secondary shadow-neon group-hover:opacity-100" 
                                : "bg-white/5 group-hover:bg-white/10"
                            }`} 
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
