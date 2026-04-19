"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { 
    Users, 
    Search, 
    Filter, 
    User, 
    Mail, 
    Phone, 
    Calendar, 
    ChevronRight,
    ArrowUpRight,
    FileText,
    Activity,
    UserCheck,
    Building2,
    Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import StandaloneContractBuilder from "@/components/application/StandaloneContractBuilder";

export default function StudentsPage() {
    const { data: session } = useSession();
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [selectedStudent, setSelectedStudent] = useState<any>(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await fetch("/api/students");
            if (res.ok) {
                const data = await res.json();
                setStudents(Array.isArray(data) ? data : []);
            }
        } catch (error) {
            console.error("Failed to fetch students:", error);
        } finally {
            setLoading(false);
        }
    };

    const filtered = students.filter(s => {
        const matchesSearch = 
            s.name?.toLowerCase().includes(search.toLowerCase()) ||
            s.email.toLowerCase().includes(search.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[#003366] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                        <Users size={12} />
                        Öğrenci Portföyü
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-slate-950">Tüm Öğrenciler</h1>
                    <p className="text-sm text-slate-600 font-bold mt-1">
                        Sistemdeki tüm kayıtlı öğrencilerin profil ve uygulama süreçlerini yönetin.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-sm flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider">
                            {filtered.length} TOPLAM ÖĞRENCİ
                        </span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-9 glass-card p-1.5 flex items-center gap-3 border-white/40 shadow-xl shadow-blue-900/5">
                    <div className="pl-4 text-slate-900 dark:text-white">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Öğrenci adı veya e-posta ile ara..."
                        className="bg-transparent border-none outline-none w-full py-3 text-sm font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="md:col-span-3 glass-card p-1.5 flex items-center gap-3 border-white/40 shadow-xl shadow-blue-900/5">
                    <div className="pl-4 text-slate-900 dark:text-white">
                        <Filter size={18} />
                    </div>
                    <select
                        className="bg-transparent border-none outline-none w-full py-3 text-sm font-bold appearance-none cursor-pointer text-slate-700 dark:text-slate-200"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="ALL">Tüm Durumlar</option>
                        <option value="ACTIVE">Aktif</option>
                        <option value="IDLE">İşlem Yok</option>
                    </select>
                </div>
            </div>

            {/* Students List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {loading ? (
                        [1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="glass-card p-8 h-64 animate-pulse border-white/40" />
                        ))
                    ) : filtered.length === 0 ? (
                        <div className="col-span-full py-20 text-center opacity-40">
                            <Users size={48} className="mx-auto mb-4 text-black" />
                            <p className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-xs">Aranan Kriterde Öğrenci Bulunamadı</p>
                        </div>
                    ) : (
                        filtered.map((s, index) => (
                            <motion.div
                                key={s.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass-card group p-6 flex flex-col justify-between border-white/40 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 border-t-2 border-t-transparent hover:border-t-[var(--primary)]"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="relative">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#003366] to-[#004080] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform duration-500">
                                                {s.name?.charAt(0) || "U"}
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm" />
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <div className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-black uppercase tracking-widest">
                                                ÖĞRENCİ
                                            </div>
                                            {s.managedBy && (
                                                <div className="text-[8px] font-bold text-slate-500 uppercase tracking-tight flex items-center gap-1">
                                                    <UserCheck size={8} />
                                                    {s.managedBy.name}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="font-black text-lg text-slate-950 dark:vivid-white tracking-tight truncate leading-tight mb-1">
                                        {s.name || "İsimsiz Kullanıcı"}
                                    </h3>
                                    
                                    <div className="space-y-2 mt-4">
                                        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:vivid-label !text-slate-300">
                                            <Mail size={12} className="opacity-50 text-[#003366] dark:text-blue-300" />
                                            <span className="truncate">{s.email}</span>
                                        </div>
                                        {s.profile?.phone && (
                                            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:vivid-label !text-slate-300">
                                                <Phone size={12} className="opacity-50 text-[#003366] dark:text-blue-300" />
                                                <span>{s.profile.phone}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:vivid-label !text-slate-300">
                                            <Activity size={12} className="opacity-50 text-[#003366] dark:text-blue-300" />
                                            <span>{s.applicationCount} Başvuru</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Kayıt Tarihi</span>
                                        <span className="text-[10px] font-bold text-slate-900 dark:text-white">{new Date(s.createdAt).toLocaleDateString('tr-TR')}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link 
                                            href={`/dashboard/students/${s.id}`}
                                            className="p-2.5 bg-slate-50 hover:bg-[var(--primary)] hover:text-white rounded-xl transition-all shadow-sm border border-slate-100 flex items-center gap-2 text-[10px] font-black uppercase"
                                        >
                                            SÜRECE GİT
                                            <ArrowUpRight size={14} />
                                        </Link>
                                        <button
                                            onClick={() => setSelectedStudent(s)}
                                            className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm border border-blue-100 flex items-center gap-2 text-[10px] font-black uppercase"
                                        >
                                            <FileText size={14} />
                                            SÖZLEŞME
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Standalone Contract Builder Modal */}
            {selectedStudent && (
                <StandaloneContractBuilder
                    student={selectedStudent}
                    onContractCreated={() => fetchStudents()}
                    onClose={() => setSelectedStudent(null)}
                />
            )}
        </div>
    );
}
