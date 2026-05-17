'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { 
    ShieldCheck, 
    Lock, 
    Eye, 
    Globe, 
    Scale, 
    FileText, 
    AlertCircle, 
    Info, 
    ExternalLink, 
    Database, 
    UserCheck, 
    Fingerprint,
    HelpCircle
} from 'lucide-react';

export default function PrivacyPage() {
    const t = useTranslations('Privacy');
    const [activeTab, setActiveTab] = React.useState("genel");

    const sections = [
        { id: "genel", icon: <Info className="w-5 h-5" />, title: t('genel.title') },
        { id: "thirdParty", icon: <ExternalLink className="w-5 h-5" />, title: t('thirdParty.title') },
        { id: "processing", icon: <Database className="w-5 h-5" />, title: t('processing.title') },
        { id: "data", icon: <UserCheck className="w-5 h-5" />, title: t('data.title') },
        { id: "identification", icon: <Fingerprint className="w-5 h-5" />, title: t('identification.title') },
        { id: "aiUsage", icon: <ShieldCheck className="w-5 h-5" />, title: t('aiUsage.title') },
        { id: "compensation", icon: <Scale className="w-5 h-5" />, title: t('compensation.title') },
        { id: "corrections", icon: <HelpCircle className="w-5 h-5" />, title: t('corrections.title') },
    ];

    return (
        <main className="min-h-screen bg-background text-navy">
            {/* Dynamic Hero */}
            <div className="relative pt-48 pb-20 bg-slate-50 border-b border-gold/10 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy/5 rounded-full blur-[100px] -ml-24 -mb-24" />

                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="section-label !justify-center mb-8"
                    >
                        Legal Compliance & Privacy
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-8xl font-serif font-bold text-navy mb-8 italic leading-[0.9]"
                    >
                        {t('title')}
                    </motion.h1>
                    <p className="text-slate-400 text-xl max-w-4xl mx-auto italic leading-relaxed mt-10">
                        {t('description')}
                    </p>
                    <p className="text-gold text-xs font-bold uppercase tracking-widest mt-6">
                        {t('lastUpdated')}
                    </p>
                </div>
            </div>

            <section className="py-40 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-[350px_1fr] gap-20 lg:gap-32 items-start">
                            {/* Navigation Sidebar */}
                            <div className="space-y-6 lg:sticky lg:top-32">
                                <div className="mb-12">
                                    <h5 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold mb-4">Döküman Navigasyonu</h5>
                                    <div className="w-12 h-1 bg-gold"></div>
                                </div>

                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveTab(section.id)}
                                        className={`w-full p-8 text-left border transition-all duration-700 flex items-center justify-between group relative overflow-hidden shadow-sm hover:shadow-xl ${activeTab === section.id
                                                ? "bg-slate-50 text-navy border-gold/30"
                                                : "bg-white text-slate-400 border-gold/10 hover:border-gold/30 hover:-translate-y-1"
                                            }`}
                                    >
                                        <div className="flex items-center gap-6 relative z-10">
                                            <div className={`${activeTab === section.id ? "text-gold" : "text-slate-300 group-hover:text-gold"} transition-colors`}>
                                                {section.icon}
                                            </div>
                                            <span className="text-[11px] uppercase tracking-[0.2em] font-black">{section.title}</span>
                                        </div>
                                        {activeTab === section.id && (
                                            <motion.div layoutId="sidebar-accent" className="absolute inset-y-0 left-0 w-1.5 bg-gold" />
                                        )}
                                    </button>
                                ))}

                                <div className="mt-20 p-10 bg-white border border-gold/15 relative group overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <ShieldCheck size={100} />
                                    </div>
                                    <div className="w-14 h-14 bg-slate-50 border border-gold/20 text-gold flex items-center justify-center mb-8 shadow-2xl">
                                        <Lock size={24} />
                                    </div>
                                    <h4 className="font-serif font-bold text-navy mb-4 italic text-2xl uppercase">Hukuk Masası</h4>
                                    <p className="text-[10px] text-slate-400 leading-relaxed mb-10 uppercase tracking-[0.2em] font-black italic">Mentor Career Legal & Compliance</p>
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <span className="text-[9px] uppercase tracking-widest text-gold font-black">Email</span>
                                            <a href="mailto:info@mentor-cc.com" className="text-sm font-bold text-navy hover:text-gold transition-colors block border-b border-gold/10 pb-2">info@mentor-cc.com</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Display Area */}
                            <div className="relative">
                                {/* Artistic Background Elements */}
                                <div className="absolute -top-20 -right-20 text-gold/5 pointer-events-none select-none">
                                    <FileText size={400} strokeWidth={0.1} />
                                </div>

                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="bg-white p-12 md:p-24 border border-gold/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] relative z-10 min-h-[600px]"
                                >
                                    <div className="space-y-12">
                                        <div>
                                            <h3 className="text-4xl font-serif font-bold text-navy mb-8 italic">
                                                {t(`${activeTab}.title`)}
                                            </h3>
                                            <div className="text-lg opacity-80 leading-relaxed italic border-l-4 border-gold pl-8 text-slate-600">
                                                {t(`${activeTab}.content`)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-32 p-10 bg-slate-50 border border-gold/10 relative group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-white flex items-center justify-center text-gold shadow-lg border border-gold/5">
                                                <AlertCircle size={22} />
                                            </div>
                                            <div>
                                                <h5 className="text-xs font-black uppercase tracking-[0.2em] text-navy mb-2">Yasal Bilgilendirme</h5>
                                                <p className="text-[12px] text-slate-400 italic leading-relaxed">
                                                    Bu gizlilik politikası, global veri koruma standartları (KVKK & DSGVO) çerçevesinde hazırlanmıştır. Kişisel verileriniz Mentor Career güvencesi altındadır.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                <div className="mt-16 text-center">
                                    <p className="text-[10px] text-slate-300 uppercase tracking-[0.5em] font-black italic">
                                        - Mentor Career Trust & Security Office -
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
