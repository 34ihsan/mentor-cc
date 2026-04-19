"use client";

import { motion } from "framer-motion";
import {
    Users,
    Target,
    BarChart3,
    ArrowUpRight,
    TrendingUp,
    Globe,
    Briefcase,
    Zap,
    PieChart,
    Calendar,
    Filter
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar
} from 'recharts';

const data = [
    { name: 'Oca', apps: 400, revenue: 2400 },
    { name: 'Şub', apps: 300, revenue: 1398 },
    { name: 'Mar', apps: 200, revenue: 9800 },
    { name: 'Nis', apps: 278, revenue: 3908 },
    { name: 'May', apps: 189, revenue: 4800 },
    { name: 'Haz', apps: 239, revenue: 3800 },
];

import { useState, useEffect } from "react";

export default function PerformanceAnalytics() {
    const [statsData, setStatsData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/stats")
            .then(res => res.json())
            .then(data => {
                setStatsData(data);
                setLoading(false);
            });
    }, []);

    const kpis = [
        { label: "Toplam ROI", value: statsData ? `%${((statsData.revenue.totalEstimatedUSD / 10000) * 100).toFixed(0)}` : "...", trend: "+%22", icon: Zap, color: "text-amber-500" },
        { label: "Dönüşüm Oranı", value: statsData ? `%${((statsData.offers.accepted / (statsData.applications.total || 1)) * 100).toFixed(1)}` : "...", trend: "+%2.1", icon: Target, color: "text-blue-500" },
        { label: "Öğrenci Akışı", value: statsData?.users.students.toLocaleString() || "...", trend: "+%12", icon: Users, color: "text-emerald-500" },
        { label: "Global Pazar", value: statsData?.applications.topCountries[0]?.name || "...", trend: "+%0.8", icon: Globe, color: "text-indigo-500" },
    ];

    const chartData = statsData?.applications.monthlyGrowth.map((g: any) => ({
        name: g.name,
        apps: g.count,
        revenue: g.count * 1500 // Mock scaling
    })) || [
            { name: 'Oca', apps: 400, revenue: 2400 },
            { name: 'Şub', apps: 300, revenue: 1398 },
        ];

    if (loading && !statsData) return <div className="p-10 text-center font-black animate-pulse">Stratejik Analiz Hazırlanıyor...</div>;

    return (
        <div className="space-y-10 pb-12">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
                <div>
                    <div className="flex items-center gap-2 text-[#003366] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                        <TrendingUp size={12} />
                        Stratejik Performans Analitiği
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-slate-955">Operasyonel Verimlilik</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white hover:text-slate-900 transition-all shadow-sm">
                        <Calendar size={14} />
                        Son 6 Ay
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/10">
                        <Filter size={14} />
                        FİLTRELE
                    </button>
                </div>
            </div>

            {/* High-Level KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi: any, i: number) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 border-white/40 shadow-xl shadow-blue-900/5 group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 ${kpi.color} group-hover:scale-110 transition-transform duration-500`}>
                                <kpi.icon size={20} strokeWidth={2.5} />
                            </div>
                            <div className="px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 text-[10px] font-black">
                                {kpi.trend}
                            </div>
                        </div>
                        <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1">{kpi.label}</p>
                        <h3 className="text-2xl font-black tracking-tighter text-slate-950">{kpi.value}</h3>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Growth Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-8 glass-card p-8 border-white/40 shadow-2xl shadow-blue-900/5 h-[450px] flex flex-col"
                >
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-lg font-black tracking-tighter text-slate-950 uppercase">Büyüme İndeksi</h3>
                            <p className="text-[10px] text-slate-900 font-bold uppercase tracking-widest">Başvuru ve Gelir Korelasyonu</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]" />
                                <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase">GELİR</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase">BAŞVURU</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }}
                                    dy={10}
                                />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '16px',
                                        border: 'none',
                                        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                                        fontSize: '12px',
                                        fontWeight: '900'
                                    }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                <Area type="monotone" dataKey="apps" stroke="#10b981" strokeWidth={3} fill="none" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Secondary Metrics */}
                <div className="lg:col-span-4 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-8 border-white/40 shadow-xl shadow-blue-900/5"
                    >
                        <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6">Pazar Dağılımı</h3>
                        <div className="space-y-6">
                            {[
                                { label: "Avrupa", value: 65, color: "bg-blue-500" },
                                { label: "Amerika", value: 42, color: "bg-indigo-500" },
                                { label: "Asya", value: 18, color: "bg-emerald-500" },
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                                        <span className="text-slate-900 dark:text-white">{item.label}</span>
                                        <span className="text-slate-900 dark:text-white">%{item.value}</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.value}%` }}
                                            transition={{ duration: 1, delay: i * 0.2 }}
                                            className={`h-full ${item.color} rounded-full`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-8 border-white/40 shadow-xl shadow-blue-900/5 bg-[var(--primary)] text-white relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Briefcase size={80} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-xs font-black uppercase tracking-widest opacity-70 mb-2">Hedeflenen Ciro</h3>
                            <h2 className="text-3xl font-black tracking-tighter mb-4">$2,450,000</h2>
                            <div className="flex items-center gap-2">
                                <div className="px-2 py-1 rounded-full bg-white/20 text-[10px] font-black">
                                    %82 TAMAMLAMRDI
                                </div>
                                <ArrowUpRight size={14} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Operational Intelligence */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Danışman Performansı", desc: "En yüksek dönüşüm: Can Yılmaz (%88)", icon: Users, stat: "9.2/10" },
                    { title: "Program Talebi", desc: "Dil Okulları talebi %14 arttı", icon: BarChart3, stat: "+14.2%" },
                    { title: "Sistem Sağlığı", desc: "Tüm servisler aktif ve optimize", icon: Briefcase, stat: "99.9%" },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="glass-card p-6 border-white/40 shadow-xl shadow-blue-900/5 flex items-start gap-4"
                    >
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-[var(--primary)] shrink-0">
                            <item.icon size={20} />
                        </div>
                        <div>
                            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-1">{item.title}</h4>
                            <p className="text-[10px] text-slate-900 dark:text-white font-bold mb-3">{item.desc}</p>
                            <span className="text-lg font-black tracking-tighter text-[var(--primary)]">{item.stat}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
