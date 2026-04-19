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
    FileSpreadsheet
} from "lucide-react";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { getUnreadMessagesCountAction } from "@/app/actions/message-actions";

import { useTranslations } from "next-intl";
import { BRANDING_ASSETS } from "@/lib/mappings";

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

    const menuItems = [
        { key: "overview", icon: BarChart3, href: "/dashboard", roles: ["ADMIN", "CEO", "ADVISOR", "STUDENT", "AGENCY_MANAGER"] },

        // ADMIN - Site Management
        { key: "users", icon: Users, href: "/dashboard/admin/users", roles: ["ADMIN"] },
        { key: "leads", icon: Megaphone, href: "/dashboard/admin/leads", roles: ["ADMIN", "CEO"] },
        { key: "analytics", icon: TrendingUp, href: "/dashboard/admin/analytics", roles: ["ADMIN"] },
        { key: "pages", icon: Layout, href: "/dashboard/admin/pages", roles: ["ADMIN"] },
        { key: "home", icon: Sparkles, href: "/dashboard/admin/pages/home", roles: ["ADMIN"] },
        { key: "services", icon: Briefcase, href: "/dashboard/admin/services", roles: ["ADMIN"] },
        { key: "countries", icon: Globe, href: "/dashboard/admin/countries", roles: ["ADMIN"] },
        { key: "institutions", icon: School, href: "/dashboard/admin/institutions", roles: ["ADMIN"] },
        { key: "import", icon: FileSpreadsheet, href: "/dashboard/admin/import", roles: ["ADMIN"] },
        { key: "blog", icon: FileText, href: "/dashboard/admin/blog", roles: ["ADMIN"] },
        { key: "announcements", icon: Megaphone, href: "/dashboard/admin/announcements", roles: ["ADMIN"] },
        { key: "hero", icon: ImageIcon, href: "/dashboard/admin/hero", roles: ["ADMIN"] },

        // CEO - Team & Finance
        { key: "users", icon: Users, href: "/dashboard/ceo/users", roles: ["CEO"] },
        { key: "assignments", icon: Briefcase, href: "/dashboard/ceo/assignments", roles: ["CEO"] },
        { key: "finance", icon: Wallet, href: "/dashboard/ceo/finance", roles: ["CEO", "ADMIN"]},
        { key: "performance", icon: TrendingUp, href: "/dashboard/ceo/performance", roles: ["CEO"] },

        // ADVISOR - Operations
        { key: "students", icon: Users, href: "/dashboard/students", roles: ["ADVISOR", "CEO", "ADMIN"] },
        { key: "tasks", icon: CheckSquare, href: "/dashboard/advisor/tasks", roles: ["ADVISOR"] },
        { key: "calendar", icon: Calendar, href: "/dashboard/advisor/calendar", roles: ["ADVISOR"] },

        // SHARED / OTHER
        { key: "institutions", icon: School, href: "/dashboard/institutions", roles: ["ADMIN", "CEO"] },
        { key: "applications", icon: FileSearch, href: "/dashboard/applications", roles: ["ADMIN", "CEO", "ADVISOR", "STUDENT", "AGENCY_MANAGER"] },
        { key: "agencyPanel", icon: Building2, href: "/dashboard/agency", roles: ["AGENCY_MANAGER"] },
        { key: "myStudents", icon: Users, href: "/dashboard/agency", roles: ["AGENCY_MANAGER"] },
        { key: "leadManagement", icon: Globe, href: "/dashboard/agency/leads", roles: ["AGENCY_MANAGER", "ADMIN"] },
        { key: "commissions", icon: Wallet, href: "/dashboard/agency/commissions", roles: ["AGENCY_MANAGER"] },

        { key: "messages", icon: MessageSquare, href: "/dashboard/messages", roles: ["ADMIN", "CEO", "ADVISOR", "STUDENT", "AGENCY_MANAGER"] },
        { key: "documents", icon: FileText, href: "/dashboard/documents", roles: ["ADMIN", "ADVISOR", "STUDENT"] },

        // System Settings
        { key: "generalSettings", icon: Settings, href: "/dashboard/admin/settings/general", roles: ["ADMIN"] },
        { key: "regions", icon: MapPin, href: "/dashboard/admin/settings/regions", roles: ["ADMIN"] },
        { key: "logs", icon: History, href: "/dashboard/admin/logs", roles: ["ADMIN"] },
        { key: "myAccount", icon: Users, href: "/dashboard/settings", roles: ["ADMIN", "CEO", "ADVISOR", "STUDENT", "AGENCY_MANAGER"] },
    ];

    const filteredMenu = menuItems.filter(item => item.roles.includes(role));

    return (
        <aside className="fixed left-0 top-0 h-screen w-[280px] z-50 p-6 pointer-events-none">
            <div className="bg-white/95 backdrop-blur-3xl h-full flex flex-col border border-zinc-200 shadow-premium relative overflow-hidden group/sidebar asymmetric-reverse pointer-events-auto">
                
                {/* Brand / Logo */}
                <div className="p-12 pb-8 flex items-center justify-center relative z-10 border-b border-zinc-100">
                    <Link href="/" className="transition-all duration-700 hover:scale-110 hover:-rotate-3 group/logo">
                        <img
                            src={BRANDING_ASSETS.LOGO}
                            alt="Star Education Consulting"
                            className="h-10 w-auto object-contain opacity-90 group-hover/logo:opacity-100 transition-opacity"
                        />
                    </Link>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto mt-6 px-6 space-y-2 custom-scrollbar relative z-10">
                    {filteredMenu.map((item, index) => {
                        const isActive = pathname === item.href;
                        const label = t(item.key);
                        return (
                            <Link
                                key={item.href + index}
                                href={item.href}
                                className="block"
                            >
                                <div
                                    className={`relative group flex items-center justify-between p-4 rounded-2xl transition-all duration-700 ${isActive
                                        ? "bg-secondary/10 text-secondary shadow-premium translate-x-1 border border-secondary/20"
                                        : "text-zinc-400 hover:bg-zinc-50 hover:text-primary"
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-700 ${isActive ? "bg-secondary text-white shadow-premium" : "bg-zinc-50 text-zinc-400 group-hover:bg-zinc-100 group-hover:text-primary border border-zinc-100"}`}>
                                            <item.icon size={16} strokeWidth={isActive ? 2.5 : 1.5} />
                                        </div>
                                        <span className={`text-[11px] uppercase tracking-[0.2em] transition-colors duration-500 ${isActive ? "font-black" : "font-bold"}`}>{label}</span>
                                        {item.key === "messages" && unreadCount > 0 && (
                                            <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded-full ${isActive ? "bg-secondary text-white" : "bg-secondary/10 text-secondary"}`}>
                                                {unreadCount}
                                            </span>
                                        )}
                                    </div>
                                    <ChevronRight size={14} className={`transition-all duration-700 ${isActive ? "opacity-100 text-secondary" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"}`} />
                                    
                                    {/* Active Indicator */}
                                    {isActive && (
                                        <motion.div 
                                            layoutId="sidebar-active"
                                            className="absolute left-[-24px] top-1/4 bottom-1/4 w-1 bg-secondary shadow-premium"
                                        />
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* User Profile / Logout */}
                <div className="p-8 pt-6 mt-auto border-t border-zinc-100 relative z-10">
                    <div className="bg-zinc-50 p-5 mb-8 flex items-center gap-4 border border-zinc-100 group/user asymmetric-bold transition-all duration-700 hover:bg-zinc-100">
                        <div className="w-11 h-11 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center font-serif font-black italic text-secondary text-lg shadow-inner group-hover/user:scale-110 transition-transform duration-700">
                            {user?.name?.charAt(0) || "U"}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[11px] font-black truncate text-primary uppercase tracking-tight">{user?.name}</p>
                            <p className="text-[9px] font-serif font-bold italic text-secondary uppercase tracking-[0.3em] mt-1 opacity-80">{role} MODE</p>
                        </div>
                    </div>

                    <button
                        onClick={() => signOut()}
                        className="w-full group flex items-center justify-between p-4 rounded-xl transition-all duration-700 text-zinc-400 hover:bg-zinc-50 hover:text-primary font-black text-[10px] uppercase tracking-[0.3em] border border-transparent hover:border-zinc-100"
                    >
                        <div className="flex items-center gap-3">
                            <LogOut size={16} className="text-zinc-400 group-hover:text-secondary transition-colors duration-700" />
                            SECURE EXIT
                        </div>
                        <span className="opacity-0 group-hover:opacity-40 transition-opacity text-[8px] font-mono">ST-01</span>
                    </button>
                </div>

                {/* Cyber Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-20" />
            </div>
        </aside>
    );
}
