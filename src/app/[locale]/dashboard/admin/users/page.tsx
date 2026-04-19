
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { adminGetUsersAction } from "@/app/actions/admin-user-actions";
import { 
    Users, 
    UserPlus, 
    Search, 
    Filter, 
    MoreVertical, 
    Shield, 
    UserCheck, 
    Building2, 
    UserCog,
    Trash2,
    Edit3
} from "lucide-react";
import Link from "next/link";
import DeleteUserButton from "@/components/admin/DeleteUserButton";

export default async function AdminUserManagementPage() {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

    const users = await adminGetUsersAction();

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[#0B1751] font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                        <Shield size={12} />
                        SİSTEM YÖNETİMİ
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-[#0B1751]">
                        Kullanıcı CRM 👥
                    </h1>
                    <p className="text-slate-500 font-bold mt-1">
                        Sistemdeki tüm rolleri, yetkileri ve kullanıcı profillerini buradan yönetin.
                    </p>
                </div>

                <Link 
                    href="/dashboard/admin/users/new" 
                    className="premium-btn flex items-center gap-2 px-8 py-4 shadow-xl shadow-blue-900/10"
                >
                    <UserPlus size={18} />
                    <span className="font-black h-fit uppercase tracking-widest text-[10px]">YENİ KULLANICI EKLE</span>
                </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Stats */}
                {[
                    { label: "TOPLAM", count: users.length, icon: Users, color: "text-[#0B1751]" },
                    { label: "ÖĞRENCİ", count: users.filter(u => u.role === 'STUDENT').length, icon: UserCheck, color: "text-blue-600" },
                    { label: "DANIŞMAN", count: users.filter(u => u.role === 'ADVISOR').length, icon: Building2, color: "text-emerald-600" },
                    { label: "ACENTA", count: users.filter(u => u.role === 'AGENCY_MANAGER').length, icon: UserCog, color: "text-amber-600" },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <h3 className={`text-2xl font-black ${stat.color}`}>{stat.count}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Users Table */}
            <div className="bg-white overflow-hidden border border-slate-200 rounded-3xl shadow-sm">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white/50">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Kullanıcı ara..."
                                className="bg-slate-50 border border-slate-200 text-[10px] font-bold uppercase tracking-widest px-10 py-2.5 rounded-xl focus:outline-none focus:border-[#DC2626] transition-all min-w-[240px] text-black"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all">
                            <Filter size={14} /> Filtrele
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">KULLANICI</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">ROL</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">AKTİVİTE</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">YÖNETİCİ</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 text-right">EYLEMLER</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {users.map((user) => (
                                <tr key={user.id} className="group hover:bg-slate-50/50 transition-all">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-black">
                                                {user.name?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900">{user.name}</p>
                                                <p className="text-[10px] font-bold text-slate-400">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tight shadow-sm ${
                                            user.role === 'ADMIN' ? 'bg-slate-900 text-white' :
                                            user.role === 'CEO' ? 'bg-indigo-500 text-white' :
                                            user.role === 'ADVISOR' ? 'bg-emerald-500 text-white' :
                                            user.role === 'AGENCY_MANAGER' ? 'bg-amber-500 text-white' :
                                            'bg-blue-500 text-white'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                                                {user.role === 'STUDENT' ? `${user._count.asStudent} Başvuru` : `${user._count.managedUsers} Yönetilen`}
                                            </p>
                                            <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-[#DC2626] w-[40%]" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        {user.managedBy?.name || "Global"}
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link 
                                                href={`/dashboard/admin/users/${user.id}/edit`}
                                                className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm"
                                            >
                                                <Edit3 size={14} />
                                            </Link>
                                            <DeleteUserButton userId={user.id} userName={user.name || ""} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
