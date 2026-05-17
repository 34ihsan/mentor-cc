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
    Shield,
    MessageSquare,
    Trash2
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProcessTracker from "@/components/dashboard/ProcessTracker";
import UpdateStatusModal from "@/components/dashboard/UpdateStatusModal";

import { PlaneTakeoff } from "lucide-react";

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { data: session } = useSession();
    const [student, setStudent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updatingApp, setUpdatingApp] = useState<{ id: string, status: string } | null>(null);
    const [rejectingDocId, setRejectingDocId] = useState<string | null>(null);
    const [rejectionReason, setRejectionReason] = useState("");
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState("applications");

    useEffect(() => {
        setMounted(true);
    }, []);


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

    const handleDelete = async (documentId: string) => {
        if (!confirm("Bu belgeyi kalıcı olarak silmek istediğinize emin misiniz?")) return;
        try {
            const response = await fetch(`/api/documents/${documentId}`, { method: "DELETE" });
            if (response.ok) {
                fetchStudent();
            } else {
                const data = await response.json();
                alert(data.error || "Silme başarısız");
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const handleStatusUpdate = async (documentId: string, status: string, reason?: string) => {
        try {
            const response = await fetch(`/api/documents/${documentId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status, rejectionReason: reason }),
            });

            if (response.ok) {
                fetchStudent();
                setRejectingDocId(null);
                setRejectionReason("");
            }
        } catch (error) {
            console.error("Status update failed:", error);
        }
    };

    useEffect(() => {
        fetchStudent();
    }, [id]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!student) return null;

    const role = session?.user?.role || "STUDENT";
    const canApprove = role === "ADMIN" || role === "CEO" || role === "ADVISOR" || role === "AGENCY_MANAGER";

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
                    <Link 
                        href={`/dashboard/messages?id=${student.id}`}
                        className="premium-btn px-6 py-2.5 text-xs flex items-center gap-2"
                    >
                        <MessageSquare size={16} />
                        Mesaj Gönder
                    </Link>
                    {student.asStudent.length === 1 && (
                        <button 
                            onClick={() => setUpdatingApp({ id: student.asStudent[0].id, status: student.asStudent[0].status })}
                            className="premium-btn px-6 py-2.5 text-xs flex items-center gap-2 bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20"
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
                        <div className="flex items-center gap-4 border-b border-zinc-100 dark:border-zinc-800 mb-6">
                            <button 
                                onClick={() => setActiveTab("applications")}
                                className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${
                                    activeTab === "applications" ? "text-primary" : "text-zinc-400 hover:text-zinc-600"
                                }`}
                            >
                                BAŞVURULAR
                                {activeTab === "applications" && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
                            </button>

                        </div>

                        {activeTab === "applications" ? (
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
                                                    <Link 
                                                         href={`/dashboard/messages?id=${student.id}`}
                                                         className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-widest"
                                                     >
                                                         <MessageSquare size={12} />
                                                         MESAJ GÖNDER
                                                     </Link>
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
                        ) : null}
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
                                    <div key={doc.id} className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors space-y-3 group">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-[#003366] group-hover:text-white transition-all">
                                                    <FileText size={18} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-xs font-black text-slate-900 dark:vivid-white tracking-tight leading-none">{doc.name}</p>
                                                        <span className={`text-[8px] px-1.5 py-0.5 rounded-md font-bold uppercase ${
                                                            doc.status === "APPROVED" ? "bg-green-100 text-green-700" :
                                                            doc.status === "REJECTED" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                                                        }`}>
                                                            {doc.status}
                                                        </span>
                                                    </div>
                                                    <p className="vivid-label !text-slate-400 !text-[8px] mt-1">
                                                        {new Date(doc.uploadedAt).toLocaleDateString('tr-TR')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {canApprove && (
                                                    <div className="flex gap-1">
                                                        {doc.status !== "APPROVED" && (
                                                            <button 
                                                                onClick={() => handleStatusUpdate(doc.id, "APPROVED")}
                                                                className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                                title="Onayla"
                                                            >
                                                                <CheckCircle2 size={16} />
                                                            </button>
                                                        )}
                                                        {doc.status !== "REJECTED" && (
                                                            <button 
                                                                onClick={() => setRejectingDocId(doc.id)}
                                                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                title="Reddet"
                                                            >
                                                                <AlertCircle size={16} />
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-[#003366] dark:hover:text-blue-400 transition-colors">
                                                    <ExternalLink size={16} />
                                                </a>
                                                {canApprove && (
                                                    <button
                                                        onClick={() => handleDelete(doc.id)}
                                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Belgeyi Sil"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Rejection Form inside Student Page */}
                                        {rejectingDocId === doc.id && (
                                            <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 rounded-xl animate-in fade-in slide-in-from-top-2">
                                                <textarea
                                                    className="w-full p-2 border border-red-200 dark:border-red-900/40 rounded-lg bg-white dark:bg-slate-900 text-[10px] font-bold"
                                                    placeholder="Red sebebi nedir?"
                                                    value={rejectionReason}
                                                    onChange={(e) => setRejectionReason(e.target.value)}
                                                    rows={2}
                                                />
                                                <div className="flex justify-end gap-2 mt-2">
                                                    <button onClick={() => setRejectingDocId(null)} className="text-[10px] font-black text-slate-500 uppercase">İptal</button>
                                                    <button 
                                                        onClick={() => handleStatusUpdate(doc.id, "REJECTED", rejectionReason)}
                                                        className="bg-red-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase"
                                                        disabled={!rejectionReason.trim()}
                                                    >
                                                        Reddet
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {doc.status === "REJECTED" && doc.rejectionReason && (
                                            <div className="mt-1 text-[9px] text-red-600 font-bold bg-red-50 dark:bg-red-900/10 p-2 rounded-lg border-l-2 border-red-500">
                                                RED SEBEBİ: {doc.rejectionReason}
                                            </div>
                                        )}
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
