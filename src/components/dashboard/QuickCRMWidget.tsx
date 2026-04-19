import Link from "next/link";
import { Users, Search, ArrowRight, UserCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export default async function QuickCRMWidget() {
    const session = await auth();
    if (!session) return null;

    const role = session.user.role;
    const userId = session.user.id;

    if (role === "STUDENT" || role === "AGENCY_MANAGER") return null;

    // Get recently active students
    let students: any[] = [];
    try {
        if (role === "ADVISOR") {
            // Find students connected to this advisor's applications
            const apps = await prisma.application.findMany({
                where: { consultantId: userId },
                select: { studentId: true },
                distinct: ['studentId']
            });
            const studentIds = apps.map(a => a.studentId);
            
            students = await prisma.user.findMany({
                where: { id: { in: studentIds } },
                take: 6,
                orderBy: { updatedAt: 'desc' },
                include: {
                    asStudent: {
                        select: { id: true, status: true },
                        take: 1
                    }
                }
            });
        } else {
            // ADMIN / CEO sees all latest students
            students = await prisma.user.findMany({
                where: { role: "STUDENT" },
                take: 6,
                orderBy: { updatedAt: 'desc' },
                include: {
                    asStudent: {
                        select: { id: true, status: true },
                        take: 1
                    }
                }
            });
        }
    } catch (e) {
        console.error("Failed to load students for widget", e);
    }

    return (
        <div className="premium-card p-10 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8 border-b border-zinc-50 pb-6">
                <div>
                    <span className="text-[9px] font-black text-secondary uppercase tracking-[0.3em] mb-1 block">Müşteri İlişkileri</span>
                    <h3 className="text-lg font-serif font-bold italic text-primary flex items-center gap-3">
                        <Users size={18} className="text-secondary" />
                        Öğrenci Yönetimi
                    </h3>
                </div>
                <Link href="/dashboard/users" className="w-8 h-8 rounded-full border border-zinc-100 bg-white flex items-center justify-center hover:bg-secondary hover:text-white transition-all shadow-sm">
                    <ArrowRight size={14} />
                </Link>
            </div>

            <div className="space-y-2 mb-8 flex-1">
                {students.map(student => (
                    <Link key={student.id} href={`/dashboard/users/${student.id}`} className="group block">
                        <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-zinc-50 transition-all border border-transparent hover:border-zinc-100">
                            <div className="w-12 h-12 rounded-lg border border-zinc-100 bg-white flex items-center justify-center text-zinc-300 group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all duration-500 shadow-sm">
                                <UserCircle2 size={24} strokeWidth={1.5} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-serif font-bold italic text-primary truncate">{student.name || "İsimsiz"}</p>
                                <p className="text-[9px] font-mono font-bold text-zinc-400 truncate uppercase mt-0.5">{student.email}</p>
                            </div>
                            {student.asStudent && student.asStudent.length > 0 && (
                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                                    student.asStudent[0].status === 'COMPLETED' 
                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                    : 'bg-zinc-50 text-zinc-500 border-zinc-100'
                                }`}>
                                    {student.asStudent[0].status === 'COMPLETED' ? 'Bitti' : 'Aktif'}
                                </span>
                            )}
                        </div>
                    </Link>
                ))}
                {students.length === 0 && (
                    <div className="text-center py-12 opacity-20 flex flex-col items-center justify-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-dashed border-zinc-300" />
                        <p className="text-[9px] font-black uppercase tracking-widest">Kayıt Bulunmamakta</p>
                    </div>
                )}
            </div>

            <Link href="/dashboard/users" className="w-full btn-primary py-4 text-[10px] uppercase tracking-widest relative overflow-hidden group">
                 TÜM ÖĞRENCİLERİ GÖR
                 <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
        </div>
    );
}
