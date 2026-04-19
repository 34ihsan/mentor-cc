"use client";

import { Clock, FileText, CheckCircle, XCircle, Send, FileSignature, Info } from "lucide-react";

interface ActivityTimelineProps {
    activities: any[];
}

export default function ActivityTimeline({ activities }: ActivityTimelineProps) {
    const getActionIcon = (action: string) => {
        switch (action) {
            case "OFFER_SENT": return <Send className="text-blue-500" size={16} />;
            case "OFFER_ACCEPTED": return <CheckCircle className="text-emerald-500" size={16} />;
            case "OFFER_REJECTED": return <XCircle className="text-red-500" size={16} />;
            case "DOCUMENT_UPLOADED": return <FileText className="text-purple-500" size={16} />;
            case "DOCUMENT_APPROVED": return <CheckCircle className="text-emerald-500" size={16} />;
            case "DOCUMENT_REJECTED": return <XCircle className="text-red-500" size={16} />;
            case "CONTRACT_GENERATED": return <FileSignature className="text-amber-500" size={16} />;
            default: return <Info className="text-slate-400" size={16} />;
        }
    };

    const getActionLabel = (action: string) => {
        const labels: any = {
            OFFER_SENT: "Teklif Gönderildi",
            OFFER_ACCEPTED: "Teklif Kabul Edildi",
            OFFER_REJECTED: "Teklif Reddedildi",
            DOCUMENT_UPLOADED: "Belge Yüklendi",
            DOCUMENT_APPROVED: "Belge Onaylandı",
            DOCUMENT_REJECTED: "Belge Reddedildi",
            CONTRACT_GENERATED: "Sözleşme Hazırlandı",
        };
        return labels[action] || action;
    };

    if (!activities || activities.length === 0) {
        return (
            <div className="glass-card p-6">
                <h3 className="text-lg font-black mb-4 text-slate-900 dark:text-white uppercase tracking-tight">İşlem Geçmişi</h3>
                <p className="text-sm text-slate-500 italic">Henüz bir işlem kaydı bulunmuyor.</p>
            </div>
        );
    }

    return (
        <div className="glass-card p-6">
            <h3 className="text-lg font-black mb-6 text-slate-900 dark:text-white uppercase tracking-tight">İşlem Geçmişi</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-2 before:w-px before:bg-[var(--border)] before:ml-[7px]">
                {activities.map((activity, index) => (
                    <div key={activity.id} className="relative pl-10">
                        <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-[var(--primary)] z-10 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="p-1 rounded bg-slate-100 dark:bg-slate-800">
                                    {getActionIcon(activity.action)}
                                </span>
                                <span className="font-bold text-sm text-slate-900 dark:text-white">
                                    {getActionLabel(activity.action)}
                                </span>
                            </div>
                            <div className="text-xs text-[var(--text-muted)] flex items-center gap-2 mb-2">
                                <Clock size={12} />
                                {new Date(activity.createdAt).toLocaleString("tr-TR")}
                                {activity.userId && (
                                    <>
                                        <span>•</span>
                                        <span>ID: {activity.userId.substring(0, 8)}</span>
                                    </>
                                )}
                            </div>
                            {activity.details && (
                                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-xs border border-[var(--border)]">
                                    <pre className="whitespace-pre-wrap font-sans opacity-80">
                                        {(() => {
                                            if (typeof activity.details !== 'string') {
                                                return activity.details.reason || activity.details.title || JSON.stringify(activity.details);
                                            }
                                            try {
                                                const parsed = JSON.parse(activity.details);
                                                return parsed.reason || parsed.title || activity.details;
                                            } catch (e) {
                                                return activity.details;
                                            }
                                        })()}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
