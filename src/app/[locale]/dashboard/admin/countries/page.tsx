"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Globe,
    X,
    Briefcase,
    Layout,
    ChevronDown,
    ChevronUp,
    Save,
    Copy,
    Image as ImageIcon,
    FileText
} from "lucide-react";
import ImageSettingsControl, { defaultImageSettings } from "@/components/admin/ImageSettingsControl";
import { motion, AnimatePresence } from "framer-motion";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

function CountriesManagementContent() {
    const [countries, setCountries] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingCountry, setEditingCountry] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<"general" | "services">("general");
    const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        content: "",
        image: "",
        imageSettings: defaultImageSettings,
        population: "",
        language: "",
        currency: "",
        capital: "",
        timezone: "",
        mapsUrl: "",
        active: true,
        serviceContents: [] as any[] // Array of specific content
    });
    const [showSource, setShowSource] = useState(false);

    const getTerminology = () => {
        // Since Countries is a general list, we can't easily tie it to ONE service
        // but we can check if the user is filtering or searching for something specific.
        // For now, let's keep the main view as "Ülkeler" but allow for dynamic labels in Service Contents.
        return {
            country: "Ülke",
            destination: "Destinasyon"
        };
    };
    const terms = getTerminology();

    useEffect(() => {
        if (searchParams?.get('add') === 'true') {
            openEditor();
        }
    }, [searchParams]);

    useEffect(() => {
        fetchCountries();
        fetchServices();
    }, []);

    const fetchCountries = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/countries");
            if (res.ok) {
                const data = await res.json();
                setCountries(data);
            }
        } catch (error) {
            console.error("Failed to fetch countries:", error);
        } finally {
            setLoading(false);
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

    const handleDelete = async (id: string) => {
        if (!confirm("Bu ülkeyi silmek istediğinize emin misiniz?")) return;
        try {
            const res = await fetch(`/api/admin/countries/${id}`, { method: "DELETE" });
            if (res.ok) {
                setCountries(countries.filter(c => c.id !== id));
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const openEditor = (country: any = null) => {
        setActiveTab("general");
        if (country) {
            let settings = defaultImageSettings;
            try {
                if (country.imageSettings) {
                    const parsed = JSON.parse(country.imageSettings);
                    if (parsed) settings = parsed;
                }
            } catch (e) { console.error("Error parsing settings", e); }

            // Parse service contents
            const parsedServiceContents = country.serviceContents?.map((sc: any) => {
                let scSettings = defaultImageSettings;
                try {
                    if (sc.imageSettings) {
                        const parsed = JSON.parse(sc.imageSettings);
                        if (parsed) scSettings = parsed;
                    }
                } catch (e) { }
                return { ...sc, imageSettings: scSettings };
            }) || [];

            setEditingCountry(country);
            setFormData({
                name: country.name,
                slug: country.slug,
                content: country.content || "",
                image: country.image || "",
                imageSettings: settings,
                population: country.population || "",
                language: country.language || "",
                currency: country.currency || "",
                capital: country.capital || "",
                timezone: country.timezone || "",
                mapsUrl: country.mapsUrl || "",
                active: country.active,
                serviceContents: parsedServiceContents
            });
        } else {
            setEditingCountry(null);
            setFormData({
                name: "",
                slug: "",
                content: "",
                image: "",
                imageSettings: defaultImageSettings,
                population: "",
                language: "",
                currency: "",
                capital: "",
                timezone: "",
                mapsUrl: "",
                active: true,
                serviceContents: []
            });
        }
        setShowSource(false);
        setIsEditorOpen(true);
    };

    const generateSlug = (text: string) => {
        return text.toString().toLowerCase().trim()
            .replace(/[\s\W-]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .split('-').slice(0, 5).join('-');
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        const updates: any = { name };
        if (!editingCountry) {
            updates.slug = generateSlug(name);
        }
        setFormData(prev => ({ ...prev, ...updates }));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number = -1) => {
        if (!e.target.files?.[0]) return;
        const file = e.target.files[0];
        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: uploadData });
            if (res.ok) {
                const data = await res.json();
                if (index === -1) {
                    setFormData({ ...formData, image: data.url });
                } else {
                    const newServiceContents = [...formData.serviceContents];
                    newServiceContents[index] = { ...newServiceContents[index], image: data.url };
                    setFormData({ ...formData, serviceContents: newServiceContents });
                }
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Dosya yüklenirken bir hata oluştu.");
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingCountry ? `/api/admin/countries/${editingCountry.id}` : "/api/admin/countries";
        const method = editingCountry ? "PATCH" : "POST";

        try {
            // Stringify settings for payload
            const payload = {
                ...formData,
                imageSettings: JSON.stringify(formData.imageSettings),
                serviceContents: formData.serviceContents.map(sc => ({
                    ...sc,
                    imageSettings: JSON.stringify(sc.imageSettings)
                }))
            };

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setIsEditorOpen(false);
                fetchCountries();
            } else {
                alert("Kaydetme başarısız.");
            }
        } catch (error) {
            console.error("Save failed:", error);
            alert("Bağlantı hatası.");
        }
    };

    const toggleServiceContent = (serviceId: string) => {
        // If exists, do nothing (maybe scroll to). If not, add it.
        const exists = formData.serviceContents.find(sc => sc.serviceId === serviceId);
        if (!exists) {
            setFormData({
                ...formData,
                serviceContents: [
                    ...formData.serviceContents,
                    {
                        serviceId,
                        content: "",
                        image: "",
                        imageSettings: defaultImageSettings,
                        seoTitle: "",
                        seoDesc: ""
                    }
                ]
            });
            setExpandedServiceId(serviceId);
        } else {
            setExpandedServiceId(expandedServiceId === serviceId ? null : serviceId);
        }
    };

    const removeServiceContent = (index: number) => {
        const newContents = [...formData.serviceContents];
        newContents.splice(index, 1);
        setFormData({ ...formData, serviceContents: newContents });
    };

    const updateServiceContent = (index: number, field: string, value: any) => {
        const newContents = [...formData.serviceContents];
        newContents[index] = { ...newContents[index], [field]: value };
        setFormData({ ...formData, serviceContents: newContents });
    };

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
        <div className="space-y-10 pb-20">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 text-[#DC2626] font-black text-[10px] uppercase tracking-[0.3em] mb-3">
                        <div className="w-6 h-[1px] bg-[#DC2626]/30" />
                        Destinasyon Yönetimi
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-[#0B1751]">Ülkeler ve Rotalar</h1>
                    <p className="text-slate-500 font-medium mt-2 max-w-xl">Yurtdışı eğitim destinasyonlarını ve özel içeriklerini yönetin.</p>
                </div>
                <button 
                    onClick={() => openEditor()} 
                    className="flex items-center gap-3 px-8 py-4 bg-[#0B1751] text-white rounded-[20px] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-95 transition-all group"
                >
                    <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
                        <Plus size={14} />
                    </div>
                    Yeni Ülke Ekle
                </button>
            </div>

            {/* Search filter */}
            <div className="bg-white p-2 flex items-center gap-4 border border-slate-200 rounded-[24px] shadow-sm max-w-2xl group focus-within:border-[#0B1751] transition-all">
                <div className="pl-4 text-slate-400 group-focus-within:text-[#0B1751] transition-colors">
                    <Search size={20} />
                </div>
                <input
                    type="text"
                    placeholder="Ülke adı veya rota ara..."
                    className="bg-transparent border-none outline-none w-full py-3 text-sm font-bold text-black placeholder:text-slate-400 placeholder:font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Countries Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {loading ? (
                        <div className="col-span-full py-20 text-center">
                            <div className="inline-block w-8 h-8 border-4 border-slate-200 border-t-[#0B1751] rounded-full animate-spin mb-4" />
                            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Yükleniyor...</p>
                        </div>
                    ) : filteredCountries.length === 0 ? (
                        <div className="col-span-full py-20 text-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                                <Globe size={32} className="text-slate-300" />
                            </div>
                            <h3 className="text-slate-900 font-black text-xl mb-1">Sonuç Bulunamadı</h3>
                            <p className="text-slate-500 font-medium">Arama kriterlerinize uygun ülke bulunamadı.</p>
                        </div>
                    ) : (
                        filteredCountries.map((country, index) => (
                            <motion.div
                                key={country.id}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white border border-slate-200 rounded-[32px] overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative flex flex-col h-full"
                            >
                                <div className="h-52 w-full bg-slate-100 relative overflow-hidden">
                                    {country.image ? (
                                        <img 
                                            src={country.image} 
                                            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                                            alt={country.name} 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                            <Globe size={48} />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <button 
                                            onClick={() => {
                                                const { id, ...copyData } = country;
                                                openEditor(null); // Clear editor state for new entry
                                                setTimeout(() => { // Small delay to ensure state is reset
                                                    setEditingCountry(null);
                                                    setFormData({
                                                        ...copyData,
                                                        name: `${country.name} (Kopya)`,
                                                        slug: `${country.slug}-kopya`,
                                                        imageSettings: country.imageSettings ? JSON.parse(country.imageSettings) : defaultImageSettings,
                                                        serviceContents: country.serviceContents?.map((sc: any) => ({
                                                            ...sc,
                                                            imageSettings: sc.imageSettings ? JSON.parse(sc.imageSettings) : defaultImageSettings
                                                        })) || []
                                                    });
                                                    setIsEditorOpen(true);
                                                }, 50);
                                            }}
                                            className="w-10 h-10 bg-white rounded-xl text-blue-500 hover:bg-blue-500 hover:text-white shadow-lg flex items-center justify-center transition-all"
                                            title="Kopyala"
                                        >
                                            <Copy size={16} />
                                        </button>
                                        <button 
                                            onClick={() => openEditor(country)} 
                                            className="w-10 h-10 bg-white rounded-xl text-[#0B1751] hover:bg-[#0B1751] hover:text-white shadow-lg flex items-center justify-center transition-all"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(country.id)} 
                                            className="w-10 h-10 bg-white rounded-xl text-rose-500 hover:bg-rose-500 hover:text-white shadow-lg flex items-center justify-center transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    {country.active && (
                                        <div className="absolute top-4 left-4">
                                            <div className="px-3 py-1 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                                AKTİF
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Globe size={14} className="text-[#DC2626]" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Destinasyon</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-[#0B1751] mb-4 group-hover:text-[#DC2626] transition-colors">{country.name}</h3>
                                    
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {country.serviceContents?.length > 0 ? (
                                            country.serviceContents.map((sc: any) => (
                                                <span 
                                                    key={sc.id} 
                                                    className="text-[9px] font-black px-3 py-1.5 bg-slate-100 text-[#0B1751] rounded-lg uppercase tracking-wider border border-slate-200/50"
                                                >
                                                    {sc.service.title}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-[10px] font-bold text-slate-400 italic">Resmi içerik eklenmemiş</span>
                                        )}
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-center bg-slate-50/50 -mx-8 -mb-8 px-8 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">SLUG PATH</span>
                                            <span className="text-xs font-bold text-[#0B1751]">/{country.slug}</span>
                                        </div>
                                        <button 
                                            onClick={() => openEditor(country)}
                                            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#DC2626] hover:text-[#DC2626] transition-all"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Editor Overlay */}
            <AnimatePresence>
                {isEditorOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditorOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-6xl h-[95vh] bg-white flex flex-col shadow-2xl overflow-hidden rounded-[40px] border border-slate-200"
                        >
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white">
                                <div>
                                    <h3 className="text-2xl font-black tracking-tight text-[#0B1751] flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-[#DC2626]">
                                            <Globe size={20} />
                                        </div>
                                        {editingCountry ? "Destinasyonu Düzenle" : "Yeni Destinasyon Ekle"}
                                    </h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 ml-14">Ülke & Rota Detay Editörü</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button 
                                        type="button" 
                                        onClick={handleSave} 
                                        className="flex items-center gap-2 px-8 py-3 bg-[#0B1751] text-white rounded-[20px] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/10 hover:scale-[1.02] active:scale-95 transition-all"
                                    >
                                        <Save size={16} />
                                        Kaydet
                                    </button>
                                    <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-sm">
                                        <button
                                            onClick={() => setActiveTab("general")}
                                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "general" ? "bg-[#0B1751] text-white shadow-lg" : "text-[#0B1751] hover:bg-white/50"}`}
                                        >GENEL BİLGİLER</button>
                                        <button
                                            onClick={() => setActiveTab("services")}
                                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "services" ? "bg-[#0B1751] text-white shadow-lg" : "text-[#0B1751] hover:bg-white/50"}`}
                                        >HİZMET İÇERİKLERİ</button>
                                    </div>
                                    <button 
                                        onClick={() => setIsEditorOpen(false)} 
                                        className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-100 transition-all font-bold"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSave} className="flex-1 flex flex-col overflow-hidden bg-slate-50/20">
                                {activeTab === "general" ? (
                                    <>
                                        <div className="p-10 pb-4 grid grid-cols-1 md:grid-cols-2 gap-10 shrink-0 overflow-y-auto custom-scrollbar">
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest ml-1">Ülke Adı</label>
                                                        <input required type="text" value={formData.name} onChange={handleNameChange} className="w-full bg-white border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black shadow-sm transition-all" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest ml-1">Slug (URL)</label>
                                                        <div className="relative">
                                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] font-black uppercase">/</span>
                                                            <input required type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full bg-white border border-slate-200 p-4 pl-8 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black shadow-sm transition-all" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest ml-1">Başkent</label>
                                                        <input type="text" value={formData.capital} onChange={(e) => setFormData({ ...formData, capital: e.target.value })} className="w-full bg-white border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black shadow-sm transition-all" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest ml-1">Dil</label>
                                                        <input type="text" value={formData.language} onChange={(e) => setFormData({ ...formData, language: e.target.value })} className="w-full bg-white border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black shadow-sm transition-all" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest ml-1">Para Birimi</label>
                                                        <input type="text" value={formData.currency} onChange={(e) => setFormData({ ...formData, currency: e.target.value })} className="w-full bg-white border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black shadow-sm transition-all" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest ml-1">Popülasyon</label>
                                                        <input type="text" value={formData.population} onChange={(e) => setFormData({ ...formData, population: e.target.value })} className="w-full bg-white border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black shadow-sm transition-all" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest ml-1">Google Maps Embed URL</label>
                                                    <input type="text" value={formData.mapsUrl} onChange={(e) => setFormData({ ...formData, mapsUrl: e.target.value })} className="w-full bg-white border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black shadow-sm transition-all" placeholder="https://www.google.com/maps/embed?..." />
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest ml-1">Kapak Görseli</label>
                                                    <div className="flex items-center gap-6">
                                                        <div className="w-32 h-32 rounded-[32px] bg-slate-100 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center shrink-0 group relative">
                                                            {formData.image ? (
                                                                <>
                                                                    <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                        <label className="cursor-pointer p-2 bg-white rounded-xl text-[#0B1751]">
                                                                            <Edit size={16} />
                                                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e)} />
                                                                        </label>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-[#0B1751] transition-colors">
                                                                    <ImageIcon size={24} />
                                                                    <span className="text-[8px] font-black uppercase">YÜKLE</span>
                                                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e)} />
                                                                </label>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 space-y-2">
                                                            <p className="text-[10px] font-bold text-slate-500 italic">Destinasyon kartında ve sayfa başında gösterilecek ana görsel. Önerilen: 1920x1080px</p>
                                                            <input 
                                                                type="text" 
                                                                value={formData.image} 
                                                                onChange={(e) => setFormData({ ...formData, image: e.target.value })} 
                                                                className="w-full bg-white border border-slate-200 p-3 rounded-xl outline-none focus:border-[#DC2626] text-[10px] font-mono text-black shadow-sm"
                                                                placeholder="Görsel URL..."
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <ImageSettingsControl settings={formData.imageSettings} onChange={(s) => setFormData({ ...formData, imageSettings: s })} label="GÖRSEL KONUMLANDIRMA" />
                                            </div>
                                        </div>

                                        <div className="flex-1 px-10 pb-10 overflow-hidden flex flex-col min-h-[400px]">
                                            <div className="flex justify-between items-center mb-2 px-1">
                                                <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest flex items-center gap-2">
                                                    <FileText size={14} className="text-[#DC2626]" />
                                                    Genel Ülke Rehberi İçeriği
                                                </label>
                                                <button 
                                                    type="button" 
                                                    onClick={() => setShowSource(!showSource)} 
                                                    className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter transition-all ${showSource ? "bg-amber-500 text-white shadow-lg" : "bg-slate-100 text-[#0B1751] hover:bg-slate-200"}`}
                                                >
                                                    {showSource ? "Görsel Mod" : "HTML Kaynak"}
                                                </button>
                                            </div>
                                            <div className="flex-1 bg-white rounded-[32px] border border-slate-200 overflow-hidden flex flex-col shadow-xl">
                                                {showSource ? (
                                                    <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full h-full p-8 bg-slate-950 text-emerald-400 font-mono text-sm outline-none resize-none" spellCheck="false" />
                                                ) : (
                                                    <ReactQuill theme="snow" value={formData.content} onChange={(content) => setFormData({ ...formData, content })} modules={modules} className="h-full flex flex-col [&_.ql-toolbar]:border-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-slate-100 [&_.ql-toolbar]:bg-slate-50/50 [&_.ql-container]:border-0 [&_.ql-editor]:p-8 [&_.ql-editor]:text-base" />
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
                                        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#DC2626]">
                                                    <Briefcase size={24} />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-black text-[#0B1751]">Hizmet Özel İçerikleri</h4>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hangi hizmet altında ne görüneceğini belirleyin</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {services.map(service => {
                                                    const hasContent = formData.serviceContents.some(sc => sc.serviceId === service.id);
                                                    return (
                                                        <button
                                                            key={service.id}
                                                            type="button"
                                                            onClick={() => toggleServiceContent(service.id)}
                                                            className={`p-5 rounded-3xl border-2 text-left transition-all relative overflow-hidden group ${hasContent
                                                                ? "bg-[#0B1751] border-[#0B1751] text-white shadow-xl shadow-blue-900/20"
                                                                : "bg-white border-slate-100 hover:border-[#DC2626] hover:shadow-md text-[#0B1751]"
                                                                }`}
                                                        >
                                                            <div className={`text-[8px] font-black uppercase tracking-[0.2em] mb-1 ${hasContent ? "text-white/60" : "text-slate-400"}`}>Service</div>
                                                            <div className="font-black text-xs leading-tight">{service.title}</div>
                                                            <div className="mt-3 flex items-center justify-between">
                                                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${hasContent ? "bg-white/20" : "bg-slate-50"}`}>
                                                                    {hasContent ? <Edit size={12} /> : <Plus size={12} />}
                                                                </div>
                                                                {hasContent && <div className="text-[8px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-full">AKTİF</div>}
                                                            </div>
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        <div className="space-y-8 pb-10">
                                            {formData.serviceContents.length === 0 && (
                                                <div className="py-20 text-center bg-slate-50/50 rounded-[40px] border-2 border-dashed border-slate-200">
                                                    <p className="text-slate-400 font-bold text-sm uppercase tracking-widest italic">Lütfen yukarıdan bir hizmet seçerek özel içerik oluşturun.</p>
                                                </div>
                                            )}
                                            {formData.serviceContents.map((sc, index) => {
                                                const service = services.find(s => s.id === sc.serviceId);
                                                if (!service) return null;
                                                const isExpanded = expandedServiceId === sc.serviceId;

                                                return (
                                                    <motion.div 
                                                        key={sc.serviceId} 
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className={`bg-white rounded-[40px] border transition-all overflow-hidden ${isExpanded ? "border-[#DC2626] shadow-2xl scale-[1.01]" : "border-slate-200 opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0 shadow-sm"}`}
                                                    >
                                                        <div
                                                            className={`p-8 flex items-center justify-between cursor-pointer transition-colors ${isExpanded ? "bg-white" : "bg-slate-50/50"}`}
                                                            onClick={() => setExpandedServiceId(isExpanded ? null : sc.serviceId)}
                                                        >
                                                            <div className="flex items-center gap-6">
                                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isExpanded ? "bg-[#DC2626] text-white shadow-lg shadow-red-500/20" : "bg-white border border-slate-200 text-[#0B1751]"}`}>
                                                                    <Briefcase size={24} />
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-center gap-3">
                                                                        <h4 className={`text-xl font-black ${isExpanded ? "text-[#0B1751]" : "text-slate-500"}`}>{service.title} İçerik Yapılandırması</h4>
                                                                        <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full uppercase tracking-tighter">Hizmet Sayfası Aktif</span>
                                                                    </div>
                                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Bu hizmet seçildiğinde gösterilecek özel destinasyon rehberi</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <button 
                                                                    type="button" 
                                                                    onClick={(e) => { e.stopPropagation(); removeServiceContent(index); }} 
                                                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                                <div className={`w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-[#0B1751] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                                                                    <ChevronDown size={20} />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <AnimatePresence>
                                                            {isExpanded && (
                                                                <motion.div 
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    className="overflow-hidden border-t border-slate-100"
                                                                >
                                                                    <div className="p-10 space-y-10">
                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                                            <div className="space-y-6">
                                                                                <div className="flex items-center gap-3 px-1">
                                                                                    <div className="w-1 h-4 bg-blue-500 rounded-full" />
                                                                                    <h5 className="font-black text-[10px] text-[#0B1751] uppercase tracking-[0.2em]">SEO & ÜSTRERİ YAPILANDIRMASI</h5>
                                                                                </div>
                                                                                <div className="space-y-4">
                                                                                    <div className="space-y-2">
                                                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Özel Sayfa Başlığı</label>
                                                                                        <input type="text" value={sc.seoTitle || ""} onChange={(e) => updateServiceContent(index, "seoTitle", e.target.value)} className="w-full bg-white border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black shadow-sm" placeholder={`${service.title} - ${formData.name}`} />
                                                                                    </div>
                                                                                    <div className="space-y-2">
                                                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Meta Açıklama</label>
                                                                                        <textarea value={sc.seoDesc || ""} onChange={(e) => updateServiceContent(index, "seoDesc", e.target.value)} className="w-full bg-white border border-slate-200 p-4 rounded-2xl outline-none focus:border-[#DC2626] text-sm font-bold text-black shadow-sm h-28 resize-none" placeholder="Bu sayfa için özelleştirilmiş SEO açıklaması..." />
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="space-y-6">
                                                                                <div className="flex items-center gap-3 px-1">
                                                                                    <div className="w-1 h-4 bg-[#DC2626] rounded-full" />
                                                                                    <h5 className="font-black text-[10px] text-[#0B1751] uppercase tracking-[0.2em]">GÖRSEL VARLIKLARI</h5>
                                                                                </div>
                                                                                <div className="space-y-4">
                                                                                    <div className="flex items-center gap-6">
                                                                                        <div className="w-28 h-28 rounded-[28px] bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center shrink-0 group relative">
                                                                                            {sc.image ? (
                                                                                                <>
                                                                                                    <img src={sc.image} className="w-full h-full object-cover" alt="Preview" />
                                                                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                                                        <label className="cursor-pointer p-2 bg-white rounded-xl text-[#0B1751]">
                                                                                                            <Edit size={16} />
                                                                                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, index)} />
                                                                                                        </label>
                                                                                                    </div>
                                                                                                </>
                                                                                            ) : (
                                                                                                <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-[#DC2626] transition-colors">
                                                                                                    <ImageIcon size={20} />
                                                                                                    <span className="text-[8px] font-black uppercase">YÜKLE</span>
                                                                                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, index)} />
                                                                                                </label>
                                                                                            )}
                                                                                        </div>
                                                                                        <div className="flex-1 space-y-2">
                                                                                            <p className="text-[9px] font-bold text-slate-500 italic">Bu hizmete özel kapak görseli. Boş bırakılırsa genel görsel kullanılır.</p>
                                                                                            <input 
                                                                                                type="text" 
                                                                                                value={sc.image || ""} 
                                                                                                onChange={(e) => updateServiceContent(index, "image", e.target.value)} 
                                                                                                className="w-full bg-white border border-slate-200 p-3 rounded-xl outline-none focus:border-[#DC2626] text-[10px] font-mono shadow-sm"
                                                                                                placeholder="Görsel URL..."
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    <ImageSettingsControl settings={sc.imageSettings} onChange={(s) => updateServiceContent(index, "imageSettings", s)} label="ÖZEL GÖRSEL KONUMLANDIRMA" />
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="space-y-4">
                                                                            <div className="flex items-center gap-3 px-1">
                                                                                <div className="w-1 h-4 bg-emerald-500 rounded-full" />
                                                                                <h5 className="font-black text-[10px] text-[#0B1751] uppercase tracking-[0.2em]">HİZMETE ÖZEL REHBER İÇERİĞİ</h5>
                                                                            </div>
                                                                            <div className="h-[500px] bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-xl">
                                                                                <ReactQuill theme="snow" value={sc.content || ""} onChange={(content) => updateServiceContent(index, "content", content)} modules={modules} className="h-full flex flex-col [&_.ql-toolbar]:border-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-slate-100 [&_.ql-toolbar]:bg-slate-50/50 [&_.ql-container]:border-0 [&_.ql-editor]:p-8 [&_.ql-editor]:text-base" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                <div className="p-8 border-t border-slate-100 flex items-center justify-between bg-white shrink-0">
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only"
                                                    checked={formData.active}
                                                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                                />
                                                <div className={`w-12 h-6 rounded-full transition-all ${formData.active ? "bg-emerald-500" : "bg-slate-300"}`} />
                                                <div className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${formData.active ? "translate-x-6" : ""}`} />
                                            </div>
                                            <span className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest">Destinasyon Yayında</span>
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button 
                                            type="button" 
                                            onClick={() => setIsEditorOpen(false)} 
                                            className="px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all font-bold"
                                        >
                                            İPTAL
                                        </button>
                                        <button 
                                            type="submit" 
                                            className="px-12 py-4 bg-[#0B1751] text-white rounded-[20px] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                                        >
                                            <Save size={18} />
                                            KAYDET VE YAYINLA
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function CountriesManagement() {
    return (
        <Suspense fallback={<div>Yükleniyor...</div>}>
            <CountriesManagementContent />
        </Suspense>
    );
}

