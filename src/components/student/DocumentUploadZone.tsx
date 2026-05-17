
"use client";

import { useState } from "react";
import { Upload, FileText, Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { uploadDocumentAction } from "@/app/actions/student-actions";
import { useRouter } from "next/navigation";


interface DocumentUploadZoneProps {
    applicationId: string;
    requiredDocs?: string[];
}

export default function DocumentUploadZone({ applicationId, requiredDocs = [] }: DocumentUploadZoneProps) {
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [docName, setDocName] = useState("");
    const [customName, setCustomName] = useState(false);
    const router = useRouter();

    const handleUpload = async () => {
        if (!file || !docName) return;
        setUploading(true);

        try {
            const mockUrl = `/uploads/${file.name}`; 

            const formData = new FormData();
            formData.append("applicationId", applicationId);
            formData.append("name", docName);
            formData.append("url", mockUrl);

            const result = await uploadDocumentAction(formData);
            if (result.success) {
                setFile(null);
                setDocName("");
                router.refresh();
            }
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl shadow-slate-200/20 dark:shadow-none">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">YENİ BELGE YÜKLE</h3>
            
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-60">BELGE TÜRÜ</label>
                        {!customName ? (
                            <div className="flex gap-2">
                                <select 
                                    value={docName}
                                    onChange={(e) => {
                                        if (e.target.value === "OTHER") {
                                            setCustomName(true);
                                            setDocName("");
                                        } else {
                                            setDocName(e.target.value);
                                        }
                                    }}
                                    className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-3 rounded-2xl text-xs font-bold outline-none focus:border-[var(--primary)] transition-all appearance-none"
                                >
                                    <option value="">Belge Seçin...</option>
                                    {requiredDocs.map((doc, i) => (
                                        <option key={i} value={doc}>{doc}</option>
                                    ))}
                                    <option value="OTHER">Diğer (Manuel Giriş)</option>
                                </select>
                                <button 
                                    onClick={() => { setCustomName(true); setDocName(""); }}
                                    className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-[var(--primary)] hover:text-white transition-all"
                                    title="Manuel Giriş"
                                >
                                    <FileText size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={docName}
                                    onChange={(e) => setDocName(e.target.value)}
                                    placeholder="Belge adını yazın..."
                                    className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-3 rounded-2xl text-xs font-bold outline-none focus:border-[var(--primary)] transition-all"
                                    autoFocus
                                />
                                <button 
                                    onClick={() => { setCustomName(false); setDocName(""); }}
                                    className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-rose-500 hover:text-white transition-all"
                                    title="Listeye Dön"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {!file ? (
                    <div className="relative group">
                        <input 
                            type="file" 
                            onChange={(e) => {
                                const selectedFile = e.target.files?.[0];
                                if (selectedFile) {
                                    setFile(selectedFile);
                                }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl p-12 text-center group-hover:border-[var(--primary)]/30 transition-all bg-slate-50/50 dark:bg-slate-800/30">
                            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-all duration-500">
                                <Upload size={24} className="text-slate-300 group-hover:text-[var(--primary)] transition-all" />
                            </div>
                            <p className="text-xs font-black text-slate-900 dark:text-white">Dosyayı buraya sürükleyin veya seçin</p>
                            <p className="text-[10px] text-slate-500 mt-2 uppercase font-black tracking-tighter">PDF, JPG, PNG (Max 10MB)</p>
                        </div>
                    </div>
                ) : (
                    <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 flex items-center justify-between animate-in zoom-in-95 duration-300">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-emerald-600 shadow-sm">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-emerald-900 dark:text-emerald-100 truncate max-w-[200px]">{file.name}</p>
                                <p className="text-[10px] font-bold text-emerald-600 uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB • HAZIR</p>
                            </div>
                        </div>
                        <button onClick={() => setFile(null)} className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all shadow-sm">
                            <X size={16} className="text-rose-500" />
                        </button>
                    </div>
                )}

                <button 
                    onClick={handleUpload}
                    disabled={!file || !docName || uploading}
                    className="w-full premium-btn py-5 flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale transition-all shadow-xl shadow-[var(--primary)]/20"
                >
                    {uploading ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />}
                    <span className="font-black h-fit text-sm">BELGEYİ SİSTEME YÜKLE</span>
                </button>
            </div>
        </div>
    );
}
