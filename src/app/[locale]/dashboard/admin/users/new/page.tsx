
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { 
    UserPlus, 
    ArrowLeft,
    Shield
} from "lucide-react";
import Link from "next/link";
import NewUserForm from "@/components/admin/NewUserForm";

export default async function AdminNewUserPage() {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

    return (
        <div className="space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <Link 
                        href="/dashboard/admin/users" 
                        className="flex items-center gap-2 text-[var(--primary)] font-black text-[10px] uppercase tracking-[0.2em] mb-4 hover:translate-x-[-4px] transition-all w-fit"
                    >
                        <ArrowLeft size={14} /> KULLANICI LİSTESİNE DÖN
                    </Link>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xl shadow-slate-900/20">
                            <UserPlus size={20} />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 leading-none">
                            Yeni Kullanıcı Kaydı 👤
                        </h1>
                    </div>
                    <p className="text-slate-500 font-bold mt-2">
                        Sisteme yeni bir personel, acenta yetkilisi veya öğrenci kaydı oluşturun.
                    </p>
                </div>

                <div className="hidden lg:flex items-center gap-3 px-6 py-4 bg-amber-50 rounded-[30px] border border-amber-100">
                    <Shield size={20} className="text-amber-600" />
                    <div>
                        <p className="text-[10px] font-black text-amber-900 uppercase tracking-widest leading-tight">GÜVENLİK UYARISI</p>
                        <p className="text-[9px] font-bold text-amber-700 uppercase tracking-tight">Şifreler sistemde güvenli bir şekilde hashlenir.</p>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="glass-card p-12 border-white/60 shadow-2xl shadow-blue-900/5">
                <NewUserForm />
            </div>

            {/* Help Card */}
            <div className="p-8 rounded-[40px] bg-slate-50 border border-slate-100 text-center">
                <p className="text-xs font-bold text-slate-400">
                    Sorunuz mu var? <span className="text-[var(--primary)] underline cursor-pointer">Sistem dokümantasyonunu inceleyin</span> veya teknik ekiple iletişime geçin.
                </p>
            </div>
        </div>
    );
}
