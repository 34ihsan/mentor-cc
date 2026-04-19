
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAgencyStudentDetailAction } from "@/app/actions/agency-actions";
import { 
    FileText, 
    Upload, 
    CheckCircle2, 
    AlertCircle, 
    Clock, 
    ArrowLeft,
    Shield
} from "lucide-react";
import Link from "next/link";
import AgencyDocumentUploadZone from "@/components/agency/AgencyDocumentUploadZone";

export default async function AgencyStudentDocumentsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth();
    if (!session || session.user.role !== "AGENCY_MANAGER") {
        redirect("/dashboard");
    }

    const student = await getAgencyStudentDetailAction(id);

    if (!student) {
        redirect("/dashboard/agency");
    }

    return (
        <div className="space-y-10 pb-20 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <Link href={`/dashboard/agency/students/${id}`} className="text-xs font-black text-[var(--primary)] uppercase tracking-widest flex items-center gap-1 mb-4 hover:opacity-70 transition-all">
                    <ArrowLeft size={14} /> {student.name} Dosyasına Dön
                </Link>
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl flex items-center justify-center text-[var(--primary)]">
                        <FileText size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                            Belge Havuzu 📁
                        </h1>
                        <p className="text-slate-500 font-bold mt-2">
                            Öğrencinin tüm başvuruları için gerekli evrakları buradan yükleyebilir ve takip edebilirsiniz.
                        </p>
                    </div>
                </div>
            </div>

            {student.asStudent.length === 0 ? (
                <div className="p-20 text-center border-2 border-dashed border-slate-100 rounded-[40px] opacity-40">
                    <Shield size={48} className="mx-auto mb-4" />
                    <p className="font-black uppercase tracking-widest text-sm">Belge yüklemek için önce bir başvuru başlatmalısınız</p>
                    <Link href={`/dashboard/agency/students/${student.id}/applications/new`} className="mt-4 inline-block text-[var(--primary)] font-black text-[10px] uppercase tracking-widest hover:underline">Şimdi Başvuru Başlat</Link>
                </div>
            ) : (
                <div className="space-y-16">
                    {student.asStudent.map((app) => (
                        <div key={app.id} className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="px-6 py-3 rounded-2xl bg-slate-900 text-white shadow-xl">
                                    <h2 className="text-xs font-black uppercase tracking-tight">
                                        {app.program.name}
                                    </h2>
                                    <p className="text-[9px] text-white/50 font-bold uppercase tracking-widest mt-0.5">
                                        {app.program.institution.name}
                                    </p>
                                </div>
                                <div className="h-[1px] flex-1 bg-slate-100" />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                {/* Upload Zone */}
                                <div className="lg:col-span-2">
                                    <AgencyDocumentUploadZone applicationId={app.id} studentId={student.id} />
                                </div>

                                {/* Current Documents Status */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-2">
                                        <Clock size={12} />
                                        YÜKLENEN BELGELER
                                    </h3>
                                    <div className="glass-card p-6 border-white shadow-xl space-y-4">
                                        {app.documents.length === 0 ? (
                                            <p className="text-[11px] italic opacity-40 py-6 text-center">Henüz belge bulunmuyor.</p>
                                        ) : (
                                            app.documents.map((doc) => (
                                                <div key={doc.id} className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 shadow-sm group hover:border-[var(--primary)]/30 transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`p-2.5 rounded-xl ${
                                                            doc.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' :
                                                            doc.status === 'REJECTED' ? 'bg-rose-50 text-rose-600' :
                                                            'bg-amber-50 text-amber-600'
                                                        }`}>
                                                            {doc.status === 'APPROVED' ? <CheckCircle2 size={18} /> : 
                                                             doc.status === 'REJECTED' ? <AlertCircle size={18} /> : 
                                                             <Clock size={18} />}
                                                        </div>
                                                        <div>
                                                            <p className="text-[11px] font-black truncate max-w-[140px] text-slate-900">{doc.name}</p>
                                                            <p className="text-[9px] font-bold uppercase text-slate-400">{doc.status}</p>
                                                        </div>
                                                    </div>
                                                    <Link href={doc.url} target="_blank" className="p-2 hover:bg-slate-50 rounded-xl transition-all">
                                                        <Upload size={16} className="rotate-180 text-slate-300 group-hover:text-[var(--primary)]" />
                                                    </Link>
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
