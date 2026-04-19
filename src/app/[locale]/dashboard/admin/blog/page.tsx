"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    FileText,
    Image as ImageIcon,
    Calendar,
    User,
    CheckCircle2,
    Clock,
    LayoutGrid,
    List,
    X,
    Save,
    Code,
    ExternalLink,
    Zap,
    Copy
} from "lucide-react";
import ImageSettingsControl, { defaultImageSettings } from "@/components/admin/ImageSettingsControl";
import BlogSEOPanel from "@/components/admin/BlogSEOPanel";
import "react-quill-new/dist/quill.snow.css";
import Link from "next/link";

// Dynamic import for React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

function BlogManagementContent() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");

    // Editor State
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<any>(null);
    const [showSource, setShowSource] = useState(false);
    const [showSEO, setShowSEO] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        image: "",
        imageSettings: defaultImageSettings,
        category: "Genel",
        published: false
    });

    useEffect(() => {
        if (searchParams?.get('add') === 'true') {
            openEditor();
        }
    }, [searchParams]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/blog");
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu içeriği silmek istediğinize emin misiniz?")) return;
        try {
            const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
            if (res.ok) {
                setPosts(posts.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const openEditor = (post: any = null) => {
        if (post) {
            let settings = defaultImageSettings;
            try {
                if (post.imageSettings) {
                    const parsed = JSON.parse(post.imageSettings);
                    if (parsed) settings = parsed;
                }
            } catch (e) { console.error("Error parsing settings", e); }

            setEditingPost(post);
            setFormData({
                title: post.title,
                slug: post.slug,
                content: post.content,
                image: post.image || "",
                imageSettings: settings,
                category: post.category || "Genel",
                published: post.published
            });
        } else {
            setEditingPost(null);
            setFormData({
                title: "",
                slug: "",
                content: "",
                image: "",
                imageSettings: defaultImageSettings,
                category: "Genel",
                published: false
            });
        }
        setShowSource(false);
        setShowSEO(false);
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
            slug: prev.slug || generateSlug(title) // Only auto-generate if slug is empty or we want to force it? Let's auto-gen if user hasn't manually edited slug? 
            // Actually simpler: just auto-gen if not in edit mode or if desired. 
            // User requirement: "slug basliklan otomatik alinmali"
        }));
        // If we want to strictly follow "auto take from title", we can do this:
        if (!editingPost) {
            setFormData(prev => ({ ...prev, title, slug: generateSlug(title) }));
        } else {
            setFormData(prev => ({ ...prev, title }));
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

    const handlePreview = () => {
        // Create a temporary preview by saving to local storage or just passing data?
        // Since we need a public URL, we might need to save as draft first.
        // Let's assume we save as draft (published: false) then open.
        if (formData.slug) {
            window.open(`/blog/${formData.slug}?preview=true`, '_blank');
        } else {
            alert("Önizleme için önce başlık girmelisiniz.");
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingPost
            ? `/api/admin/blog/${editingPost.id}`
            : "/api/admin/blog";
        const method = editingPost ? "PATCH" : "POST";

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
                fetchPosts();
            } else {
                const text = await res.text();
                // Check for 500 error specifically
                if (res.status === 500) {
                    alert("Sunucu hatası oluştu (500). Lütfen sistem yöneticisine başvurun.");
                } else {
                    alert(`Hata: ${text}`);
                }
            }
        } catch (error) {
            console.error("Save failed:", error);
            alert("Bağlantı hatası oluştu.");
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusStyles = (active: boolean) => {
        return active
            ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border-emerald-100 dark:border-emerald-900/20"
            : "bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-100 dark:border-slate-800";
    };

    // Quill modules
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
        <div className="space-y-10 pb-12">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
                <div>
                    <div className="flex items-center gap-2 text-[#0B1751] font-bold text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">
                        <FileText size={12} />
                        İçerik Strateji Merkezi
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-[#0B1751]">Haberler & Blog</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm text-[#DC2626]" : "text-slate-600"}`}
                        >
                            <List size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-[#DC2626]" : "text-slate-600"}`}
                        >
                            <LayoutGrid size={18} />
                        </button>
                    </div>
                    <button
                        onClick={() => openEditor()}
                        className="premium-btn flex items-center gap-2 px-6 py-3 shadow-xl"
                    >
                        <Plus size={18} />
                        <span className="text-[10px] font-black tracking-widest uppercase">YENİ İÇERİK</span>
                    </button>
                </div>
            </div>

            {/* Content Stats / Quick Filter */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Toplam İçerik", val: posts.length, icon: FileText, color: "text-blue-500" },
                    { label: "Yayında", val: posts.filter(p => p.published).length, icon: CheckCircle2, color: "text-emerald-500" },
                    { label: "Taslak", val: posts.filter(p => !p.published).length, icon: Clock, color: "text-amber-500" },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between group"
                    >
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h4 className="text-2xl font-black tracking-tighter text-[#0B1751]">{stat.val}</h4>
                        </div>
                        <div className={`p-4 rounded-2xl bg-slate-50 ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                            <stat.icon size={22} />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Search & Bulk Actions */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#DC2626] transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="İçerik başlığı veya kategori ara..."
                        className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-3 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold transition-all text-black placeholder:text-slate-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Posts Content */}
            <div className="space-y-4">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <div className="bg-white p-20 rounded-3xl border border-slate-200 text-center animate-pulse">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-10 h-10 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin" />
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">İçerikler Yükleniyor</p>
                            </div>
                        </div>
                    ) : viewMode === "list" ? (
                        <motion.div
                            key="list-view"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-white overflow-hidden rounded-3xl border border-slate-200 shadow-sm"
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-100 font-bold">
                                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">İçerik</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Yazar</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tarih</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Durum</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksiyon</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {filteredPosts.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="p-20 text-center">
                                                    <div className="flex flex-col items-center gap-2 opacity-40">
                                                        <FileText size={48} className="text-[#0B1751]" />
                                                        <p className="font-black text-[#0B1751] uppercase tracking-widest text-xs">Sonuç bulunamadı</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : filteredPosts.map((post, i) => (
                                            <motion.tr
                                                key={post.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="group hover:bg-slate-50 transition-colors"
                                            >
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-[#DC2626] shrink-0 group-hover:scale-110 transition-transform shadow-inner overflow-hidden border border-slate-200">
                                                            {post.image ? (
                                                                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <ImageIcon size={20} />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-black group-hover:text-[#DC2626] transition-colors leading-tight mb-1">
                                                                {post.title}
                                                            </p>
                                                            <span className="text-[10px] font-black text-white px-2 py-0.5 rounded-md bg-[#DC2626] uppercase tracking-tighter">
                                                                {post.category || "Genel"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-black text-[#0B1751]">
                                                            {post.author?.name?.charAt(0) || "A"}
                                                        </div>
                                                        <span className="text-xs font-bold text-black">{post.author?.name || "Admin"}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-xs font-bold text-slate-500">
                                                    {new Date(post.createdAt).toLocaleDateString("tr-TR")}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${getStatusStyles(post.published).split(' dark:')[0]}`}>
                                                        {post.published ? "Yayında" : "Taslak"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link href={`/${post.slug}`} target="_blank" className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-500 transition-colors border border-slate-100">
                                                            <Eye size={16} />
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                const { id, createdAt, updatedAt, ...copyData } = post;
                                                                openEditor(null);
                                                                setTimeout(() => {
                                                                    setEditingPost(null);
                                                                    setFormData({
                                                                        ...copyData,
                                                                        title: `${post.title} (Kopya)`,
                                                                        slug: `${post.slug}-kopya`,
                                                                        imageSettings: post.imageSettings ? JSON.parse(post.imageSettings) : defaultImageSettings,
                                                                        published: false
                                                                    });
                                                                    setIsEditorOpen(true);
                                                                }, 50);
                                                            }}
                                                            className="p-2 rounded-lg bg-slate-50 text-blue-400 hover:text-blue-500 transition-colors border border-slate-100"
                                                            title="Kopyala"
                                                        >
                                                            <Copy size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => openEditor(post)}
                                                            className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-emerald-500 transition-colors border border-slate-100"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(post.id)}
                                                            className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-rose-500 transition-colors border border-slate-100"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid-view"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredPosts.map((post, i) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm group hover:border-[#DC2626] transition-all cursor-pointer"
                                    onClick={() => openEditor(post)}
                                >
                                    <div className="aspect-video w-full rounded-2xl bg-slate-50 mb-6 flex items-center justify-center text-slate-300 relative overflow-hidden border border-slate-100 shadow-inner">
                                        {post.image ? (
                                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        ) : (
                                            <ImageIcon size={40} />
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-2 py-1 rounded-lg bg-white/90 text-[10px] font-black text-[#0B1751] uppercase shadow-sm border border-slate-100">
                                                {post.category || "Genel"}
                                            </span>
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-black tracking-tighter text-black group-hover:text-[#DC2626] transition-colors mb-4 line-clamp-2">
                                        {post.title}
                                    </h4>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                        <div className="flex items-center gap-2">
                                            <User size={12} className="text-slate-400" />
                                            <span className="text-[10px] font-black text-black uppercase tracking-widest">{post.author?.name || "Admin"}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={12} className="text-slate-400" />
                                            <span className="text-[10px] font-black text-black uppercase tracking-widest">{new Date(post.createdAt).toLocaleDateString("tr-TR")}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
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
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-6xl h-[95vh] bg-white flex flex-col shadow-2xl overflow-hidden rounded-[40px] border border-slate-200"
                        >
                            {/* Editor Header */}
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white">
                                <div>
                                    <h3 className="text-2xl font-black tracking-tight text-black flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-[#DC2626]">
                                            <FileText size={20} />
                                        </div>
                                        {editingPost ? "İçeriği Düzenle" : "Yeni İçerik Oluştur"}
                                    </h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 ml-14">Blog Yazısı & Haber Editörü</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button 
                                        type="button" 
                                        onClick={handleSave} 
                                        className="flex items-center gap-2 px-8 py-3 bg-[#0B1751] text-white rounded-[20px] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/10 hover:scale-[1.02] active:scale-95 transition-all"
                                    >
                                        <Save size={16} />
                                        Kaydet
                                    </button>
                                    <button
                                        onClick={() => setShowSource(!showSource)}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${showSource
                                            ? "bg-[#0B1751] text-white shadow-lg"
                                            : "bg-slate-100 text-[#0B1751] hover:bg-slate-200 border border-slate-200"
                                            }`}
                                    >
                                        <Code size={14} />
                                        {showSource ? "GÖRSEL MOD" : "HTML KAYNAK"}
                                    </button>
                                    <button
                                        onClick={() => setShowSEO(!showSEO)}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${showSEO
                                            ? "bg-amber-500 text-white shadow-lg"
                                            : "bg-slate-100 text-amber-600 hover:bg-slate-200 border border-slate-200"
                                            }`}
                                    >
                                        <Zap size={14} />
                                        {showSEO ? "SEO KAPAT" : "SEO ANALİZİ"}
                                    </button>
                                    <button
                                        onClick={() => setIsEditorOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-100 transition-all ml-2"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Editor Body */}
                            <form onSubmit={handleSave} className="flex-1 flex flex-col min-h-0 bg-slate-50/30">
                                <div className="flex-1 overflow-y-auto custom-scrollbar">
                                    <div className="p-10 pb-4 grid grid-cols-1 md:grid-cols-2 gap-10 shrink-0">
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest ml-1">İçerik Başlığı</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.title}
                                                    onChange={handleTitleChange}
                                                    className="w-full bg-white border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black transition-all shadow-sm placeholder:text-slate-300"
                                                    placeholder="Örn: Yurt Dışı Eğitim Rehberi"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest ml-1">Kategori</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.category}
                                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                    className="w-full bg-white border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black transition-all shadow-sm placeholder:text-slate-300"
                                                    placeholder="Örn: Rehber, Haberler, Etkinlik"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest ml-1">URL Uzantısı (Slug)</label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-black uppercase tracking-widest">/blog/</span>
                                                    <input
                                                        required
                                                        type="text"
                                                        value={formData.slug}
                                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                                        className="w-full bg-white border border-slate-200 p-4 pl-[72px] rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black transition-all shadow-sm placeholder:text-slate-300"
                                                        placeholder="otomatik-olusturulacak"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest ml-1">Kapak Görseli</label>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={formData.image}
                                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                        className="flex-1 bg-white border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black transition-all shadow-sm placeholder:text-slate-300"
                                                        placeholder="URL veya dosya yükle..."
                                                    />
                                                    <label className="cursor-pointer w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center hover:bg-slate-200 transition-colors border border-slate-200 shrink-0">
                                                        <ImageIcon size={20} className="text-[#0B1751]" />
                                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                                    </label>
                                                </div>
                                            </div>

                                            <ImageSettingsControl
                                                settings={formData.imageSettings}
                                                onChange={(settings) => setFormData({ ...formData, imageSettings: settings })}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex-1 px-10 pb-10 min-h-[400px] overflow-hidden">
                                        <div className="space-y-2 h-full flex flex-col">
                                            <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest ml-1 flex justify-between items-center bg-white p-4 rounded-t-3xl border border-slate-200">
                                                <span className="flex items-center gap-2 italic">
                                                    {showSource ? <Code size={14} className="text-amber-500" /> : <FileText size={14} className="text-[#DC2626]" />}
                                                    İçerik Editörü {showSource ? "(HTML)" : "(Görsel)"}
                                                </span>
                                                {showSource && <span className="text-[8px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-black animate-pulse">HTML AKTİF</span>}
                                            </label>

                                            <div className="flex-1 bg-white rounded-b-3xl overflow-hidden border-x border-b border-slate-200 shadow-xl flex flex-col relative min-h-[500px]">
                                                {showSource ? (
                                                    <textarea
                                                        required
                                                        value={formData.content}
                                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                                        className="w-full h-full p-8 outline-none bg-slate-950 text-emerald-400 font-mono text-sm resize-none selection:bg-emerald-500/20"
                                                        spellCheck="false"
                                                        placeholder="<html>...</html>"
                                                    />
                                                ) : (
                                                    <div className="h-full flex flex-col">
                                                        <ReactQuill
                                                            theme="snow"
                                                            value={formData.content}
                                                            onChange={(content) => setFormData({ ...formData, content })}
                                                            modules={modules}
                                                            className="h-full flex flex-col [&_.ql-toolbar]:border-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-slate-100 [&_.ql-toolbar]:bg-slate-50/50 [&_.ql-container]:border-0 [&_.ql-container]:font-sans [&_.ql-editor]:text-base [&_.ql-editor]:text-black [&_.ql-editor]:leading-relaxed [&_.ql-editor]:p-8 [&_.ql-editor]:min-h-[400px] prose-premium"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <AnimatePresence>
                                            {showSEO && (
                                                <motion.div
                                                    initial={{ x: 320 }}
                                                    animate={{ x: 0 }}
                                                    exit={{ x: 320 }}
                                                    className="absolute right-0 top-0 bottom-0 z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.1)]"
                                                >
                                                    <BlogSEOPanel 
                                                        title={formData.title}
                                                        content={formData.content}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="p-8 border-t border-slate-100 bg-white flex items-center justify-between shrink-0">
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only"
                                                    checked={formData.published}
                                                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                                />
                                                <div className={`w-12 h-6 rounded-full transition-all ${formData.published ? "bg-emerald-500" : "bg-slate-300"}`} />
                                                <div className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${formData.published ? "translate-x-6" : ""}`} />
                                            </div>
                                            <span className="text-[10px] font-black text-black uppercase tracking-widest">Hemen Yayınla</span>
                                        </label>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={handlePreview}
                                            className="px-6 py-4 rounded-2xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-[#0B1751] hover:bg-slate-50 transition-all flex items-center gap-2"
                                        >
                                            <Eye size={16} />
                                            ÖNİZLEME
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditorOpen(false)}
                                            className="px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all"
                                        >
                                            İPTAL
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-10 py-4 bg-[#0B1751] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                                        >
                                            <Save size={18} />
                                            DEĞİŞİKLİKLERİ KAYDET
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function BlogManagement() {
    return (
        <Suspense fallback={<div>Yükleniyor...</div>}>
            <BlogManagementContent />
        </Suspense>
    );
}
