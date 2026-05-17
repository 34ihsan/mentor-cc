"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle, AlertCircle, FileText, Upload } from "lucide-react";
import { motion } from "framer-motion";

interface DocumentRequirement {
    id: string;
    name: string;
    description?: string;
    isRequired: boolean;
}

interface UploadedDocument {
    name: string;
    status: string;
}

interface DynamicChecklistProps {
    requirements: DocumentRequirement[];
    uploadedDocuments: UploadedDocument[];
}

export default function DynamicChecklist({ requirements, uploadedDocuments }: DynamicChecklistProps) {
    const getStatus = (reqName: string) => {
        const doc = uploadedDocuments.find(d => d.name.toLowerCase().includes(reqName.toLowerCase()));
        if (!doc) return "MISSING";
        return doc.status;
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-serif italic text-secondary">Belge Kontrol Listesi</h3>
                <span className="text-[10px] font-black bg-zinc-100 px-2 py-1 rounded-full text-zinc-500 uppercase tracking-widest">
                    {uploadedDocuments.length} / {requirements.length} Tamamlandı
                </span>
            </div>

            <div className="grid gap-3">
                {requirements.map((req, i) => {
                    const status = getStatus(req.name);
                    const isCompleted = status === "APPROVED" || status === "PENDING";
                    
                    return (
                        <motion.div
                            key={req.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                                isCompleted 
                                ? "bg-emerald-50/30 border-emerald-100" 
                                : "bg-white border-zinc-100 hover:border-zinc-200 shadow-sm"
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-xl ${
                                    isCompleted ? "bg-emerald-100 text-emerald-600" : "bg-zinc-50 text-zinc-400"
                                }`}>
                                    {isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-primary flex items-center gap-2">
                                        {req.name}
                                        {req.isRequired && (
                                            <span className="text-[8px] font-black text-accent bg-accent/10 px-1.5 py-0.5 rounded-md uppercase tracking-tighter">
                                                Zorunlu
                                            </span>
                                        )}
                                    </p>
                                    {req.description && (
                                        <p className="text-[10px] font-medium text-zinc-400">{req.description}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {status === "MISSING" ? (
                                    <button className="flex items-center gap-2 text-[10px] font-black text-primary bg-primary/5 hover:bg-primary/10 px-3 py-2 rounded-xl transition-all uppercase tracking-widest border border-primary/10">
                                        <Upload size={12} />
                                        Yükle
                                    </button>
                                ) : (
                                    <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                                        status === "APPROVED" 
                                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                                        : status === "REJECTED"
                                        ? "bg-red-50 text-red-600 border-red-100"
                                        : "bg-orange-50 text-orange-600 border-orange-100"
                                    }`}>
                                        {status === "APPROVED" ? "Onaylandı" : status === "REJECTED" ? "Reddedildi" : "Onay Bekliyor"}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
