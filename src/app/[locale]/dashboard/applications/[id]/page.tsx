"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    User as UserIcon,
    School,
    MapPin,
    Calendar,
    Mail,
    Phone,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import StatusTimeline from "@/components/application/StatusTimeline";
import DocumentList from "@/components/application/DocumentList";
import StatusControls from "@/components/application/StatusControls";
import OfferBuilder from "@/components/application/OfferBuilder";
import ActivityTimeline from "@/components/application/ActivityTimeline";
import AgreementJourney from "@/components/application/AgreementJourney";
import ChatWindow from "@/components/dashboard/ChatWindow";
import { MessageSquare, X, FileDown, ShieldCheck, Clock } from "lucide-react";
import DynamicChecklist from "@/components/dashboard/DynamicChecklist";
import InternalNotes from "@/components/dashboard/InternalNotes";
import AppointmentScheduler from "@/components/dashboard/AppointmentScheduler";
import { generateContractPDF } from "@/lib/pdf-generator";

export default function ApplicationDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const [application, setApplication] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const fetchApplication = async () => {
        if (!params) return;
        try {
            const response = await fetch(`/api/applications/${params.id}`);
            if (response.ok) {
                const data = await response.json();
                setApplication(data);
            } else {
                router.push("/dashboard/applications");
            }
        } catch (error) {
            console.error("Failed to fetch application:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params?.id) fetchApplication();
    }, [params?.id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
                    <p className="text-[var(--text-muted)]">Yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (!application) {
        return null;
    }

    const role = session?.user?.role || "STUDENT";
    const canUploadDocuments = role === "STUDENT" || role === "ADMIN" || role === "CEO" || role === "ADVISOR" || role === "AGENCY_MANAGER";
    const canApproveDocuments = role === "ADVISOR" || role === "AGENCY_MANAGER" || role === "ADMIN" || role === "CEO";
    const canManageOffers = role === "ADVISOR" || role === "AGENCY_MANAGER" || role === "ADMIN" || role === "CEO";

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard/applications"
                        className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white border-b-2 border-red-500 pb-1">Başvuru Yönetimi</h2>
                        <p className="text-slate-800 dark:text-slate-200 text-sm font-bold mt-1">
                            {application.student.name || application.student.email} • {application.program.name}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href={`/dashboard/applications/${application.id}/offers`}
                        className="px-4 py-2 border border-[var(--border)] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        Gönderilen Teklifler ({application.offers?.length || 0})
                    </Link>
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="flex items-center gap-2 px-6 py-2 bg-[var(--primary)] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-blue-500/20"
                    >
                        <MessageSquare size={16} /> MESAJLAR
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                <div className="lg:col-span-8 space-y-6">
                    <div className="glass-card p-6 border-l-4 border-red-600">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-lg font-black uppercase tracking-tighter text-slate-900 dark:text-white">Başvuru Durumu</h3>
                                <p className="text-[10px] text-slate-800 dark:text-slate-400 uppercase tracking-widest font-black">Süreç Takip Çizelgesi</p>
                            </div>
                            <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-black rounded-full uppercase tracking-tighter shadow-lg shadow-red-900/20">
                                {application.status}
                            </span>
                        </div>
                        <StatusTimeline currentStatus={application.status} />

                        {/* Elite Journey Tracker */}
                        <div className="mt-8 border-t border-slate-100 dark:border-slate-800/50 pt-8">
                            <AgreementJourney status={application.status} />
                        </div>

                        {/* Student Submission Action */}
                        {role === "STUDENT" && application.status === "DRAFT" && (
                            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800/50">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/20">
                                    <div>
                                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight mb-1">Başvurunuzu Tamamlayın</h4>
                                        <p className="text-xs font-bold text-slate-800 dark:text-slate-300">Belgeleriniz hazırsa başvurunuzu danışman incelemesine gönderebilirsiniz.</p>
                                    </div>
                                    <button
                                        onClick={async () => {
                                            const res = await fetch(`/api/applications/${application.id}`, {
                                                method: "PATCH",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({ status: "UNDER_REVIEW" }),
                                            });
                                            if (res.ok) fetchApplication();
                                        }}
                                        className="premium-btn px-8 py-3 whitespace-nowrap"
                                    >
                                        Başvuruyu Tamamla & Gönder
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Dynamic Document Checklist */}
                    <div className="glass-card p-8">
                        <DynamicChecklist 
                            requirements={application.documentRequirements || []} 
                            uploadedDocuments={application.documents || []} 
                        />
                    </div>

                    <DocumentList
                        applicationId={application.id}
                        documents={application.documents}
                        requiredDocuments={application.requiredDocuments}
                        canUpload={canUploadDocuments}
                        canApprove={canApproveDocuments}
                        onDocumentUpdate={fetchApplication}
                        role={role}
                    />

                    <ActivityTimeline activities={application.activityLogs} />
                </div>

                <div className="lg:col-span-4 space-y-6">
                    {canManageOffers && (
                        <div className="glass-card p-6 bg-slate-950 text-white border-none shadow-2xl shadow-blue-900/40 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-red-600/20 transition-all duration-700" />
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                                OPERATÖR PANELİ
                            </h3>
                            <div className="space-y-4 relative z-10">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => generateContractPDF({
                                            studentName: application.student.name || "Öğrenci",
                                            programName: application.program.name,
                                            institutionName: application.program.institution.name,
                                            amount: 1500, // Mock amount
                                            currency: "EUR",
                                            date: new Date()
                                        })}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                    >
                                        <FileDown size={14} /> Sözleşme Oluştur
                                    </button>
                                </div>
                                <OfferBuilder application={application} onOfferCreated={fetchApplication} />
                                <div className="pt-4 border-t border-white/10">
                                    <StatusControls
                                        currentStatus={application.status}
                                        role={role}
                                        applicationId={application.id}
                                        onStatusChange={fetchApplication}
                                    />
                                </div>
                                <div className="pt-4 border-t border-white/10">
                                    <AppointmentScheduler 
                                        applicationId={application.id} 
                                        studentName={application.student.name || "Öğrenci"} 
                                        advisorName={session?.user?.name || "Danışman"} 
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {canManageOffers && (
                        <InternalNotes 
                            applicationId={application.id} 
                            initialNotes={application.messages?.filter((m: any) => m.isInternal) || []} 
                        />
                    )}

                    <div className="glass-card p-6">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-slate-400 mb-6">Öğrenci Profili</h3>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white border-b-2 border-slate-200 dark:border-slate-700">
                                <UserIcon size={24} />
                            </div>
                            <div>
                                <p className="font-black text-slate-900 dark:text-white tracking-tight">{application.student.name || "İsimsiz Öğrenci"}</p>
                                <p className="text-[10px] font-black text-slate-800 dark:text-slate-400 uppercase tracking-wider">{application.student.email}</p>
                            </div>
                        </div>
                        <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-slate-800 dark:text-slate-400 uppercase tracking-widest">Kayıt Tarihi</span>
                                <span className="text-xs font-black text-slate-900 dark:text-slate-200">{new Date(application.student.createdAt).toLocaleDateString("tr-TR")}</span>
                            </div>
                            {application.student.profile?.phone && (
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Telefon</span>
                                    <span className="text-xs font-black text-slate-700 dark:text-slate-300">{application.student.profile.phone}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="glass-card p-6">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-slate-400 mb-6">Program Detayları</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="font-black text-slate-900 dark:text-white text-lg leading-tight tracking-tight mb-2">{application.program.name}</p>
                                <div className="flex items-center gap-2 text-[10px] text-red-600 font-black uppercase tracking-widest bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg w-fit">
                                    <School size={12} />
                                    {application.program.institution.name}
                                </div>
                            </div>

                            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl space-y-3 border border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 rounded bg-white dark:bg-slate-900 shadow-sm">
                                        <MapPin size={12} className="text-slate-900 dark:text-slate-400" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-slate-200">{application.program.institution.city}, {application.program.institution.country}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 rounded bg-white dark:bg-slate-900 shadow-sm">
                                        <Calendar size={12} className="text-slate-900 dark:text-slate-400" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-slate-200">Süre: {application.program.duration || "Belirtilmemiş"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Overlay */}
            <AnimatePresence>
                {isChatOpen && (
                    <div className="fixed inset-0 z-[100] flex items-end justify-end p-6 pointer-events-none">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsChatOpen(false)}
                            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm pointer-events-auto"
                        />
                        <div className="relative w-full max-w-md pointer-events-auto">
                            <ChatWindow 
                                currentUser={session?.user}
                                applicationId={application.id}
                                onClose={() => setIsChatOpen(false)}
                                otherUser={
                                    role === "STUDENT" 
                                        ? (application.consultant || application.agency || { id: "admin", name: "Mentor Career Destek", role: "ADMIN" })
                                        : application.student
                                }
                            />
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
