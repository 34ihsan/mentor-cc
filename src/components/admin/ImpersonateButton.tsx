"use client";

import { Eye, Loader2 } from "lucide-react";
import { impersonateUserAction } from "@/app/actions/impersonation-actions";
import { useState } from "react";
import { toast } from "sonner";

interface ImpersonateButtonProps {
    userId: string;
    userName: string;
}

export default function ImpersonateButton({ userId, userName }: ImpersonateButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleImpersonate = async () => {
        if (!confirm(`${userName} olarak giriş yapmak istediğinize emin misiniz?`)) return;

        setLoading(true);
        try {
            await impersonateUserAction(userId);
            toast.success(`${userName} olarak giriş yapılıyor...`);
        } catch (error: any) {
            toast.error(error.message || "Giriş yapılamadı");
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleImpersonate}
            disabled={loading}
            className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-emerald-600 hover:border-emerald-100 transition-all shadow-sm disabled:opacity-50"
            title="Kullanıcı Olarak Gör"
        >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Eye size={14} />}
        </button>
    );
}
