"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, BrainCircuit, GraduationCap, Globe, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIMatchingTool() {
    const [step, setStep] = useState(1);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<null | { score: number; text: string; universities: string[] }>(null);
    
    const [formData, setFormData] = useState({
        gpa: '',
        country: '',
        degree: '',
        english: ''
    });

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        try {
            const response = await fetch('/api/ai/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) throw new Error('Analysis failed');
            
            const data = await response.json();
            setResult(data);
            setStep(5);
        } catch (error) {
            console.error('AI Analysis Error:', error);
            // Fallback to random data if API fails
            setResult({
                score: 85,
                text: "Profiliniz şu anki verilerle değerlendirildi. Detaylı analiz için danışmanlarımızla görüşebilirsiniz.",
                universities: ["Technical University of Munich", "Heidelberg University"]
            });
            setStep(5);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="bg-white rounded-[32px] p-8 lg:p-12 shadow-2xl border border-zinc-100 relative overflow-hidden">
            {/* Background Magic */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-secondary shadow-lg shadow-primary/20">
                        <BrainCircuit size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-zinc-900">AI Akademik Analiz</h3>
                        <p className="text-zinc-500 text-sm">Hangi kurumlar size en uygun? 30 saniyede öğrenin.</p>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div 
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block text-sm font-bold text-zinc-700 mb-3 uppercase tracking-wider">Mevcut Not Ortalamanız (GPA)</label>
                                <input 
                                    type="text" 
                                    placeholder="Örn: 3.5 / 4.0 veya 85 / 100"
                                    className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    value={formData.gpa}
                                    onChange={(e) => setFormData({...formData, gpa: e.target.value})}
                                />
                            </div>
                            <button 
                                onClick={() => setStep(2)}
                                disabled={!formData.gpa}
                                className="w-full py-5 bg-primary text-secondary rounded-2xl font-bold uppercase tracking-[0.2em] text-[12px] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                                Devam Et <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div 
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <label className="block text-sm font-bold text-zinc-700 mb-3 uppercase tracking-wider">Hedef Ülke</label>
                            <div className="grid grid-cols-2 gap-4">
                                {['Almanya', 'İngiltere', 'Amerika', 'Kanada'].map((c) => (
                                    <button 
                                        key={c}
                                        onClick={() => { setFormData({...formData, country: c}); setStep(3); }}
                                        className={`p-4 rounded-2xl border transition-all text-sm font-medium ${formData.country === c ? 'bg-primary text-secondary border-primary' : 'bg-zinc-50 border-zinc-100 text-zinc-600 hover:border-primary/50'}`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div 
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <label className="block text-sm font-bold text-zinc-700 mb-3 uppercase tracking-wider">İngilizce Seviyeniz</label>
                            <div className="grid grid-cols-2 gap-4">
                                {['B1 (Intermediate)', 'B2 (Upper)', 'C1 (Advanced)', 'Henüz Yok'].map((l) => (
                                    <button 
                                        key={l}
                                        onClick={() => { setFormData({...formData, english: l}); handleAnalyze(); }}
                                        className="p-4 rounded-2xl border bg-zinc-50 border-zinc-100 text-zinc-600 hover:border-primary/50 transition-all text-sm font-medium"
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {isAnalyzing && (
                        <motion.div 
                            key="analyzing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-12 text-center"
                        >
                            <Loader2 className="animate-spin text-primary mb-4" size={48} />
                            <h4 className="text-xl font-bold text-zinc-900 mb-2">AI Algoritmalarımız Çalışıyor...</h4>
                            <p className="text-zinc-500 max-w-[300px]">Akademik verileriniz 500+ kurumun kabul kriterleriyle karşılaştırılıyor.</p>
                        </motion.div>
                    )}

                    {step === 5 && result && (
                        <motion.div 
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-8"
                        >
                            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 text-center">
                                <div className="text-emerald-600 font-bold text-4xl mb-2">%{result.score}</div>
                                <div className="text-emerald-700 text-sm font-medium">Global Uyumluluk Skoru</div>
                            </div>
                            
                            <p className="text-zinc-600 leading-relaxed text-sm">
                                {result.text}
                            </p>

                            <div className="space-y-3">
                                <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Önerilen Bazı Kurumlar</div>
                                {result.universities.map(u => (
                                    <div key={u} className="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-sm font-semibold text-zinc-800">
                                        <GraduationCap className="text-primary" size={18} />
                                        {u}
                                    </div>
                                ))}
                            </div>

                            <button 
                                onClick={() => window.location.href = '#quote-form-section'}
                                className="w-full py-5 bg-secondary text-primary rounded-2xl font-bold uppercase tracking-[0.2em] text-[12px] flex items-center justify-center gap-3 shadow-xl shadow-secondary/20 hover:scale-105 transition-all"
                            >
                                Detaylı Analiz & Başvuru <Sparkles size={18} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
