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
            whileHover={{ y: -4 }}
            className="premium-card p-8 flex flex-col justify-between relative overflow-hidden group h-full"
        >
            {/* Background Accent */}
            <div className="absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-bl-full translate-x-12 -translate-y-12 group-hover:bg-secondary/10 transition-colors duration-500" />

            <div className="flex items-center justify-between mb-8 relative z-10 font-mono">
                <div className="w-10 h-10 flex items-center justify-center bg-zinc-50 border border-zinc-100 rounded-lg text-primary group-hover:scale-110 transition-transform duration-500">
                    <Icon size={18} strokeWidth={2} />
                </div>
                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${isPositive
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    : "bg-zinc-50 text-zinc-500 border border-zinc-100"
                    }`}>
                    <span className={`w-1 h-1 rounded-full ${isPositive ? "bg-emerald-500 animate-pulse" : "bg-zinc-300"}`} />
                    {trend}
                </div>
            </div>

            <div className="relative z-10">
                <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-2">{label}</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-4xl font-serif font-bold italic text-primary tabular-nums tracking-tight">
                        {value}
                    </h3>
                </div>
                <div className="mt-4 flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`h-1 w-full rounded-full ${i <= 3 ? "bg-secondary/20" : "bg-zinc-100"}`} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
