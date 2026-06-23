"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    FileText,
    Users,
    Settings,
    LogOut,
    MessageSquare,
    Mail,
    School,
    Briefcase,
    Layout,
    Megaphone,
    Image as ImageIcon,
    Globe,
    MapPin,
    BarChart3,
    Calendar,
    CheckSquare,
    TrendingUp,
    History,
    FileSearch,
    Wallet,
    ChevronRight,
    Sparkles,
    Building2,
    FileSpreadsheet,
    PlaneTakeoff
} from "lucide-react";
import NextImage from "next/image";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { getUnreadMessagesCountAction } from "@/app/actions/message-actions";

import { useTranslations } from "next-intl";

interface SidebarProps {
    role: string;
    user: any;
}

export default function Sidebar({ role, user }: SidebarProps) {
    const pathname = usePathname();
    const t = useTranslations("Dashboard.Sidebar");
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const fetchUnread = async () => {
            const result = await getUnreadMessagesCountAction();
            if (result.success) setUnreadCount(result.count || 0);
        };
        fetchUnread();
        const interval = setInterval(fetchUnread, 30000); // Check every 30s
        return () => clearInterval(interval);
    }, []);

    const menuGroups = [
        {
            titleKey: "groupOperations", // Operasyon & Satış
            roles: ["ADMIN", "CEO", "ADVISOR", "STUDENT", "AGENCY_MANAGER"],
            items: [
                { key: "overview", icon: BarChart3, href: "/dashboard", roles: ["ADMIN", "CEO", "ADVISOR", "STUDENT", "AGENCY_MANAGER"] },
                { key: "applications", icon: FileSearch, href: "/dashboard/applications", roles: ["ADMIN", "CEO", "ADVISOR", "STUDENT", "AGENCY_MANAGER"] },
                { key: "leadManagement", icon: Globe, href: "/dashboard/agency/leads", roles: ["AGENCY_MANAGER", "ADMIN"] },
                { key: "messages", icon: MessageSquare, href: "/dashboard/messages", roles: ["ADMIN", "CEO", "ADVISOR", "STUDENT", "AGENCY_MANAGER"] },
                { key: "tasks", icon: CheckSquare, href: "/dashboard/advisor/tasks", roles: ["ADVISOR"] },
                { key: "calendar", icon: Calendar, href: "/dashboard/advisor/calendar", roles: ["ADVISOR"] },
                { key: "assignments", icon: Briefcase, href: "/dashboard/ceo/assignments", roles: ["CEO"] },
                { key: "documents", icon: FileText, href: "/dashboard/documents", roles: ["ADMIN", "ADVISOR", "STUDENT"] },
            ]
        },
        {
            titleKey: "groupNetwork", // Eğitim Ağı
            roles: ["ADMIN", "CEO"],
            items: [
                { key: "institutions", icon: School, href: "/dashboard/admin/institutions", roles: ["ADMIN"] },
                { key: "institutions", icon: School, href: "/dashboard/institutions", roles: ["CEO"] }, // Deduplicated view for CEO
                { key: "countries", icon: Globe, href: "/dashboard/admin/countries", roles: ["ADMIN"] },
                { key: "services", icon: Briefcase, href: "/dashboard/admin/services", roles: ["ADMIN"] },
            ]
        },
        {
            titleKey: "groupCMS", // İçerik & Pazarlama
            roles: ["ADMIN", "CEO", "ADVISOR"],
            items: [
                { key: "pages", icon: Layout, href: "/dashboard/admin/pages", roles: ["ADMIN"] },
                { key: "home", icon: Home, href: "/dashboard/admin/pages/home", roles: ["ADMIN"] },
                { key: "hero", icon: ImageIcon, href: "/dashboard/admin/hero", roles: ["ADMIN"] },
                { key: "blog", icon: FileText, href: "/dashboard/admin/blog", roles: ["ADMIN"] },
                { key: "announcements", icon: Megaphone, href: "/dashboard/admin/announcements", roles: ["ADMIN"] },
                { key: "emails", icon: Mail, href: "/dashboard/admin/emails", roles: ["ADMIN"] },
                { key: "socialAI", icon: Sparkles, href: "/dashboard/admin/social", roles: ["ADMIN", "CEO", "ADVISOR"] },
            ]
        },
        {
            titleKey: "groupFinance", // Müşteri & Finans
            roles: ["ADMIN", "CEO", "ADVISOR", "AGENCY_MANAGER"],
            items: [
                { key: "students", icon: Users, href: "/dashboard/students", roles: ["ADVISOR", "CEO", "ADMIN"] },
                { key: "agencyPanel", icon: Building2, href: "/dashboard/agency", roles: ["AGENCY_MANAGER"] },
                { key: "commissions", icon: Wallet, href: "/dashboard/agency/commissions", roles: ["AGENCY_MANAGER"] },
                { key: "finance", icon: Wallet, href: "/dashboard/ceo/finance", roles: ["CEO", "ADMIN"] },
                { key: "performance", icon: TrendingUp, href: "/dashboard/ceo/performance", roles: ["CEO"] },
            ]
        },
        {
            titleKey: "groupSystem", // Sistem & Yönetim
            roles: ["ADMIN", "CEO", "ADVISOR", "STUDENT", "AGENCY_MANAGER"],
            items: [
                { key: "users", icon: Users, href: "/dashboard/admin/users", roles: ["ADMIN"] },
                { key: "users", icon: Users, href: "/dashboard/ceo/users", roles: ["CEO"] }, // Deduplicated view for CEO
                { key: "generalSettings", icon: Settings, href: "/dashboard/admin/settings/general", roles: ["ADMIN"] },
                { key: "regions", icon: MapPin, href: "/dashboard/admin/settings/regions", roles: ["ADMIN"] },
                { key: "import", icon: FileSpreadsheet, href: "/dashboard/admin/import", roles: ["ADMIN"] },
                { key: "logs", icon: History, href: "/dashboard/admin/logs", roles: ["ADMIN"] },
                { key: "myAccount", icon: Settings, href: "/dashboard/settings", roles: ["ADMIN", "CEO", "ADVISOR", "STUDENT", "AGENCY_MANAGER"] },
            ]
        }
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-[280px] z-50 p-6">
            <div className="bg-white h-full flex flex-col border border-zinc-100 shadow-sm relative overflow-hidden group/sidebar rounded-2xl">
                {/* Brand / Logo */}
                <div className="p-8 pb-4 flex items-center justify-center relative z-10 border-b border-zinc-50">
                    <Link href="/" className="transition-all duration-700 hover:scale-105">
                        <NextImage
                            src="/images/MentorCareer.png"
                            alt="Mentor Career"
                            width={160}
                            height={40}
                            priority
                            className="h-9 w-auto object-contain logo-dark contrast-125"
                            style={{ width: "auto", height: "auto" }}
                        />
                    </Link>
                </div>

                {/* Navigation Groups */}
                <div className="flex-1 overflow-y-auto mt-4 px-4 space-y-6 custom-scrollbar relative z-10 pb-8">
                    {menuGroups.map((group, gIdx) => {
                        const groupItems = group.items.filter(item => item.roles.includes(role));
                        if (groupItems.length === 0) return null;

                        return (
                            <div key={gIdx} className="space-y-1">
                                <h3 className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em] px-4 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-[1px] bg-zinc-200"></span>
                                    {t(group.titleKey)}
                                </h3>
                                <div className="space-y-1">
                                    {groupItems.map((item, index) => {
                                        const isActive = pathname === item.href || (pathname?.endsWith(item.href) ?? false);
                                        const label = t(item.key);
                                        return (
                                            <Link
                                                key={item.href + index}
                                                href={item.href}
                                                className="block"
                                                prefetch={false}
                                            >
                                                <div
                                                    className={`relative group flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${isActive
                                                        ? "bg-primary text-white shadow-md shadow-primary/10 translate-x-1"
                                                        : "text-zinc-500 hover:bg-zinc-50 hover:text-primary"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-500 ${isActive ? "bg-white/10 text-secondary" : "bg-white text-zinc-400 group-hover:bg-zinc-100 group-hover:text-primary border border-zinc-100 group-hover:border-zinc-200 shadow-sm"}`}>
                                                            <item.icon size={16} strokeWidth={isActive ? 2 : 1.5} />
                                                        </div>
                                                        <span className={`text-[12px] tracking-wide ${isActive ? "font-black" : "font-semibold"}`}>{label}</span>
                                                        {item.key === "messages" && unreadCount > 0 && (
                                                            <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded-full ${isActive ? "bg-secondary text-primary" : "bg-primary text-white"}`}>
                                                                {unreadCount}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <ChevronRight size={14} className={`transition-all duration-500 ${isActive ? "opacity-100 text-secondary" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"}`} />
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* User Profile / Logout */}
                <div className="p-6 mt-auto border-t border-zinc-50 relative z-10 bg-white">
                    <div className="premium-card !p-3 mb-4 flex items-center gap-3 border border-zinc-100/50 group/user rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-serif font-bold italic text-white text-sm shadow-inner group-hover/user:bg-secondary group-hover/user:text-primary transition-all duration-500">
                            {user?.name?.charAt(0) || "U"}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[12px] font-black truncate text-primary tracking-tight">{user?.name}</p>
                            <p className="text-[9px] font-serif font-bold italic text-secondary uppercase tracking-widest mt-0.5">{role}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => signOut()}
                        className="w-full group flex items-center justify-between p-3 rounded-xl transition-all duration-300 text-zinc-400 hover:bg-zinc-950 hover:text-white font-bold text-[10px] uppercase tracking-[0.2em] border border-transparent hover:border-zinc-800"
                    >
                        <div className="flex items-center gap-3">
                            <LogOut size={16} className="text-zinc-400 group-hover:text-secondary transition-colors" />
                            GÜVENLİ ÇIKIŞ
                        </div>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-mono">X-01</span>
                    </button>
                </div>

                {/* Technical Grid Overlay (Subtle) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20" />
            </div>
        </aside>
    );
}
