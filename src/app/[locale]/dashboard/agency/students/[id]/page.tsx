
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAgencyStudentDetailAction } from "@/app/actions/agency-actions";
import { 
    ArrowLeft, 
    User, 
    Mail, 
    Calendar, 
    FileText, 
    GraduationCap, 
    Plus,
    ChevronRight,
    Clock,
    Activity
} from "lucide-react";
import Link from "next/link";
import ApplicationActions from "@/components/dashboard/agency/ApplicationActions";
import { revalidatePath } from "next/cache";

export default async function AgencyStudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
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
        <div className="space-y-10 pb-12 animate-in fade-in duration-500">
            {/* Header / Profile Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl flex items-center justify-center text-[var(--primary)] text-3xl font-black">
                        {student.name?.charAt(0)}
                    </div>
                    <div>
                        <Link href="/dashboard/agency" className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest flex items-center gap-1 mb-2 hover:opacity-70 transition-all">
                            <ArrowLeft size={12} /> ÖĞRENCİ LİSTESİNE DÖN
                        </Link>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">
                            {student.name}
                        </h1>
                        <div className="flex items-center gap-4 text-slate-500 font-bold text-sm">
                            <span className="flex items-center gap-1.5"><Mail size={14} /> {student.email}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                            <span className="flex items-center gap-1.5"><Calendar size={14} /> Kayıt: {new Date(student.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link 
                        href={`/dashboard/agency/students/${student.id}/applications/new`}
                        className="premium-btn flex items-center gap-2 px-6 py-3 shadow-xl shadow-blue-900/10"
                    >
                        <Plus size={18} />
                        <span className="font-black h-fit uppercase tracking-widest text-[10px]">YENİ BAŞVURU BAŞLAT</span>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Content - Applications */}
                <div className="lg:col-span-8 space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1">
                        <GraduationCap size={16} />
                        ÖĞRENCİ BAŞVURULARI
                    </h3>

                    <div className="space-y-4">
                        {student.asStudent.length === 0 ? (
                            <div className="p-20 text-center border-2 border-dashed border-slate-100 rounded-[40px] opacity-40">
                                <Activity size={48} className="mx-auto mb-4" />
                                <p className="font-black uppercase tracking-widest">Henüz başvuru bulunmuyor</p>
                            </div>
                        ) : (
                            student.asStudent.map((app) => (
                                <div key={app.id} className="glass-card p-8 border-white hover:border-[var(--primary)]/30 transition-all group flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="flex items-center gap-6 flex-1">
                                        <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-700">
                                            {app.program.institution.logo ? (
                                                <img src={app.program.institution.logo} alt={app.program.institution.name} className="w-full h-full object-contain p-2" />
                                            ) : (
                                                <GraduationCap className="opacity-20" size={32} />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black text-slate-900 leading-tight mb-1">{app.program.name}</h4>
                                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">{app.program.institution.name}</p>
                                        </div>
                                    </div>

                                    <ApplicationActions 
                                        applicationId={app.id} 
                                        currentStatus={app.status} 
                                        onUpdate={async () => {
                                            "use server";
                                            revalidatePath(`/dashboard/agency/students/${id}`);
                                        }}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Sidebar - Quick Info & Docs */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Document Overview */}
                    <div className="glass-card p-8 border-white shadow-2xl shadow-blue-900/5">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                                <FileText size={16} className="text-blue-500" />
                                BELGE HAVUZU
                            </h3>
                            <Link href={`/dashboard/agency/students/${student.id}/documents`} className="text-[10px] font-black text-[var(--primary)] uppercase hover:underline">TÜMÜ</Link>
                        </div>

                        <div className="space-y-4">
                            {student.asStudent.flatMap(a => a.documents).slice(0, 5).map((doc) => (
                                <div key={doc.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-blue-500">
                                            <FileText size={14} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black truncate max-w-[120px]">{doc.name}</p>
                                            <p className="text-[8px] font-bold text-slate-400 uppercase">{doc.status}</p>
                                        </div>
                                    </div>
                                    <Link href={doc.url} target="_blank" className="p-2 hover:bg-white rounded-lg transition-all">
                                        <ChevronRight size={14} className="opacity-30" />
                                    </Link>
                                </div>
                            ))}
                            {student.asStudent.flatMap(a => a.documents).length === 0 && (
                                <p className="text-[11px] text-slate-400 italic text-center py-4">Henüz belge yüklenmemiş.</p>
                            )}
                        </div>

                        <Link 
                            href={`/dashboard/agency/students/${student.id}/documents`}
                            className="w-full mt-6 py-4 bg-slate-900 dark:bg-[var(--primary)] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                        >
                            BELGELERİ YÖNET
                        </Link>
                    </div>

                    {/* Quick Stats Summary */}
                    <div className="p-8 rounded-[40px] bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden group shadow-2xl">
                         <div className="absolute right-[-10%] bottom-[-10%] opacity-10 group-hover:scale-125 transition-transform duration-1000">
                            <Activity size={120} />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-widest opacity-60">İŞLEM ÖZETİ</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span className="opacity-50">Toplam Başvuru</span>
                                    <span>{student.asStudent.length}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span className="opacity-50">Yüklenen Belge</span>
                                    <span>{student.asStudent.flatMap(a => a.documents).length}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span className="opacity-50">Mesajlaşma</span>
                                    <span>0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
