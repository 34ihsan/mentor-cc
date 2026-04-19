"use client";

import { useState } from "react";
import { createOfferAction } from "@/app/actions/agency-actions";
import { 
    X, 
    CheckCircle2, 
    Loader2,
    FileText,
    Euro,
    Type
} from "lucide-react";
import { toast } from "sonner";

interface CreateOfferModalProps {
    applicationId: string;
    onClose: () => void;
    onCreated: () => void;
}

export default function CreateOfferModal({ 
    applicationId, 
    onClose, 
    onCreated 
}: CreateOfferModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        currency: "EUR",
        content: ""
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await createOfferAction(applicationId, formData);
            if (result.success) {
                toast.success("Teklif başarıyla oluşturuldu");
                onCreated();
                onClose();
            } else {
                toast.error(result.error || "Teklif oluşturulamadı");
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
                        <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                            <FileText size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">Yeni Teklif Oluştur</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">BAŞVURU İÇİN ÖDEMA PLANI VE TEKLİF</p>
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
                <form onSubmit={handleSubmit}>
                    <div className="p-8 space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                                <Type size={12} /> Teklif Başlığı
                            </label>
                            <input
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Örn: Dil Okulu + Konaklama Paketi"
                                className="w-full bg-slate-50 border border-slate-100 text-sm font-bold px-5 py-4 rounded-2xl focus:outline-none focus:border-indigo-500 transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                                    <Euro size={12} /> Tutar
                                </label>
                                <input
                                    required
                                    type="number"
                                    step="0.01"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    placeholder="0.00"
                                    className="w-full bg-slate-50 border border-slate-100 text-sm font-bold px-5 py-4 rounded-2xl focus:outline-none focus:border-indigo-500 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Para Birimi</label>
                                <select
                                    value={formData.currency}
                                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-100 text-sm font-bold px-5 py-4 rounded-2xl focus:outline-none focus:border-indigo-500 transition-all appearance-none"
                                >
                                    <option value="EUR">EUR</option>
                                    <option value="USD">USD</option>
                                    <option value="TRY">TRY</option>
                                    <option value="GBP">GBP</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Detaylar / İçerik</label>
                            <textarea
                                required
                                rows={4}
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder="Ödeme planı ve dahil olan hizmetler hakkında detaylı bilgi yazınız..."
                                className="w-full bg-slate-50 border border-slate-100 text-sm font-bold px-5 py-4 rounded-2xl focus:outline-none focus:border-indigo-500 transition-all resize-none"
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-8 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 font-black text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-all"
                        >
                            Vazgeç
                        </button>
                        <button 
                            disabled={loading}
                            type="submit"
                            className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-4 flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20 disabled:opacity-50 transition-all"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                            <span className="font-black uppercase tracking-widest text-[10px]">TEKLİFİ GÖNDER</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
