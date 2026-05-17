"use client";

import React from "react";
import { motion } from "framer-motion";

export type Language = "tr" | "en" | "de";

interface LanguageTabsProps {
    activeTab: Language;
    onChange: (tab: Language) => void;
}

const languages: { id: Language; label: string; flag: string }[] = [
    { id: "tr", label: "Türkçe", flag: "🇹🇷" },
    { id: "en", label: "English", flag: "🇬🇧" },
    { id: "de", label: "Deutsch", flag: "🇩🇪" }
];

export default function LanguageTabs({ activeTab, onChange }: LanguageTabsProps) {
    return (
        <div className="flex items-center gap-2 mb-6">
            {languages.map((tab) => (
                <button
                    key={tab.id}
                    type="button"
                    onClick={() => onChange(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeTab === tab.id
                            ? "bg-[#DC2626] text-white shadow-lg"
                            : "bg-white text-slate-400 hover:text-slate-600 border border-slate-200"
                    }`}
                >
                    <span className="text-base">{tab.flag}</span>
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
