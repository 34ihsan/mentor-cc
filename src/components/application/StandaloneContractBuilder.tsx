"use client";

import { FileText, Send, X, Eye, User, Globe, Building2, BookOpen, Clock, DollarSign, Printer, Download, Edit3, Save } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { getContractTemplateHtml } from "@/app/actions/template-actions";

interface StandaloneContractBuilderProps {
    student?: any;
    onContractCreated: () => void;
    onClose: () => void;
}

export default function StandaloneContractBuilder({ student, onContractCreated, onClose }: StandaloneContractBuilderProps) {
    const [loading, setLoading] = useState(false);
    const [templateKey, setTemplateKey] = useState("STUDENT_CONTRACT_2026");
    
    // Manual Data Fields
    const [studentName, setStudentName] = useState(student?.name || "");
    const [studentEmail, setStudentEmail] = useState(student?.email || "");
    const [nationality, setNationality] = useState("TC");
    const [parentName, setParentName] = useState("");
    const [passportId, setPassportId] = useState("");
    const [phone, setPhone] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [institutionName, setInstitutionName] = useState("");
    const [programName, setProgramName] = useState("");
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [title, setTitle] = useState("Öğrenci Sözleşmesi 2026");

    // Manual Edit States
    const [isManualEdit, setIsManualEdit] = useState(false);
    const [manualContent, setManualContent] = useState("");

    // Dynamic Preview Content
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!isManualEdit) {
                const data = {
                    studentName,
                    studentEmail,
                    nationality,
                    parentName,
                    passportId,
                    phone,
                    birthDate,
                    address,
                    country,
                    serviceType,
                    institutionName,
                    programName,
                    price: amount || "0.00",
                    currency,
                    date: new Date().toLocaleDateString('tr-TR'),
                };
                
                const html = await getContractTemplateHtml(templateKey, data);
                if (html) {
                    setManualContent(html);
                }
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [
        templateKey, studentName, studentEmail, nationality, parentName, 
        passportId, phone, birthDate, address, country, serviceType, 
        institutionName, programName, amount, currency, isManualEdit
    ]);

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;
        
        printWindow.document.write(`
            <html>
                <head>
                    <title>${title}</title>
                    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                    <style>
                        @media print {
                            body { -webkit-print-color-adjust: exact; }
                            .no-print { display: none; }
                        }
                        body { font-family: sans-serif; }
                    </style>
                </head>
                <body class="p-10 bg-white">
                    <div class="max-w-4xl mx-auto border p-12 shadow-sm">
                        ${manualContent}
                    </div>
                    <script>
                        setTimeout(() => {
                            window.print();
                            window.close();
                        }, 500);
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };

    const handleSubmit = async () => {
        if (!studentName || !studentEmail) {
            toast.error("Öğrenci adı ve e-posta zorunludur.");
            return;
        }

        setLoading(true);
        try {
            const customData = {
                studentName,
                studentEmail,
                nationality,
                parentName,
                passportId,
                phone,
                birthDate,
                address,
                country,
                serviceType,
                institutionName,
                programName,
                price: amount || "---",
                currency,
                date: new Date().toLocaleDateString('tr-TR'),
            };

            const response = await fetch("/api/contracts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    studentId: student?.id || null, // Optional if we just want to send by email/name context
                    studentEmail,
                    templateKey,
                    title,
                    customData: {
                        ...customData,
                        manualContent: isManualEdit ? manualContent : undefined
                    },
                    // If your API supports full content override, send it here
                    content: manualContent 
                }),
            });

            if (response.ok) {
                toast.success("Sözleşme başarıyla oluşturuldu ve gönderildi.");
                onContractCreated();
                onClose();
            } else {
                const error = await response.json();
                toast.error(error.error || "Sözleşme oluşturulamadı.");
            }
        } catch (error) {
            console.error("Failed to create contract:", error);
            toast.error("Bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="glass-card w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b border-[var(--border)] flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <FileText className="text-[var(--primary)]" />
                            Profesyonel Sözleşme Hazırlama
                        </h2>
                        <p className="text-xs text-[var(--text-muted)] mt-1 uppercase tracking-widest font-bold">
                            Manuel veri girişi ile yeni sözleşme oluştur
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1 space-y-8">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                            <User size={12} />
                            Öğrenci Bilgileri
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Öğrenci Ad Soyad</label>
                                <input
                                    className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                    value={studentName}
                                    onChange={(e) => setStudentName(e.target.value)}
                                    placeholder="Ad Soyad"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">E-posta Adresi</label>
                                <input
                                    className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                    value={studentEmail}
                                    onChange={(e) => setStudentEmail(e.target.value)}
                                    placeholder="ornek@mail.com"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Uyruk</label>
                                <input
                                    className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                    value={nationality}
                                    onChange={(e) => setNationality(e.target.value)}
                                    placeholder="TC"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Veli Adı</label>
                                <input
                                    className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                    value={parentName}
                                    onChange={(e) => setParentName(e.target.value)}
                                    placeholder="Veli Ad Soyad"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">ID / Pasaport No</label>
                                <input
                                    className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                    value={passportId}
                                    onChange={(e) => setPassportId(e.target.value)}
                                    placeholder="ID No"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Cep Telefonu</label>
                                <input
                                    className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+90 ..."
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Doğum Tarihi</label>
                                <input
                                    className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    placeholder="GG.AA.YYYY"
                                />
                            </div>
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">İkamet Adresi</label>
                                <input
                                    className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Açık Adres"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Service Info */}
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                            <Globe size={12} />
                            Program ve Hizmet Detayları
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Ülke</label>
                                <input
                                    className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    placeholder="Örn: İngiltere"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Hizmet Türü</label>
                                <input
                                    className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                    value={serviceType}
                                    onChange={(e) => setServiceType(e.target.value)}
                                    placeholder="Örn: Dil Okulu"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Kurum / Okul</label>
                                <input
                                    className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                    value={institutionName}
                                    onChange={(e) => setInstitutionName(e.target.value)}
                                    placeholder="Okul Adı"
                                />
                            </div>
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Program / Bölüm</label>
                                <input
                                    className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                    value={programName}
                                    onChange={(e) => setProgramName(e.target.value)}
                                    placeholder="Program Detayı"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Sözleşme Başlığı</label>
                                <input
                                    className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Financial Info */}
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                            <DollarSign size={12} />
                            Mali Bilgiler
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-1.5 col-span-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Hizmet Bedeli</label>
                                <input
                                    type="number"
                                    className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Para Birimi</label>
                                <select
                                    className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                >
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                    <option value="TRY">TRY</option>
                                </select>
                            </div>
                             <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Şablon</label>
                                <select
                                    className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)] opacity-50 cursor-not-allowed"
                                    value={templateKey}
                                    disabled
                                >
                                    <option value="STUDENT_CONTRACT_2026">Öğrenci Sözleşmesi 2026 (Standart)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div className="border-t border-dashed border-[var(--border)] pt-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                <Eye size={12} />
                                Sözleşme Önizleme
                            </h3>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsManualEdit(!isManualEdit)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                        isManualEdit 
                                        ? "bg-amber-100 text-amber-600 border border-amber-200" 
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200"
                                    }`}
                                >
                                    {isManualEdit ? <Save size={14} /> : <Edit3 size={14} />}
                                    {isManualEdit ? "Düzenlemeyi Bitir" : "Serbest Düzenleme Modu"}
                                </button>
                                <button
                                    onClick={handlePrint}
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                >
                                    <Printer size={14} />
                                    PDF / YAZDIR
                                </button>
                            </div>
                        </div>
                        
                        <div className="p-8 border-2 border-slate-100 rounded-[32px] bg-white min-h-[500px] shadow-inner overflow-hidden">
                             <div 
                                className={`preview-container scale-[0.85] origin-top transform-gpu outline-none p-4 rounded-xl ${isManualEdit ? 'ring-2 ring-amber-400/50 bg-amber-50/5' : ''}`}
                                contentEditable={isManualEdit}
                                onBlur={(e) => {
                                    if (isManualEdit) {
                                        setManualContent(e.currentTarget.innerHTML);
                                    }
                                }}
                                dangerouslySetInnerHTML={{ __html: manualContent }}
                             />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[var(--border)] flex justify-end gap-3 bg-slate-50/50 dark:bg-slate-800/50">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        Vazgeç
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="premium-btn px-8 py-3 flex items-center gap-2 shadow-xl shadow-blue-900/10"
                    >
                        {loading ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={18} />}
                        Sözleşmeyi Hazırla ve Gönder
                    </button>
                </div>
            </div>
        </div>
    );
}
