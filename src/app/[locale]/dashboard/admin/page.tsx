"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    Users,
    FileText,
    GraduationCap,
    Building2,
    TrendingUp,
    Activity,
    DollarSign,
    CheckCircle,
    ArrowUpRight,
    Search,
    Layout,
    Megaphone,
    Globe,
    Layers,
    UserCheck,
    Briefcase
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboardPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [stats, setStats] = useState<any>({
        users: { total: 0, students: 0, advisors: 0, agencies: 0 },
        applications: { total: 0, pending: 0, completed: 0, thisMonth: 0 },
        programs: { total: 0, active: 0 },
        institutions: { total: 0 },
        offers: { total: 0, accepted: 0, pending: 0 },
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session && session.user.role !== "ADMIN") {
            router.push("/dashboard");
        } else {
            fetchStats();
        }
    }, [session, router]);

    const fetchStats = async () => {
        try {
            const response = await fetch("/api/admin/stats");
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error("Failed to fetch stats:", error);
        } finally {
            setLoading(false);
        }
    };

    if (session?.user?.role !== "ADMIN") {
        return null;
    }

    const statCards = [
        {
            label: "Sistem Kullanıcıları",
            value: stats.users.total,
            subtext: `${stats.users.students} Öğrenci | ${stats.users.advisors} Danışman`,
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            trend: "+12%"
        },
        {
            label: "Aktif Başvurular",
            value: stats.applications.total,
            subtext: `${stats.applications.thisMonth} Yeni (Son 30 Gün)`,
            icon: FileText,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            trend: "+5%"
        },
        {
            label: "Anlaşmalı Kurumlar",
            value: stats.institutions.total,
            subtext: "Global Eğitim Ortakları",
            icon: Building2,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            trend: "+2"
        },
        {
            label: "Onaylanan Teklifler",
            value: stats.offers.accepted,
            subtext: `${stats.offers.pending} Onay Bekleyen`,
            icon: CheckCircle,
            color: "text-green-500",
            bg: "bg-green-500/10",
            trend: "+18%"
        }
    ];

    const quickLinks = [
        { name: "Sayfalar", icon: Layout, href: "/dashboard/admin/pages", desc: "Site içeriğini yönet" },
        { name: "Duyurular", icon: Megaphone, href: "/dashboard/admin/announcements", desc: "Hızlı bildirim yayınla" },
        { name: "Hero Bölümü", icon: Globe, href: "/dashboard/admin/hero", desc: "Slider içeriklerini düzenle" },
        { name: "Bölgeler", icon: Layers, href: "/dashboard/admin/settings/regions", desc: "Bölgesel kontroller" },
    ];

    return (
        <div className="space-y-8 pb-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {loading ? (
                    Array(4).fill(0).map((_, i) => (
                        <div key={i} className="premium-card p-6 h-32 animate-pulse" />
                    ))
                ) : (
                    statCards.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="premium-card p-6 group hover:shadow-xl transition-all duration-500"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 duration-500`}>
                                    <stat.icon size={22} />
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                    <ArrowUpRight size={10} />
                                    {stat.trend}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</h3>
                                <p className="text-3xl font-black tracking-tight text-primary mb-1">{stat.value}</p>
                                <p className="text-[10px] font-bold text-zinc-400 truncate">{stat.subtext}</p>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Distributions */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 premium-card p-8"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-serif italic text-secondary">Kullanıcı Dağılımı</h3>
                            <p className="text-xs text-zinc-500 font-bold tracking-tight">Sistemdeki aktif rollerin oranları</p>
                        </div>
                        <Activity className="text-zinc-400" size={20} />
                    </div>

                    <div className="space-y-6">
                        {[
                            { label: "Öğrenciler", count: stats.users.students, total: stats.users.total, color: "bg-blue-500", icon: GraduationCap },
                            { label: "Danışmanlar", count: stats.users.advisors, total: stats.users.total, color: "bg-purple-500", icon: UserCheck },
                            { label: "Acentalar", count: stats.users.agencies, total: stats.users.total, color: "bg-orange-500", icon: Building2 },
                        ].map((role, i) => (
                            <div key={i} className="group">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-1.5 rounded-lg ${role.color.replace('bg-', 'text-')} bg-opacity-10`}>
                                            <role.icon size={14} />
                                        </div>
                                        <span className="text-sm font-bold text-primary">{role.label}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-black text-primary">{role.count}</span>
                                        <span className="text-[10px] text-zinc-400 ml-1 font-bold">
                                            (%{((role.count / role.total) * 100 || 0).toFixed(0)})
                                        </span>
                                    </div>
                                </div>
                                <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(role.count / role.total) * 100 || 0}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className={`h-full ${role.color} shadow-sm shadow-current`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Management */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="premium-card p-8"
                >
                    <h3 className="text-xl font-serif italic mb-6 text-secondary">Hızlı Erişim</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {quickLinks.map((link, i) => (
                            <a
                                key={i}
                                href={link.href}
                                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-50 transition-all border border-transparent hover:border-zinc-100 group"
                            >
                                <div className="p-3 rounded-xl bg-zinc-50 text-zinc-400 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                                    <link.icon size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">{link.name}</p>
                                    <p className="text-[10px] font-bold text-zinc-400">{link.desc}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Application Overview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="premium-card p-8"
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-xl font-serif italic text-secondary">Başvuru Operasyonları</h3>
                        <p className="text-xs text-zinc-500 font-medium tracking-tight">Başvuru süreçlerinin anlık durumu</p>
                    </div>
                    <Briefcase className="text-zinc-400" size={20} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { label: "Kabul Oranı", value: `${((stats.offers.accepted / stats.offers.total) * 100 || 0).toFixed(1)}%`, desc: "Başarıya dönüşen teklifler", color: "text-emerald-500" },
                        { label: "Ort. İşlem Süresi", value: "4.2 Gün", desc: "Danışman yanıt hızı", color: "text-blue-500" },
                        { label: "Bekleyen Onaylar", value: stats.applications.pending, desc: "İşlem bekleyen evraklar", color: "text-accent" },
                    ].map((item, i) => (
                        <div key={i} className="text-center p-6 rounded-3xl bg-zinc-50 border border-zinc-100 group hover:border-primary/20 transition-all">
                            <p className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 mb-2">{item.label}</p>
                            <p className={`text-3xl font-black mb-1 ${item.color}`}>{item.value}</p>
                            <p className="text-[10px] font-bold text-zinc-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
