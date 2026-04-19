"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Users, Search, Edit, Trash2, UserPlus, Shield } from "lucide-react";

export default function UsersAdminPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL");

    // Redirect if not admin/ceo
    useEffect(() => {
        if (session && (session.user.role !== "ADMIN" && session.user.role !== "CEO")) {
            router.push("/dashboard");
        }
    }, [session, router]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/users");
            if (response.ok) {
                const data = await response.json();
                setUsers(Array.isArray(data) ? data : []);
            }
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) return;

        try {
            const response = await fetch(`/api/users/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                fetchUsers();
            }
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    const filtered = users.filter((user) => {
        const matchesSearch =
            user.name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());
        const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const getRoleBadgeColor = (role: string) => {
        const colors: any = {
            ADMIN: "bg-purple-100 text-purple-700",
            CEO: "bg-amber-100 text-amber-700",
            AGENCY_MANAGER: "bg-blue-100 text-blue-700",
            ADVISOR: "bg-green-100 text-green-700",
            STUDENT: "bg-gray-100 text-gray-700",
        };
        return colors[role] || "bg-gray-100 text-gray-700";
    };

    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "CEO") {
        return null;
    }

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
                <div>
                    <h2 className="text-3xl font-serif italic text-secondary flex items-center gap-3">
                        <Users size={28} className="text-primary" />
                        Kullanıcı Yönetimi
                    </h2>
                    <p className="text-zinc-500 font-medium mt-1">
                        Tüm kullanıcıları görüntüleyin ve yönetin
                    </p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <UserPlus size={18} />
                    Yeni Kullanıcı
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="premium-card p-4 flex gap-4 items-center flex-1">
                    <Search className="text-zinc-400" size={20} />
                    <input
                        type="text"
                        placeholder="İsim veya e-posta ara..."
                        className="bg-transparent border-none outline-none flex-1 text-sm font-bold text-primary placeholder:text-zinc-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="premium-card p-4 flex gap-4 items-center min-w-[200px]">
                    <Shield className="text-zinc-400" size={20} />
                    <select
                        className="bg-transparent border-none outline-none flex-1 appearance-none cursor-pointer text-sm font-bold text-primary"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="ALL">Tüm Roller</option>
                        <option value="ADMIN">Admin</option>
                        <option value="CEO">CEO</option>
                        <option value="AGENCY_MANAGER">Ajans Yöneticisi</option>
                        <option value="ADVISOR">Danışman</option>
                        <option value="STUDENT">Öğrenci</option>
                    </select>
                </div>
            </div>

            <div className="premium-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-zinc-50 border-b border-zinc-100">
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-zinc-400">
                                    Kullanıcı
                                </th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-zinc-400">
                                    E-posta
                                </th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-zinc-400">
                                    Rol
                                </th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-zinc-400">
                                    Kayıt Tarihi
                                </th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-zinc-400">
                                    İşlemler
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-400 font-bold uppercase tracking-widest text-[10px]">
                                        Yükleniyor...
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-400 font-bold uppercase tracking-widest text-[10px]">
                                        Kullanıcı bulunamadı.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-zinc-50/50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-primary">{user.name || "İsim Yok"}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-zinc-500">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1.5 rounded-lg text-[9px] font-black tracking-widest uppercase ${getRoleBadgeColor(
                                                    user.role
                                                )}`}
                                            >
                                                {user.role.replace("_", " ")}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-bold text-zinc-400">
                                            {new Date(user.createdAt).toLocaleDateString("tr-TR")}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                                                    title="Düzenle"
                                                >
                                                    <Edit size={16} className="text-primary group-hover:text-blue-600 transition-colors" />
                                                </button>
                                                {user.id !== session.user.id && (
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                                                        title="Sil"
                                                    >
                                                        <Trash2 size={16} className="text-zinc-300 group-hover:text-red-500 transition-colors" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="premium-card p-6">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-2">Toplam Kullanıcı</p>
                    <p className="text-3xl font-black text-primary">{users.length}</p>
                </div>
                <div className="premium-card p-6">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-2">Öğrenciler</p>
                    <p className="text-3xl font-black text-primary">
                        {users.filter((u) => u.role === "STUDENT").length}
                    </p>
                </div>
                <div className="premium-card p-6">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-2">Danışmanlar</p>
                    <p className="text-3xl font-black text-primary">
                        {users.filter((u) => u.role === "ADVISOR").length}
                    </p>
                </div>
                <div className="premium-card p-6">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-2">Ajanslar</p>
                    <p className="text-3xl font-black text-primary">
                        {users.filter((u) => u.role === "AGENCY_MANAGER").length}
                    </p>
                </div>
            </div>
        </div>
    );
}
