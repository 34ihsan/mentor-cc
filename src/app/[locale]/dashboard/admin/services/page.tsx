"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Globe,
    Eye,
    FileText,
    Layout,
    ExternalLink,
    Filter,
    X,
    Save,
    Code,
    CheckCircle,
    XCircle,
    Target,
    ChevronUp,
    ChevronDown,
    Copy
} from "lucide-react";
import ImageSettingsControl, { defaultImageSettings } from "@/components/admin/ImageSettingsControl";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

function ServicesManagementContent() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingService, setEditingService] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: "",
        title_en: "",
        title_de: "",
        slug: "",
        content: "",
        content_en: "",
        content_de: "",
        image: "",
        imageSettings: defaultImageSettings,
        allowsTargeting: false,
        active: true,
        seoTitle: "",
        seoTitle_en: "",
        seoTitle_de: "",
        seoDescription: "",
        seoDescription_en: "",
        seoDescription_de: "",
        icon: "",
        order: 0
    });
    const [activeTab, setActiveTab] = useState<'tr' | 'en' | 'de'>('tr');
    const [showSource, setShowSource] = useState(false);

    useEffect(() => {
        if (searchParams?.get('add') === 'true') {
            openEditor();
        }
    }, [searchParams]);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/services");
            if (res.ok) {
                const data = await res.json();
                setServices(data);
            }
        } catch (error) {
            console.error("Failed to fetch services:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu hizmeti silmek istediğinize emin misiniz?")) return;
        try {
            const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
            if (res.ok) {
                setServices(services.filter(s => s.id !== id));
            } else {
                const errorText = await res.text();
                alert(errorText || "Silme işlemi başarısız oldu.");
            }
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Silme işlemi sırasında bir hata oluştu.");
        }
    };

    const openEditor = (service: any = null) => {
        if (service) {
            let settings = defaultImageSettings;
            try {
                if (service.imageSettings) {
                    const parsed = JSON.parse(service.imageSettings);
                    if (parsed) settings = parsed;
                }
            } catch (e) { console.error("Error parsing settings", e); }

            setEditingService(service);
            setFormData({
                title: service.title,
                title_en: service.title_en || "",
                title_de: service.title_de || "",
                slug: service.slug,
                content: service.content || "",
                content_en: service.content_en || "",
                content_de: service.content_de || "",
                image: service.image || "",
                imageSettings: settings,
                allowsTargeting: service.allowsTargeting,
                active: service.active,
                seoTitle: service.seoTitle || "",
                seoTitle_en: service.seoTitle_en || "",
                seoTitle_de: service.seoTitle_de || "",
                seoDescription: service.seoDescription || "",
                seoDescription_en: service.seoDescription_en || "",
                seoDescription_de: service.seoDescription_de || "",
                icon: service.icon || "",
                order: service.order || 0
            });
        } else {
            setEditingService(null);
            setFormData({
                title: "",
                title_en: "",
                title_de: "",
                slug: "",
                content: "",
                content_en: "",
                content_de: "",
                image: "",
                imageSettings: defaultImageSettings,
                allowsTargeting: false,
                active: true,
                seoTitle: "",
                seoTitle_en: "",
                seoTitle_de: "",
                seoDescription: "",
                seoDescription_en: "",
                seoDescription_de: "",
                icon: "",
                order: services.length // Default to end of list
            });
        }
        setShowSource(false);
        setActiveTab('tr');
        setIsEditorOpen(true);
    };

    const generateSlug = (text: string) => {
        return text.toString().toLowerCase().trim()
            .replace(/[\s\W-]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .split('-').slice(0, 5).join('-');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        const fieldName = activeTab === 'tr' ? 'title' : `title_${activeTab}`;
        const updates: any = { [fieldName]: title };
        if (activeTab === 'tr' && !editingService) {
            updates.slug = generateSlug(title);
        }
        setFormData(prev => ({ ...prev, ...updates }));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        const file = e.target.files[0];
        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: uploadData });
            if (res.ok) {
                const data = await res.json();
                setFormData({ ...formData, image: data.url });
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Dosya yüklenirken bir hata oluştu.");
        }
    };

    const handleReorder = async (direction: 'up' | 'down', index: number) => {
        const newServices = [...services];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex >= newServices.length) return;

        // Swap
        const temp = newServices[index];
        newServices[index] = newServices[targetIndex];
        newServices[targetIndex] = temp;

        // Update orders
        const updatedOrders = newServices.map((s, i) => ({
            id: s.id,
            order: i
        }));

        try {
            const res = await fetch("/api/admin/services/reorder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orders: updatedOrders })
            });

            if (res.ok) {
                setServices(newServices);
            } else {
                alert("Sıralama güncellenemedi.");
            }
        } catch (error) {
            console.error("Reorder failed:", error);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingService ? `/api/admin/services/${editingService.id}` : "/api/admin/services";
        const method = editingService ? "PATCH" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    imageSettings: JSON.stringify(formData.imageSettings)
                })
            });

            if (res.ok) {
                setIsEditorOpen(false);
                fetchServices();
            } else {
                alert("Kaydetme başarısız.");
            }
        } catch (error) {
            console.error("Save failed:", error);
            alert("Bağlantı hatası.");
        }
    };

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-2 text-[#0B1751] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                            <Layout size={12} />
                            İçerik Yönetimi
                        </div>
                        <h1 className="text-3xl font-black tracking-tighter text-[#0B1751]">Hizmetler (Programlar)</h1>
                        <p className="text-sm text-slate-700 font-medium mt-1">Hizmet kategorilerini ve detay sayfalarını yönetin.</p>
                    </div>
                    <button
                        onClick={() => openEditor()}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#0B1751] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-blue-900/10"
                    >
                        <Plus size={14} />
                        Yeni Hizmet Ekle
                    </button>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-2xl">
                    <div className="flex items-center gap-3">
                        <div className="text-blue-500"><Globe size={20} /></div>
                        <div>
                            <p className="text-sm font-bold text-blue-900">Statik Navigasyon Modu Aktif</p>
                            <p className="text-xs text-blue-700 mt-0.5">Site hızı optimizasyonu için Header ve Footer menüleri kod tarafında sabitlenmiştir. Bu sayfadaki değişiklikler ana menü yapısını etkilemez.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-1.5 flex items-center gap-3 border border-slate-200 rounded-2xl shadow-sm">
                <div className="pl-4 text-slate-400"><Search size={18} /></div>
                <input
                    type="text"
                    placeholder="Hizmet adı ara..."
                    className="bg-transparent border-none outline-none w-full py-2.5 text-sm font-bold text-black placeholder:text-slate-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.15em] text-[#0B1751]">Hizmet Adı</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.15em] text-[#0B1751]">Durum</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.15em] text-[#0B1751]">Sıra</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.15em] text-[#0B1751]">Hedefleme</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.15em] text-[#0B1751] text-right">Yönetim</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <AnimatePresence mode="popLayout">
                                {loading ? (
                                    <tr><td colSpan={5} className="p-10 text-center text-slate-500 dark:text-slate-400 font-bold">Yükleniyor...</td></tr>
                                ) : filteredServices.map((service, index) => (
                                    <motion.tr
                                        key={service.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="group hover:bg-slate-50/50 transition-all"
                                    >
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                {service.image ? (
                                                    <img src={service.image} className="w-12 h-12 rounded-xl object-cover shadow-sm" alt="" />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-[#0B1751]"><Layout size={20} /></div>
                                                )}
                                                <div>
                                                    <div className="text-sm font-bold text-black mb-0.5">{service.title}</div>
                                                    <div className="text-[10px] text-slate-400 font-bold uppercase">/{service.slug}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            {service.active ?
                                                <span className="text-[10px] font-black bg-emerald-100 text-emerald-600 px-2 py-1 rounded-md uppercase">Aktif</span> :
                                                <span className="text-[10px] font-black bg-slate-100 text-slate-400 px-2 py-1 rounded-md uppercase">Pasif</span>
                                            }
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => handleReorder('up', index)}
                                                    disabled={index === 0}
                                                    className="p-1.5 hover:bg-slate-100 rounded disabled:opacity-30 text-[#0B1751] hover:text-[#DC2626] transition-all"
                                                >
                                                    <ChevronUp size={14} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleReorder('down', index)}
                                                    disabled={index === filteredServices.length - 1}
                                                    className="p-1.5 hover:bg-slate-100 rounded disabled:opacity-30 text-[#0B1751] hover:text-[#DC2626] transition-all"
                                                >
                                                    <ChevronDown size={14} />
                                                </button>
                                                <span className="text-[10px] font-bold text-slate-500 ml-2 w-4 text-center">{service.order}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            {service.allowsTargeting ?
                                                <span className="flex items-center gap-1 text-[10px] font-bold text-blue-500"><Target size={12} /> Hedeflenebilir</span> :
                                                <span className="text-[10px] font-bold text-slate-400">-</span>
                                            }
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEditor(service)}
                                                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-[#0B1751] transition-all"
                                                    title="Düzenle"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(service.id)}
                                                    className="p-2 hover:bg-red-50 rounded-lg text-slate-500 hover:text-[#DC2626] transition-all"
                                                    title="Sil"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Editor Overlay */}
            <AnimatePresence>
                {isEditorOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsEditorOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-6xl h-[95vh] bg-white flex flex-col shadow-2xl overflow-hidden rounded-3xl"
                        >
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div>
                                    <h3 className="text-xl font-black tracking-tight text-[#0B1751] flex items-center gap-2">
                                        <Layout className="text-[#DC2626]" size={20} />
                                        {editingService ? "Hizmeti Düzenle" : "Yeni Hizmet Ekle"}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex bg-slate-100 p-1 rounded-xl mr-2">
                                        {[
                                            { id: 'tr', label: 'TR', icon: '🇹🇷' },
                                            { id: 'en', label: 'EN', icon: '🇬🇧' },
                                            { id: 'de', label: 'DE', icon: '🇩🇪' }
                                        ].map((tab) => (
                                            <button
                                                key={tab.id}
                                                type="button"
                                                onClick={() => setActiveTab(tab.id as any)}
                                                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${activeTab === tab.id
                                                    ? 'bg-white text-[#0B1751] shadow-sm'
                                                    : 'text-slate-500 hover:text-slate-700'
                                                    }`}
                                            >
                                                <span>{tab.icon}</span>
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>
                                    <button 
                                        type="button" 
                                        onClick={handleSave} 
                                        className="flex items-center gap-2 px-6 py-2 bg-[#0B1751] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-blue-900/10"
                                    >
                                        <Save size={14} />
                                        Kaydet
                                    </button>
                                    <button onClick={() => setIsEditorOpen(false)} className="p-2 rounded-xl bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 transition-all"><X size={20} /></button>
                                </div>
                            </div>

                            <form onSubmit={handleSave} className="flex-1 flex flex-col overflow-hidden">
                                <div className="p-8 pb-4 grid grid-cols-1 md:grid-cols-2 gap-8 shrink-0 overflow-y-auto max-h-[40vh]">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-black uppercase tracking-widest">Hizmet Başlığı ({activeTab.toUpperCase()})</label>
                                            <input
                                                required={activeTab === 'tr'}
                                                type="text"
                                                value={activeTab === 'tr' ? formData.title : (formData as any)[`title_${activeTab}`]}
                                                onChange={handleTitleChange}
                                                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[var(--primary)] text-sm font-bold text-black"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-black uppercase tracking-widest">Slug (URL)</label>
                                                <input required type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[var(--primary)] text-sm font-bold text-black" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-black uppercase tracking-widest">İkon (Lucide)</label>
                                                <input type="text" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[var(--primary)] text-sm font-bold text-black" placeholder="Örn: Globe, School..." />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-black uppercase tracking-widest">Sıralama</label>
                                                <input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[var(--primary)] text-sm font-bold text-black" />
                                            </div>
                                        </div>

                                        <div className="pt-4 space-y-4 border-t border-slate-100 dark:border-slate-800">
                                            <div className="text-[10px] font-black text-black uppercase tracking-widest flex items-center gap-2">
                                                <Globe size={12} />
                                                SEO Ayarları
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-black uppercase tracking-widest">SEO Başlığı ({activeTab.toUpperCase()})</label>
                                                <input
                                                    type="text"
                                                    value={activeTab === 'tr' ? formData.seoTitle : (formData as any)[`seoTitle_${activeTab}`]}
                                                    onChange={(e) => setFormData({ ...formData, [activeTab === 'tr' ? 'seoTitle' : `seoTitle_${activeTab}`]: e.target.value })}
                                                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[var(--primary)] text-sm font-bold text-black"
                                                    placeholder="Arama motoru başlığı..."
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-black uppercase tracking-widest">SEO Açıklaması ({activeTab.toUpperCase()})</label>
                                                <textarea
                                                    value={activeTab === 'tr' ? formData.seoDescription : (formData as any)[`seoDescription_${activeTab}`]}
                                                    onChange={(e) => setFormData({ ...formData, [activeTab === 'tr' ? 'seoDescription' : `seoDescription_${activeTab}`]: e.target.value })}
                                                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[var(--primary)] text-sm font-bold h-24 resize-none text-black"
                                                    placeholder="Arama motoru açıklaması..."
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" checked={formData.active} onChange={e => setFormData({ ...formData, active: e.target.checked })} className="rounded text-[var(--primary)] focus:ring-[var(--primary)]" />
                                                <span className="text-sm font-bold text-black">Aktif</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" checked={formData.allowsTargeting} onChange={e => setFormData({ ...formData, allowsTargeting: e.target.checked })} className="rounded text-[var(--primary)] focus:ring-[var(--primary)]" />
                                                <span className="text-sm font-bold text-black">Duyuru Hedeflenebilir</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-black uppercase tracking-widest">Kapak Görseli</label>
                                            <div className="flex items-center gap-4">
                                                {formData.image && <img src={formData.image} className="w-20 h-20 rounded-xl object-cover border border-slate-200" alt="Preview" />}
                                                <label className="premium-btn py-2 px-4 text-xs cursor-pointer">
                                                    Görsel Yükle
                                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                                </label>
                                            </div>
                                        </div>
                                        <ImageSettingsControl settings={formData.imageSettings} onChange={(s) => setFormData({ ...formData, imageSettings: s })} label="Kapak Görsel Ayarları" />
                                    </div>
                                </div>

                                <div className="flex-1 px-8 pb-0 overflow-hidden flex flex-col min-h-[400px]">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-[10px] font-black text-black uppercase tracking-widest">İçerik Editörü ({activeTab.toUpperCase()})</label>
                                        <button type="button" onClick={() => setShowSource(!showSource)} className="text-[10px] font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-3 py-1 rounded-full uppercase">{showSource ? "Görsel Mod" : "HTML Kaynak"}</button>
                                    </div>
                                    <div className="flex-1 bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
                                        {showSource ? (
                                            <textarea
                                                value={activeTab === 'tr' ? formData.content : (formData as any)[`content_${activeTab}`]}
                                                onChange={(e) => setFormData({ ...formData, [activeTab === 'tr' ? 'content' : `content_${activeTab}`]: e.target.value })}
                                                className="w-full h-full p-4 bg-slate-50 text-black font-mono text-xs outline-none"
                                            />
                                        ) : (
                                            <ReactQuill
                                                theme="snow"
                                                value={activeTab === 'tr' ? formData.content : (formData as any)[`content_${activeTab}`]}
                                                onChange={(content) => setFormData({ ...formData, [activeTab === 'tr' ? 'content' : `content_${activeTab}`]: content })}
                                                modules={modules}
                                                className="h-full flex flex-col [&_.ql-toolbar]:border-0 [&_.ql-container]:border-0 [&_.ql-editor]:text-base prose-premium"
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
                                    <button type="button" onClick={() => setIsEditorOpen(false)} className="px-8 py-3 bg-[#0B1751] text-white rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-blue-900/10">Kapat</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ServicesManagement() {
    return (
        <Suspense fallback={<div>Yükleniyor...</div>}>
            <ServicesManagementContent />
        </Suspense>
    );
}
