"use client";

import { motion } from "framer-motion";
import {
    TrendingUp,
    Users as UserIcon,
    DollarSign,
    Target,
    ArrowUpRight,
    Briefcase,
    Zap,
    Building2,
    CheckCircle2,
    ChevronRight,
    PieChart,
    Activity
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CEOOverview() {
    const [stats, setStats] = useState<any>(null);
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, appsRes] = await Promise.all([
                    fetch("/api/admin/stats"),
                    fetch("/api/applications")
                ]);

                if (statsRes.ok) setStats(await statsRes.json());
                if (appsRes.ok) {
                    const appsData = await appsRes.json();
                    setApplications(appsData.slice(0, 5)); // Get latest 5
                }
            } catch (error) {
                console.error("Failed to fetch CEO dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-3xl" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-40 bg-slate-100 dark:bg-slate-800 rounded-3xl" />
                    ))}
                </div>
            </div>
        );
    }

    const mainStats = [
        {
            label: "Toplam Tahmini Ciro",
            value: `$${stats?.revenue?.totalEstimatedUSD?.toLocaleString() || "0"}`,
            trend: "+12.5%",
            icon: DollarSign,
            color: "text-blue-600",
            bg: "bg-blue-50",
            href: "/dashboard/ceo/finance"
        },
        {
            label: "Aktif Öğrenciler",
            value: stats?.users?.students || "0",
            trend: "+8.2%",
            icon: UserIcon,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            href: "/dashboard/ceo/users"
        },
        {
            label: "Dönüşüm Oranı",
            value: `%${((stats?.offers?.accepted / (stats?.applications?.total || 1)) * 100).toFixed(1)}`,
            trend: "+2.1%",
            icon: Target,
            color: "text-purple-600",
            bg: "bg-purple-50",
            href: "/dashboard/ceo/performance"
        },
        {
            label: "Anlaşmalı Kurumlar",
            value: stats?.institutions?.total || "0",
            trend: "+3",
            icon: Building2,
            color: "text-orange-600",
            bg: "bg-orange-50",
            href: "/kurumlar"
        }
    ];

    const modules = [
        {
            title: "Finansal Analiz",
            desc: "Ciro, komisyon ve nakit akışı takibi",
            icon: DollarSign,
            href: "/dashboard/ceo/finance",
            color: "blue"
        },
        {
            title: "Operasyonel Performans",
            desc: "Danışman verimliliği ve başarı oranları",
            icon: Activity,
            href: "/dashboard/ceo/performance",
            color: "emerald"
        },
        {
            title: "Kullanıcı Yönetimi",
            desc: "Sistemdeki tüm aktörlerin genel bakışı",
            icon: UserIcon,
            href: "/dashboard/ceo/users",
            color: "purple"
        },
        {
            title: "Kaynak Atamaları",
            desc: "Öğrenci-danışman eşleştirme havuzu",
            icon: Briefcase,
            href: "/dashboard/ceo/assignments",
            color: "orange"
        }
    ];

    return (
        <div className="space-y-10 pb-12">
            {/* CEO Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden group premium-card p-10 bg-gradient-to-br from-white via-zinc-50 to-zinc-100/50 text-primary"
            >
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
                    <TrendingUp size={180} strokeWidth={1} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[10px] font-black uppercase tracking-widest text-primary">
                                CEO STRATEJİK PANEL
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        </div>
                        <h1 className="text-4xl font-serif italic text-secondary mb-4">
                            Stratejik Görünüm & Kontrol
                        </h1>
                        <p className="text-zinc-600 font-medium text-lg max-w-lg leading-relaxed">
                            Global operasyonlarınızı tek bir noktadan yönetin, finansal hedeflerinizi ve ekip performansınızı anlık takip edin.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mainStats.map((stat: any, i: number) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="premium-card p-6 group hover:shadow-xl transition-all duration-500"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 duration-500`}>
                                <stat.icon size={22} />
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                <ArrowUpRight size={10} />
                                {stat.trend}
                            </div>
                        </div>
                        <h3 className="text-zinc-500 font-bold uppercase tracking-widest text-[8px] mb-1">{stat.label}</h3>
                        <p className="text-3xl font-black tracking-tight text-primary mb-4">{stat.value}</p>
                        <Link
                            href={stat.href}
                            className="text-[10px] font-black text-secondary uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
                        >
                            DETAYLI ANALİZ <ChevronRight size={12} />
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Strategic Modules & Rapid Access */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Modules Grid */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {modules.map((module, i) => (
                        <Link
                            key={i}
                            href={module.href}
                            className="premium-card p-8 group hover:shadow-2xl hover:border-primary transition-all duration-500"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-${module.color}-50 text-${module.color}-600 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                                <module.icon size={28} />
                            </div>
                            <h3 className="text-xl font-serif italic text-primary mb-2">{module.title}</h3>
                            <p className="text-sm font-medium text-zinc-500 mb-6 leading-relaxed">
                                {module.desc}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-primary transition-colors">MODÜLE GİT</span>
                                <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Sidebar Insight Card */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="premium-card p-8 bg-gradient-to-br from-secondary/10 to-white"
                    >
                        <div className="flex items-center gap-2 text-secondary font-black text-[10px] uppercase tracking-widest mb-6">
                            <Zap size={14} />
                            Haftalık Özet
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {stats?.applications?.distribution?.COMPLETED || "0"}
                                </div>
                                <div>
                                    <p className="text-xs font-black text-primary uppercase">Tamamlanan</p>
                                    <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">BAŞARILI BAŞVURU</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary font-bold">
                                    {stats?.offers?.accepted || "0"}
                                </div>
                                <div>
                                    <p className="text-xs font-black text-primary uppercase">Kabul Edilen</p>
                                    <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">GÖNDERİLEN TEKLİF</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 pt-8 border-t border-zinc-100">
                            <h4 className="text-[8px] font-bold uppercase tracking-widest text-zinc-400 mb-4">Ülke Bazlı Başarı</h4>
                            <div className="space-y-3">
                                {stats?.applications?.topCountries?.slice(0, 3).map((country: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-zinc-600">{country.name}</span>
                                        <span className="text-xs font-black text-primary">{country.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <div className="premium-card p-6 bg-primary text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                            <PieChart size={60} />
                        </div>
                        <h4 className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-4">Hızlı Performans</h4>
                        <div className="flex items-end gap-1 mb-2">
                            <span className="text-3xl font-serif italic text-secondary">9.4</span>
                            <span className="text-xs font-bold text-zinc-300 mb-1.5">/ 10</span>
                        </div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase">Müşteri Memnuniyeti</p>
                    </div>
                </div>
            </div>

            {/* Recent Applications Feed */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="premium-card p-10"
            >
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h3 className="text-3xl font-serif italic text-secondary">Son Başvurular</h3>
                        <p className="text-xs font-bold text-zinc-500 tracking-widest uppercase mt-1">SİSTEME DÜŞEN GÜNCEL TALEPLER</p>
                    </div>
                    <Link
                        href="/dashboard/applications"
                        className="btn-primary"
                    >
                        TÜMÜNÜ GÖR
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {applications.length === 0 ? (
                        <div className="text-center py-20 border-2 border-dashed border-zinc-100 rounded-3xl">
                            <Activity className="mx-auto mb-4 text-zinc-300" size={48} />
                            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Henüz başvuru bulunmuyor</p>
                        </div>
                    ) : (
                        applications.map((app: any, i: number) => (
                            <Link
                                key={app.id}
                                href={`/dashboard/applications/${app.id}`}
                                className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-3xl border border-zinc-100 hover:border-primary hover:bg-zinc-50/50 transition-all duration-300"
                            >
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-zinc-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        <UserIcon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-primary text-lg tracking-tight mb-1">{app.student?.name || "İsimsiz Öğrenci"}</h4>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{app.program?.name}</span>
                                            <span className="w-1 h-1 rounded-full bg-zinc-200" />
                                            <span className="text-[10px] font-black text-secondary uppercase tracking-widest">{app.program?.institution?.name}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 mt-4 md:mt-0">
                                    <div className="text-right hidden md:block">
                                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">DURUM</p>
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${app.status === 'UNDER_REVIEW' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                            app.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                'bg-zinc-50 text-zinc-500 border-zinc-200'
                                            }`}>
                                            {app.status}
                                        </span>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-primary group-hover:text-white transition-all">
                                        <ChevronRight size={20} />
                                    </div>
                                </div>
                            </Link>
                        )
                        ))}
                </div>
            </motion.div>
        </div>
    );
}
