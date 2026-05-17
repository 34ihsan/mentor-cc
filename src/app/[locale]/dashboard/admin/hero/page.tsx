"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
    Image as ImageIcon,
    Plus,
    Trash2,
    Edit2,
    MoveUp,
    MoveDown,
    Layout,
    ExternalLink,
    CheckCircle2,
    XCircle,
    ArrowUp,
    ArrowDown,
    Link as LinkIcon,
    Maximize2,
    Save,
    X,
    Copy
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ImageSettingsControl, { defaultImageSettings, ImageSettings } from "@/components/admin/ImageSettingsControl";

function HeroManagementContent() {
    const [slides, setSlides] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingSlide, setEditingSlide] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: "",
        title_en: "",
        title_de: "",
        subtitle: "",
        subtitle_en: "",
        subtitle_de: "",
        imageUrl: "",
        link: "",
        pageContext: "home",
        order: 0,
        active: true,
        imageSettings: defaultImageSettings
    });

    const [countries, setCountries] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);

    useEffect(() => {
        if (searchParams?.get('add') === 'true') {
            openEditor();
        }
    }, [searchParams]);

    useEffect(() => {
        fetchSlides();
        fetchCountries();
        fetchServices();
    }, []);

    const fetchCountries = async () => {
        const res = await fetch("/api/admin/countries");
        if (res.ok) setCountries(await res.json());
    };

    const fetchServices = async () => {
        const res = await fetch("/api/admin/services");
        if (res.ok) setServices(await res.json());
    };

    const fetchSlides = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/hero");
            if (res.ok) {
                const data = await res.json();
                setSlides(data);
            }
        } catch (error) {
            console.error("Failed to fetch slides:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingSlide
            ? `/api/admin/hero/${editingSlide.id}`
            : "/api/admin/hero";
        const method = editingSlide ? "PATCH" : "POST";

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
                fetchSlides();
            } else {
                alert("Kaydedilirken hata oluştu");
            }
        } catch (error) {
            console.error("Save failed:", error);
            alert("Bağlantı hatası");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu slide'ı silmek istediğinize emin misiniz?")) return;
        try {
            await fetch(`/api/admin/hero/${id}`, { method: "DELETE" });
            setSlides(slides.filter(s => s.id !== id));
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const openEditor = (slide: any = null) => {
        if (slide) {
            let settings = defaultImageSettings;
            try {
                if (slide.imageSettings) {
                    const parsed = JSON.parse(slide.imageSettings);
                    if (parsed) settings = parsed;
                }
            } catch (e) {
                console.error("Error parsing settings", e);
            }

            setEditingSlide(slide);
            setFormData({
                title: slide.title || "",
                title_en: slide.title_en || "",
                title_de: slide.title_de || "",
                subtitle: slide.subtitle || "",
                subtitle_en: slide.subtitle_en || "",
                subtitle_de: slide.subtitle_de || "",
                imageUrl: slide.imageUrl || "",
                link: slide.link || "",
                pageContext: slide.pageContext || "home",
                order: slide.order || 0,
                active: slide.active,
                imageSettings: settings
            });
        } else {
            setEditingSlide(null);
            setFormData({
                title: "",
                title_en: "",
                title_de: "",
                subtitle: "",
                subtitle_en: "",
                subtitle_de: "",
                imageUrl: "",
                link: "",
                pageContext: "home",
                order: slides.length + 1,
                active: true,
                imageSettings: defaultImageSettings
            });
        }
        setIsEditorOpen(true);
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
                setFormData({ ...formData, imageUrl: data.url });
            } else {
                alert("Yükleme başarısız oldu.");
            }
        } catch (error) {
            console.error("Upload failed", error);
            alert("Yükleme hatası.");
        }
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[#0B1751] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                        <Maximize2 size={12} />
                        Görsel Kimlik & Slider Yönetimi
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-[#0B1751]">Hero Slider Merkezi</h1>
                    <p className="text-sm text-slate-700 font-medium mt-1">Sitenin ilk giriş alanlarındaki etkileyici görselleri ve kampanya mesajlarını yönetin.</p>
                </div>
                <button
                    onClick={() => openEditor()}
                    className="premium-btn group"
                >
                    <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                    Yeni Slide Ekle
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AnimatePresence>
                    {loading ? (
                        [1, 2].map((i) => (
                            <div key={i} className="glass-card p-4 h-80 animate-pulse border-white/40" />
                        ))
                    ) : (
                        slides.map((slide, index) => {
                            let slideSettings = defaultImageSettings;
                            try {
                                slideSettings = typeof slide.imageSettings === 'string' 
                                    ? JSON.parse(slide.imageSettings) 
                                    : (slide.imageSettings || defaultImageSettings);
                            } catch (e) {}

                            const overlayOpacity = slideSettings.overlayOpacity !== undefined 
                                ? slideSettings.overlayOpacity / 100 
                                : 0.35;
                            const overlayColor = slideSettings.overlayColor || '#0B1751';

                            return (
                                <motion.div
                                    key={slide.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white group overflow-hidden border border-slate-200 rounded-3xl hover:shadow-2xl transition-all duration-500"
                                >
                                    <div className="relative h-64 w-full overflow-hidden" style={{ backgroundColor: slideSettings.size === 'contain' ? '#f8fafc' : 'transparent' }}>
                                        {slide.imageUrl?.match(/\.(mp4|webm|ogg)$/i) ? (
                                            <video
                                                src={slide.imageUrl}
                                                className={`w-full h-full group-hover:scale-110 transition-transform duration-1000 ${
                                                    slideSettings.size === 'contain' ? 'object-contain' : 'object-cover'
                                                }`}
                                                style={{ objectPosition: slideSettings.position || 'center' }}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                            />
                                        ) : (
                                            <img
                                                src={slide.imageUrl}
                                                alt={slide.title}
                                                className={`w-full h-full group-hover:scale-110 transition-transform duration-1000 ${
                                                    slideSettings.size === 'contain' ? 'object-contain' : 'object-cover'
                                                }`}
                                                style={{ objectPosition: slideSettings.position || 'center' }}
                                            />
                                        )}
                                        {/* Overlay Gradient */}
                                        <div 
                                            className="absolute inset-0"
                                            style={{ 
                                                background: `linear-gradient(to top, ${overlayColor} ${(overlayOpacity * 100).toFixed(0)}%, transparent)`
                                            }}
                                        />

                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <div className="px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white">
                                                {slide.pageContext}
                                            </div>
                                            {slide.active ? (
                                                <div className="px-3 py-1.5 rounded-lg bg-emerald-500/80 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-1.5">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                                                    Aktif
                                                </div>
                                            ) : (
                                                <div className="px-3 py-1.5 rounded-lg bg-slate-500/80 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white">
                                                    Pasif
                                                </div>
                                            )}
                                        </div>

                                        <div className="absolute bottom-4 left-6 right-6">
                                            <h3 className="text-xl font-black text-white tracking-tight mb-1">{slide.title}</h3>
                                            <p className="text-xs font-medium text-white/70 line-clamp-1">{slide.subtitle}</p>
                                        </div>
                                    </div>

                                    <div className="p-6 flex items-center justify-between bg-slate-50/50">
                                        <div className="flex items-center gap-6">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-[#0B1751] uppercase tracking-tighter mb-0.5">Sıralama</span>
                                                <span className="text-lg font-black text-[#0B1751] leading-none">#{slide.order}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => {
                                                    const { id, createdAt, updatedAt, ...copyData } = slide;
                                                    openEditor(null);
                                                    setTimeout(() => {
                                                        setEditingSlide(null);
                                                        setFormData({
                                                            ...copyData,
                                                            title: `${slide.title} (Kopya)`,
                                                            order: slides.length + 1,
                                                            imageSettings: slide.imageSettings ? JSON.parse(slide.imageSettings) : defaultImageSettings
                                                        });
                                                        setIsEditorOpen(true);
                                                    }, 50);
                                                }}
                                                className="p-3 hover:bg-white rounded-xl transition-all text-blue-400 hover:text-blue-500 hover:shadow-md border border-transparent hover:border-slate-100"
                                                title="Kopyala"
                                            >
                                                <Copy size={18} />
                                            </button>
                                            <button
                                                onClick={() => openEditor(slide)}
                                                className="p-3 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-[#0B1751] hover:shadow-md border border-transparent hover:border-slate-100"
                                                title="Düzenle"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(slide.id)}
                                                className="p-3 hover:bg-red-50 rounded-xl transition-all text-slate-400 hover:text-red-500 hover:shadow-md border border-transparent hover:border-red-100"
                                                title="Sil"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })
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
                            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-lg font-black text-black">
                                    {editingSlide ? "Slide Düzenle" : "Yeni Slide"}
                                </h3>
                                <button onClick={() => setIsEditorOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl">
                                    <X size={20} className="text-slate-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="p-8 overflow-y-auto space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-black uppercase">Başlık (TR)</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-black"
                                            placeholder="TR Başlık"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-black uppercase">Başlık (EN)</label>
                                        <input
                                            type="text"
                                            value={formData.title_en}
                                            onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-black"
                                            placeholder="EN Title"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-black uppercase">Başlık (DE)</label>
                                        <input
                                            type="text"
                                            value={formData.title_de}
                                            onChange={(e) => setFormData({ ...formData, title_de: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-black"
                                            placeholder="DE Titel"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-black uppercase">Sayfa Bağlamı (Bölüm)</label>
                                    <select
                                        value={formData.pageContext}
                                        onChange={(e) => setFormData({ ...formData, pageContext: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-black"
                                    >
                                            <optgroup label="Genel">
                                                <option value="home">Anasayfa</option>
                                                <option value="about">Hakkımızda</option>
                                            </optgroup>
                                            {services.length > 0 && (
                                                <optgroup label="Hizmetler / Programlar">
                                                    {services.map(s => (
                                                        <option key={s.id} value={s.slug}>{s.title}</option>
                                                    ))}
                                                </optgroup>
                                            )}
                                            {countries.length > 0 && (
                                                <optgroup label="Ülkeler / Rotalar">
                                                    {countries.map(c => (
                                                        <option key={c.id} value={c.slug}>{c.name}</option>
                                                    ))}
                                                </optgroup>
                                            )}
                                        </select>
                                    </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-black uppercase">Alt Başlık (TR)</label>
                                        <input
                                            type="text"
                                            value={formData.subtitle}
                                            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-black"
                                            placeholder="TR Alt Başlık"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-black uppercase">Alt Başlık (EN)</label>
                                        <input
                                            type="text"
                                            value={formData.subtitle_en}
                                            onChange={(e) => setFormData({ ...formData, subtitle_en: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-black"
                                            placeholder="EN Subtitle"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-black uppercase">Alt Başlık (DE)</label>
                                        <input
                                            type="text"
                                            value={formData.subtitle_de}
                                            onChange={(e) => setFormData({ ...formData, subtitle_de: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-black"
                                            placeholder="DE Untertitel"
                                        />
                                    </div>
                                </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-black uppercase">Yönlendirme Linki (CTA)</label>
                                        <div className="relative">
                                            <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                                            <input
                                                type="text"
                                                value={formData.link}
                                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 pl-10 pr-3 py-3 rounded-xl text-sm font-bold text-black"
                                                placeholder="/programlar/universite-egitimi"
                                            />
                                        </div>
                                    </div>

                                <div className="space-y-2">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-black uppercase tracking-widest">Medya (Görsel/Video)</label>

                                        {formData.imageUrl ? (
                                            <div className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                                                <div className="aspect-video w-full bg-slate-100 flex items-center justify-center relative">
                                                    {formData.imageUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                                                        <video src={formData.imageUrl} className="h-full w-full object-cover" controls />
                                                    ) : (
                                                        <img src={formData.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                                                    )}
                                                </div>

                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, imageUrl: "" })}
                                                        className="bg-red-500 text-white p-3 rounded-xl hover:bg-red-600 transition-colors shadow-lg"
                                                        title="Medyayı Kaldır"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                    <label className="cursor-pointer bg-[var(--primary)] text-white p-3 rounded-xl hover:opacity-90 transition-colors shadow-lg" title="Medyayı Değiştir">
                                                        <Edit2 size={20} />
                                                        <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileUpload} />
                                                    </label>
                                                </div>
                                                <div className="p-2 text-[10px] text-black font-mono truncate border-t border-slate-200">
                                                    {formData.imageUrl}
                                                </div>
                                            </div>
                                        ) : (
                                            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors group">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6 transition-transform group-hover:scale-105">
                                                    <div className="p-4 bg-white rounded-full shadow-sm mb-3">
                                                        <ImageIcon className="w-8 h-8 text-[var(--primary)]" />
                                                    </div>
                                                    <p className="text-sm text-slate-600 font-bold mb-1">Medya Yüklemek İçin Tıklayın</p>
                                                    <p className="text-[10px] text-black">PNG, JPG, MP4, WEBM</p>
                                                </div>
                                                <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileUpload} />
                                            </label>
                                        )}
                                    </div>
                                </div>

                                <ImageSettingsControl
                                    settings={formData.imageSettings}
                                    onChange={(settings) => setFormData({ ...formData, imageSettings: settings })}
                                />

                                <div className="grid grid-cols-2 gap-6">

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-black uppercase tracking-widest">Sıralama</label>
                                        <input
                                            type="number"
                                            value={formData.order}
                                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-black placeholder:text-slate-400"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                                    <input
                                        type="checkbox"
                                        checked={formData.active}
                                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                        className="w-5 h-5 rounded border-gray-300 text-[#DC2626] focus:ring-[#DC2626]"
                                    />
                                    <label className="text-sm font-bold text-slate-700">Bu slide aktif olsun</label>
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

export default function HeroManagement() {
    return (
        <Suspense fallback={<div>Yükleniyor...</div>}>
            <HeroManagementContent />
        </Suspense>
    );
}
