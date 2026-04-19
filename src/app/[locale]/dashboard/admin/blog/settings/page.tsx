"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    Save, 
    Layout, 
    ImageIcon, 
    Type, 
    Settings, 
    Eye,
    ChevronRight,
    Sparkles
} from "lucide-react";
import ImageSettingsControl, { defaultImageSettings } from "@/components/admin/ImageSettingsControl";

export default function BlogSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [config, setConfig] = useState({
        heroTitle: "Haberler & Blog",
        heroSubtitle: "Global Eğitim Dünyasından En Son Gelişmeler ve Stratejik Rehberler",
        heroImage: "",
        heroSettings: defaultImageSettings,
        featuredCategory: "Rehber",
        latestPostsTitle: "Son Paylaşımlar"
    });

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await fetch("/api/admin/settings?key=blog_page_config");
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.value) {
                        const parsed = JSON.parse(data.value);
                        setConfig(prev => ({ ...prev, ...parsed }));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch blog config:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/admin/settings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    key: "blog_page_config",
                    value: JSON.stringify(config)
                })
            });

            if (res.ok) {
                alert("Ayarlar başarıyla kaydedildi.");
            } else {
                alert("Ayarlar kaydedilirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Save error:", error);
            alert("Bağlantı hatası.");
        } finally {
            setSaving(false);
        }
    };

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
                setConfig({ ...config, heroImage: data.url });
            }
        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    if (loading) return <div className="p-20 text-center animate-pulse font-bold uppercase tracking-widest text-xs">Yükleniyor...</div>;

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
                <div>
                    <div className="flex items-center gap-2 text-[#003366] dark:text-white font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                        <Settings size={12} />
                        Görsel Yönetim Paneli
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter dark:text-white">Blog Sayfası Ayarları</h1>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="premium-btn flex items-center gap-2 px-8 py-3.5 shadow-xl shadow-blue-900/10 disabled:opacity-50"
                >
                    <Save size={18} />
                    <span className="text-[10px] font-black tracking-widest uppercase">{saving ? "KAYDEDİLİYOR..." : "AYARLARI KAYDET"}</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Hero Section Management */}
                <div className="space-y-8">
                    <div className="glass-card p-8 border-white/40 shadow-xl shadow-blue-900/5 space-y-6">
                        <h3 className="text-xs font-black text-black uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-4">
                            <Layout size={14} className="text-[var(--primary)]" />
                            Hero Bölümü Ayarları
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-black uppercase">Blog Başlığı (Hero)</label>
                                <input
                                    type="text"
                                    value={config.heroTitle}
                                    onChange={(e) => setConfig({ ...config, heroTitle: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[var(--primary)] text-sm font-bold text-black"
                                    placeholder="Örn: Haberler & Blog"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-black uppercase">Alt Başlık</label>
                                <textarea
                                    value={config.heroSubtitle}
                                    onChange={(e) => setConfig({ ...config, heroSubtitle: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[var(--primary)] text-sm font-bold text-black min-h-[100px]"
                                    placeholder="Kısa bir açıklama girin..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-black uppercase">Hero Arka Plan Görseli</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={config.heroImage}
                                        onChange={(e) => setConfig({ ...config, heroImage: e.target.value })}
                                        className="flex-1 bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[var(--primary)] text-sm font-bold text-black"
                                        placeholder="Görsel URL veya dosya yükle..."
                                    />
                                    <label className="cursor-pointer p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                        <ImageIcon size={20} className="text-slate-900 dark:text-white" />
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                    </label>
                                </div>
                            </div>

                            <ImageSettingsControl
                                label="Hero Görsel Yerleşimi"
                                settings={config.heroSettings}
                                onChange={(settings) => setConfig({ ...config, heroSettings: settings })}
                            />
                        </div>
                    </div>

                    <div className="glass-card p-8 border-white/40 shadow-xl shadow-blue-900/5 space-y-6">
                        <h3 className="text-xs font-black text-black uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-4">
                            <Sparkles size={14} className="text-[var(--primary)]" />
                            İçerik Akış Ayarları
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-black uppercase">Öne Çıkan Kategori</label>
                                <input
                                    type="text"
                                    value={config.featuredCategory}
                                    onChange={(e) => setConfig({ ...config, featuredCategory: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[var(--primary)] text-sm font-bold text-black"
                                    placeholder="Örn: Rehber"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-black uppercase">Liste Başlığı</label>
                                <input
                                    type="text"
                                    value={config.latestPostsTitle}
                                    onChange={(e) => setConfig({ ...config, latestPostsTitle: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[var(--primary)] text-sm font-bold text-black"
                                    placeholder="Örn: Son Paylaşımlar"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview Section */}
                <div className="space-y-8">
                    <div className="glass-card p-0 border-white/40 shadow-2xl shadow-blue-900/10 overflow-hidden flex flex-col h-full sticky top-24">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
                            <h3 className="text-[10px] font-black text-black uppercase tracking-widest flex items-center gap-2">
                                <Eye size={14} className="text-blue-500" />
                                Canlı Önizleme (Temsili)
                            </h3>
                            <span className="text-[8px] font-bold text-slate-400">BLOG SAYFASI ÜST KISMI</span>
                        </div>
                        
                        <div className="flex-1 bg-slate-50">
                            {/* Representative Hero Preview */}
                            <div 
                                className="relative min-h-[350px] flex items-center justify-center p-10 overflow-hidden"
                                style={{
                                    backgroundImage: config.heroImage ? `url(${config.heroImage})` : 'none',
                                    backgroundSize: config.heroSettings.size as any || 'cover',
                                    backgroundPosition: config.heroSettings.position || 'center',
                                    backgroundColor: '#0B1751'
                                }}
                            >
                                {/* Overlay */}
                                <div 
                                    className="absolute inset-0" 
                                    style={{
                                        backgroundColor: config.heroSettings.overlayColor || '#0B1751',
                                        opacity: (config.heroSettings.overlayOpacity || 50) / 100
                                    }}
                                />

                                <div className={`relative z-10 w-full flex ${
                                    config.heroSettings.textPosition === 'left' ? 'justify-start text-left' : 
                                    config.heroSettings.textPosition === 'right' ? 'justify-end text-right' : 
                                    'justify-center text-center'
                                }`}>
                                    <div className="max-w-md">
                                        <h2 className="text-3xl font-roboto font-bold italic text-white mb-4 leading-tight">
                                            {config.heroTitle}
                                        </h2>
                                        <p className="text-sm text-white/80 font-sans font-light leading-relaxed border-l-2 border-gold/40 pl-4 inline-block">
                                            {config.heroSubtitle}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Representative Content Preview */}
                            <div className="p-10 space-y-6">
                                <div className="flex items-center justify-between border-b pb-4">
                                    <h4 className="text-xl font-black tracking-tight">{config.latestPostsTitle}</h4>
                                    <span className="text-[10px] font-black text-gold uppercase tracking-widest">{config.featuredCategory}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-40 bg-white rounded-2xl shadow-sm border border-slate-100" />
                                    <div className="h-40 bg-white rounded-2xl shadow-sm border border-slate-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
