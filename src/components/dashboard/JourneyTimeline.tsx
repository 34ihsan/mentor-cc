"use client";

import { motion } from "framer-motion";
import { Check, Clock, FileText, Send, CheckCircle2, Flag } from "lucide-react";

interface JourneyTimelineProps {
    status: string;
}

const steps = [
    { key: "DRAFT", label: "Başvuru Oluşturuldu", icon: FileText },
    { key: "DOCS_PENDING", label: "Belgeler Bekleniyor", icon: Send },
    { key: "UNDER_REVIEW", label: "İncelemede", icon: Clock },
    { key: "OFFER_SENT", label: "Teklif Alındı", icon: Flag },
    { key: "CONTRACT_SIGNED", label: "Sözleşme İmzalandı", icon: CheckCircle2 },
    { key: "COMPLETED", label: "Tamamlandı", icon: Check },
];

export default function JourneyTimeline({ status }: JourneyTimelineProps) {
    const currentStepIndex = steps.findIndex(s => s.key === status);

    return (
        <div className="relative pt-12 pb-16">
            {/* Background Track */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-zinc-100 -translate-y-1/2" />

            <div className="relative flex justify-between items-center">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStepIndex || status === "COMPLETED";
                    const isActive = index === currentStepIndex && status !== "COMPLETED";

                    return (
                        <div key={step.key} className="flex flex-col items-center relative z-10 group">
                            {/* Step Indicator */}
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isActive ? 1.15 : 1,
                                    borderColor: isCompleted || isActive ? "var(--secondary)" : "rgb(244 244 245)",
                                    backgroundColor: isCompleted ? "var(--primary)" : isActive ? "white" : "white"
                                }}
                                className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-500 shadow-sm ${
                                    isActive ? "shadow-lg shadow-secondary/20" : ""
                                }`}
                            >
                                <step.icon 
                                    size={20} 
                                    className={isCompleted ? "text-white" : isActive ? "text-secondary" : "text-zinc-300"} 
                                    strokeWidth={isCompleted || isActive ? 2.5 : 1.5}
                                />
                                
                                {isActive && (
                                    <motion.div 
                                        layoutId="glow"
                                        className="absolute inset-0 rounded-xl bg-secondary/10 animate-pulse" 
                                    />
                                )}
                            </motion.div>

                            {/* Label */}
                            <div className="absolute top-16 text-center w-32 left-1/2 -translate-x-1/2">
                                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 transition-colors ${
                                    isActive ? "text-primary" : "text-zinc-400"
                                }`}>
                                    Adım {index + 1}
                                </p>
                                <h4 className={`text-xs font-serif italic whitespace-nowrap transition-colors ${
                                    isActive ? "text-primary font-bold" : "text-zinc-500 font-medium"
                                }`}>
                                    {step.label}
                                </h4>
                            </div>
                        </div>
                    );
                })}

                {/* Progress Fill */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                    className="absolute top-1/2 left-0 h-[1.5px] bg-secondary -translate-y-1/2 z-0"
                />
            </div>
        </div>
    );
}
