
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getLeadsAction } from "@/app/actions/lead-actions";
import { prisma } from "@/lib/prisma";
import { 
    TrendingUp, 
    PieChart, 
    Target, 
    Zap, 
    ArrowUpRight, 
    Users, 
    Clock,
    Activity,
    ShieldCheck,
    Facebook,
    Instagram,
    Globe,
    MessageSquare,
    CheckCircle2
} from "lucide-react";

export default async function AdminAnalyticsPage() {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

    const result = await getLeadsAction();
    const leads = result.success ? result.data || [] : [];

    // System Activity
    const recentLogs = await prisma.activityLog.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
            user: true,
            application: {
                include: {
                    student: true
                }
            }
        }
    });

    // Simple calculation
    const totalLeads = leads.length;
    const winLeads = leads.filter(l => l.status === 'win').length;
    const conversionRate = totalLeads > 0 ? ((winLeads / totalLeads) * 100).toFixed(1) : "0";

    const channels = leads.reduce((acc: any, l: any) => {
        const source = l.source || 'website';
        acc[source] = (acc[source] || 0) + 1;
        return acc;
    }, {});

    const getSourceIcon = (source: string) => {
        switch(source.toLowerCase()) {
            case 'facebook': return <Facebook size={16} className="text-blue-600" />;
            case 'instagram': return <Instagram size={16} className="text-pink-600" />;
            case 'website': return <Globe size={16} className="text-emerald-600" />;
            case 'whatsapp': return <MessageSquare size={16} className="text-green-600" />;
            default: return <Zap size={16} className="text-slate-400" />;
        }
    };

    return (
        <div className="space-y-10 pb-20 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-[#0B1751] leading-none text-black">
                        Sistem Analitiği 📊
                    </h1>
                    <p className="text-slate-500 font-bold mt-2">
                        Reklam kanallarının performansını ve operasyonel verimliliği takip edin.
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white border border-slate-100 px-6 py-4 rounded-[30px] shadow-sm">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center mb-1">DÖNÜŞÜM ORANI</p>
                        <p className="text-2xl font-black text-emerald-500 text-center">%{conversionRate}</p>
                    </div>
                    <div className="bg-[#0B1751] px-6 py-4 rounded-[30px] shadow-xl shadow-blue-900/20">
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest text-center mb-1">TOPLAM LEAD</p>
                        <p className="text-2xl font-black text-white text-center">{totalLeads}</p>
                    </div>
                </div>
            </div>

            {/* Performance Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Funnel */}
                <div className="lg:col-span-2 bg-white p-10 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
                        <TrendingUp size={160} />
                    </div>
                    
                    <div className="relative z-10 space-y-10">
                        <div>
                            <div className="flex items-center gap-2 text-[10px] font-black text-[#DC2626] uppercase tracking-widest mb-2">
                                <Activity size={12} /> VERİMLİLİK TAKİBİ
                            </div>
                            <h3 className="text-2xl font-black text-[#0B1751] tracking-tight">Satış Hunisi</h3>
                            <p className="text-xs font-bold text-slate-400 mt-1">Potansiyel adaylardan kesin kayıtlara giden yol.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: "Toplam Lead", value: totalLeads, color: "bg-blue-500", icon: Users, desc: "Sisteme düşen tüm talepler" },
                                { label: "İşlemde", value: leads.filter(l => l.status === 'contact').length, color: "bg-amber-500", icon: Zap, desc: "Danışmanlar tarafından arananlar" },
                                { label: "Kayıt (Win)", value: winLeads, color: "bg-emerald-500", icon: CheckCircle2, desc: "Öğrenci olarak sisteme katılanlar" },
                            ].map((step, idx) => (
                                <div key={idx} className="relative p-6 rounded-[30px] bg-slate-50 border border-slate-100 group/item hover:bg-white hover:shadow-xl transition-all duration-500">
                                    <div className={`w-12 h-12 rounded-2xl ${step.color} text-white flex items-center justify-center mb-4 shadow-lg shadow-blue-500/10`}>
                                        <step.icon size={24} />
                                    </div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{step.label}</h4>
                                    <p className="text-3xl font-black text-[#0B1751] my-1">{step.value}</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{step.desc}</p>
                                    <div className="absolute top-4 right-4 text-[10px] font-black text-slate-200">0{idx+1}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Channel Breakdown */}
                <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8 flex flex-col">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black text-[#0B1751] uppercase tracking-tighter">Kanal Dağılımı</h3>
                        <PieChart size={18} className="text-slate-300" />
                    </div>
                    
                    <div className="space-y-6 flex-1">
                        {Object.entries(channels).length > 0 ? (
                            Object.entries(channels).map(([channel, count]: [string, any]) => (
                                <div key={channel} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all">
                                            {getSourceIcon(channel)}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-[#0B1751] uppercase tracking-tight">{channel}</p>
                                            <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                                                <div 
                                                    className="h-full bg-[#DC2626] transition-all duration-1000" 
                                                    style={{ width: `${(count / totalLeads) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-[#0B1751]">{count}</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">%{((count / totalLeads) * 100).toFixed(0)}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full opacity-20">
                                <Activity size={48} className="mb-2" />
                                <p className="text-[10px] font-black uppercase tracking-widest">Veri bulunmuyor</p>
                            </div>
                        )}
                    </div>

                    <button className="w-full py-4 rounded-2xl border border-dashed border-slate-200 text-slate-400 hover:text-[#DC2626] hover:border-[#DC2626] transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest mt-6">
                        DETAYLI KANAL ANALİZİ
                    </button>
                </div>
            </div>

            {/* Second Row: Audit Logs & AI */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity Log */}
                <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                <Clock size={20} />
                            </div>
                            <h3 className="text-lg font-black text-[#0B1751] uppercase tracking-tighter">Sistem Aktivite Günlüğü</h3>
                        </div>
                        <ShieldCheck size={18} className="text-slate-300" />
                    </div>

                    <div className="space-y-4">
                        {recentLogs.map((log) => (
                            <div key={log.id} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                    <Activity size={12} className="text-slate-400" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-[11px] font-bold text-[#0B1751] leading-snug">
                                        <span className="font-black text-[#DC2626]">@{log.user?.name || 'Sistem'}</span> {log.details}
                                    </p>
                                    <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-tight">
                                        <span>{log.action}</span>
                                        <span>•</span>
                                        <span>{new Date(log.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full py-4 rounded-2xl bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:bg-[#0B1751] hover:text-white transition-all">
                        TÜM GÜNLÜĞÜ GÖRÜNTÜLE
                    </button>
                </div>

                {/* AI Insights Card */}
                <div className="bg-[#0B1751] p-12 text-white rounded-3xl shadow-2xl relative overflow-hidden group flex flex-col justify-center">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:opacity-20 transition-opacity duration-1000" />
                    
                    <div className="relative z-10 space-y-8">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-[35px] bg-white/10 backdrop-blur-3xl flex items-center justify-center shadow-2xl">
                                <Zap size={32} className="text-blue-400 animate-pulse" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black tracking-tight leading-tight">
                                    Yapay Zeka Tahmini
                                </h2>
                                <p className="text-blue-100/60 font-bold uppercase tracking-widest text-[9px] mt-1">Gelecek 30 Gün Öngörüsü</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-blue-100/70 font-medium text-sm leading-relaxed">
                                Mevcut trendlere göre, reklam bütçenizi <span className="text-pink-400 font-black">Instagram</span> kanalına kaydırmanız, dönüşüm oranınızı <span className="text-emerald-400 font-black">%14</span> oranında artırabilir. 
                            </p>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest">BEKLENEN LEAD</p>
                                    <p className="text-2xl font-black">+142</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <p className="text-[9px] font-black text-emerald-300 uppercase tracking-widest">POTANSİYEL KAYIT</p>
                                    <p className="text-2xl font-black">28</p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-5 bg-white text-slate-900 rounded-[30px] font-black text-[10px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl mt-4">
                            STRATEJİ RAPORUNU İNDİR <ArrowUpRight size={14} className="inline ml-1" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
