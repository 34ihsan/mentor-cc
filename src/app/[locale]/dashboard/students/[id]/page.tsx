"use client";

import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { 
    User, 
    Mail, 
    Phone, 
    Calendar, 
    ChevronLeft,
    FileText,
    Activity,
    School,
    Clock,
    CheckCircle2,
    AlertCircle,
    MoreVertical,
    ExternalLink,
    MapPin,
    Briefcase,
    Shield
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProcessTracker from "@/components/dashboard/ProcessTracker";
import UpdateStatusModal from "@/components/dashboard/UpdateStatusModal";

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { data: session } = useSession();
    const [student, setStudent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updatingApp, setUpdatingApp] = useState<{ id: string, status: string } | null>(null);

    useEffect(() => {
        fetchStudent();
    }, [id]);

    const fetchStudent = async () => {
        try {
            const res = await fetch(`/api/students/${id}`);
            if (res.ok) {
                const data = await res.json();
                setStudent(data);
            } else {
                router.push("/dashboard/students");
            }
        } catch (error) {
            console.error("Failed to fetch student:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!student) return null;

    const statusLabels: any = {
        DRAFT: "Taslak",
        DOCS_PENDING: "Belge Bekleniyor",
        UNDER_REVIEW: "İncelemede",
        OFFER_SENT: "Teklif Gönderildi",
        CONTRACT_SIGNED: "Sözleşme Onaylandı",
        COMPLETED: "Tamamlandı"
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Navigation & Actions */}
            <div className="flex items-center justify-between">
                <Link 
                    href="/dashboard/students" 
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                    <ChevronLeft size={16} />
                    ÖĞRENCİ LİSTESİNE DÖN
                </Link>
                <div className="flex gap-2">
                    {student.asStudent.length === 1 && (
                        <button 
                            onClick={() => setUpdatingApp({ id: student.asStudent[0].id, status: student.asStudent[0].status })}
                            className="premium-btn px-6 py-2.5 text-xs flex items-center gap-2"
                        >
                            <Activity size={16} />
                            Süreç Güncelle
                        </button>
                    )}
                </div>
            </div>

            {/* Profile Header Card */}
            <div className="glass-card p-1 border-white/40 overflow-hidden">
                <div className="bg-gradient-to-r from-[#003366] to-[#004080] p-8 md:p-12 relative overflow-hidden">
                    {/* Background Decorative */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white shadow-2xl flex items-center justify-center text-[#003366] font-black text-4xl md:text-5xl">
                            {student.name?.charAt(0) || "U"}
                        </div>
                        <div className="text-center md:text-left text-white flex-1">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-80">
                                <Shield size={12} />
                                Kayıtlı Öğrenci
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 capitalize vivid-white">
                                {student.name}
                            </h1>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <p className="vivid-label !text-blue-100/60 !text-[9px] mb-1">E-POSTA ADRESİ</p>
                                    <div className="flex items-center gap-2 vivid-white font-bold">
                                        <Mail size={14} className="opacity-60" />
                                        {student.email}
                                    </div>
                                </div>
                                {student.profile?.phone && (
                                    <div>
                                        <p className="vivid-label !text-blue-100/60 !text-[9px] mb-1">TELEFON</p>
                                        <div className="flex items-center gap-2 vivid-white font-bold">
                                            <Phone size={14} className="opacity-60" />
                                            {student.profile.phone}
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <p className="vivid-label !text-blue-100/60 !text-[9px] mb-1">KAYIT TARİHİ</p>
                                    <div className="flex items-center gap-2 vivid-white font-bold">
                                        <Calendar size={14} className="opacity-60" />
                                        {new Date(student.createdAt).toLocaleDateString('tr-TR')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Applications */}
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-black tracking-tight text-slate-950 dark:text-white flex items-center gap-2">
                                <School size={22} className="text-[#003366] dark:text-blue-400" />
                                Başvurular
                            </h2>
                            <span className="vivid-label !text-slate-400 !text-[9px]">
                                TOPLAM {student.asStudent.length} KAYIT
                            </span>
                        </div>

                        <div className="space-y-4">
                            {student.asStudent.length === 0 ? (
                                <div className="glass-card p-12 text-center opacity-40">
                                    <AlertCircle size={40} className="mx-auto mb-3" />
                                    <p className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Henüz başvuru yapılmamış</p>
                                </div>
                            ) : (
                                student.asStudent.map((app: any) => (
                                    <Link key={app.id} href={`/dashboard/applications/${app.id}`}>
                                        <div className="glass-card p-6 border-white/40 hover:shadow-xl transition-all group">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-[#003366] dark:text-blue-400 group-hover:bg-[#003366] group-hover:text-white transition-all">
                                                        <School size={24} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-black text-lg tracking-tight text-slate-900 dark:vivid-white leading-none mb-1">
                                                            {app.program?.name}
                                                        </h3>
                                                        <p className="vivid-label !text-slate-500 dark:!text-slate-400 !text-[10px]">
                                                            {app.program?.institution?.name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <span className="px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 text-[10px] font-black uppercase tracking-tighter">
                                                        {statusLabels[app.status] || app.status}
                                                    </span>
                                                    <span className="text-[8px] font-black text-slate-400 dark:vivid-label !text-slate-500 uppercase tracking-widest">
                                                        ID: {app.id.substring(app.id.length - 8)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Process Tracker Integration */}
                                            <div className="mb-8 px-2">
                                                <ProcessTracker status={app.status as any} />
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-50 dark:border-slate-800">
                                                <div>
                                                    <p className="vivid-label !text-slate-400 !text-[8px] mb-1">Oluşturulma</p>
                                                    <p className="text-[10px] font-black text-slate-900 dark:text-white">{new Date(app.createdAt).toLocaleDateString('tr-TR')}</p>
                                                </div>
                                                <div>
                                                    <p className="vivid-label !text-slate-400 !text-[8px] mb-1">Danışman</p>
                                                    <p className="text-[10px] font-black text-slate-900 dark:text-white">{app.consultant?.name || "Atanmadı"}</p>
                                                </div>
                                                 <div className="col-span-2 flex justify-end gap-4">
                                                    <button 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            setUpdatingApp({ id: app.id, status: app.status });
                                                        }}
                                                        className="flex items-center gap-1.5 text-[10px] font-black text-amber-600 hover:text-amber-700 transition-colors uppercase tracking-widest"
                                                    >
                                                        <Activity size={12} />
                                                        SÜREÇ GÜNCELLE
                                                    </button>
                                                    <div className="flex items-center gap-1.5 text-[10px] font-black text-[#003366] dark:text-blue-400 hover:text-blue-600 transition-colors uppercase tracking-widest">
                                                        DETAYLI GÖRÜNTÜLE
                                                        <ExternalLink size={12} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </section>
                </div>

                {/* Sidebar - Profile Details & Documents */}
                <div className="space-y-8">
                    <section>
                        <h2 className="text-xl font-black tracking-tight text-slate-950 dark:text-white flex items-center gap-2 mb-6">
                            <Shield size={22} className="text-[#003366] dark:text-blue-400" />
                            Detaylı Bilgi
                        </h2>
                        <div className="glass-card p-6 space-y-6 border-white/40 shadow-xl shadow-blue-900/5">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                        <MapPin size={16} />
                                    </div>
                                    <div>
                                        <p className="vivid-label !text-slate-400 !text-[8px] mb-1">Adres</p>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{student.profile?.address || "Bilgi Yok"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                        <Briefcase size={16} />
                                    </div>
                                    <div>
                                        <p className="vivid-label !text-slate-400 !text-[8px] mb-1">Şirket/Okul</p>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{student.profile?.companyName || "Bilgi Yok"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                        <Clock size={16} />
                                    </div>
                                    <div>
                                        <p className="vivid-label !text-slate-400 !text-[8px] mb-1">Son Güncelleme</p>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{new Date(student.updatedAt || student.createdAt).toLocaleDateString('tr-TR')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-black tracking-tight text-slate-950 dark:text-white flex items-center gap-2 mb-6">
                            <FileText size={22} className="text-[#003366] dark:text-blue-400" />
                            Belgeler
                        </h2>
                        <div className="glass-card divide-y divide-slate-50 dark:divide-slate-800 overflow-hidden border-white/40 shadow-xl shadow-blue-900/5">
                            {student.documents.length === 0 ? (
                                <div className="p-8 text-center bg-slate-50 dark:bg-slate-900/40">
                                    <p className="vivid-label !text-slate-400 !text-[10px]">Henüz Belge Yok</p>
                                </div>
                            ) : (
                                student.documents.map((doc: any) => (
                                    <div key={doc.id} className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-[#003366] group-hover:text-white transition-all">
                                                <FileText size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-slate-900 dark:vivid-white tracking-tight leading-none mb-1">{doc.name}</p>
                                                <p className="vivid-label !text-slate-400 !text-[8px]">
                                                    {new Date(doc.uploadedAt).toLocaleDateString('tr-TR')}
                                                </p>
                                            </div>
                                        </div>
                                        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-[#003366] dark:hover:text-blue-400 transition-colors">
                                            <ExternalLink size={16} />
                                        </a>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </div>
            </div>
            {/* Update Status Modal */}
            {updatingApp && (
                <UpdateStatusModal 
                    applicationId={updatingApp.id}
                    currentStatus={updatingApp.status}
                    onClose={() => setUpdatingApp(null)}
                    onUpdate={fetchStudent}
                />
            )}
        </div>
    );
}
