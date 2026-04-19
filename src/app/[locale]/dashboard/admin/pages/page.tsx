"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Globe,
    Eye,
    EyeOff,
    FileText,
    ChevronRight,
    Layout,
    MoreVertical,
    ExternalLink,
    Filter,
    X,
    Save,
    AlertCircle,
    Code,
    Image as ImageIcon
} from "lucide-react";
import ImageSettingsControl, { ImageSettings, defaultImageSettings } from "@/components/admin/ImageSettingsControl";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import "react-quill-new/dist/quill.snow.css";

// Dynamic import for React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function PagesManagement() {
    const [pages, setPages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingPage, setEditingPage] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        image: "",
        imageSettings: defaultImageSettings,
        category: "Genel",
        published: false,
        seoTitle: "",
        seoDescription: "",
        keywords: ""
    });

    // Toggle between Rich Text and HTML Source
    const [showSource, setShowSource] = useState(false);
    const [activeTab, setActiveTab] = useState<"content" | "seo" | "settings">("content");

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/pages");
            if (res.ok) {
                const data = await res.json();
                setPages(data);
            }
        } catch (error) {
            console.error("Failed to fetch pages:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu sayfayı silmek istediğinize emin misiniz?")) return;
        try {
            const res = await fetch(`/api/admin/pages/${id}`, { method: "DELETE" });
            if (res.ok) {
                setPages(pages.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const openEditor = (page: any = null) => {
        if (page) {
            let settings = defaultImageSettings;
            try {
                if (page.imageSettings) {
                    const parsed = JSON.parse(page.imageSettings);
                    if (parsed) settings = parsed;
                }
            } catch (e) { console.error("Error parsing settings", e); }

            setEditingPage(page);
            setFormData({
                title: page.title,
                slug: page.slug,
                content: page.content,
                excerpt: page.excerpt || "",
                image: page.image || "",
                imageSettings: settings,
                category: page.category || "Genel",
                published: page.published,
                seoTitle: page.seoTitle || "",
                seoDescription: page.seoDescription || "",
                keywords: page.keywords || ""
            });
        } else {
            setEditingPage(null);
            setFormData({
                title: "",
                slug: "",
                content: "",
                excerpt: "",
                image: "",
                imageSettings: defaultImageSettings,
                category: "Genel",
                published: false,
                seoTitle: "",
                seoDescription: "",
                keywords: ""
            });
        }
        setShowSource(false); // Reset to visual mode on open
        setActiveTab("content");
        setIsEditorOpen(true);
    };

    // Slug Generation
    const generateSlug = (text: string) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word chars with -
            .replace(/^-+|-+$/g, '') // Remove leading/trailing -
            .split('-')
            .slice(0, 5) // Limit to 5 words
            .join('-');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            slug: prev.slug || generateSlug(title)
        }));
        // If "new page", auto update slug
        if (!editingPage) {
            setFormData(prev => ({ ...prev, title, slug: generateSlug(title) }));
        } else {
            setFormData(prev => ({ ...prev, title }));
        }
    };

    const handlePreview = () => {
        if (formData.slug) {
            window.open(`/pages/${formData.slug}?preview=true`, '_blank');
        } else {
            alert("Önizleme için önce başlık girmelisiniz.");
        }
    };

    // File Upload
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        const file = e.target.files[0];
        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: uploadData
            });

            if (res.ok) {
                const data = await res.json();
                setFormData({ ...formData, image: data.url });
            } else {
                alert("Dosya yüklenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Dosya yüklenirken bir hata oluştu.");
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingPage
            ? `/api/admin/pages/${editingPage.id}`
            : "/api/admin/pages";
        const method = editingPage ? "PATCH" : "POST";

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
                fetchPages();
            } else {
                const text = await res.text();
                alert(`Hata: ${text}`);
            }
        } catch (error) {
            console.error("Save failed:", error);
            alert("Bağlantı hatası.");
        }
    };

    const filteredPages = pages.filter(page =>
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Quill modules configuration
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[#0B1751] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                        <Layout size={12} />
                        İçerik Yönetim Merkezi
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-[#0B1751]">Sayfa Yönetimi</h1>
                    <p className="text-sm text-black font-medium mt-1">Sitedeki tüm statik ve dinamik içerik yapılarını kontrol edin.</p>
                </div>
                <button
                    onClick={() => openEditor()}
                    className="premium-btn group"
                >
                    <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                    Yeni Sayfa Oluştur
                </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 w-full bg-white p-1.5 flex items-center gap-3 border border-slate-200 rounded-2xl shadow-sm">
                    <div className="pl-4 text-slate-400">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Sayfa başlığı veya URL uzantısı ile ara..."
                        className="bg-transparent border-none outline-none w-full py-2.5 text-sm font-bold text-black placeholder:text-slate-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-slate-200 bg-white text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm text-slate-600">
                    <Filter size={14} />
                    Filtrele
                </button>
            </div>

            {/* Content Table */}
            <div className="bg-white overflow-hidden border border-slate-200 rounded-3xl shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.15em] text-black">Genel Bilgiler</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.15em] text-black">Kategori</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.15em] text-black">URL Yapısı</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.15em] text-black">Yayın Durumu</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.15em] text-black text-right">Yönetim</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 uppercase tracking-widest text-black">
                            <AnimatePresence mode="popLayout">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="p-20 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-10 h-10 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin" />
                                                <p className="text-xs font-bold text-[#0B1751] uppercase tracking-widest">İçerikler Yükleniyor</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredPages.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-20 text-center">
                                            <div className="flex flex-col items-center gap-2 opacity-40 text-slate-400">
                                                <FileText size={48} />
                                                <p className="font-bold">Sonuç bulunamadı</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredPages.map((page, index) => (
                                    <motion.tr
                                        key={page.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group hover:bg-slate-50 transition-all duration-300"
                                    >
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#DC2626] group-hover:scale-110 transition-transform duration-500 shadow-sm border border-slate-100">
                                                    <FileText size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-black leading-tight mb-0.5">{page.title}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                                        {new Date(page.createdAt).toLocaleDateString("tr-TR")}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-black bg-slate-100 px-2 py-1 rounded-md">
                                                {page.category || "Genel"}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-1.5 text-xs font-semibold text-black bg-slate-50 px-2.5 py-1.5 rounded-lg w-fit transition-all hover:bg-slate-100 border border-slate-100">
                                                <Globe size={12} className="opacity-50" />
                                                <span>/pages/{page.slug}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            {page.published ? (
                                                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full w-fit border border-emerald-100">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                                    Yayında
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full w-fit border border-slate-100">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                                    Taslak
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                    onClick={() => openEditor(page)}
                                                    className="p-2.5 hover:bg-slate-50 rounded-xl transition-all text-slate-400 hover:text-[#DC2626] border border-transparent hover:border-slate-100" title="Düzenle"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <Link href={`/pages/${page.slug}`} target="_blank" className="p-2.5 hover:bg-slate-50 rounded-xl transition-all text-slate-400 hover:text-blue-500 border border-transparent hover:border-slate-100" title="Görüntüle">
                                                    <ExternalLink size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(page.id)}
                                                    className="p-2.5 hover:bg-slate-50 rounded-xl transition-all text-slate-400 hover:text-red-500 border border-transparent hover:border-slate-100" title="Sil"
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

            {/* Page Editor Overlay */}
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
                            className="relative w-full max-w-6xl h-[95vh] bg-white flex flex-col shadow-2xl overflow-hidden rounded-3xl"
                        >
                            {/* Editor Header */}
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div>
                                    <h3 className="text-xl font-black tracking-tight text-black flex items-center gap-2">
                                        <FileText className="text-[#DC2626]" size={20} />
                                        {editingPage ? "Sayfayı Düzenle" : "Yeni Sayfa Oluştur"}
                                    </h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Gelişmiş İçerik Editörü</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setShowSource(!showSource)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide transition-all ${showSource
                                            ? "bg-[#DC2626] text-white shadow-lg"
                                            : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                                            }`}
                                    >
                                        <Code size={14} />
                                        {showSource ? "Görsel Mod" : "HTML Kaynak"}
                                    </button>
                                    <button
                                        onClick={() => setIsEditorOpen(false)}
                                        className="p-2 rounded-xl bg-white hover:bg-red-50 text-slate-400 hover:text-[#DC2626] transition-all shadow-sm border border-slate-100"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Editor Body */}
                            <form onSubmit={handleSave} className="flex-1 flex flex-col overflow-hidden">
                                <div className="px-8 border-b border-slate-100 flex items-center gap-8 bg-white shrink-0">
                                    {(["content", "seo", "settings"] as const).map((tab) => (
                                        <button
                                            key={tab}
                                            type="button"
                                            onClick={() => setActiveTab(tab)}
                                            className={`py-4 px-2 text-[10px] font-black uppercase tracking-[0.2em] relative transition-all ${activeTab === tab
                                                ? "text-[#DC2626]"
                                                : "text-slate-400 hover:text-slate-600"
                                                }`}
                                        >
                                            {tab === "content" ? "Ana İçerik" : tab === "seo" ? "SEO & Meta" : "Ayarlar & Görsel"}
                                            {activeTab === tab && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#DC2626] rounded-t-full"
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex-1 overflow-y-auto p-8">
                                    <div className="max-w-4xl mx-auto space-y-10">
                                        {/* TAB 1: CONTENT */}
                                        {activeTab === "content" && (
                                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sayfa Başlığı</label>
                                                        <input
                                                            required
                                                            type="text"
                                                            value={formData.title}
                                                            onChange={handleTitleChange}
                                                            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black transition-all shadow-inner"
                                                            placeholder="Örn: Hakkımızda"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kategori</label>
                                                        <select
                                                            value={formData.category}
                                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black transition-all shadow-inner"
                                                        >
                                                            <option value="Genel">Genel</option>
                                                            <option value="Kurumsal">Kurumsal</option>
                                                            <option value="Hizmetler">Hizmetler</option>
                                                            <option value="Kariyer">Kariyer</option>
                                                            <option value="Yardım">Yardım</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Özet (Kısa Açıklama)</label>
                                                    <textarea
                                                        value={formData.excerpt}
                                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                                        rows={2}
                                                        className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black transition-all shadow-inner resize-none"
                                                        placeholder="Sayfa hakkında kısa bir özet girişi..."
                                                    />
                                                </div>

                                                <div className="space-y-2 flex-1 min-h-[400px]">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex justify-between items-center">
                                                        <span>Ana İçerik</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowSource(!showSource)}
                                                            className="text-[9px] bg-slate-50 text-slate-600 px-3 py-1 rounded-full font-black hover:bg-slate-100 transition-all border border-slate-200"
                                                        >
                                                            {showSource ? "GÖRSEL MODA DÖN" : "HTML KAYNAĞINI GÖR"}
                                                        </button>
                                                    </label>
                                                    <div className="h-[500px] bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-inner flex flex-col">
                                                        {showSource ? (
                                                            <textarea
                                                                required
                                                                value={formData.content}
                                                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                                                className="w-full h-full p-6 outline-none bg-slate-900 text-emerald-400 font-mono text-xs resize-none"
                                                                spellCheck="false"
                                                            />
                                                        ) : (
                                                            <ReactQuill
                                                                theme="snow"
                                                                value={formData.content}
                                                                onChange={(content) => setFormData({ ...formData, content })}
                                                                modules={modules}
                                                                className="h-full flex flex-col [&_.ql-toolbar]:border-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-slate-100 [&_.ql-container]:border-0 [&_.ql-editor]:p-8 [&_.ql-editor]:text-black"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* TAB 2: SEO */}
                                        {activeTab === "seo" && (
                                            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl flex gap-4">
                                                    <AlertCircle className="text-blue-500 shrink-0" size={24} />
                                                    <div>
                                                        <h4 className="text-sm font-black text-blue-900 uppercase tracking-tight mb-1">SEO Optimizasyonu</h4>
                                                        <p className="text-xs text-blue-700/80 leading-relaxed font-bold">Arama motorlarında daha görünür olmak için bu alanları doğru anahtar kelimelerle doldurun.</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">SEO Başlığı (Meta Title)</label>
                                                        <input
                                                            type="text"
                                                            value={formData.seoTitle}
                                                            onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                                                            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black transition-all shadow-inner"
                                                            placeholder="Google'da görünecek başlık..."
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">SEO Açıklaması (Meta Description)</label>
                                                        <textarea
                                                            value={formData.seoDescription}
                                                            onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                                                            rows={3}
                                                            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black transition-all shadow-inner resize-none"
                                                            placeholder="Arama sonuçlarında görünecek açıklama metni..."
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Anahtar Kelimeler (Keywords)</label>
                                                        <input
                                                            type="text"
                                                            value={formData.keywords}
                                                            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                                                            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black transition-all shadow-inner"
                                                            placeholder="edu, yurtdışı, danışmanlık (virgül ile ayırın)"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* TAB 3: SETTINGS & IMAGE */}
                                        {activeTab === "settings" && (
                                            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                                    <div className="space-y-6">
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">URL Uzantısı (Slug)</label>
                                                            <div className="relative">
                                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold font-mono">/pages/</span>
                                                                <input
                                                                    required
                                                                    type="text"
                                                                    value={formData.slug}
                                                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                                                    className="w-full bg-slate-50 border border-slate-200 p-4 pl-20 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold font-mono shadow-inner text-black"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 space-y-6 shadow-md">
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <h4 className="text-sm font-black text-black uppercase tracking-tight">Erişim & Yayın</h4>
                                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Yayınlama durumunu belirleyin.</p>
                                                                </div>
                                                                <div className="relative inline-flex items-center cursor-pointer group">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="sr-only"
                                                                        checked={formData.published}
                                                                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                                                    />
                                                                    <div className={`w-14 h-7 rounded-full transition-all ${formData.published ? "bg-emerald-500 shadow-lg shadow-emerald-500/30" : "bg-slate-200 shadow-inner"}`} />
                                                                    <div className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all ${formData.published ? "translate-x-7" : ""}`} />
                                                                </div>
                                                            </div>
                                                            {formData.published && (
                                                                <div className="flex items-center gap-2 text-[9px] font-black text-emerald-600 uppercase bg-emerald-100/50 px-3 py-1.5 rounded-full animate-pulse">
                                                                    <Globe size={10} /> Sitede ŞU AN aktif
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-6">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kapak Görseli</label>
                                                        <div className="relative group aspect-video rounded-3xl overflow-hidden border-2 border-dashed border-slate-200 hover:border-[#DC2626] transition-all bg-slate-50">
                                                            {formData.image ? (
                                                                <>
                                                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                                                                        <label className="p-3 bg-white rounded-full text-slate-900 cursor-pointer hover:scale-110 transition-transform">
                                                                            <ImageIcon size={20} />
                                                                            <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                                                                        </label>
                                                                        <button type="button" onClick={() => setFormData({ ...formData, image: "" })} className="p-3 bg-red-500 rounded-full text-white hover:scale-110 transition-transform">
                                                                            <Trash2 size={20} />
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                                                                    <Plus size={32} className="text-slate-300 mb-2 group-hover:text-[#DC2626] transition-colors" />
                                                                    <span className="text-[10px] font-black text-black uppercase tracking-widest">Hemen Yayınla</span>
                                                                    <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                                                                </label>
                                                            )}
                                                        </div>
                                                        {formData.image && (
                                                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                                                <ImageSettingsControl
                                                                    settings={formData.imageSettings}
                                                                    onChange={(s) => setFormData({ ...formData, imageSettings: s })}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="p-8 border-t border-slate-100 bg-white flex justify-end gap-4 shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditorOpen(false)}
                                        className="px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-600 transition-all font-bold"
                                    >
                                        İPTAL
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handlePreview}
                                        className="px-8 py-4 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-[#0B1751] hover:bg-slate-50 transition-all flex items-center gap-2"
                                    >
                                        <Eye size={14} /> ÖNİZLEME
                                    </button>
                                    <button
                                        type="submit"
                                        className="premium-btn px-12 py-4 flex items-center gap-3 shadow-xl"
                                    >
                                        <Save size={18} />
                                        DEĞİŞİKLİKLERİ KAYDET
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Quick Status Bar */}
            <div className="flex items-center gap-6 px-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    {pages.filter(p => p.published).length} Yayınlanmış
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-slate-200" />
                    {pages.filter(p => !p.published).length} Taslak
                </div>
            </div>
        </div>
    );
}
