"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail, Send, RefreshCw, CheckCircle2, AlertCircle,
    FileText, Edit3, Save, X, ToggleLeft, ToggleRight,
    User, Phone, Briefcase, Eye, Pen, Trash2, Plus, Info, Search, History
} from "lucide-react";
import { sendCustomEmailAction } from "@/app/actions/email-actions";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to support Next.js SSR
const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,
    loading: () => (
        <div className="h-64 w-full bg-slate-50 border border-slate-200 rounded-2xl animate-pulse flex items-center justify-center text-slate-400 text-xs font-semibold">
            Editör yükleniyor...
        </div>
    ),
});


type Tab = "send" | "templates" | "signature" | "logs";
type Template = { id: string; type: string; name: string; subject: string; body: string; isActive: boolean; createdAt?: string };
type EmailLog = { id: string; to: string; subject: string; body: string; sentBy: string; status: string; error?: string | null; createdAt: string };
type Msg = { type: "success" | "error"; text: string } | null;

const TYPE_LABELS: Record<string, { label: string; color: string; icon: string }> = {
    WELCOME:       { label: "Hoş Geldin",      color: "bg-emerald-50 text-emerald-700 border-emerald-200/50",  icon: "🎉" },
    LOGIN_OTP:     { label: "Giriş OTP",       color: "bg-blue-50 text-blue-700 border-blue-200/50",        icon: "🔐" },
    CONTACT_REPLY: { label: "İletişim Cevabı", color: "bg-amber-50 text-amber-700 border-amber-200/50",      icon: "💬" },
};

const QUILL_MODULES = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "clean"],
    ],
};

const QUILL_FORMATS = [
    "header", "bold", "italic", "underline", "blockquote",
    "list", "bullet", "link"
];

