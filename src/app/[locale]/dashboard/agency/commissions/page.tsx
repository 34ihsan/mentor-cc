"use client";

import { useState, useEffect } from "react";
import { getAgencyCommissionsAction } from "@/app/actions/financial-actions";
import { Wallet, CheckCircle2, Clock, ChevronRight, TrendingUp, DollarSign } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export default function AgencyCommissionsPage() {
    const [commissions, setCommissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCommissions = async () => {
            const result = await getAgencyCommissionsAction();
            if (result.success) setCommissions(result.data || []);
            setLoading(false);
        };
        fetchCommissions();
    }, []);

    const totalEarned = commissions
        .filter(c => c.status === "PAID")
        .reduce((acc, c) => acc + c.amount, 0);

    const pendingAmount = commissions
        .filter(c => c.status === "PENDING")
        .reduce((acc, c) => acc + c.amount, 0);

    if (loading) return (
        <div className="p-20 text-center uppercase tracking-[0.5em] font-black text-slate-300 animate-pulse">
            YÜKLENİYOR...
        </div>
    );

    return (
        <div className="space-y-10 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[var(--primary)] font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                        <Wallet size={12} />
                        Finansal Yönetim
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-slate-900">
                        Kazançlarım & Komisyonlar
                    </h1>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-8 border-white group hover:shadow-xl transition-all duration-500">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <DollarSign size={12} className="text-emerald-500" />
                        TOPLAM KAZANÇ (ÖDENEN)
                    </p>
                    <h3 className="text-4xl font-black text-slate-900">{totalEarned.toLocaleString()} <span className="text-sm">USD</span></h3>
                </div>
                <div className="glass-card p-8 border-white group hover:shadow-xl transition-all duration-500">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Clock size={12} className="text-amber-500" />
                        BEKLEYEN ÖDEMELER
                    </p>
                    <h3 className="text-4xl font-black text-amber-500">{pendingAmount.toLocaleString()} <span className="text-sm">USD</span></h3>
                </div>
                <div className="glass-card p-8 border-white group hover:shadow-xl transition-all duration-500">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <TrendingUp size={12} className="text-blue-500" />
                        TOPLAM İŞLEM
                    </p>
                    <h3 className="text-4xl font-black text-blue-600">{commissions.length}</h3>
                </div>
            </div>

            <div className="glass-card overflow-hidden border-white/40 shadow-2xl shadow-blue-900/5">
                <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2">
                        <Wallet size={16} className="text-[var(--primary)]" />
                        Komisyon Geçmişi
                    </h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">TARİH</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">ÖĞRENCİ / PROGRAM</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">TUTAR</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 text-center">DURUM</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 text-right">EYLEM</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {commissions.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                                            Henüz kaydedilmiş bir komisyon verisi bulunmuyor.
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                commissions.map((comm) => (
                                    <tr key={comm.id} className="group hover:bg-slate-50/50 transition-all">
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-slate-900">
                                                    {format(new Date(comm.createdAt), "dd MMMM yyyy", { locale: tr })}
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                                    {format(new Date(comm.createdAt), "HH:mm")}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-slate-900">
                                                    {comm.application?.student?.name || "Bilinmiyor"}
                                                </span>
                                                <span className="text-[10px] font-black text-blue-600 uppercase">
                                                    {comm.application?.program?.name || "Program Silinmiş"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="text-lg font-black text-slate-900">
                                                {comm.amount} <span className="text-xs">{comm.currency}</span>
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex justify-center">
                                                {comm.status === "PAID" ? (
                                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                                                        <CheckCircle2 size={10} /> ÖDENDİ
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-100">
                                                        <Clock size={10} /> BEKLEMEDE
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <Link 
                                                href={`/dashboard/applications/${comm.applicationId}`}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all shadow-sm"
                                            >
                                                DETAY <ChevronRight size={14} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
