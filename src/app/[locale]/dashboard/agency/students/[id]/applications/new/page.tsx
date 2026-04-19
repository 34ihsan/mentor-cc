
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { 
    ArrowLeft, 
    GraduationCap, 
    Search, 
    ChevronRight, 
    MapPin, 
    School,
    Zap,
    Plus
} from "lucide-react";
import Link from "next/link";
import { getAgencyStudentDetailAction } from "@/app/actions/agency-actions";

export default async function AgencyNewStudentApplicationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth();
    if (!session || session.user.role !== "AGENCY_MANAGER") {
        redirect("/dashboard");
    }

    const student = await getAgencyStudentDetailAction(id);
    if (!student) redirect("/dashboard/agency");

    // Fetch all institutions for selection
    const institutions = await prisma.institution.findMany({
        where: { active: true },
        include: {
            country: true,
            programs: true
        }
    });

    return (
        <div className="space-y-10 pb-20 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <Link href={`/dashboard/agency/students/${student.id}`} className="text-xs font-black text-[var(--primary)] uppercase tracking-widest flex items-center gap-1 mb-4 hover:opacity-70 transition-all">
                    <ArrowLeft size={14} /> {student.name} Dosyasına Dön
                </Link>
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl flex items-center justify-center text-[var(--primary)]">
                        <Plus size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                            Yeni Başvuru Başlat 🎓
                        </h1>
                        <p className="text-slate-500 font-bold mt-2">
                             Öğrenciniz adına bir eğitim kurumu ve program seçerek süreci başlatın.
                        </p>
                    </div>
                </div>
            </div>

            {/* Program Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(institutions as any[]).map((inst: any) => (
                    <div key={inst.id} className="glass-card overflow-hidden border-white hover:border-[var(--primary)]/30 transition-all group flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                            <img 
                                src={inst.image || "https://images.unsplash.com/photo-1541339907198-e08756c83f2d?q=80&w=1500"} 
                                alt={inst.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-white p-1 shadow-lg">
                                    <img src={inst.logo || ""} alt="" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <h3 className="text-white text-sm font-black tracking-tight">{inst.name}</h3>
                                    <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                                        <MapPin size={8} /> {inst.city}, {inst.country?.name}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col space-y-4">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AKTİF PROGRAMLAR ({inst.programs?.length || 0})</h4>
                            <div className="space-y-1.5 flex-1">
                                {inst.programs?.slice(0, 3).map((prog: any) => (
                                    <div key={prog.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 transition-all group/item">
                                        <span className="text-[11px] font-bold text-slate-900">{prog.name}</span>
                                        <Link 
                                            href={`/dashboard/agency/students/${student.id}/applications/create?programId=${prog.id}`}
                                            className="text-[9px] font-black text-[var(--primary)] uppercase bg-white px-2 py-1 rounded-lg border border-slate-100 opacity-0 group-hover/item:opacity-100 transition-all"
                                        >
                                            SEÇ
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            
                            <Link 
                                href={`/dashboard/agency/students/${student.id}/programs?institutionId=${inst.id}`}
                                className="w-full py-4 rounded-2xl border border-dashed border-slate-200 text-slate-400 hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest"
                            >
                                <School size={14} /> TÜM PROGRAMLARI GÖR
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
