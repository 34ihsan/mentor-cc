"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Search,
    Filter,
    MapPin,
    Globe,
    MoreVertical,
    School,
    GraduationCap,
    BookOpen,
    Building2,
    Edit,
    Trash2,
    ExternalLink,
    X,
    Save,
    Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

export default function InstitutionsDirectory() {
    const { data: session } = useSession();
    const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "CEO";

    const [institutions, setInstitutions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [selectedCountry, setSelectedCountry] = useState("ALL");

    // Editor State
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        country: "",
        city: "",
        description: "",
        website: "",
        type: "UNIVERSITY" // Default type for UI grouping if we had a dedicated field
    });

    useEffect(() => {
        fetchInstitutions();
    }, []);

    const fetchInstitutions = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/institutions");
            if (res.ok) {
                const data = await res.json();
                setInstitutions(data);
            }
        } catch (error) {
            console.error("Failed to fetch institutions:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu kurumu silmek istediğinize emin misiniz?")) return;
        try {
            const res = await fetch(`/api/institutions/${id}`, { method: "DELETE" });
            if (res.ok) {
                setInstitutions(institutions.filter(i => i.id !== id));
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const openEditor = (inst: any = null) => {
        if (inst) {
            setEditingId(inst.id);
            setFormData({
                name: inst.name,
                slug: inst.slug || "",
                country: inst.country,
                city: inst.city,
                description: inst.description || "",
                website: inst.website || "",
                type: "UNIVERSITY" // Just a placeholder as schema doesn't have type on Institution yet
            });
        } else {
            setEditingId(null);
            setFormData({
                name: "",
                slug: "",
                country: "",
                city: "",
                description: "",
                website: "",
                type: "UNIVERSITY"
            });
        }
        setIsEditorOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingId
            ? `/api/institutions/${editingId}`
            : "/api/institutions";
        const method = editingId ? "PATCH" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setIsEditorOpen(false);
                fetchInstitutions();
            }
        } catch (error) {
            console.error("Save failed:", error);
        }
    };

    // Derived Data
    const countries = Array.from(new Set(institutions.map(i => i.country?.name || (typeof i.country === 'string' ? i.country : 'Unknown')))).sort() as string[];

    // In a real scenario, we'd filter by an actual 'type' or 'category' field on Institution.
    // Since the schema connects Programs to Institutions, we might infer type, or add a field.
    // For now, we'll simulate categories or just filter by country.
    const categories = [
        { id: "ALL", label: "Tümü", icon: Building2 },
        { id: "UNIVERSITY", label: "Üniversiteler", icon: GraduationCap },
        { id: "LANGUAGE", label: "Dil Okulları", icon: BookOpen },
        { id: "HIGH_SCHOOL", label: "Liseler", icon: School },
    ];

    const filteredInstitutions = institutions.filter(inst => {
        const matchesSearch = inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inst.city.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCountry = selectedCountry === "ALL" || (inst.country?.name || (typeof inst.country === 'string' ? inst.country : "")) === selectedCountry;
        // const matchesCategory = selectedCategory === "ALL" || inst.type === selectedCategory; 

        return matchesSearch && matchesCountry;
    });

    return (
        <div className="space-y-8 pb-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[#003366] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                        <School size={12} />
                        Akademik Partner Ağı
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-slate-950">Kurumlar Rehberi</h1>
                    <p className="text-sm text-slate-900 font-medium mt-1">
                        {isAdmin
                            ? "Anlaşmalı olduğumuz tüm eğitim kurumlarını tek merkezden yönetin."
                            : "Anlaşmalı olduğumuz dünya çapındaki eğitim kurumlarını keşfedin."}
                    </p>
                </div>
                {isAdmin && (
                    <button
                        onClick={() => openEditor()}
                        className="premium-btn group"
                    >
                        <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                        Yeni Kurum Ekle
                    </button>
                )}
            </div>

            {/* Main Filters Toolbar */}
            <div className="glass-card p-2 border-white/40 shadow-xl flex flex-col lg:flex-row items-center gap-4">
                {/* Category Tabs */}
                {/* 
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full lg:w-auto overflow-x-auto">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all whitespace-nowrap ${
                                selectedCategory === cat.id 
                                    ? "bg-white dark:bg-slate-900 text-[var(--primary)] shadow-sm" 
                                    : "text-slate-900 dark:text-white hover:text-slate-600 dark:hover:text-black"
                            }`}
                        >
                            <cat.icon size={14} />
                            {cat.label}
                        </button>
                    ))}
                </div>
                */}

                {/* Country Filter */}
                <div className="relative group min-w-[180px]">
                    <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full appearance-none bg-slate-50 border border-slate-200 text-xs font-black uppercase tracking-widest py-3 px-4 rounded-xl outline-none focus:border-[var(--primary)] cursor-pointer text-slate-600"
                    >
                        <option value="ALL">Tüm Ülkeler</option>
                        {countries.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    <Globe size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-900 pointer-events-none" />
                </div>

                {/* Search */}
                <div className="flex-1 w-full relative group">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 group-focus-within:text-[var(--primary)] transition-colors" />
                    <input
                        type="text"
                        placeholder="Kurum adı veya şehir ara..."
                        className="w-full bg-slate-50 border border-slate-200 py-3 pl-11 pr-4 rounded-xl outline-none focus:border-[var(--primary)] text-sm font-bold transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Institutions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {loading ? (
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="glass-card h-[280px] animate-pulse bg-slate-100 dark:bg-slate-800/50" />
                        ))
                    ) : filteredInstitutions.length === 0 ? (
                        <div className="col-span-full py-20 text-center text-slate-900 dark:text-white">
                            <School size={48} className="mx-auto mb-4 opacity-20" />
                            <p className="font-bold">Kriterlere uygun kurum bulunamadı.</p>
                        </div>
                    ) : filteredInstitutions.map((inst, index) => (
                        <motion.div
                            key={inst.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            className="glass-card group hover:border-[var(--primary)]/50 transition-all duration-300"
                        >
                            {/* Card Decoration */}
                            <div className="h-24 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden group-hover:h-28 transition-all duration-500">
                                {inst.image && (
                                    <img src={inst.image} alt={inst.name} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
                                )}
                                {isAdmin && (
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button
                                            onClick={() => openEditor(inst)}
                                            className="p-2 bg-white/90 dark:bg-slate-900/90 rounded-lg shadow-sm hover:text-[var(--primary)] transition-colors backdrop-blur-sm"
                                        >
                                            <Edit size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(inst.id)}
                                            className="p-2 bg-white/90 dark:bg-slate-900/90 rounded-lg shadow-sm hover:text-red-500 transition-colors backdrop-blur-sm"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 relative">
                                <Link
                                    href={`/kurumsal/kurumlar/${inst.slug}`}
                                    target="_blank"
                                    className="absolute -top-10 left-6 w-20 h-20 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border-4 border-white dark:border-slate-950 flex items-center justify-center text-2xl font-black text-black overflow-hidden"
                                >
                                    {inst.logo ? (
                                        <img src={inst.logo} alt={inst.name} className="w-full h-full object-contain p-2" />
                                    ) : (
                                        inst.name.charAt(0)
                                    )}
                                </Link>

                                <div className="mt-10 mb-6">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="text-lg font-black tracking-tight leading-tight text-slate-950 line-clamp-2 min-h-[3rem]">
                                            {inst.name}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest">
                                        <div className="flex items-center gap-1.5">
                                            <Globe size={12} />
                                            {inst.country?.name || (typeof inst.country === 'string' ? inst.country : "")}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={12} />
                                            {inst.city}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                                        <span className="text-xs font-bold text-slate-900">
                                            {inst._count?.programs || 0} Program
                                        </span>
                                    </div>
                                    <Link
                                        href={`/kurumsal/kurumlar/${inst.slug}`}
                                        className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)] flex items-center gap-1 hover:gap-2 transition-all"
                                    >
                                        İncele <ExternalLink size={12} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Editor Modal */}
            <AnimatePresence>
                {isEditorOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditorOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-2xl bg-white dark:bg-slate-950 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                                <h3 className="text-lg font-black tracking-tight dark:text-white flex items-center gap-2">
                                    <School className="text-[var(--primary)]" size={20} />
                                    {editingId ? "Kurumu Düzenle" : "Yeni Kurum Ekle"}
                                </h3>
                                <button onClick={() => setIsEditorOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="p-8 overflow-y-auto space-y-6">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest ml-1">Kurum Adı</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl outline-none focus:border-[var(--primary)] text-sm font-bold"
                                                placeholder="Oxford University"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest ml-1">Slug (URL)</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.slug}
                                                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/ /g, "-") })}
                                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl outline-none focus:border-[var(--primary)] text-sm font-bold"
                                                placeholder="oxford-university"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest ml-1">Ülke</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.country}
                                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl outline-none focus:border-[var(--primary)] text-sm font-bold"
                                                placeholder="İngiltere"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest ml-1">Şehir</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.city}
                                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl outline-none focus:border-[var(--primary)] text-sm font-bold"
                                                placeholder="Londra"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest ml-1">Açıklama</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full h-32 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl outline-none focus:border-[var(--primary)] text-sm font-medium resize-none"
                                            placeholder="Kurum hakkında kısa bilgi..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest ml-1">Web Sitesi</label>
                                        <input
                                            type="url"
                                            value={formData.website}
                                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl outline-none focus:border-[var(--primary)] text-sm font-bold"
                                            placeholder="https://ox.ac.uk"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-[var(--primary)] hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-colors shadow-xl shadow-blue-900/20"
                                >
                                    {editingId ? "Değişiklikleri Kaydet" : "Kurumu Ekle"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
