"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";

interface StatusControlsProps {
    currentStatus: string;
    role: string;
    applicationId: string;
    onStatusChange: () => void;
}

const statusTransitions: Record<string, string[]> = {
    DRAFT: ["DOCS_PENDING", "UNDER_REVIEW"],
    DOCS_PENDING: ["UNDER_REVIEW", "DRAFT"],
    UNDER_REVIEW: ["OFFER_SENT", "DOCS_PENDING", "REJECTED"],
    OFFER_SENT: ["CONTRACT_SIGNED", "UNDER_REVIEW", "REJECTED"],
    CONTRACT_SIGNED: ["COMPLETED", "REJECTED"],
    REJECTED: ["DRAFT"],
    COMPLETED: [],
};

const statusLabels: Record<string, string> = {
    DRAFT: "Taslak",
    DOCS_PENDING: "Belgeler Bekleniyor",
    UNDER_REVIEW: "İncelemede / Değerlendirmede",
    OFFER_SENT: "Teklif Gönderildi",
    CONTRACT_SIGNED: "Sözleşme İmzalandı",
    REJECTED: "Reddedildi",
    COMPLETED: "Tamamlandı",
};

export default function StatusControls({
    currentStatus,
    role,
    applicationId,
    onStatusChange,
}: StatusControlsProps) {
    const [loading, setLoading] = useState(false);

    // Only consultants, agencies, and admins can change status
    if (role === "STUDENT") {
        return null;
    }

    const availableTransitions = statusTransitions[currentStatus] || [];

    if (availableTransitions.length === 0) {
        return null;
    }

    const handleStatusChange = async (newStatus: string) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/applications/${applicationId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                onStatusChange();
            }
        } catch (error) {
            console.error("Status update failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card p-6">
            <h3 className="text-lg font-black mb-6 text-slate-900 dark:text-white uppercase tracking-tight">Durum Değiştir</h3>
            <div className="space-y-2">
                {availableTransitions.map((status) => (
                    <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        disabled={loading}
                        className="w-full premium-btn flex items-center justify-center gap-2 text-sm py-2"
                    >
                        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                        {statusLabels[status]} olarak işaretle
                    </button>
                ))}
            </div>
        </div>
    );
}
