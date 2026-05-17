"use client";

import Link from "next/link";
import { 
    Plus, 
    Globe, 
    School, 
    Sparkles, 
    FileText, 
    Megaphone, 
    UserPlus,
    Zap,
    Image as ImageIcon
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminQuickActions() {
    const actions = [
        { 
            label: "Yeni Ülke", 
            icon: Globe, 
            href: "/dashboard/admin/countries?add=true",
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        { 
            label: "Yeni Kurum", 
            icon: School, 
            href: "/dashboard/admin/institutions?add=true",
            color: "text-red-600",
            bg: "bg-red-50"
        },
        { 
            label: "Yeni Hizmet", 
            icon: Sparkles, 
            href: "/dashboard/admin/services?add=true",
            color: "text-amber-600",
            bg: "bg-amber-50"
        },
        { 
            label: "Yeni Blog", 
            icon: FileText, 
            href: "/dashboard/admin/blog?add=true",
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        },
        { 
            label: "Yeni Duyuru", 
            icon: Megaphone, 
            href: "/dashboard/admin/announcements?add=true",
            color: "text-indigo-600",
            bg: "bg-indigo-50"
        },
        { 
            label: "Yeni Hero", 
            icon: ImageIcon, 
            href: "/dashboard/admin/hero?add=true",
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        { 
            label: "Kullanıcı", 
            icon: UserPlus, 
            href: "/dashboard/admin/users/new",
            color: "text-slate-600",
            bg: "bg-slate-50"
        }
    ];

    return (
        <div className="premium-card p-10 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8 border-b border-zinc-50 pb-6">
                <div>
                    <span className="text-[9px] font-black text-secondary uppercase tracking-[0.3em] mb-1 block">Yönetim Paneli</span>
                    <h3 className="text-lg font-serif font-bold italic text-primary flex items-center gap-3">
                        <Zap size={18} className="text-secondary" />
                        Hızlı Hizmetler
                    </h3>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1">
                {actions.map((action, idx) => (
                    <Link key={idx} href={action.href} className="group">
                        <motion.div 
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-5 rounded-xl border border-zinc-100 bg-white group-hover:bg-zinc-50/50 group-hover:border-secondary/20 transition-all flex flex-col items-center gap-3 text-center h-full justify-center shadow-sm"
                        >
                            <div className={`w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-50 border border-zinc-100 group-hover:bg-white group-hover:scale-110 transition-all duration-500 ${action.color}`}>
                                <action.icon size={18} strokeWidth={1.5} />
                            </div>
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest group-hover:text-primary transition-colors">
                                {action.label}
                            </span>
                        </motion.div>
                    </Link>
                ))}
            </div>

            <p className="mt-8 text-[9px] font-mono font-bold text-zinc-300 text-center uppercase tracking-[0.3em] border-t border-zinc-50 pt-6">
                KONSOL KISAYOLLARI v4.0
            </p>
        </div>
    );
}
