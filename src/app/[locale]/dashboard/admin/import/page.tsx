"use client";

import { useState } from "react";
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, RefreshCw, Loader2 } from "lucide-react";
import { processExcelImportAction } from "@/app/actions/excel-actions";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function BulkImportPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string; count?: number } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setResult(null);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("Lütfen bir dosya şeçiniz.");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await processExcelImportAction(formData);
            setResult(res as any);
            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.error || "Bir hata oluştu.");
            }
        } catch (error) {
            toast.error("Yükleme işlemi başarısız.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            <header>
                <div className="flex items-center gap-2 text-[#0B1751] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                    <FileSpreadsheet size={14} />
                    Veri Yönetimi
                </div>
                <h1 className="text-4xl font-black tracking-tighter text-[#0B1751]">Toplu Kurum İçe Aktarımı</h1>
                <p className="text-slate-600 font-bold mt-1">Excel dosyanızı yükleyin, sistem otomatik olarak tarasın ve kurumsal sayfaları oluştursun.</p>
            </header>

            <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-xl shadow-slate-200/50">
                <div 
                    className={`relative border-2 border-dashed rounded-2xl p-12 transition-all flex flex-col items-center justify-center text-center ${
                        file ? "border-[#0B1751] bg-slate-50" : "border-slate-200 hover:border-[#0B1751]/50"
                    }`}
                >
                    <input 
                        type="file" 
                        accept=".xlsx, .csv" 
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                        disabled={isUploading}
                    />
                    
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 ${file ? "bg-[#0B1751] text-white rotate-6" : "bg-slate-50 text-slate-400"}`}>
                        <Upload size={32} />
                    </div>

                    {file ? (
                        <div className="space-y-1">
                            <h3 className="text-xl font-black text-[#0B1751]">{file.name}</h3>
                            <p className="text-sm text-slate-500 font-bold">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            <h3 className="text-xl font-black text-[#0B1751]">Excel Dosyasını Sürükleyin veya Seçin</h3>
                            <p className="text-sm text-slate-500 font-bold">Desteklenen formatlar: .xlsx, .csv</p>
                        </div>
                    )}
                </div>

                <div className="mt-10 flex flex-col items-center gap-6">
                    <button
                        onClick={handleUpload}
                        disabled={!file || isUploading}
                        className="premium-btn w-full max-w-xs py-4 flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale transition-all"
                    >
                        {isUploading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                İşleniyor...
                            </>
                        ) : (
                            <>
                                <RefreshCw size={20} />
                                İçe Aktarmayı Başlat
                            </>
                        )}
                    </button>

                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        * Dosya şablonu: İsim, Web Sitesi, Kategori, Ülke, Şehir
                    </p>
                </div>
            </div>

            <AnimatePresence>
                {result && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-8 rounded-3xl border flex items-start gap-5 ${
                            result.success ? "bg-emerald-50 border-emerald-100 text-emerald-900" : "bg-red-50 border-red-100 text-red-900"
                        }`}
                    >
                        {result.success ? (
                            <CheckCircle2 size={28} className="text-emerald-600 shrink-0 mt-1" />
                        ) : (
                            <AlertCircle size={28} className="text-red-600 shrink-0 mt-1" />
                        )}
                        <div>
                            <h3 className="text-xl font-black tracking-tight mb-2">
                                {result.success ? "İşlem Başarılı" : "İşlem Başarısız"}
                            </h3>
                            <p className="font-bold opacity-80 leading-relaxed">
                                {result.message}
                            </p>
                            {result.count && (
                                <div className="mt-4 inline-flex items-center px-4 py-2 bg-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
                                    {result.count} Kayıt Algılandı
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <section className="bg-slate-50 rounded-3xl p-10 border border-slate-200">
                <h3 className="text-xl font-black text-[#0B1751] mb-6 flex items-center gap-2">
                    <AlertCircle size={20} className="text-red-600" />
                    Önemli Notlar
                </h3>
                <ul className="space-y-4 text-sm font-bold text-slate-700">
                    <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0" />
                        Web tarama işlemi bağlantı hızına bağlı olarak her kurum için 1-3 saniye sürebilir.
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0" />
                        Kurumsal sayfalar otomatik taslak olarak oluşturulur, daha sonra düzenleyebilirsiniz.
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0" />
                        Kategori ve Ülke isimlerinin sistemdeki kayıtlarla eşleştiğinden emin olun.
                    </li>
                </ul>
            </section>
        </div>
    );
}
