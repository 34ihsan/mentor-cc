"use client";

import { useEffect, useState, useCallback } from "react";
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
    Lock,
    User,
    ChevronRight
} from "lucide-react";
import { getAdminLogsAction } from "@/app/actions/admin-user-actions";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

interface LogEntry {
    id: string;
    type: string;
    action: string;
    details: any;
    user: string;
    email: string;
    time: string;
}

export default function SystemLogs() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchLogs = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getAdminLogsAction();
            if (result.success && result.logs) {
                setLogs(result.logs as LogEntry[]);
            }
        } catch (error) {
            console.error("Logs fetch error:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    const getTypeColor = (type: string) => {
        switch (type) {
            case "SUCCESS": return "text-emerald-500 bg-emerald-50 border-emerald-100";
            case "WARNING": return "text-amber-500 bg-amber-50 border-amber-100";
            case "ERROR": return "text-rose-500 bg-rose-50 border-rose-100";
            case "SECURITY": return "text-indigo-500 bg-indigo-50 border-indigo-100";
            default: return "text-slate-900 bg-slate-50 border-slate-100";
        }
    };

    const getIcon = (action: string) => {
        if (action.includes("DELETE")) return Lock;
        if (action.includes("UPDATE")) return Database;
        if (action.includes("CREATE")) return Activity;
        if (action.includes("LOGIN")) return Unlock;
        return Activity;
    };

    const filteredLogs = logs.filter(log => 
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    <button 
                        onClick={fetchLogs}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#0B1751] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl disabled:opacity-50"
                    >
                        <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                        {loading ? "YÜKLENİYOR..." : "YENİLE"}
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Uptime", val: "99.99%", color: "text-emerald-500", icon: Activity },
                    { label: "Hatalar (24s)", val: logs.filter(l => l.type === "ERROR").length.toString(), color: "text-rose-500", icon: AlertCircle },
                    { label: "Son Aktivite", val: logs.length > 0 ? formatDistanceToNow(new Date(logs[0].time), { addSuffix: true, locale: tr }) : "-", color: "text-[#DC2626]", icon: Clock },
                    { label: "Toplam Kayıt", val: logs.length.toString(), color: "text-indigo-500", icon: Shield },
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
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">DURUM</div>
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
                            placeholder="Loglarda, kullanıcılarda veya aksiyonlarda ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-200 pl-12 pr-4 py-2.5 rounded-xl outline-none focus:border-[#DC2626] text-sm font-bold transition-all text-[#0B1751] placeholder:text-slate-400"
                        />
                    </div>
                </div>

                {/* Log Stream */}
                <div className="divide-y divide-slate-50 min-h-[400px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <RefreshCw className="animate-spin text-slate-300" size={40} />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Loglar Yükleniyor...</span>
                        </div>
                    ) : filteredLogs.length > 0 ? (
                        filteredLogs.map((log, i) => {
                            const Icon = getIcon(log.action);
                            return (
                                <motion.div
                                    key={log.id}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.02 }}
                                    className="p-5 flex items-start gap-5 hover:bg-slate-50 transition-all group"
                                >
                                    <div className={`p-3 rounded-xl border shrink-0 ${getTypeColor(log.type)} group-hover:scale-105 transition-transform`}>
                                        <Icon size={18} />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                            <div className="flex items-center gap-3">
                                                <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md border ${getTypeColor(log.type)}`}>
                                                    {log.type}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-black text-[#0B1751] uppercase tracking-widest">{log.user}</span>
                                                    <span className="text-[10px] font-bold text-slate-400 lowercase tracking-normal">({log.email})</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                <Clock size={12} />
                                                {formatDistanceToNow(new Date(log.time), { addSuffix: true, locale: tr })}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm font-bold text-[#0B1751] font-mono">
                                            <span className="opacity-60">{log.action}</span>
                                            <ChevronRight size={14} className="text-slate-300" />
                                            <span className="opacity-100 truncate">
                                                {typeof log.details === 'string' ? log.details : JSON.stringify(log.details)}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Terminal className="text-slate-200" size={60} />
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest mb-1">Log Bulunamadı</h3>
                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">SİSTEMDE HENÜZ KAYITLI BİR AKTİVİTE YOK</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Pagination / View All */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
                        SON 50 SİSTEM AKTİVİTESİ GÖRÜNTÜLENİYOR
                    </p>
                </div>
            </div>
        </div>
    );
}
