"use client";

import { motion } from "framer-motion";
import { ChevronRight, Clock, User, GraduationCap, Archive } from "lucide-react";
import Link from "next/link";

interface ApplicationFeedProps {
    initialData?: any[];
    role?: string;
}

export default function ApplicationFeed({ initialData = [], role }: ApplicationFeedProps) {
    if (initialData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-4">
                    <Archive size={32} />
                </div>
                <h3 className="font-black text-slate-900 text-lg tracking-tight mb-1">
                    Henüz Başvuru Yok
                </h3>
                <p className="text-sm text-slate-500 max-w-[200px] font-medium leading-relaxed">
                    Süreçlerinizi takip etmek için yeni bir başvuru başlatabilirsiniz.
                </p>
            </div>
        );
    }

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "DOCS_PENDING":
                return "text-amber-600 border-amber-100 bg-amber-50/30";
            case "UNDER_REVIEW":
                return "text-blue-600 border-blue-100 bg-blue-50/30";
            case "OFFER_SENT":
                return "text-emerald-600 border-emerald-100 bg-emerald-50/30";
            case "CONTRACT_SIGNED":
                return "text-secondary border-secondary/10 bg-secondary/5";
            default:
                return "text-zinc-500 border-zinc-100 bg-zinc-50/30";
        }
    };

    const statusMap: any = {
        "DRAFT": "Taslak",
        "DOCS_PENDING": "Evrak Bekleniyor",
        "UNDER_REVIEW": "İncelemede",
        "OFFER_SENT": "Teklif İletildi",
        "OFFER_ACCEPTED": "Kabul Edildi",
        "CONTRACT_GENERATED": "Sözleşme Hazır",
        "CONTRACT_SIGNED": "İmzalandı",
        "COMPLETED": "Tamamlandı"
    };

    return (
        <div className="divide-y divide-zinc-100/50">
            {initialData.map((app, index) => (
                <Link key={app.id} href={`/dashboard/applications/${app.id}`}>
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative px-6 py-6 hover:bg-zinc-50/50 transition-all duration-300 flex items-center justify-between cursor-pointer"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-xl border border-zinc-100 bg-white flex items-center justify-center text-primary shadow-sm group-hover:border-secondary/20 group-hover:bg-secondary/5 transition-all duration-500">
                                <User size={22} strokeWidth={1.5} />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1.5">
                                    <h4 className="text-base font-serif font-bold italic text-primary tracking-tight">
                                        {app.student?.name || "İsimsiz Öğrenci"}
                                    </h4>
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary/60">
                                        [{app.program?.category?.replace('_', ' ') || "Genel"}]
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-serif italic text-zinc-500">
                                    <GraduationCap size={14} className="text-secondary/40" />
                                    {app.program?.institution?.name} • {app.program?.name}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-10">
                            <div className="hidden md:flex flex-col items-end gap-2 text-right">
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyles(app.status)}`}>
                                    {statusMap[app.status] || app.status}
                                </span>
                                <div className="flex items-center gap-1.5 text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] font-mono">
                                    <Clock size={10} />
                                    {new Date(app.updatedAt).toLocaleDateString('tr-TR')}
                                </div>
                            </div>
                            <div className="w-8 h-8 rounded-full border border-zinc-100 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                                <ChevronRight size={14} className="text-primary" />
                            </div>
                        </div>
                    </motion.div>
                </Link>
            ))}
        </div>
    );
}
