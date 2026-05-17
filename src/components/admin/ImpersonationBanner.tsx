"use client";

import { LogOut, UserMinus, AlertTriangle } from "lucide-react";
import { stopImpersonationAction } from "@/app/actions/impersonation-actions";
import { useState } from "react";

interface ImpersonationBannerProps {
    userName: string;
}

export default function ImpersonationBanner({ userName }: ImpersonationBannerProps) {
    const [loading, setLoading] = useState(false);

    const handleStop = async () => {
        setLoading(true);
        try {
            await stopImpersonationAction();
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white px-6 py-3 shadow-lg flex items-center justify-between border-b border-emerald-400/20">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                    <UserMinus size={20} className="text-white" />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <AlertTriangle size={14} className="text-emerald-100" />
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-100">Taklit Modu Aktif</p>
                    </div>
                    <p className="text-sm font-medium">
                        Şu an <span className="font-bold underline decoration-2 underline-offset-2">{userName}</span> olarak işlem yapıyorsunuz.
                    </p>
                </div>
            </div>
            
            <button
                onClick={handleStop}
                disabled={loading}
                className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all px-4 py-2 rounded-xl backdrop-blur-md border border-white/10 hover:border-white/30 text-sm font-bold disabled:opacity-50"
            >
                {loading ? "Geri dönülüyor..." : (
                    <>
                        <span>Yöneticiye Geri Dön</span>
                        <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>
        </div>
    );
}
