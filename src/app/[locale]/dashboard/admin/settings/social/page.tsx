"use client";

import { useState } from "react";
import {
    Globe,
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    Youtube,
    Save,
    Settings,
    CheckCircle2,
    Link2,
    Share2,
    ExternalLink,
    Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SocialSettings() {
    const [socials, setSocials] = useState([
        { id: "fb", platform: "Facebook", icon: Facebook, url: "https://facebook.com/MentorCareerConsulting", enabled: true, color: "#1877F2" },
        { id: "ig", platform: "Instagram", icon: Instagram, url: "https://instagram.com/mentorcareer", enabled: true, color: "#E4405F" },
        { id: "tw", platform: "Twitter/X", icon: Twitter, url: "https://twitter.com/mentorcareer", enabled: false, color: "#000000" },
        { id: "li", platform: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/company/mentorcareer", enabled: true, color: "#0A66C2" },
        { id: "yt", platform: "YouTube", icon: Youtube, url: "https://youtube.com/@mentorcareer", enabled: false, color: "#FF0000" },
    ]);

    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[#0B1751] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                        <Share2 size={12} />
                        Sosyal Ekosistem Yönetimi
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-[#0B1751]">Platform Bağlantıları</h1>
                    <p className="text-sm text-slate-600 font-medium mt-1">Dijital varlığınızı güçlendirmek için sosyal medya entegrasyonlarını ve linkleri yapılandırın.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="premium-btn group flex items-center gap-2"
                >
                    <Save size={18} className="group-hover:scale-110 transition-transform" />
                    {saved ? "Ayarlar Kaydedildi" : "Değişiklikleri Uygula"}
                </button>
            </div>

            <AnimatePresence>
                {saved && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm shadow-emerald-500/5"
                    >
                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                            <CheckCircle2 size={18} />
                        </div>
                        <span className="font-bold text-sm uppercase tracking-widest">Sistem başarıyla güncellendi</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <p className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest pl-1">Aktif Kanallar</p>
                    <div className="grid grid-cols-1 gap-4">
                        {socials.map((social, index) => (
                            <motion.div
                                key={social.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white p-6 border border-slate-200 rounded-[32px] flex items-center justify-between group shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="flex items-center gap-5 flex-1 relative z-10">
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-500 group-hover:scale-110"
                                        style={{ backgroundColor: social.color }}
                                    >
                                        <social.icon size={26} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <h3 className="font-black text-[#0B1751] tracking-tight">{social.platform}</h3>
                                            {social.enabled && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                                            )}
                                        </div>
                                        <div className="relative group/input">
                                            <Link2 size={12} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 group-hover/input:text-[#DC2626] transition-colors" />
                                            <input
                                                type="text"
                                                placeholder="Profil URL'sini buraya yapıştırın..."
                                                className="bg-transparent border-none outline-none w-full text-xs font-bold text-black pl-5 py-1 focus:text-[#DC2626] transition-all placeholder:text-slate-300"
                                                defaultValue={social.url}
                                            />
                                            <div className="absolute left-5 bottom-0 right-0 h-[1px] bg-slate-100" />
                                            <div className="absolute left-5 bottom-0 w-0 h-[1px] bg-[#DC2626] transition-all duration-500 group-hover/input:w-[calc(100%-1.25rem)]" />
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-6 relative z-10">
                                    <label className="relative inline-flex items-center cursor-pointer group/toggle">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            defaultChecked={social.enabled}
                                        />
                                        <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all duration-500 peer-checked:bg-[#DC2626] shadow-inner"></div>
                                    </label>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <p className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest pl-1">Gelişmiş Servisler</p>
                    <div className="bg-white p-8 border border-slate-200 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                <Zap size={24} />
                            </div>
                            <div>
                                <h3 className="font-black text-lg tracking-tight text-[#0B1751]">Akıllı Entegrasyonlar</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Otomasyon & Bildirim Ayarları</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center justify-between group cursor-pointer">
                                <div className="max-w-[80%]">
                                    <p className="font-black text-[#0B1751] tracking-tight mb-1">Otomatik İçerik Dağıtımı</p>
                                    <p className="text-xs font-medium text-slate-600">Yeni blog yazıları ve duyurular tüm aktif sosyal kanallarda otomatik olarak paylaşılsın.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked={true} />
                                    <div className="w-12 h-6 bg-slate-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all duration-500 peer-checked:bg-[#DC2626] shadow-inner"></div>
                                </label>
                            </div>

                            <div className="h-[1px] bg-slate-50" />

                            <div className="flex items-center justify-between group cursor-pointer">
                                <div className="max-w-[80%]">
                                    <p className="font-black text-[#0B1751] tracking-tight mb-1">Sosyal Medya Widget</p>
                                    <p className="text-xs font-medium text-slate-600">Sitenin footer ve iletişim bölümlerinde sosyal medya ikonlarını göster.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked={true} />
                                    <div className="w-12 h-6 bg-slate-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all duration-500 peer-checked:bg-[#DC2626] shadow-inner"></div>
                                </label>
                            </div>

                            <div className="h-[1px] bg-slate-50" />

                            <div className="flex items-center justify-between group cursor-pointer">
                                <div className="max-w-[80%]">
                                    <p className="font-black text-[#0B1751] tracking-tight mb-1">Analiz & İzleme</p>
                                    <p className="text-xs font-medium text-slate-600">Sosyal medya linklerine tıklanma verilerini Google Analytics üzerinden takip et.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-12 h-6 bg-slate-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all duration-500 peer-checked:bg-[#DC2626] shadow-inner"></div>
                                </label>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-slate-50 rounded-[32px] border border-dashed border-slate-200 flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4">
                                <Settings size={28} className="text-[#0B1751] animate-spin-slow" />
                            </div>
                            <h4 className="font-black text-xs text-[#0B1751] uppercase tracking-widest mb-2">API Entegrasyonu</h4>
                            <p className="text-[10px] font-bold text-slate-400 leading-relaxed max-w-[200px] uppercase tracking-tighter">
                                Daha gelişmiş sosyal medya yönetim özellikleri için sistem admini ile iletişime geçin.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

// Low speed spin for settings icon
// Put this in globals.css if needed, but adding a basic tailwind class here
