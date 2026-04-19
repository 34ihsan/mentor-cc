
"use client";

import { useState } from "react";
import { 
    Search, 
    Zap, 
    AlertCircle, 
    CheckCircle2, 
    ExternalLink, 
    Loader2, 
    TrendingUp,
    Link as LinkIcon
} from "lucide-react";
import { checkSEOAction, suggestLinksAction } from "@/app/actions/seo-actions";

interface SEOPanelProps {
    title: string;
    content: string;
}

export default function BlogSEOPanel({ title, content }: SEOPanelProps) {
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [seoResult, setSeoResult] = useState<any>(null);
    const [linkSuggestions, setLinkSuggestions] = useState<any[]>([]);

    const runAnalysis = async () => {
        if (!content) return;
        setLoading(true);
        try {
            const [seo, links] = await Promise.all([
                checkSEOAction(title, content, keyword),
                suggestLinksAction(content)
            ]);
            setSeoResult(seo);
            setLinkSuggestions(links as any[]);
        } catch (error) {
            console.error("Analysis failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 w-80 shrink-0 overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                <h3 className="text-xs font-black text-black dark:text-white uppercase tracking-widest flex items-center gap-2">
                    <Zap size={14} className="text-amber-500" />
                    SEO Denetçisi
                </h3>
            </div>

            <div className="p-6 space-y-6 text-slate-900 dark:text-white">
                {/* Keyword Input */}
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-tight opacity-60">Hedef Anahtar Kelime</label>
                    <div className="relative">
                        <input 
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-xs font-bold outline-none focus:border-[var(--primary)]"
                            placeholder="Örn: Almanya Dil Okulu"
                        />
                    </div>
                </div>

                <button 
                    onClick={runAnalysis}
                    disabled={loading || !content}
                    className="w-full premium-btn py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">ANALİZ ET</span>
                </button>

                {seoResult && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {/* Score Circle */}
                        <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                            <div className="relative w-20 h-20 flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90">
                                    <circle
                                        cx="40"
                                        cy="40"
                                        r="36"
                                        fill="transparent"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        className="text-slate-100 dark:text-slate-700"
                                    />
                                    <circle
                                        cx="40"
                                        cy="40"
                                        r="36"
                                        fill="transparent"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        strokeDasharray={226}
                                        strokeDashoffset={226 - (226 * seoResult.score) / 100}
                                        className={`${seoResult.score > 70 ? 'text-emerald-500' : seoResult.score > 40 ? 'text-amber-500' : 'text-rose-500'} transition-all duration-1000`}
                                    />
                                </svg>
                                <span className="absolute text-xl font-black">{seoResult.score}</span>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest mt-4 opacity-70">SEO SKORU</p>
                        </div>

                        {/* Suggestions */}
                        <div className="space-y-3">
                            <h4 className="text-[10px] font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                                <TrendingUp size={12} />
                                Öneriler
                            </h4>
                            {seoResult.suggestions?.map((s: any, i: number) => (
                                <div key={i} className={`p-4 rounded-2xl border text-xs font-bold leading-snug flex items-start gap-3 ${
                                    s.type === 'critical' ? 'bg-rose-50 border-rose-100 text-rose-700 dark:bg-rose-900/10 dark:border-rose-900/20 dark:text-rose-400' :
                                    s.type === 'warning' ? 'bg-amber-50 border-amber-100 text-amber-700 dark:bg-amber-900/10 dark:border-amber-900/20 dark:text-amber-400' :
                                    'bg-blue-50 border-blue-100 text-blue-700 dark:bg-blue-900/10 dark:border-blue-900/20 dark:text-blue-400'
                                }`}>
                                    {s.type === 'critical' ? <AlertCircle size={16} className="shrink-0" /> : <CheckCircle2 size={16} className="shrink-0" />}
                                    {s.msg}
                                </div>
                            ))}
                        </div>

                        {/* Link Suggestions */}
                        <div className="space-y-3">
                            <h4 className="text-[10px] font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                                <LinkIcon size={12} />
                                Akıllı Linkler
                            </h4>
                            {linkSuggestions.length === 0 ? (
                                <p className="text-[10px] italic opacity-50 text-slate-900 dark:text-white">İçerikte henüz eşleşen bağlantı bulunamadı.</p>
                            ) : linkSuggestions.map((l: any, i: number) => (
                                <div key={i} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm space-y-2 group">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-[var(--primary)] uppercase">{l.type.toUpperCase()}</span>
                                        <ExternalLink size={12} className="opacity-40" />
                                    </div>
                                    <p className="text-[11px] font-bold text-slate-900 dark:text-white">{l.name}</p>
                                    <p className="text-[9px] text-slate-400 italic line-clamp-1">"...{l.context}..."</p>
                                    <div className="pt-2">
                                        <code className="text-[9px] bg-slate-50 dark:bg-slate-900 p-1 rounded block text-navy dark:text-white select-all cursor-copy">
                                            {l.url}
                                        </code>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!seoResult && !loading && (
                    <div className="p-10 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl opacity-30">
                        <TrendingUp size={48} className="mx-auto mb-4 text-black dark:text-white" />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-white">Analiz Bekleniyor</p>
                    </div>
                )}
            </div>
        </div>
    );
}
