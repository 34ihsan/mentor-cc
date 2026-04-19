"use client";

import { CheckCircle2, Circle, Clock } from "lucide-react";

interface StatusTimelineProps {
    currentStatus: string;
}

const statuses = [
    { key: "DRAFT", label: "Taslak", icon: Circle },
    { key: "DOCS_PENDING", label: "Belgeler Bekleniyor", icon: Clock },
    { key: "UNDER_REVIEW", label: "İnceleniyor", icon: Clock },
    { key: "OFFER_SENT", label: "Teklif Gönderildi", icon: Clock },
    { key: "CONTRACT_SIGNED", label: "Sözleşme İmzalandı", icon: CheckCircle2 },
    { key: "COMPLETED", label: "Tamamlandı", icon: CheckCircle2 },
];

export default function StatusTimeline({ currentStatus }: StatusTimelineProps) {
    const currentIndex = statuses.findIndex(s => s.key === currentStatus);

    return (
        <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-6">Başvuru Durumu</h3>
            <div className="relative">
                {statuses.map((status, index) => {
                    const Icon = status.icon;
                    const isCompleted = index < currentIndex;
                    const isCurrent = index === currentIndex;
                    const isUpcoming = index > currentIndex;

                    return (
                        <div key={status.key} className="relative flex gap-4 mb-6 last:mb-0">
                            {/* Timeline line */}
                            {index < statuses.length - 1 && (
                                <div
                                    className={`absolute left-[15px] top-[32px] w-[2px] h-[calc(100%+8px)] ${isCompleted
                                        ? "bg-green-500"
                                        : isCurrent
                                            ? "bg-gradient-to-b from-[var(--primary)] to-gray-200"
                                            : "bg-gray-200"
                                        }`}
                                />
                            )}

                            {/* Icon */}
                            <div
                                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${isCompleted
                                    ? "bg-green-500 text-white"
                                    : isCurrent
                                        ? "bg-[var(--primary)] text-white"
                                        : "bg-gray-200 text-gray-400"
                                    }`}
                            >
                                <Icon size={16} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 pt-1">
                                <p
                                    className={`font-black uppercase tracking-tight text-sm ${isCurrent
                                        ? "text-[var(--primary)]"
                                        : isCompleted
                                            ? "text-emerald-600"
                                            : "text-slate-900"
                                        }`}
                                >
                                    {status.label}
                                </p>
                                {isCurrent && (
                                    <p className="text-[10px] font-black text-slate-950/60 mt-1 uppercase tracking-widest">
                                        Şu anda bu aşamada
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
