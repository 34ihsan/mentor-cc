"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Layout,
    CheckSquare,
    Clock,
    AlertCircle,
    Plus,
    Search,
    Filter,
    Calendar,
    User,
    ChevronRight,
    MoreHorizontal,
    Flag,
    CheckCircle2,
    Briefcase,
    MessageSquare,
    Zap,
    Trash2
} from "lucide-react";
import { toast } from "sonner";

export default function AdvisorTasks() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("active");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/advisor/tasks");
            if (res.ok) {
                const data = await res.json();
                setTasks(data);
            }
        } catch (error) {
            toast.error("Görevler yüklenemedi");
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === "COMPLETED" ? "PENDING" : "COMPLETED";
        try {
            const res = await fetch(`/api/advisor/tasks/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
                toast.success(newStatus === "COMPLETED" ? "Görev tamamlandı" : "Görev geri alındı");
            }
        } catch (error) {
            toast.error("Durum güncellenemedi");
        }
    };

    const deleteTask = async (id: string) => {
        if (!confirm("Bu görevi silmek istediğinize emin misiniz?")) return;
        try {
            const res = await fetch(`/api/advisor/tasks/${id}`, { method: "DELETE" });
            if (res.ok) {
                setTasks(tasks.filter(t => t.id !== id));
                toast.success("Görev silindi");
            }
        } catch (error) {
            toast.error("Silme işlemi başarısız");
        }
    };

    const filteredTasks = tasks.filter(t =>
        activeTab === "active" ? t.status !== "COMPLETED" : t.status === "COMPLETED"
    );

    const getPriorityStyles = (p: string) => {
        switch (p) {
            case "HIGH": return "text-rose-500 bg-rose-50 dark:bg-rose-500/10";
            case "MEDIUM": return "text-amber-500 bg-amber-50 dark:bg-amber-500/10";
            case "LOW": return "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10";
            default: return "";
        }
    };

    return (
        <div className="space-y-10 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
                <div>
                    <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest mb-2">
                        <CheckSquare size={12} />
                        İş Akış ve Görev Yönetimi
                    </div>
                    <h1 className="text-4xl font-serif italic text-secondary">Görev Panosu</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-zinc-100 p-1 rounded-xl border border-zinc-200">
                        {["active", "completed"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? "bg-white shadow-sm text-primary" : "text-zinc-500 hover:text-primary"
                                    }`}
                            >
                                {tab === "active" ? "AKTİF" : "TAMAMLANAN"}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tasks Board / List View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-4">
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-zinc-100 animate-pulse rounded-3xl" />)}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {filteredTasks.map((task, i) => (
                                    <motion.div
                                        key={task.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="premium-card p-5 hover:border-primary transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-start gap-5">
                                                <div
                                                    onClick={() => toggleStatus(task.id, task.status)}
                                                    className={`p-3.5 rounded-2xl transition-all shadow-inner ${task.status === "COMPLETED"
                                                            ? "bg-emerald-500 text-white"
                                                            : "bg-zinc-50 text-zinc-500 group-hover:bg-primary group-hover:text-white"
                                                        }`}>
                                                    <CheckSquare size={20} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h4 className={`text-sm font-black transition-colors ${task.status === "COMPLETED" ? "line-through opacity-50" : "text-primary"}`}>
                                                            {task.title}
                                                        </h4>
                                                        <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-tighter ${getPriorityStyles(task.priority)}`}>
                                                            {task.priority} Prio
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
                                                        <div className="flex items-center gap-1.5"><Flag size={12} /> {task.category || "Genel"}</div>
                                                        {task.deadline && <div className="flex items-center gap-1.5 text-rose-400 font-black"><Clock size={12} /> {new Date(task.deadline).toLocaleDateString()}</div>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => deleteTask(task.id)}
                                                    className="p-2 rounded-xl bg-zinc-50 text-zinc-400 hover:bg-rose-50 hover:text-rose-500 transition-all">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {filteredTasks.length === 0 && (
                                <div className="text-center py-20 text-zinc-400">
                                    <Zap size={48} className="mx-auto mb-4" />
                                    <p className="font-black uppercase tracking-widest text-xs">Görev bulunamadı</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Sidebar Context */}
                <div className="lg:col-span-4 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="premium-card p-8 bg-primary text-white"
                    >
                        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-300 mb-6">Operasyon Özeti</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/20 rounded-2xl"><CheckSquare size={18} /></div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Aktif Görevler</p>
                                    <p className="text-sm font-black">{tasks.filter(t => t.status !== "COMPLETED").length} Bekliyor</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
