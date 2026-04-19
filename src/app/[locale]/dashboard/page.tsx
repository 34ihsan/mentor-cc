import { auth } from "@/auth";
import { redirect } from "next/navigation";
import StatsCard from "@/components/dashboard/StatsCard";
import ApplicationFeed from "@/components/dashboard/ApplicationFeed";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
    Sparkles,
    ArrowUpRight,
    MessageSquare,
    Zap,
    UserPlus,
    Target,
    LayoutDashboard,
    Compass,
} from "lucide-react";
import JourneyTimeline from "@/components/dashboard/JourneyTimeline";
import ManagerCommandCenter from "@/components/application/ManagerCommandCenter";
import QuickCRMWidget from "@/components/dashboard/QuickCRMWidget";
import RecentMessagesWidget from "@/components/dashboard/RecentMessagesWidget";
import AdminQuickActions from "@/components/dashboard/AdminQuickActions";
import AgencyOverview from "@/components/dashboard/AgencyOverview";
import CEOOverview from "@/components/dashboard/CEOOverview";

export default async function DashboardPage() {
    const session = await auth();
    const role = session?.user?.role as string;
    const userId = session?.user.id;

    if (role === "STUDENT") {
        redirect("/dashboard/student");
    }

    // Role-specific specialized views that take over the layout
    if (role === "CEO") {
        return <CEOOverview />;
    }

    if (role === "AGENCY_MANAGER") {
        return <AgencyOverview />;
    }

    // Default Grid/Admin/Advisor View
    let statsData = { total: 0, pending: 0, completed: 0, growth: "+12%" };
    const where: any = {};

    try {
        if (role === "ADMIN") {
            // Global view
        } else if (role === "ADVISOR") {
            where.consultantId = userId;
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

    // Fetch recent applications for the feed
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Workflow Registry */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="premium-card overflow-hidden">
                        <div className="p-8 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-primary flex items-center gap-3">
                                    <Zap size={18} className="text-secondary" />
                                    Canlı Akış & Aktivite Günlüğü
                                </h3>
                            </div>
                            <Link href="/dashboard/applications" className="text-[10px] font-black text-secondary hover:text-primary uppercase tracking-widest transition-colors flex items-center gap-2 group">
                                TÜMÜNÜ GÖR
                                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </div>
                        <div className="p-4">
                            <ApplicationFeed initialData={recentApplications} />
                        </div>
                    </div>
                </div>

                {/* Sidebar Actions & Shortcuts */}
                <div className="lg:col-span-4 space-y-10">
                     <>
                        {(role === "ADMIN") && <AdminQuickActions />}
                        <RecentMessagesWidget />
                        <QuickCRMWidget />
                    </>
                </div>
            </div>
        </div>
    );
}
