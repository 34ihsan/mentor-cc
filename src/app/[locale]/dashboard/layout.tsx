import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";

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
        <div className="flex bg-zinc-50 min-h-screen text-primary">
            <Sidebar role={session.user.role} user={session.user} />
            
            {/* Background Effects - Refined for Light Mode */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" />
            </div>

            <main className="flex-1 ml-[280px] min-h-screen relative flex flex-col z-10">
                <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-3xl border-b border-zinc-200 px-12 py-7 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center shadow-premium group cursor-pointer transition-all duration-700 hover:rotate-12">
                            <span className="text-xl font-serif italic font-black text-secondary group-hover:scale-110 transition-transform">{session.user.name?.charAt(0) || "U"}</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1.5 opacity-60">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-premium animate-pulse" />
                                <h2 className="text-[10px] font-black text-secondary uppercase tracking-[0.4em] leading-none">{session.user.role} ACCESS</h2>
                            </div>
                            <h1 className="text-2xl font-serif font-bold italic tracking-tight text-primary">
                                {session.user.name || session.user.email}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        {/* System Status */}
                        <div className="hidden lg:flex items-center gap-4 px-6 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl">
                            <div className="w-2 h-2 rounded-full bg-secondary shadow-premium animate-pulse" />
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">
                                CORE SYSTEM: ACTIVE
                            </span>
                        </div>
                        
                        {/* Secondary Actions Placeholder */}
                        <div className="h-10 w-px bg-zinc-200 mx-2" />
                        <div className="w-12 h-12 rounded-2xl border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 cursor-pointer transition-colors relative">
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-white shadow-premium" />
                            <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-12 transition-all duration-1000">
                    <div className="max-w-[1500px] mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
