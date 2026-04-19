
"use client";

import { useState } from "react";
import { adminDeleteUserAction } from "@/app/actions/admin-user-actions";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function DeleteUserButton({ userId, userName }: { userId: string, userName: string }) {
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        if (!confirm(`${userName} isimli kullanıcıyı silmek istediğinize emin misiniz?`)) return;

        setLoading(true);
        try {
            const result = await adminDeleteUserAction(userId);
            if (result.success) {
                toast.success("Kullanıcı başarıyla silindi");
            } else {
                toast.error("Hata oluştu");
            }
        } catch (error) {
            toast.error("Silme işlemi başarısız");
        } finally {
            setLoading(false);
        }
    }

    return (
        <button 
            disabled={loading}
            onClick={handleDelete}
            className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-rose-600 hover:border-rose-100 transition-all shadow-sm disabled:opacity-50"
        >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
        </button>
    );
}
