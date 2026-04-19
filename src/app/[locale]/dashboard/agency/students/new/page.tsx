
"use client";

import { registerStudentAction } from "@/app/actions/agency-actions";
import { useState } from "react";
import { 
    UserPlus, 
    ArrowLeft, 
    Mail, 
    User, 
    Lock, 
    Loader2, 
    CheckCircle2,
    ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewStudentPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        try {
            const result = await registerStudentAction(formData);
            if (result.success) {
                toast.success("Öğrenci başarıyla kaydedildi!");
                router.push("/dashboard/agency");
            } else {
                toast.error(result.error || "Bir hata oluştu");
            }
        } catch (error) {
            toast.error("İşlem başarısız");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-10 pb-20 animate-in fade-in duration-500">
            {/* Header */}
            <div className="space-y-4">
                <Link href="/dashboard/agency" className="text-xs font-black text-[var(--primary)] uppercase tracking-widest flex items-center gap-1 hover:opacity-70 transition-all">
                    <ArrowLeft size={14} /> Geri Dön
                </Link>
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl flex items-center justify-center text-[var(--primary)]">
                        <UserPlus size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                            Yeni Öğrenci Kaydı 👤
                        </h1>
                        <p className="text-slate-500 font-bold mt-2">
                            Acentanız adına işlem yapacak yeni bir öğrenci hesabı oluşturun.
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="glass-card p-10 border-white shadow-2xl space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <User size={12} /> AD SOYAD
                        </label>
                        <input 
                            required
                            name="name"
                            type="text" 
                            placeholder="Örn: Ahmet Yılmaz"
                            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm font-bold outline-none focus:border-[var(--primary)] transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <Mail size={12} /> E-POSTA ADRESİ
                        </label>
                        <input 
                            required
                            name="email"
                            type="email" 
                            placeholder="ahmet@example.com"
                            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm font-bold outline-none focus:border-[var(--primary)] transition-all"
                        />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <Lock size={12} /> ŞİFRE BELİRLE
                        </label>
                        <input 
                            required
                            name="password"
                            type="password" 
                            placeholder="••••••••"
                            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm font-bold outline-none focus:border-[var(--primary)] transition-all"
                        />
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest pt-1">
                            ÖĞRENCİ BU ŞİFRE İLE KENDİ PANELİNE DE GİRİŞ YAPABİLECEKTİR.
                        </p>
                    </div>
                </div>

                <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 flex gap-4">
                    <ShieldCheck className="text-blue-600 shrink-0" />
                    <div>
                        <p className="text-xs font-black text-blue-900 uppercase tracking-tight">Güvenlik ve Yetkilendirme</p>
                        <p className="text-[10px] text-blue-700 font-medium mt-1">
                            Bu öğrenci sizin tarafınızdan yönetilecek şekilde işaretlenecektir. Tüm başvurularını ve belgelerini görebilecek ve yönetebileceksiniz.
                        </p>
                    </div>
                </div>

                <button 
                    disabled={loading}
                    type="submit"
                    className="w-full premium-btn py-5 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                    {loading ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle2 size={20} />}
                    <span className="font-black h-fit uppercase tracking-widest text-xs">KAYDI TAMAMLA VE ÖĞRENCİYİ OLUŞTUR</span>
                </button>
            </form>
        </div>
    );
}
