
"use client";

import { CheckCircle2, Circle, Clock, Loader2 } from "lucide-react";

interface StatusTimelineProps {
    status: string;
}

const steps = [
    { key: "DRAFT", label: "Taslak", desc: "Başvurunuz oluşturuldu." },
    { key: "DOCS_PENDING", label: "Evrak Bekleniyor", desc: "Gerekli belgeleri yüklemeniz gerekiyor." },
    { key: "UNDER_REVIEW", label: "İnceleniyor", desc: "Danışmanınız belgelerinizi kontrol ediyor." },
    { key: "OFFER_SENT", label: "Teklif Alındı", desc: "Okuldan kabul veya teklif geldi!" },
    { key: "CONTRACT_SIGNED", label: "Kayıt Tamamlandı", desc: "Sözleşme imzalandı ve kayıt kesinleşti." },
    { key: "COMPLETED", label: "İşlem Tamamlandı", desc: "Tüm kayıt ve kabul işlemleri başarıyla tamamlandı." },
];

export default function StatusTimeline({ status }: StatusTimelineProps) {
    const currentStepIdx = steps.findIndex(s => s.key === status);

    return (
        <div className="relative">
            <div className="hidden md:flex items-start justify-between relative px-4">
                {/* Horizontal Line */}
                <div className="absolute top-[18px] left-[10%] right-[10%] h-[2px] bg-slate-100 dark:bg-slate-800 -z-0" />
                
                {steps.map((step, idx) => {
                    const isCompleted = idx < currentStepIdx || status === "COMPLETED";
                    const isCurrent = idx === currentStepIdx;

                    return (
                        <div key={step.key} className="flex flex-col items-center text-center w-32 relative z-10">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 transition-all duration-500 ${
                                isCompleted ? 'bg-emerald-500 text-white' : 
                                isCurrent ? 'bg-[var(--primary)] text-white shadow-[0_0_20px_rgba(197,160,33,0.3)] animate-pulse' : 
                                'bg-slate-100 dark:bg-slate-800 text-slate-400'
                            }`}>
                                {isCompleted ? <CheckCircle2 size={24} /> : 
                                 isCurrent ? <Loader2 size={20} className="animate-spin" /> : 
                                 <Circle size={12} />}
                            </div>
                            <div className="mt-4 space-y-1">
                                <p className={`text-[10px] font-black uppercase tracking-widest ${
                                    isCompleted || isCurrent ? 'text-black dark:text-white' : 'text-slate-400'
                                }`}>
                                    {step.label}
                                </p>
                                <p className="text-[9px] font-bold text-slate-400 leading-tight">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Mobile Vertical Timeline */}
            <div className="md:hidden space-y-8">
                {steps.map((step, idx) => {
                    const isCompleted = idx < currentStepIdx || status === "COMPLETED";
                    const isCurrent = idx === currentStepIdx;

                    return (
                        <div key={step.key} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                    isCompleted ? 'bg-emerald-500 text-white' : 
                                    isCurrent ? 'bg-[var(--primary)] text-white' : 
                                    'bg-slate-100 text-slate-400'
                                }`}>
                                    {isCompleted ? <CheckCircle2 size={16} /> : <Circle size={8} />}
                                </div>
                                {idx < steps.length - 1 && (
                                    <div className="w-[2px] h-full bg-slate-100 dark:bg-slate-800 my-2" />
                                )}
                            </div>
                            <div className="pt-1">
                                <p className={`text-xs font-black uppercase tracking-widest ${
                                    isCompleted || isCurrent ? 'text-black dark:text-white' : 'text-slate-400'
                                }`}>
                                    {step.label}
                                </p>
                                <p className="text-[10px] font-bold text-slate-500 mt-1">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
