import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import ImpersonationBanner from "@/components/admin/ImpersonationBanner";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/auth/login");
    }

    return (
        <div className="flex bg-zinc-50 min-h-screen">
            <Sidebar role={session.user.role} user={session.user} />

            <main className="flex-1 ml-[280px] min-h-screen relative flex flex-col">
                {session.user.isImpersonating && (
                    <ImpersonationBanner userName={session.user.name || session.user.email || "Kullanıcı"} />
                )}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-10 py-6 flex justify-between items-center">
                    <div className="flex items-center gap-5">
                        <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                            <span className="text-lg font-serif italic font-bold text-white">{session.user.name?.charAt(0) || "U"}</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                <h2 className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] leading-none">{session.user.role} OTURUMU</h2>
                            </div>
                            <h1 className="text-xl font-serif font-bold italic tracking-tight text-primary">
                                {session.user.name || session.user.email}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-lg">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                Sistem Çevrimiçi
                            </span>
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-10 animate-fadeInUp">
                    <div className="max-w-[1400px] mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
