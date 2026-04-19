"use client";

import { motion } from "framer-motion";
import {
    Activity,
    Shield,
    Terminal,
    AlertCircle,
    CheckCircle2,
    Clock,
    Search,
    Filter,
    Download,
    Cpu,
    Database,
    Network,
    RefreshCw,
    MoreHorizontal,
    Unlock,
    Lock
} from "lucide-react";

export default function SystemLogs() {
    const logs = [
        { id: 1, type: "SUCCESS", message: "Kullanıcı girişi başarılı: sinan@StarEducation.com", timestamp: "5 saniye önce", service: "AuthService", icon: Unlock },
        { id: 2, type: "WARNING", message: "Yüksek CPU kullanımı tespit edildi (85%)", timestamp: "2 dakika önce", service: "SystemMonitor", icon: Cpu },
        { id: 3, type: "ERROR", message: "API endpoint başarısız: /api/v1/payments", timestamp: "5 dakika önce", service: "PaymentGateway", icon: Network },
        { id: 4, type: "INFO", message: "Yeni blog içeriği yayınlandı ID: #234", timestamp: "12 dakika önce", service: "ContentManager", icon: Activity },
        { id: 5, type: "SUCCESS", message: "Veritabanı yedekleme tamamlandı", timestamp: "1 saat önce", service: "DBBackup", icon: Database },
        { id: 6, type: "SECURITY", message: "Şüpheli oturum açma girişimi engellendi", timestamp: "2 saat önce", service: "SecurityFirewall", icon: Lock },
    ];

    const getTypeColor = (type: string) => {
        switch (type) {
            case "SUCCESS": return "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-900/20";
            case "WARNING": return "text-amber-500 bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-900/20";
            case "ERROR": return "text-rose-500 bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-900/20";
            case "SECURITY": return "text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100 dark:border-indigo-900/20";
            default: return "text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-800";
        }
    };

    return (
        <div className="space-y-10 pb-12">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
                <div>
                    <div className="flex items-center gap-2 text-[#0B1751] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                        <Terminal size={12} />
                        Sistem Arıza ve Aktivite Takibi
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-[#0B1751]">Sistem Logları</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#0B1751] hover:bg-slate-50 transition-all shadow-sm">
                        <Download size={14} />
                        EXPORT
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0B1751] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                        <RefreshCw size={14} />
                        YENİLE
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Uptime", val: "99.99%", color: "text-emerald-500", icon: Activity },
                    { label: "Hatalar (24s)", val: "2", color: "text-rose-500", icon: AlertCircle },
                    { label: "İstek Sayısı", val: "1.2M", color: "text-[#DC2626]", icon: Network },
                    { label: "Aktif Oturum", val: "842", color: "text-indigo-500", icon: Shield },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl bg-slate-50 ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon size={20} />
                            </div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">NORMAL</div>
                        </div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                        <h4 className="text-2xl font-black tracking-tighter text-[#0B1751]">{stat.val}</h4>
                    </motion.div>
                ))}
            </div>

            {/* Log List View */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Log Header Controls */}
                <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row items-center gap-4 bg-slate-50/50">
                    <div className="relative flex-1 w-full group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#DC2626] transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Loglarda veya servislerde ara..."
                            className="w-full bg-white border border-slate-200 pl-12 pr-4 py-2.5 rounded-xl outline-none focus:border-[#DC2626] text-sm font-bold transition-all text-[#0B1751] placeholder:text-slate-400"
                        />
                    </div>
                </div>

                {/* Log Stream */}
                <div className="divide-y divide-slate-50">
                    {logs.map((log, i) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="p-5 flex items-start gap-5 hover:bg-slate-50 transition-all group"
                        >
                            <div className={`p-3 rounded-xl border shrink-0 ${getTypeColor(log.type).split(' dark:')[0]} group-hover:scale-105 transition-transform`}>
                                <log.icon size={18} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md border ${getTypeColor(log.type).split(' dark:')[0]}`}>
                                            {log.type}
                                        </span>
                                        <span className="text-xs font-black text-[#0B1751] uppercase tracking-widest">{log.service}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <Clock size={12} />
                                        {log.timestamp}
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-[#0B1751] break-words font-mono opacity-80 group-hover:opacity-100 transition-opacity">
                                    {log.message}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Pagination / View All */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
                    <button className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0B1751] hover:text-[#DC2626] transition-colors font-bold">
                        TÜM LOGLARI GÖRÜNTÜLE
                    </button>
                </div>
            </div>
        </div>
    );
}
