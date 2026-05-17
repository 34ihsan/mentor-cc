"use client";

import { useState } from "react";
import { FileSignature, ShieldCheck, Download, Upload, CheckCircle, Clock, FileText, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface ContractManagerProps {
    contract: any;
    onUpdate: () => void;
    role: string;
}

export default function ContractManager({ contract, onUpdate, role }: ContractManagerProps) {
    const [uploading, setUploading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [isLegalConfirmed, setIsLegalConfirmed] = useState(false);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isLegalConfirmed) {
            toast.error("Lütfen sözleşme şartlarını ve veri kullanımını onaylayınız.");
            return;
        }
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const { url } = await res.json();

                // Update contract status and signedUrl
                const updateRes = await fetch(`/api/contracts/${contract.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        status: "SIGNED",
                        signedUrl: url,
                        confirmedLegal: true
                    }),
                });

                if (updateRes.ok) {
                    toast.success("Sözleşme başarıyla yüklendi ve imzalandı olarak işaretlendi.");
                    onUpdate();
                }
            }
        } catch (error) {
            toast.error("Dosya yükleme başarısız");
        } finally {
            setUploading(false);
        }
    };

    const handleStatusUpdate = async (status: string) => {
        try {
            const res = await fetch(`/api/contracts/${contract.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status, confirmedLegal: status === "SIGNED" }),
            });
            if (res.ok) {
                toast.success(`Sözleşme ${status === 'SIGNED' ? 'onaylandı' : 'güncellendi'}`);
                onUpdate();
            }
        } catch (error) {
            toast.error("İşlem başarısız");
        }
    };

    const isSigned = contract.status === "SIGNED";
    const isStaff = role !== "STUDENT";

    return (
        <>
            <div className={`glass-card overflow-hidden border-2 transition-all duration-500 ${isSigned ? 'border-emerald-100 bg-emerald-50/20' : 'border-slate-100 dark:border-slate-800'}`}>
                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-500 ${isSigned ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                {isSigned ? <ShieldCheck size={28} /> : <FileSignature size={28} />}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{contract.title || "Hizmet Sözleşmesi"}</h4>
                                    {isSigned && (
                                        <span className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter">
                                            <CheckCircle size={10} /> Tamamlandı
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${isSigned ? 'text-emerald-600' : 'text-amber-600'}`}>
                                        {isSigned ? <ShieldCheck size={12} /> : <Clock size={12} />}
                                        {isSigned ? 'Güvenli Doküman / İmzalı' : 'İmza Bekliyor'}
                                    </span>
                                    <span className="text-slate-300 dark:text-slate-700">|</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ID: #{contract.id.slice(-6).toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {!isSigned && role === "STUDENT" && (
                        <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-900/30 max-w-sm mt-6">
                            <input
                                type="checkbox"
                                id="contract-legal"
                                className="mt-1 w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                                checked={isLegalConfirmed}
                                onChange={(e) => setIsLegalConfirmed(e.target.checked)}
                            />
                            <label htmlFor="contract-legal" className="text-[10px] font-black text-slate-600 dark:text-slate-400 cursor-pointer leading-tight uppercase tracking-widest">
                                Bu belgeyi imzaladığımı ve <span className="underline italic">Mentor Career</span> veri gizliliği şartlarını kabul ettiğimi beyan ederim.
                            </label>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto mt-6">
                        <button
                            onClick={() => {
                                const printContent = document.getElementById(`contract-print-${contract.id}`);
                                if (printContent) {
                                    const printWindow = window.open('', '_blank');
                                    if (printWindow) {
                                        printWindow.document.write(`
                                            <html>
                                                <head>
                                                    <title>${contract.title || 'Sözleşme'}</title>
                                                    <style>
                                                        body { font-family: 'Inter', sans-serif; padding: 40px; color: #1a1a1a; line-height: 1.6; }
                                                        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #003366; padding-bottom: 20px; }
                                                        .logo { font-size: 24px; font-weight: 900; color: #003366; margin-bottom: 10px; }
                                                        h1 { font-size: 20px; margin-bottom: 10px; }
                                                        .content { margin-top: 20px; text-align: justify; }
                                                        .footer { margin-top: 60px; display: grid; grid-template-cols: 1fr 1fr; gap: 40px; }
                                                        .signature-box { border: 1px dashed #ccc; padding: 40px; text-align: center; border-radius: 12px; }
                                                        .label { font-size: 10px; font-weight: bold; text-transform: uppercase; color: #666; margin-bottom: 10px; }
                                                        @media print { .no-print { display: none; } }
                                                    </style>
                                                </head>
                                                <body>
                                                    <div class="header">
                                                                                                                 <img src="/images/MentorCareer.png" style="height: 60px; width: auto; margin-bottom: 10px;" alt="Mentor Career Logo">
                                                        <h1>${contract.title || 'HİZMET SÖZLEŞMESİ'}</h1>
                                                        <div style="font-size: 12px; color: #666;">Tarih: ${new Date().toLocaleDateString('tr-TR')}</div>
                                                    </div>
                                                    <div class="content">${contract.content}</div>
                                                    <div class="footer">
                                                        <div class="signature-box">
                                                            <div class="label">DANIŞAN (ÖĞRENCİ)</div>
                                                            <div style="margin-top: 40px; border-top: 1px solid #000; padding-top: 10px;">İmza / Kaşe</div>
                                                        </div>
                                                        <div class="signature-box">
                                                            <div class="label">Mentor Career (DANIŞMANLIK)</div>
                                                            <div style="margin-top: 40px; border-top: 1px solid #000; padding-top: 10px;">İmza / Kaşe</div>
                                                        </div>
                                                    </div>
                                                    <script>window.onload = () => { window.print(); window.close(); }</script>
                                                </body>
                                            </html>
                                        `);
                                        printWindow.document.close();
                                    }
                                }
                            }}
                            className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
                        >
                            <Download size={20} />
                            <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest">Yazdır / PDF</span>
                        </button>

                        {!isSigned && role === "STUDENT" && (
                            <label className="flex-1 md:flex-none cursor-pointer">
                                <div className="px-6 py-4 bg-slate-900 text-white dark:bg-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl flex items-center justify-center gap-2">
                                    {uploading ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Upload size={18} />}
                                    İmzalı Kopyayı Yükle
                                </div>
                                <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.jpg,.jpeg,.png" disabled={uploading} />
                            </label>
                        )}

                        {isSigned && contract.signedUrl && (
                            <div className="flex gap-2 w-full md:w-auto">
                                <a
                                    href={contract.signedUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 md:flex-none px-6 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                                >
                                    <Download size={18} />
                                    İmzalı Belgeyi İndir
                                </a>
                                {isStaff && contract.status === "SIGNED" && (
                                    <button
                                        onClick={() => handleStatusUpdate("COMPLETED")}
                                        className="px-6 py-4 bg-slate-900 text-white dark:bg-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center gap-2"
                                    >
                                        <CheckCircle size={18} />
                                        İmzayı Onayla
                                    </button>
                                )}
                            </div>
                        )}

                        <button
                            onClick={() => setShowPreview(!showPreview)}
                            className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
                        >
                            <FileText size={20} />
                            <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest">Metni Gör</span>
                        </button>
                    </div>
                </div>
                <div id={`contract-print-${contract.id}`} className="hidden" dangerouslySetInnerHTML={{ __html: contract.content }} />

                <AnimatePresence>
                    {showPreview && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="p-8 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
                                <div className="max-w-4xl mx-auto bg-white p-12 rounded-[40px] shadow-2xl border border-slate-100 italic">
                                    <div className="flex justify-between items-center mb-10 border-b border-slate-100 dark:border-slate-800 pb-6">
                                                                                 <img src="/images/MentorCareer.png" className="h-10 w-auto object-contain" alt="Mentor Career Logo" />
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <AlertCircle size={14} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Sözleşme Taslağı Önizleme</span>
                                        </div>
                                    </div>
                                    <div className="prose max-w-none text-sm leading-relaxed text-black" dangerouslySetInnerHTML={{ __html: contract.content }} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
