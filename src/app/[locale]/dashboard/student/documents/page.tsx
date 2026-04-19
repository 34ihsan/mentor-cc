
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getStudentApplicationsAction } from "@/app/actions/student-actions";
import { 
    FileText, 
    Upload, 
    CheckCircle2, 
    AlertCircle, 
    Clock, 
    ChevronRight,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import DocumentUploadZone from "@/components/student/DocumentUploadZone";

export default async function StudentDocumentsPage() {
    const session = await auth();
    if (!session?.user || session.user.role !== "STUDENT") {
        redirect("/login");
    }

    const applications = await getStudentApplicationsAction();

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Link href="/dashboard/student" className="text-xs font-black text-[var(--primary)] uppercase tracking-widest flex items-center gap-1 mb-4 hover:opacity-70 transition-all">
                        <ArrowLeft size={14} /> Geri Dön
                    </Link>
                    <h1 className="text-3xl font-black text-black dark:text-white tracking-tight leading-none">
                        Belge Merkezi 📁
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-2">
                        Başvuruların için gereken tüm evrakları buradan yönetebilirsin.
                    </p>
                </div>
            </div>

            {applications.length === 0 ? (
                <div className="p-12 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl opacity-50">
                    <FileText size={48} className="mx-auto mb-4" />
                    <p className="font-bold">Henüz aktif bir başvurunuz bulunmuyor.</p>
                </div>
            ) : (
                <div className="space-y-12">
                    {applications.map((app) => (
                        <div key={app.id} className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                                    <h2 className="text-sm font-black text-black dark:text-white uppercase tracking-tight">
                                        {app.program.name}
                                    </h2>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                                        {app.program.institution.name}
                                    </p>
                                </div>
                                <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800" />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Upload Zone */}
                                <div className="lg:col-span-2">
                                    <DocumentUploadZone applicationId={app.id} />
                                </div>

                                {/* Current Documents Status */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                        <Clock size={12} />
                                        YÜKLENEN BELGELER
                                    </h3>
                                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 space-y-4">
                                        {app.documents.length === 0 ? (
                                            <p className="text-xs italic opacity-50 py-4 text-center">Henüz belge yüklenmemiş.</p>
                                        ) : (
                                            app.documents.map((doc) => (
                                                <div key={doc.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded-xl ${
                                                            doc.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-600' :
                                                            doc.status === 'REJECTED' ? 'bg-rose-100 text-rose-600' :
                                                            'bg-amber-100 text-amber-600'
                                                        }`}>
                                                            {doc.status === 'APPROVED' ? <CheckCircle2 size={16} /> : 
                                                             doc.status === 'REJECTED' ? <AlertCircle size={16} /> : 
                                                             <Clock size={16} />}
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-black truncate max-w-[120px]">{doc.name}</p>
                                                            <p className="text-[9px] font-bold uppercase opacity-50">{doc.status}</p>
                                                        </div>
                                                    </div>
                                                    <a href={doc.url} target="_blank" className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all">
                                                        <Upload size={14} className="rotate-180 opacity-50" />
                                                    </a>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
