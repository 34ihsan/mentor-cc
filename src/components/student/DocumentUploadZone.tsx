
"use client";

import { useState } from "react";
import { Upload, FileText, Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { uploadDocumentAction } from "@/app/actions/student-actions";
import { useRouter } from "next/navigation";

interface DocumentUploadZoneProps {
    applicationId: string;
}

export default function DocumentUploadZone({ applicationId }: DocumentUploadZoneProps) {
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [docName, setDocName] = useState("");
    const router = useRouter();

    const handleUpload = async () => {
        if (!file || !docName) return;
        setUploading(true);

        try {
            // In a real app, you would upload to S3/Cloudinary first
            // Here we'll simulate the URL for now
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
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">YENİ BELGE YÜKLE</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60">BELGE ADI</label>
                    <input 
                        type="text" 
                        value={docName}
                        onChange={(e) => setDocName(e.target.value)}
                        placeholder="Örn: Pasaport Fotokopisi"
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-3 rounded-2xl text-xs font-bold outline-none focus:border-[var(--primary)] transition-all"
                    />
                </div>
            </div>

            {!file ? (
                <div className="relative group">
                    <input 
                        type="file" 
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl p-12 text-center group-hover:border-[var(--primary)]/30 transition-all bg-slate-50/50 dark:bg-slate-800/30">
                        <Upload size={32} className="mx-auto mb-4 text-slate-300 group-hover:text-[var(--primary)] transition-all" />
                        <p className="text-xs font-bold text-slate-900 dark:text-white">Dosyayı buraya sürükleyin veya seçin</p>
                        <p className="text-[10px] text-slate-500 mt-2 uppercase font-black">PDF, JPG, PNG (Max 10MB)</p>
                    </div>
                </div>
            ) : (
                <div className="p-6 rounded-3xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-blue-600 shadow-sm">
                            <FileText size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-black text-blue-900 dark:text-blue-100 truncate max-w-[200px]">{file.name}</p>
                            <p className="text-[10px] font-bold text-blue-600 uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    </div>
                    <button onClick={() => setFile(null)} className="p-2 hover:bg-white rounded-xl transition-all">
                        <X size={16} className="text-blue-900" />
                    </button>
                </div>
            )}

            <button 
                onClick={handleUpload}
                disabled={!file || !docName || uploading}
                className="w-full premium-btn py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale transition-all"
            >
                {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                <span className="font-black h-fit">SİSTEME GÖNDER</span>
            </button>
        </div>
    );
}
