"use client";

import { useState } from "react";
import { updateApplicationStatusAction } from "@/app/actions/agency-actions";
import { 
    X, 
    CheckCircle2, 
    AlertCircle, 
    Loader2,
    Activity
} from "lucide-react";
import { toast } from "sonner";

interface UpdateStatusModalProps {
    applicationId: string;
    currentStatus: string;
    onClose: () => void;
    onUpdate: () => void;
}

const statusOptions = [
    { value: "DRAFT", label: "Taslak", color: "bg-slate-500" },
    { value: "DOCS_PENDING", label: "Belge Bekleniyor", color: "bg-amber-500" },
    { value: "UNDER_REVIEW", label: "İncelemede", color: "bg-blue-500" },
    { value: "OFFER_SENT", label: "Teklif Gönderildi", color: "bg-indigo-500" },
    { value: "CONTRACT_SIGNED", label: "Sözleşme Onaylandı", color: "bg-emerald-500" },
    { value: "COMPLETED", label: "Tamamlandı", color: "bg-emerald-600" },
];

export default function UpdateStatusModal({ 
    applicationId, 
    currentStatus, 
    onClose, 
    onUpdate 
}: UpdateStatusModalProps) {
    const [status, setStatus] = useState(currentStatus);
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        if (status === currentStatus) {
            onClose();
            return;
        }

        setLoading(true);
        try {
            const result = await updateApplicationStatusAction(applicationId, status);
            if (result.success) {
                toast.success("Başvuru durumu güncellendi");
                onUpdate();
                onClose();
            } else {
                toast.error(result.error || "Güncelleme başarısız");
            }
        } catch (error) {
            toast.error("Bir hata oluştu");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl border border-white/20 animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                            <Activity size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">Süreç Güncelle</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">BAŞVURU DURUMUNU DEĞİŞTİR</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 gap-3">
                        {statusOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setStatus(option.value)}
                                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                                    status === option.value 
                                    ? "border-primary bg-primary/5 text-primary ring-4 ring-primary/5" 
                                    : "border-slate-50 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${option.color}`} />
                                    <span className="font-bold text-sm tracking-tight">{option.label}</span>
                                </div>
                                {status === option.value && <CheckCircle2 size={18} />}
                            </button>
                        ))}
                    </div>

                    <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl flex gap-3 border border-amber-100 dark:border-amber-900/20">
                        <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-[11px] font-bold text-amber-800 dark:text-amber-200 leading-relaxed">
                            Durum değişikliği yaptığınızda sistem otomatik olarak bir hareket kaydı (log) oluşturacak ve öğrenciyi bilgilendirecektir.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                    <button 
                        onClick={onClose}
                        className="flex-1 py-4 font-black text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-all"
                    >
                        Vazgeç
                    </button>
                    <button 
                        disabled={loading}
                        onClick={handleSubmit}
                        className="flex-[2] premium-btn py-4 flex items-center justify-center gap-2 shadow-xl shadow-primary/20 disabled:opacity-50"
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                        <span className="font-black uppercase tracking-widest text-[10px]">DEĞİŞİKLİKLERİ KAYDET</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
