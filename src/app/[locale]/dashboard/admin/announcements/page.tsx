"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import {
    Megaphone,
    Plus,
    Trash2,
    Users,
    GraduationCap,
    Briefcase,
    Globe,
    Calendar,
    Bell,
    ChevronRight,
    Search,
    Filter,
    ArrowRight,
    UserCheck,
    Building2,
    Layers,
    X,
    Save,
    Code,
    Copy
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnnouncementSettingsControl, { defaultAnnouncementSettings, AnnouncementSettings } from "@/components/admin/AnnouncementSettingsControl";

// Dynamic import for React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

function AnnouncementsManagementContent() {
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [showSource, setShowSource] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        targetRole: "ALL", // "ALL", "STUDENT", "ADVISOR", etc.
        active: true,
        styleSettings: defaultAnnouncementSettings,
        link: ""
    });

    useEffect(() => {
        if (searchParams?.get('add') === 'true') {
            openEditor();
        }
    }, [searchParams]);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/announcements");
            if (res.ok) {
                const data = await res.json();
                setAnnouncements(data);
            }
        } catch (error) {
            console.error("Failed to fetch", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingItem
            ? `/api/admin/announcements/${editingItem.id}`
            : "/api/admin/announcements";
        const method = editingItem ? "PATCH" : "POST";

        try {
            const bodyData = {
                ...formData,
                target: formData.targetRole === "ALL" ? null : formData.targetRole,
                targetPages: formData.styleSettings.targetPages,
                styleSettings: formData.styleSettings
            };

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData)
            });

            if (res.ok) {
                setIsEditorOpen(false);
                fetchAnnouncements();
            } else {
                alert("Kaydetme başarısız.");
            }
        } catch (error) {
            console.error(error);
            alert("Hata oluştu.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Silmek istediğinize emin misiniz?")) return;
        try {
            await fetch(`/api/admin/announcements/${id}`, { method: "DELETE" });
            setAnnouncements(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const openEditor = (item: any = null) => {
        setShowSource(false);
        if (item) {
            let settings = defaultAnnouncementSettings;
            try {
                if (item.styleSettings) {
                    const parsed = typeof item.styleSettings === 'string' ? JSON.parse(item.styleSettings) : item.styleSettings;
                    if (parsed) settings = parsed;
                }
                if (item.targetPages) {
                    const pages = typeof item.targetPages === 'string' ? JSON.parse(item.targetPages) : item.targetPages;
                    settings = { ...settings, targetPages: pages };
                }
            } catch (e) {
                console.error("Parse error", e);
            }

            setEditingItem(item);
            setFormData({
                title: item.title,
                content: item.content,
                targetRole: item.target || "ALL",
                active: item.active,
                styleSettings: settings,
                link: item.link || ""
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: "",
                content: "",
                targetRole: "ALL",
                active: true,
                styleSettings: defaultAnnouncementSettings,
                link: ""
            });
        }
        setIsEditorOpen(true);
    };

    const getRoleIcon = (role: string | null) => {
        switch (role) {
            case 'STUDENT': return <GraduationCap size={12} />;
            case 'ADVISOR': return <UserCheck size={12} />;
            case 'AGENCY_MANAGER': return <Building2 size={12} />;
            default: return <Users size={12} />;
        }
    };

    const getRoleLabel = (role: string | null) => {
        if (!role) return "Tüm Roller";
        switch (role) {
            case 'STUDENT': return "Öğrenciler";
            case 'ADVISOR': return "Danışmanlar";
            case 'AGENCY_MANAGER': return "Acenteler";
            default: return role;
        }
    };

    const quillModules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
        ],
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[#0B1751] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                        <Megaphone size={12} />
                        İç İletişim & Duyuru Merkezi
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-[#0B1751]">Duyuru Yönetimi</h1>
                    <p className="text-sm text-slate-700 font-medium mt-1">Kullanıcı segmentlerine özel anlık bildirimler ve genel duyurular yayınlayın.</p>
                </div>
                <button
                    onClick={() => openEditor()}
                    className="premium-btn group"
                >
                    <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                    Yeni Duyuru Yayınla
                </button>
            </div>

            {/* Content List */}
            <div className="grid grid-cols-1 gap-4">
                <AnimatePresence mode="popLayout">
                    {loading ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="glass-card h-32 animate-pulse border-white/40" />
                        ))
                    ) : (
                        announcements.map((announcement, index) => (
                            <motion.div
                                key={announcement.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white group p-6 flex flex-col md:flex-row md:items-center gap-6 border border-slate-200 rounded-3xl hover:shadow-xl transition-all duration-500"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center relative shadow-sm ${announcement.active
                                    ? "bg-blue-50 text-blue-600"
                                    : "bg-slate-50 text-slate-400"
                                    }`}>
                                    <Bell size={24} className={announcement.active ? "animate-bounce-slow" : ""} />
                                    {announcement.active && (
                                        <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <h3 className="font-black text-[#0B1751] tracking-tight">{announcement.title}</h3>
                                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${announcement.active
                                            ? "bg-blue-50 text-blue-600"
                                            : "bg-slate-100 text-slate-500"
                                            }`}>
                                            {getRoleIcon(announcement.target)}
                                            {getRoleLabel(announcement.target)}
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                            <Calendar size={12} className="opacity-50" /> {new Date(announcement.createdAt).toLocaleDateString("tr-TR")}
                                        </span>
                                    </div>
                                    <div
                                        className="text-sm text-slate-600 leading-relaxed max-w-3xl line-clamp-2 md:line-clamp-1 prose-premium prose-sm"
                                        dangerouslySetInnerHTML={{ __html: announcement.content }}
                                    ></div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            const { id, createdAt, updatedAt, ...copyData } = announcement;
                                            openEditor(null);
                                            setTimeout(() => {
                                                setEditingItem(null);
                                                setFormData({
                                                    ...copyData,
                                                    title: `${announcement.title} (Kopya)`,
                                                    targetRole: announcement.target || "ALL",
                                                    styleSettings: announcement.styleSettings ? (typeof announcement.styleSettings === 'string' ? JSON.parse(announcement.styleSettings) : announcement.styleSettings) : defaultAnnouncementSettings,
                                                });
                                                setIsEditorOpen(true);
                                            }, 50);
                                        }}
                                        className="p-3 hover:bg-slate-50 rounded-xl transition-all text-blue-400 hover:text-blue-500 hover:shadow-md border border-transparent hover:border-slate-100"
                                        title="Kopyala"
                                    >
                                        <Copy size={20} />
                                    </button>
                                    <button
                                        onClick={() => openEditor(announcement)}
                                        className="p-3 hover:bg-slate-50 rounded-xl transition-all text-slate-400 hover:text-blue-500 hover:shadow-md border border-transparent hover:border-slate-100" title="Düzenle">
                                        <ArrowRight size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(announcement.id)}
                                        className="p-3 hover:bg-slate-50 rounded-xl transition-all text-slate-400 hover:text-red-500 hover:shadow-md border border-transparent hover:border-slate-100" title="Duyuruyu Sil">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Editor Modal */}
            <AnimatePresence>
                {isEditorOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
                            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-lg font-black text-black">
                                    {editingItem ? "Duyuruyu Düzenle" : "Yeni Duyuru Oluştur"}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <button 
                                        type="button" 
                                        onClick={handleSave} 
                                        className="flex items-center gap-2 px-6 py-2 bg-[#0B1751] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-blue-900/10"
                                    >
                                        <Save size={14} />
                                        Kaydet
                                    </button>
                                    <button
                                        onClick={() => setShowSource(!showSource)}
                                        className={`p-2 rounded-xl transition-all ${showSource ? "bg-[#DC2626] text-white" : "hover:bg-slate-100 text-slate-400"}`}
                                        title="Kaynağı Göster"
                                    >
                                        <Code size={20} />
                                    </button>
                                    <button onClick={() => setIsEditorOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400">
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSave} className="p-8 overflow-y-auto space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-black uppercase">Duyuru Başlığı</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-black placeholder:text-slate-400"
                                        placeholder="Örn: Sistem Güncellemesi"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-black uppercase">Duyuru Metni</label>
                                    {showSource ? (
                                        <textarea
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm font-mono h-[300px] resize-none focus:border-[var(--primary)] outline-none text-black"
                                        />
                                    ) : (
                                        <div className="prose-premium prose-sm">
                                            <ReactQuill
                                                theme="snow"
                                                value={formData.content}
                                                onChange={(content) => setFormData({ ...formData, content })}
                                                modules={quillModules}
                                                className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-black uppercase">Hedef Kitle</label>
                                        <select
                                            value={formData.targetRole}
                                            onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-black"
                                        >
                                            <option value="ALL">Herkese Açık</option>
                                            <option value="STUDENT">Öğrenciler</option>
                                            <option value="ADVISOR">Danışmanlar</option>
                                            <option value="AGENCY_MANAGER">Acenteler</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-black uppercase">Yönlendirme Linki (Opsiyonel)</label>
                                        <input
                                            type="text"
                                            value={formData.link}
                                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-black placeholder:text-slate-400"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                <AnnouncementSettingsControl
                                    settings={formData.styleSettings}
                                    onChange={(newSettings) => setFormData({ ...formData, styleSettings: newSettings })}
                                />

                                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                                    <input
                                        type="checkbox"
                                        checked={formData.active}
                                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                        className="w-5 h-5 rounded border-gray-300 text-[#DC2626] focus:ring-[#DC2626]"
                                    />
                                    <label className="text-sm font-bold text-black">Bu duyuruyu aktif et</label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full premium-btn py-4 flex items-center justify-center gap-2 mt-4"
                                >
                                    <Save size={18} />
                                    KAYDET
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function AnnouncementsManagement() {
    return (
        <Suspense fallback={<div>Yükleniyor...</div>}>
            <AnnouncementsManagementContent />
        </Suspense>
    );
}
