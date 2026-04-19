"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, FileCheck, DollarSign, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

export default function ManagerCommandCenter() {
    const [stats, setStats] = useState({
        totalOffered: 0,
        activeContracts: 0,
        conversionRate: 0,
        pendingSignatures: 0,
        recentActivity: [] as any[]
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/dashboard/stats");
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="h-64 flex items-center justify-center glass-card">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-slate-100 border-t-slate-950 rounded-full animate-spin" />
                <p className="vivid-label">Veriler Senkronize Ediliyor</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-100">
                <div>
                    <div className="flex items-center gap-2 text-secondary font-black text-[10px] uppercase tracking-[0.4em] mb-3">
                        <div className="w-6 h-px bg-secondary opacity-30" />
                        Finansal İzleme Ünitesi
                    </div>
                    <h2 className="text-4xl font-serif font-bold text-primary italic tracking-tight">Finansal Komuta Merkezi</h2>
                    <p className="text-zinc-500 font-serif italic text-sm mt-1">Ajans geneli sözleşme, ciro ve performans verileri canlı akışı</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Canlı Veri Senkronize
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Stat Cards */}
                <FinancialStatCard
                    title="Toplam Teklif Hacmi"
                    value={`€${stats.totalOffered.toLocaleString()}`}
                    change="+12.4%"
                    icon={DollarSign}
                    status={isStatPositive("+12.4%")}
                />
                <FinancialStatCard
                    title="Aktif Sözleşmeler"
                    value={stats.activeContracts}
                    change="+3"
                    icon={FileCheck}
                    status={true}
                />
                <FinancialStatCard
                    title="Dönüşüm Oranı"
                    value={`%${stats.conversionRate}`}
                    change="-2.1%"
                    icon={TrendingUp}
                    status={false}
                />
                <FinancialStatCard
                    title="İmza Süreçleri"
                    value={stats.pendingSignatures}
                    change="8 Yeni"
                    icon={Users}
                    status={true}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 premium-card p-10 bg-primary text-white overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full -mr-32 -mt-32 blur-[100px] group-hover:bg-secondary/20 transition-all duration-1000" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 blur-[80px]" />

                    <div className="flex justify-between items-start mb-16 relative z-10">
                        <div>
                            <span className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-2 block">Performans Analizi</span>
                            <h3 className="text-2xl font-serif font-bold italic tracking-tight text-white">Haftalık Sözleşme Akışı</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Haftalık Hedef</p>
                            <p className="text-2xl font-serif font-bold text-secondary italic">€50.000</p>
                        </div>
                    </div>

                    <div className="flex items-end gap-3 h-56 relative z-10 pt-10">
                        {[40, 65, 35, 90, 55, 75, 85].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar h-full justify-end">
                                <div className="absolute -top-6 text-[10px] font-mono font-bold text-secondary opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                                    €{height}k
                                </div>
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${height}%` }}
                                    transition={{ delay: i * 0.1, duration: 1, ease: [0.23, 1, 0.32, 1] }}
                                    className="w-full bg-gradient-to-t from-secondary/40 to-secondary/80 rounded-t-lg relative"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-white/20 rounded-t-lg" />
                                </motion.div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] font-mono relative z-10 pt-4 border-t border-white/10">
                        <span>Pzt</span><span>Sal</span><span>Çar</span><span>Per</span><span>Cum</span><span>Cmt</span><span>Paz</span>
                    </div>
                </div>

                <div className="lg:col-span-4 premium-card p-10 flex flex-col">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <span className="text-[9px] font-black text-secondary uppercase tracking-[0.3em] mb-1 block">Log Kayıtları</span>
                            <h3 className="text-lg font-serif font-bold italic text-primary">Kritik Aksiyonlar</h3>
                        </div>
                        <Activity size={16} className="text-secondary/40 animate-pulse" />
                    </div>

                    <div className="space-y-8 flex-1">
                        {stats.recentActivity.length > 0 ? stats.recentActivity.map((item, i) => (
                            <ActionItem
                                key={i}
                                user={item.user}
                                action={item.action}
                                time={new Date(item.time).toLocaleTimeString("tr", { hour: '2-digit', minute: '2-digit' })}
                                type={item.type}
                            />
                        )) : (
                            <div className="flex flex-col items-center justify-center h-full opacity-30 gap-4 mt-12">
                                <div className="w-12 h-12 rounded-full border border-dashed border-zinc-300" />
                                <p className="text-[10px] font-black uppercase tracking-widest">Aktivite Yok</p>
                            </div>
                        )}
                    </div>

                    <button className="w-full mt-10 py-4 border border-zinc-100 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-primary hover:border-secondary/30 transition-all flex items-center justify-center gap-2 group">
                        TÜM RAPORLAR
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}

function FinancialStatCard({ title, value, change, icon: Icon, status }: any) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="premium-card p-8 group relative overflow-hidden"
        >
            <div className="flex justify-between items-start mb-6 border-b border-zinc-50 pb-6">
                <div className="p-3 rounded-xl bg-zinc-50 text-primary border border-zinc-100 group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all duration-500">
                    <Icon size={20} strokeWidth={2} />
                </div>
                <div className={`flex items-center gap-1.5 text-[9px] font-black px-2 py-0.5 rounded-full border ${
                    status ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                }`}>
                    {status ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {change}
                </div>
            </div>
            <div>
                <p className="text-[9px] font-black text-secondary uppercase tracking-[0.2em] mb-2">{title}</p>
                <h4 className="text-3xl font-serif font-bold italic text-primary tracking-tight">{value}</h4>
            </div>
        </motion.div>
    );
}

function ActionItem({ user, action, time, type }: any) {
    const typeStyles: any = {
        urgent: "border-rose-500 bg-rose-500",
        success: "border-emerald-500 bg-emerald-500",
        warning: "border-secondary bg-secondary"
    };

    return (
        <div className="flex items-start gap-4 group cursor-pointer">
            <div className={`w-1 h-10 rounded-full border-l-2 ${typeStyles[type] || 'border-zinc-200 bg-zinc-200'} transition-all`} />
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                    <p className="text-[11px] font-black text-primary group-hover:text-secondary transition-colors uppercase tracking-tight truncate">{user}</p>
                    <span className="text-[9px] font-mono font-bold text-zinc-400 mt-0.5">{time}</span>
                </div>
                <p className="text-[10px] font-serif italic text-zinc-500 leading-tight">{action}</p>
            </div>
        </div>
    );
}

function isStatPositive(trend: string) {
    return trend.includes('+') || trend.toLowerCase().includes('yeni') || trend.toLowerCase().includes('başarı');
}
