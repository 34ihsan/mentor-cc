
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { 
    ArrowLeft, 
    GraduationCap, 
    MapPin, 
    Calendar, 
    DollarSign,
    CheckCircle2,
    Clock,
    FileText,
    MessageSquare
} from "lucide-react";
import Link from "next/link";
import StatusTimeline from "@/components/student/StatusTimeline";

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth();
    if (!session?.user || session.user.role !== "STUDENT") {
        redirect("/login");
    }

    const application = await prisma.application.findUnique({
        where: { 
            id: id,
            studentId: session.user.id 
        },
        include: {
            program: {
                include: {
                    institution: {
                        include: {
                            country: true
                        }
                    }
                }
            },
            documents: true,
            activityLogs: {
                orderBy: { createdAt: 'desc' }
            }
        }
    });

    if (!application) {
        redirect("/dashboard/student");
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-12">
            {/* Header / Breadcrumb */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Link href="/dashboard/student" className="text-xs font-black text-[var(--primary)] uppercase tracking-widest flex items-center gap-1 mb-4 hover:opacity-70 transition-all">
                        <ArrowLeft size={14} /> Başvurularım
                    </Link>
                    <h1 className="text-3xl font-black text-black dark:text-white tracking-tight leading-none">
                        {application.program.name}
                    </h1>
                    <p className="text-slate-500 font-bold mt-2 flex items-center gap-2">
                        {application.program.institution.name} 
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        {application.program.institution.country?.name}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="px-6 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs font-black uppercase tracking-widest shadow-sm">
                        {application.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column - Details & Timeline */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Program Quick Facts */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-2">
                            <Clock size={20} className="text-blue-500" />
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-50">SÜRE</p>
                            <p className="font-bold text-sm">{application.program.duration || "Belirtilmemiş"}</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-2">
                            <Calendar size={20} className="text-amber-500" />
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-50">BAŞLANGIÇ</p>
                            <p className="font-bold text-sm">Eylül 2026</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-2">
                            <DollarSign size={20} className="text-emerald-500" />
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-50">ÜCRET</p>
                            <p className="font-bold text-sm">{application.program.price} {application.program.currency}</p>
                        </div>
                    </div>

                    {/* Progress Timeline */}
                    <div className="p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <GraduationCap size={120} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-xs font-black uppercase tracking-widest mb-10 flex items-center gap-2">
                                <CheckCircle2 size={16} className="text-[var(--primary)]" />
                                BAŞVURU SÜRECİ
                            </h3>
                            <StatusTimeline status={application.status} />
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="space-y-4">
                         <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <Clock size={14} />
                            İŞLEM GEÇMİŞİ
                        </h3>
                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 space-y-8">
                            {application.activityLogs.map((log, idx) => (
                                <div key={idx} className="flex gap-6 relative">
                                    {idx < application.activityLogs.length - 1 && (
                                        <div className="absolute left-[11px] top-4 bottom-[-32px] w-[2px] bg-slate-50 dark:bg-slate-800" />
                                    )}
                                    <div className="w-6 h-6 rounded-full bg-slate-50 dark:bg-slate-800 border-4 border-white dark:border-slate-900 flex items-center justify-center shrink-0 z-10 transition-all hover:scale-125">
                                        <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <p className="text-xs font-black text-black dark:text-white uppercase tracking-tight">
                                                {log.action}
                                            </p>
                                            <span className="text-[9px] font-bold text-slate-400">
                                                {new Date(log.createdAt).toLocaleString('tr-TR')}
                                            </span>
                                        </div>
                                        <p className="text-[13px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                            {log.details}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Documents & Contact */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Documents Summary */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                <FileText size={16} />
                                BELGELER
                            </h3>
                            <Link href="/dashboard/student/documents" className="text-[10px] font-black text-[var(--primary)] uppercase hover:underline">TÜMÜ</Link>
                        </div>
                        <div className="space-y-3">
                            {application.documents.slice(0, 3).map((doc) => (
                                <div key={doc.id} className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <p className="text-xs font-bold truncate max-w-[120px]">{doc.name}</p>
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                                        doc.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                    }`}>
                                        {doc.status}
                                    </span>
                                </div>
                            ))}
                            {application.documents.length === 0 && (
                                <p className="text-xs italic opacity-50">Henüz belge eklenmemiş.</p>
                            )}
                        </div>
                        <Link 
                            href="/dashboard/student/documents"
                            className="w-full py-4 bg-slate-900 dark:bg-[var(--primary)] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                        >
                            BELGE EKLE
                        </Link>
                    </div>

                    {/* Support Contact */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden group">
                        <div className="absolute right-[-10%] bottom-[-10%] opacity-10 group-hover:scale-125 transition-transform duration-1000">
                            <MessageSquare size={140} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-black mb-2 tracking-tighter">Danışmanına Sor</h3>
                            <p className="text-xs font-medium text-blue-100 mb-6 leading-relaxed">
                                Sürecinle ilgili her türlü soruyu danışmanına buradan sorabilirsin.
                            </p>
                            <Link 
                                href="/dashboard/messages"
                                className="w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-xs font-black block text-center uppercase tracking-widest transition-all"
                            >
                                MESAJ GÖNDER
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
