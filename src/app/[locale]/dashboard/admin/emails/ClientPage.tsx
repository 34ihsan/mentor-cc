"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail, Send, RefreshCw, CheckCircle2, AlertCircle,
    FileText, Edit3, Save, X, ToggleLeft, ToggleRight,
    User, Phone, Briefcase, Eye, Pen
} from "lucide-react";
import { sendCustomEmailAction } from "@/app/actions/email-actions";

type Tab = "send" | "templates" | "signature";
type Template = { id: string; type: string; name: string; subject: string; body: string; isActive: boolean };
type Msg = { type: "success" | "error"; text: string } | null;

const TYPE_LABELS: Record<string, { label: string; color: string; icon: string }> = {
    WELCOME:       { label: "Hoş Geldin",      color: "bg-emerald-100 text-emerald-700",  icon: "🎉" },
    LOGIN_OTP:     { label: "Giriş OTP",       color: "bg-blue-100 text-blue-700",        icon: "🔐" },
    CONTACT_REPLY: { label: "İletişim Cevabı", color: "bg-amber-100 text-amber-700",      icon: "💬" },
};

export default function EmailCenter() {
    const [tab, setTab] = useState<Tab>("send");

    // ─── Send tab ───────────────────────────────────────────
    const [sending, setSending] = useState(false);
    const [sendMsg, setSendMsg] = useState<Msg>(null);

    async function handleSend(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSending(true); setSendMsg(null);
        const fd = new FormData(e.currentTarget);
        const res = await sendCustomEmailAction(fd);
        setSendMsg(res.success
            ? { type: "success", text: "E-posta başarıyla gönderildi!" }
            : { type: "error",   text: res.error || "Bir hata oluştu." }
        );
        if (res.success) (e.target as HTMLFormElement).reset();
        setSending(false);
    }

    // ─── Templates tab ──────────────────────────────────────
    const [templates, setTemplates] = useState<Template[]>([]);
    const [tplLoading, setTplLoading] = useState(false);
    const [editTpl, setEditTpl] = useState<Template | null>(null);
    const [tplMsg, setTplMsg] = useState<Msg>(null);

    async function fetchTemplates() {
        setTplLoading(true);
        const res = await fetch("/api/admin/email-templates");
        if (res.ok) setTemplates(await res.json());
        setTplLoading(false);
    }

    async function saveTpl() {
        if (!editTpl) return;
        const res = await fetch(`/api/admin/email-templates/${editTpl.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editTpl),
        });
        if (res.ok) {
            setTplMsg({ type: "success", text: "Şablon kaydedildi." });
            setEditTpl(null);
            fetchTemplates();
        } else {
            setTplMsg({ type: "error", text: "Kayıt başarısız." });
        }
    }

    async function toggleTpl(t: Template) {
        await fetch(`/api/admin/email-templates/${t.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...t, isActive: !t.isActive }),
        });
        fetchTemplates();
    }

    // ─── Signature tab ──────────────────────────────────────
    const [sig, setSig] = useState({ name: "", title: "", phone: "" });
    const [sigHtml, setSigHtml] = useState("");
    const [sigLoading, setSigLoading] = useState(false);
    const [sigMsg, setSigMsg] = useState<Msg>(null);
    const [sigPreview, setSigPreview] = useState(false);

    async function fetchSig() {
        const res = await fetch("/api/admin/email-signature");
        if (res.ok) {
            const d = await res.json();
            setSig({ name: d.name, title: d.title, phone: d.phone });
            setSigHtml(d.html);
        }
    }

    async function saveSig() {
        setSigLoading(true);
        const res = await fetch("/api/admin/email-signature", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sig),
        });
        if (res.ok) {
            const d = await res.json();
            setSigHtml(d.html);
            setSigMsg({ type: "success", text: "İmza güncellendi!" });
        } else {
            setSigMsg({ type: "error", text: "Kayıt başarısız." });
        }
        setSigLoading(false);
    }

    useEffect(() => { fetchTemplates(); fetchSig(); }, []);

    // ─── Helpers ────────────────────────────────────────────
    const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
        { id: "send",      label: "E-posta Gönder",  icon: <Send size={16}/> },
        { id: "templates", label: "Şablonlar",        icon: <FileText size={16}/> },
        { id: "signature", label: "İmza Yönetimi",   icon: <Pen size={16}/> },
    ];

    function Alert({ msg }: { msg: Msg }) {
        if (!msg) return null;
        const ok = msg.type === "success";
        return (
            <div className={`flex items-start gap-3 p-4 rounded-xl border text-sm font-medium mb-4 ${ok ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                {ok ? <CheckCircle2 size={18}/> : <AlertCircle size={18}/>}
                {msg.text}
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#0B1751]/10 rounded-2xl flex items-center justify-center">
                    <Mail className="text-[#0B1751]" size={24}/>
                </div>
                <div>
                    <h1 className="text-2xl font-black text-[#0B1751]">E-posta Merkezi</h1>
                    <p className="text-sm text-slate-500">Şablon yönetimi, otomatik yanıtlar ve kurumsal imza.</p>
                </div>
            </div>

            {/* Tab bar */}
            <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl w-fit">
                {TABS.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wide transition-all ${tab === t.id ? "bg-white shadow text-[#0B1751]" : "text-slate-400 hover:text-slate-600"}`}>
                        {t.icon}{t.label}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {/* ── TAB 1: SEND ──────────────────────────────────────── */}
                {tab === "send" && (
                    <motion.div key="send" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                        className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
                        <div>
                            <h2 className="text-lg font-black text-black">Manuel E-posta Gönder</h2>
                            <p className="text-xs text-slate-400 mt-1">info@mentor-cc.com üzerinden özel e-posta gönderin.</p>
                        </div>
                        <Alert msg={sendMsg}/>
                        <form onSubmit={handleSend} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alıcı E-posta</label>
                                    <input type="email" name="to" required placeholder="kullanici@ornek.com"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#0B1751] transition-all"/>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Konu</label>
                                    <input type="text" name="subject" required placeholder="E-posta konusu..."
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#0B1751] transition-all"/>
                                </div>
                            </div>

                            {/* Quick template picker */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Şablondan Başla (İsteğe Bağlı)</label>
                                <select onChange={e => {
                                    const t = templates.find(x => x.id === e.target.value);
                                    if (!t) return;
                                    (document.getElementById("htmlBody") as HTMLTextAreaElement).value = t.body;
                                    (document.querySelector('input[name="subject"]') as HTMLInputElement).value = t.subject;
                                }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#0B1751] transition-all">
                                    <option value="">— Boş başla —</option>
                                    {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mesaj İçeriği (HTML destekli)</label>
                                <textarea id="htmlBody" name="html" required rows={10} placeholder="Mesajınızı buraya yazın..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#0B1751] transition-all resize-y font-mono"/>
                                <p className="text-[10px] text-slate-400">Mesajınız kurumsal şablon ve imzayla birlikte gönderilecektir.</p>
                            </div>

                            <div className="flex justify-end pt-2">
                                <button type="submit" disabled={sending}
                                    className="flex items-center gap-2 px-8 py-3.5 bg-[#0B1751] hover:bg-[#0B1751]/90 text-white rounded-xl font-black text-sm uppercase tracking-wide transition-all shadow-lg disabled:opacity-60">
                                    {sending ? <><RefreshCw size={16} className="animate-spin"/> Gönderiliyor...</> : <><Send size={16}/> E-posta Gönder</>}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* ── TAB 2: TEMPLATES ─────────────────────────────────── */}
                {tab === "templates" && (
                    <motion.div key="templates" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-4">
                        <Alert msg={tplMsg}/>
                        <div className="grid grid-cols-1 gap-4">
                            {tplLoading ? (
                                <div className="flex justify-center py-20"><RefreshCw size={32} className="animate-spin text-slate-300"/></div>
                            ) : templates.map(t => {
                                const meta = TYPE_LABELS[t.type] || { label: t.type, color: "bg-slate-100 text-slate-600", icon: "📧" };
                                return (
                                    <div key={t.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <span className="text-2xl">{meta.icon}</span>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h3 className="font-black text-black text-sm">{t.name}</h3>
                                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide ${meta.color}`}>{meta.label}</span>
                                                        {!t.isActive && <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 uppercase">Pasif</span>}
                                                    </div>
                                                    <p className="text-xs text-slate-400 mt-0.5 font-medium truncate">Konu: {t.subject}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <button onClick={() => toggleTpl(t)} title={t.isActive ? "Pasife Al" : "Aktife Al"}
                                                    className="p-2 rounded-xl hover:bg-slate-50 transition-all text-slate-400">
                                                    {t.isActive ? <ToggleRight size={22} className="text-emerald-500"/> : <ToggleLeft size={22}/>}
                                                </button>
                                                <button onClick={() => setEditTpl({ ...t })}
                                                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0B1751] text-white rounded-xl text-xs font-black hover:bg-[#0B1751]/90 transition-all">
                                                    <Edit3 size={14}/> Düzenle
                                                </button>
                                            </div>
                                        </div>

                                        {/* Variables hint */}
                                        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                                            {t.type === "WELCOME"       && ["{{isim}}"].map(v => <VarBadge key={v} v={v}/>)}
                                            {t.type === "LOGIN_OTP"     && ["{{isim}}", "{{otp}}"].map(v => <VarBadge key={v} v={v}/>)}
                                            {t.type === "CONTACT_REPLY" && ["{{isim}}"].map(v => <VarBadge key={v} v={v}/>)}
                                            <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wide self-center">dinamik değişkenler</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Edit Modal */}
                        <AnimatePresence>
                            {editTpl && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        onClick={() => setEditTpl(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm"/>
                                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                                        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
                                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                            <h3 className="font-black text-[#0B1751] text-lg flex items-center gap-2">
                                                <Edit3 size={18}/> {editTpl.name} — Düzenle
                                            </h3>
                                            <button onClick={() => setEditTpl(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                                                <X size={20}/>
                                            </button>
                                        </div>
                                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Konu</label>
                                                <input value={editTpl.subject} onChange={e => setEditTpl({ ...editTpl, subject: e.target.value })}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#0B1751]"/>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">İçerik (HTML)</label>
                                                <textarea value={editTpl.body} onChange={e => setEditTpl({ ...editTpl, body: e.target.value })}
                                                    rows={16} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono outline-none focus:border-[#0B1751] resize-y"/>
                                            </div>
                                        </div>
                                        <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
                                            <button onClick={() => setEditTpl(null)} className="px-6 py-3 text-sm font-black text-slate-400 hover:text-slate-600 transition-all">İptal</button>
                                            <button onClick={saveTpl} className="flex items-center gap-2 px-8 py-3 bg-[#0B1751] text-white rounded-xl text-sm font-black hover:bg-[#0B1751]/90 transition-all">
                                                <Save size={16}/> Kaydet
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* ── TAB 3: SIGNATURE ─────────────────────────────────── */}
                {tab === "signature" && (
                    <motion.div key="signature" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                        className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-black text-black">Kurumsal İmza</h2>
                                <p className="text-xs text-slate-400 mt-1">Tüm e-postalarda otomatik eklenen imza bloğu.</p>
                            </div>
                            <button onClick={() => setSigPreview(!sigPreview)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide transition-all border ${sigPreview ? "bg-[#0B1751] text-white border-[#0B1751]" : "bg-white text-slate-500 border-slate-200"}`}>
                                <Eye size={14}/> {sigPreview ? "Formu Göster" : "Önizleme"}
                            </button>
                        </div>
                        <Alert msg={sigMsg}/>

                        {sigPreview ? (
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Canlı Önizleme</p>
                                <div dangerouslySetInnerHTML={{ __html: sigHtml }} className="email-preview"/>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <SigField icon={<User size={16}/>} label="Ad Soyad" value={sig.name}
                                    onChange={v => setSig({ ...sig, name: v })} placeholder="Mentor Career Ekibi"/>
                                <SigField icon={<Briefcase size={16}/>} label="Unvan" value={sig.title}
                                    onChange={v => setSig({ ...sig, title: v })} placeholder="Danışmanlık Uzmanı"/>
                                <SigField icon={<Phone size={16}/>} label="Telefon" value={sig.phone}
                                    onChange={v => setSig({ ...sig, phone: v })} placeholder="+90 (212) 000 00 00"/>
                            </div>
                        )}

                        <div className="flex justify-end pt-2">
                            <button onClick={saveSig} disabled={sigLoading}
                                className="flex items-center gap-2 px-8 py-3.5 bg-[#0B1751] hover:bg-[#0B1751]/90 text-white rounded-xl font-black text-sm uppercase tracking-wide transition-all shadow-lg disabled:opacity-60">
                                {sigLoading ? <><RefreshCw size={16} className="animate-spin"/> Kaydediliyor...</> : <><Save size={16}/> İmzayı Kaydet</>}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function VarBadge({ v }: { v: string }) {
    return <span className="text-[10px] font-mono font-bold px-2 py-1 bg-[#0B1751]/5 text-[#0B1751] rounded-lg border border-[#0B1751]/10">{v}</span>;
}

function SigField({ icon, label, value, onChange, placeholder }: { icon: React.ReactNode; label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
    return (
        <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {icon} {label}
            </label>
            <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#0B1751] transition-all"/>
        </div>
    );
}
