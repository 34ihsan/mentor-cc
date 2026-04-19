"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Building2,
    Globe,
    X,
    MapPin,
    LinkIcon,
    RefreshCcw,
    BadgePercent,
    CheckCircle2,
    Save,
    Copy
} from "lucide-react";
import { triggerHarvesterAction } from "@/app/actions/harvester-actions";
import ImageSettingsControl, { defaultImageSettings } from "@/components/admin/ImageSettingsControl";
import { motion, AnimatePresence } from "framer-motion";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

function InstitutionsManagementContent() {
    const [institutions, setInstitutions] = useState<any[]>([]);
    const [countries, setCountries] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeServiceId, setActiveServiceId] = useState("all");
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingInstitution, setEditingInstitution] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: "",
        countryId: "",
        city: "",
        description: "",
        content: "",
        image: "",
        imageSettings: defaultImageSettings,
        logo: "",
        website: "",
        rank: "",
        rating: "",
        serviceId: "",
        isFeatured: false,
        videoUrl: ""
    });
    const [metadataRows, setMetadataRows] = useState<{ key: string, value: string }[]>([]);
    const [showSource, setShowSource] = useState(false);

    useEffect(() => {
        if (isEditorOpen) {
            if (editingInstitution && editingInstitution.metadata) {
                try {
                    const parsed = JSON.parse(editingInstitution.metadata);
                    if (Array.isArray(parsed)) {
                        setMetadataRows(parsed);
                    } else if (typeof parsed === 'object') {
                        setMetadataRows(Object.entries(parsed).map(([key, value]) => ({ key, value: String(value) })));
                    } else {
                        setMetadataRows([]);
                    }
                } catch (e) {
                    setMetadataRows([]);
                }
            } else {
                setMetadataRows([]);
            }
        }
    }, [isEditorOpen, editingInstitution]);

    const addMetadataRow = () => setMetadataRows([...metadataRows, { key: "", value: "" }]);
    const removeMetadataRow = (index: number) => setMetadataRows(metadataRows.filter((_, i) => i !== index));
    const updateMetadataRow = (index: number, field: 'key' | 'value', val: string) => {
        const next = [...metadataRows];
        next[index][field] = val;
        setMetadataRows(next);
    };

    const getTerminology = () => {
        const currentServiceId = formData.serviceId || (activeServiceId !== "all" ? activeServiceId : "");
        const selectedService = services.find(s => s.id === currentServiceId);
        const slug = selectedService?.slug || "";

        const isExam = slug === 'sinav-hazirlik' || selectedService?.title?.toLowerCase().includes('sınav');
        const isUni = slug.includes('universite') || slug.includes('yuksek-lisans');
        const isSummer = slug === 'yaz-okullari';
        const isLanguage = slug === 'dil-okullari';

        return {
            institution: isExam ? "Sınav Merkezi" : isUni ? "Üniversite" : isSummer ? "Kamp / Yaz Okulu" : "Kurum",
            country: isExam ? "Sınav Türü" : isSummer ? "Destinasyon" : "Ülke",
            city: isExam ? "Merkez Şehir" : "Şehir",
            description: isExam ? "Sınav Hakkında" : isUni ? "Üniversite Tanıtımı" : isSummer ? "Kamp Detayları" : "Kurum Hakkında",
            content: isExam ? "Sınav Detayları" : isUni ? "Akademik İçerik" : "Program Detayları",
            rankLabel: isUni ? "Dünya Sıralaması" : "Sıralama",
            ratingLabel: isSummer ? "Popülerlik Puanı" : "Derecelendirme",
            slug
        };
    };

    const terms = getTerminology();

    useEffect(() => {
        if (searchParams?.get('add') === 'true') {
            openEditor();
        }
    }, [searchParams]);

    useEffect(() => {
        fetchInstitutions();
        fetchCountries();
        fetchServices();
    }, []);

    const fetchInstitutions = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/institutions");
            if (res.ok) {
                const data = await res.json();
                setInstitutions(data);
            }
        } catch (error) {
            console.error("Failed to fetch institutions:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCountries = async () => {
        try {
            const res = await fetch("/api/admin/countries");
            if (res.ok) {
                const data = await res.json();
                setCountries(data);
            }
        } catch (error) {
            console.error("Failed to fetch countries:", error);
        }
    };

    const fetchServices = async () => {
        try {
            const res = await fetch("/api/admin/services");
            if (res.ok) {
                const data = await res.json();
                setServices(data);
            }
        } catch (error) {
            console.error("Failed to fetch services:", error);
        }
    };

    const handleManualHarvest = async (id: string, url: string) => {
        if (!url) {
            alert("Lütfen önce bir web sitesi adresi girin.");
            return;
        }
        try {
            const res = await triggerHarvesterAction(id, url);
            if (res.success) {
                alert("Fiyat tarama işlemi başlatıldı.");
                fetchInstitutions();
            } else {
                alert("Hata: " + res.error);
            }
        } catch (error) {
            console.error("Harvest trigger failed:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu kurumu silmek istediğinize emin misiniz?")) return;
        try {
            const res = await fetch(`/api/admin/institutions/${id}`, { method: "DELETE" });
            if (res.ok) {
                setInstitutions(institutions.filter(i => i.id !== id));
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const openEditor = (institution: any = null) => {
        if (institution) {
            let settings = defaultImageSettings;
            try {
                if (institution.imageSettings) {
                    const parsed = JSON.parse(institution.imageSettings);
                    if (parsed) settings = parsed;
                }
            } catch (e) { console.error("Error parsing settings", e); }

            setEditingInstitution(institution);
            setFormData({
                name: institution.name,
                countryId: institution.countryId || "",
                city: institution.city,
                description: institution.description || "",
                content: institution.content || "",
                image: institution.image || "",
                imageSettings: settings,
                logo: institution.logo || "",
                website: institution.website || "",
                rank: institution.rank || "",
                rating: institution.rating?.toString() || "",
                serviceId: institution.serviceId || "",
                isFeatured: institution.isFeatured || false,
                videoUrl: institution.videoUrl || ""
            });
        } else {
            setEditingInstitution(null);
            setFormData({
                name: "",
                countryId: "",
                city: "",
                description: "",
                content: "",
                image: "",
                imageSettings: defaultImageSettings,
                logo: "",
                website: "",
                rank: "",
                rating: "",
                serviceId: "",
                isFeatured: false,
                videoUrl: ""
            });
        }
        setShowSource(false);
        setIsEditorOpen(true);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'logo') => {
        if (!e.target.files?.[0]) return;
        const file = e.target.files[0];
        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: uploadData });
            if (res.ok) {
                const data = await res.json();
                setFormData({ ...formData, [field]: data.url });
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Dosya yüklenirken bir hata oluştu.");
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.countryId || !formData.serviceId) {
            alert("Lütfen ülke ve hizmet seçimini yapın.");
            return;
        }

        const url = editingInstitution ? `/api/admin/institutions/${editingInstitution.id}` : "/api/admin/institutions";
        const method = editingInstitution ? "PATCH" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    imageSettings: JSON.stringify(formData.imageSettings),
                    metadata: JSON.stringify(metadataRows.filter(r => r.key.trim() !== ""))
                })
            });

            if (res.ok) {
                setIsEditorOpen(false);
                fetchInstitutions();
            } else {
                alert("Kaydetme başarısız.");
            }
        } catch (error) {
            console.error("Save failed:", error);
            alert("Bağlantı hatası.");
        }
    };

    const filteredInstitutions = institutions.filter(inst => {
        const matchesSearch = inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (inst.country?.name || (typeof inst.country === 'string' ? inst.country : "")).toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeServiceId === "all" || inst.serviceId === activeServiceId;
        return matchesSearch && matchesCategory;
    });

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[#0B1751] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                        <Building2 size={12} />
                        Okul & {terms.institution} Yönetimi
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-[#0B1751]">Anlaşmalı {terms.institution}lar</h1>
                    <p className="text-sm text-slate-600 font-medium mt-1">{terms.institution} profillerini, detaylarını ve programlarını yönetin.</p>
                </div>
                <button onClick={() => openEditor()} className="premium-btn group">
                    <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                    Yeni {terms.institution} Ekle
                </button>
            </div>

            <div className="bg-white p-1.5 flex items-center gap-3 border border-slate-200 rounded-2xl shadow-sm">
                <div className="pl-4 text-slate-400"><Search size={18} /></div>
                <input
                    type="text"
                    placeholder={`${terms.institution} veya ${terms.country.toLowerCase()} adı ara...`}
                    className="bg-transparent border-none outline-none w-full py-2.5 text-sm font-bold text-black placeholder:text-slate-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button
                    onClick={() => setActiveServiceId("all")}
                    className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeServiceId === "all"
                        ? "bg-[#0B1751] text-white shadow-lg"
                        : "bg-white text-slate-900 hover:bg-slate-50 border border-slate-200"
                        }`}
                >
                    TÜMÜ
                </button>
                {services.map((service) => (
                    <button
                        key={service.id}
                        onClick={() => setActiveServiceId(service.id)}
                        className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeServiceId === service.id
                            ? "bg-[#DC2626] text-white shadow-lg"
                            : "bg-white text-slate-400 hover:text-slate-600 border border-slate-200"
                            }`}
                    >
                        {service.title}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {loading ? (
                        <div className="col-span-full p-10 text-center text-slate-900 dark:text-white font-bold">Yükleniyor...</div>
                    ) : filteredInstitutions.map((inst, index) => (
                        <motion.div
                            key={inst.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white flex flex-col group hover:shadow-xl transition-all duration-300 border border-slate-200 rounded-3xl shadow-sm"
                        >
                            <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl bg-white p-1 shadow-md border border-slate-100 overflow-hidden shrink-0">
                                        {inst.logo ? <img src={inst.logo} className="w-full h-full object-contain" alt="" /> : <Building2 className="w-full h-full p-3 text-black" />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-black leading-tight">{inst.name}</h3>
                                        <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-slate-500">
                                            <MapPin size={12} />
                                            {inst.city}, {inst.country?.name || (typeof inst.country === 'string' ? inst.country : "Belirtilmemiş")}
                                        </div>
                                        {inst.service && (
                                            <div className="inline-flex mt-2 items-center px-2 py-0.5 rounded-md bg-red-50 text-red-600 text-[9px] font-black uppercase tracking-wider">
                                                {inst.service.title}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => {
                                            const { id, ...copyData } = inst;
                                            openEditor(null); // Clear first
                                            setTimeout(() => {
                                                setEditingInstitution(null);
                                                setFormData({
                                                    ...copyData,
                                                    name: `${inst.name} (Kopya)`,
                                                    imageSettings: inst.imageSettings ? JSON.parse(inst.imageSettings) : defaultImageSettings,
                                                    rating: inst.rating?.toString() || ""
                                                });
                                                setIsEditorOpen(true);
                                            }, 50);
                                        }}
                                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-500 transition-all"
                                        title="Kopyala"
                                    >
                                        <Copy size={16} />
                                    </button>
                                    <button onClick={() => openEditor(inst)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-[#0B1751] transition-all">
                                        <Edit size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(inst.id)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-red-500 transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 pt-4 flex-1">
                                <p className="text-xs text-slate-600 line-clamp-3 mb-4">{inst.description || "Açıklama girilmemiş..."}</p>
                                <div className="flex gap-2">
                                    {inst.rank && (
                                        <div className="inline-flex items-center px-2 py-1 rounded bg-blue-50 text-blue-600 text-[10px] font-bold uppercase">
                                            {inst.service?.slug?.includes('universite') ? 'World Rank' : 'Sıralama'}: #{inst.rank}
                                        </div>
                                    )}
                                    {inst.rating && (
                                        <div className="inline-flex items-center px-2 py-1 rounded bg-amber-50 text-amber-600 text-[10px] font-bold uppercase">
                                            {inst.service?.slug === 'yaz-okullari' ? 'Popülerlik' : 'Puan'}: ★ {inst.rating}
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Fiyat Durumu</span>
                                        <div className={`text-[10px] font-bold flex items-center gap-1.5 ${
                                            inst.harvestStatus === 'SUCCESS' ? 'text-emerald-600' :
                                            inst.harvestStatus === 'PENDING' ? 'text-blue-600' :
                                            inst.harvestStatus === 'FAILED' ? 'text-red-600' : 'text-slate-400'
                                        }`}>
                                            {inst.harvestStatus === 'SUCCESS' && <CheckCircle2 size={12} />}
                                            {inst.harvestStatus === 'PENDING' && <RefreshCcw size={12} className="animate-spin" />}
                                            {inst.harvestStatus === 'FAILED' && <X size={12} />}
                                            {inst.harvestStatus || 'BİLİNMİYOR'}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleManualHarvest(inst.id, inst.website)}
                                        className="p-2 bg-slate-50 hover:bg-[#DC2626] hover:text-white rounded-lg transition-all text-slate-400 group/btn"
                                        title="Fiyatları Yenile"
                                    >
                                        <RefreshCcw size={14} className="group-hover/btn:rotate-180 transition-transform duration-500" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Editor Overlay */}
            <AnimatePresence>
                {isEditorOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsEditorOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-6xl h-[95vh] bg-white flex flex-col shadow-2xl overflow-hidden rounded-3xl"
                        >
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div>
                                    <h3 className="text-xl font-black tracking-tight text-black flex items-center gap-2">
                                        <Building2 className="text-[#DC2626]" size={20} />
                                        {editingInstitution ? `${terms.institution} Düzenle` : `Yeni ${terms.institution} Ekle`}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        type="button" 
                                        onClick={handleSave} 
                                        className="flex items-center gap-2 px-6 py-2 bg-[#0B1751] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-blue-900/10"
                                    >
                                        <Save size={14} />
                                        Kaydet
                                    </button>
                                    <button onClick={() => setIsEditorOpen(false)} className="p-2 rounded-xl bg-white hover:bg-red-50 text-slate-400 hover:text-[#DC2626] transition-all shadow-sm border border-slate-100"><X size={20} /></button>
                                </div>
                            </div>

                            <form onSubmit={handleSave} className="flex-1 flex flex-col overflow-hidden">
                                <div className="p-8 pb-4 grid grid-cols-1 md:grid-cols-2 gap-8 shrink-0 overflow-y-auto max-h-[40vh]">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-black uppercase tracking-widest">{terms.institution} Adı</label>
                                            <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-black uppercase tracking-widest">{terms.country}</label>
                                                <select
                                                    required
                                                    value={formData.countryId}
                                                    onChange={(e) => setFormData({ ...formData, countryId: e.target.value })}
                                                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-[#DC2626] text-sm font-bold text-black"
                                                >
                                                    <option value="">Seçiniz...</option>
                                                    {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-black uppercase tracking-widest">Hizmet / Kategori</label>
                                                <select
                                                    required
                                                    value={formData.serviceId}
                                                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                                                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-[#DC2626] text-sm font-bold text-black"
                                                >
                                                    <option value="">Seçiniz...</option>
                                                    {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-black uppercase tracking-widest">{terms.city}</label>
                                                 <input required type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-[#DC2626] text-sm text-black font-bold" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-black uppercase tracking-widest">{terms.description}</label>
                                             <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-[#DC2626] text-sm resize-none text-black font-bold" />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-black uppercase tracking-widest">Web Sitesi</label>
                                                 <input type="text" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-[#DC2626] text-sm text-black font-bold" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-black uppercase tracking-widest">{terms.rankLabel}</label>
                                                 <input type="text" value={formData.rank} onChange={(e) => setFormData({ ...formData, rank: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-[#DC2626] text-sm text-black font-bold" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-black uppercase tracking-widest">{terms.ratingLabel} (0-5)</label>
                                                 <input type="number" step="0.1" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-[#DC2626] text-sm text-black font-bold" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <input 
                                                    type="checkbox" 
                                                    id="isFeatured"
                                                    checked={formData.isFeatured}
                                                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                                     className="w-5 h-5 accent-[#DC2626]"
                                                />
                                                <label htmlFor="isFeatured" className="text-[10px] font-black text-black uppercase tracking-widest cursor-pointer">Öne Çıkarılan Kurum</label>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-black uppercase tracking-widest">Tanıtım Videosu URL</label>
                                                 <input type="text" placeholder="YouTube/Vimeo Link" value={formData.videoUrl} onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })} className="w-full bg-white border border-slate-200 p-2 rounded-xl outline-none focus:border-[#DC2626] text-[10px] text-black font-bold" />
                                            </div>
                                        </div>

                                         <div className="pt-4 space-y-4 border-t border-slate-100">
                                            <div className="flex items-center justify-between">
                                                <div className="text-[10px] font-black text-black uppercase tracking-widest flex items-center gap-2">
                                                    <LinkIcon size={12} />
                                                    {terms.institution} Ek Bilgileri (Metadata)
                                                </div>
                                                <div className="flex gap-2">
                                                    {terms.slug.includes('universite') && (
                                                        <button type="button" onClick={() => setMetadataRows([...metadataRows, { key: "IELTS Min", value: "" }, { key: "GPA Min", value: "" }, { key: "Eğitim Ücreti", value: "" }])} className="text-[8px] font-black text-black uppercase bg-slate-100 px-2 py-0.5 rounded-md">+ Uni Şablon</button>
                                                    )}
                                                    {terms.slug === 'yaz-okullari' && (
                                                        <button type="button" onClick={() => setMetadataRows([...metadataRows, { key: "Yaş Aralığı", value: "" }, { key: "Konaklama", value: "" }, { key: "Aktiviteler", value: "" }])} className="text-[8px] font-black text-black uppercase bg-slate-100 px-2 py-0.5 rounded-md">+ Kamp Şablon</button>
                                                    )}
                                                     <button type="button" onClick={addMetadataRow} className="text-[10px] font-black text-[#DC2626] uppercase bg-red-50 border border-red-100 px-3 py-1 rounded-full flex items-center gap-1 transition-all hover:bg-red-100">
                                                        <Plus size={10} /> Bilgi Ekle
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                {metadataRows.map((row, idx) => (
                                                    <div key={idx} className="flex gap-2">
                                                        <input type="text" placeholder="Başlık" value={row.key} onChange={e => updateMetadataRow(idx, 'key', e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs font-bold text-black" />
                                                        <input type="text" placeholder="Değer" value={row.value} onChange={e => updateMetadataRow(idx, 'value', e.target.value)} className="flex-[2] bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs text-black font-bold" />
                                                        <button type="button" onClick={() => removeMetadataRow(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest">Logo</label>
                                                <div className="flex items-center gap-4">
                                                    {formData.logo && <img src={formData.logo} className="w-16 h-16 rounded-xl object-contain border border-slate-200 bg-white p-2" alt="Logo" />}
                                                    <label className="premium-btn py-2 px-4 text-xs cursor-pointer">
                                                        Yükle
                                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo')} />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest">Kapak Görseli</label>
                                                <div className="flex items-center gap-4">
                                                    {formData.image && <img src={formData.image} className="w-20 h-16 rounded-xl object-cover border border-slate-200" alt="Cover" />}
                                                    <label className="premium-btn py-2 px-4 text-xs cursor-pointer">
                                                        Yükle
                                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <ImageSettingsControl settings={formData.imageSettings} onChange={(s) => setFormData({ ...formData, imageSettings: s })} label="Kapak Görsel Ayarları" />
                                    </div>
                                </div>

                                <div className="flex-1 px-8 pb-0 overflow-hidden flex flex-col min-h-[400px]">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest">{terms.content}</label>
                                         <button type="button" onClick={() => setShowSource(!showSource)} className="text-[10px] font-bold text-[#DC2626] bg-red-50 border border-red-100 px-3 py-1 rounded-full uppercase transition-all hover:bg-red-100">{showSource ? "Görsel Mod" : "HTML Kaynak"}</button>
                                    </div>
                                    <div className="flex-1 bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-inner">
                                        {showSource ? (
                                            <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full h-full p-4 bg-slate-900 text-white font-mono text-xs outline-none border border-slate-800" />
                                        ) : (
                                            <ReactQuill theme="snow" value={formData.content} onChange={(content) => setFormData({ ...formData, content })} modules={modules} className="h-full flex flex-col [&_.ql-toolbar]:border-0 [&_.ql-container]:border-0 [&_.ql-editor]:text-base prose-premium" />
                                        )}
                                    </div>
                                </div>

                                 <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
                                    <button type="button" onClick={() => setIsEditorOpen(false)} className="px-6 py-3 rounded-xl font-bold text-black hover:bg-slate-100">İptal</button>
                                    <button type="submit" className="premium-btn px-8 py-3">Kaydet</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function InstitutionsManagement() {
    return (
        <Suspense fallback={<div>Yükleniyor...</div>}>
            <InstitutionsManagementContent />
        </Suspense>
    );
}
