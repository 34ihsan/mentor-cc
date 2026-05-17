"use client";

import { useState, useEffect } from "react";
import {
    Save,
    Globe,
    Phone,
    Mail,
    MapPin,
    Facebook,
    Instagram,
    Linkedin,
    Twitter,
    ShieldCheck,
    Layout,
    CheckCircle2,
    Clock,
    Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_CONFIG = {
    brandName: "",
    description: "",
    contact: {
        phone: "",
        email: "",
        whatsapp: "",
        address: ""
    },
    social: {
        facebook: "",
        instagram: "",
        linkedin: "",
        twitter: ""
    },
    seo: {
        title: "",
        description: ""
    },
    workingHours: {
        weekdays: "09:00 - 18:00",
        saturday: "10:00 - 14:00",
        sunday: "Kapalı"
    },
    aboutPage: {
        heroTitle: "Geleceğinizi Şansa Bırakmayın",
        heroSubtitle: "15 yılı aşkın tecrübemizle, hayallerinizdeki eğitime giden yolda yanınızdayız.",
        mission: "Öğrencilerimizin potansiyellerini en üst düzeye çıkaracak eğitim fırsatlarıyla buluşturmak...",
        vision: "Türkiye'nin en güvenilir ve yenilirçi eğitim danışmanlığı şirketi olmak...",
        stats: [
            { label: "Yıllık Tecrübe", value: "15+" },
            { label: "Mutlu Öğrenci", value: "5000+" },
            { label: "Partner Okul", value: "350+" },
            { label: "Ülke", value: "12+" }
        ],
        values: [
            { title: "Güven ve Şeffaflık", desc: "Tüm süreçlerimizde dürüstlük ve açıklık ilkesiyle hareket ederiz." },
            { title: "Kişisel Yaklaşım", desc: "Her öğrencinin hikayesi özeldir; çözümlerimiz de öyle olmalıdır." },
            { title: "Sürekli İnovasyon", desc: "Değişen dünya şartlarına ve eğitim trendlerine hızla uyum sağlarız." }
        ],
        teamSummary: "Mentor Career Consulting ekibi olarak..."
    }
};

export default function GeneralSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [config, setConfig] = useState<any>(DEFAULT_CONFIG);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/settings?key=site_config");
            if (res.ok) {
                const data = await res.json();
                if (data && data.value) {
                    const parsed = JSON.parse(data.value);
                    // Deep merge with DEFAULT_CONFIG to ensure all keys exist
                    setConfig({
                        ...DEFAULT_CONFIG,
                        ...parsed,
                        contact: { ...DEFAULT_CONFIG.contact, ...parsed.contact },
                        social: { ...DEFAULT_CONFIG.social, ...parsed.social },
                        seo: { ...DEFAULT_CONFIG.seo, ...parsed.seo },
                        workingHours: { ...DEFAULT_CONFIG.workingHours, ...parsed.workingHours },
                        aboutPage: { ...DEFAULT_CONFIG.aboutPage, ...parsed.aboutPage }
                    });
                }
            }
        } catch (error) {
            console.error("Failed to fetch settings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/admin/settings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    key: "site_config",
                    value: JSON.stringify(config)
                })
            });

            if (res.ok) {
                alert("Ayarlar başarıyla kaydedildi.");
            } else {
                alert("Ayar kaydedilirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Save error:", error);
            alert("Bağlantı hatası.");
        } finally {
            setSaving(false);
        }
    };

    const updateNested = (category: string, field: string, value: string) => {
        setConfig((prev: any) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: value
            }
        }));
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] opacity-50">
                <div className="w-10 h-10 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-xs font-black uppercase tracking-widest text-black">Ayarlar Yükleniyor...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[#0B1751] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                        <Globe size={12} />
                        Sistem Yapılandırması
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-[#0B1751]">Genel Site Ayarları</h1>
                    <p className="text-sm text-slate-600 font-medium mt-1">Site genelindeki marka, iletişim ve SEO ayarlarını yönetin.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="premium-btn group flex items-center gap-2"
                >
                    {saving ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Save size={18} className="group-hover:scale-110 transition-transform" />
                    )}
                    {saving ? "Kaydediliyor..." : "Tüm Ayarları Kaydet"}
                </button>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Brand & Basic Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 border border-slate-200 rounded-3xl shadow-sm space-y-6"
                >
                    <div className="flex items-center gap-2 text-[10px] font-black text-[#0B1751] uppercase tracking-widest border-b border-slate-100 pb-4">
                        <Layout size={14} />
                        Marka & Tanıtım
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Marka Adı</label>
                            <input
                                type="text"
                                value={config.brandName}
                                onChange={(e) => setConfig({ ...config, brandName: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black"
                                placeholder="Örn: Mentor Career Consulting"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kısa Tanıtım (Footer vb.)</label>
                            <textarea
                                rows={4}
                                value={config.description}
                                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold resize-none text-black"
                                placeholder="Site genelinde kullanılacak kısa tanıtım yazısı..."
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Contact Information */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="bg-white p-8 border border-slate-200 rounded-3xl shadow-sm space-y-6"
                >
                    <div className="flex items-center gap-2 text-[10px] font-black text-[#0B1751] uppercase tracking-widest border-b border-slate-100 pb-4">
                        <Phone size={14} />
                        İletişim Bilgileri
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Phone size={10} /> Telefon
                            </label>
                            <input
                                type="text"
                                value={config.contact?.phone || ""}
                                onChange={(e) => updateNested("contact", "phone", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Mail size={10} /> E-Posta
                            </label>
                            <input
                                type="email"
                                value={config.contact?.email || ""}
                                onChange={(e) => updateNested("contact", "email", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <CheckCircle2 size={10} className="text-green-500" /> WhatsApp
                            </label>
                            <input
                                type="text"
                                value={config.contact?.whatsapp || ""}
                                onChange={(e) => updateNested("contact", "whatsapp", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <MapPin size={10} /> Adres (Merkez)
                            </label>
                            <input
                                type="text"
                                value={config.contact?.address || ""}
                                onChange={(e) => updateNested("contact", "address", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Social Media Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-white p-8 border border-slate-200 rounded-3xl shadow-sm space-y-6"
                >
                    <div className="flex items-center gap-2 text-[10px] font-black text-[#0B1751] uppercase tracking-widest border-b border-slate-100 pb-4">
                        <Instagram size={14} />
                        Sosyal Medya Kanalları
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Facebook size={12} /> Facebook URL
                            </label>
                            <input
                                type="text"
                                value={config.social?.facebook || ""}
                                onChange={(e) => updateNested("social", "facebook", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-[#DC2626] text-xs font-bold text-black"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Instagram size={12} /> Instagram URL
                            </label>
                            <input
                                type="text"
                                value={config.social?.instagram || ""}
                                onChange={(e) => updateNested("social", "instagram", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-[#DC2626] text-xs font-bold text-black"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Linkedin size={12} /> LinkedIn URL
                            </label>
                            <input
                                type="text"
                                value={config.social?.linkedin || ""}
                                onChange={(e) => updateNested("social", "linkedin", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-[#DC2626] text-xs font-bold text-black"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Twitter size={12} /> Twitter (X) URL
                            </label>
                            <input
                                type="text"
                                value={config.social?.twitter || ""}
                                onChange={(e) => updateNested("social", "twitter", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-[#DC2626] text-xs font-bold text-black"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* SEO Configuration */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="bg-white p-8 border border-slate-200 rounded-3xl shadow-sm space-y-6"
                >
                    <div className="flex items-center gap-2 text-[10px] font-black text-[#0B1751] uppercase tracking-widest border-b border-slate-100 pb-4">
                        <ShieldCheck size={14} />
                        Global SEO Ayarları
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Varsayılan Sayfa Başlığı (Meta Title)</label>
                            <input
                                type="text"
                                value={config.seo?.title || ""}
                                onChange={(e) => updateNested("seo", "title", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-[#0B1751]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Varsayılan Açıklama (Meta Description)</label>
                            <textarea
                                rows={3}
                                value={config.seo?.description || ""}
                                onChange={(e) => updateNested("seo", "description", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold resize-none text-black"
                            />
                        </div>
                    </div>
                </motion.div>
                {/* Working Hours */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="bg-white p-8 border border-slate-200 rounded-3xl shadow-sm space-y-6 lg:col-span-2"
                >
                    <div className="flex items-center gap-2 text-[10px] font-black text-[#0B1751] uppercase tracking-widest border-b border-slate-100 pb-4">
                        <Clock size={14} />
                        Çalışma Saatleri
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hafta İçi</label>
                            <input
                                type="text"
                                value={config.workingHours?.weekdays || ""}
                                onChange={(e) => updateNested("workingHours", "weekdays", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cumartesi</label>
                            <input
                                type="text"
                                value={config.workingHours?.saturday || ""}
                                onChange={(e) => updateNested("workingHours", "saturday", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pazar</label>
                            <input
                                type="text"
                                value={config.workingHours?.sunday || ""}
                                onChange={(e) => updateNested("workingHours", "sunday", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black"
                            />
                        </div>
                    </div>
                </motion.div>
                {/* About Page Config */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="bg-white p-8 border border-slate-200 rounded-3xl shadow-sm space-y-6 lg:col-span-2"
                >
                    <div className="flex items-center gap-2 text-[10px] font-black text-[#0B1751] uppercase tracking-widest border-b border-slate-100 pb-4">
                        <Users size={14} />
                        Kurumsal Sayfa İçeriği
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hero Başlığı</label>
                                <input
                                    type="text"
                                    value={config.aboutPage?.heroTitle || ""}
                                    onChange={(e) => setConfig({ ...config, aboutPage: { ...config.aboutPage, heroTitle: e.target.value } })}
                                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hero Alt Başlığı</label>
                                <textarea
                                    value={config.aboutPage?.heroSubtitle || ""}
                                    onChange={(e) => setConfig({ ...config, aboutPage: { ...config.aboutPage, heroSubtitle: e.target.value } })}
                                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold h-24 resize-none text-black"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Misyonumuz</label>
                                <textarea
                                    value={config.aboutPage?.mission || ""}
                                    onChange={(e) => setConfig({ ...config, aboutPage: { ...config.aboutPage, mission: e.target.value } })}
                                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold h-24 resize-none text-black"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vizyonumuz</label>
                                <textarea
                                    value={config.aboutPage?.vision || ""}
                                    onChange={(e) => setConfig({ ...config, aboutPage: { ...config.aboutPage, vision: e.target.value } })}
                                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold h-24 resize-none text-black"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">İstatistikler (4 Adet)</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {config.aboutPage?.stats?.map((stat: any, i: number) => (
                                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                                    <input
                                        type="text"
                                        placeholder="Label"
                                        value={stat.label}
                                        onChange={(e) => {
                                            const newStats = [...config.aboutPage.stats];
                                            newStats[i].label = e.target.value;
                                            setConfig({ ...config, aboutPage: { ...config.aboutPage, stats: newStats } });
                                        }}
                                        className="w-full bg-transparent border-0 border-b border-slate-200 text-[10px] font-black uppercase outline-none focus:border-[#DC2626] text-black"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Value"
                                        value={stat.value}
                                        onChange={(e) => {
                                            const newStats = [...config.aboutPage.stats];
                                            newStats[i].value = e.target.value;
                                            setConfig({ ...config, aboutPage: { ...config.aboutPage, stats: newStats } });
                                        }}
                                        className="w-full bg-transparent border-0 text-lg font-black outline-none focus:text-[#DC2626] text-black"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Değerlerimiz (3 Adet)</label>
                                <div className="space-y-4">
                                    {config.aboutPage?.values?.map((val: any, i: number) => (
                                        <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                                            <input
                                                type="text"
                                                placeholder="Başlık"
                                                value={val.title}
                                                onChange={(e) => {
                                                    const newVals = [...config.aboutPage.values];
                                                    newVals[i].title = e.target.value;
                                                    setConfig({ ...config, aboutPage: { ...config.aboutPage, values: newVals } });
                                                }}
                                                className="w-full bg-transparent border-0 border-b border-slate-200 text-sm font-black outline-none focus:border-[#DC2626] text-black"
                                            />
                                            <textarea
                                                placeholder="Açıklama"
                                                value={val.desc}
                                                onChange={(e) => {
                                                    const newVals = [...config.aboutPage.values];
                                                    newVals[i].desc = e.target.value;
                                                    setConfig({ ...config, aboutPage: { ...config.aboutPage, values: newVals } });
                                                }}
                                                className="w-full bg-transparent border-0 text-xs font-bold outline-none h-16 resize-none text-slate-600"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Ekip Özeti</label>
                                <textarea
                                    value={config.aboutPage?.teamSummary || ""}
                                    onChange={(e) => setConfig({ ...config, aboutPage: { ...config.aboutPage, teamSummary: e.target.value } })}
                                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold h-[280px] resize-none text-black"
                                    placeholder="Ekip/Kurucu hakkında özet bilgi..."
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </form>
        </div>
    );
}
