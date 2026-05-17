"use client";

import { useState, useEffect } from "react";
import {
    FileText,
    Search,
    Clock,
    User as UserIcon,
    School,
    ExternalLink,
    Filter,
    ChevronRight,
    ArrowUpRight,
    Sparkles,
    Briefcase
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { useSession } from "next-auth/react";
import ApplicationKanban from "@/components/dashboard/ApplicationKanban";
import { Download } from "lucide-react";
import { exportApplicationsToExcel } from "@/lib/export-utils";

export default function ApplicationsPage() {
    const { data: session } = useSession();
    const role = session?.user?.role;
    const isStudent = role === "STUDENT";

    const [view, setView] = useState<"LIST" | "KANBAN">("LIST");
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    useEffect(() => {
        fetch("/api/applications")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setApplications(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleStatusChange = async (id: string, newStatus: string) => {
        const res = await fetch(`/api/applications/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        });
        
        if (res.ok) {
            setApplications(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
        } else {
            throw new Error("Update failed");
        }
    };

    const filtered = applications.filter(app => {
        const matchesSearch =
            (app.student?.name?.toLowerCase().includes(search.toLowerCase()) ||
                app.program?.name?.toLowerCase().includes(search.toLowerCase()) ||
                app.student?.email?.toLowerCase().includes(search.toLowerCase()));
        const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "DRAFT":
                return "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700/50";
            case "DOCS_PENDING":
                return "bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-900/40";
            case "UNDER_REVIEW":
                return "bg-blue-100 dark:bg-blue-500/20 text-blue-900 dark:text-white border-blue-200 dark:border-blue-900/40";
            case "OFFER_SENT":
                return "bg-purple-100 dark:bg-purple-500/20 text-purple-900 dark:text-purple-200 border-purple-200 dark:border-purple-900/40";
            case "CONTRACT_SIGNED":
                return "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-900/40";
            case "COMPLETED":
                return "bg-[#003366] text-white border-transparent shadow-lg shadow-blue-900/20";
            default:
                return "bg-slate-100 text-slate-900 border-slate-200";
        }
    };

    const statusLabels: any = {
        DRAFT: "Taslak",
        DOCS_PENDING: "Belge Bekleniyor",
        UNDER_REVIEW: "İncelemede",
        OFFER_SENT: "Teklif Gönderildi",
        CONTRACT_SIGNED: "Sözleşme Onaylandı",
        COMPLETED: "Tamamlandı"
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2.5 text-secondary font-black text-[10px] uppercase tracking-[0.4em] mb-3">
                        <div className="w-8 h-px bg-secondary opacity-30" />
                        <Briefcase size={12} className="text-secondary/60" />
                        {isStudent ? "Yolculuğum" : "İş Akışı Yönetimi"}
                    </div>
                    <h1 className="text-4xl font-serif font-bold italic tracking-tight text-primary flex items-center gap-4">
                        {isStudent ? "Başvurularım" : "Başvuru Takibi"}
                    </h1>
                    <p className="text-zinc-500 font-serif italic text-lg mt-3 border-l-2 border-secondary/20 pl-6">
                        {isStudent
                            ? "Akademik yolculuğunuzun güncel durumunu ve süreçlerini buradan takip edin."
                            : "Öğrencilerin akademik yolculuklarını ve operasyonel süreçlerini buradan izleyin."}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    {!isStudent && (
                        <div className="bg-zinc-100 p-1.5 rounded-2xl flex items-center gap-1">
                            <button 
                                onClick={() => setView("LIST")}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'LIST' ? 'bg-white text-primary shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
                            >
                                Liste
                            </button>
                            <button 
                                onClick={() => setView("KANBAN")}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'KANBAN' ? 'bg-white text-primary shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
                            >
                                Kanban
                            </button>
                        </div>
                    )}
                    {!isStudent && (
                        <button
                            onClick={() => exportApplicationsToExcel(filtered)}
                            className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 py-3 px-6 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all border border-emerald-100"
                        >
                            <Download size={14} /> Dışa Aktar
                        </button>
                    )}
                    <Link href="/dashboard/applications/new" className="btn-primary py-3 px-6 text-xs flex items-center gap-2">
                        Yeni Başvuru Başlat
                    </Link>
                </div>
            </div>

            {/* Filters Shell - Only for List View */}
            {view === "LIST" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8 premium-card p-1.5 flex items-center gap-3">
                        <div className="pl-4 text-zinc-400">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Öğrenci adı, program veya email ile ara..."
                            className="bg-transparent border-none outline-none w-full py-3 text-sm font-medium text-zinc-700"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="md:col-span-4 premium-card p-1.5 flex items-center gap-3">
                        <div className="pl-4 text-zinc-400">
                            <Filter size={18} />
                        </div>
                        <select
                            className="bg-transparent border-none outline-none w-full py-3 text-sm font-bold appearance-none cursor-pointer text-zinc-700"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="ALL">Tüm Durumlar</option>
                            {Object.entries(statusLabels).map(([val, label]: any) => (
                                <option key={val} value={val}>{label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            {/* Content Area */}
            <AnimatePresence mode="wait">
                {view === "LIST" ? (
                    <motion.div 
                        key="list"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="premium-card overflow-hidden"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-zinc-50 border-b border-zinc-100">
                                        {!isStudent && (
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 whitespace-nowrap">Öğrenci</th>
                                        )}
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 whitespace-nowrap">Program / Kurum</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 whitespace-nowrap">Durum</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 whitespace-nowrap">Oluşturulma</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-50">
                                    {loading ? (
                                        [1, 2, 3].map(i => (
                                            <tr key={i} className="animate-pulse">
                                                <td colSpan={5} className="px-8 py-10">
                                                    <div className="h-4 bg-zinc-100 rounded w-full" />
                                                </td>
                                            </tr>
                                        ))
                                    ) : filtered.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center opacity-40">
                                                    <FileText size={48} className="mb-4 text-zinc-400" />
                                                    <p className="font-bold text-zinc-500 uppercase tracking-widest text-xs">Henüz Bir Başvuru Bulunamadı</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filtered.map((app, index) => (
                                            <motion.tr
                                                key={app.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.03 }}
                                                className="hover:bg-zinc-50 transition-all group cursor-pointer border-b border-zinc-100"
                                                onClick={() => window.location.href = `/dashboard/applications/${app.id}`}
                                            >
                                                {!isStudent && (
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                                                                <UserIcon size={18} />
                                                            </div>
                                                            <div>
                                                                <p className="font-black text-zinc-900 tracking-tight group-hover:text-primary transition-colors">
                                                                    {app.student?.name || "İsimsiz Öğrenci"}
                                                                </p>
                                                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">
                                                                    {app.student?.email}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                )}
                                                <td className="px-8 py-6">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="p-1 rounded bg-secondary/10 text-secondary text-[8px] font-black uppercase">
                                                                {app.program?.type || "GENEL"}
                                                            </span>
                                                            <span className="font-black text-sm text-zinc-900 tracking-tight">
                                                                {app.program?.name}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900">
                                                            <School size={12} className="text-zinc-600" />
                                                            {app.program?.institution?.name}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border ${getStatusStyles(app.status)}`}>
                                                        {statusLabels[app.status] || app.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900">
                                                            <Clock size={12} className="text-zinc-600" />
                                                            {new Date(app.createdAt).toLocaleDateString('tr-TR')}
                                                        </div>
                                                        <span className="text-[10px] font-black text-zinc-500 mt-1 uppercase tracking-widest pl-4">
                                                            KAYITLI
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <div className="p-2 rounded-xl bg-zinc-50 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                                                            <ChevronRight size={18} className="text-secondary" />
                                                        </div>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer Info */}
                        <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                TOPLAM <span className="text-primary">{filtered.length}</span> BAŞVURU LİSTELENDİ
                            </p>
                            <div className="flex items-center gap-1 text-[10px] font-black text-secondary uppercase tracking-[0.2em]">
                                <Sparkles size={12} />
                                SİSTEM GÜNCEL
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="kanban"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <ApplicationKanban 
                            applications={applications} 
                            onStatusChange={handleStatusChange} 
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
