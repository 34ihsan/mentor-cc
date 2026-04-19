"use client";

import { useState, useEffect } from "react";
import {
    Save,
    Layout,
    CheckCircle2,
    Users,
    Search,
    ShieldCheck,
    Plus,
    Trash2,
    MoveUp,
    MoveDown,
    Building2,
    Star,
    Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ICON_OPTIONS = [
    { name: "Users", icon: Users },
    { name: "Search", icon: Search },
    { name: "CheckCircle2", icon: CheckCircle2 },
    { name: "ShieldCheck", icon: ShieldCheck },
    { name: "Star", icon: Star },
    { name: "Sparkles", icon: Sparkles }
];

export default function HomePageManagement() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [institutions, setInstitutions] = useState<any[]>([]);
    const [countries, setCountries] = useState<any[]>([]);
    const [instSearch, setInstSearch] = useState("");
    const [countrySearch, setCountrySearch] = useState("");
    const [config, setConfig] = useState<any>({
        workflow: {
            title: "Süreç Nasıl İşliyor?",
            subtitle: "Karmaşık başvuru süreçlerini sizin için basitleiyor, her adımda yanınızda oluyoruz.",
            steps: []
        },
        featuredInstitutions: {
            title: "Seçkin Kurumlar",
            subtitle: "Dünyanın En İyi Eğitim Kurumları",
            items: []
        },
        popularDestinations: {
            title: "Popüler Destinasyonlar",
            subtitle: "Eğitim almak istediğiniz ülkeyi seçin.",
            items: []
        }
    });

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            await Promise.all([
                fetchSettings(),
                fetchInstitutions(),
                fetchCountries()
            ]);
        } finally {
            setLoading(false);
        }
    };

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/admin/settings?key=home_page_config");
            if (res.ok) {
                const data = await res.json();
                if (data && data.value) {
                    const parsed = JSON.parse(data.value);
                    setConfig({
                        ...config,
                        ...parsed,
                        workflow: {
                            ...config.workflow,
                            ...(parsed.workflow ? (Array.isArray(parsed.workflow) ? { steps: parsed.workflow } : parsed.workflow) : {})
                        },
                        featuredInstitutions: {
                            ...config.featuredInstitutions,
                            ...(parsed.featuredInstitutions || {})
                        },
                        popularDestinations: {
                            ...config.popularDestinations,
                            ...(parsed.popularDestinations || {})
                        }
                    });
                }
            }
        } catch (error) {
            console.error("Failed to fetch home page config:", error);
        }
    };

    const fetchInstitutions = async () => {
        try {
            const res = await fetch("/api/admin/institutions");
            if (res.ok) setInstitutions(await res.json());
        } catch (e) { console.error(e); }
    };

    const fetchCountries = async () => {
        try {
            const res = await fetch("/api/admin/countries");
            if (res.ok) setCountries(await res.json());
        } catch (e) { console.error(e); }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/admin/settings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    key: "home_page_config",
                    value: JSON.stringify(config)
                })
            });

            if (res.ok) {
                alert("Ana sayfa ayarları kaydedildi.");
            } else {
                alert("Kaydetme hatası.");
            }
        } catch (error) {
            console.error("Save error:", error);
            alert("Bağlantı hatası.");
        } finally {
            setSaving(false);
        }
    };

    const updateWorkflowStep = (index: number, field: string, value: string) => {
        const next = [...config.workflow.steps];
        next[index] = { ...next[index], [field]: value };
        setConfig({ ...config, workflow: { ...config.workflow, steps: next } });
    };

    const addWorkflowStep = () => {
        if (config.workflow.steps.length >= 4) {
            alert("Maksimum 4 adım eklenebilir.");
            return;
        }
        setConfig({
            ...config,
            workflow: {
                ...config.workflow,
                steps: [...config.workflow.steps, { title: "Yeni Adım", desc: "Açıklama...", icon: "Star" }]
            }
        });
    };

    const removeWorkflowStep = (index: number) => {
        setConfig({
            ...config,
            workflow: {
                ...config.workflow,
                steps: config.workflow.steps.filter((_: any, i: number) => i !== index)
            }
        });
    };

    const moveStep = (index: number, direction: 'up' | 'down') => {
        const next = [...config.workflow.steps];
        const target = direction === 'up' ? index - 1 : index + 1;
        if (target < 0 || target >= next.length) return;
        const temp = next[index];
        next[index] = next[target];
        next[target] = temp;
        setConfig({ ...config, workflow: { ...config.workflow, steps: next } });
    };

    const toggleFeaturedInstitution = (id: string) => {
        const current = config.featuredInstitutions.items || [];
        const next = current.includes(id)
            ? current.filter((i: string) => i !== id)
            : [...current, id];
        setConfig({
            ...config,
            featuredInstitutions: { ...config.featuredInstitutions, items: next }
        });
    };

    const reorderFeaturedInstitution = (index: number, direction: 'up' | 'down') => {
        const next = [...config.featuredInstitutions.items];
        const target = direction === 'up' ? index - 1 : index + 1;
        if (target < 0 || target >= next.length) return;
        const temp = next[index];
        next[index] = next[target];
        next[target] = temp;
        setConfig({
            ...config,
            featuredInstitutions: { ...config.featuredInstitutions, items: next }
        });
    };

    const togglePopularDestination = (name: string) => {
        const current = config.popularDestinations.items || [];
        const next = current.includes(name)
            ? current.filter((i: string) => i !== name)
            : [...current, name];
        setConfig({
            ...config,
            popularDestinations: { ...config.popularDestinations, items: next }
        });
    };

    const reorderPopularDestination = (index: number, direction: 'up' | 'down') => {
        const next = [...config.popularDestinations.items];
        const target = direction === 'up' ? index - 1 : index + 1;
        if (target < 0 || target >= next.length) return;
        const temp = next[index];
        next[index] = next[target];
        next[target] = temp;
        setConfig({
            ...config,
            popularDestinations: { ...config.popularDestinations, items: next }
        });
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-10 h-10 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Yükleniyor...</p>
        </div>
    );

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[#003366] dark:text-white font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                        <Layout size={12} />
                        Sayfa Mimarı
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter dark:text-amber-400">Ana Sayfa Yönetimi</h1>
                    <p className="text-sm text-slate-900 dark:text-white font-medium mt-1">Ana sayfa bölümlerini ve akışını dinamik olarak kontrol edin.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="premium-btn group flex items-center gap-2"
                >
                    {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={18} />}
                    {saving ? "Kaydediliyor..." : "Değişiklikleri Yayınla"}
                </button>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Workflow Section */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 border-white/40 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-6 mb-8">
                        <div>
                            <h3 className="text-xl font-black tracking-tight flex items-center gap-2 dark:text-white">
                                <Sparkles className="text-[var(--primary)]" size={20} />
                                {config.workflow.title}
                            </h3>
                            <p className="text-xs text-slate-900 dark:text-white font-bold uppercase tracking-wider mt-1">{config.workflow.subtitle}</p>
                        </div>
                        <button onClick={addWorkflowStep} className="premium-btn text-[10px] px-4 py-2 flex items-center gap-2">
                            <Plus size={14} /> Adım Ekle
                        </button>
                    </div>

                    <div className="space-y-6 mb-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-black dark:text-white uppercase tracking-widest ml-1">Bölüm Ana Başlığı</label>
                                <input
                                    type="text"
                                    value={config.workflow.title}
                                    onChange={(e) => setConfig({ ...config, workflow: { ...config.workflow, title: e.target.value } })}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-sm font-bold text-black dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-black dark:text-white uppercase tracking-widest ml-1">Bölüm Alt Başlığı</label>
                                <input
                                    type="text"
                                    value={config.workflow.subtitle}
                                    onChange={(e) => setConfig({ ...config, workflow: { ...config.workflow, subtitle: e.target.value } })}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-sm font-bold text-black dark:text-white"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {config.workflow.steps.map((step: any, idx: number) => (
                            <div key={idx} className="bg-slate-50 dark:bg-slate-900 shadow-inner rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 relative group">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-[10px] font-black text-black bg-white dark:bg-slate-800 dark:text-white px-3 py-1 rounded-full border border-slate-100 dark:border-slate-700">
                                        ADIM {idx + 1}
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => moveStep(idx, 'up')} className="p-1.5 hover:bg-white rounded-lg text-slate-900 dark:text-white"><MoveUp size={12} /></button>
                                        <button onClick={() => moveStep(idx, 'down')} className="p-1.5 hover:bg-white rounded-lg text-slate-900 dark:text-white"><MoveDown size={12} /></button>
                                        <button onClick={() => removeWorkflowStep(idx)} className="p-1.5 hover:bg-red-50 text-red-400 rounded-lg"><Trash2 size={12} /></button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-slate-900 dark:text-white uppercase ml-1">İkon</label>
                                        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                                            {ICON_OPTIONS.map(opt => (
                                                <button
                                                    key={opt.name}
                                                    type="button"
                                                    onClick={() => updateWorkflowStep(idx, 'icon', opt.name)}
                                                    className={`p-2 rounded-xl border transition-all ${step.icon === opt.name ? 'border-[var(--primary)] bg-white text-[var(--primary)] shadow-sm' : 'border-transparent text-slate-900 dark:text-white'}`}
                                                >
                                                    <opt.icon size={16} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-black dark:text-white uppercase ml-1">Başlık</label>
                                        <input
                                            type="text"
                                            value={step.title}
                                            onChange={(e) => updateWorkflowStep(idx, 'title', e.target.value)}
                                            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-xs font-bold outline-none focus:border-[var(--primary)] shadow-inner text-black dark:text-white"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-black dark:text-white uppercase ml-1">Açıklama</label>
                                        <textarea
                                            rows={3}
                                            value={step.desc}
                                            onChange={(e) => updateWorkflowStep(idx, 'desc', e.target.value)}
                                            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-[11px] font-bold outline-none focus:border-[var(--primary)] resize-none shadow-inner text-black dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Dynamic Content Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Featured Institutions */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-8 border-white/40 shadow-xl space-y-6">
                        <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                            <h3 className="text-xl font-black tracking-tight flex items-center gap-2 dark:text-white">
                                <Building2 className="text-[var(--primary)]" size={20} />
                                Seçkin Kurumlar
                            </h3>
                            <p className="text-xs text-slate-900 dark:text-white font-bold uppercase tracking-wider mt-1">Sıralama ve Seçim</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-black dark:text-white uppercase tracking-widest ml-1">Bölüm Başlıkları</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Başlık..."
                                            value={config.featuredInstitutions.title}
                                            onChange={(e) => setConfig({ ...config, featuredInstitutions: { ...config.featuredInstitutions, title: e.target.value } })}
                                            className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-xs font-bold text-black dark:text-white"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Alt Başlık..."
                                            value={config.featuredInstitutions.subtitle}
                                            onChange={(e) => setConfig({ ...config, featuredInstitutions: { ...config.featuredInstitutions, subtitle: e.target.value } })}
                                            className="flex-[2] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-xs font-bold text-black dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest ml-1">Seçili & Sıralı Kurumlar ({config.featuredInstitutions.items.length})</label>
                                    <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 space-y-2 min-h-[100px] max-h-[300px] overflow-y-auto">
                                        {config.featuredInstitutions.items.map((id: string, idx: number) => {
                                            const inst = institutions.find(i => i.id === id);
                                            if (!inst) return null;
                                            return (
                                                <div key={id} className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 group">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-bold text-slate-400 w-4">{idx + 1}.</span>
                                                        <p className="text-xs font-black text-black dark:text-white truncate max-w-[150px]">{inst.name}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <button onClick={() => reorderFeaturedInstitution(idx, 'up')} className="p-1 hover:bg-slate-100 rounded text-slate-400"><MoveUp size={12} /></button>
                                                        <button onClick={() => reorderFeaturedInstitution(idx, 'down')} className="p-1 hover:bg-slate-100 rounded text-slate-400"><MoveDown size={12} /></button>
                                                        <button onClick={() => toggleFeaturedInstitution(id)} className="p-1 hover:bg-red-50 text-red-400 rounded transition-colors"><Trash2 size={12} /></button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {config.featuredInstitutions.items.length === 0 && (
                                            <div className="h-full flex flex-col items-center justify-center opacity-20 py-10">
                                                <Building2 size={24} />
                                                <p className="text-[10px] font-bold mt-2 dark:text-white/60">Henüz kurum seçilmedi</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                        <input
                                            type="text"
                                            placeholder="Eklenecek kurum ara..."
                                            value={instSearch}
                                            onChange={(e) => setInstSearch(e.target.value)}
                                            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-10 pr-3 py-2.5 rounded-xl text-xs font-bold text-black dark:text-white"
                                        />
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto pr-2 space-y-1 scrollbar-premium">
                                        {institutions
                                            .filter(inst =>
                                                !config.featuredInstitutions.items.includes(inst.id) &&
                                                (inst.name.toLowerCase().includes(instSearch.toLowerCase()) ||
                                                    (inst.country?.name || (typeof inst.country === 'string' ? inst.country : '')).toLowerCase().includes(instSearch.toLowerCase()) ||
                                                    inst.city?.toLowerCase().includes(instSearch.toLowerCase()))
                                            )
                                            .map((inst: any) => (
                                                <button
                                                    key={inst.id}
                                                    onClick={() => toggleFeaturedInstitution(inst.id)}
                                                    className="w-full flex items-center justify-between p-2 rounded-xl border border-transparent hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all text-left"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                                            {inst.logo ? <img src={inst.logo} className="w-6 h-6 object-contain" /> : <Building2 size={14} className="text-slate-400" />}
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-black text-black dark:text-white line-clamp-1">{inst.name}</p>
                                                            <p className="text-[10px] text-slate-400 font-bold uppercase">{(inst.country?.name || (typeof inst.country === 'string' ? inst.country : 'Unknown'))} - {inst.city || 'Anasayfa'}</p>
                                                        </div>
                                                    </div>
                                                    <Plus size={14} className="text-[var(--primary)]" />
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Popular Destinations */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-8 border-white/40 shadow-xl space-y-6">
                        <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                            <h3 className="text-xl font-black tracking-tight flex items-center gap-2 dark:text-white">
                                <Star className="text-[var(--primary)]" size={20} />
                                Popüler Destinasyonlar
                            </h3>
                            <p className="text-xs text-slate-900 dark:text-white font-bold uppercase tracking-wider mt-1">Sıralama ve Seçim</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-black dark:text-white uppercase tracking-widest ml-1">Bölüm Başlıkları</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Başlık..."
                                            value={config.popularDestinations.title}
                                            onChange={(e) => setConfig({ ...config, popularDestinations: { ...config.popularDestinations, title: e.target.value } })}
                                            className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-xs font-bold text-black dark:text-white"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Alt Başlık..."
                                            value={config.popularDestinations.subtitle}
                                            onChange={(e) => setConfig({ ...config, popularDestinations: { ...config.popularDestinations, subtitle: e.target.value } })}
                                            className="flex-[2] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-xs font-bold text-black dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-black dark:text-white uppercase tracking-widest ml-1">Seçili & Sıralı Ülkeler ({config.popularDestinations.items.length})</label>
                                    <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 space-y-2 min-h-[100px] max-h-[300px] overflow-y-auto">
                                        {config.popularDestinations.items.map((name: string, idx: number) => {
                                            const country = countries.find(c => c.name === name);
                                            if (!country) return null;
                                            return (
                                                <div key={name} className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 group">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-bold text-slate-400 w-4">{idx + 1}.</span>
                                                        <span className="text-lg">{country.flag}</span>
                                                        <p className="text-xs font-black text-black dark:text-white truncate">{country.name}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <button onClick={() => reorderPopularDestination(idx, 'up')} className="p-1 hover:bg-slate-100 rounded text-slate-400"><MoveUp size={12} /></button>
                                                        <button onClick={() => reorderPopularDestination(idx, 'down')} className="p-1 hover:bg-slate-100 rounded text-slate-400"><MoveDown size={12} /></button>
                                                        <button onClick={() => togglePopularDestination(name)} className="p-1 hover:bg-red-50 text-red-400 rounded transition-colors"><Trash2 size={12} /></button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {config.popularDestinations.items.length === 0 && (
                                            <div className="h-full flex flex-col items-center justify-center opacity-20 py-10">
                                                <Star size={24} />
                                                <p className="text-[10px] font-bold mt-2 dark:text-white/60">Henüz ülke seçilmedi</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                        <input
                                            type="text"
                                            placeholder="Eklenecek ülke ara..."
                                            value={countrySearch}
                                            onChange={(e) => setCountrySearch(e.target.value)}
                                            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-10 pr-3 py-2.5 rounded-xl text-xs font-bold text-black dark:text-white"
                                        />
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto pr-2 space-y-1 scrollbar-premium">
                                        {countries
                                            .filter(c => !config.popularDestinations.items.includes(c.name) && c.name.toLowerCase().includes(countrySearch.toLowerCase()))
                                            .map((country: any) => (
                                                <button
                                                    key={country.id}
                                                    onClick={() => togglePopularDestination(country.name)}
                                                    className="w-full flex items-center justify-between p-2 rounded-xl border border-transparent hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all text-left"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xl">{country.flag}</span>
                                                        <p className="text-xs font-black text-black dark:text-white uppercase tracking-widest">{country.name}</p>
                                                    </div>
                                                    <Plus size={14} className="text-[var(--primary)]" />
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
