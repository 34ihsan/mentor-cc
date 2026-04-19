"use client";

import { useState } from "react";
import { Sparkles, Send, X, Eye, FileText } from "lucide-react";

interface OfferBuilderProps {
    application: any;
    onOfferCreated: () => void;
}

export default function OfferBuilder({ application, onOfferCreated }: OfferBuilderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [templateKey, setTemplateKey] = useState("PROFESSIONAL");
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [validUntil, setValidUntil] = useState("");
    const [preview, setPreview] = useState(false);
    const [generateContract, setGenerateContract] = useState(false);

    // Dynamic fields for the proposal
    const [country, setCountry] = useState(application.program?.institution?.country || "");
    const [city, setCity] = useState(application.program?.institution?.city || "");
    const [institutionName, setInstitutionName] = useState(application.program?.institution?.name || "");
    const [programName, setProgramName] = useState(application.program?.name || "");
    const [serviceType, setServiceType] = useState("");
    const [duration, setDuration] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const customData = {
                studentName: application.student.name || application.student.email,
                studentEmail: application.student.email,
                programName: programName || application.program?.name,
                institutionName: institutionName || application.program?.institution?.name,
                city: city || application.program?.institution?.city,
                country: country || application.program?.institution?.country,
                serviceType: serviceType,
                duration: duration,
                price: amount || application.program?.price || "---",
                currency: currency || application.program?.currency || "USD",
                validUntil: validUntil ? new Date(validUntil).toLocaleDateString('tr-TR') : "Belirtilmedi",
            };

            const response = await fetch("/api/offers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    applicationId: application.id,
                    templateKey,
                    amount: amount || application.program?.price,
                    currency,
                    validUntil: validUntil || null,
                    customData,
                }),
            });

            if (response.ok) {
                const offer = await response.json();

                if (generateContract) {
                    // Automatically generate contract for this offer
                    await fetch("/api/contracts", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            offerId: offer.id,
                            templateKey: "PROFESSIONAL_SERVICE",
                            customData: {
                                ...customData,
                                // Add any contract specific defaults
                            }
                        }),
                    });
                }

                setIsOpen(false);
                onOfferCreated();
            }
        } catch (error) {
            console.error("Failed to create offer:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="premium-btn w-full flex items-center justify-center gap-2 py-3"
            >
                <Sparkles size={18} />
                Profesyonel Teklif Oluştur
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="glass-card w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b border-[var(--border)] flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <FileText className="text-[var(--primary)]" />
                            Teklif Hazırlama Sihirbazı
                        </h2>
                        <p className="text-xs text-[var(--text-muted)] mt-1 uppercase tracking-widest font-bold">
                            {application.student.name || application.student.email} için yeni teklif
                        </p>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Şablon Seçimi</label>
                            <select
                                className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                value={templateKey}
                                onChange={(e) => setTemplateKey(e.target.value)}
                            >
                                <option value="PROFESSIONAL">Profesyonel Teklif (Yeni)</option>
                                <option value="LANGUAGE_SCHOOL">Dil Okulu Şablonu</option>
                                <option value="UNIVERSITY">Üniversite Şablonu</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Hizmet Türü</label>
                            <input
                                className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                placeholder="Örn: Dil Okulu, Master, Lise"
                                value={serviceType}
                                onChange={(e) => setServiceType(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Ülke</label>
                            <input
                                className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Kurum / Okul Adı</label>
                            <input
                                className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                value={institutionName}
                                onChange={(e) => setInstitutionName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Program / Bölüm</label>
                            <input
                                className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                value={programName}
                                onChange={(e) => setProgramName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Şehir</label>
                            <input
                                className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Program Süresi</label>
                            <input
                                className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                placeholder="Örn: 24 Hafta, 1 Yıl"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-2 col-span-1 md:col-span-2">
                            <div className="col-span-2 space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Özel Tutar (Opsiyonel)</label>
                                <input
                                    type="number"
                                    className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                    placeholder={application.program?.price?.toString() || "0.00"}
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Para Birimi</label>
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
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Geçerlilik Tarihi</label>
                            <input
                                type="date"
                                className="w-full p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                value={validUntil}
                                onChange={(e) => setValidUntil(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                        <input
                            type="checkbox"
                            id="gen-contract"
                            className="w-5 h-5 rounded border-slate-300 text-[var(--primary)] focus:ring-[var(--primary)] cursor-pointer"
                            checked={generateContract}
                            onChange={(e) => setGenerateContract(e.target.checked)}
                        />
                        <label htmlFor="gen-contract" className="text-sm font-bold text-slate-700 cursor-pointer">
                            Teklif ile birlikte otomatik sözleşme taslağı oluştur
                        </label>
                    </div>

                    <div className="border-t border-dashed border-[var(--border)] pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                <Eye size={14} />
                                Teklif Önizleme
                            </h3>
                            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                                Otomatik Doldurma Aktif
                            </span>
                        </div>
                        <div className="p-8 border border-[var(--border)] rounded-2xl bg-slate-50 dark:bg-slate-900/50 min-h-[300px] text-sm overflow-hidden relative">
                            <div className="opacity-50 pointer-events-none scale-90 origin-top">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div className="h-4 w-32 bg-slate-300 rounded"></div>
                                        <div className="h-4 w-16 bg-slate-300 rounded"></div>
                                    </div>
                                    <div className="h-8 w-64 bg-slate-400 rounded"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-full bg-slate-200 rounded"></div>
                                        <div className="h-4 w-full bg-slate-200 rounded"></div>
                                        <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-24 bg-white rounded-xl"></div>
                                        <div className="h-24 bg-white rounded-xl"></div>
                                    </div>
                                    <div className="h-32 bg-slate-800 rounded-3xl"></div>
                                </div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center bg-white/20 dark:bg-black/20 backdrop-blur-[1px]">
                                <div className="text-center">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 rotate-[-15deg] border-2 border-slate-300 px-4 py-2 rounded-xl inline-block mb-4">TASLAK ÖNİZLEME</p>
                                    <p className="text-xs font-bold text-slate-500 max-w-xs">Template önizlemesi sunum amaçlıdır. Gönder butonuna bastığınızda seçtiğiniz şablona göre hazırlanacaktır.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[var(--border)] flex justify-end gap-3 bg-slate-50/50 dark:bg-slate-800/50">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        Vazgeç
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="premium-btn px-8 py-3 flex items-center gap-2"
                    >
                        {loading ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={18} />}
                        Teklifi Gönder
                    </button>
                </div>
            </div>
        </div>
    );
}
