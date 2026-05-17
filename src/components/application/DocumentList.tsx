"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle, XCircle, Clock, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DocumentListProps {
    applicationId: string;
    documents: any[];
    requiredDocuments?: any[];
    canUpload: boolean;
    canApprove: boolean;
    onDocumentUpdate: () => void;
    role?: string;
}

export default function DocumentList({
    applicationId,
    documents,
    requiredDocuments = [],
    canUpload,
    canApprove,
    onDocumentUpdate,
    role = "STUDENT",
}: DocumentListProps) {

    const [uploading, setUploading] = useState(false);
    const [isOptionalUpload, setIsOptionalUpload] = useState(false);
    const [customName, setCustomName] = useState("");
    const [isLegalConfirmed, setIsLegalConfirmed] = useState(false);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "APPROVED":
                return <CheckCircle className="text-green-500" size={16} />;
            case "REJECTED":
                return <XCircle className="text-red-500" size={16} />;
            default:
                return <Clock className="text-orange-500" size={16} />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "APPROVED":
                return "bg-green-100 text-green-700";
            case "REJECTED":
                return "bg-red-100 text-red-700";
            default:
                return "bg-orange-100 text-orange-700";
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, nameOverride?: string) => {
        if (!isLegalConfirmed) {
            toast.error("Lütfen veri koruma ve kullanım şartlarını onaylayınız.");
            return;
        }

        const file = e.target.files?.[0];
        if (!file) return;

        const docName = nameOverride || customName || file.name;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("applicationId", applicationId);
            formData.append("name", docName);
            formData.append("confirmedLegal", "true");

            const response = await fetch(`/api/applications/${applicationId}/documents`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                toast.success("Belge başarıyla yüklendi");
                setCustomName("");
                setIsOptionalUpload(false);
                onDocumentUpdate();
            } else {
                const data = await response.json();
                toast.error(data.error || "Yükleme başarısız");
            }
        } catch (error) {
            toast.error("Bir hata oluştu");
            console.error("Upload failed:", error);
        } finally {
            setUploading(false);
        }
    };

    const [rejectingDocId, setRejectingDocId] = useState<string | null>(null);
    const [rejectionReason, setRejectionReason] = useState("");

    const handleStatusUpdate = async (documentId: string, status: string, reason?: string) => {
        try {
            const response = await fetch(`/api/documents/${documentId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status, rejectionReason: reason }),
            });

            if (response.ok) {
                onDocumentUpdate();
                setRejectingDocId(null);
                setRejectionReason("");
            }
        } catch (error) {
            console.error("Status update failed:", error);
        }
    };

    const handleDelete = async (documentId: string) => {
        if (!confirm("Bu belgeyi silmek istediğinize emin misiniz?")) return;

        try {
            const response = await fetch(`/api/documents/${documentId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("Belge silindi");
                onDocumentUpdate();
            } else {
                const data = await response.json();
                toast.error(data.error || "Silme işlemi başarısız");
            }
        } catch (error) {
            toast.error("Bir hata oluştu");
        }
    };

    const uploadedNames = documents.map(d => d.name);
    const missingDocuments = requiredDocuments.filter(req => !uploadedNames.includes(req.name));

    return (
        <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Belgeler</h3>
                {canUpload && (
                    <div className="flex gap-2">
                        {!isOptionalUpload ? (
                            <button
                                onClick={() => setIsOptionalUpload(true)}
                                className="premium-btn text-[10px] py-1.5 px-4 tracking-tighter"
                            >
                                <Upload size={14} className="inline mr-2" />
                                Opsiyonel Belge Ekle
                            </button>
                        ) : (
                            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                                <input
                                    type="text"
                                    placeholder="Belge Adı (Opsiyonel)..."
                                    className="text-[10px] font-black p-2 bg-white dark:bg-slate-900 border-none outline-none rounded-xl w-32 md:w-48 placeholder:text-slate-400 text-slate-900 dark:text-white"
                                    value={customName}
                                    onChange={(e) => setCustomName(e.target.value)}
                                />
                                <label className="bg-slate-950 text-white text-[10px] font-black py-2 px-4 rounded-xl cursor-pointer hover:bg-red-600 transition-all uppercase tracking-widest whitespace-nowrap">
                                    {uploading ? "Yükleniyor..." : "Dosya Seç"}
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => handleFileUpload(e)}
                                        disabled={uploading}
                                        accept=".pdf,.jpg,.jpeg,.png"
                                    />
                                </label>
                                <button
                                    onClick={() => {
                                        setIsOptionalUpload(false);
                                        setCustomName("");
                                    }}
                                    className="text-[10px] font-black text-slate-500 hover:text-red-500 p-2 uppercase tracking-tighter"
                                >
                                    İptal
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Compliance Checkbox */}
            {canUpload && (
                <div className="mb-6 p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-3">
                    <input
                        type="checkbox"
                        id="legal-confirm"
                        className="mt-1 w-4 h-4 rounded border-slate-300 text-[var(--primary)] focus:ring-[var(--primary)] cursor-pointer"
                        checked={isLegalConfirmed}
                        onChange={(e) => setIsLegalConfirmed(e.target.checked)}
                    />
                    <label htmlFor="legal-confirm" className="text-[10px] font-black text-slate-600 cursor-pointer leading-relaxed uppercase tracking-widest">
                        Yüklediğim belgelerin doğruluğunu onaylıyorum ve <span className="text-primary underline cursor-help">KVKK / Datenschutz</span> veri kullanım şartlarını kabul ediyorum.
                    </label>
                </div>
            )}

            {/* File type hint */}
            {canUpload && (
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                    Desteklenen formatlar: PDF, JPG, PNG (Maks 10MB)
                </p>
            )}

            {/* Missing Required Documents Section */}
            {missingDocuments.length > 0 && (
                <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl">
                    <h4 className="text-xs font-black uppercase tracking-widest text-amber-700 dark:text-amber-300 mb-3 flex items-center gap-2">
                        <Clock size={14} />
                        Eksik Zorunlu Belgeler
                    </h4>
                    <div className="space-y-2">
                        {missingDocuments.map((req, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm py-1 border-b border-amber-100 dark:border-amber-900/20 last:border-none">
                                <span className="font-medium text-slate-700 dark:text-slate-300">{req.name}</span>
                                <div className="flex items-center gap-3">
                                    {req.required && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">Zorunlu</span>}
                                    {canUpload && (
                                        <label className="text-[10px] font-black text-blue-600 hover:underline cursor-pointer uppercase tracking-widest">
                                            ŞİMDİ YÜKLE
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => handleFileUpload(e, req.name)}
                                                accept=".pdf,.jpg,.jpeg,.png"
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {documents.length === 0 && missingDocuments.length === 0 ? (
                <div className="text-center py-12 text-[var(--text-muted)]">
                    <FileText size={48} className="mx-auto mb-2 opacity-30" />
                    <p>Henüz belge yüklenmemiş</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {documents.map((doc) => (
                        <div key={doc.id} className="space-y-2">
                            <div
                                className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm group"
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <FileText size={20} className="text-[var(--primary)]" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-slate-900 dark:text-white">{doc.name}</p>
                                            <a
                                                href={doc.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[var(--primary)] hover:underline text-xs"
                                            >
                                                Görüntüle
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mt-1">
                                            <span>v{doc.version}</span>
                                            <span>•</span>
                                            <span>
                                                {new Date(doc.uploadedAt).toLocaleDateString("tr-TR")}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-bold flex items-center gap-1 ${getStatusColor(
                                            doc.status
                                        )}`}
                                    >
                                        {getStatusIcon(doc.status)}
                                        {doc.status}
                                    </span>

                                    {canApprove && (
                                        <div className="flex gap-2">
                                            {doc.status !== "APPROVED" && (
                                                <button
                                                    onClick={() => handleStatusUpdate(doc.id, "APPROVED")}
                                                    className="flex items-center gap-1 bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-tighter transition-all border border-green-200"
                                                    title="Onayla"
                                                >
                                                    <CheckCircle size={14} />
                                                    Onayla
                                                </button>
                                            )}
                                            {doc.status !== "REJECTED" && (
                                                <button
                                                    onClick={() => setRejectingDocId(doc.id)}
                                                    className="flex items-center gap-1 bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-tighter transition-all border border-red-200"
                                                    title="Reddet"
                                                >
                                                    <XCircle size={14} />
                                                    Reddet
                                                </button>
                                            )}
                                        </div>
                                    )}

                                    {canUpload && (
                                        // Staff can delete anything, Students can only delete PENDING/REJECTED
                                        (role !== "STUDENT") || (doc.status === "PENDING" || doc.status === "REJECTED")
                                    ) && (
                                            <button
                                                onClick={() => handleDelete(doc.id)}
                                                className="text-slate-400 hover:text-red-600 p-2 rounded transition-colors"
                                                title="Sil"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                </div>
                            </div>

                            {/* Rejection Form */}
                            {rejectingDocId === doc.id && (
                                <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-lg animate-in fade-in slide-in-from-top-2">
                                    <p className="text-sm font-bold text-red-800 dark:text-red-200 mb-2">Red Nedeni Belirtin</p>
                                    <textarea
                                        className="w-full p-2 border border-red-300 dark:border-red-900/40 rounded bg-white dark:bg-slate-900 text-sm"
                                        placeholder="Örn: Belge okunmuyor, tarih geçersiz..."
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                        rows={2}
                                    />
                                    <div className="flex justify-end gap-2 mt-2">
                                        <button
                                            onClick={() => setRejectingDocId(null)}
                                            className="px-3 py-1 text-sm font-medium text-slate-600"
                                        >
                                            İptal
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(doc.id, "REJECTED", rejectionReason)}
                                            className="px-3 py-1 text-sm font-bold bg-red-600 text-white rounded hover:bg-red-700"
                                            disabled={!rejectionReason.trim()}
                                        >
                                            Reddet
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Display Reason if Rejected */}
                            {doc.status === "REJECTED" && doc.rejectionReason && (
                                <div className="p-4 bg-red-50/50 dark:bg-red-500/5 border border-red-100 dark:border-red-900/20 border-l-4 border-l-red-500 rounded-2xl text-xs animate-in fade-in slide-in-from-top-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                        <p className="font-black text-red-800 dark:text-red-200 uppercase tracking-widest text-[9px]">Red Gerekçesi</p>
                                    </div>
                                    <p className="text-red-700 dark:text-red-300 font-medium pl-3.5 leading-relaxed">{doc.rejectionReason}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
