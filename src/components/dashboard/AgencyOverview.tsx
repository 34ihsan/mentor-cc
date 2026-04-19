"use client";

import { motion } from "framer-motion";
import { 
    Users as UsersIcon, 
    Target, 
    DollarSign, 
    ArrowUpRight, 
    ChevronRight,
    Briefcase,
    Zap,
    Activity,
    FileText
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AgencyOverview() {
    const [stats, setStats] = useState<any>(null);
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // In a real scenario, this would be /api/agency/stats
                // For now, we mock or use existing endpoints if they support role filtering
                const response = await fetch("/api/agency/stats");
                
                if (response.ok) {
                    const data = await response.json();
                    setStats(data.summary);
                    setLeads(data.recentApplications);
                }
            } catch (error) {
                console.error("Failed to fetch Agency dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="h-32 bg-zinc-100 rounded-3xl" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-40 bg-zinc-100 rounded-3xl" />
                    ))}
                </div>
            </div>
        );
    }

    const agencyStats = [
        {
            label: "Toplam Öğrenci",
            value: stats?.users?.students || "0",
            trend: "+5.1%",
            icon: UsersIcon,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            label: "Bekleyen Başvurular",
            value: stats?.applications?.distribution?.DOCS_PENDING || "0",
            trend: "Aksiyon Gerekli",
            icon: Target,
            color: "text-orange-600",
            bg: "bg-orange-50"
        },
        {
            label: "Toplam Komisyon",
            value: `$${(stats?.revenue?.totalEstimatedUSD * 0.15).toLocaleString() || "0"}`, // Mock 15% commission
            trend: "+10.2%",
            icon: DollarSign,
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        },
        {
            label: "Aktif Süreçler",
            value: stats?.applications?.total || "0",
            trend: "Stabil",
            icon: Activity,
            color: "text-purple-600",
            bg: "bg-purple-50"
        }
    ];

    return (
        <div className="space-y-10 pb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="premium-card p-10 bg-white border border-zinc-100 shadow-premium relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-10 opacity-[0.05] text-secondary">
                    <Activity size={180} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                             <span className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[10px] font-black uppercase tracking-widest text-primary">
                                ACENTE YÖNETİM MERKEZİ
                            </span>
                             <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                        </div>
                        <h1 className="text-5xl font-black italic text-primary uppercase tracking-tighter mb-4 leading-none">
                            Acente <span className="text-secondary">Performans</span> Paneli
                        </h1>
                        <p className="text-zinc-500 font-medium text-lg max-w-lg leading-relaxed">
                            Öğrenci portföyünüzü, başvuru süreçlerini ve finansal haklarınızı modern bir disiplinle buradan yönetin.
                        </p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {agencyStats.map((stat: any, i: number) => (
                    <div key={i} className="premium-card p-6 group hover:shadow-lg transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={22} />
                            </div>
                            <div className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase">
                                {stat.trend}
                            </div>
                        </div>
                        <h3 className="text-zinc-400 font-bold uppercase tracking-widest text-[8px] mb-1">{stat.label}</h3>
                        <p className="text-3xl font-black text-primary">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 premium-card p-10">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-serif italic text-primary">Son Kayıtlı Öğrenciler</h3>
                        <Link href="/dashboard/students" className="text-[10px] font-black text-secondary uppercase tracking-widest">TÜMÜ</Link>
                    </div>
                    <div className="space-y-4">
                        {leads.slice(0, 4).map((lead: any, i: number) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-zinc-50 hover:bg-zinc-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center font-bold">
                                        {lead.student?.name?.[0] || "S"}
                                    </div>
                                    <div>
                                        <p className="font-bold text-primary text-sm">{lead.student?.name}</p>
                                        <p className="text-[10px] text-zinc-400 uppercase tracking-widest">{lead.program?.name}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase tracking-widest">Aktif</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="premium-card p-10 bg-zinc-50 border border-secondary/10">
                    <h3 className="text-xl font-serif italic text-primary mb-8 border-b border-secondary/5 pb-4">Hızlı Aksiyonlar</h3>
                    <div className="space-y-4">
                        <button className="w-full p-6 rounded-3xl bg-white border border-zinc-100 text-left hover:border-secondary/30 hover:shadow-premium transition-all group">
                             <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-secondary">Yeni Öğrenci</p>
                             <p className="text-sm font-bold text-primary">Manuel Kayıt Ekle</p>
                        </button>
                        <button className="w-full p-6 rounded-3xl bg-white border border-zinc-100 text-left hover:border-secondary/30 hover:shadow-premium transition-all group">
                             <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-secondary">Pazarlama Materyalleri</p>
                             <p className="text-sm font-bold text-primary">Broşür ve Sunumlar</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
