
"use client";

import { agencyUploadDocumentAction } from "@/app/actions/agency-actions";
import { useState } from "react";
import { 
    Upload, 
    FileText, 
    CheckCircle2, 
    Loader2, 
    X,
    FolderOpen
} from "lucide-react";
import { toast } from "sonner";

interface Props {
    applicationId: string;
    studentId: string;
}

export default function AgencyDocumentUploadZone({ applicationId, studentId }: Props) {
    const [uploading, setUploading] = useState(false);
    const [fileName, setFileName] = useState("");

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUploading(true);

        const formData = new FormData(e.currentTarget);
        formData.append("applicationId", applicationId);
        // In a real app, we would upload to S3/Cloudinary first and get a URL
        // Here we simulate the URL
        formData.append("url", `/mock-storage/${fileName}`);

        try {
            const result = await agencyUploadDocumentAction(formData);
            if (result.success) {
                toast.success("Belge başarıyla yüklendi");
                setFileName("");
                (e.target as HTMLFormElement).reset();
            } else {
                toast.error(result.error || "Yükleme başarısız");
            }
        } catch (error) {
            toast.error("İşlem sırasında bir hata oluştu");
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleUpload} className="glass-card p-10 border-white shadow-2xl space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <FolderOpen size={120} />
            </div>

            <div className="space-y-2 relative z-10">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Belge Yükle</h3>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Lütfen belgenin adını ve dosyasını seçin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">BELGE ADI</label>
                    <input 
                        required
                        name="name"
                        type="text" 
                        placeholder="Örn: Pasaport, Transkript..."
                        onChange={(e) => setFileName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm font-bold outline-none focus:border-[var(--primary)] transition-all"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">DOSYA SEÇİN</label>
                    <div className="relative">
                        <input 
                            required
                            type="file" 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />
                        <div className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm font-bold flex items-center gap-3 text-slate-400">
                            <Upload size={16} />
                            <span>Dosya Seçilmedi</span>
                        </div>
                    </div>
                </div>
            </div>

            <button 
                disabled={uploading || !fileName}
                type="submit"
                className="w-full premium-btn py-5 flex items-center justify-center gap-3 disabled:opacity-50 relative z-10"
            >
                {uploading ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle2 size={20} />}
                <span className="font-black h-fit uppercase tracking-widest text-xs">BELGEYİ SİSTEME YÜKLE</span>
            </button>
        </form>
    );
}
