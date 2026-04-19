"use client";

import { useState, useEffect } from "react";
import {
    Users,
    UserPlus,
    Search,
    Shield,
    UserCheck,
    UserX,
    MoreVertical,
    Mail,
    Filter,
    ShieldCheck,
    ChevronDown,
    ArrowUpRight,
    MapPin,
    Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UserManagement() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            // Simulated delay for premium feel
            setTimeout(() => {
                setUsers([
                    { id: "1", name: "Mustafa Kemal Köksal", email: "mustafa@StarEducation.com", role: "CEO", location: "Merkez Ofis", status: "Active" },
                    { id: "2", name: "Zeynep Demir", email: "zeynep@StarEducation.com", role: "ADMIN", location: "Avrupa Ofis", status: "Active" },
                    { id: "3", name: "Caner Özkan", email: "caner@StarEducation.com", role: "ADVISOR", location: "Anadolu Ofis", status: "Active" },
                    { id: "4", name: "Merve Yılmaz", email: "merve@StarEducation.com", role: "AGENCY_MANAGER", location: "Global", status: "Pending" },
                    { id: "5", name: "Ahmet Akın", email: "ahmet@gmail.com", role: "STUDENT", location: "Uzaktan", status: "Active" }
                ]);
                setLoading(false);
            }, 600);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getRoleStyles = (role: string) => {
        const styles: any = {
            ADMIN: "bg-red-50 text-red-600 dark:bg-red-500/10 border-red-100 dark:border-red-900/20",
            CEO: "bg-purple-50 text-purple-600 dark:bg-purple-500/10 border-purple-100 dark:border-purple-900/20",
            ADVISOR: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 border-blue-100 dark:border-blue-900/20",
            STUDENT: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-900/20",
            AGENCY_MANAGER: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 border-amber-100 dark:border-amber-900/20",
        };
        return styles[role] || "bg-slate-50 text-slate-600 dark:bg-slate-800 border-slate-100";
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[#003366] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                        <Users size={12} />
                        Kullanıcı & Erişim Yönetimi
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-slate-950">Ekip & Üyeler</h1>
                    <p className="text-sm text-slate-900 font-medium mt-1">Sistemdeki tüm kullanıcıların rollerini, yetkilerini ve aktiflik durumlarını yönetin.</p>
                </div>
                <button className="premium-btn group">
                    <UserPlus size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                    Yeni Üye Davet Et
                </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 w-full glass-card p-1.5 flex items-center gap-3 border-white/40">
                    <div className="pl-4 text-slate-900 dark:text-white">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="İsim, e-posta veya sistem ID'si ile ara..."
                        className="bg-transparent border-none outline-none w-full py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-900 dark:text-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                    <Filter size={14} />
                    Filtrele
                </button>
            </div>

            {/* User Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {loading ? (
                        [1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="glass-card p-8 h-64 animate-pulse border-white/40" />
                        ))
                    ) : filteredUsers.length === 0 ? (
                        <div className="col-span-full py-20 text-center opacity-40">
                            <Users size={48} className="mx-auto mb-4 text-black" />
                            <p className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-xs">Aranan Kriterde Üye Bulunamadı</p>
                        </div>
                    ) : filteredUsers.map((user, index) => (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass-card group p-6 flex flex-col justify-between border-white/40 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 border-t-2 border-t-transparent hover:border-t-[var(--primary)]"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="relative">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#003366] to-[#004080] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform duration-500">
                                            {user.name?.charAt(0) || "U"}
                                        </div>
                                        {user.status === "Active" && (
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm" />
                                        )}
                                    </div>
                                    <div className={`px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${getRoleStyles(user.role)}`}>
                                        {user.role}
                                    </div>
                                </div>
                                <h3 className="font-black text-lg text-slate-950 tracking-tight truncate leading-tight mb-1">{user.name || "İsimsiz Kullanıcı"}</h3>
                                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-4">
                                    <Mail size={12} className="opacity-50" />
                                    <span className="truncate">{user.email}</span>
                                </div>

                                <div className="flex flex-col gap-2 mb-6">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-900 uppercase tracking-tighter">
                                        <MapPin size={10} className="text-[#003366]" />
                                        {user.location || "Lokasyon Bilgisi Yok"}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-900 uppercase tracking-tighter">
                                        <Briefcase size={10} className="text-[#003366]" />
                                        {user.role === 'STUDENT' ? 'Öğrenci Hesabı' : 'Platform Çalışanı'}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex gap-1.5">
                                    <button className="p-2.5 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all text-slate-900 dark:text-white hover:text-[var(--primary)] hover:shadow-md border border-transparent hover:border-slate-100 dark:hover:border-slate-700" title="Yetki Düzenle">
                                        <ShieldCheck size={18} />
                                    </button>
                                    <button className="p-2.5 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all text-slate-900 dark:text-white hover:text-blue-500 hover:shadow-md border border-transparent hover:border-slate-100 dark:hover:border-slate-700" title="Kullanıcı Kartı">
                                        <UserCheck size={18} />
                                    </button>
                                </div>
                                <button className="p-2.5 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all text-black hover:text-red-500 hover:shadow-md border border-transparent hover:border-red-100 dark:hover:border-red-900/20" title="Devre Dışı Bırak">
                                    <UserX size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
