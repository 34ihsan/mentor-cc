'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function CookieConsent() {
    const t = useTranslations('CookieBanner');
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState({
        necessary: true,
        analytics: true,
        marketing: false
    });

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Delay visibility for premium feel
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        const fullAccess = { necessary: true, analytics: true, marketing: true };
        localStorage.setItem('cookie-consent', JSON.stringify(fullAccess));
        setIsVisible(false);
    };

    const handleDeclineAll = () => {
        const minAccess = { necessary: true, analytics: false, marketing: false };
        localStorage.setItem('cookie-consent', JSON.stringify(minAccess));
        setIsVisible(false);
    };

    const handleSavePreferences = () => {
        localStorage.setItem('cookie-consent', JSON.stringify(preferences));
        setIsVisible(false);
        setShowSettings(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop for Settings */}
                    {showSettings && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-navy/40 backdrop-blur-md z-[9998]"
                            onClick={() => setShowSettings(false)}
                        />
                    )}

                    {/* Main Banner */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", damping: 30, stiffness: 200 }}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl bg-white border border-gold/15 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] z-[9999] p-6 md:p-8 flex flex-col md:grid md:grid-cols-[1fr_auto] gap-8 items-center overflow-hidden rounded-2xl"
                    >
                        {/* Decorative Background Icon */}
                        <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
                            <Cookie size={180} />
                        </div>

                        <div className="relative z-10 flex items-center gap-6">
                            <div className="w-12 h-12 bg-navy text-gold flex items-center justify-center shrink-0 rounded-xl shadow-xl">
                                <Cookie size={24} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-lg font-bold text-navy">{t('title')}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
                                    {t('description')} <Link href="/tr/gizlilik" className="text-gold border-b border-gold/20 hover:border-gold transition-all">{t('details')}</Link>
                                </p>
                            </div>
                        </div>

                        <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <button
                                onClick={() => setShowSettings(true)}
                                className="px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 border border-slate-100 hover:border-gold hover:text-gold transition-all flex items-center justify-center gap-2 bg-white rounded-lg"
                            >
                                <Settings size={14} /> AYARLAR
                            </button>
                            <button
                                onClick={handleAcceptAll}
                                className="bg-navy text-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold rounded-lg hover:bg-gold transition-all shadow-lg"
                            >
                                {t('accept')}
                            </button>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="hidden md:flex ml-2 w-10 h-10 bg-slate-50 text-slate-300 items-center justify-center hover:bg-red-50 hover:text-red-400 transition-all rounded-full"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Settings Modal (Embedded) */}
                        <AnimatePresence>
                            {showSettings && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="col-span-2 border-t border-gold/10 mt-6 pt-6 overflow-hidden w-full"
                                >
                                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                                        {/* Necessary */}
                                        <div className="p-5 bg-slate-50 border border-gold/5 rounded-xl relative overflow-hidden">
                                            <div className="flex items-center justify-between mb-3">
                                                <ShieldCheck className="text-gold" size={18} />
                                                <div className="w-8 h-5 bg-navy/20 rounded-full p-1 cursor-not-allowed">
                                                    <div className="w-3 h-3 bg-white rounded-full translate-x-3" />
                                                </div>
                                            </div>
                                            <h5 className="text-[11px] font-bold uppercase tracking-widest text-navy mb-1">Zorunlu</h5>
                                            <p className="text-[10px] text-slate-400 italic">Sitemiz için elzem fonksiyonlar.</p>
                                        </div>

                                        {/* Analytics */}
                                        <div
                                            onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                                            className={`p-5 border rounded-xl transition-all cursor-pointer ${preferences.analytics ? 'bg-navy/5 border-gold/20' : 'bg-white border-slate-100'}`}
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <Settings size={18} className={preferences.analytics ? 'text-gold' : 'text-slate-300'} />
                                                <div className={`w-8 h-5 rounded-full p-1 transition-colors ${preferences.analytics ? 'bg-gold' : 'bg-slate-200'}`}>
                                                    <motion.div
                                                        animate={{ x: preferences.analytics ? 12 : 0 }}
                                                        className="w-3 h-3 bg-white rounded-full shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                            <h5 className="text-[11px] font-bold uppercase tracking-widest text-navy mb-1">Analitik</h5>
                                            <p className="text-[10px] text-slate-400 italic">Kullanım verilerini toplar.</p>
                                        </div>

                                        {/* Marketing */}
                                        <div
                                            onClick={() => setPreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
                                            className={`p-5 border rounded-xl transition-all cursor-pointer ${preferences.marketing ? 'bg-navy/5 border-gold/20' : 'bg-white border-slate-100'}`}
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <Cookie size={18} className={preferences.marketing ? 'text-gold' : 'text-slate-300'} />
                                                <div className={`w-8 h-5 rounded-full p-1 transition-colors ${preferences.marketing ? 'bg-gold' : 'bg-slate-200'}`}>
                                                    <motion.div
                                                        animate={{ x: preferences.marketing ? 12 : 0 }}
                                                        className="w-3 h-3 bg-white rounded-full shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                            <h5 className="text-[11px] font-bold uppercase tracking-widest text-navy mb-1">Pazarlama</h5>
                                            <p className="text-[10px] text-slate-400 italic">Size özel teklifler.</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <button
                                            onClick={handleDeclineAll}
                                            className="text-[10px] font-bold text-slate-300 hover:text-red-400 transition-colors uppercase tracking-widest"
                                        >
                                            {t('decline')}
                                        </button>
                                        <button
                                            onClick={handleSavePreferences}
                                            className="bg-navy text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all rounded-lg"
                                        >
                                            TERCİHLERİ KAYDET
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
