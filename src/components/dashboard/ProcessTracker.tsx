"use client";

import React from "react";
import { Check, Circle } from "lucide-react";

type AppStatus = "DRAFT" | "DOCS_PENDING" | "UNDER_REVIEW" | "OFFER_SENT" | "CONTRACT_SIGNED" | "COMPLETED";

interface ProcessTrackerProps {
    status: AppStatus;
}

const stages = [
    { key: "DRAFT", label: "Kayıt / Taslak" },
    { key: "DOCS_PENDING", label: "Belge Hazırlığı" },
    { key: "UNDER_REVIEW", label: "İncelemede" },
    { key: "OFFER_SENT", label: "Teklif / Kabul" },
    { key: "CONTRACT_SIGNED", label: "Sözleşme / Vize" },
    { key: "COMPLETED", label: "Tamamlandı" },
];

export default function ProcessTracker({ status }: ProcessTrackerProps) {
    const currentStageIndex = stages.findIndex((s) => s.key === status);

    return (
        <div className="w-full py-6">
            <div className="relative flex justify-between">
                {/* Connecting Line */}
                <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -z-0" />
                <div 
                    className="absolute top-5 left-0 h-0.5 bg-blue-600 transition-all duration-500 ease-in-out -z-0" 
                    style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
                />

                {stages.map((stage, index) => {
                    const isCompleted = index < currentStageIndex;
                    const isCurrent = index === currentStageIndex;
                    const isPending = index > currentStageIndex;

                    return (
                        <div key={stage.key} className="flex flex-col items-center relative z-10 flex-1">
                            <div 
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                    isCompleted 
                                        ? "bg-blue-600 text-white" 
                                        : isCurrent 
                                        ? "bg-white border-4 border-blue-600 shadow-lg scale-110" 
                                        : "bg-white border-2 border-slate-200 text-slate-300"
                                }`}
                            >
                                {isCompleted ? (
                                    <Check size={18} strokeWidth={3} />
                                ) : isCurrent ? (
                                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                                ) : (
                                    <Circle size={12} fill="currentColor" />
                                )}
                            </div>
                            <p 
                                className={`mt-3 text-[9px] font-black uppercase tracking-widest text-center max-w-[80px] leading-tight ${
                                    isCurrent ? "text-blue-600" : isCompleted ? "text-slate-900 dark:text-white" : "text-slate-400"
                                }`}
                            >
                                {stage.label}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
