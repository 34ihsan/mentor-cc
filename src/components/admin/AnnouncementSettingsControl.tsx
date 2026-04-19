"use client";

import { useState, useEffect } from "react";
import {
    Palette,
    Type,
    Layout,
    Link as LinkIcon,
    Calendar,
    Globe
} from "lucide-react";

export interface AnnouncementSettings {
    backgroundColor: string;
    textColor: string;
    fontSize: "small" | "medium" | "large";
    targetPages: string[]; // ["/"], ["/about"], or ["ALL"]
}

export const defaultAnnouncementSettings: AnnouncementSettings = {
    backgroundColor: "#3b82f6", // blue-500
    textColor: "#ffffff",
    fontSize: "medium",
    targetPages: ["ALL"]
};

interface Props {
    settings: AnnouncementSettings;
    onChange: (settings: AnnouncementSettings) => void;
}

export default function AnnouncementSettingsControl({ settings, onChange }: Props) {
    // Ensuring we have valid values even if props are partial
    const currentSettings = { ...defaultAnnouncementSettings, ...settings };

    const handleColorChange = (key: 'backgroundColor' | 'textColor', value: string) => {
        onChange({ ...currentSettings, [key]: value });
    };

    const handleFontSizeChange = (size: "small" | "medium" | "large") => {
        onChange({ ...currentSettings, fontSize: size });
    };

    const handlePageTargetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        // Simple logic: if ALL is selected, clear specific pages. 
        // For now, let's keep it simple with a predefined list or text input
        if (value === "ALL") {
            onChange({ ...currentSettings, targetPages: ["ALL"] });
        } else {
            // For a specific page, we might want a multi-select in the future
            // For now, let's just allow selecting one context or "Specific"
            onChange({ ...currentSettings, targetPages: [value] });
        }
    };

    // Check if targetPages includes specific values
    const isAllPages = currentSettings.targetPages.includes("ALL");
    const isHomePage = currentSettings.targetPages.includes("/");

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-6">
            <h4 className="text-xs font-black text-black uppercase tracking-widest flex items-center gap-2">
                <Palette size={14} className="text-[var(--primary)]" />
                Görünüm ve Hedefleme Ayarları
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Colors */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-black uppercase">Arkaplan Rengi</label>
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={currentSettings.backgroundColor}
                                onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                                className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0 overflow-hidden"
                            />
                            <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-slate-200 text-black">
                                {currentSettings.backgroundColor}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-black uppercase">Yazı Rengi</label>
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={currentSettings.textColor}
                                onChange={(e) => handleColorChange('textColor', e.target.value)}
                                className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0 overflow-hidden"
                            />
                            <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-slate-200 text-black">
                                {currentSettings.textColor}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Typography & Targeting */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-black uppercase">Yazı Boyutu</label>
                        <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                            {[
                                { val: "small", label: "Küçük" },
                                { val: "medium", label: "Orta" },
                                { val: "large", label: "Büyük" }
                            ].map((opt) => (
                                <button
                                    key={opt.val}
                                    type="button"
                                    onClick={() => handleFontSizeChange(opt.val as any)}
                                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${currentSettings.fontSize === opt.val
                                        ? "bg-slate-100 text-black shadow-sm"
                                        : "text-slate-400 hover:text-slate-600"
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-black uppercase">Görüntülenme Alanı</label>
                        <select
                            value={isAllPages ? "ALL" : currentSettings.targetPages[0] || "ALL"}
                            onChange={handlePageTargetChange}
                            className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs font-bold outline-none focus:border-[var(--primary)] text-black"
                        >
                            <option value="ALL">Tüm Sayfalar</option>
                            <option value="GLOBAL_HEADER">Global Başlık Duyurusu (Üst Bar)</option>
                            <option value="/">Sadece Anasayfa</option>
                            <option value="/iletisim">İletişim Sayfası</option>
                            <option value="/hakkimizda">Hakkımızda</option>
                            {/* More dynamics options could be added here */}
                        </select>
                        <p className="text-[10px] text-slate-400">
                            *Duyurunun hangi sayfalarda aktif olacağını seçin.
                        </p>
                    </div>
                </div>
            </div>

            {/* Preview Box */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Canlı Önizleme</label>
                <div
                    className="p-4 rounded-xl flex items-center justify-between shadow-sm transition-all duration-300"
                    style={{
                        backgroundColor: currentSettings.backgroundColor,
                        color: currentSettings.textColor
                    }}
                >
                    <span className={`font-medium ${currentSettings.fontSize === 'small' ? 'text-sm' :
                        currentSettings.fontSize === 'large' ? 'text-lg' : 'text-base'
                        }`}>
                        Bu bir örnek duyuru metnidir.
                    </span>
                    <ArrowRight size={16} />
                </div>
            </div>
        </div>
    );
}

function ArrowRight({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}
