
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
    ArrowLeft,
    ListChecks,
    XCircle
} from "lucide-react";
import Link from "next/link";
import DocumentUploadZone from "@/components/student/DocumentUploadZone";
import { getRequiredDocuments, checkDocumentStatus } from "@/lib/utils/document-utils";

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
                    {applications.map((app) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const typedApp = app as any;
                        const requiredDocs = getRequiredDocuments(
                            typedApp.program.category, 
                            typedApp.program.institution.country?.slug, 
                            typedApp.program.institution.service?.slug
                        );

                        return (
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

                                {/* Required Documents Checklist */}
                                <div className="bg-slate-50 dark:bg-slate-800/30 rounded-3xl p-6 border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="p-2 rounded-xl bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20">
                                            <ListChecks size={18} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-black dark:text-white uppercase tracking-tight">Gerekli Evrak Listesi</h3>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kurum ve Program Standartları</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {requiredDocs.map((req, idx) => {
                                            const status = checkDocumentStatus(req, app.documents);
                                            return (
                                                <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                                                    <div className={`p-1.5 rounded-lg ${
                                                        status === 'APPROVED' ? 'bg-emerald-100 text-emerald-600' :
                                                        status === 'PENDING' ? 'bg-amber-100 text-amber-600' :
                                                        status === 'REJECTED' ? 'bg-rose-100 text-rose-600' :
                                                        'bg-slate-100 text-slate-400'
                                                    }`}>
                                                        {status === 'APPROVED' ? <CheckCircle2 size={14} /> : 
                                                         status === 'PENDING' ? <Clock size={14} /> : 
                                                         status === 'REJECTED' ? <AlertCircle size={14} /> : 
                                                         <XCircle size={14} />}
                                                    </div>
                                                    <span className={`text-[11px] font-bold truncate ${
                                                        status === 'MISSING' ? 'text-slate-400' : 'text-slate-900 dark:text-white'
                                                    }`}>
                                                        {req}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Upload Zone */}
                                    <div className="lg:col-span-2">
                                        <DocumentUploadZone applicationId={app.id} requiredDocs={requiredDocs} />
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
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs font-black truncate">{doc.name}</p>
                                                                <div className="flex items-center gap-2">
                                                                    <p className="text-[9px] font-bold uppercase opacity-50">{doc.status}</p>
                                                                    {doc.status === 'REJECTED' && doc.rejectionReason && (
                                                                        <span className="text-[9px] font-black text-rose-500 uppercase tracking-tighter">
                                                                            • {doc.rejectionReason}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <a href={doc.url} target="_blank" className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all flex-shrink-0">
                                                            <Upload size={14} className="rotate-180 opacity-50" />
                                                        </a>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
