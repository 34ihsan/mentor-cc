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
        <div className="bg-white p-10 h-full flex flex-col rounded-[2.5rem] border border-zinc-100 shadow-premium-hover transition-all duration-1000 relative overflow-hidden group">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,71,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,71,0,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40" />

            <div className="flex items-center justify-between mb-10 border-b border-zinc-100 pb-8 relative z-10">
                <div>
                    <span className="text-[10px] font-black text-secondary uppercase tracking-[0.5em] mb-2 block opacity-70">CORE CONSOLE</span>
                    <h3 className="text-xl font-serif font-bold italic text-primary flex items-center gap-4 uppercase tracking-tighter">
                        <Zap size={22} className="text-secondary fill-secondary animate-pulse" />
                        Hızlı Hizmetler
                    </h3>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-5 flex-1 relative z-10">
                {actions.map((action, idx) => (
                    <Link key={idx} href={action.href} className="group/tile">
                        <motion.div 
                            whileHover={{ scale: 1.05, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-8 rounded-[2rem] border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:border-secondary/20 hover:shadow-premium transition-all duration-500 flex flex-col items-center gap-4 text-center h-full justify-center group-hover/tile:backdrop-blur-sm"
                        >
                            <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-white border border-zinc-100 group-hover/tile:bg-primary group-hover/tile:text-secondary group-hover/tile:border-primary transition-all duration-500 group-hover/tile:scale-110 shadow-sm text-secondary`}>
                                <action.icon size={24} strokeWidth={2} />
                            </div>
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] group-hover/tile:text-primary transition-all duration-500">
                                {action.label}
                            </span>
                        </motion.div>
                    </Link>
                ))}
            </div>

            <p className="mt-10 text-[9px] font-black text-zinc-300 text-center uppercase tracking-[0.4em] border-t border-zinc-100 pt-8 relative z-10">
                TERMINAL SHORTCUTS <span className="text-secondary opacity-50">v5.0</span>
            </p>
        </div>
    );
}
