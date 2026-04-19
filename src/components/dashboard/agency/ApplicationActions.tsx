"use client";

import { useState } from "react";
import { ChevronRight, FilePlus, Activity } from "lucide-react";
import Link from "next/link";
import CreateOfferModal from "@/components/dashboard/CreateOfferModal";
import UpdateStatusModal from "@/components/dashboard/UpdateStatusModal";

interface ApplicationActionsProps {
    applicationId: string;
    currentStatus: string;
    onUpdate: () => void;
}

export default function ApplicationActions({ applicationId, currentStatus, onUpdate }: ApplicationActionsProps) {
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showOfferModal, setShowOfferModal] = useState(false);

    return (
        <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setShowStatusModal(true)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm transition-transform hover:scale-105 ${
                        currentStatus === 'COMPLETED' ? 'bg-emerald-500 text-white' :
                        currentStatus === 'DOCS_PENDING' ? 'bg-amber-500 text-white' :
                        'bg-blue-600 text-white'
                    }`}
                >
                    {currentStatus}
                </button>
            </div>
            
            <div className="flex flex-col items-end gap-2">
                <button
                    onClick={() => setShowOfferModal(true)}
                    className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-all"
                >
                    <FilePlus size={14} /> TEKLİF OLUŞTUR
                </button>
                
                <Link 
                    href={`/dashboard/applications/${applicationId}`}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[var(--primary)] flex items-center gap-1 transition-all"
                >
                    YÖNET VE DETAYLAR <ChevronRight size={14} />
                </Link>
            </div>

            {showStatusModal && (
                <UpdateStatusModal 
                    applicationId={applicationId}
                    currentStatus={currentStatus}
                    onClose={() => setShowStatusModal(false)}
                    onUpdate={onUpdate}
                />
            )}

            {showOfferModal && (
                <CreateOfferModal 
                    applicationId={applicationId}
                    onClose={() => setShowOfferModal(false)}
                    onCreated={onUpdate}
                />
            )}
        </div>
    );
}
