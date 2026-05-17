"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FileText, DollarSign, Calendar, CheckCircle, XCircle, FileSignature, ShieldCheck, Download } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ContractManager from "@/components/application/ContractManager";

export default function OffersPage() {
    const { data: session } = useSession();
    const params = useParams();
    const router = useRouter();
    const applicationId = params ? params.id as string : "";

    const [offers, setOffers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (applicationId) fetchOffers();
    }, [applicationId]);

    const fetchOffers = async () => {
        try {
            const response = await fetch(`/api/offers?applicationId=${applicationId}`);
            if (response.ok) {
                const data = await response.json();
                setOffers(Array.isArray(data) ? data : []);
            }
        } catch (error) {
            console.error("Failed to fetch offers:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (offerId: string, status: string) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/offers/${offerId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                fetchOffers();
            }
        } catch (error) {
            console.error("Failed to update offer:", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PENDING": return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
            case "ACCEPTED": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
            case "REJECTED": return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300";
            default: return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
        }
    };

    if (loading && offers.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href={`/dashboard/applications/${applicationId}`}
                        className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Eğitim Teklifleri</h2>
                        <p className="text-[var(--text-muted)] text-sm font-bold mt-1 uppercase tracking-widest">Başvurunuza Özel Hazırlanan Teklifler</p>
                    </div>
                </div>
            </div>

            {offers.length === 0 ? (
                <div className="glass-card py-20 text-center">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="text-slate-400" size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Henüz Teklif Yok</h3>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto">Başvurunuz incelendiğinde danışmanlarımız size özel eğitim tekliflerini burada paylaşacaktır.</p>
                </div>
            ) : (
                <div className="space-y-12">
                    {offers.map((offer) => (
                        <div key={offer.id} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            {/* Offer Card */}
                            <div className={`glass-card overflow-hidden border-t-4 ${offer.status === 'ACCEPTED' ? 'border-emerald-500' : 'border-slate-200 dark:border-slate-800'}`}>
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                                <FileText size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-slate-900 dark:text-white">{offer.title || `Eğitim Teklifi #${offer.id.slice(0, 4)}`}</h3>
                                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                                    <Calendar size={12} />
                                                    {new Date(offer.createdAt).toLocaleDateString("tr-TR")}
                                                </div>
                                            </div>
                                        </div>
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(offer.status)}`}>
                                            {offer.status === 'PENDING' ? 'Değerlendirme Bekliyor' : offer.status === 'ACCEPTED' ? 'Kabul Edildi' : 'Reddedildi'}
                                        </span>
                                    </div>

                                    {/* Offer Content Layout */}
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
                                        <div className="md:col-span-8 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                                            <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: offer.content }} />
                                        </div>
                                        <div className="md:col-span-4 space-y-6">
                                            <div className="p-6 bg-primary text-white rounded-3xl shadow-xl shadow-primary/20 space-y-4">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 text-center">TEKLİF TUTARI</p>
                                                <div className="text-center">
                                                    <span className="text-5xl font-black tracking-tighter">
                                                        {offer.amount || '0'}
                                                    </span>
                                                    <span className="text-xl font-bold ml-2 opacity-80">{offer.currency}</span>
                                                </div>
                                                {offer.validUntil && (
                                                    <div className="text-[10px] font-black text-center mt-4 bg-white/20 py-2 rounded-xl">
                                                        SON GEÇERLİLİK: {new Date(offer.validUntil).toLocaleDateString("tr-TR")}
                                                    </div>
                                                )}
                                            </div>

                                            {offer.status === "PENDING" && session?.user?.role === "STUDENT" && (
                                                <div className="space-y-3">
                                                    <button
                                                        onClick={() => handleUpdateStatus(offer.id, "ACCEPTED")}
                                                        className="w-full py-4 bg-slate-900 text-white dark:bg-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg"
                                                    >
                                                        <CheckCircle size={16} />
                                                        Teklifi Kabul Et
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateStatus(offer.id, "REJECTED")}
                                                        className="w-full py-4 border-2 border-rose-100 text-rose-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-50 transition-all flex items-center justify-center gap-2"
                                                    >
                                                        <XCircle size={16} />
                                                        Reddet
                                                    </button>
                                                </div>
                                            )}

                                            {offer.status === "ACCEPTED" && !offer.contract && (session?.user?.role === "ADVISOR" || session?.user?.role === "CEO" || session?.user?.role === "ADMIN") && (
                                                <button
                                                    onClick={async () => {
                                                        const res = await fetch("/api/contracts", {
                                                            method: "POST",
                                                            headers: { "Content-Type": "application/json" },
                                                            body: JSON.stringify({
                                                                offerId: offer.id,
                                                                templateKey: "PROFESSIONAL_SERVICE",
                                                            }),
                                                        });
                                                        if (res.ok) fetchOffers();
                                                    }}
                                                    className="w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                                                >
                                                    <FileSignature size={18} />
                                                    Sözleşme Hazırla
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contract Section - Shows only if offer is accepted and contract generated */}
                            {offer.contract && (
                                <div className="animate-in slide-in-from-top-4 duration-1000">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200 dark:to-slate-800" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Resmi Sözleşme Hazır</span>
                                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-200 dark:to-slate-800" />
                                    </div>
                                    <ContractManager
                                        contract={offer.contract}
                                        onUpdate={fetchOffers}
                                        role={session?.user?.role || "STUDENT"}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
