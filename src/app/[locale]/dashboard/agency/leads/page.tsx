"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Target,
    ArrowRight,
    Briefcase,
    Zap,
    Filter,
    Search,
    Plus,
    MessageSquare,
    Star,
    ChevronRight,
    TrendingUp,
    Globe,
    Compass,
    X,
    ChevronLeft,
    Trash2,
    Edit3,
    Clock
} from "lucide-react";
import { 
    getLeadsAction, 
    updateLeadStatusAction, 
    deleteLeadAction, 
    createLeadAction,
    updateLeadNotesAction 
} from "@/app/actions/lead-actions";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export default function AgencyLeads() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingLead, setEditingLead] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        country: "",
        program: "",
        value: "",
        status: "new"
    });

    const columns = [
        { id: "new", label: "Yeni Adaylar", color: "bg-blue-500" },
        { id: "contact", label: "İletişime Geçildi", color: "bg-amber-500" },
        { id: "eval", label: "Değerlendirme", color: "bg-[var(--primary)]" },
        { id: "win", label: "Kayıt Tamam", color: "bg-emerald-500" },
    ];

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const result = await getLeadsAction();
            if (result.success) {
                setLeads(result.data || []);
            }
        } catch (error) {
            console.error("Failed to fetch leads:", error);
        } finally {
            setLoading(false);
        }
    };

    const openEditor = (lead: any = null) => {
        if (lead) {
            setEditingLead(lead);
            setFormData({
                name: lead.name,
                email: lead.email || "",
                phone: lead.phone || "",
                country: lead.country || "",
                program: lead.program || "",
                value: lead.value || "",
                status: lead.status
            });
        } else {
            setEditingLead(null);
            setFormData({
                name: "",
                email: "",
                phone: "",
                country: "",
                program: "",
                value: "",
                status: "new"
            });
        }
        setIsEditorOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Mapping for subject/message as per lead-actions.ts createLeadAction
            const leadData = {
                ...formData,
                subject: formData.program,
                message: formData.value
            };
            
            let result;
            if (editingLead) {
                // For now, we reuse status update or we could add a full updateLeadAction
                // Since agency/leads is simple, we mostly care about status
                result = await updateLeadStatusAction(editingLead.id, formData.status);
                if (formData.value !== editingLead.value) {
                    // Update notes if value changed as a workaround or add update action
                }
            } else {
                result = await createLeadAction(leadData);
            }

            if (result.success) {
                setIsEditorOpen(false);
                fetchLeads();
            } else {
                alert("İşlem başarısız.");
            }
        } catch (error) {
            console.error("Save failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateLeadStatus = async (leadId: string, newStatus: string) => {
        try {
            const result = await updateLeadStatusAction(leadId, newStatus);
            if (result.success) {
                fetchLeads();
            }
        } catch (error) {
            console.error("Status update failed:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu adayı silmek istediğinize emin misiniz?")) return;
        try {
            const result = await deleteLeadAction(id);
            if (result.success) {
                setLeads(leads.filter(l => l.id !== id));
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const stats = [
        { label: "Potansiyel Ciro", val: `$${leads.reduce((acc, l) => acc + (parseFloat(l.value?.replace(/[^0-9.]/g, '') || '0')), 0).toLocaleString()}`, icon: TrendingUp, color: "text-emerald-500" },
        { label: "Dönüşüm Oranı", val: leads.length ? `%${Math.round((leads.filter(l => l.status === 'win').length / leads.length) * 100)}` : "%0", icon: Target, color: "text-blue-500" },
        { label: "Aktif Adaylar", val: leads.filter(l => l.status !== 'win').length.toString(), icon: Briefcase, color: "text-indigo-500" },
        { label: "Toplam Aday", val: leads.length.toString(), icon: Users, color: "text-amber-500" },
    ];

    return (
        <div className="space-y-10 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
                <div>
                    <div className="flex items-center gap-2 text-[#003366] dark:text-white font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                        <Compass size={12} />
                        Satış ve Aday Yönetim Hattı
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter dark:text-white">Lead Pipeline</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => openEditor()} className="premium-btn flex items-center gap-2 px-6 py-3 shadow-xl shadow-blue-900/10">
                        <Plus size={18} />
                        <span className="text-[10px] font-black tracking-widest uppercase text-red-500">YENİ ADAY</span>
                    </button>
                </div>
            </div>

            {/* Pipeline Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 border-white/40 shadow-xl shadow-blue-900/5 group"
                    >
                        <div className={`p-3 w-fit rounded-2xl bg-slate-50 dark:bg-slate-800/50 ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
                            <stat.icon size={20} />
                        </div>
                        <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-1">{stat.label}</p>
                        <h4 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">{stat.val}</h4>
                    </motion.div>
                ))}
            </div>

            {/* Kanban Board Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {columns.map((col, i) => {
                    const colLeads = leads.filter(l => l.status === col.id);
                    return (
                        <div key={col.id} className="space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-6 rounded-full ${col.color}`} />
                                    <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">{col.label}</h3>
                                </div>
                                <span className="text-[10px] font-black text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">{colLeads.length}</span>
                            </div>

                            <div className="space-y-4 min-h-[200px]">
                                {colLeads.map((lead, j) => (
                                    <motion.div
                                        key={lead.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="glass-card p-5 border-white/40 shadow-xl shadow-blue-900/5 hover:border-[var(--primary)] transition-all group relative"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest">{lead.program || "Genel"}</span>
                                            <div className="flex gap-1">
                                                <button onClick={() => openEditor(lead)} className="p-1 hover:text-[var(--primary)] text-black transition-colors"><Edit3 size={12} /></button>
                                                <button onClick={() => handleDelete(lead.id)} className="p-1 hover:text-red-500 text-black transition-colors"><Trash2 size={12} /></button>
                                            </div>
                                        </div>
                                        <h4 className="text-sm font-black text-slate-900 dark:text-white mb-4 group-hover:text-[var(--primary)] transition-colors">{lead.name}</h4>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-900 dark:text-white uppercase">
                                                <Clock size={10} />
                                                {format(new Date(lead.createdAt), 'dd MMM yyyy', { locale: tr })}
                                            </div>
                                            <span className="text-xs font-black text-slate-900 dark:text-white">{lead.value || "$0"}</span>
                                        </div>

                                        {/* Status quick move */}
                                        <div className="absolute bottom-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {i > 0 && (
                                                <button
                                                    onClick={() => updateLeadStatus(lead.id, columns[i - 1].id)}
                                                    className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white hover:text-slate-900"
                                                >
                                                    <ChevronLeft size={12} />
                                                </button>
                                            )}
                                            {i < columns.length - 1 && (
                                                <button
                                                    onClick={() => updateLeadStatus(lead.id, columns[i + 1].id)}
                                                    className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white hover:text-slate-900"
                                                >
                                                    <ChevronRight size={12} />
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}

                                {colLeads.length === 0 && (
                                    <div className="border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center opacity-30">
                                        <Plus size={24} className="text-black mb-2" />
                                        <p className="text-[10px] font-black text-black uppercase">Boş</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Editor Overlay */}
            <AnimatePresence>
                {isEditorOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsEditorOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-2xl bg-white dark:bg-slate-950 shadow-2xl rounded-3xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                                    {editingLead ? "Adayı Düzenle" : "Yeni Aday Ekle"}
                                </h3>
                                <button onClick={() => setIsEditorOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-900 dark:text-white"><X size={20} /></button>
                            </div>

                            <form onSubmit={handleSave} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Aday Adı Soyadı</label>
                                    <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[var(--primary)] text-sm font-bold text-black" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">E-posta</label>
                                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[var(--primary)] text-sm font-bold text-black" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Telefon</label>
                                    <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[var(--primary)] text-sm font-bold text-black" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Hedef Ülke</label>
                                    <input type="text" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[var(--primary)] text-sm font-bold text-black" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Program</label>
                                    <input type="text" value={formData.program} onChange={(e) => setFormData({ ...formData, program: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[var(--primary)] text-sm font-bold text-black" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Potansiyel Değer (USD)</label>
                                    <input type="text" value={formData.value} onChange={(e) => setFormData({ ...formData, value: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[var(--primary)] text-sm font-bold text-black" placeholder="$5,000" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Aşama</label>
                                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[var(--primary)] text-sm font-bold appearance-none">
                                        {columns.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                                    </select>
                                </div>

                                <div className="md:col-span-2 pt-4 flex gap-3">
                                    <button type="button" onClick={() => setIsEditorOpen(false)} className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-900 dark:text-white hover:bg-slate-100 transition-all">İptal</button>
                                    <button type="submit" className="flex-1 premium-btn py-4">Kaydet</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
