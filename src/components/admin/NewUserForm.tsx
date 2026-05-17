
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminCreateUserAction } from "@/app/actions/admin-user-actions";
import { 
    User, 
    Mail, 
    Lock, 
    Shield, 
    ArrowLeft, 
    Save, 
    Loader2,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function NewUserForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            role: formData.get("role") as string,
        };

        try {
            const result = await adminCreateUserAction(data);
            if (result.success) {
                setSuccess(true);
                toast.success("Kullanıcı başarıyla oluşturuldu");
                setTimeout(() => router.push("/dashboard/admin/users"), 1500);
            } else {
                toast.error("Hata: " + (result as any).error);
            }
        } catch (error) {
            toast.error("Bir hata oluştu");
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-500">
                <div className="w-24 h-24 rounded-[40px] bg-emerald-50 text-emerald-500 flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/20">
                    <CheckCircle2 size={48} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Başarıyla Oluşturuldu!</h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Yönlendiriliyorsunuz...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Personal Info */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <User size={16} className="text-[var(--primary)]" />
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Kişisel Bilgiler</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">AD SOYAD</label>
                            <input 
                                required
                                name="name"
                                type="text" 
                                placeholder="Örn: Ahmet Yılmaz"
                                className="w-full bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl text-sm font-bold text-black focus:outline-none focus:border-[var(--primary)] focus:bg-white transition-all shadow-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">E-POSTA ADRESİ</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    required
                                    name="email"
                                    type="email" 
                                    placeholder="ahmet@mentor-cc.com"
                                    className="w-full bg-slate-50 border border-slate-100 pl-12 pr-5 py-4 rounded-2xl text-sm font-bold text-black focus:outline-none focus:border-[var(--primary)] focus:bg-white transition-all shadow-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Settings */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Shield size={16} className="text-[var(--primary)]" />
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Hesap Ayarları</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">ŞİFRE</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    required
                                    name="password"
                                    type="password" 
                                    placeholder="••••••••"
                                    className="w-full bg-slate-50 border border-slate-100 pl-12 pr-5 py-4 rounded-2xl text-sm font-bold text-black focus:outline-none focus:border-[var(--primary)] focus:bg-white transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">SİSTEM ROLÜ</label>
                            <select 
                                name="role"
                                className="w-full bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl text-sm font-bold text-black focus:outline-none focus:border-[var(--primary)] focus:bg-white transition-all shadow-sm appearance-none"
                            >
                                <option value="STUDENT">ÖĞRENCİ</option>
                                <option value="ADVISOR">DANIŞMAN</option>
                                <option value="AGENCY_MANAGER">ACENTA YÖNETİCİSİ</option>
                                <option value="CEO">CEO</option>
                                <option value="ADMIN">ADMIN (TAM YETKİ)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-10 flex items-center justify-between border-t border-slate-100">
                <Link 
                    href="/dashboard/admin/users"
                    className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest transition-all"
                >
                    <ArrowLeft size={14} /> İPTAL ET
                </Link>

                <button 
                    disabled={loading}
                    type="submit"
                    className="premium-btn flex items-center gap-3 px-12 py-5 shadow-2xl shadow-[var(--primary)]/20 disabled:opacity-50 disabled:cursor-not-wait"
                >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    <span className="font-black uppercase tracking-[0.2em] text-[10px]">KULLANICIYI KAYDET</span>
                </button>
            </div>
        </form>
    );
}
