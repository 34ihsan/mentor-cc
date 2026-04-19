
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { 
    Users, 
    UserPlus, 
    Search, 
    ChevronRight, 
    GraduationCap, 
    Clock, 
    ArrowUpRight,
    Zap,
    Activity
} from "lucide-react";
import { getAgencyStudentsAction, getAgencyActivitiesAction } from "@/app/actions/agency-actions";
import Link from "next/link";
import RecentMessagesWidget from "@/components/dashboard/RecentMessagesWidget";

export default async function AgencyDashboardPage() {
    const session = await auth();
    if (!session || session.user.role !== "AGENCY_MANAGER") {
        redirect("/dashboard");
    }

    const students = await getAgencyStudentsAction();
    const activities = await getAgencyActivitiesAction();

    return (
        <div className="space-y-10 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest mb-2">
                        <Zap size={12} />
                        Acenta Yönetim Paneli
                    </div>
                    <h1 className="text-4xl font-serif italic text-secondary mb-2">
                        Öğrenci Portföyü
                    </h1>
                    <p className="text-zinc-500 font-medium">
                        Yönetiminizdeki öğrencileri ve aktif süreçleri buradan takip edebilirsiniz.
                    </p>
                </div>

                <Link 
                    href="/dashboard/agency/students/new" 
                    className="premium-btn flex items-center gap-2 px-8 py-4 shadow-xl shadow-blue-900/10"
                >
                    <UserPlus size={18} />
                    <span className="font-black h-fit uppercase tracking-widest text-[10px]">YENİ ÖĞRENCİ KAYDET</span>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="premium-card p-8 group hover:shadow-xl transition-all duration-500">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">TOPLAM ÖĞRENCİ</p>
                    <h3 className="text-4xl font-black text-primary">{students.length}</h3>
                </div>
                <div className="premium-card p-8 group hover:shadow-xl transition-all duration-500">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">AKTİF BAŞVURULAR</p>
                    <h3 className="text-4xl font-black text-blue-600">
                        {students.reduce((acc, s) => acc + s.asStudent.length, 0)}
                    </h3>
                </div>
                <div className="premium-card p-8 group hover:shadow-xl transition-all duration-500">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">BEKLEYEN İŞLEMLER</p>
                    <h3 className="text-4xl font-black text-accent">
                        {students.reduce((acc, s) => acc + s.asStudent.filter(a => a.status === 'DOCS_PENDING').length, 0)}
                    </h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Students List - Left 2/3 */}
                <div className="lg:col-span-2 premium-card h-fit overflow-hidden">
                    <div className="p-8 border-b border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <h3 className="font-serif italic text-lg text-secondary flex items-center gap-2">
                            <Users size={16} className="text-primary" />
                            Kayıtlı Öğrenciler
                        </h3>
                        <div className="relative w-full sm:w-auto">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input 
                                type="text" 
                                placeholder="Öğrenci ara..."
                                className="w-full sm:w-64 bg-zinc-50 border border-zinc-100 text-[10px] font-bold uppercase tracking-widest px-10 py-2 rounded-xl focus:outline-none focus:border-primary transition-all text-primary"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-zinc-50/50">
                                    <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-100">ÖĞRENCİ</th>
                                    <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-100">AKTİF BAŞVURULAR</th>
                                    <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-100 text-right">EYLEM</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-50">
                                {students.map((student) => (
                                    <tr key={student.id} className="group hover:bg-zinc-50/50 transition-all">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="min-w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black">
                                                    {student.name?.charAt(0)}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold text-primary">{student.name}</p>
                                                    <p className="text-[10px] font-medium text-zinc-400">{student.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-wrap gap-2">
                                                {student.asStudent.length === 0 ? (
                                                    <span className="text-[10px] font-bold text-zinc-300 uppercase">BAŞVURU YOK</span>
                                                ) : (
                                                    student.asStudent.slice(0, 2).map((app) => (
                                                        <span key={app.id} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-tight">
                                                            {app.program.name.slice(0, 15)}...
                                                        </span>
                                                    ))
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <Link 
                                                href={`/dashboard/agency/students/${student.id}`}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-100 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-all shadow-sm"
                                            >
                                                YÖNET <ChevronRight size={14} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column (Activities & Messages) */}
                <div className="space-y-8">
                    {/* Recent Activities */}
                    <div className="premium-card overflow-hidden h-fit">
                        <div className="p-8 border-b border-zinc-100">
                            <h3 className="font-serif italic text-lg flex items-center gap-2 text-secondary">
                                <Activity size={16} className="text-blue-500" />
                                Son Hareketler
                            </h3>
                        </div>
                        <div className="p-6 space-y-6">
                            {activities.length === 0 ? (
                                <p className="text-[10px] font-bold text-zinc-400 text-center py-8 uppercase tracking-widest">
                                    Henüz bir hareket yok
                                </p>
                            ) : (
                                activities.map((activity) => (
                                    <div key={activity.id} className="flex gap-4 group">
                                        <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0 group-hover:scale-150 transition-transform" />
                                        <div className="space-y-1">
                                            <p className="text-[11px] font-medium text-primary leading-tight">
                                                {activity.details}
                                            </p>
                                            <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-400 uppercase tracking-tight">
                                                <span className="text-blue-600">{activity.application.student.name}</span>
                                                <span>•</span>
                                                <div className="flex items-center gap-1">
                                                    <Clock size={10} />
                                                    {new Date(activity.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="p-6 bg-zinc-50/50 border-t border-zinc-100">
                            <Link 
                                href="/dashboard/agency/activities" 
                                className="text-[10px] font-bold text-zinc-400 hover:text-primary uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                            >
                                TÜM HAREKETLER <ArrowUpRight size={12} />
                            </Link>
                        </div>
                    </div>

                    {/* Recent Messages Widget */}
                    <RecentMessagesWidget />
                </div>
            </div>
        </div>
    );
}
