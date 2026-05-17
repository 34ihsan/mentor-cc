import { auth } from "@/auth";
import { redirect } from "next/navigation";
import NextLink from "next/link";
import { getLocale } from "next-intl/server";
import StatsCard from "@/components/dashboard/StatsCard";
import ApplicationFeed from "@/components/dashboard/ApplicationFeed";
import { prisma } from "@/lib/prisma";
import {
    Sparkles,
    ArrowUpRight,
    MessageSquare,
    Zap,
    UserPlus,
    Target,
    LayoutDashboard,
    Compass,
    Mail
} from "lucide-react";
import JourneyTimeline from "@/components/dashboard/JourneyTimeline";
import ManagerCommandCenter from "@/components/application/ManagerCommandCenter";
import QuickCRMWidget from "@/components/dashboard/QuickCRMWidget";
import RecentMessagesWidget from "@/components/dashboard/RecentMessagesWidget";
import AdminQuickActions from "@/components/dashboard/AdminQuickActions";

export default async function DashboardPage() {
    const session = await auth();
    const role = session?.user?.role as string;
    const userId = session?.user.id;

    const locale = await getLocale();

    if (role === "ADMIN") redirect(`/${locale}/dashboard/admin`);
    if (role === "CEO") redirect(`/${locale}/dashboard/ceo`);
    if (role === "ADVISOR") redirect(`/${locale}/dashboard/advisor`);
    if (role === "AGENCY_MANAGER") redirect(`/${locale}/dashboard/agency`);
    if (role === "STUDENT") redirect(`/${locale}/dashboard/student`);

    // Fallback logic if any role slips through
    let statsData = { total: 0, pending: 0, completed: 0, growth: "+12%" };
    const where: any = {};

    try {
        if (role === "ADMIN") {
            // Global view
        } else if (role === "CEO") {
            // Strategic view
        } else if (role === "ADVISOR") {
            where.consultantId = userId;
        } else if (role === "AGENCY_MANAGER") {
            where.agencyId = userId;
        } else {
            where.studentId = userId;
        }

        const [t, p, c, m] = await Promise.all([
            prisma.application.count({ where }),
            prisma.application.count({ where: { ...where, status: "DOCS_PENDING" } }),
            prisma.application.count({ where: { ...where, status: "COMPLETED" } }),
            prisma.message.count({ where: { receiverId: userId } }),
        ]);
        statsData = { ...statsData, total: t, pending: p, completed: c };
        (statsData as any).messages = m;
    } catch (e) {
        console.error("Stats fetch error:", e);
    }

    const recentApplications = await prisma.application.findMany({
        where,
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
            student: true,
            program: {
                include: { institution: true }
            }
        }
    });

    const stats = [
        { label: "Aktif Süreçler", value: statsData.total.toString(), trend: "+12% artış", icon: "file" },
        { label: "Bekleyen Eylemler", value: statsData.pending.toString(), trend: "Acil", icon: "docs" },
        { label: "Mesajlar", value: (statsData as any).messages?.toString() || "0", trend: "Yeni", icon: "msg" },
        { label: "Başarı Oranı", value: statsData.total > 0 ? `%${Math.round((statsData.completed / statsData.total) * 100)}` : "%0", trend: "Mükemmel", icon: "check" },
    ];

    return (
        <div className="space-y-12 pb-12">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2.5 text-secondary font-black text-[10px] uppercase tracking-[0.4em] mb-3">
                        <div className="w-8 h-px bg-secondary opacity-30" />
                        <Sparkles size={12} className="text-secondary/60" />
                        Dijital Operasyon Merkezi
                    </div>
                    <h1 className="text-5xl font-serif font-bold italic tracking-tight text-primary flex items-center gap-4">
                        Merhaba, {session?.user.name?.split(' ')[0]}
                        <span className="text-3xl animate-bounce-subtle">👋</span>
                    </h1>
                    <p className="text-zinc-500 font-serif italic text-lg mt-3 border-l-2 border-secondary/20 pl-6">
                        Bugün sistemde <span className="text-primary font-bold">{statsData.pending}</span> bekleyen işleminiz bulunmaktadır.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block bg-zinc-50 border border-zinc-100 rounded-xl px-5 py-3">
                        <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">Sistem Durumu</p>
                        <p className="text-xs font-bold text-emerald-600 flex items-center justify-end gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Operasyonel
                        </p>
                    </div>
                </div>
            </div>

            {/* Elite Manager Command Center */}
            {(role === "CEO" || role === "ADMIN") && (
                <div className="animate-reveal">
                    <ManagerCommandCenter />
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <StatsCard key={stat.label} {...stat} />
                ))}
            </div>

            {/* Student Journey Timeline */}
            {role === "STUDENT" && recentApplications.length > 0 && (
                <div className="premium-card p-12 overflow-hidden relative group">
                    <div className="flex items-center justify-between mb-12 border-b border-zinc-50 pb-8">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-secondary font-black mb-2 flex items-center gap-2">
                                <Compass size={14} className="text-secondary/60" /> Görev Kontrol
                            </span>
                            <h3 className="text-2xl font-serif font-bold text-primary italic">Yurtdışı Yolculuğun</h3>
                        </div>
                        <div className="bg-primary/5 px-5 py-2 rounded-lg border border-primary/10">
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                                {recentApplications[0].program.name}
                            </span>
                        </div>
                    </div>
                    <JourneyTimeline status={recentApplications[0].status} />
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-8">
                    <div className="premium-card overflow-hidden">
                        <div className="p-8 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-primary flex items-center gap-3">
                                    <Zap size={18} className="text-secondary" />
                                    Canlı Akış & Aktivite Günlüğü
                                </h3>
                            </div>
                            <NextLink href="/dashboard/applications" className="text-[10px] font-black text-secondary hover:text-primary uppercase tracking-widest transition-colors flex items-center gap-2 group">
                                TÜMÜNÜ GÖR
                                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </NextLink>
                        </div>
                        <div className="p-4">
                            <ApplicationFeed initialData={recentApplications} />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-10">
                    {(role === "STUDENT" || role === "AGENCY_MANAGER") ? (
                        <>
                            <div className="premium-card p-10 relative overflow-hidden group">
                                <div className="absolute -right-10 -top-10 w-32 h-32 bg-secondary/5 blur-3xl" />
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-8 flex items-center gap-3">
                                    <Target size={16} className="text-secondary" />
                                    Hızlı İŞLEMLER
                                </h3>
                                <div className="space-y-4">
                                    <NextLink href="/dashboard/applications/new" className="btn-primary w-full py-4 flex items-center justify-center gap-4 group/btn">
                                        <UserPlus size={18} />
                                        <span className="text-[10px] uppercase tracking-[0.2em] font-black">Yeni Başvuru Başlat</span>
                                    </NextLink>
                                    <NextLink href="/dashboard/messages" className="w-full py-4 flex items-center justify-center gap-4 border border-zinc-100 font-bold text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:bg-zinc-50 hover:text-primary transition-all duration-500">
                                        <MessageSquare size={18} />
                                        <span>Merkezi Mesajlaşma</span>
                                    </NextLink>
                                    <NextLink href="/dashboard/settings" className="w-full py-4 flex items-center justify-center gap-4 border border-dashed border-zinc-200 font-bold text-[9px] uppercase tracking-[0.2em] text-zinc-400 hover:text-primary hover:border-primary transition-all duration-500">
                                        <Compass size={16} />
                                        <span>Profil & Tercihler</span>
                                    </NextLink>
                                </div>
                            </div>
                            <div className="premium-card p-12 bg-primary text-white overflow-hidden relative group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-1000 grayscale">
                                    <LayoutDashboard size={140} strokeWidth={1} />
                                </div>
                                <div className="relative z-10 space-y-8">
                                    <div>
                                        <h3 className="text-2xl font-serif font-bold italic mb-4">Premium Destek</h3>
                                        <p className="text-[13px] text-zinc-400 leading-relaxed font-serif italic border-l border-secondary/30 pl-6">
                                            Süreçlerinizle ilgili yardıma mı ihtiyacınız var? Uzman ekibimiz saniyeler içinde yanınızda.
                                        </p>
                                    </div>
                                    <NextLink href="/dashboard/messages" className="btn-secondary w-full py-4 text-[10px] uppercase tracking-[0.4em] font-black">
                                        Destek Talebi Oluştur
                                    </NextLink>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {(role === "ADMIN" || role === "CEO") && <AdminQuickActions />}
                            <RecentMessagesWidget />
                            <QuickCRMWidget />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
