"use client";

import { useState, useEffect } from "react";
import { getFinancialOverviewAction, updateCommissionStatusAction } from "@/app/actions/financial-actions";
import { 
    Wallet, 
    TrendingUp, 
    Users, 
    ArrowUpRight, 
    Clock, 
    CheckCircle2, 
    DollarSign,
    Filter,
    ArrowDownRight,
    Search
} from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export default function CEOFinancePage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFinance = async () => {
            const result = await getFinancialOverviewAction();
            if (result.success) setData(result.data);
            setLoading(false);
        };
        fetchFinance();
    }, []);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        const result = await updateCommissionStatusAction(id, newStatus);
        if (result.success) {
            // Refresh data
            const refreshResult = await getFinancialOverviewAction();
            if (refreshResult.success) setData(refreshResult.data);
        }
    };

    if (loading) return (
        <div className="p-20 text-center uppercase tracking-[1em] font-black text-slate-200 animate-pulse">
            SİSTEM YÜKLENİYOR...
        </div>
    );

    return (
        <div className="space-y-10 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                        <TrendingUp size={12} className="text-primary" />
                        Finansal Operasyon Merkezi
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-slate-900">
                        Ekosistem Gelir Analizi
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:shadow-md transition-all">
                        <Filter size={14} /> FİLTRELE
                    </button>
                    <button className="premium-btn flex items-center gap-2 px-8 py-4 shadow-xl shadow-blue-900/10">
                        <DollarSign size={18} />
                        <span className="font-black h-fit uppercase tracking-widest text-[10px]">VERİ DIŞA AKTAR</span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass-card p-8 border-white bg-slate-100/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex justify-between">
                        <span>TOPLAM CİRO</span>
                        <ArrowUpRight size={14} className="text-emerald-500" />
                    </p>
                    <h3 className="text-4xl font-black text-slate-900">
                        {(data?.totalEarned || 0).toLocaleString()} <span className="text-xs">USD</span>
                    </h3>
                </div>
                <div className="glass-card p-8 border-white">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">BEKLEYEN ÖDEMELER</p>
                    <h3 className="text-4xl font-black text-amber-500">
                        {(data?.pendingPayouts || 0).toLocaleString()} <span className="text-xs">USD</span>
                    </h3>
                </div>
                <div className="glass-card p-8 border-white">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">TOPLAM İŞLEM</p>
                    <h3 className="text-4xl font-black text-blue-600">{data?.commissions?.length || 0}</h3>
                </div>
                <div className="glass-card p-8 border-white">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">NET BÜYÜME</p>
                    <h3 className="text-4xl font-black text-emerald-600">+%24.8</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Commission Management - Left 2/3 */}
                <div className="lg:col-span-2 glass-card overflow-hidden border-white/40">
                    <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2">
                            <Wallet size={16} className="text-primary" />
                            Acenta Komisyon Talepleri
                        </h3>
                        <div className="relative w-full sm:w-64">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="text" placeholder="ARA..." className="w-full bg-slate-50 border-none text-[10px] font-black uppercase tracking-widest px-10 py-2.5 rounded-xl outline-none" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <tbody className="divide-y divide-slate-50">
                                {data?.commissions?.map((comm: any) => (
                                    <tr key={comm.id} className="group hover:bg-slate-50/50 transition-all">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center font-black text-blue-600">
                                                    {comm.agency.name.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-slate-900">{comm.agency.name}</span>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                                                        {format(new Date(comm.createdAt), "dd MMM yyyy", { locale: tr })}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="text-lg font-black text-slate-900">{comm.amount} {comm.currency}</span>
                                                <span className={`text-[8px] font-black uppercase tracking-widest ${comm.status === 'PAID' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                                    {comm.status === 'PAID' ? 'TAMAMLANDI' : 'ÖDEME BEKLİYOR'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            {comm.status === 'PENDING' && (
                                                <button 
                                                    onClick={() => handleStatusUpdate(comm.id, "PAID")}
                                                    className="px-6 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-lg shadow-blue-900/10"
                                                >
                                                    ÖDEMEYİ ONAYLA
                                                </button>
                                            )}
                                            {comm.status === 'PAID' && (
                                                <div className="flex items-center justify-end gap-2 text-[10px] font-black text-emerald-600 uppercase">
                                                    <CheckCircle2 size={16} /> ONAYLANDI
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {data?.commissions?.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="p-20 text-center opacity-40 uppercase font-black text-[10px] tracking-widest">
                                            KOMİSYON VERİSİ BULUNMUYOR
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Performance - Right 1/3 */}
                <div className="space-y-8">
                    <div className="glass-card p-8 border-white bg-blue-950 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                <TrendingUp size={16} /> Performans Özeti
                            </h3>
                            <div className="space-y-6">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">BU AY</p>
                                        <p className="text-3xl font-black">24.500 <span className="text-sm">USD</span></p>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] font-black text-emerald-400 uppercase">
                                        <ArrowUpRight size={14} /> %14
                                    </div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">GEÇEN AY</p>
                                        <p className="text-3xl font-black text-slate-300">18.200 <span className="text-sm">USD</span></p>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] font-black text-red-400 uppercase">
                                        <ArrowDownRight size={14} /> %4
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-8 border-white overflow-hidden">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-8 flex items-center gap-2 border-b border-slate-100 pb-4">
                            <Users size={16} className="text-blue-500" /> En İyi Acentalar
                        </h3>
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center font-black text-[10px] text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            #{i}
                                        </div>
                                        <span className="text-[11px] font-black text-slate-900 uppercase">Global Education</span>
                                    </div>
                                    <span className="text-[11px] font-black text-slate-400">12.500 USD</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
