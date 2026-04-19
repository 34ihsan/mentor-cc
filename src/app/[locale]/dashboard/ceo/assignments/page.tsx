"use client";

import { useState, useEffect } from "react";
import {
    UserCheck,
    Search,
    ChevronRight,
    Briefcase,
    GraduationCap,
    AlertCircle,
    CheckCircle2,
    ArrowRight,
    SearchCode,
    Users,
    Sparkles,
    UserPlus2,
    Compass
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AssignmentsPage() {
    const [unassignedStudents, setUnassignedStudents] = useState<any[]>([]);
    const [advisors, setAdvisors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Simulated delay for premium feel
            setTimeout(() => {
                const mockStudents = [
                    { id: "s1", name: "Ahmet Akın", email: "ahmet@gmail.com", level: "Lisans", country: "İngiltere" },
                    { id: "s2", name: "Elif Aydın", email: "elif@hotmail.com", level: "Yüksek Lisans", country: "Kanada" },
                    { id: "s3", name: "Burak Yılmaz", email: "burak@gmail.com", level: "Dil Okulu", country: "İrlanda" },
                    { id: "s4", name: "Selin Öztürk", email: "selin@gmail.com", level: "Lisans", country: "ABD" }
                ];
                const mockAdvisors = [
                    { id: "a1", name: "Caner Özkan", level: "Senior", load: "12/20", rating: 4.9 },
                    { id: "a2", name: "Deniz Aktaş", level: "Expert", load: "8/15", rating: 4.8 },
                    { id: "a3", name: "Murat Güven", level: "Specialist", load: "18/25", rating: 4.7 }
                ];
                setUnassignedStudents(mockStudents);
                setAdvisors(mockAdvisors);
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error("Failed to fetch assignment data:", error);
            setLoading(false);
        }
    };

    const handleAssign = async (advisorId: string) => {
        if (!selectedStudent) return;
        // Placeholder for assignment logic
        alert(`${selectedStudent.name} isimli öğrenciye danışman başarıyla atandı.`);
        setSelectedStudent(null);
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[#003366] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                        <Compass size={12} />
                        Operasyonel İş Akışı
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-slate-955">Öğrenci - Danışman Eşleşmesi</h1>
                    <p className="text-sm text-slate-900 font-medium mt-1">Sisteme yeni dahil olan öğrencileri uzman danışmanlarımızın portföyüne aktarın.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Side: Pool of Students */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="glass-card p-1.5 flex items-center gap-3 border-white/40">
                        <div className="pl-4 text-slate-900 dark:text-white">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Havuzda öğrenci ara..."
                            className="bg-transparent border-none outline-none w-full py-3 text-sm font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="glass-card overflow-hidden border-white/40 shadow-2xl shadow-blue-900/5">
                        <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2 text-slate-950">
                                <Users size={16} className="text-[var(--primary)]" />
                                Bekleyen Öğrenci Havuzu
                            </h3>
                            <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-600 text-[10px] font-black">
                                {unassignedStudents.length} ADAY
                            </span>
                        </div>

                        <div className="divide-y divide-slate-50 dark:divide-slate-800 max-h-[600px] overflow-y-auto custom-scrollbar">
                            <AnimatePresence mode="popLayout">
                                {loading ? (
                                    [1, 2, 3].map((i) => (
                                        <div key={i} className="p-8 animate-pulse flex items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 bg-slate-200 dark:bg-slate-700 w-1/3 rounded" />
                                                <div className="h-3 bg-slate-200 dark:bg-slate-700 w-1/4 rounded" />
                                            </div>
                                        </div>
                                    ))
                                ) : unassignedStudents.length === 0 ? (
                                    <div className="p-20 text-center opacity-40">
                                        <CheckCircle2 size={48} className="mx-auto mb-4 text-emerald-500" />
                                        <p className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-xs">Bekleyen Atama Yok</p>
                                    </div>
                                ) : unassignedStudents.map((student, index) => (
                                    <motion.div
                                        key={student.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => setSelectedStudent(student)}
                                        className={`p-6 flex items-center justify-between cursor-pointer group transition-all duration-300 relative ${selectedStudent?.id === student.id
                                            ? "bg-blue-50/80 dark:bg-blue-900/10"
                                            : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                            }`}
                                    >
                                        {selectedStudent?.id === student.id && (
                                            <motion.div layoutId="selectionBar" className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary)]" />
                                        )}

                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-500 ${selectedStudent?.id === student.id
                                                ? "bg-[var(--primary)] text-white shadow-lg shadow-blue-500/30 scale-110"
                                                : "bg-slate-100 dark:bg-slate-800 text-slate-900 group-hover:scale-110"
                                                }`}>
                                                {student.name?.charAt(0) || "S"}
                                            </div>
                                            <div>
                                                <p className={`font-black tracking-tight ${selectedStudent?.id === student.id ? "text-[var(--primary)]" : "text-slate-950"}`}>
                                                    {student.name}
                                                </p>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-[10px] font-bold text-slate-900 uppercase tracking-tighter flex items-center gap-1">
                                                        <GraduationCap size={10} /> {student.level}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-slate-900 uppercase tracking-tighter flex items-center gap-1">
                                                        <Compass size={10} /> {student.country}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`transition-all duration-300 ${selectedStudent?.id === student.id ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`}>
                                            <ArrowRight size={20} className="text-[var(--primary)]" />
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Right Side: Assignment Logic */}
                <div className="lg:col-span-5 sticky top-8">
                    <AnimatePresence mode="wait">
                        {selectedStudent ? (
                            <motion.div
                                key="assigned"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="glass-card p-8 border-blue-200 dark:border-blue-900/30 shadow-2xl shadow-blue-900/10"
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-[var(--primary)] rounded-2xl">
                                        <Sparkles size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-xl tracking-tighter">İdeal Eşleşme</h3>
                                        <p className="text-xs font-medium text-slate-900 dark:text-white">Danışman seçimi yapın.</p>
                                    </div>
                                </div>

                                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 mb-8 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 text-slate-200 dark:text-slate-700/50 group-hover:scale-125 transition-transform duration-700">
                                        <SearchCode size={60} strokeWidth={1} />
                                    </div>
                                    <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-3">Atanacak Öğrenci</p>
                                    <h4 className="font-black text-2xl text-[var(--primary)] tracking-tighter">{selectedStudent.name}</h4>
                                    <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">{selectedStudent.email}</p>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest pl-1 mb-4">Mevcut Danışmanlar</p>
                                    {advisors.map((advisor) => (
                                        <button
                                            key={advisor.id}
                                            onClick={() => handleAssign(advisor.id)}
                                            className="w-full p-5 flex items-center justify-between group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-[var(--primary)] hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-blue-50 group-hover:text-[var(--primary)] transition-all">
                                                    <UserPlus2 size={20} />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-black text-sm text-slate-900 dark:text-white group-hover:text-[var(--primary)] leading-tight">{advisor.name}</p>
                                                    <p className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-tighter mt-0.5">{advisor.level} Level • {advisor.load} Doluluk</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] font-black text-emerald-500 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-full">{advisor.rating} ★</span>
                                                <ChevronRight size={16} className="mt-1 text-black group-hover:text-[var(--primary)] transition-all translate-x-0 group-hover:translate-x-1" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="glass-card p-12 flex flex-col items-center justify-center text-center opacity-70 border-dashed border-2 bg-transparent"
                            >
                                <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
                                    <AlertCircle size={40} className="text-black" />
                                </div>
                                <h3 className="font-black text-lg tracking-tight mb-2">Seçim Bekleniyor</h3>
                                <p className="text-sm font-medium text-slate-900 dark:text-white max-w-[240px]">
                                    Atama işlemini başlatmak için havuzdaki adaylardan birini seçin.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
