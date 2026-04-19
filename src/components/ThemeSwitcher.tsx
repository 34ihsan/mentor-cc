"use client";

import { useTheme, type Theme } from "@/context/ThemeContext";
import { Palette, Layers, Zap } from "lucide-react";
import { useState } from "react";

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const themes: { id: Theme; name: string; icon: React.ReactNode; color: string }[] = [
        {
            id: "classic",
            name: "Classic Premium",
            icon: <Palette className="w-4 h-4" />,
            color: "bg-[#0f172a]" // Navy
        },
        {
            id: "modern",
            name: "Modern Glass",
            icon: <Layers className="w-4 h-4" />,
            color: "bg-[#0ea5e9]" // Blue
        },
        {
            id: "postmodern",
            name: "Post-Modern Brutal",
            icon: <Zap className="w-4 h-4" />,
            color: "bg-[#000000]" // Black
        },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
            <div
                className={`bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? "scale-100 opacity-100 mb-2" : "scale-0 opacity-0 h-0 mb-0"
                    }`}
            >
                <div className="p-1 min-w-[200px]">
                    <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50">
                        Tasarım Modu Seçin
                    </div>
                    {themes.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => {
                                setTheme(t.id);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-3 text-sm font-medium transition-colors hover:bg-slate-50 ${theme === t.id ? "text-slate-900 bg-slate-50" : "text-slate-600"
                                }`}
                        >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${t.color}`}>
                                {t.icon}
                            </div>
                            <span>{t.name}</span>
                            {theme === t.id && (
                                <div className="ml-auto w-2 h-2 rounded-full bg-green-500"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex items-center justify-center w-12 h-12 bg-white text-slate-900 rounded-full shadow-lg border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                title="Change Theme"
            >
                <Palette className="w-6 h-6 transition-transform group-hover:rotate-90 duration-500" />
            </button>
        </div>
    );
}
