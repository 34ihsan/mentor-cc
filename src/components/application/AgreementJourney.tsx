"use client";

import { motion } from "framer-motion";
import { Check, ClipboardList, UserCheck, FileText, PenTool, ShieldCheck } from "lucide-react";

interface AgreementJourneyProps {
    status: string;
}

const stages = [
    { id: "PROPOSAL", label: "Eğitim Önerisi", icon: ClipboardList, description: "Teklif hazırlandı" },
    { id: "ACCEPTANCE", label: "Öğrenci Onayı", icon: UserCheck, description: "Teklif kabul edildi" },
    { id: "DRAFTING", label: "Sözleşme Taslağı", icon: FileText, description: "Sözleşme oluşturuldu" },
    { id: "SIGNING", label: "Islak/Dijital İmza", icon: PenTool, description: "İmza süreci" },
    { id: "COMPLETED", label: "Kurum Onayı", icon: ShieldCheck, description: "Süreç tamamlandı" },
];

const statusMap: Record<string, number> = {
    "DRAFT": 0,
    "UNDER_REVIEW": 0,
    "OFFER_SENT": 1,
    "ACCEPTED": 2,
    "CONTRACT_DRAFTED": 3,
    "CONTRACT_SIGNED": 4,
    "COMPLETED": 5,
};

export default function AgreementJourney({ status }: AgreementJourneyProps) {
    const currentStageIndex = statusMap[status] || 0;

    return (
        <div className="py-12 px-4">
            <div className="relative flex justify-between max-w-4xl mx-auto">
                {/* Background Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 z-0 rounded-full" />

                {/* Progress Line */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 -translate-y-1/2 z-0 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    transition={{ duration: 1, ease: "easeInOut" }}
                />

                {stages.map((stage, index) => {
                    const isCompleted = index < currentStageIndex;
                    const isCurrent = index === currentStageIndex;
                    const Icon = stage.icon;

                    return (
                        <div key={stage.id} className="relative z-10 flex flex-col items-center group">
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isCurrent ? 1.2 : 1,
                                    backgroundColor: isCompleted ? "#10b981" : isCurrent ? "#2563eb" : "#f8fafc",
                                    borderColor: isCompleted ? "#10b981" : isCurrent ? "#2563eb" : "#e2e8f0"
                                }}
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center border-4 transition-all duration-500 shadow-xl ${isCompleted ? 'text-white' : isCurrent ? 'text-white' : 'text-slate-400'}`}
                            >
                                {isCompleted ? <Check size={20} strokeWidth={3} /> : <Icon size={20} strokeWidth={isCurrent ? 3 : 2} />}

                                {isCurrent && (
                                    <motion.div
                                        layoutId="current-glow"
                                        className="absolute inset-0 rounded-2xl bg-blue-600 blur-lg opacity-30 -z-10"
                                    />
                                )}
                            </motion.div>

                            <div className="absolute top-16 flex flex-col items-center w-32 text-center">
                                <span className={`text-[10px] font-black uppercase tracking-widest mb-1 transition-colors duration-500 ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-emerald-500' : 'text-slate-400'}`}>
                                    {stage.label}
                                </span>
                                {isCurrent && (
                                    <motion.span
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-[9px] font-bold text-slate-500 dark:text-slate-400 italic"
                                    >
                                        {stage.description}
                                    </motion.span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
