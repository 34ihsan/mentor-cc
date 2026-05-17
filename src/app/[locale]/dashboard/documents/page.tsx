"use client";

import { useState, useEffect } from "react";
import {
    FileText,
    Search,
    Filter,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    ArrowRight,
    Upload,
    Trash2
} from "lucide-react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";

export default function MyDocumentsPage() {
    const { data: session } = useSession();
    const [documents, setDocuments] = useState<any[]>([]);
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    // Remove activeTab as we only focus on documents now
    const [selectedApp, setSelectedApp] = useState("");
    const [showUpload, setShowUpload] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [docName, setDocName] = useState("");
    const [rejectionReason, setRejectionReason] = useState("");
    const [isLegalConfirmed, setIsLegalConfirmed] = useState(false);
    const [rejectingDocId, setRejectingDocId] = useState<string | null>(null);

    useEffect(() => {
        fetchDocuments();
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await fetch("/api/applications");
            if (res.ok) {
                const data = await res.json();
                setApplications(data);
            }
        } catch (error) {
            console.error("Failed to fetch applications:", error);
        }
    };

    const fetchDocuments = async () => {
        try {
            const res = await fetch("/api/documents");
            if (res.ok) {
                const data = await res.json();
                setDocuments(data);
            }
        } catch (error) {
            console.error("Failed to fetch documents:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (documentId: string, status: string, reason?: string) => {
        try {
            const response = await fetch(`/api/documents/${documentId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status, rejectionReason: reason }),
            });

            if (response.ok) {
                toast.success("Durum güncellendi");
                fetchDocuments();
                setRejectingDocId(null);
                setRejectionReason("");
            }
        } catch (error) {
            toast.error("Güncelleme başarısız");
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
                fetchDocuments();
            } else {
                const data = await response.json();
                toast.error(data.error || "Silme başarısız");
            }
        } catch (error) {
            toast.error("Bir hata oluştu");
        }
    };

    const role = session?.user?.role || "STUDENT";
    const isAdminStaff = role === "ADMIN" || role === "CEO" || role === "ADVISOR" || role === "AGENCY_MANAGER";

    const filtered = documents.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) ||
            doc.application?.program?.name?.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "ALL" || doc.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "APPROVED":
                return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20";
            case "REJECTED":
                return "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20";
            default:
                return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "APPROVED": return <CheckCircle size={14} />;
            case "REJECTED": return <XCircle size={14} />;
            default: return <Clock size={14} />;
        }
    };

    // Missing Documents Logic
    const missingDocs = applications.flatMap(app => {
        const category = app.program?.category || "UNIVERSITY";
        let required: string[] = [];
        
        if (category.includes("UNIVERSITY") || category.includes("MASTER")) {
            required = ["Pasaport", "Transkript", "Diploma", "Motivasyon Mektubu", "Dil Belgesi"];
        } else if (category.includes("LANGUAGE")) {
            required = ["Pasaport", "Vize Fotoğrafı", "Banka Teminatı"];
        } else {
            required = ["Pasaport"];
        }

        const uploadedNames = documents
            .filter(d => d.applicationId === app.id || d.applicationId === null)
            .map(d => d.name.toLowerCase());

        return required
            .filter(req => !uploadedNames.some(u => u.includes(req.toLowerCase())))
            .map(req => ({ name: req, app: app.program?.name, appId: app.id }));
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2.5 text-secondary font-black text-[10px] uppercase tracking-[0.4em] mb-3">
                        <div className="w-8 h-px bg-secondary opacity-30" />
                        <FileText size={12} className="text-secondary/60" />
                        {isAdminStaff ? "Evrak Onay & Kontrol" : "Belge Yönetimi"}
                    </div>
                    <h1 className="text-4xl font-serif font-bold italic tracking-tight text-primary flex items-center gap-4">
                        {isAdminStaff ? "Evrak Onay Merkezi" : "Belgelerim"}
                    </h1>
                </div>
                <button
                    onClick={() => setShowUpload(!showUpload)}
                    className="btn-primary py-3 px-6 text-xs flex items-center gap-2"
                >
                    <Upload size={18} />
                    {isAdminStaff ? "Yeni Belge / Talep" : "Yeni Belge Yükle"}
                </button>
            </div>

            {/* Missing Documents Alert Section (For Students) */}
            {!isAdminStaff && missingDocs.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="premium-card p-6 bg-red-50/50 border-red-100/50"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-red-500 text-white">
                            <AlertCircle size={20} />
                        </div>
                        <h3 className="text-xs font-black text-red-950 uppercase tracking-widest">Eksik Belgeleriniz Var</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {missingDocs.map((doc, idx) => (
                            <div key={idx} className="bg-white/80 p-4 rounded-2xl border border-red-100 flex items-center justify-between group hover:bg-white transition-all shadow-sm">
                                <div>
                                    <p className="text-xs font-black text-zinc-900 mb-0.5">{doc.name}</p>
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">{doc.app}</p>
                                </div>
                                <button 
                                    onClick={() => {
                                        setDocName(doc.name);
                                        setSelectedApp(doc.appId);
                                        setShowUpload(true);
                                    }}
                                    className="p-2 rounded-lg bg-red-100 text-red-600 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                >
                                    <Upload size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Remove Tab Navigation for Advisor/Staff - only focus on documents here */}

            {/* Upload Section */}
            <AnimatePresence>
                {showUpload && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="premium-card p-6 mb-8 space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-widest mb-4">Yeni Belge Yükle</h3>

                            {/* Compliance Toggle */}
                            <div className="p-4 bg-white rounded-2xl border border-zinc-100 flex items-start gap-4">
                                <input
                                    type="checkbox"
                                    id="page-legal"
                                    className="mt-1 w-5 h-5 rounded border-zinc-300 text-primary focus:ring-primary cursor-pointer"
                                    checked={isLegalConfirmed}
                                    onChange={(e) => setIsLegalConfirmed(e.target.checked)}
                                />
                                <label htmlFor="page-legal" className="text-[10px] font-black text-zinc-600 cursor-pointer leading-relaxed uppercase tracking-widest">
                                    Yükleyeceğim belgelerin doğruluğunu teyit ediyorum ve <span className="text-primary underline">Mentor Career Veri Politikası / KVKK</span> metnini okuduğumu kabul ediyorum.
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <select
                                    className="p-3 rounded-xl border-zinc-200 bg-zinc-50 text-sm font-bold w-full"
                                    value={selectedApp}
                                    onChange={(e) => setSelectedApp(e.target.value)}
                                >
                                    <option value="">Belge Türü / Başvuru Seçin...</option>
                                    <option value="GENERAL">Genel Belge (Opsiyonel / Başvuruya Bağlı Değil)</option>
                                    {applications.map(app => (
                                        <option key={app.id} value={app.id}>{app.program?.name} ({app.student?.name})</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    placeholder="Belge Adı (Örn: Pasaport)"
                                    className="p-3 rounded-xl border-zinc-200 bg-zinc-50 text-sm font-bold w-full"
                                    value={docName}
                                    onChange={(e) => setDocName(e.target.value)}
                                />
                                <div className="flex gap-2">
                                    <label className={`flex-1 flex items-center justify-center p-3 rounded-xl border-2 border-dashed border-zinc-200 hover:border-primary transition-all cursor-pointer ${!selectedApp || !docName ? 'opacity-50 pointer-events-none' : ''}`}>
                                        <span className="text-xs font-black uppercase tracking-widest">{uploading ? 'Yükleniyor...' : 'Dosya Seç'}</span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            disabled={uploading || !selectedApp || !docName}
                                            onChange={async (e) => {
                                                if (!isLegalConfirmed) {
                                                    toast.error("Lütfen veri kullanım şartlarını onaylayınız.");
                                                    return;
                                                }
                                                const file = e.target.files?.[0];
                                                if (!file) return;
                                                setUploading(true);
                                                const formData = new FormData();
                                                formData.append("file", file);
                                                formData.append("name", docName);
                                                if (selectedApp !== "GENERAL") {
                                                    formData.append("applicationId", selectedApp);
                                                }
                                                formData.append("confirmedLegal", "true");

                                                try {
                                                    const url = selectedApp === "GENERAL" ? `/api/documents` : `/api/applications/${selectedApp}/documents`;
                                                    const res = await fetch(url, {
                                                        method: "POST",
                                                        body: formData
                                                    });
                                                    if (res.ok) {
                                                        toast.success("Belge başarıyla yüklendi");
                                                        setDocName("");
                                                        setSelectedApp("");
                                                        setShowUpload(false);
                                                        fetchDocuments();
                                                    } else {
                                                        const data = await res.json();
                                                        toast.error(data.error || "Yükleme hatası");
                                                    }
                                                } catch (err) {
                                                    toast.error("Yükleme hatası");
                                                } finally {
                                                    setUploading(false);
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                            </motion.div>
                )}
            </AnimatePresence>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8 premium-card p-1.5 flex items-center gap-3">
                    <div className="pl-4 text-zinc-400">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Belge adı veya program ile ara..."
                        className="bg-transparent border-none outline-none w-full py-3 text-sm font-medium text-zinc-700"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="md:col-span-4 premium-card p-1.5 flex items-center gap-3">
                    <div className="pl-4 text-zinc-400">
                        <Filter size={18} />
                    </div>
                    <select
                        className="bg-transparent border-none outline-none w-full py-3 text-sm font-bold appearance-none cursor-pointer text-zinc-700"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="ALL">Tüm Durumlar</option>
                        <option value="PENDING">Beklemede</option>
                        <option value="APPROVED">Onaylandı</option>
                        <option value="REJECTED">Reddedildi</option>
                    </select>
                </div>
            </div>
            {/* Documents List */}
            <div className="premium-card overflow-hidden">
                {filtered.length === 0 ? (
                    <div className="text-center py-20 opacity-40">
                        <FileText size={48} className="mx-auto mb-4 text-zinc-400" />
                        <p className="font-bold text-zinc-500 uppercase tracking-widest text-xs">Belge Bulunamadı</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-zinc-50 border-b border-zinc-100">
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Belge</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Başvuru / Program</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Durum</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Tarih</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-50">
                                {filtered.map((doc, index) => (
                                    <motion.tr
                                        key={doc.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-zinc-50 transition-colors group cursor-pointer"
                                    >
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-zinc-100 text-zinc-600 group-hover:bg-primary group-hover:text-white transition-colors">
                                                    <FileText size={18} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-zinc-900 text-sm tracking-tight">{doc.name}</p>
                                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">v{doc.version}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div>
                                                <p className="text-sm font-bold text-zinc-900 tracking-tight">
                                                    {doc.application?.program?.name || "Genel"}
                                                </p>
                                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                                    {doc.application?.student?.name}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(doc.status)}`}>
                                                {getStatusIcon(doc.status)}
                                                {doc.status}
                                            </span>
                                            {doc.isRequired && (
                                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black bg-red-100 text-red-600 border border-red-200 uppercase tracking-tighter">
                                                    Zorunlu
                                                </span>
                                            )}
                                            {doc.status === "REJECTED" && doc.rejectionReason && (
                                                <div className="mt-2 p-2 bg-red-50/50 dark:bg-red-500/5 border-l-2 border-red-500 rounded text-[9px] font-bold text-red-700 dark:text-red-400 max-w-[200px] animate-in fade-in slide-in-from-top-1">
                                                    <span className="opacity-60 uppercase mr-1 italic">Not:</span>
                                                    {doc.rejectionReason}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-8 py-5 text-xs font-bold text-zinc-600 uppercase tracking-widest">
                                            {new Date(doc.uploadedAt).toLocaleDateString("tr-TR")}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 text-right">
                                                {isAdminStaff && doc.status === "PENDING" && (
                                                    <div className="flex items-center gap-1 mr-2 border-r border-zinc-100 pr-2">
                                                        <button
                                                            onClick={() => handleStatusUpdate(doc.id, "APPROVED")}
                                                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                            title="Onayla"
                                                        >
                                                            <CheckCircle size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => setRejectingDocId(doc.id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Reddet"
                                                        >
                                                            <XCircle size={16} />
                                                        </button>
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-1">
                                                    <a
                                                        href={doc.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-primary transition-all text-[10px] font-black uppercase tracking-widest"
                                                    >
                                                        Görüntüle
                                                    </a>

                                                    {(isAdminStaff || doc.status === "PENDING" || doc.status === "REJECTED") && (
                                                        <button
                                                            onClick={() => handleDelete(doc.id)}
                                                            className="p-2 text-zinc-400 hover:text-red-600 rounded-lg transition-colors"
                                                            title="Sil"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    )}

                                                    {doc.applicationId && (
                                                        <Link
                                                            href={`/dashboard/applications/${doc.applicationId}`}
                                                            className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-primary transition-all font-black text-[10px] uppercase tracking-widest"
                                                            title="Başvuruya Git"
                                                        >
                                                            İncele
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Rejection Popover */}
                                            <AnimatePresence>
                                                {rejectingDocId === doc.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.95 }}
                                                        className="absolute right-8 mt-2 z-50 premium-card p-4 shadow-2xl border-red-100 w-64 text-left"
                                                    >
                                                        <p className="text-[10px] font-black uppercase text-red-600 mb-2">Red Nedeni</p>
                                                        <textarea
                                                            className="w-full text-xs p-2 border border-red-100 rounded-lg mb-3 bg-white"
                                                            placeholder="Red nedenini yazın..."
                                                            value={rejectionReason}
                                                            onChange={(e) => setRejectionReason(e.target.value)}
                                                            rows={2}
                                                        />
                                                        <div className="flex justify-end gap-2">
                                                            <button onClick={() => setRejectingDocId(null)} className="text-[10px] font-bold text-zinc-400 uppercase">İptal</button>
                                                            <button
                                                                onClick={() => handleStatusUpdate(doc.id, "REJECTED", rejectionReason)}
                                                                className="bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase"
                                                            >
                                                                Kaydet
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
