"use client";

import { useState, useEffect } from "react";
import {
    MapPin,
    Plus,
    Trash2,
    Map,
    CheckCircle2,
    XCircle,
    Save,
    ExternalLink,
    LocateFixed,
    Edit3,
    Building2,
    X,
    ChevronRight,
    Map as MapIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RegionsManagement() {
    const [regions, setRegions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingRegion, setEditingRegion] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: "",
        office: "",
        mapsUrl: "",
        isActive: true
    });

    useEffect(() => {
        fetchRegions();
    }, []);

    const fetchRegions = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/settings/regions");
            if (res.ok) {
                const data = await res.json();
                setRegions(data);
            }
        } catch (error) {
            console.error("Failed to fetch regions:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu bölgeyi silmek istediğinize emin misiniz?")) return;
        try {
            const res = await fetch(`/api/admin/settings/regions/${id}`, { method: "DELETE" });
            if (res.ok) {
                setRegions(regions.filter(r => r.id !== id));
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const openEditor = (region: any = null) => {
        if (region) {
            setEditingRegion(region);
            setFormData({
                name: region.name,
                office: region.office || "",
                mapsUrl: region.mapsUrl || "",
                isActive: region.isActive
            });
        } else {
            setEditingRegion(null);
            setFormData({
                name: "",
                office: "",
                mapsUrl: "",
                isActive: true
            });
        }
        setIsEditorOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingRegion ? `/api/admin/settings/regions/${editingRegion.id}` : "/api/admin/settings/regions";
        const method = editingRegion ? "PATCH" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setIsEditorOpen(false);
                fetchRegions();
            } else {
                alert("Kaydetme başarısız.");
            }
        } catch (error) {
            console.error("Save failed:", error);
        }
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[#0B1751] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                        <MapPin size={12} />
                        Bölge Yapılandırması
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-[#0B1751]">Bölge & Ofis Yönetimi</h1>
                    <p className="text-sm text-slate-600 font-medium mt-1">Hizmet verdiğiniz bölgeleri ve fiziksel ofis lokasyonlarını yönetin.</p>
                </div>
                <button
                    onClick={() => openEditor()}
                    className="premium-btn group flex items-center gap-2"
                >
                    <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                    Yeni Bölge Ekle
                </button>
            </div>

            {/* Regions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {loading ? (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="bg-white p-8 h-64 animate-pulse border border-slate-200 rounded-[32px] shadow-sm" />
                        ))
                    ) : regions.length === 0 ? (
                        <div className="col-span-full py-20 text-center opacity-40">
                            <MapIcon size={48} className="mx-auto mb-4 text-[#0B1751]" />
                            <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Kayıtlı Bölge Bulunmuyor</p>
                        </div>
                    ) : (
                        regions.map((region, index) => (
                            <motion.div
                                key={region.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 border border-slate-200 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                            >
                                <div className="absolute -top-4 -right-4 text-slate-50 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                                    <MapIcon size={140} strokeWidth={1} />
                                </div>

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-slate-50 rounded-2xl text-[#0B1751] group-hover:scale-110 transition-transform duration-300 shadow-sm border border-slate-100">
                                            <LocateFixed size={24} />
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openEditor(region)}
                                                className="p-2 hover:bg-slate-50 text-slate-400 hover:text-[#0B1751] rounded-xl transition-colors"
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(region.id)}
                                                className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-1 mb-4">
                                        <h3 className="text-xl font-black text-[#0B1751] tracking-tight">{region.name}</h3>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Building2 size={12} className="text-[#0B1751]" />
                                            {region.office || "Merkez Ofis"}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider ${region.isActive ? "text-green-500" : "text-slate-300"
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${region.isActive ? "bg-green-500" : "bg-slate-300"}`} />
                                            {region.isActive ? "Aktif" : "Pasif"}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {region.mapsUrl && (
                                                <button
                                                    onClick={() => window.open(region.mapsUrl, '_blank')}
                                                    className="p-2 hover:bg-slate-50 text-slate-400 hover:text-[#0B1751] rounded-lg transition-colors"
                                                    title="Haritada Gör"
                                                >
                                                    <ExternalLink size={16} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => openEditor(region)}
                                                className="text-xs font-black text-[#0B1751] hover:text-[#DC2626] transition-colors flex items-center gap-1 group/btn"
                                            >
                                                Detaylar
                                                <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Region Editor Modal */}
            <AnimatePresence>
                {isEditorOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditorOpen(false)}
                            className="absolute inset-0 bg-[#0B1751]/20 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-white border border-slate-200 rounded-[40px] shadow-2xl overflow-hidden"
                        >
                            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <div>
                                    <h2 className="text-2xl font-black text-[#0B1751] tracking-tight">
                                        {editingRegion ? "Bölgeyi Düzenle" : "Yeni Bölge Tanımla"}
                                    </h2>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
                                        Lokasyon & Ofis Yapılandırması
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsEditorOpen(false)}
                                    className="p-3 hover:bg-white text-slate-400 hover:text-[#0B1751] rounded-2xl transition-all shadow-sm group"
                                >
                                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bölge Adı</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black"
                                            placeholder="Örn: Avrupa Yakası"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Ofis Bilgisi</label>
                                        <input
                                            type="text"
                                            value={formData.office}
                                            onChange={(e) => setFormData({ ...formData, office: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black"
                                            placeholder="Örn: Levent Ofis"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Google Harita Linki</label>
                                        <input
                                            type="text"
                                            value={formData.mapsUrl}
                                            onChange={(e) => setFormData({ ...formData, mapsUrl: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black"
                                            placeholder="https://maps.google.com/..."
                                        />
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.isActive}
                                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                                    className="sr-only"
                                                />
                                                <div className={`w-12 h-6 rounded-full transition-colors duration-300 ${formData.isActive ? "bg-green-500" : "bg-slate-300"}`} />
                                                <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${formData.isActive ? "translate-x-6" : "translate-x-0"}`} />
                                            </div>
                                            <span className="text-xs font-black text-black uppercase tracking-wider">Bölge Aktif</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditorOpen(false)}
                                        className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-500 hover:text-black transition-all"
                                    >
                                        Vazgeç
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 premium-btn py-4 flex items-center justify-center gap-2"
                                    >
                                        <Save size={18} />
                                        Kaydet
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
