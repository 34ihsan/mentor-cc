
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2, Wand2, Globe, Sparkles } from "lucide-react";
import Link from "next/link";
import { deepHarvestAction, processHarvestWithAI, generateSalesCopyAction } from "@/app/actions/harvester-actions";
import { toast } from "sonner";

export default function ProgramEditorPage() {
    const router = useRouter();
    const params = useParams();
    const id = params ? params.id as string : "";
    const isEdit = id && id !== "new";

    const [institutions, setInstitutions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [harvesting, setHarvesting] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [harvestUrl, setHarvestUrl] = useState("");
    const [fetching, setFetching] = useState(isEdit);
    const [formData, setFormData] = useState<any>({
        name: "",
        category: "UNDERGRADUATE",
        description: "",
        duration: "",
        price: "",
        currency: "USD",
        institutionId: "",
        templateData: {},
    });

    useEffect(() => {
        // Fetch institutions
        fetch("/api/institutions")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setInstitutions(data);
            });

        // If edit mode, fetch program data
        if (isEdit) {
            fetch(`/api/programs/${id}`)
                .then(res => res.json())
                .then(data => {
                    setFormData({
                        ...data,
                        price: data.price?.toString() || "",
                        templateData: data.templateData || {}
                    });
                    setFetching(false);
                });
        }
    }, [id, isEdit]);

    const handleTemplateChange = (key: string, value: any) => {
        setFormData({
            ...formData,
            templateData: {
                ...formData.templateData,
                [key]: value
            }
        });
    };

    const handleAutoHarvest = async () => {
        if (!harvestUrl) {
            toast.error("Lütfen bir URL girin");
            return;
        }

        setHarvesting(true);
        try {
            toast.info("AI Okul sitesini tarıyor...");
            const harvestRes: any = await deepHarvestAction(formData.name || "Program", harvestUrl, formData.category);
            
            if (harvestRes.success) {
                toast.info("Veriler analiz ediliyor...");
                const aiResult = harvestRes.data;
                
                setFormData({
                    ...formData,
                    name: aiResult.name || formData.name,
                    description: aiResult.description || formData.description,
                    price: aiResult.price || formData.price,
                    currency: aiResult.currency || formData.currency,
                    templateData: {
                        ...formData.templateData,
                        ...aiResult.templateData
                    }
                });
                toast.success("Veriler başarıyla çekildi ve eşleştirildi!");
            } else {
                toast.error("Tarama başarısız oldu: " + harvestRes.error);
            }
        } catch (error) {
            console.error("Harvest error:", error);
            toast.error("İşlem sırasında bir hata oluştu");
        } finally {
            setHarvesting(false);
        }
    };

    const handleGenerateCopy = async () => {
        setGenerating(true);
        try {
            toast.info("AI satış yazısı oluşturuyor...");
            const res = await generateSalesCopyAction(formData);
            if (res.success) {
                setFormData({ ...formData, description: res.copy });
                toast.success("Satış yazısı oluşturuldu!");
            }
        } catch (error) {
            toast.error("Yazı oluşturulamadı");
        } finally {
            setGenerating(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEdit ? `/api/programs/${id}` : "/api/programs";
            const method = isEdit ? "PATCH" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push("/dashboard/programs");
            } else {
                alert("Hata oluştu");
            }
        } catch (error) {
            console.error("Submit error:", error);
            alert("Hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="p-20 text-center uppercase tracking-widest font-black text-slate-400">Yükleniyor...</div>;

    const renderTemplateFields = () => {
        const cat = formData.category;
        
        if (cat === "UNDERGRADUATE" || cat === "POSTGRADUATE" || cat === "PHD") {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="md:col-span-2 text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">Akademik Gereksinimler</div>
                    <div>
                        <label className="block text-xs font-bold mb-2">Gerekli Minimum GPA</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border border-slate-200 rounded-xl outline-none" 
                            placeholder="örn: 3.0/4.0 veya 80/100"
                            value={formData.templateData.minGpa || ""}
                            onChange={(e) => handleTemplateChange("minGpa", e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold mb-2">Dil Skoru (IELTS/TOEFL)</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border border-slate-200 rounded-xl outline-none" 
                            placeholder="örn: IELTS 6.5"
                            value={formData.templateData.languageScore || ""}
                            onChange={(e) => handleTemplateChange("languageScore", e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold mb-2">Son Başvuru Tarihi</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border border-slate-200 rounded-xl outline-none" 
                            placeholder="örn: 15 Ocak"
                            value={formData.templateData.deadline || ""}
                            onChange={(e) => handleTemplateChange("deadline", e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold mb-2">Başlangıç Dönemi</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border border-slate-200 rounded-xl outline-none" 
                            placeholder="örn: Güz / Bahar"
                            value={formData.templateData.intake || ""}
                            onChange={(e) => handleTemplateChange("intake", e.target.value)}
                        />
                    </div>
                </div>
            );
        }

        if (cat === "LANGUAGE") {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="md:col-span-2 text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">Okul Detayları</div>
                    <div>
                        <label className="block text-xs font-bold mb-2">Minimum Yaş</label>
                        <input 
                            type="number" 
                            className="w-full p-3 border border-slate-200 rounded-xl outline-none" 
                            placeholder="16"
                            value={formData.templateData.minAge || ""}
                            onChange={(e) => handleTemplateChange("minAge", e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold mb-2">Maks. Sınıf Mevcudu</label>
                        <input 
                            type="number" 
                            className="w-full p-3 border border-slate-200 rounded-xl outline-none" 
                            placeholder="15"
                            value={formData.templateData.maxClassSize || ""}
                            onChange={(e) => handleTemplateChange("maxClassSize", e.target.value)}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold mb-2">Konaklama Seçenekleri (Virgülle ayırın)</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border border-slate-200 rounded-xl outline-none" 
                            placeholder="Aile Yanı, Yurt, Paylaşımlı Daire"
                            value={formData.templateData.accommodation || ""}
                            onChange={(e) => handleTemplateChange("accommodation", e.target.value)}
                        />
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard/programs"
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold">{isEdit ? "Programı Düzenle" : "Yeni Program Ekle"}</h2>
                    <p className="text-slate-500 italic text-sm">{isEdit ? "Mevcut program detaylarını güncelleyin" : "Sisteme yeni bir eğitim programı ekleyin"}</p>
                </div>
            </div>

            {/* AI Harvester Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-xl shadow-blue-500/20 text-white mb-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Wand2 size={120} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <Wand2 className="text-blue-200" size={24} />
                        <h3 className="text-xl font-black uppercase tracking-widest">AI Otonom Veri Toplayıcı</h3>
                    </div>
                    <p className="text-blue-100 mb-6 text-sm max-w-2xl font-medium">
                        Okulun web sitesi URL'sini girin. AI saniyeler içinde tüm bölümleri, kabul şartlarını ve ücretleri sizin için bulup doldursun.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl flex items-center px-4 border border-white/20 focus-within:border-white/50 transition-all">
                            <Globe size={20} className="text-blue-200 mr-3" />
                            <input 
                                type="url" 
                                placeholder="https://www.ox.ac.uk/admissions/..."
                                className="bg-transparent border-none outline-none py-4 w-full text-white placeholder:text-blue-200"
                                value={harvestUrl}
                                onChange={(e) => setHarvestUrl(e.target.value)}
                            />
                        </div>
                        <button 
                            type="button"
                            onClick={handleAutoHarvest}
                            disabled={harvesting}
                            className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {harvesting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
                                    Taranıyor...
                                </>
                            ) : (
                                "AI İle Otomatik Doldur"
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
                <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-tighter mb-2 text-slate-400">
                                Program Adı <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-colors font-serif italic text-lg"
                                placeholder="örn: Business Administration"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-tighter mb-2 text-slate-400">
                                Kategori <span className="text-red-500">*</span>
                            </label>
                            <select
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer font-bold"
                            >
                                <option value="LANGUAGE">Dil Kursu</option>
                                <option value="UNDERGRADUATE">Lisans</option>
                                <option value="POSTGRADUATE">Yüksek Lisans</option>
                                <option value="PHD">Doktora</option>
                                <option value="CERTIFICATE">Sertifika</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-black uppercase tracking-tighter mb-2 text-slate-400">
                                Bağlı Olduğu Kurum <span className="text-red-500">*</span>
                            </label>
                            <select
                                required
                                value={formData.institutionId}
                                onChange={(e) =>
                                    setFormData({ ...formData, institutionId: e.target.value })
                                }
                                className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer font-bold"
                            >
                                <option value="">Bir kurum seçin</option>
                                {institutions.map((inst) => (
                                    <option key={inst.id} value={inst.id}>
                                        {inst.name} ({inst.city}, {inst.country?.name || (typeof inst.country === 'string' ? inst.country : '')})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Dynamic Template Fields */}
                        <div className="md:col-span-2">
                            {renderTemplateFields()}
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-tighter mb-2 text-slate-400">Eğitim Süresi</label>
                            <input
                                type="text"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-colors"
                                placeholder="örn: 2 yıl, 3 ay"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-tighter mb-2 text-slate-400">Fiyat</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-colors font-bold"
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-tighter mb-2 text-slate-400">Para Birimi</label>
                                <select
                                    value={formData.currency}
                                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                    className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer font-bold"
                                >
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                    <option value="TRY">TRY</option>
                                </select>
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="block text-xs font-black uppercase tracking-tighter text-slate-400">
                                    Açıklama
                                </label>
                                <button 
                                    type="button" 
                                    onClick={handleGenerateCopy}
                                    disabled={generating}
                                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-all disabled:opacity-50"
                                >
                                    {generating ? <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div> : <Sparkles size={12} />}
                                    Sihirli Kalem (AI Yaz)
                                </button>
                            </div>
                            <textarea
                                rows={5}
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-colors resize-none italic"
                                placeholder="Program hakkında detaylı bilgi..."
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 justify-end pt-8 border-t border-slate-100">
                        <Link
                            href="/dashboard/programs"
                            className="px-8 py-3 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-colors text-xs uppercase tracking-widest"
                        >
                            İptal
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white flex items-center gap-3 px-10 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50 text-xs uppercase tracking-widest"
                        >
                            <Save size={18} />
                            {loading ? "Kaydediliyor..." : "Kaydet"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
