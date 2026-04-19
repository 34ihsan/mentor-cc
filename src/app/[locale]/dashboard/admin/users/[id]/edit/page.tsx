
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { 
    UserCog, 
    ArrowLeft,
    Fingerprint
} from "lucide-react";
import Link from "next/link";
import EditUserForm from "@/components/admin/EditUserForm";

export default async function AdminEditUserPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

    const user = await prisma.user.findUnique({
        where: { id: id }
    });

    if (!user) notFound();

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
                        <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-900/20">
                            <UserCog size={20} />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 leading-none">
                            Kullanıcı Düzenle 📝
                        </h1>
                    </div>
                    <p className="text-slate-500 font-bold mt-2">
                        <span className="text-indigo-600 font-black">{user.name}</span> kullanıcısının yetkilerini ve bilgilerini güncelleyin.
                    </p>
                </div>

                <div className="hidden lg:flex items-center gap-3 px-6 py-4 bg-slate-50 rounded-[30px] border border-slate-100">
                    <Fingerprint size={20} className="text-slate-400" />
                    <div>
                        <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-tight">SİSTEM ID</p>
                        <p className="text-[9px] font-bold text-slate-400 truncate max-w-[120px] uppercase tracking-tight">{user.id}</p>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="glass-card p-12 border-white/60 shadow-2xl shadow-indigo-900/5">
                <EditUserForm user={user} />
            </div>
        </div>
    );
}