export default function EmailCenter() {
    const [tab, setTab] = useState<Tab>("send");

    // ─── Signature State ─────────────────────────────────────
    const [sig, setSig] = useState({ name: "", title: "", phone: "" });
    const [sigHtml, setSigHtml] = useState("");
    const [sigMsg, setSigMsg] = useState<Msg>(null);
    const [sigLoading, setSigLoading] = useState(false);

    // ─── Templates State ─────────────────────────────────────
    const [templates, setTemplates] = useState<Template[]>([]);
    const [tplLoading, setTplLoading] = useState(false);
    const [editTpl, setEditTpl] = useState<Template | null>(null);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tplMsg, setTplMsg] = useState<Msg>(null);
    const [newTpl, setNewTpl] = useState({ name: "", subject: "", body: "", isActive: true });

    // ─── Logs State ──────────────────────────────────────────
    const [logs, setLogs] = useState<EmailLog[]>([]);
    const [logsLoading, setLogsLoading] = useState(false);
    const [selectedLog, setSelectedLog] = useState<EmailLog | null>(null);
    const [searchLogQuery, setSearchLogQuery] = useState("");

    // ─── Send Tab State ──────────────────────────────────────
    const [sending, setSending] = useState(false);
    const [sendMsg, setSendMsg] = useState<Msg>(null);
    const [selectedTplId, setSelectedTplId] = useState("");
    const [editorBody, setEditorBody] = useState("");
    const [emailSubject, setEmailSubject] = useState("");
    const [emailRecipient, setEmailRecipient] = useState("");
    const [variables, setVariables] = useState<Record<string, string>>({});
    const [extractedVars, setExtractedVars] = useState<string[]>([]);
    const formRef = useRef<HTMLFormElement>(null);

    // Fetch initial templates & signature
    async function fetchTemplates() {
        setTplLoading(true);
        const res = await fetch("/api/admin/email-templates");
        if (res.ok) setTemplates(await res.json());
        setTplLoading(false);
    }

    async function fetchSig() {
        const res = await fetch("/api/admin/email-signature");
        if (res.ok) {
            const d = await res.json();
            setSig({ name: d.name, title: d.title, phone: d.phone });
            setSigHtml(d.html);
        }
    }

    async function fetchLogs() {
        setLogsLoading(true);
        const res = await fetch("/api/admin/email-logs");
        if (res.ok) setLogs(await res.json());
        setLogsLoading(false);
    }

    useEffect(() => {
        fetchTemplates();
        fetchSig();
    }, []);

    useEffect(() => {
        if (tab === "logs") {
            fetchLogs();
        }
    }, [tab]);

    // ─── Send handler ────────────────────────────────────────
    async function handleSend(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSending(true);
        setSendMsg(null);

        // Compile HTML body by replacing variable tokens
        let finalHtml = editorBody;
        Object.entries(variables).forEach(([key, val]) => {
            finalHtml = finalHtml.replaceAll(`{{${key}}}`, val);
        });

        // Use custom action to deliver
        const fd = new FormData();
        fd.append("to", emailRecipient);
        fd.append("subject", emailSubject);
        fd.append("html", finalHtml);

        const res = await sendCustomEmailAction(fd);
        setSendMsg(res.success
            ? { type: "success", text: "E-posta başarıyla gönderildi!" }
            : { type: "error",   text: res.error || "Bir hata oluştu." }
        );

        if (res.success) {
            setEmailRecipient("");
            setEmailSubject("");
            setEditorBody("");
            setSelectedTplId("");
            setVariables({});
            setExtractedVars([]);
            fetchLogs();
        }
        setSending(false);
    }

    // ─── Extract Variables dynamically ───────────────────────
    useEffect(() => {
        const matches = editorBody.match(/\{\{([^}]+)\}\}/g);
        if (matches) {
            const uniqueVars = Array.from(new Set(matches.map(m => m.slice(2, -2).trim())));
            setExtractedVars(uniqueVars);
            // Pre-fill variable keys without overwriting existing entries
            setVariables(prev => {
                const next = { ...prev };
                uniqueVars.forEach(v => {
                    if (next[v] === undefined) next[v] = "";
                });
                return next;
            });
        } else {
            setExtractedVars([]);
        }
    }, [editorBody]);

    // Compile preview HTML inside iframe safely
    function compilePreviewHtml(body: string) {
        let filledBody = body;
        Object.entries(variables).forEach(([key, val]) => {
            filledBody = filledBody.replaceAll(`{{${key}}}`, val || `<span style="color:#B4943E;background:rgba(180,148,62,0.1);padding:2px 6px;border-radius:4px;font-size:12px;font-weight:bold;">[${key}]</span>`);
        });

        if (!filledBody || filledBody.trim() === "<p><br></p>" || filledBody.trim() === "") {
            filledBody = `<p style="color:#a0aec0;font-style:italic;text-align:center;margin-top:40px;">Mesaj içeriğinizi yazdıkça veya bir şablon seçtikçe canlı önizleme burada görünecektir...</p>`;
        }

        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; background: #f1f5f9; }
                    a { color: #B4943E; text-decoration: underline; font-weight: 600; }
                    .email-container {
                        background: linear-gradient(135deg, #0B1751 0%, #1a2a8a 100%);
                        padding: 30px 15px;
                        min-height: 100vh;
                        box-sizing: border-box;
                    }
                    .email-card {
                        max-width: 600px;
                        margin: 0 auto;
                        background: #ffffff;
                        border-radius: 16px;
                        overflow: hidden;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                    }
                    .email-header {
                        background: #0B1751;
                        padding: 24px;
                        text-align: center;
                        border-bottom: 3px solid #B4943E;
                    }
                    .email-header img {
                        height: 35px;
                        display: inline-block;
                        object-fit: contain;
                    }
                    .email-body {
                        padding: 35px 25px;
                        line-height: 1.6;
                        color: #333333;
                        font-size: 14px;
                    }
                    .email-signature {
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #eeeeee;
                    }
                    .email-footer {
                        background: #f8fafc;
                        padding: 20px;
                        text-align: center;
                        border-top: 1px solid #edf2f7;
                        font-size: 11px;
                        color: #718096;
                        line-height: 1.5;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="email-card">
                        <div class="email-header">
                            <img src="https://mentor-cc.com/images/MentorCareer.png" alt="Mentor Career">
                        </div>
                        <div class="email-body">
                            ${filledBody}
                            ${sigHtml ? `<div class="email-signature">${sigHtml}</div>` : ""}
                        </div>
                        <div class="email-footer">
                            <p style="margin:0 0 5px 0;font-weight:bold;color:#0B1751;">Mentor Career Consulting</p>
                            <p style="margin:0 0 10px 0;">Yurtdışı Eğitim ve Kariyer Danışmanlığı</p>
                            <p style="margin:0;font-size:10px;color:#a0aec0;">Bu e-posta Mentor Career sistemleri tarafından otomatik olarak gönderilmiştir.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;
    }

    // ─── Template CRUD operations ────────────────────────────
    async function saveTpl() {
        if (!editTpl) return;
        const res = await fetch(`/api/admin/email-templates/${editTpl.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editTpl),
        });
        if (res.ok) {
            setTplMsg({ type: "success", text: "Şablon başarıyla güncellendi!" });
            setEditTpl(null);
            fetchTemplates();
        } else {
            const data = await res.json();
            setTplMsg({ type: "error", text: data.error || "Şablon güncellenemedi." });
        }
    }

    async function createTpl() {
        if (!newTpl.name || !newTpl.subject || !newTpl.body) {
            setTplMsg({ type: "error", text: "Lütfen tüm zorunlu alanları doldurun." });
            return;
        }
        const res = await fetch("/api/admin/email-templates", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...newTpl,
                type: `CUSTOM_${Date.now()}`
            }),
        });
        if (res.ok) {
            setTplMsg({ type: "success", text: "Özel şablon başarıyla oluşturuldu!" });
            setCreateModalOpen(false);
            setNewTpl({ name: "", subject: "", body: "", isActive: true });
            fetchTemplates();
        } else {
            setTplMsg({ type: "error", text: "Şablon oluşturulamadı." });
        }
    }

    async function deleteTpl(id: string) {
        if (!confirm("Bu şablonu silmek istediğinize emin misiniz?")) return;
        const res = await fetch(`/api/admin/email-templates/${id}`, { method: "DELETE" });
        if (res.ok) {
            setTplMsg({ type: "success", text: "Şablon başarıyla silindi." });
            fetchTemplates();
        } else {
            const data = await res.json();
            setTplMsg({ type: "error", text: data.error || "Şablon silinemedi." });
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

    // ─── Signature management ────────────────────────────────
    async function saveSig() {
        setSigLoading(true);
        setSigMsg(null);
        const res = await fetch("/api/admin/email-signature", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sig),
        });
        if (res.ok) {
            const d = await res.json();
            setSigHtml(d.html);
            setSigMsg({ type: "success", text: "Kurumsal imzanız başarıyla güncellendi!" });
        } else {
            setSigMsg({ type: "error", text: "İmza kaydedilemedi." });
        }
        setSigLoading(true);
        // Quick reload preview
        setTimeout(() => {
            fetchSig();
            setSigLoading(false);
        }, 300);
    }

    // ─── Helpers ────────────────────────────────────────────
    const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
        { id: "send",      label: "E-posta Gönder",  icon: <Send size={15}/> },
        { id: "templates", label: "Şablonlar",        icon: <FileText size={15}/> },
        { id: "signature", label: "İmza Yönetimi",   icon: <Pen size={15}/> },
        { id: "logs",      label: "Gönderim Günlüğü",icon: <History size={15}/> },
    ];

    function Alert({ msg }: { msg: Msg }) {
        if (!msg) return null;
        const ok = msg.type === "success";
        return (
            <div className={`flex items-start gap-3 p-4 rounded-2xl border text-sm font-semibold mb-5 shadow-sm transition-all duration-300 ${ok ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-800 border-red-200"}`}>
                {ok ? <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5"/> : <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5"/>}
                <div className="flex-1">{msg.text}</div>
            </div>
        );
    }

    // Filtering sent logs
    const filteredLogs = logs.filter(log =>
        log.to.toLowerCase().includes(searchLogQuery.toLowerCase()) ||
        log.subject.toLowerCase().includes(searchLogQuery.toLowerCase()) ||
        log.sentBy.toLowerCase().includes(searchLogQuery.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
            {/* Header Banner */}
            <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(11,23,81,0.25),rgba(255,255,255,0))]" />
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-tr from-[#0B1751] to-[#1a2a8a] rounded-2xl flex items-center justify-center shadow-lg border border-[#0B1751]/30">
                        <Mail className="text-[#B4943E]" size={26}/>
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight">E-posta İletişim Portalı</h1>
                        <p className="text-xs text-slate-400 mt-1 font-medium max-w-lg">Otomatik şablon kontrolleri, dinamik imza bloğu, anlık değişken entegrasyonu ve kurumsal gönderim denetimi.</p>
                    </div>
                </div>
            </div>

            {/* Tab navigation */}
            <div className="flex flex-wrap gap-1 bg-slate-100/80 backdrop-blur-md p-1 rounded-2xl w-fit border border-slate-200/50">
                {TABS.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 ${tab === t.id ? "bg-white shadow-md text-[#0B1751] scale-[1.02]" : "text-slate-500 hover:text-slate-800"}`}>
                        {t.icon}{t.label}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {/* ── TAB 1: SEND (Overhauled Split-Screen UI) ───────────── */}
                {tab === "send" && (
                    <motion.div key="send" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        
                        {/* Form area (Left) */}
                        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 md:p-8 space-y-6">
                            <div>
                                <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                                    <Send size={18} className="text-[#0B1751]"/> E-posta Gönderimi
                                </h2>
                                <p className="text-xs text-slate-400 mt-1">İletileri zengin metin düzenleyicide hazırlayın ve anında önizleyin.</p>
                            </div>

                            <Alert msg={sendMsg}/>

                            <form onSubmit={handleSend} ref={formRef} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Alıcı E-posta adresi</label>
                                        <input type="email" required placeholder="ornek@ogrenci.com" value={emailRecipient} onChange={e => setEmailRecipient(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#0B1751] focus:ring-1 focus:ring-[#0B1751] transition-all"/>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Konu</label>
                                        <input type="text" required placeholder="E-posta konusu..." value={emailSubject} onChange={e => setEmailSubject(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#0B1751] focus:ring-1 focus:ring-[#0B1751] transition-all"/>
                                    </div>
                                </div>

                                {/* Template Selection */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Hazır Şablon Yükle</label>
                                    <select value={selectedTplId} onChange={e => {
                                        const tid = e.target.value;
                                        setSelectedTplId(tid);
                                        const t = templates.find(x => x.id === tid);
                                        if (t) {
                                            setEditorBody(t.body);
                                            setEmailSubject(t.subject);
                                        } else {
                                            setEditorBody("");
                                            setEmailSubject("");
                                        }
                                    }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#0B1751] transition-all">
                                        <option value="">— Boş Mesaj İle Başla —</option>
                                        {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                    </select>
                                </div>

                                {/* Dynamic Variables Form */}
                                <AnimatePresence>
                                    {extractedVars.length > 0 && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                                            className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 overflow-hidden">
                                            <div className="flex items-center gap-2 text-xs font-black text-slate-700 uppercase tracking-wider">
                                                <Info size={14} className="text-[#B4943E]"/> Şablon Değişkenleri
                                            </div>
                                            <p className="text-[11px] text-slate-400 font-medium">Lütfen e-postaya yerleştirilecek dinamik alanları doldurun:</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                                                {extractedVars.map(v => (
                                                    <div key={v} className="space-y-1">
                                                        <label className="text-[10px] font-black text-[#0B1751] uppercase tracking-wider">{v}</label>
                                                        <input type="text" required placeholder={`${v} değerini girin...`} value={variables[v] || ""}
                                                            onChange={e => setVariables(prev => ({ ...prev, [v]: e.target.value }))}
                                                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold outline-none focus:border-[#0B1751] transition-all"/>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Quill Rich Text Editor */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">E-posta İçeriği</label>
                                    <div className="quill-editor-wrapper bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 focus-within:border-[#0B1751] transition-all">
                                        <ReactQuill value={editorBody} onChange={setEditorBody} modules={QUILL_MODULES} formats={QUILL_FORMATS} placeholder="E-posta metninizi buraya yazın..." className="bg-white min-h-[220px]" />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-3">
                                    <button type="submit" disabled={sending}
                                        className="flex items-center gap-2 px-8 py-3.5 bg-[#0B1751] hover:bg-[#0B1751]/95 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] disabled:opacity-60 cursor-pointer">
                                        {sending ? <><RefreshCw size={15} className="animate-spin"/> Gönderiliyor...</> : <><Send size={15}/> İletiyi Gönder</>}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Live Frame Preview (Right) */}
                        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Eye size={14} className="text-[#B4943E]"/> Canlı Kurumsal Görünüm
                                </h3>
                                <span className="text-[10px] bg-slate-100 text-slate-400 border border-slate-200 px-2 py-0.5 rounded-full font-bold">MOCKUP PREVIEW</span>
                            </div>

                            <div className="bg-slate-800 rounded-3xl p-3 shadow-xl border border-slate-700/80 relative overflow-hidden aspect-[4/5] flex flex-col">
                                {/* Chrome-like browser header */}
                                <div className="flex items-center justify-between bg-slate-900 px-4 py-2.5 rounded-2xl mb-3 border border-slate-700/30">
                                    <div className="flex gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"/>
                                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"/>
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"/>
                                    </div>
                                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest font-mono select-none">mentor-carrier-mail-client</span>
                                    <span className="w-4"/>
                                </div>

                                <div className="bg-slate-900 px-3 py-2 rounded-xl mb-3 text-[10px] text-slate-400 border border-slate-700/30 flex flex-col gap-1 select-none">
                                    <div><strong>Alıcı:</strong> <span className="text-slate-300">{emailRecipient || "kullanici@ornek.com"}</span></div>
                                    <div><strong>Konu:</strong> <span className="text-slate-300 font-bold">{emailSubject || "Konu Başlığı..."}</span></div>
                                </div>

                                <iframe srcDoc={compilePreviewHtml(editorBody)} title="Branded Email Preview"
                                    className="flex-1 w-full bg-white rounded-2xl border-0 overflow-hidden shadow-inner"/>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ── TAB 2: TEMPLATES (CRUD Portal) ────────────────────── */}
                {tab === "templates" && (
                    <motion.div key="templates" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-5">
                        <Alert msg={tplMsg}/>

                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-black text-slate-900">E-posta Şablon Yönetimi</h2>
                                <p className="text-xs text-slate-400 mt-1">Sistem içi bildirim veya kampanya şablonlarını yönetin.</p>
                            </div>
                            <button onClick={() => setCreateModalOpen(true)}
                                className="flex items-center gap-2 px-5 py-3 bg-[#0B1751] hover:bg-[#0B1751]/95 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer">
                                <Plus size={15} className="text-[#B4943E]"/> Yeni Şablon Ekle
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {tplLoading ? (
                                <div className="col-span-2 flex justify-center py-20"><RefreshCw size={28} className="animate-spin text-slate-300"/></div>
                            ) : templates.map(t => {
                                const isSystem = ["WELCOME", "LOGIN_OTP", "CONTACT_REPLY"].includes(t.type);
                                const meta = TYPE_LABELS[t.type] || { label: "Özel Şablon", color: "bg-slate-100 text-slate-600 border-slate-200", icon: "📑" };
                                return (
                                    <div key={t.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                                        <div className="space-y-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">{meta.icon}</span>
                                                    <div>
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <h3 className="font-black text-slate-900 text-sm leading-none">{t.name}</h3>
                                                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border ${meta.color}`}>{meta.label}</span>
                                                        </div>
                                                        <p className="text-[11px] text-slate-400 mt-1">Tip: <span className="font-mono text-slate-500 font-bold">{t.type}</span></p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => toggleTpl(t)} title={t.isActive ? "Pasife Al" : "Aktife Al"}
                                                        className="p-2 rounded-xl hover:bg-slate-50 transition-all text-slate-400 shrink-0">
                                                        {t.isActive ? <ToggleRight size={24} className="text-emerald-500"/> : <ToggleLeft size={24}/>}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">E-posta Konusu</div>
                                                <p className="text-xs text-slate-700 font-semibold">{t.subject}</p>
                                            </div>
                                        </div>

                                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                                            <div className="flex flex-wrap gap-1.5">
                                                {t.type === "WELCOME"       && ["{{isim}}"].map(v => <VarBadge key={v} v={v}/>)}
                                                {t.type === "LOGIN_OTP"     && ["{{isim}}", "{{otp}}"].map(v => <VarBadge key={v} v={v}/>)}
                                                {t.type === "CONTACT_REPLY" && ["{{isim}}"].map(v => <VarBadge key={v} v={v}/>)}
                                                {!isSystem && <span className="text-[9px] text-slate-400 italic">Dinamik kod desteği</span>}
                                            </div>

                                            <div className="flex gap-2 shrink-0">
                                                {!isSystem && (
                                                    <button onClick={() => deleteTpl(t.id)} title="Şablonu Sil"
                                                        className="p-2 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-xl transition-all border border-transparent hover:border-red-100 shrink-0 cursor-pointer">
                                                        <Trash2 size={15}/>
                                                    </button>
                                                )}
                                                <button onClick={() => setEditTpl({ ...t })}
                                                    className="flex items-center gap-1 px-4 py-2 bg-[#0B1751] hover:bg-[#0B1751]/95 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer">
                                                    <Edit3 size={13} className="text-[#B4943E]"/> Düzenle
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Edit Template Modal */}
                        <AnimatePresence>
                            {editTpl && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        onClick={() => setEditTpl(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm"/>
                                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                                        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
                                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                                            <h3 className="font-black text-[#0B1751] text-md flex items-center gap-2">
                                                <Edit3 size={18} className="text-[#B4943E]"/> {editTpl.name} — Düzenle
                                            </h3>
                                            <button onClick={() => setEditTpl(null)} className="p-2 hover:bg-slate-200 rounded-xl transition-all">
                                                <X size={20}/>
                                            </button>
                                        </div>
                                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Şablon Adı</label>
                                                <input value={editTpl.name} onChange={e => setEditTpl({ ...editTpl, name: e.target.value })}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#0B1751]"/>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">E-posta Konu Başlığı</label>
                                                <input value={editTpl.subject} onChange={e => setEditTpl({ ...editTpl, subject: e.target.value })}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#0B1751]"/>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">E-posta İçeriği (HTML)</label>
                                                <div className="quill-editor-wrapper bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 focus-within:border-[#0B1751] transition-all">
                                                    <ReactQuill value={editTpl.body} onChange={body => setEditTpl({ ...editTpl, body })} modules={QUILL_MODULES} formats={QUILL_FORMATS} className="bg-white min-h-[300px]" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                                            <button onClick={() => setEditTpl(null)} className="px-6 py-3 text-xs font-black uppercase text-slate-500 hover:text-slate-700 transition-all cursor-pointer">İptal</button>
                                            <button onClick={saveTpl} className="flex items-center gap-2 px-8 py-3.5 bg-[#0B1751] text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-[#0B1751]/95 transition-all cursor-pointer">
                                                <Save size={16}/> Değişiklikleri Kaydet
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>

                        {/* Create Template Modal */}
                        <AnimatePresence>
                            {createModalOpen && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        onClick={() => setCreateModalOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm"/>
                                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                                        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
                                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                                            <h3 className="font-black text-[#0B1751] text-md flex items-center gap-2">
                                                <Plus size={18} className="text-[#B4943E]"/> Yeni Özel Şablon Ekle
                                            </h3>
                                            <button onClick={() => setCreateModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-xl transition-all">
                                                <X size={20}/>
                                            </button>
                                        </div>
                                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Şablon Adı</label>
                                                <input value={newTpl.name} onChange={e => setNewTpl({ ...newTpl, name: e.target.value })} placeholder="örn: Kayıt Hatırlatma, Özel Teklif vb."
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#0B1751]"/>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">E-posta Konu Başlığı</label>
                                                <input value={newTpl.subject} onChange={e => setNewTpl({ ...newTpl, subject: e.target.value })} placeholder="örn: Yurtdışı Eğitim Kampanyası Başladı!"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#0B1751]"/>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">E-posta İçeriği (HTML)</label>
                                                <div className="quill-editor-wrapper bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 focus-within:border-[#0B1751] transition-all">
                                                    <ReactQuill value={newTpl.body} onChange={body => setNewTpl({ ...newTpl, body })} modules={QUILL_MODULES} formats={QUILL_FORMATS} placeholder="Kurumsal e-posta metnini hazırlayın..." className="bg-white min-h-[300px]" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                                            <button onClick={() => setCreateModalOpen(false)} className="px-6 py-3 text-xs font-black uppercase text-slate-500 hover:text-slate-700 transition-all cursor-pointer">İptal</button>
                                            <button onClick={createTpl} className="flex items-center gap-2 px-8 py-3.5 bg-[#0B1751] text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-[#0B1751]/95 transition-all cursor-pointer">
                                                <Save size={16}/> Şablonu Oluştur
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* ── TAB 3: SIGNATURE (Interactive Form) ──────────────── */}
                {tab === "signature" && (
                    <motion.div key="signature" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                        className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-black text-slate-900">Kurumsal İmza Bloğu</h2>
                                <p className="text-xs text-slate-400 mt-1">Tüm kurumsal e-postalara otomatik yerleştirilecek olan imza parametreleri.</p>
                            </div>
                        </div>

                        <Alert msg={sigMsg}/>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
                            {/* Input Form Fields */}
                            <div className="lg:col-span-6 space-y-5">
                                <div className="grid grid-cols-1 gap-5">
                                    <SigField icon={<User size={15}/>} label="Ad Soyad" value={sig.name}
                                        onChange={v => setSig({ ...sig, name: v })} placeholder="örn: Sinan İhsan"/>
                                    <SigField icon={<Briefcase size={15}/>} label="Kurumsal Unvan" value={sig.title}
                                        onChange={v => setSig({ ...sig, title: v })} placeholder="örn: Yurtdışı Eğitim Kıdemli Danışmanı"/>
                                    <SigField icon={<Phone size={15}/>} label="Telefon Numarası" value={sig.phone}
                                        onChange={v => setSig({ ...sig, phone: v })} placeholder="örn: +90 (532) 000 00 00"/>
                                </div>

                                <div className="flex justify-end pt-3">
                                    <button onClick={saveSig} disabled={sigLoading}
                                        className="flex items-center gap-2 px-8 py-3.5 bg-[#0B1751] hover:bg-[#0B1751]/95 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg disabled:opacity-60 cursor-pointer">
                                        {sigLoading ? <><RefreshCw size={15} className="animate-spin"/> Kaydediliyor...</> : <><Save size={15}/> İmzayı Kaydet</>}
                                    </button>
                                </div>
                            </div>

                            {/* Preview Frame */}
                            <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_top_right,rgba(11,23,81,0.03),rgba(255,255,255,0))]" />
                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">İmza Canlı Önizleme</p>
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"/>
                                    </div>
                                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm min-h-[140px] flex items-center justify-center">
                                        {sigHtml ? (
                                            <div dangerouslySetInnerHTML={{ __html: sigHtml }} className="w-full text-sm leading-relaxed"/>
                                        ) : (
                                            <p className="text-xs text-slate-400 italic">Lütfen bilgileri doldurun...</p>
                                        )}
                                    </div>
                                </div>
                                <div className="text-[10px] text-slate-400 font-medium mt-4 bg-slate-100 border border-slate-200/50 p-3 rounded-xl">
                                    💡 <strong>Not:</strong> Güncellenen imza bloğu, otomatik giden tüm sistem (OTP, Hoş geldin vb.) ve manuel gönderilen e-postaların altına otomatik olarak yerleştirilir.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ── TAB 4: DELIVERED AUDIT LOGS ───────────────────────── */}
                {tab === "logs" && (
                    <motion.div key="logs" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-black text-slate-900">E-posta Gönderim Günlüğü</h2>
                                <p className="text-xs text-slate-400 mt-1">Gönderilen tüm e-postaların teslim durumlarını ve içeriklerini inceleyin.</p>
                            </div>

                            {/* Search logs */}
                            <div className="relative w-full md:w-80">
                                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="text" placeholder="Alıcı, konu veya gönderen ara..." value={searchLogQuery} onChange={e => setSearchLogQuery(e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold outline-none focus:border-[#0B1751] transition-all"/>
                            </div>
                        </div>

                        {/* Logs Table Card */}
                        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-left">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <th className="py-4 px-6">Tarih</th>
                                            <th className="py-4 px-6">Alıcı</th>
                                            <th className="py-4 px-6">Konu Başlığı</th>
                                            <th className="py-4 px-6">Gönderen Yetkili</th>
                                            <th className="py-4 px-6 text-center">Durum</th>
                                            <th className="py-4 px-6 text-right">İşlem</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                                        {logsLoading ? (
                                            <tr>
                                                <td colSpan={6} className="py-20 text-center">
                                                    <RefreshCw size={24} className="animate-spin text-slate-300 mx-auto" />
                                                    <span className="text-slate-400 text-xs block mt-2">Günlükler yükleniyor...</span>
                                                </td>
                                            </tr>
                                        ) : filteredLogs.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="py-20 text-center text-slate-400 italic">
                                                    Aranan kriterlere uygun gönderim günlüğü bulunamadı.
                                                </td>
                                            </tr>
                                        ) : filteredLogs.map(log => (
                                            <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="py-4 px-6 text-slate-400 font-medium">
                                                    {new Date(log.createdAt).toLocaleString("tr-TR")}
                                                </td>
                                                <td className="py-4 px-6 font-bold text-slate-900">{log.to}</td>
                                                <td className="py-4 px-6 max-w-xs truncate">{log.subject}</td>
                                                <td className="py-4 px-6 text-slate-500">{log.sentBy}</td>
                                                <td className="py-4 px-6 text-center">
                                                    {log.status === "SUCCESS" ? (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                                                            ✓ Başarılı
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-50 text-red-700 border border-red-200/50" title={log.error || ""}>
                                                            ✗ Hatalı
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <button onClick={() => setSelectedLog(log)}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 text-[#0B1751] hover:bg-slate-100 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ml-auto cursor-pointer">
                                                        <Eye size={12}/> Detay
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Log Detail Slide-over / Modal */}
                        <AnimatePresence>
                            {selectedLog && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        onClick={() => setSelectedLog(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm"/>
                                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                                        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
                                        
                                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-200/60 flex items-center justify-center">
                                                    <Mail className="text-[#0B1751]" size={18}/>
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-slate-900 text-sm">E-posta Teslim Ayrıntısı</h3>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5 font-mono">{selectedLog.id}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => setSelectedLog(null)} className="p-2 hover:bg-slate-200 rounded-xl transition-all">
                                                <X size={20}/>
                                            </button>
                                        </div>

                                        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                                            {/* Meta detail grid (Left 5 cols) */}
                                            <div className="lg:col-span-5 space-y-4 border-r border-slate-100 pr-0 lg:pr-6">
                                                <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 space-y-3">
                                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gönderim Parametreleri</h4>
                                                    
                                                    <div className="space-y-1">
                                                        <span className="text-[10px] text-slate-400 font-bold block">ALICI E-POSTA</span>
                                                        <span className="text-xs font-bold text-slate-900 break-all">{selectedLog.to}</span>
                                                    </div>

                                                    <div className="space-y-1">
                                                        <span className="text-[10px] text-slate-400 font-bold block">GÖNDEREN YETKİLİ</span>
                                                        <span className="text-xs font-semibold text-slate-800">{selectedLog.sentBy}</span>
                                                    </div>

                                                    <div className="space-y-1">
                                                        <span className="text-[10px] text-slate-400 font-bold block">GÖNDERİM TARİHİ</span>
                                                        <span className="text-xs font-semibold text-slate-800">
                                                            {new Date(selectedLog.createdAt).toLocaleString("tr-TR")}
                                                        </span>
                                                    </div>

                                                    <div className="space-y-1">
                                                        <span className="text-[10px] text-slate-400 font-bold block">TESLİMAT DURUMU</span>
                                                        {selectedLog.status === "SUCCESS" ? (
                                                            <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                                Başarılı
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-red-50 text-red-700 border border-red-200">
                                                                Hatalı
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {selectedLog.error && (
                                                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 space-y-1.5">
                                                        <div className="flex items-center gap-1.5 text-[10px] font-black text-red-800 uppercase tracking-wider">
                                                            <AlertCircle size={14}/> Sistem Hata Raporu
                                                        </div>
                                                        <p className="text-xs text-red-700 font-semibold break-words leading-relaxed font-mono">{selectedLog.error}</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* HTML body preview iframe (Right 7 cols) */}
                                            <div className="lg:col-span-7 flex flex-col space-y-2">
                                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gönderilen Tam İçerik Preview</h4>
                                                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 flex-1 min-h-[360px] flex flex-col">
                                                    <iframe srcDoc={selectedLog.body} title="Sent Email HTML" className="flex-1 w-full bg-white border-0 overflow-y-auto" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 border-t border-slate-100 flex justify-end bg-slate-50">
                                            <button onClick={() => setSelectedLog(null)} className="px-6 py-2.5 bg-[#0B1751] hover:bg-[#0B1751]/95 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer">
                                                Kapat
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function VarBadge({ v }: { v: string }) {
    return <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-[#0B1751]/5 text-[#0B1751] rounded-lg border border-[#0B1751]/10 shrink-0">{v}</span>;
}

function SigField({ icon, label, value, onChange, placeholder }: { icon: React.ReactNode; label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
    return (
        <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                {icon} {label}
            </label>
            <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-[#0B1751] transition-all"/>
        </div>
    );
}
