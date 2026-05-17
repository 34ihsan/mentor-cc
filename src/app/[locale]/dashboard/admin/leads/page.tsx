"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Users, 
    MessageSquare, 
    Calendar, 
    Clock, 
    Trash2, 
    CheckCircle2, 
    Circle, 
    ExternalLink, 
    Search,
    Filter,
    MoreHorizontal,
    ChevronDown,
    X,
    Send,
    Instagram,
    Mail,
    Globe,
    FileText,
    Globe as GlobeIcon,
    Plus,
    List
} from "lucide-react";
import { 
    getLeadsAction, 
    updateLeadStatusAction, 
    deleteLeadAction, 
    createLeadAction, 
    updateLeadNotesAction,
    sendLeadEmailAction,
    getAssigneesAction,
    assignLeadAction 
} from "@/app/actions/lead-actions";
import { format, isToday } from "date-fns";
import { tr } from "date-fns/locale";

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sourceFilter, setSourceFilter] = useState("all");
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<any>(null);
    const [emailContent, setEmailContent] = useState({
        subject: "",
        content: ""
    });
    const [assignees, setAssignees] = useState<any[]>([]);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [newLead, setNewLead] = useState({
        name: "",
        phone: "",
        subject: "",
        message: "",
        source: "instagram"
    });

    useEffect(() => {
        loadLeads();
        loadAssignees();
    }, []);

    const loadAssignees = async () => {
        const result = await getAssigneesAction();
        if (result.success) {
            setAssignees(result.data || []);
        }
    };

    const loadLeads = async () => {
        setLoading(true);
        const result = await getLeadsAction();
        if (result.success) {
            setLeads(result.data || []);
        }
        setLoading(false);
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        const result = await updateLeadStatusAction(id, newStatus);
        if (result.success) {
            setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
        }
    };

    const handleUpdateNotes = async (id: string, notes: string) => {
        const result = await updateLeadNotesAction(id, notes);
        if (result.success) {
            setLeads(leads.map(l => l.id === id ? { ...l, notes } : l));
        }
    };

    const handleSendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedLead) return;
        setLoading(true);
        const result = await sendLeadEmailAction(selectedLead.id, emailContent.subject, emailContent.content);
        if (result.success) {
            alert("E-posta başarıyla gönderildi.");
            setIsEmailModalOpen(false);
            setEmailContent({ subject: "", content: "" });
            loadLeads(); // Refresh to show the log in notes
        } else {
            alert(result.error);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu talebi silmek istediğinizden emin misiniz?")) return;
        const result = await deleteLeadAction(id);
        if (result.success) {
            setLeads(leads.filter(l => l.id !== id));
        }
    };

    const handleAssign = async (leadId: string, agencyId: string | null) => {
        setLoading(true);
        const result = await assignLeadAction(leadId, agencyId);
        if (result.success) {
            alert("Atama başarıyla güncellendi.");
            setIsAssignModalOpen(false);
            loadLeads();
        } else {
            alert(result.error);
        }
        setLoading(false);
    };

    const filteredLeads = leads.filter(lead => {
        const matchesSearch = 
            lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            (lead.program?.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (lead.value?.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
        const matchesSource = sourceFilter === "all" || lead.source === sourceFilter;
        
        return matchesSearch && matchesStatus && matchesSource;
    });

    const handleCreateLead = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const result = await createLeadAction(newLead);
        if (result.success) {
            setIsAddModalOpen(false);
            setNewLead({ name: "", phone: "", subject: "", message: "", source: "instagram" });
            loadLeads();
        }
        setLoading(false);
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'win': return <CheckCircle2 size={16} className="text-emerald-500" />;
            case 'contact': return <Clock size={16} className="text-amber-500" />;
            default: return <Circle size={16} className="text-blue-500" />;
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'win': return 'Tamamlandı';
            case 'contact': return 'İletişimde';
            default: return 'Yeni';
        }
    };

    const getSourceIcon = (source: string) => {
        switch (source?.toLowerCase()) {
            case 'instagram': return <Instagram size={14} className="text-pink-500" />;
            case 'mail': return <Mail size={14} className="text-blue-500" />;
            case 'whatsapp widget': return <MessageSquare size={14} className="text-emerald-500" />;
            case 'website_contact': return <Globe size={14} className="text-indigo-500" />;
            case 'website_quote': return <FileText size={14} className="text-amber-600" />;
            case 'instagram_automation': return <Instagram size={14} className="text-purple-600" />;
            default: return <GlobeIcon size={14} className="text-slate-400" />;
        }
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-[#0B1751]">Müşteri Adayları 📣</h1>
                    <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-wider">Meta / Facebook Lead Merkezi</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="flex bg-white border border-slate-200 rounded-2xl overflow-hidden p-1 shadow-sm mr-2">
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'list' ? 'bg-[#DC2626] text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            LİSTE
                        </button>
                        <button 
                            onClick={() => setViewMode('calendar')}
                            className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'calendar' ? 'bg-[#DC2626] text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            TAKVİM
                        </button>
                    </div>

                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="premium-btn flex items-center gap-2 px-6 py-3 shadow-xl shadow-blue-900/10"
                    >
                        <Plus size={18} />
                        <span className="text-[10px] font-black tracking-widest uppercase">HIZLI EKLE</span>
                    </button>
                </div>
            </div>

            {/* Analytics Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 border-l-4 border-blue-500 rounded-2xl border-y border-r border-slate-200 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Yeni Talepler</p>
                    <div className="flex items-end gap-2">
                        <span className="text-2xl font-black text-[#0B1751]">
                            {leads.filter(l => l.status === 'new').length}
                        </span>
                        <div className="flex items-center gap-1 text-emerald-500 font-bold text-[10px] pb-1">
                            <Plus size={10} /> {leads.filter(l => l.status === 'new' && isToday(new Date(l.createdAt))).length} Bugün
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 border-l-4 border-emerald-500 rounded-2xl border-y border-r border-slate-200 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tamamlanan</p>
                    <div className="flex items-end gap-2">
                        <span className="text-2xl font-black text-[#0B1751]">
                            {leads.filter(l => l.status === 'win').length}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 pb-1">Toplam</span>
                    </div>
                </div>

                <div className="bg-white p-6 border-l-4 border-amber-500 rounded-2xl border-y border-r border-slate-200 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Randevular</p>
                    <div className="flex items-end gap-2">
                        <span className="text-2xl font-black text-[#0B1751]">
                            {leads.filter(l => l.program === 'Randevu Talebi').length}
                        </span>
                        <Calendar size={12} className="text-amber-500 mb-2" />
                    </div>
                </div>

                <div className="bg-white p-6 border-l-4 border-pink-500 rounded-2xl border-y border-r border-slate-200 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">En Çok Kanal</p>
                    <div className="flex items-end gap-2">
                        <span className="text-lg font-black text-[#0B1751] uppercase truncate">
                            {Object.entries(leads.reduce((acc, l) => {
                                acc[l.source || 'website'] = (acc[l.source || 'website'] || 0) + 1;
                                return acc;
                            }, {} as any)).sort((a, b) => (b[1] as number) - (a[1] as number))[0]?.[0] || '---'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 px-1">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#DC2626] transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder="İsim, konu veya mesaj içeriğinde ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-[#DC2626]/10 focus:border-[#DC2626] transition-all font-bold text-sm text-black"
                    />
                </div>
                
                <div className="flex gap-2">
                    <select 
                        value={sourceFilter}
                        onChange={(e) => setSourceFilter(e.target.value)}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 rounded-2xl font-black text-[10px] uppercase tracking-widest outline-none focus:border-[var(--primary)] transition-all shadow-sm"
                    >
                        <option value="all">TÜM KANALLAR</option>
                        <option value="instagram">INSTAGRAM</option>
                        <option value="website_contact">WEB İLETİŞİM</option>
                        <option value="website_quote">TEKLİF TALEBİ</option>
                        <option value="whatsapp widget">WHATSAPP</option>
                        <option value="mail">E-POSTA</option>
                        <option value="instagram_automation">IG REKLAM (OTOMATİK)</option>
                    </select>

                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest outline-none focus:border-[var(--primary)] transition-all shadow-sm"
                    >
                        <option value="all">TÜM DURUMLAR</option>
                        <option value="new">YENİ</option>
                        <option value="contact">İLETİŞİMDE</option>
                        <option value="win">TAMAMLANDI</option>
                    </select>
                    
                    <button 
                        onClick={loadLeads}
                        className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <Clock size={18} className="text-slate-600" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-50">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="bg-white p-6 h-48 animate-pulse rounded-3xl border border-slate-200 shadow-sm" />
                    ))}
                </div>
            ) : viewMode === 'calendar' ? (
                <div className="bg-white p-8 border border-slate-200 rounded-3xl shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-black text-[#0B1751] uppercase tracking-tighter">İş Akışı / Randevular</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Zaman çizelgesine göre sıralanmış talepler</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {leads.length === 0 ? (
                            <div className="text-center py-10 text-slate-400 font-bold text-xs uppercase tracking-widest">Görüntülenecek randevu yok.</div>
                        ) : (
                            [...leads]
                                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                .map((lead, idx) => (
                                    <div key={lead.id} className="relative pl-8 border-l-2 border-slate-100 pb-8 last:pb-0">
                                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-[#DC2626] shadow-lg shadow-red-500/20" />
                                        
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-[#DC2626]/30 transition-all group">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-white p-3 rounded-2xl shadow-sm">
                                                    <Calendar className="text-[#DC2626]" size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-black capitalize leading-none">{lead.name}</h4>
                                                    <p className="text-[10px] font-black text-[#DC2626] uppercase tracking-widest mt-1.5">{lead.program}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div className="text-right">
                                                    <div className="flex items-center justify-end gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                        <Clock size={12} />
                                                        {format(new Date(lead.createdAt), 'HH:mm')}
                                                    </div>
                                                    <div className="text-xs font-black text-black mt-0.5">
                                                        {format(new Date(lead.createdAt), 'dd MMMM yyyy', { locale: tr })}
                                                    </div>
                                                </div>
                                                <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-800 hidden md:block" />
                                                <div className="flex items-center gap-2">
                                                    {getSourceIcon(lead.source)}
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{lead.source?.replace(' widget', '')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>
                </div>
            ) : filteredLeads.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredLeads.map((lead, idx) => (
                            <motion.div
                                key={lead.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white group hover:border-[#DC2626]/50 transition-all duration-300 relative overflow-hidden flex flex-col h-full border border-slate-200 rounded-3xl shadow-sm"
                            >
                                {/* Header */}
                                <div className="p-6 pb-4 border-b border-slate-100">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(lead.status)}
                                            <div className="flex items-center gap-1.5 ml-auto">
                                                {getSourceIcon(lead.source)}
                                                <span className="text-[9px] font-black opacity-40 uppercase">{lead.source?.replace(' widget', '')}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                            <button 
                                                onClick={() => handleDelete(lead.id)}
                                                className="p-2 hover:bg-red-50 text-red-500 rounded-xl transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-lg font-black tracking-tight text-black capitalize truncate mb-1">
                                        {lead.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-[#DC2626] uppercase tracking-widest">
                                        {lead.program === 'Randevu Talebi' ? <Calendar size={12} /> : <MessageSquare size={12} />}
                                        {lead.program || 'Genel Soru'}
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-6 flex-1 space-y-4">
                                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                        <p className="text-xs font-bold leading-relaxed text-black italic">
                                            "{lead.value}"
                                        </p>
                                    </div>

                                    {/* Internal Notes */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Dahili Notlar</span>
                                        </div>
                                        <textarea 
                                            placeholder="Gerekli notları buraya yazın..."
                                            value={lead.notes || ""}
                                            onChange={(e) => {
                                                const newNotes = e.target.value;
                                                setLeads(leads.map(l => l.id === lead.id ? { ...l, notes: newNotes } : l));
                                            }}
                                            onBlur={(e) => handleUpdateNotes(lead.id, e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] font-bold text-black outline-none focus:border-[#DC2626]/30 min-h-[60px] resize-none"
                                        />
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="p-6 pt-0 mt-auto space-y-4">
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={12} />
                                            {format(new Date(lead.createdAt), 'dd MMMM yyyy, HH:mm', { locale: tr })}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <button 
                                            onClick={() => handleStatusUpdate(lead.id, lead.status === 'win' ? 'new' : 'win')}
                                            className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                                lead.status === 'win' 
                                                    ? "bg-slate-100 text-slate-500 hover:bg-slate-200" 
                                                    : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20"
                                            }`}
                                        >
                                            {lead.status === 'win' ? 'YENİ YAP' : 'TAMAMLA'}
                                        </button>
                                        
                                        <button 
                                            onClick={() => {
                                                if (confirm(`${lead.name} isimli adayı resmi öğrenci kaydına dönüştürmek istediğinize emin misiniz?`)) {
                                                    handleStatusUpdate(lead.id, 'win');
                                                }
                                            }}
                                            className="py-3 bg-amber-50 text-amber-600 border border-amber-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-100 transition-all flex items-center justify-center gap-2"
                                        >
                                            KAYDA DÖNÜŞTÜR <CheckCircle2 size={12} />
                                        </button>
                                        
                                        <button 
                                            onClick={() => {
                                                setSelectedLead(lead);
                                                setEmailContent({
                                                    subject: `${lead.program} Hakkında Bilgilendirme`,
                                                    content: `Merhaba ${lead.name},\n\nTalebiniz üzerine Mentor Career olarak sizinle iletişime geçiyoruz...`
                                                });
                                                setIsEmailModalOpen(true);
                                            }}
                                            className="py-3 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                                        >
                                            E-POSTA <Mail size={12} />
                                        </button>
                                        
                                        <button 
                                            onClick={() => {
                                                const phone = lead.phone || '';
                                                const message = encodeURIComponent(`Merhaba ${lead.name}, Mentor Career adına talebiniz üzerine iletişime geçiyorum.`);
                                                window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
                                            }}
                                            className="py-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all flex items-center justify-center gap-2"
                                        >
                                            WHATSAPP <Send size={12} />
                                        </button>

                                        <button 
                                            onClick={() => {
                                                setSelectedLead(lead);
                                                setIsAssignModalOpen(true);
                                            }}
                                            className="col-span-2 py-3 bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                                        >
                                            {lead.agency ? `ATANDI: ${lead.agency.name}` : "DANIŞMANA ATA"} <Users size={12} />
                                        </button>
                                    </div>
                                </div>

                                {/* Background Accents */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#DC2626]/5 rounded-full blur-2xl -mr-12 -mt-12 pointer-events-none" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="bg-white py-20 flex flex-col items-center justify-center border-dashed border-2 border-slate-200 rounded-3xl shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                        <Search className="text-slate-300" size={32} />
                    </div>
                    <h3 className="text-xl font-black text-black uppercase tracking-tighter">Talep Bulunamadı</h3>
                    <p className="text-sm font-bold text-slate-500 mt-2">Kriterlerinize uygun başvuru kaydı bulunmuyor.</p>
                </div>
            )}

            {/* Quick Add Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg bg-white shadow-2xl rounded-3xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-xl font-black text-black uppercase tracking-tighter">HIZLI TALEP EKLE</h3>
                                <button onClick={() => setIsAddModalOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400"><X size={20} /></button>
                            </div>

                            <form onSubmit={handleCreateLead} className="p-8 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest">Kanal</label>
                                        <select 
                                            value={newLead.source}
                                            onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-[#DC2626] text-xs font-bold text-black"
                                        >
                                            <option value="instagram">Instagram</option>
                                            <option value="mail">E-Posta</option>
                                            <option value="whatsapp">WhatsApp (Dış)</option>
                                            <option value="facebook">Facebook</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest">Müşteri Adı</label>
                                        <input required type="text" value={newLead.name} onChange={(e) => setNewLead({ ...newLead, name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-[#DC2626] text-xs font-bold text-black" placeholder="Ahmet Yılmaz" />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest">Başlık / Konu</label>
                                    <input required type="text" value={newLead.subject} onChange={(e) => setNewLead({ ...newLead, subject: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-[#DC2626] text-xs font-bold text-black" placeholder="Almanya Dil Okulu Talebi" />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest">Özel Not / Mesaj</label>
                                    <textarea required rows={3} value={newLead.message} onChange={(e) => setNewLead({ ...newLead, message: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-[#DC2626] text-xs font-bold text-black resize-none" placeholder="Instagram DM üzerinden ulaştı..." />
                                </div>

                                <div className="pt-4">
                                    <button type="submit" disabled={loading} className="w-full premium-btn py-4 flex items-center justify-center gap-2">
                                        {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={16} /> KAYDET</>}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Email Modal */}
            <AnimatePresence>
                {isEmailModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsEmailModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-xl bg-white shadow-2xl rounded-3xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-xl font-black text-black uppercase tracking-tighter">E-POSTA GÖNDER</h3>
                                <button onClick={() => setIsEmailModalOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400"><X size={20} /></button>
                            </div>

                            <form onSubmit={handleSendEmail} className="p-8 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest">Alıcı</label>
                                    <div className="flex items-center gap-2 w-full bg-slate-100 border border-slate-200 p-3 rounded-xl opacity-60">
                                        <Mail size={14} className="text-slate-400" />
                                        <span className="text-xs font-bold text-slate-600 truncate">{selectedLead?.email || selectedLead?.name || "E-posta yok"}</span>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest">Konu</label>
                                    <input required type="text" value={emailContent.subject} onChange={(e) => setEmailContent({ ...emailContent, subject: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-[#DC2626] text-xs font-bold text-black" placeholder="E-posta konusu..." />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-widest">Mesaj İçeriği</label>
                                    <textarea required rows={8} value={emailContent.content} onChange={(e) => setEmailContent({ ...emailContent, content: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-[#DC2626] text-xs font-bold text-black resize-none" placeholder="Müşteriye iletilecek mesaj..." />
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button 
                                        type="button"
                                        onClick={() => setEmailContent({
                                            subject: `${selectedLead?.program} Başvurunuz Hakkında İlk Bilgilendirme`,
                                            content: `Merhaba ${selectedLead?.name},\n\nMentor Career ile iletişime geçtiğiniz için teşekkür ederiz. ${selectedLead?.program} başvurunuzla ilgili detaylı bir bilgilendirme yapmak isteriz...\n\nSizinle bugün içinde bir görüşme planlayabilir miyiz?`
                                        })}
                                        className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all text-slate-600"
                                    >
                                        TASLAK YÜKLE
                                    </button>
                                    <button type="submit" disabled={loading} className="flex-[2] premium-btn py-3 flex items-center justify-center gap-2">
                                        {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={16} /> EMAİL GÖNDER</>}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Assign Modal */}
            <AnimatePresence>
                {isAssignModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsAssignModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-md bg-white shadow-2xl rounded-3xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-xl font-black text-black uppercase tracking-tighter">DANIŞMAN ATA</h3>
                                <button onClick={() => setIsAssignModalOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400"><X size={20} /></button>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                    <button 
                                        onClick={() => handleAssign(selectedLead.id, null)}
                                        className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-red-200 hover:bg-red-50 transition-all"
                                    >
                                        <div className="text-left">
                                            <p className="text-xs font-black text-red-600 uppercase tracking-widest">Atamayı Kaldır</p>
                                        </div>
                                        <Trash2 size={16} className="text-red-400" />
                                    </button>

                                    {assignees.map(assignee => (
                                        <button 
                                            key={assignee.id}
                                            onClick={() => handleAssign(selectedLead.id, assignee.id)}
                                            className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                                                selectedLead?.agencyId === assignee.id 
                                                    ? "border-[#DC2626] bg-red-50" 
                                                    : "border-slate-100 hover:border-[#DC2626]/30 hover:bg-slate-50"
                                            }`}
                                        >
                                            <div className="text-left">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{assignee.role === 'AGENCY_MANAGER' ? 'ACENTE' : 'DANIŞMAN'}</p>
                                                <p className="text-sm font-black text-slate-900">{assignee.name}</p>
                                            </div>
                                            {selectedLead?.agencyId === assignee.id && <CheckCircle2 size={18} className="text-[#DC2626]" />}
                                        </button>
                                    ))}
                                </div>

                                <div className="pt-4">
                                    <button 
                                        onClick={() => setIsAssignModalOpen(false)}
                                        className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all"
                                    >
                                        VAZGEÇ
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
