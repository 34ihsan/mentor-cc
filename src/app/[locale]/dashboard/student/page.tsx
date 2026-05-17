
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getStudentApplicationsAction } from "@/app/actions/student-actions";
import { 
    Briefcase, 
    Calendar, 
    CheckCircle, 
    Clock, 
    FileText, 
    GraduationCap, 
    LayoutDashboard, 
    Plus,
    ChevronRight,
    Search
} from "lucide-react";
import Link from "next/link";
import ProcessTracker from "@/components/dashboard/ProcessTracker";

export default async function StudentDashboard() {
    const session = await auth();
    if (!session?.user || session.user.role !== "STUDENT") {
        redirect("/login");
    }

    const applications = await getStudentApplicationsAction();

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header section with welcome */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold italic text-primary tracking-tight leading-none mb-2">
                        Merhaba, {session.user.name?.split(' ')[0]} 👋
                    </h1>
                    <p className="text-zinc-500 font-medium text-sm">
                        Eğitim yolculuğun için tüm adımları buradan takip edebilirsin.
                    </p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="premium-card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                        <GraduationCap size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">BAŞVURU</p>
                        <p className="text-2xl font-serif font-bold italic text-primary">{applications.length}</p>
                    </div>
                </div>
                <div className="premium-card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                        <FileText size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">BELGE</p>
                        <p className="text-2xl font-serif font-bold italic text-primary">
                            {applications.reduce((acc, app) => acc + app.documents.length, 0)}
                        </p>
                    </div>
                </div>
                <Link href="/dashboard/visa-tracking" className="premium-card p-6 flex items-center gap-4 hover:border-secondary transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">VİZE TAKİBİ</p>
                        <p className="text-2xl font-serif font-bold italic text-primary group-hover:text-secondary transition-all">Süreç İzle</p>
                    </div>
                </Link>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="section-label mb-0">AKTİF BAŞVURULARIM</h3>
                    <Link href="/services" className="text-xs font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1">
                        Yeni Başvuru Ara <Plus size={12} />
                    </Link>
                </div>

                {applications.length === 0 ? (
                    <div className="p-12 text-center border-2 border-dashed border-zinc-200 rounded-[var(--radius-premium)] text-zinc-500">
                        <LayoutDashboard size={48} className="mx-auto mb-4 opacity-30" />
                        <p className="font-bold text-primary">Henüz bir başvurunuz bulunmuyor.</p>
                        <p className="text-sm mt-2">Hayallerindeki eğitimi bulmak için hemen araştırmaya başla.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {applications.map((app) => (
                            <div key={app.id} className="premium-card group p-6 hover:border-secondary transition-all flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="w-16 h-16 rounded-2xl bg-zinc-50 flex items-center justify-center overflow-hidden border border-zinc-100">
                                        {app.program.institution.logo ? (
                                            <img src={app.program.institution.logo} alt={app.program.institution.name} className="w-full h-full object-contain p-2" />
                                        ) : (
                                            <GraduationCap className="opacity-20 text-primary" size={32} />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-serif font-bold text-primary leading-tight mb-1">
                                            {app.program.name}
                                        </h4>
                                        <p className="text-sm font-medium text-zinc-500 flex items-center gap-2">
                                            {app.program.institution.name}
                                        </p>
                                    </div>
                                </div>

                                {/* Process Tracker Integration */}
                                <div className="hidden md:block flex-[2] px-8">
                                    <ProcessTracker status={app.status as any} />
                                </div>

                                <div className="flex flex-col items-center md:items-end gap-2 w-full md:w-auto shrink-0">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                                        app.status === 'COMPLETED' ? 'bg-emerald-500 text-white' :
                                        app.status === 'UNDER_REVIEW' ? 'bg-secondary text-white' :
                                        'bg-primary text-white'
                                    }`}>
                                        {app.status}
                                    </span>
                                    <Link 
                                        href={`/dashboard/student/applications/${app.id}`}
                                        className="text-xs font-bold uppercase tracking-widest text-secondary group-hover:text-primary transition-all flex items-center gap-1"
                                    >
                                        Detayları Gör <ChevronRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Notifications / Activity Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                <div className="space-y-4">
                    <h3 className="section-label mb-0">SON HAREKETLER</h3>
                    <div className="premium-card p-6 space-y-6">
                        {applications.flatMap(app => app.activityLogs).length === 0 ? (
                            <p className="text-sm italic opacity-50 px-4 text-zinc-500">Henüz hareket kaydı bulunmuyor.</p>
                        ) : (
                            applications.flatMap(app => app.activityLogs)
                                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                .slice(0, 5)
                                .map((log, idx) => (
                                    <div key={idx} className="flex gap-4 relative">
                                        {idx < 4 && (
                                            <div className="absolute left-2.5 top-6 bottom-[-24px] w-[1px] bg-zinc-200" />
                                        )}
                                        <div className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 z-10 border border-white">
                                            <div className="w-2 h-2 rounded-full bg-secondary" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-primary">
                                                {log.action}
                                            </p>
                                            <p className="text-[11px] text-zinc-500">
                                                {log.details}
                                            </p>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
                                                {new Date(log.createdAt).toLocaleDateString('tr-TR')}
                                            </p>
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="section-label mb-0">BELGE DURUMU</h3>
                    <div className="premium-card p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <p className="text-sm font-bold text-primary">Gerekli Tüm Belgeler</p>
                                <p className="text-xs text-zinc-500">Dosyanızın %65'i tamamlandı.</p>
                            </div>
                            <span className="text-xl font-serif italic font-bold text-secondary">%65</span>
                        </div>
                        <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden mb-6">
                            <div className="h-full bg-secondary w-[65%]" />
                        </div>
                        <Link 
                            href="/dashboard/student/documents"
                            className="w-full py-4 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-primary border border-zinc-200"
                        >
                            Belgeleri Yönet <ChevronRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
